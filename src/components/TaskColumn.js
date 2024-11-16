import React from 'react';
import CompactTaskItem from './CompactTaskItem';

const TaskColumn = ({ title, tasks, toggleCompletion, markNegative, markPositive }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="font-medium text-sm mb-2 text-gray-700">
        {title} ({tasks.length})
      </div>
      
      <div className="flex-1 border rounded-lg overflow-hidden bg-white">
        {tasks.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <CompactTaskItem
                key={task.id}
                task={task}
                toggleCompletion={toggleCompletion}
                markNegative={markNegative}
                markPositive={markPositive}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
