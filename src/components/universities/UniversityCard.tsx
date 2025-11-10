import { Link } from 'react-router-dom';
import { MapPin, Users, TrendingUp, DollarSign } from 'lucide-react';
import type { University } from '../../types/university';

interface UniversityCardProps {
  university: University;
}

export const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <Link
      to={`/universities/${university.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-reach-blue transition-colors line-clamp-2 mb-2">
          {university.name}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin size={16} className="mr-1" />
          <span>
            {university.city}
            {university.state && `, ${university.state}`}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {university.acceptance_rate !== null && (
            <div className="flex items-center text-sm text-gray-700">
              <TrendingUp size={16} className="mr-2 text-reach-blue" />
              <span className="font-medium">Acceptance:</span>
              <span className="ml-auto">{(university.acceptance_rate * 100).toFixed(1)}%</span>
            </div>
          )}

          {university.total_enrollment !== null && (
            <div className="flex items-center text-sm text-gray-700">
              <Users size={16} className="mr-2 text-reach-blue" />
              <span className="font-medium">Enrollment:</span>
              <span className="ml-auto">{university.total_enrollment.toLocaleString()}</span>
            </div>
          )}

          {university.tuition_out_state !== null && (
            <div className="flex items-center text-sm text-gray-700">
              <DollarSign size={16} className="mr-2 text-reach-blue" />
              <span className="font-medium">Tuition:</span>
              <span className="ml-auto">${university.tuition_out_state.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {university.type && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              {university.type}
            </span>
          )}

          {university.us_news_rank && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
              #{university.us_news_rank} US News
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
