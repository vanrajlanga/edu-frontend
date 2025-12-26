'use client';

import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Mock colleges data for placement comparison
const mockCollegesForPlacement = [
  {
    id: 1,
    name: 'IIM Ahmedabad',
    logo: null,
    highestPackage: 11000000,
    averagePackage: 3522591,
  },
  {
    id: 2,
    name: 'FMS Delhi',
    logo: null,
    highestPackage: 12300000,
    averagePackage: 4610000,
  },
  {
    id: 3,
    name: 'ISB Hyderabad',
    logo: null,
    highestPackage: 6600000,
    averagePackage: 3325000,
  },
  {
    id: 4,
    name: 'IIT Bombay',
    logo: null,
    highestPackage: 10000000,
    averagePackage: 2350000,
  },
  {
    id: 5,
    name: 'XLRI Jamshedpur',
    logo: null,
    highestPackage: 7500000,
    averagePackage: 2868000,
  },
  {
    id: 6,
    name: 'IIM Bangalore',
    logo: null,
    highestPackage: 11500000,
    averagePackage: 3488000,
  },
  {
    id: 7,
    name: 'IIM Indore',
    logo: null,
    highestPackage: 7000000,
    averagePackage: 2957000,
  },
];

function ComparePlacementModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const formatPackage = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="relative bg-white rounded-lg shadow-2xl mx-4 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-base font-bold text-gray-900">
              College Placement Comparison
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" size="sm" />
            </button>
          </div>

          {/* Table */}
          <div className="p-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-orange-50 border-b border-gray-200">
                <div className="px-3 py-2 font-semibold text-gray-900 text-xs">
                  College
                </div>
                <div className="px-3 py-2 font-semibold text-gray-900 text-xs border-l border-gray-200">
                  Highest Package
                </div>
                <div className="px-3 py-2 font-semibold text-gray-900 text-xs border-l border-gray-200">
                  Average Package
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {mockCollegesForPlacement.map((college) => (
                  <div key={college.id} className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                    {/* College Column */}
                    <div className="px-3 py-2 flex items-center gap-2">
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt={college.name}
                          className="w-6 h-6 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-100 to-green-200 border border-green-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-700 font-bold text-[10px]">
                            {college.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <a
                        href="#"
                        className="text-green-600 hover:underline text-xs font-medium"
                      >
                        {college.name}
                      </a>
                    </div>

                    {/* Highest Package Column */}
                    <div className="px-3 py-2 border-l border-gray-200">
                      <div className="text-xs text-gray-900">
                        <span className="font-semibold">{formatPackage(college.highestPackage)}</span>
                        <span className="text-gray-600">/-</span>
                      </div>
                    </div>

                    {/* Average Package Column */}
                    <div className="px-3 py-2 border-l border-gray-200">
                      <div className="text-xs text-gray-900">
                        <span className="font-semibold">{formatPackage(college.averagePackage)}</span>
                        <span className="text-gray-600">/-</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { ComparePlacementModal };
export default ComparePlacementModal;
