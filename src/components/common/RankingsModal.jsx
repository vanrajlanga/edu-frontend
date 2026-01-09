'use client';

import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function RankingsModal({ isOpen, onClose, collegeName = 'IIM Ahmedabad', rankings = [] }) {
  if (!isOpen) return null;

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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 flex items-center justify-center">
                <span className="text-blue-700 font-bold text-sm">
                  {collegeName?.charAt(0)}
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900">
                {collegeName} - Ranking
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" size="sm" />
            </button>
          </div>

          {/* Rankings List */}
          <div className="p-4">
            <div className="space-y-2">
              {rankings.map((ranking, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Agency Logo/Icon */}
                  {ranking.logo ? (
                    <img
                      src={ranking.logo}
                      alt={ranking.agency}
                      className="w-10 h-10 object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold text-xs">
                        {ranking.agency?.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Ranking Info */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-bold">Ranked {ranking.rank}</span>
                      {' for MBA by '}
                      <span className="font-semibold">{ranking.agency}</span>
                      {' '}
                      <span className="text-gray-600">{ranking.year}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {rankings.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No rankings available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { RankingsModal };
export default RankingsModal;
