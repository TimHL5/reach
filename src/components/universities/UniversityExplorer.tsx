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
    maxTuition: 200000, // Increased from 100k to 200k to not filter by default
    minTotalCost: 0,
    maxTotalCost: 300000, // Max total cost (tuition + room & board + books)
    minAcceptance: 0,
    maxAcceptance: 100,
    minEnrollment: 0,
    maxEnrollment: 200000,
    type: 'all',
  });

  // Fetch universities on mount
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      console.log('🚀 Starting university fetch with batch loading...');

      try {
        // First, get the total count
        const { count: totalCount, error: countError } = await supabase
          .from('universities')
          .select('*', { count: 'exact', head: true });

        if (countError) {
          console.error('❌ Error getting count:', countError);
          throw countError;
        }

        console.log('📊 Total universities in database:', totalCount);

        // Fetch all universities in batches to avoid any limits
        let allUniversities: University[] = [];
        const batchSize = 1000; // Supabase default limit
        let start = 0;

        while (start < (totalCount || 0)) {
          console.log(`📦 Fetching batch ${Math.floor(start / batchSize) + 1}: records ${start} to ${start + batchSize - 1}`);

          const { data: batch, error: batchError } = await supabase
            .from('universities')
            .select('*')
            .order('name')
            .range(start, start + batchSize - 1);

          if (batchError) {
            console.error('❌ Error fetching batch:', batchError);
            throw batchError;
          }

          if (!batch || batch.length === 0) {
            console.log('⚠️ No more data in this batch, stopping...');
            break;
          }

          allUniversities = [...allUniversities, ...(batch as University[])];
          console.log(`  ✅ Batch fetched: ${batch.length} records. Total so far: ${allUniversities.length}`);

          start += batchSize;

          // Safety check: if batch is smaller than batchSize, we've reached the end
          if (batch.length < batchSize) {
            console.log('✅ Reached end of data (partial batch)');
            break;
          }
        }

        console.log(`\n✅ FETCH COMPLETE`);
        console.log(`  - Expected from count: ${totalCount}`);
        console.log(`  - Actually fetched: ${allUniversities.length}`);

        if (allUniversities.length !== totalCount) {
          console.warn(`⚠️ MISMATCH: Fetched ${allUniversities.length} but count says ${totalCount}`);
        }

        // Analyze data
        if (allUniversities.length > 0) {
          // Check unique types
          const types = [...new Set(allUniversities.map(u => u.type))];
          console.log('🏛️ Unique types found:', types);

          // Count by type
          const typeCounts = allUniversities.reduce((acc: Record<string, number>, uni) => {
            const type = uni.type || 'Unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

          console.log('📈 Count by type:');
          console.log('  - Public:', typeCounts['Public'] || 0);
          console.log('  - Private Non-Profit:', typeCounts['Private Non-Profit'] || 0);
          console.log('  - Other/Unknown:', typeCounts['Unknown'] || 0);

          // Log sample universities
          console.log('📝 Sample universities (first 5):');
          console.table(allUniversities.slice(0, 5).map(u => ({
            name: u.name,
            city: u.city,
            state: u.state,
            type: u.type
          })));
        }

        console.log('✅ Setting universities state with', allUniversities.length, 'records\n');
        setUniversities(allUniversities);
        setFilteredUniversities(allUniversities);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch universities');
        console.error('💥 Fatal error fetching universities:', err);
        setUniversities([]);
        setFilteredUniversities([]);
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

    // Total cost filter (tuition + room & board + books)
    const beforeTotalCost = result.length;
    result = result.filter(u => {
      // Calculate total cost if data is available
      // Use out-of-state tuition as default, fall back to in-state if not available
      const tuition = u.tuition_out_state || u.tuition_in_state || 0;
      const roomBoard = u.room_and_board || 0;
      const books = u.books_supplies || 0;
      const totalCost = tuition + roomBoard + books;

      // Only filter if we have at least tuition data
      if (!u.tuition_out_state && !u.tuition_in_state) {
        return true; // Include universities with no cost data
      }

      return totalCost >= filters.minTotalCost && totalCost <= filters.maxTotalCost;
    });
    if (beforeTotalCost !== result.length) {
      console.log('  After total cost filter:', result.length);
    }

    // Acceptance rate filter
    const beforeAcceptance = result.length;
    result = result.filter(u =>
      !u.acceptance_rate || (
        u.acceptance_rate >= filters.minAcceptance &&
        u.acceptance_rate <= filters.maxAcceptance
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
