import { ArrowUpDown } from 'lucide-react';
import type { SortOption } from '../../types/university';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 flex items-center gap-1">
        <ArrowUpDown size={16} />
        Sort by:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="block w-full max-w-xs px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-reach-blue focus:border-reach-blue sm:text-sm"
      >
        <option value="none">Default</option>
        <optgroup label="Tuition">
          <option value="tuition-low-high">Tuition: Low to High</option>
          <option value="tuition-high-low">Tuition: High to Low</option>
        </optgroup>
        <optgroup label="Acceptance Rate">
          <option value="acceptance-low-high">Acceptance Rate: Low to High (Most Selective)</option>
          <option value="acceptance-high-low">Acceptance Rate: High to Low (Least Selective)</option>
        </optgroup>
        <optgroup label="Ranking">
          <option value="ranking-low-high">Ranking: Best to Worst</option>
          <option value="ranking-high-low">Ranking: Worst to Best</option>
        </optgroup>
      </select>
    </div>
  );
};
