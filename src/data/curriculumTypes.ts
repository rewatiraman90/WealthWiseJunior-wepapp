export interface UnitTestQuestion {
    q: string;
    options: string[];
    correct: number; // 0-indexed
    explanation: string;
}

export interface LessonStep {
    title: string;
    body: string; // supports **bold**, *italic*, markdown tables
    image?: string;
    story?: string; // short story/anecdote shown in a story card
    funFact?: string;
    activity?: string;
}

export interface SyllabusModule {
    month: string;
    topic: string;
    type: 'Theory' | 'Summer Activity' | 'Unit Test' | 'Annual Exam' | 'Quest';
    status: 'passed' | 'current' | 'locked';
    score?: number;
    steps: LessonStep[];
    unitTest?: UnitTestQuestion[];
    proTip: string;
}

export interface GradeSyllabus {
    grade: number;
    bookTitle: string;
    subtitle: string;
    theme: string;
    complexityNote?: string;
    modules: SyllabusModule[];
}
