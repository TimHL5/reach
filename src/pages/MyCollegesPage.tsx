import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookmarkX, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { UniversityCard } from '../components/universities/UniversityCard';
import { AuthModal } from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useCollegeLikes } from '../hooks/useCollegeLikes';
import { useCollegeNotes } from '../hooks/useCollegeNotes';
import type { University } from '../types/university';

export default function MyCollegesPage() {
  const { user } = useAuth();
  const { likedColleges, toggleLike, loading: likesLoading } = useCollegeLikes();
  const { notes, loading: notesLoading } = useCollegeNotes();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'with-notes' | 'without-notes'>('all');

  useEffect(() => {
    if (user && !likesLoading) {
      fetchLikedUniversities();
    } else {
      setLoading(false);
    }
  }, [user, likedColleges, likesLoading]);

  const fetchLikedUniversities = async () => {
    if (likedColleges.size === 0) {
      setUniversities([]);
      setLoading(false);
      return;
    }

    try {
      const likedIds = Array.from(likedColleges);
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .in('id', likedIds);

      if (error) throw error;

      setUniversities(data || []);
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUniversities = universities.filter(uni => {
    if (filter === 'with-notes') {
      return notes[uni.id] !== undefined;
    }
    if (filter === 'without-notes') {
      return notes[uni.id] === undefined;
    }
    return true;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Heart size={64} className="mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Colleges</h1>
            <p className="text-lg text-gray-600 mb-8">
              Sign in to save your favorite colleges and add personal notes to keep track of your college search.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 bg-reach-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Sign In to Get Started
            </button>
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <Footer />
      </div>
    );
  }

  if (loading || likesLoading || notesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-reach-blue" size={48} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Colleges</h1>
          <p className="text-lg text-gray-600">
            Your saved colleges and notes ({universities.length} {universities.length === 1 ? 'college' : 'colleges'})
          </p>
        </div>

        {universities.length === 0 ? (
          <div className="text-center py-20">
            <BookmarkX size={64} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Saved Colleges Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring colleges and click the heart icon to save them to your shortlist.
            </p>
            <Link
              to="/universities"
              className="inline-block px-6 py-3 bg-reach-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Explore Colleges
            </Link>
          </div>
        ) : (
          <>
            {/* Filter Buttons */}
            <div className="mb-6 flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-reach-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({universities.length})
              </button>
              <button
                onClick={() => setFilter('with-notes')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'with-notes'
                    ? 'bg-reach-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                With Notes ({universities.filter(u => notes[u.id]).length})
              </button>
              <button
                onClick={() => setFilter('without-notes')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'without-notes'
                    ? 'bg-reach-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Without Notes ({universities.filter(u => !notes[u.id]).length})
              </button>
            </div>

            {filteredUniversities.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No colleges match this filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUniversities.map(university => (
                  <div key={university.id} className="relative">
                    <UniversityCard
                      university={university}
                      isLiked={true}
                      onToggleLike={toggleLike}
                    />
                    {notes[university.id] && (
                      <div className="mt-3 bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">My Notes:</p>
                        <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-wrap">
                          {notes[university.id].note}
                        </p>
                        <Link
                          to={`/universities/${university.slug}`}
                          className="text-sm text-reach-blue hover:underline mt-2 inline-block"
                        >
                          View & Edit →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
