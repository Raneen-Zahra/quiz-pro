// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ExamResult } from '../lib/type';

export default function ProfilePage() {
    const [profileName, setProfileName] = useState('Your Name');
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [history, setHistory] = useState<ExamResult[]>([]);

    useEffect(() => {
        // Load profile data
        const savedName = localStorage.getItem('profileName');
        if (savedName) setProfileName(savedName);

        const savedPic = localStorage.getItem('profilePic');
        if (savedPic) setProfilePic(savedPic);

        // Load exam history
        const savedHistory = localStorage.getItem('examHistory');
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    const handleUploadPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            localStorage.setItem('profilePic', base64);
            setProfilePic(base64);
        };
        reader.readAsDataURL(file);
    };

    const removePic = () => {
        localStorage.removeItem('profilePic');
        setProfilePic(null);
    };

    const saveName = () => {
        const trimmed = nameInput.trim();
        if (!trimmed) {
            alert('Please enter a valid name.');
            return;
        }
        localStorage.setItem('profileName', trimmed);
        setProfileName(trimmed);
        setIsEditingName(false);
    };

    // Calculate stats
    const totalExams = history.length;
    const bestScore = totalExams > 0 ? Math.max(...history.map(r => r.scorePercentage)) : 0;
    const avgScore = totalExams > 0
        ? Math.round(history.reduce((sum, r) => sum + r.scorePercentage, 0) / totalExams)
        : 0;
    const passRate = totalExams > 0
        ? Math.round((history.filter(r => r.passed).length / totalExams) * 100)
        : 0;

    const bestExam = totalExams > 0
        ? history.reduce((max, r) => r.scorePercentage > max.scorePercentage ? r : max, history[0]).quizTitle
        : 'None';
    const lastExam = totalExams > 0 ? history[history.length - 1].dateTaken : 'None';

    // Group by difficulty
    const groups = { beginner: [] as ExamResult[], intermediate: [] as ExamResult[], advanced: [] as ExamResult[] };
    history.forEach(r => {
        if (groups[r.difficulty]) groups[r.difficulty].push(r);
    });

    const labels = { beginner: 'Mathematics Quiz', intermediate: 'Science Quiz', advanced: 'Programming Quiz' };
    const colors = { beginner: '#2ecc71', intermediate: '#f39c12', advanced: '#e74c3c' };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                                {profilePic ? (
                                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl">
                                        👤
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                id="picUpload"
                                accept="image/*"
                                onChange={handleUploadPic}
                                className="hidden"
                            />

                            <button
                                onClick={() => document.getElementById('picUpload')?.click()}
                                className="bg-primary text-white px-4 py-2 rounded-lg mb-2 hover:bg-blue-600 transition-colors"
                            >
                                📷 Upload Photo
                            </button>

                            {profilePic && (
                                <button onClick={removePic} className="text-danger hover:underline text-sm">
                                    Remove Photo
                                </button>
                            )}
                        </div>

                        {/* Name Section */}
                        <div className="flex-grow text-center md:text-left">
                            {!isEditingName ? (
                                <div>
                                    <h2 className="text-4xl font-bold text-gray-800 mb-2">{profileName}</h2>
                                    <button
                                        onClick={() => {
                                            setNameInput(profileName);
                                            setIsEditingName(true);
                                        }}
                                        className="text-primary hover:underline"
                                    >
                                        ✏️ Edit
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        className="border-2 border-gray-300 rounded-lg px-4 py-2 text-xl w-full md:w-auto"
                                        placeholder="Enter your name"
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={saveName} className="bg-success text-white px-4 py-2 rounded-lg">
                                            ✅ Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditingName(false)}
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                                        >
                                            ❌ Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Performance Overview */}
                <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Performance Overview</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl mb-2">📚</div>
                            <div className="text-2xl font-bold text-gray-800">{totalExams}</div>
                            <div className="text-gray-600 text-sm">Exams Taken</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl mb-2">🏆</div>
                            <div className="text-2xl font-bold text-gray-800">{bestScore}%</div>
                            <div className="text-gray-600 text-sm">Best Score</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-2xl font-bold text-gray-800">{avgScore}%</div>
                            <div className="text-gray-600 text-sm">Average Score</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl mb-2">✅</div>
                            <div className="text-2xl font-bold text-gray-800">{passRate}%</div>
                            <div className="text-gray-600 text-sm">Pass Rate</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="text-lg font-bold text-gray-800">{bestExam}</div>
                            <div className="text-gray-600 text-sm">Best Exam</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl mb-2">📅</div>
                            <div className="text-sm font-bold text-gray-800">{lastExam}</div>
                            <div className="text-gray-600 text-sm">Last Exam</div>
                        </div>
                    </div>
                </div>

                {/* Exam Breakdown */}
                <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Exam Breakdown</h3>

                    {totalExams === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-2xl font-bold mb-2">No Exams Taken Yet</h3>
                            <p className="text-gray-600">Take some exams to see your breakdown here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.keys(groups).map((key) => {
                                const exams = groups[key as keyof typeof groups];
                                if (exams.length === 0) return null;

                                const avgScore = Math.round(exams.reduce((s, r) => s + r.scorePercentage, 0) / exams.length);
                                const bestScore = Math.max(...exams.map(r => r.scorePercentage));
                                const timesTaken = exams.length;

                                return (
                                    <div key={key} className="bg-white rounded-xl shadow-lg p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-xl font-bold">{labels[key as keyof typeof labels]}</h4>
                                            <span
                                                className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                                                style={{ backgroundColor: colors[key as keyof typeof colors] }}
                                            >
                                                {key}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="h-3 rounded-full"
                                                    style={{ width: `${avgScore}%`, backgroundColor: colors[key as keyof typeof colors] }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-sm text-gray-600">Avg Score</div>
                                                <div className="text-lg font-bold">{avgScore}%</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Best Score</div>
                                                <div className="text-lg font-bold">{bestScore}%</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Times Taken</div>
                                                <div className="text-lg font-bold">{timesTaken}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Suggestions */}
                <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Suggestions & Feedback</h3>

                    {totalExams === 0 ? (
                        <div className="bg-blue-50 border-2 border-primary rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">💡</div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Get Started</h4>
                                    <p className="text-gray-700">
                                        Take your first exam to receive personalized suggestions and feedback on your performance!
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {avgScore >= 80 && (
                                <div className="bg-green-50 border-2 border-success rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">🌟</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Excellent Performance!</h4>
                                            <p className="text-gray-700">
                                                Your average score is {avgScore}%. You are doing fantastic! Keep challenging yourself with harder exams.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {avgScore >= 60 && avgScore < 80 && (
                                <div className="bg-blue-50 border-2 border-primary rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">👍</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Good Job!</h4>
                                            <p className="text-gray-700">
                                                Your average score is {avgScore}%. You are passing most exams. Focus on reviewing wrong answers to push your score higher.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {avgScore < 60 && (
                                <div className="bg-yellow-50 border-2 border-warning rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">⚠️</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Room for Improvement</h4>
                                            <p className="text-gray-700">
                                                Your average score is {avgScore}%. Try reviewing the explanations after each exam and practice more before retaking.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}