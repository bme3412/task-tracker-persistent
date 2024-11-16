import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const TaskItem = ({ task, toggleCompletion, markNegative, markPositive }) => {
  const isCompleted = task.completedDates.includes(task.dateAdded);
  const isNegative = task.negativeDates?.includes(task.dateAdded);

  return (
    <div className="flex items-center justify-between gap-2 p-3 border rounded bg-white shadow-sm">
      <div className="flex items-center gap-2">
        {/* Toggle Completion Button */}
        <button
          onClick={() => toggleCompletion(task.id)}
          className="hover:scale-110 transition-transform focus:outline-none"
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <CheckCircle2 
            className={`w-6 h-6 ${
              isCompleted ? 'text-green-500' : 'text-gray-300'
            } hover:text-green-600`} 
          />
        </button>

        {/* Add Points Button (Green X-Circle) */}
        <button
          onClick={() => markPositive(task.id)}
          className="hover:scale-110 transition-transform focus:outline-none"
          aria-label="Add points"
        >
          <XCircle 
            className={`w-6 h-6 text-green-500 hover:text-green-700`} 
          />
        </button>

        {/* Subtract Points Button (Red X-Circle) */}
        <button
          onClick={() => markNegative(task.id)}
          className="hover:scale-110 transition-transform focus:outline-none"
          aria-label="Subtract points"
        >
          <XCircle 
            className={`w-6 h-6 text-red-500 hover:text-red-700`} 
          />
        </button>
      </div>
      
      <div className="flex-1 ml-2">
        <span className={`font-medium ${
          isCompleted ? 'line-through text-gray-500' : 
          isNegative ? 'text-red-500' : 
          'text-gray-900'
        }`}>
          {task.text}
        </span>
        <div className="text-xs text-gray-400">{task.category}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded ${
          isNegative ? 'bg-red-100 text-red-800' :
          isCompleted ? 'bg-green-100 text-green-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {isNegative ? `-${task.points}` : `${task.points}`} pts
        </span>
        {task.isRecurring && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Recurring
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
