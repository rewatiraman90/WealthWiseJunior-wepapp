"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}

interface Props {
  grade: number;
  topic: string;
  context?: string;
  studentName?: string;
}

const FOUL_PATTERNS = [
  /\b(fuck|fucker|fucking|f+u+c+k+)\b/i,
  /\b(shit|bullshit|shitty)\b/i,
  /\b(bitch|bastard|asshole|ass\s*hole)\b/i,
  /\b(damn|crap|cunt|dick|cock|pussy)\b/i,
  /\b(idiot|stupid|dumb|moron|retard)\b/i,
  /\b(bc|mc|bhenchod|madarchod|chutiya|gaand|lund|randi|kutte|harami|saala)\b/i,
  /\b(sala|behen\s*ke?|maa\s*ki|teri\s*maa)\b/i,
];

function containsFoul(text: string) {
  return FOUL_PATTERNS.some(p => p.test(text));
}

const WARN_MSGS = [
  `⚠️ First Warning\n\nHey, let's keep things respectful! Sir is here to help you learn. Please use kind language — that's part of being financially smart and professional.\n\nNow, what was your question?`,
  `🚨 Second Warning — Parent Notified\n\nSir has noted this is your second use of inappropriate language. Your parent has been informed through the WealthWise parent dashboard.\n\nSir is still here to help — but only when we speak respectfully. One more incident and the AI Teacher will be locked for today.`,
  `🔒 AI Teacher Locked\n\nSir has locked the AI Teacher for today due to three instances of inappropriate language. Your teacher and parents have been informed.\n\nCome back tomorrow for a fresh start. Sir believes in you! 💪`,
];

