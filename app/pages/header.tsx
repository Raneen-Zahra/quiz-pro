// components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-secondary shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="logo">
                        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
                            ExamPortal
                        </Link>
                    </div>

                    <nav className="flex gap-6">
                        <Link
                            href="/"
                            className={`text-white font-medium px-4 py-2 rounded-lg transition-colors ${isActive('/') ? 'bg-primary' : 'hover:bg-gray-700'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/exams"
                            className={`text-white font-medium px-4 py-2 rounded-lg transition-colors ${isActive('/exams') ? 'bg-primary' : 'hover:bg-gray-700'
                                }`}
                        >
                            Exams
                        </Link>
                        <Link
                            href="/results"
                            className={`text-white font-medium px-4 py-2 rounded-lg transition-colors ${isActive('/results') ? 'bg-primary' : 'hover:bg-gray-700'
                                }`}
                        >
                            Results
                        </Link>
                        <Link
                            href="/profile"
                            className={`text-white font-medium px-4 py-2 rounded-lg transition-colors ${isActive('/profile') ? 'bg-primary' : 'hover:bg-gray-700'
                                }`}
                        >
                            Profile
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}