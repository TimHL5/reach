import type { FilterState, University } from '../../types/university';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  universities: University[];
}

export const UniversityFilters = ({ filters, onFilterChange, universities }: FiltersProps) => {
  const uniqueStates = Array.from(new Set(universities.map(u => u.state).filter(Boolean))).sort();

  const resetFilters = () => {
    onFilterChange({
      country: 'all',
      state: 'all',
      maxTuition: 200000, // Increased from 100k to 200k to not filter by default
      minAcceptance: 0,
      maxAcceptance: 100,
      minEnrollment: 0,
      maxEnrollment: 200000,
      type: 'all',
      minSat: 400,
      maxSat: 1600,
      minAct: 1,
      maxAct: 36,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-24">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
        <select
          value={filters.country}
          onChange={(e) => onFilterChange({ ...filters, country: e.target.value, state: 'all' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reach-blue"
        >
          <option value="all">All Countries</option>
          <option value="USA">United States</option>
        </select>
      </div>

      {/* State (only show if USA selected) */}
      {filters.country === 'USA' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select
            value={filters.state}
            onChange={(e) => onFilterChange({ ...filters, state: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reach-blue"
          >
            <option value="all">All States</option>
            {uniqueStates.map(state => (
              <option key={state || ''} value={state || ''}>{state}</option>
            ))}
          </select>
        </div>
      )}

      {/* University Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reach-blue"
        >
          <option value="all">All Types</option>
          <option value="Public">Public</option>
          <option value="Private Non-Profit">Private Non-Profit</option>
        </select>
      </div>

      {/* Max Tuition */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Tuition: ${filters.maxTuition.toLocaleString()}
        </label>
        <input
          type="range"
          min="0"
          max="200000"
          step="5000"
          value={filters.maxTuition}
          onChange={(e) => onFilterChange({ ...filters, maxTuition: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Acceptance Rate Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Acceptance Rate: {filters.minAcceptance}% - {filters.maxAcceptance}%
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minAcceptance}
            onChange={(e) => onFilterChange({ ...filters, minAcceptance: Number(e.target.value) })}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={filters.maxAcceptance}
            onChange={(e) => onFilterChange({ ...filters, maxAcceptance: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* Enrollment Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enrollment: {filters.minEnrollment.toLocaleString()} - {filters.maxEnrollment.toLocaleString()}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="200000"
            step="1000"
            value={filters.minEnrollment}
            onChange={(e) => onFilterChange({ ...filters, minEnrollment: Number(e.target.value) })}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="200000"
            step="1000"
            value={filters.maxEnrollment}
            onChange={(e) => onFilterChange({ ...filters, maxEnrollment: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* SAT Score Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SAT Score: {filters.minSat} - {filters.maxSat}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="400"
            max="1600"
            step="10"
            value={filters.minSat}
            onChange={(e) => onFilterChange({ ...filters, minSat: Number(e.target.value) })}
            className="w-full"
          />
          <input
            type="range"
            min="400"
            max="1600"
            step="10"
            value={filters.maxSat}
            onChange={(e) => onFilterChange({ ...filters, maxSat: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* ACT Score Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ACT Score: {filters.minAct} - {filters.maxAct}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="36"
            step="1"
            value={filters.minAct}
            onChange={(e) => onFilterChange({ ...filters, minAct: Number(e.target.value) })}
            className="w-full"
          />
          <input
            type="range"
            min="1"
            max="36"
            step="1"
            value={filters.maxAct}
            onChange={(e) => onFilterChange({ ...filters, maxAct: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};
