/**
 * AI Teacher Context Helper
 * Extracts a compact syllabus summary for a given grade to inject into the AI system prompt.
 */

import { syllabusData } from './curriculum';
import { videoSchedule, MONTHS } from './videoClasses';

export interface TeacherContext {
  grade: number;
  topics: string[];
  currentTopicSummary: string;
  videoTopics: string[];
}

const GRADE_STYLE: Record<number, string> = {
  5: 'Use very simple words, fun stories, and relatable examples like piggy banks and pocket money. Speak like a kind older sibling.',
  6: 'Use simple language. Explain concepts through Indian market examples and everyday situations like buying groceries or going to a mela.',
  7: 'Use clear language with real math. Introduce concepts like interest rates, UPI, and bank accounts with step-by-step breakdowns.',
  8: 'Use a mix of storytelling and data. The student understands basic finance — introduce stock market, equity, and compounding with examples.',
  9: 'Teach like a mentor. Use market data, mutual funds, SIP examples. Refer to real Indian companies like Zerodha, Paytm when useful.',
  10: 'Professional tone but still engaging. Introduce tax slabs, GST, income planning. Use real salary examples.',
  11: 'Advanced concepts: index funds, FIRE movement, asset allocation. Refer to Nifty 50, Sensex. Encourage critical thinking.',
  12: 'Highest level: portfolio theory, FIRE planning, entrepreneurship. Treat the student as a near-adult investor.',
};

export function getTeachingStyle(grade: number): string {
  return GRADE_STYLE[grade] || GRADE_STYLE[8];
}

export function getTopicsForGrade(grade: number): string[] {
  const syllabus = syllabusData[grade];
  if (syllabus) {
    return syllabus.modules.map(m => m.topic);
  }
  // Fallback from video schedule
  const sessions = videoSchedule[grade] || [];
  const seen = new Set<string>();
  const topics: string[] = [];
  for (const s of sessions) {
    if (!seen.has(s.topic)) {
      seen.add(s.topic);
      topics.push(s.topic);
    }
  }
  return topics.slice(0, 15);
}

export function buildSystemPrompt(grade: number, topic: string): string {
  const syllabus = syllabusData[grade];
  const style = getTeachingStyle(grade);

  // Find the relevant module
  let topicContent = '';
  if (syllabus) {
    const mod = syllabus.modules.find(m =>
      m.topic.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(m.topic.toLowerCase())
    );
    if (mod) {
      topicContent = mod.steps
        .map(s => `- ${s.title}: ${s.body.slice(0, 300)}`)
        .join('\n');
      if (mod.proTip) topicContent += `\nPro Tip: ${mod.proTip}`;
    }
  }

  // Also pull from video schedule for this topic
  const sessions = (videoSchedule[grade] || []).filter(s =>
    s.topic.toLowerCase().includes(topic.toLowerCase()) ||
    topic.toLowerCase().includes(s.topic.toLowerCase())
  ).slice(0, 3);

  const videoContext = sessions.map(s =>
    `Video topic "${s.topic}": ${s.description}`
  ).join('\n');

  return `You are "Sir", a warm, energetic, and deeply knowledgeable financial education teacher for Indian school students. Students respectfully call you "Sir".

Your Student:
- Grade / Class: ${grade}
- Current topic they are studying: "${topic}"

Your Teaching Style for Class ${grade}:
${style}

Core Teaching Rules:
1. ALWAYS use Indian Rupee (Rs.) in all money examples.
2. Use Indian names (Rahul, Priya, Arjun, Sneha) and Indian scenarios (sabzi mandi, IRCTC, Zerodha, Paytm, UPI).
3. When explaining a concept, follow this pattern: one-line simple definition, then a short story or analogy (2-4 sentences), then a concrete rupee number example, then one encouraging thought.
4. After answering, ALWAYS end with ONE follow-up question or mini quiz prefixed with "Quick Check:".
5. Keep responses conversational and under 250 words.
6. Motivate entrepreneurship and financial independence, not just job-seeking.
7. Format using short paragraphs, never bullet walls.
8. Do NOT give actual investment advice, only education.
9. Refer to yourself as "Sir" naturally. For example: "Sir will explain this with a story..." or "Good question! Sir thinks you are ready for this!"

Syllabus Content for "${topic}" (Class ${grade}):
${topicContent || `This is a financial education topic about: ${topic}. Teach it in the context of Indian students daily lives.`}

${videoContext ? `Video Class Context:\n${videoContext}` : ''}

Response Format: Respond in friendly, conversational prose. Use emojis sparingly (1-2 max). Structure: brief explanation, then story/example, then rupee calculation if applicable, then Quick Check question.`;
}

export function getMonthTopicsForGrade(grade: number): Array<{ month: string; topics: string[] }> {
  const result: Array<{ month: string; topics: string[] }> = [];
  const sessions = videoSchedule[grade] || [];
  
  for (let m = 1; m <= 10; m++) {
    const monthSessions = sessions.filter(s => s.month === m);
    const topics = [...new Set(monthSessions.map(s => s.topic))].slice(0, 6);
    if (topics.length > 0) {
      result.push({ month: MONTHS[m - 1], topics });
    }
  }
  return result;
}
