// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Welcome to Online Examination System</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Test your knowledge with our interactive quiz platform. Choose from Beginner, Intermediate, or Advanced exams.
          </p>
          <Link href="/exams" className="btn-primary inline-block text-lg">
            Start Exam
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why ExamPortal?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Multiple Exams</h3>
              <p className="text-gray-600">
                Choose from a variety of exams across different subjects and difficulty levels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Timed Challenges</h3>
              <p className="text-gray-600">
                Test yourself under time pressure just like in real competitive exams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Detailed Results</h3>
              <p className="text-gray-600">
                Get comprehensive performance analysis after every exam you take.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement over time with a full history of your results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}