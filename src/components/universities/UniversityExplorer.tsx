import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { SearchBar } from './SearchBar';
import { UniversityFilters } from './UniversityFilters';
import { UniversityCard } from './UniversityCard';
import type { University, FilterState } from '../../types/university';
import { Loader2 } from 'lucide-react';

export const UniversityExplorer = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    country: 'all',
    state: 'all',
    maxTuition: 100000,
    minAcceptance: 0,
    maxAcceptance: 100,
    minEnrollment: 0,
    maxEnrollment: 200000,
    type: 'all',
  });

  // Fetch universities on mount
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        console.log('🔍 Starting to fetch universities...');

        const { data, error, count } = await supabase
          .from('universities')
          .select('*', { count: 'exact' })
          .order('name');

        console.log('📊 Supabase response:');
        console.log('  - Data length:', data?.length);
        console.log('  - Total count:', count);
        console.log('  - Error:', error);

        if (error) {
          console.error('❌ Supabase error:', error);
          throw error;
        }

        const universities = (data || []) as University[];

        if (universities.length > 0) {
          // Check data sample
          console.log('📝 First 3 universities:', universities.slice(0, 3));

          // Check unique types
          const types = [...new Set(universities.map(u => u.type))];
          console.log('🏛️ Unique types found:', types);

          // Count by type
          const typeCounts = universities.reduce((acc: Record<string, number>, uni) => {
            const type = uni.type || 'Unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          console.log('📈 Count by type:', typeCounts);
        }

        setUniversities(universities);
        setFilteredUniversities(universities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch universities');
        console.error('💥 Error fetching universities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Apply filters whenever search term or filters change
  useEffect(() => {
    console.log('🔧 Applying filters...');
    console.log('  Current filters:', filters);
    console.log('  Total universities before filtering:', universities.length);

    let result = [...universities];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(u =>
        u.name.toLowerCase().includes(search) ||
        u.city.toLowerCase().includes(search) ||
        (u.state && u.state.toLowerCase().includes(search))
      );
      console.log('  After search filter:', result.length);
    }

    // Country filter
    if (filters.country !== 'all') {
      result = result.filter(u => u.country === filters.country);
      console.log('  After country filter:', result.length);
    }

    // State filter
    if (filters.state !== 'all') {
      result = result.filter(u => u.state === filters.state);
      console.log('  After state filter:', result.length);
    }

    // Type filter
    if (filters.type !== 'all') {
      console.log('  Filtering by type:', filters.type);

      // Check what types exist in current filtered set
      const currentTypes = [...new Set(result.map(u => u.type))];
      console.log('  Available types in result:', currentTypes);

      result = result.filter(u => u.type === filters.type);
      console.log('  After type filter:', result.length);

      // Debug: Show sample of filtered universities
      console.log('  Sample filtered universities:', result.slice(0, 3).map(u => ({ name: u.name, type: u.type })));
    }

    // Tuition filter
    const beforeTuition = result.length;
    result = result.filter(u =>
      !u.tuition_out_state || u.tuition_out_state <= filters.maxTuition
    );
    if (beforeTuition !== result.length) {
      console.log('  After tuition filter:', result.length);
    }

    // Acceptance rate filter
    const beforeAcceptance = result.length;
    result = result.filter(u =>
      !u.acceptance_rate || (
        u.acceptance_rate * 100 >= filters.minAcceptance &&
        u.acceptance_rate * 100 <= filters.maxAcceptance
      )
    );
    if (beforeAcceptance !== result.length) {
      console.log('  After acceptance rate filter:', result.length);
    }

    // Enrollment filter
    const beforeEnrollment = result.length;
    result = result.filter(u =>
      !u.total_enrollment || (
        u.total_enrollment >= filters.minEnrollment &&
        u.total_enrollment <= filters.maxEnrollment
      )
    );
    if (beforeEnrollment !== result.length) {
      console.log('  After enrollment filter:', result.length);
    }

    console.log('✅ Final filtered count:', result.length);
    setFilteredUniversities(result);
  }, [searchTerm, filters, universities]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-reach-blue" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading universities</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Universities</h1>
          <p className="text-lg text-gray-600">
            Discover and compare {universities.length.toLocaleString()} universities
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, city, or state..."
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4">
            <UniversityFilters
              filters={filters}
              onFilterChange={setFilters}
              universities={universities}
            />
          </aside>

          {/* University Grid */}
          <main className="w-full lg:w-3/4">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredUniversities.length.toLocaleString()}</span> of <span className="font-semibold">{universities.length.toLocaleString()}</span> universities
              </p>
            </div>

            {filteredUniversities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No universities found matching your criteria</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUniversities.map(university => (
                  <UniversityCard key={university.id} university={university} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
