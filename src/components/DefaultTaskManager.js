import React from 'react';

const DefaultTaskManager = ({
  defaultTasks,
  addDefaultTask,
  removeDefaultTask,
  newDefaultTask,
  setNewDefaultTask,
  newDefaultCategory,
  setNewDefaultCategory,
  setIsManagingDefaults
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">Manage Default Tasks</h2>
        
        <form onSubmit={addDefaultTask} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
          <input
            type="text"
            value={newDefaultTask}
            onChange={(e) => setNewDefaultTask(e.target.value)}
            placeholder="New default task"
            className="flex-1 p-2 border rounded"
          />
          <select
            value={newDefaultCategory}
            onChange={(e) => setNewDefaultCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Health">Health</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {defaultTasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center p-2 border rounded">
              <span>{task.text} ({task.category})</span>
              <button
                onClick={() => removeDefaultTask(task.text)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label={`Remove ${task.text}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsManagingDefaults(false)}
          className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DefaultTaskManager;
