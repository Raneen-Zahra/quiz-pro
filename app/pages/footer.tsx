// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-xl font-bold mb-3">ExamPortal</h4>
                        <p className="text-gray-300">Your trusted online examination platform</p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-3">Quick Links</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link href="/exams" className="text-gray-300 hover:text-white transition-colors">
                                Exams
                            </Link>
                            <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                                Results
                            </Link>
                            <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                                Profile
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-3">Support</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                Help Center
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                Terms
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-400">
                    © 2026 ExamPortal. All rights reserved.
                </div>
            </div>
        </footer>
    );
}