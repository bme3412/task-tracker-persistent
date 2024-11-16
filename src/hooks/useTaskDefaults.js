import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { POINT_VALUES } from '@/constants/taskDefaults';


export const useTaskDefaults = (
  tasks,
  setTasks,
  defaultTasks,
  setDefaultTasks,
  selectedDate
) => {
  const populateDefaultTasks = useCallback(
    (date) => {
      const existingDefaultTasks = tasks.filter(
        (task) => task.dateAdded === date && task.isDefault
      );

      if (existingDefaultTasks.length === 0) {
        const newDefaultTasks = defaultTasks.map((defaultTask) => ({
          id: uuidv4(),
          text: defaultTask.text,
          category: defaultTask.category,
          dateAdded: date,
          isRecurring: false,
          isDefault: true,
          difficulty: "medium",
          points: defaultTask.points,
          completedDates: [],
          negativeDates: [],
        }));

        setTasks((prev) => [...prev, ...newDefaultTasks]);
      }
    },
    [tasks, defaultTasks, setTasks]
  );

  const addDefaultTask = useCallback(
    (e, newDefaultTask, newDefaultCategory) => {
      e.preventDefault();
      if (!newDefaultTask.trim()) return;

      const newTask = {
        text: newDefaultTask,
        category: newDefaultCategory,
        points: POINT_VALUES["medium"],
      };

      setDefaultTasks((prev) => [...prev, newTask]);
      populateDefaultTasks(selectedDate);
    },
    [setDefaultTasks, populateDefaultTasks, selectedDate]
  );

  const removeDefaultTask = useCallback(
    (taskText) => {
      setDefaultTasks((prev) => prev.filter((task) => task.text !== taskText));
    },
    [setDefaultTasks]
  );

  return {
    populateDefaultTasks,
    addDefaultTask,
    removeDefaultTask,
  };
};