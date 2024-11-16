import { Trophy, Star } from 'lucide-react';

const ProgressCard = ({ selectedDate, dailyScores }) => {
  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg shadow text-sm sm:text-base">
      <div className="flex items-center justify-between">
        <span className="font-medium">Today's Progress</span>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <span className="text-md font-bold">
              {dailyScores[selectedDate]?.score || 0}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <span className="text-md font-bold">
              {dailyScores[selectedDate]?.points || 0}/
              {dailyScores[selectedDate]?.possiblePoints || 0} pts
            </span>
          </div>
        </div>
      </div>
      <div className="mt-0.5 text-xs sm:text-sm text-gray-600">
        Completed {dailyScores[selectedDate]?.completed || 0}/
        {dailyScores[selectedDate]?.total || 0} tasks
      </div>
    </div>
  );
};

export default ProgressCard;