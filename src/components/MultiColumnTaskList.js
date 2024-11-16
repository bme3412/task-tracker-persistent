import React from 'react';
import TaskColumn from './TaskColumn';

const MultiColumnTaskList = ({ tasks, toggleCompletion, markNegative, markPositive }) => {
  // Example of how to filter tasks for different columns
  // You can modify these filters or add more columns as needed
  const dailyTasks = tasks.filter(task => task.isDefault);
  const recurringTasks = tasks.filter(task => task.isRecurring);
  const customTasks = tasks.filter(task => !task.isDefault && !task.isRecurring);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TaskColumn
        title="Daily Tasks"
        tasks={dailyTasks}
        toggleCompletion={toggleCompletion}
        markNegative={markNegative}
        markPositive={markPositive}
      />
      <TaskColumn
        title="Recurring Tasks"
        tasks={recurringTasks}
        toggleCompletion={toggleCompletion}
        markNegative={markNegative}
        markPositive={markPositive}
      />
      <TaskColumn
        title="Custom Tasks"
        tasks={customTasks}
        toggleCompletion={toggleCompletion}
        markNegative={markNegative}
        markPositive={markPositive}
      />
    </div>
  );
};

export default MultiColumnTaskList;
