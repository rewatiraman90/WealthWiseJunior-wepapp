"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { getTopicsForGrade } from "@/data/aiTeacherContext";
import SubscriberLock from "@/components/SubscriberLock";

const GRADES = [5, 6, 7, 8, 9, 10, 11, 12];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}

const QUICK_PROMPTS = [
  "Explain this topic simply",
  "Give me an Indian example",
  "Tell me a story about this",
  "Quiz me on this topic",
  "How does this affect my daily life?",
  "What should I do with my pocket money?",
];

const GRADE_STYLE_HINT: Record<number, string> = {
  5: "🌟 Foundation Level",
  6: "🌍 Explorer Level",
  7: "💻 Digital Level",
  8: "📊 Strategist Level",
  9: "📈 Market Level",
  10: "🏦 Auditor Level",
  11: "🔍 Analyst Level",
  12: "🏗️ Architect Level",
};

function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#/g, "")
    .replace(/`/g, "")
    .replace(/🎯|⚠️|🚨|🔒|👋|📚|💪|✅|🔊|⏹|📈|💰|🏦|🇮🇳/g, "")
    .replace(/Quick Check:/g, "Quick Check -")
    .trim();
}

export default function AITeacherPage() {
  const [grade, setGrade] = useState(5);
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [topics, setTopics] = useState<string[]>([]);
  const [apiError, setApiError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") synthRef.current = window.speechSynthesis;
  }, []);

  useEffect(() => {
    const t = getTopicsForGrade(grade);
    setTopics(t);
    setTopic(t[0] || "Money Basics");
    setMessages([]);
  }, [grade]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!topic) return;
    const greeting: Message = {
      id: "welcome",
      role: "assistant",
      content: `Namaste! 👋 Sir is ready to teach you.\n\nYou've selected **Class ${grade}** and we're studying **"${topic}"** today.\n\nAsk Sir anything about this topic, or pick a quick prompt below!\n\n🎯 Quick Check: Before we begin — what do you already know about "${topic}"?`,
    };
    setMessages([greeting]);
    if (autoSpeak) {
      setTimeout(() => speakText(`Namaste! Sir is ready to teach you. You have selected Class ${grade} and we are studying ${topic.replace(/[—–]/g, "-")} today.`), 400);
    }
  }, [grade, topic]);

  function speakText(text: string) {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
    const utt = new SpeechSynthesisUtterance(cleanForSpeech(text));
    utt.rate = 0.92;
    utt.pitch = 1.05;
    utt.volume = 1;
    const voices = synth.getVoices();
    const preferred =
      voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Male") || v.name.includes("David") || v.name.includes("Daniel"))) ||
      voices.find((v) => v.lang.startsWith("en"));
    if (preferred) utt.voice = preferred;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    synth.speak(utt);
  }

  function stopSpeaking() {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }

  function toggleMic() {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported. Please use Chrome."); return; }
    const r = new SR();
    r.lang = "en-IN";
    r.continuous = false;
    r.interimResults = false;
    r.onstart = () => setIsListening(true);
    r.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      setInput(t);
      setIsListening(false);
      setTimeout(() => sendMessage(t), 200);
    };
    r.onerror = () => setIsListening(false);
    r.onend = () => setIsListening(false);
    recognitionRef.current = r;
    r.start();
  }

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;
      setApiError("");

      const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
      const aMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "", loading: true };
      setMessages((prev) => [...prev, userMsg, aMsg]);
      setInput("");
      setIsStreaming(true);
      stopSpeaking();

      try {
        const history = [
          ...messages
            .filter((m) => m.id !== "welcome" && !m.loading && m.content)
            .slice(-8)
            .map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: text },
        ];

        const res = await fetch("/api/ai-teacher", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ grade, topic, messages: history }),
        });

        if (!res.ok) {
          const err = await res.json();
          setApiError(err.error || "API error");
          throw new Error(err.error || "Failed");
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => m.id === aMsg.id ? { ...m, content: accumulated, loading: false } : m)
          );
        }

        if (autoSpeak && accumulated) speakText(accumulated);
      } catch (err: any) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aMsg.id ? { ...m, content: `❌ ${err.message || "Connection error. Check your API key."}`, loading: false } : m
          )
        );
      } finally {
        setIsStreaming(false);
        inputRef.current?.focus();
      }
    },
    [grade, topic, messages, isStreaming, autoSpeak]
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  function formatMessage(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.includes("🎯 Quick Check:") || part.includes("Quick Check:")) {
        return <span key={i} className="quiz-line">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <SubscriberLock title="Sir (AI Teacher) Access" featureName="Premium AI Access">
      <div className="ai-page">
        {/* HEADER */}
        <div className="ai-header premium-glass">
          <div className="ai-avatar pulse"></div>
          <div>
            <h1 className="gradient-text">Sir</h1>
            <p className="ai-sub">Your Financial Mentor & Guide (Powered by Gemini Live)</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            {/* Voice controls */}
            <button
              className={`voice-toggle ${autoSpeak ? "voice-on" : ""}`}
              onClick={() => { setAutoSpeak(v => !v); if (isSpeaking) stopSpeaking(); }}
              title={autoSpeak ? "Mute Sir" : "Unmute Sir — Sir will speak all explanations"}
            >
              {autoSpeak ? "🔊 Sir Speaking" : "🔇 Muted"}
            </button>
            {isSpeaking && (
              <button className="stop-speak-btn" onClick={stopSpeaking}>⏹ Stop</button>
            )}
            <div className="at-grade-tag premium-glass">
              <span className="at-grade-label">{GRADE_STYLE_HINT[grade]}</span>
              <span className="at-grade-val">Class {grade}</span>
            </div>
          </div>
        </div>

        {apiError && (
          <div className="api-warn">⚠️ <strong>Error:</strong> {apiError}</div>
        )}

        {/* SPEAKING BANNER */}
        {isSpeaking && (
          <div className="speaking-banner">
            <span className="wave-bars"><span /><span /><span /><span /><span /></span>
            Sir is explaining…
            <button onClick={stopSpeaking} className="stop-inline">Stop</button>
          </div>
        )}

        <div className="at-body">
          {/* SIDEBAR */}
          <aside className="at-sidebar premium-glass">
            <div className="ctx-section">
              <p className="ctx-label">📚 Grade</p>
              <div className="grade-grid">
                {GRADES.map((g) => (
                  <button key={g} className={`g-btn ${grade === g ? "active" : ""}`} onClick={() => setGrade(g)}>{g}</button>
                ))}
              </div>
            </div>

            <div className="ctx-section">
              <p className="ctx-label">📖 Topic</p>
              <select className="topic-select" value={topic} onChange={(e) => { setTopic(e.target.value); setMessages([]); }}>
                {topics.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="ctx-section">
              <p className="ctx-label">⚡ Quick Prompts</p>
              <div className="quick-list">
                {QUICK_PROMPTS.map((q) => (
                  <button key={q} className="quick-btn" onClick={() => sendMessage(q)} disabled={isStreaming}>{q}</button>
                ))}
              </div>
            </div>

            <div className="ctx-section how-to">
              <p className="ctx-label">💡 Voice Tips</p>
              <ul className="how-list">
                <li>Click 🎤 to speak to Sir</li>
                <li>Sir auto-speaks explanations</li>
                <li>Click 🔊 to mute/unmute</li>
                <li>⏹ to stop Sir mid-speech</li>
              </ul>
            </div>
          </aside>

          {/* CHAT AREA */}
          <div className="chat-area">
            <div className="messages-wrap">
              {messages.map((msg) => (
                <div key={msg.id} className={`msg-row ${msg.role === "user" ? "user-row" : "ai-row"}`}>
                  {msg.role === "assistant" && <div className="ai-avatar">🎓</div>}
                  <div className={`bubble ${msg.role === "user" ? "user-bubble" : "ai-bubble"}`}>
                    {msg.loading ? (
                      <div className="typing-indicator"><span /><span /><span /></div>
                    ) : (
                      <div className="bubble-text">
                        {msg.content.split("\n").map((line, i) => (
                          <p key={i} className={line.startsWith("🎯") || line.startsWith("Quick Check") ? "quiz-p" : ""}>
                            {formatMessage(line)}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && <div className="user-avatar">👤</div>}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT BAR */}
            <div className="input-bar premium-glass">
              <button
                className={`mic-btn ${isListening ? "mic-active" : ""}`}
                onClick={toggleMic}
                title={isListening ? "Stop listening" : "Speak to Sir"}
                disabled={isStreaming}
              >
                {isListening ? "⏹" : "🎤"}
              </button>
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder={isListening ? "Listening to you…" : `Ask Sir about "${topic}"…`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
              />
              <button className="send-btn" onClick={() => sendMessage(input)} disabled={isStreaming || !input.trim()}>
                {isStreaming ? <span className="send-spinner" /> : "Send →"}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .ai-page { display: flex; flex-direction: column; gap: 1.25rem; height: calc(100vh - 120px); padding-bottom: 1rem; }
          .ai-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; flex-shrink: 0; }
          .ai-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #8b5cf6); box-shadow: 0 0 16px rgba(108,99,255,.3); flex-shrink: 0; }
          .ai-sub { font-size: .85rem; color: var(--muted); margin-top: .2rem; }
          .at-grade-tag { padding: .75rem 1.25rem; border-radius: 1rem; display: flex; flex-direction: column; align-items: center; gap: .2rem; }
          .at-grade-label { font-size: .7rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
          .at-grade-val { font-size: 1.2rem; font-weight: 900; color: var(--foreground); }

          .voice-toggle {
            padding: .45rem 1rem; border-radius: 2rem;
            border: 1px solid rgba(108,99,255,.3); background: rgba(108,99,255,.07);
            color: var(--muted); font-size: .78rem; font-weight: 800;
            cursor: pointer; font-family: 'Space Grotesk', sans-serif;
            transition: all .15s;
          }
          .voice-on { background: rgba(108,99,255,.15); border-color: rgba(108,99,255,.5); color: var(--primary-glow); }
          .stop-speak-btn {
            padding: .4rem .85rem; border-radius: 2rem;
            border: 1px solid rgba(255,68,102,.3); background: rgba(255,68,102,.08);
            color: #FF6680; font-size: .75rem; font-weight: 800;
            cursor: pointer; font-family: 'Space Grotesk', sans-serif;
          }

          .api-warn { background: rgba(255,107,53,.1); border: 1px solid rgba(255,107,53,.3); border-radius: .85rem; padding: .85rem 1.25rem; font-size: .82rem; color: var(--neon-orange); flex-shrink: 0; }

          /* SPEAKING BANNER */
          .speaking-banner {
            display: flex; align-items: center; gap: .65rem;
            padding: .55rem 1.25rem; border-radius: .85rem;
            background: rgba(108,99,255,.08); border: 1px solid rgba(108,99,255,.18);
            font-size: .78rem; font-weight: 700; color: var(--primary-glow);
            flex-shrink: 0;
          }
          .wave-bars { display: flex; gap: 2px; align-items: center; }
          .wave-bars span { display: block; width: 3px; border-radius: 2px; background: var(--primary-glow); animation: wb 1s infinite; }
          .wave-bars span:nth-child(1) { height: 6px; }
          .wave-bars span:nth-child(2) { height: 12px; animation-delay: .1s; }
          .wave-bars span:nth-child(3) { height: 8px; animation-delay: .2s; }
          .wave-bars span:nth-child(4) { height: 14px; animation-delay: .3s; }
          .wave-bars span:nth-child(5) { height: 6px; animation-delay: .4s; }
          @keyframes wb { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(.4); } }
          .stop-inline { margin-left: auto; background: none; border: 1px solid rgba(108,99,255,.3); border-radius: 2rem; padding: .15rem .65rem; font-size: .7rem; font-weight: 800; color: var(--primary-glow); cursor: pointer; font-family: 'Space Grotesk', sans-serif; }

          /* BODY */
          .at-body { display: flex; gap: 1.25rem; flex: 1; min-height: 0; }

          /* SIDEBAR */
          .at-sidebar { width: 260px; flex-shrink: 0; border-radius: 1.25rem; padding: 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; overflow-y: auto; }
          .ctx-label { font-size: .65rem; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: .09em; margin-bottom: .6rem; }
          .ctx-section { display: flex; flex-direction: column; }
          .grade-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: .35rem; }
          .g-btn { padding: .45rem .2rem; border-radius: .6rem; border: 1px solid var(--border); background: transparent; color: var(--muted); font-size: .8rem; font-weight: 800; cursor: pointer; font-family: 'Space Grotesk', sans-serif; transition: all .15s; }
          .g-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 0 12px rgba(108,99,255,.4); }
          .g-btn:hover:not(.active) { border-color: var(--primary); color: var(--foreground); }
          .topic-select { background: rgba(14,22,56,.8); border: 1px solid var(--border); border-radius: .75rem; color: var(--foreground); font-size: .8rem; font-weight: 600; font-family: 'Space Grotesk', sans-serif; padding: .55rem .75rem; width: 100%; cursor: pointer; outline: none; }
          .topic-select:focus { border-color: var(--primary); }
          .quick-list { display: flex; flex-direction: column; gap: .35rem; }
          .quick-btn { text-align: left; padding: .5rem .75rem; border-radius: .75rem; border: 1px solid var(--border); background: rgba(108,99,255,.06); color: var(--muted); font-size: .75rem; font-weight: 600; font-family: 'Space Grotesk', sans-serif; cursor: pointer; transition: all .15s; }
          .quick-btn:hover:not(:disabled) { border-color: rgba(108,99,255,.4); color: var(--foreground); background: rgba(108,99,255,.12); }
          .quick-btn:disabled { opacity: .4; cursor: not-allowed; }
          .how-to { opacity: .75; }
          .how-list { list-style: none; display: flex; flex-direction: column; gap: .3rem; }
          .how-list li { font-size: .72rem; color: var(--muted); padding-left: .75rem; position: relative; }
          .how-list li::before { content: '→'; position: absolute; left: 0; color: var(--primary-glow); }

          /* CHAT */
          .chat-area { flex: 1; display: flex; flex-direction: column; gap: .85rem; min-width: 0; }
          .messages-wrap { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; padding: .5rem .25rem; scrollbar-width: thin; scrollbar-color: rgba(108,99,255,.3) transparent; }
          .msg-row { display: flex; gap: .75rem; align-items: flex-start; max-width: 88%; }
          .ai-row { align-self: flex-start; }
          .user-row { align-self: flex-end; flex-direction: row-reverse; }
          .ai-avatar, .user-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; margin-top: .2rem; }
          .ai-avatar { background: linear-gradient(135deg, var(--primary), #8b5cf6); box-shadow: 0 0 16px rgba(108,99,255,.3); }
          .user-avatar { background: rgba(0,229,160,.15); border: 1px solid rgba(0,229,160,.2); }
          .bubble { border-radius: 1.25rem; padding: 1rem 1.25rem; line-height: 1.6; }
          .ai-bubble { background: rgba(108,99,255,.09); border: 1px solid rgba(108,99,255,.2); border-top-left-radius: .35rem; }
          .user-bubble { background: rgba(0,229,160,.09); border: 1px solid rgba(0,229,160,.2); border-top-right-radius: .35rem; }
          .bubble-text p { font-size: .88rem; color: var(--foreground); margin: 0; line-height: 1.65; }
          .bubble-text p:empty { display: none; }
          .bubble-text p + p { margin-top: .4rem; }
          .quiz-p { background: rgba(255,209,102,.08); border-left: 3px solid rgba(255,209,102,.5); padding: .5rem .75rem !important; border-radius: 0 .5rem .5rem 0; margin-top: .5rem !important; font-weight: 600 !important; }
          .typing-indicator { display: flex; gap: .35rem; align-items: center; padding: .25rem 0; }
          .typing-indicator span { width: 8px; height: 8px; border-radius: 50%; background: var(--primary-glow); animation: bounce-dot 1.2s infinite; }
          .typing-indicator span:nth-child(2) { animation-delay: .2s; }
          .typing-indicator span:nth-child(3) { animation-delay: .4s; }
          @keyframes bounce-dot { 0%,80%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-6px); opacity: 1; } }

          /* INPUT BAR */
          .input-bar { display: flex; gap: .75rem; align-items: center; padding: .75rem 1rem; border-radius: 1.25rem; flex-shrink: 0; }
          .mic-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(108,99,255,.3); background: rgba(108,99,255,.08); font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .15s; }
          .mic-btn:hover:not(:disabled) { background: rgba(108,99,255,.18); }
          .mic-active { background: rgba(255,68,102,.15) !important; border-color: #FF4466 !important; animation: mic-pulse 1s infinite; }
          @keyframes mic-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,68,102,.4); } 50% { box-shadow: 0 0 0 10px rgba(255,68,102,0); } }
          .mic-btn:disabled { opacity: .4; cursor: not-allowed; }
          .chat-input { flex: 1; background: transparent; border: none; outline: none; font-size: .9rem; color: var(--foreground); font-family: 'Space Grotesk', sans-serif; }
          .chat-input::placeholder { color: var(--muted); }
          .send-btn { padding: .55rem 1.25rem; border-radius: 2rem; border: none; background: linear-gradient(135deg, var(--primary), #8b5cf6); color: white; font-size: .82rem; font-weight: 800; font-family: 'Space Grotesk', sans-serif; cursor: pointer; transition: all .2s; white-space: nowrap; min-width: 80px; display: flex; align-items: center; justify-content: center; }
          .send-btn:hover:not(:disabled) { transform: scale(1.04); box-shadow: 0 0 16px rgba(108,99,255,.4); }
          .send-btn:disabled { opacity: .5; cursor: not-allowed; }
          .send-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: white; border-radius: 50%; animation: spin .7s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }

          @media (max-width: 900px) { .at-body { flex-direction: column; } .at-sidebar { width: 100%; max-height: 280px; } .ai-page { height: auto; } }
        `}</style>
      </div>
    </SubscriberLock>
  );
}
