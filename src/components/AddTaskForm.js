import React from 'react';

const AddTaskForm = ({ newTask, setNewTask, isRecurring, setIsRecurring, taskDifficulty, setTaskDifficulty, addTask }) => {
  return (
    <form onSubmit={addTask} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 p-2 border rounded"
      />
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="form-checkbox"
        />
        Recurring
      </label>
      <select
        value={taskDifficulty}
        onChange={(e) => setTaskDifficulty(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
