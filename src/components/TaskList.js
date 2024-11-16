import React from 'react';
import { Check, X } from 'lucide-react';

const TaskList = ({
  tasks,
  selectedDate,
  markPositive,
  markNegative,
  toggleCompletion
}) => {
  const isCompleted = (task) => task.completedDates.includes(selectedDate);
  const isNegative = (task) => task.negativeDates?.includes(selectedDate);

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`
            p-3 rounded-lg shadow bg-white
            ${isCompleted(task) ? 'border-l-4 border-green-500' : ''}
            ${isNegative(task) ? 'border-l-4 border-red-500' : ''}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span 
                className={`
                  font-medium 
                  ${isCompleted(task) ? 'text-green-600' : ''} 
                  ${isNegative(task) ? 'text-red-600' : ''}
                `}
              >
                {task.text}
              </span>
              <span className="text-sm text-gray-500">
                {task.points || 5} pts
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Green Check Button */}
              <button
                onClick={() => markPositive(task.id)}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
                aria-label="Mark positive"
              >
                <Check className="w-5 h-5" />
              </button>
              
              {/* Red X Button */}
              <button
                onClick={() => markNegative(task.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                aria-label="Mark negative"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;