// Clean text for TTS — remove markdown, emojis, asterisks
function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/#/g, '')
    .replace(/`/g, '')
    .replace(/🎯|⚠️|🚨|🔒|👋|📚|💪|✅|🔊|⏹|📈|💰|🏦|🇮🇳/g, '')
    .replace(/Quick Check:/g, 'Quick Check -')
    .trim();
}

export default function AiTeacherFloat({ grade, topic, context, studentName }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [locked, setLocked] = useState(false);
  const [parentNotified, setParentNotified] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // init Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Restore warning state
  useEffect(() => {
    const stored = sessionStorage.getItem("wwj_warnings");
    if (stored) {
      const d = JSON.parse(stored);
      setWarnings(d.count || 0);
      setLocked(d.locked || false);
      setParentNotified(d.parentNotified || false);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("wwj_warnings", JSON.stringify({ count: warnings, locked, parentNotified }));
  }, [warnings, locked, parentNotified]);

  // Initial greeting when opened
  useEffect(() => {
    if (!open || messages.length > 0) return;
    const greeting: Message = {
      id: "greeting",
      role: "assistant",
      content: `Namaste${studentName ? ` ${studentName}` : ""}! 👋 Sir is here to help you.\n\nYou are studying **"${topic}"** in Class ${grade}${context ? ` (${context})` : ""}.\n\nAsk Sir anything — explanation, Indian example, story, or quiz!\n\n🎯 Quick Check: What do you already know about "${topic}"?`,
    };
    setMessages([greeting]);
    // Auto-speak greeting
    if (autoSpeak) {
      setTimeout(() => speakText(`Namaste! Sir is here to help you. You are studying ${topic.replace(/[—–]/g, '-')} in Class ${grade}. Ask Sir anything!`), 400);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Focus on open
  useEffect(() => {
    if (open && !locked) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open, locked]);

  // Stop speaking when closed
  useEffect(() => {
    if (!open && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, [open]);

  function speakText(text: string) {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanForSpeech(text));
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.volume = 1;
    // Try to pick a male Indian-ish voice, fallback to default
    const voices = synth.getVoices();
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (v.name.toLowerCase().includes('male') || v.name.includes('David') || v.name.includes('Google UK English Male') || v.name.includes('Daniel'))
    ) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synth.speak(utterance);
  }

  function stopSpeaking() {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }

  // Voice input using Web Speech API
  function toggleMic() {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }
    const r = new SpeechRecognition();
    r.lang = 'en-IN';
    r.continuous = false;
    r.interimResults = false;
    r.onstart = () => setIsListening(true);
    r.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      // Auto-send after voice input
      setTimeout(() => sendMessage(transcript), 200);
    };
    r.onerror = () => setIsListening(false);
    r.onend = () => setIsListening(false);
    recognitionRef.current = r;
    r.start();
  }

  const notifyParent = useCallback(async () => {
    if (parentNotified) return;
    setParentNotified(true);
    const log = {
      timestamp: new Date().toISOString(),
      student: studentName || "Student",
      grade,
      topic,
      reason: "Inappropriate language used twice in AI Teacher (Sir) chat",
    };
    const existing = JSON.parse(localStorage.getItem("wwj_parent_alerts") || "[]");
    existing.push(log);
    localStorage.setItem("wwj_parent_alerts", JSON.stringify(existing));
  }, [parentNotified, studentName, grade, topic]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming || locked) return;

    // Foul language check
    if (containsFoul(text)) {
      const nw = warnings + 1;
      setWarnings(nw);
      const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
      const warnMsg: Message = { id: `w-${Date.now()}`, role: "assistant", content: WARN_MSGS[Math.min(nw - 1, 2)] };
      setMessages(prev => [...prev, userMsg, warnMsg]);
      setInput("");
      speakText(nw === 1 ? "Hey, let's keep things respectful! Sir is here to help you learn." : nw === 2 ? "Second warning. Sir has informed your parents." : "AI Teacher locked for today.");
      if (nw === 2) await notifyParent();
      if (nw >= 3) setLocked(true);
      return;
    }

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const aMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "", loading: true };
    setMessages(prev => [...prev, userMsg, aMsg]);
    setInput("");
    setIsStreaming(true);
    stopSpeaking();

    try {
      const history = messages
        .filter(m => m.id !== "greeting" && !m.loading && m.content)
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content }));
      history.push({ role: "user", content: text });

      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade, topic, messages: history }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "API error");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages(prev =>
          prev.map(m => m.id === aMsg.id ? { ...m, content: accumulated, loading: false } : m)
        );
      }

      // Auto-speak after response is complete
      if (autoSpeak && accumulated) {
        speakText(accumulated);
      }
    } catch (err: any) {
      const errMsg = `Sir is having trouble connecting right now. Please check the API key in .env.local. Error: ${err.message}`;
      setMessages(prev =>
        prev.map(m => m.id === aMsg.id ? { ...m, content: errMsg, loading: false } : m)
      );
    } finally {
      setIsStreaming(false);
    }
  }, [grade, topic, messages, isStreaming, locked, warnings, autoSpeak, notifyParent]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  function fmt(text: string) {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={j}>{p.slice(2, -2)}</strong>
          : <span key={j}>{p}</span>
      );
      const isQuiz = line.startsWith("🎯") || line.startsWith("Quick Check");
      const isWarn = line.startsWith("⚠️") || line.startsWith("🚨") || line.startsWith("🔒");
      return <p key={i} style={isQuiz ? { background: 'rgba(255,209,102,.07)', borderLeft: '2px solid rgba(255,209,102,.5)', padding: '4px 8px', borderRadius: '0 6px 6px 0', marginTop: 4, fontSize: '0.76rem', fontWeight: 700 } : isWarn ? { color: '#FF8888', fontWeight: 700 } : {}}>{parts}</p>;
    });
  }

  const warnColor = warnings === 0 ? "" : warnings === 1 ? "#FFD166" : "#FF4466";

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        className={`sft-btn ${open ? "sft-open" : ""}`}
        onClick={() => setOpen(v => !v)}
        title="Ask Sir — AI Teacher"
        style={warnings > 0 ? { borderColor: warnColor, boxShadow: `0 0 20px ${warnColor}44` } : {}}
      >
        {locked ? "🔒" : open ? "✕" : "🎓"}
        {!open && warnings > 0 && <span className="sft-warn-dot">{warnings}/3</span>}
      </button>

      {/* PANEL */}
      <div className={`sft-panel premium-glass ${open ? "sft-panel-open" : ""}`}>
        {/* HEADER */}
        <div className="sft-hdr">
          <div className="sft-av">🎓</div>
          <div className="sft-info">
            <div className="sft-name">Sir <span className="sft-ai-tag">AI</span></div>
            <div className="sft-sub">Class {grade} · {topic.slice(0, 26)}{topic.length > 26 ? "…" : ""}</div>
          </div>
          <div className="sft-hdr-right">
            {/* Auto-speak toggle */}
            <button
              className={`sft-toggle ${autoSpeak ? "sft-toggle-on" : ""}`}
              onClick={() => { setAutoSpeak(v => !v); if (isSpeaking) stopSpeaking(); }}
              title={autoSpeak ? "Mute Sir" : "Unmute Sir"}
            >
              {autoSpeak ? "🔊" : "🔇"}
            </button>
            {isSpeaking && (
              <button className="sft-stop-speak" onClick={stopSpeaking} title="Stop speaking">⏹</button>
            )}
            {warnings > 0 && <span className="sft-warn-c" style={{ color: warnColor }}>⚠️ {warnings}/3</span>}
            <button className="sft-close" onClick={() => setOpen(false)}>✕</button>
          </div>
        </div>

        {/* PARENT BANNER */}
        {parentNotified && (
          <div className="sft-parent-banner">📱 Your parent has been notified about your language behavior.</div>
        )}

        {locked ? (
          <div className="sft-locked">
            <div style={{ fontSize: '2.5rem' }}>🔒</div>
            <div style={{ fontWeight: 900, color: '#FF4466', marginTop: 8 }}>AI Teacher Locked</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: 6 }}>
              Locked due to 3 warnings. Come back tomorrow!
            </div>
          </div>
        ) : (
          <>
            {/* MESSAGES */}
            <div className="sft-msgs">
              {messages.map(msg => (
                <div key={msg.id} className={`sfm-row ${msg.role === "user" ? "sfm-user" : "sfm-ai"}`}>
                  {msg.role === "assistant" && <div className="sfm-av">🎓</div>}
                  <div className={`sfm-bubble ${msg.role === "user" ? "sfm-ubub" : "sfm-abub"}`}>
                    {msg.loading
                      ? <div className="sfm-typing"><span /><span /><span /></div>
                      : <div className="sfm-text">{fmt(msg.content)}</div>
                    }
                  </div>
                  {msg.role === "user" && <div className="sfm-av sfm-uav">👤</div>}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT ROW */}
            <div className="sft-input-row">
              {/* MIC BUTTON */}
              <button
                className={`sft-mic ${isListening ? "sft-mic-active" : ""}`}
                onClick={toggleMic}
                title={isListening ? "Stop listening" : "Speak to Sir"}
                disabled={isStreaming}
              >
                {isListening ? "⏹" : "🎤"}
              </button>
              <input
                ref={inputRef}
                type="text"
                className="sft-input"
                placeholder={isListening ? "Listening…" : "Type or speak to Sir…"}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming || locked}
              />
              <button
                className="sft-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming || locked}
              >
                {isStreaming ? <span className="sft-spin" /> : "↑"}
              </button>
            </div>

            {/* SPEAKING INDICATOR */}
            {isSpeaking && (
              <div className="sft-speaking-bar">
                <span className="sft-wave"><span /><span /><span /><span /><span /></span>
                Sir is speaking…
                <button onClick={stopSpeaking} className="sft-stop-inline">Stop</button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        /* FLOATING BUTTON */
        .sft-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 2px solid rgba(108,99,255,.5);
          background: linear-gradient(135deg, #1a1440, #0e1638);
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 24px rgba(108,99,255,.35), 0 4px 20px rgba(0,0,0,.4);
          transition: all .25s;
        }
        .sft-btn:hover { transform: scale(1.1); box-shadow: 0 0 32px rgba(108,99,255,.5); }
        .sft-open { border-color: rgba(108,99,255,.8); background: rgba(108,99,255,.2); }
        .sft-warn-dot {
          position: absolute;
          top: -4px; right: -4px;
          background: #FF4466;
          color: white;
          font-size: .52rem;
          font-weight: 900;
          padding: 2px 5px;
          border-radius: 2rem;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* PANEL */
        .sft-panel {
          position: fixed;
          bottom: 5.5rem;
          right: 2rem;
          z-index: 9998;
          width: 380px;
          max-height: 540px;
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: scale(.88) translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition: all .25s cubic-bezier(.34,1.56,.64,1);
          transform-origin: bottom right;
        }
        .sft-panel-open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        /* HEADER */
        .sft-hdr {
          display: flex;
          align-items: center;
          gap: .65rem;
          padding: .8rem 1rem;
          border-bottom: 1px solid rgba(108,99,255,.15);
          background: rgba(108,99,255,.08);
          flex-shrink: 0;
        }
        .sft-av {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6C63FF, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .sft-uav { background: rgba(0,229,160,.12); border: 1px solid rgba(0,229,160,.25); }
        .sft-info { flex: 1; min-width: 0; }
        .sft-name { font-size: .88rem; font-weight: 900; color: var(--foreground); display: flex; align-items: center; gap: .35rem; }
        .sft-ai-tag { font-size: .55rem; font-weight: 900; padding: 1px 5px; border-radius: 2rem; background: rgba(108,99,255,.2); color: var(--primary-glow); letter-spacing: .05em; }
        .sft-sub { font-size: .67rem; color: var(--muted); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sft-hdr-right { display: flex; align-items: center; gap: .4rem; flex-shrink: 0; }
        .sft-toggle, .sft-stop-speak, .sft-close {
          background: none; border: none; cursor: pointer;
          font-size: .85rem; padding: .2rem; transition: opacity .15s;
          color: var(--muted);
        }
        .sft-toggle:hover, .sft-stop-speak:hover, .sft-close:hover { opacity: .7; }
        .sft-toggle-on { color: var(--primary-glow); }
        .sft-warn-c { font-size: .62rem; font-weight: 900; }

        /* PARENT BANNER */
        .sft-parent-banner {
          background: rgba(255,68,102,.1);
          border-bottom: 1px solid rgba(255,68,102,.2);
          padding: .5rem 1rem;
          font-size: .7rem; color: #FF6680; font-weight: 700; flex-shrink: 0;
        }

        /* MESSAGES */
        .sft-msgs {
          flex: 1; overflow-y: auto;
          padding: .8rem; display: flex; flex-direction: column; gap: .7rem;
          scrollbar-width: thin; scrollbar-color: rgba(108,99,255,.2) transparent;
        }
        .sfm-row { display: flex; gap: .45rem; align-items: flex-start; max-width: 96%; }
        .sfm-ai { align-self: flex-start; }
        .sfm-user { align-self: flex-end; flex-direction: row-reverse; }
        .sfm-av {
          width: 26px; height: 26px; border-radius: 50%;
          background: linear-gradient(135deg,#6C63FF,#8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: .75rem; flex-shrink: 0; margin-top: .1rem;
        }
        .sfm-bubble {
          border-radius: .9rem; padding: .6rem .85rem;
          display: flex; flex-direction: column; gap: .3rem;
        }
        .sfm-abub {
          background: rgba(108,99,255,.09);
          border: 1px solid rgba(108,99,255,.2);
          border-top-left-radius: .2rem;
        }
        .sfm-ubub {
          background: rgba(0,229,160,.08);
          border: 1px solid rgba(0,229,160,.2);
          border-top-right-radius: .2rem;
        }
        .sfm-text { font-size: .79rem; color: var(--foreground); line-height: 1.6; }
        .sfm-text p { margin: 0; }
        .sfm-text p + p { margin-top: .28rem; }
        .sfm-text p:empty { display: none; }

        /* TYPING */
        .sfm-typing { display: flex; gap: .28rem; align-items: center; padding: .2rem 0; }
        .sfm-typing span {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(108,99,255,.7);
          animation: tdot 1.2s infinite;
        }
        .sfm-typing span:nth-child(2) { animation-delay: .2s; }
        .sfm-typing span:nth-child(3) { animation-delay: .4s; }
        @keyframes tdot { 0%,80%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-5px); opacity: 1; } }

        /* INPUT ROW */
        .sft-input-row {
          display: flex; gap: .45rem;
          padding: .7rem .85rem;
          border-top: 1px solid rgba(108,99,255,.12);
          background: rgba(14,22,56,.5);
          flex-shrink: 0;
          align-items: center;
        }
        .sft-mic {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid rgba(108,99,255,.3);
          background: rgba(108,99,255,.08);
          font-size: .9rem; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all .15s;
        }
        .sft-mic:hover:not(:disabled) { background: rgba(108,99,255,.18); }
        .sft-mic-active {
          background: rgba(255,68,102,.15) !important;
          border-color: #FF4466 !important;
          animation: mic-pulse 1s infinite;
        }
        @keyframes mic-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,68,102,.4); }
          50% { box-shadow: 0 0 0 8px rgba(255,68,102,0); }
        }
        .sft-mic:disabled { opacity: .4; cursor: not-allowed; }
        .sft-input {
          flex: 1;
          background: rgba(108,99,255,.06);
          border: 1px solid rgba(108,99,255,.2);
          border-radius: .7rem;
          padding: .5rem .8rem;
          font-size: .8rem; color: var(--foreground);
          font-family: 'Space Grotesk', sans-serif;
          outline: none; transition: border-color .15s;
        }
        .sft-input:focus { border-color: rgba(108,99,255,.5); }
        .sft-input::placeholder { color: var(--muted); font-size: .76rem; }
        .sft-send {
          width: 34px; height: 34px; border-radius: 50%; border: none;
          background: linear-gradient(135deg,#6C63FF,#8b5cf6);
          color: white; font-size: .95rem; font-weight: 900;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .15s;
        }
        .sft-send:hover:not(:disabled) { transform: scale(1.1); }
        .sft-send:disabled { opacity: .4; cursor: not-allowed; }
        .sft-spin {
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: white; border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* SPEAKING BAR */
        .sft-speaking-bar {
          display: flex; align-items: center; gap: .5rem;
          padding: .4rem .85rem;
          background: rgba(108,99,255,.07);
          border-top: 1px solid rgba(108,99,255,.1);
          font-size: .68rem; color: var(--primary-glow); font-weight: 700;
          flex-shrink: 0;
        }
        .sft-wave { display: flex; gap: 2px; align-items: center; }
        .sft-wave span {
          display: block; width: 3px; border-radius: 2px;
          background: var(--primary-glow);
          animation: wave-bar 1s infinite;
        }
        .sft-wave span:nth-child(1) { height: 6px; animation-delay: 0s; }
        .sft-wave span:nth-child(2) { height: 12px; animation-delay: .1s; }
        .sft-wave span:nth-child(3) { height: 8px; animation-delay: .2s; }
        .sft-wave span:nth-child(4) { height: 14px; animation-delay: .3s; }
        .sft-wave span:nth-child(5) { height: 6px; animation-delay: .4s; }
        @keyframes wave-bar {
          0%,100% { transform: scaleY(1); }
          50% { transform: scaleY(.4); }
        }
        .sft-stop-inline {
          margin-left: auto;
          background: none; border: 1px solid rgba(108,99,255,.3);
          border-radius: 2rem; padding: .15rem .6rem;
          font-size: .66rem; font-weight: 800;
          color: var(--primary-glow); cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* LOCKED */
        .sft-locked {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: .5rem; padding: 2rem; text-align: center;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .sft-panel { width: calc(100vw - 2rem); right: 1rem; bottom: 5rem; }
          .sft-btn { right: 1rem; bottom: 1rem; }
        }
      `}</style>
    </>
  );
}
