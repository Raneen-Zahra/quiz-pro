// lib/types.ts

export interface ExamResult {
    quizTitle: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    unanswered: number;
    scorePercentage: number;
    passed: boolean;
    timeTaken: number;
    pointsEarned: number;
    totalPoints: number;
    userAnswers: (number | null)[];
    questions: Array<{
        question: string;
        options: string[];
        correct: number;
        explanation: string;
    }>;
    dateTaken: string;
}

export interface ProfileData {
    name: string;
    profilePic: string | null;
}