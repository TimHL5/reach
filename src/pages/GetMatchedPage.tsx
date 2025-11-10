import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CollegeMatchingSurvey } from '../components/forms/CollegeMatchingSurvey';

export default function GetMatchedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect College Match
              </h1>
              <p className="text-lg text-gray-600">
                Answer a few questions and get personalized university recommendations powered by AI
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Takes about 5 minutes • 100% free • No commitment
              </p>
            </div>

            <CollegeMatchingSurvey />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
