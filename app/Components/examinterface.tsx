// components/ExamInterface.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizByDifficulty } from './Data/Data';
import { ExamResult } from './Components/ExamInterface';

interface ExamInterfaceProps {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    onExit: () => void;
}

export default function ExamInterface({ difficulty, onExit }: ExamInterfaceProps) {
    const router = useRouter();
    const quiz = getQuizByDifficulty(difficulty);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (quiz) {
            setUserAnswers(new Array(quiz.questions.length).fill(null));
            setTimeRemaining(quiz.timeLimit);
        }
    }, [quiz]);

    useEffect(() => {
        if (!quiz || isPaused || timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    handleSubmit(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quiz, isPaused, timeRemaining]);

    const saveAnswer = (questionIndex: number, answerIndex: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[questionIndex] = answerIndex;
        setUserAnswers(newAnswers);
    };

    const handleSubmit = useCallback((forced = false) => {
        if (!quiz) return;

        if (!forced) {
            const unanswered = userAnswers.filter(a => a === null).length;
            if (unanswered > 0) {
                const confirmed = confirm(`⚠️ You have ${unanswered} unanswered question(s). Submit anyway?`);
                if (!confirmed) return;
            }
        }

        let correct = 0, wrong = 0, unanswered = 0;

        quiz.questions.forEach((q, i) => {
            if (userAnswers[i] === null) unanswered++;
            else if (userAnswers[i] === q.correct) correct++;
            else wrong++;
        });

        const total = quiz.questions.length;
        const percentage = Math.round((correct / total) * 100);
        const timeTaken = quiz.timeLimit - timeRemaining;
        const pointsPerQ = Math.round(quiz.totalPoints / total);

        const result: ExamResult = {
            quizTitle: quiz.title,
            difficulty: quiz.difficulty,
            totalQuestions: total,
            correctAnswers: correct,
            wrongAnswers: wrong,
            unanswered: unanswered,
            scorePercentage: percentage,
            passed: percentage >= 60,
            timeTaken: timeTaken,
            pointsEarned: correct * pointsPerQ,
            totalPoints: quiz.totalPoints,
            userAnswers: [...userAnswers],
            questions: quiz.questions,
            dateTaken: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };

        // Save to localStorage
        const history = JSON.parse(localStorage.getItem('examHistory') || '[]');
        history.push(result);
        localStorage.setItem('examHistory', JSON.stringify(history));
        localStorage.setItem('latestResult', JSON.stringify(result));

        router.push('/results');
    }, [quiz, userAnswers, timeRemaining, router]);

    if (!quiz) return null;

    const currentQ = quiz.questions[currentQuestion];
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header Bar */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{quiz.title}</h3>
                            <span className="text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${isPaused ? 'bg-success text-white' : 'bg-gray-200 text-gray-800'
                                    }`}
                            >
                                {isPaused ? '▶ Resume' : '⏸ Pause'}
                            </button>

                            <div className={`px-6 py-3 rounded-lg font-bold text-white text-lg ${timeRemaining < 120 ? 'bg-danger' : 'bg-secondary'
                                }`}>
                                ⏱️ {minutes}:{seconds}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pause Overlay */}
                {isPaused && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-12 text-center shadow-2xl">
                            <div className="text-6xl mb-4">⏸️</div>
                            <h2 className="text-3xl font-bold mb-4">Exam Paused</h2>
                            <p className="text-gray-600 mb-6">Your timer has been stopped. Take a break!</p>
                            <button onClick={() => setIsPaused(false)} className="btn-primary">
                                ▶ Resume Exam
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Question Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="mb-6">
                                <div className="text-primary font-bold text-lg mb-2">Question {currentQuestion + 1}</div>
                                <p className="text-xl text-gray-800 font-medium">{currentQ.question}</p>
                            </div>

                            <div className="space-y-3 mb-8">
                                {currentQ.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                                    >
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={index}
                                            checked={userAnswers[currentQuestion] === index}
                                            onChange={() => saveAnswer(currentQuestion, index)}
                                            className="w-5 h-5 text-primary"
                                        />
                                        <span className="ml-3 text-gray-800">
                                            {String.fromCharCode(65 + index)}. {option}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <button
                                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                    disabled={currentQuestion === 0}
                                    className="btn-nav disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                <button
                                    onClick={() => handleSubmit(false)}
                                    className="btn-submit"
                                >
                                    Submit Exam
                                </button>

                                <button
                                    onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                                    disabled={currentQuestion === quiz.questions.length - 1}
                                    className="btn-nav disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Question Navigator */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                            <h4 className="font-bold text-lg mb-4">Question Navigator</h4>

                            <div className="grid grid-cols-5 gap-2 mb-6">
                                {quiz.questions.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentQuestion(index)}
                                        className={`w-10 h-10 rounded-lg font-semibold transition-colors ${index === currentQuestion
                                                ? 'bg-primary text-white'
                                                : userAnswers[index] !== null
                                                    ? 'bg-success text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 bg-success rounded"></span>
                                    <span>Answered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 bg-gray-200 rounded"></span>
                                    <span>Unanswered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 bg-primary rounded"></span>
                                    <span>Current</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}