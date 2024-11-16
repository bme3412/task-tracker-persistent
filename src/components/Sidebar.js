import React from 'react';
import { Trophy, X } from 'lucide-react';

const Sidebar = ({ 
  dailyScores, 
  isOpen, 
  toggleSidebar, 
  totalPoints, 
  loggedDays 
}) => {
  return (
    <aside 
      className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-50
        w-80 p-6 overflow-y-auto transition-all duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Progress Tracker</h2>
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold">Total Points</h3>
        </div>
        <p className="text-3xl font-bold text-gray-800">{totalPoints}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 mb-4">Logged Days</h3>
        {Object.entries(loggedDays)
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map(([date, data]) => (
            <div
              key={date}
              className="bg-gray-50 p-4 rounded-lg border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">
                  {new Date(date).toLocaleDateString()}
                </span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {data.score}%
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">{data.points} points</span>
                <span className="mx-2">•</span>
                <span>{data.completed}/{data.total} tasks</span>
              </div>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;