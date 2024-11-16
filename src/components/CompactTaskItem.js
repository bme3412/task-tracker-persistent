import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const CompactTaskItem = ({ task, toggleCompletion, markNegative, markPositive }) => {
  const isCompleted = task.completedDates.includes(task.dateAdded);
  const isNegative = task.negativeDates?.includes(task.dateAdded);

  return (
    <div className="w-full flex items-center justify-between p-1.5 hover:bg-gray-50 transition-colors bg-white">
      <div className="flex items-center gap-2">
        {/* Toggle Completion Button */}
        <button
          onClick={() => toggleCompletion(task.id)}
          className="hover:scale-110 transition-transform focus:outline-none"
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
          )}
        </button>

        {/* Add Points Button (Green X-Circle) */}
        <button
          onClick={() => markPositive(task.id)}
          className="hover:scale-110 transition-transform focus:outline-none"
          aria-label="Add points"
        >
          <XCircle 
            className={`w-4 h-4 text-green-500 hover:text-green-700`} 
          />
        </button>

        {/* Subtract Points Button (Red X-Circle) */}
        <button
          onClick={() => markNegative(task.id)}
          className="hover:scale-110 transition-transform focus:outline-none"
          aria-label="Subtract points"
        >
          <XCircle 
            className={`w-4 h-4 text-red-500 hover:text-red-700`} 
          />
        </button>
      </div>
      
      <div className="flex-1 min-w-0 ml-2">
        <span className={`text-sm truncate ${isCompleted ? 'line-through text-gray-500' : isNegative ? 'text-red-500' : 'text-gray-900'}`}>
          {task.text}
        </span>
        
        <div className="flex gap-1.5 items-center text-xs">
          {task.isRecurring && (
            <span className="text-blue-600">↻</span>
          )}
          <span className="text-yellow-600 font-medium">
            {isNegative ? `-${task.points}` : `${task.points}`}p
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompactTaskItem;
