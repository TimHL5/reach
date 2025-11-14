import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, TrendingUp, ExternalLink, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { TallyButton } from '../components/ui/TallyButton';
import { CollegeNotes } from '../components/universities/CollegeNotes';
import { AuthModal } from '../components/auth/AuthModal';
import type { University } from '../types/university';

export default function UniversityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchUniversity = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        if (!data) {
          setError('University not found');
        } else {
          setUniversity(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch university');
        console.error('Error fetching university:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-reach-blue"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">University Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link to="/universities" className="text-reach-blue hover:underline">
              ← Back to Universities
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/universities" className="inline-flex items-center text-reach-blue hover:text-reach-purple transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Universities
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-brand text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{university.name}</h1>
            <div className="flex items-center text-white/90 text-lg mb-4">
              <MapPin size={20} className="mr-2" />
              <span>
                {university.city}, {university.state} • {university.country}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {university.type && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {university.type}
                </span>
              )}
              {university.us_news_rank && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  #{university.us_news_rank} US News
                </span>
              )}
            </div>

            {university.website && (
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-reach-blue rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Visit Website
                <ExternalLink size={16} className="ml-2" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Stats */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {university.acceptance_rate !== null && (
                  <div className="flex items-start">
                    <TrendingUp className="text-reach-blue mr-3 mt-1" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Acceptance Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(university.acceptance_rate * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}

                {university.total_enrollment !== null && (
                  <div className="flex items-start">
                    <Users className="text-reach-blue mr-3 mt-1" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Total Enrollment</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {university.total_enrollment.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {university.graduation_rate !== null && (
                  <div className="flex items-start">
                    <GraduationCap className="text-reach-blue mr-3 mt-1" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Graduation Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(university.graduation_rate * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                )}

                {university.retention_rate !== null && (
                  <div className="flex items-start">
                    <TrendingUp className="text-reach-blue mr-3 mt-1" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Retention Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(university.retention_rate * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Costs & Financial Aid */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Costs & Financial Aid</h2>
              <div className="space-y-4">
                {university.tuition_out_state !== null && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Tuition (Out-of-State)</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${university.tuition_out_state.toLocaleString()}
                    </span>
                  </div>
                )}

                {university.tuition_in_state !== null && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Tuition (In-State)</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${university.tuition_in_state.toLocaleString()}
                    </span>
                  </div>
                )}

                {university.room_and_board !== null && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Room & Board</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${university.room_and_board.toLocaleString()}
                    </span>
                  </div>
                )}

                {university.avg_net_price !== null && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Average Net Price</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${university.avg_net_price.toLocaleString()}
                    </span>
                  </div>
                )}

                {university.percent_receiving_aid !== null && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Students Receiving Aid</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {(university.percent_receiving_aid * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Academics */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Academics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {university.average_sat !== null && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average SAT</p>
                    <p className="text-xl font-semibold text-gray-900">{university.average_sat}</p>
                  </div>
                )}

                {university.average_act !== null && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average ACT</p>
                    <p className="text-xl font-semibold text-gray-900">{university.average_act}</p>
                  </div>
                )}

                {university.student_faculty_ratio !== null && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Student-Faculty Ratio</p>
                    <p className="text-xl font-semibold text-gray-900">{university.student_faculty_ratio}:1</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Application Info</h3>
              <div className="space-y-3">
                {university.application_deadline && (
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold text-gray-900">{university.application_deadline}</p>
                  </div>
                )}

                {university.application_fee !== null && (
                  <div>
                    <p className="text-sm text-gray-600">Application Fee</p>
                    <p className="font-semibold text-gray-900">${university.application_fee}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {university.common_app && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      Common App
                    </span>
                  )}
                  {university.coalition_app && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      Coalition App
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* College Notes */}
            <CollegeNotes
              universityId={university.id}
              universityName={university.name}
              onAuthRequired={() => setShowAuthModal(true)}
            />

            {/* CTA Box */}
            <div className="bg-gradient-brand rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Need help applying to {university.name}?</h3>
              <p className="text-white/90 mb-6">
                Get personalized guidance, essay feedback, and application strategy with Reach.
              </p>
              <TallyButton variant="secondary" className="w-full">
                Join the Waitlist
              </TallyButton>
              <p className="text-sm text-white/80 mt-4 text-center">
                Launching Spring 2026 • $199/year
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Footer />
    </div>
  );
}
