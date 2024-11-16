import { useCallback } from 'react';
import { POINT_VALUES } from '@/constants/taskDefaults';

export const useTaskManager = (
  tasks,
  setTasks,
  selectedDate,
  setPointsToAnimate,
  accumulatedPoints,
  setAccumulatedPoints,
  calculateAndSaveDailyScore
) => {
  // Helper to ensure score is calculated immediately
  const updateScore = useCallback((newTasks) => {
    calculateAndSaveDailyScore(selectedDate);
  }, [calculateAndSaveDailyScore, selectedDate]);

  const toggleCompletion = useCallback(
    (taskId) => {
      if (!taskId) return;

      setTasks((currentTasks) => {
        const task = currentTasks.find((t) => t.id === taskId);
        if (!task) return currentTasks;

        const isCompleted = task.completedDates.includes(selectedDate);
        const points = task.points || POINT_VALUES[task.difficulty] || POINT_VALUES.medium;

        // Animation
        setPointsToAnimate(isCompleted ? -points : points);

        // Clear any existing accumulated points
        const taskKey = `${task.id}-${selectedDate}`;
        setAccumulatedPoints(prev => {
          const newPoints = { ...prev };
          delete newPoints[taskKey];
          return newPoints;
        });

        const updatedTasks = currentTasks.map((t) => {
          if (t.id === taskId) {
            const completedDates = isCompleted
              ? t.completedDates.filter((date) => date !== selectedDate)
              : [...t.completedDates, selectedDate];
            return {
              ...t,
              completedDates,
              negativeDates: t.negativeDates?.filter(date => date !== selectedDate) || []
            };
          }
          return t;
        });

        // Update score immediately
        setTimeout(() => updateScore(updatedTasks), 0);
        return updatedTasks;
      });
    },
    [selectedDate, updateScore, setTasks, setPointsToAnimate, setAccumulatedPoints]
  );

  const markPositive = useCallback(
    (taskId) => {
      if (!taskId) return;

      setTasks((currentTasks) => {
        const task = currentTasks.find((t) => t.id === taskId);
        if (!task) return currentTasks;

        const points = task.points || POINT_VALUES[task.difficulty] || POINT_VALUES.medium;
        const taskKey = `${task.id}-${selectedDate}`;

        // Add points
        setAccumulatedPoints(prev => ({
          ...prev,
          [taskKey]: points
        }));

        // Show animation
        setPointsToAnimate(points);

        const updatedTasks = currentTasks.map((t) => {
          if (t.id === taskId) {
            return {
              ...t,
              completedDates: [...new Set([...t.completedDates, selectedDate])],
              negativeDates: (t.negativeDates || []).filter(date => date !== selectedDate)
            };
          }
          return t;
        });

        // Update score immediately
        setTimeout(() => updateScore(updatedTasks), 0);
        return updatedTasks;
      });
    },
    [selectedDate, updateScore, setAccumulatedPoints, setPointsToAnimate]
  );

  const markNegative = useCallback(
    (taskId) => {
      if (!taskId) return;

      setTasks((currentTasks) => {
        const task = currentTasks.find((t) => t.id === taskId);
        if (!task) return currentTasks;

        const points = task.points || POINT_VALUES[task.difficulty] || POINT_VALUES.medium;
        const taskKey = `${task.id}-${selectedDate}`;

        // Subtract points
        setAccumulatedPoints(prev => ({
          ...prev,
          [taskKey]: -points
        }));

        // Show animation
        setPointsToAnimate(-points);

        const updatedTasks = currentTasks.map((t) => {
          if (t.id === taskId) {
            return {
              ...t,
              completedDates: t.completedDates.filter(date => date !== selectedDate),
              negativeDates: [...new Set([...(t.negativeDates || []), selectedDate])]
            };
          }
          return t;
        });

        // Update score immediately
        setTimeout(() => updateScore(updatedTasks), 0);
        return updatedTasks;
      });
    },
    [selectedDate, updateScore, setAccumulatedPoints, setPointsToAnimate]
  );

  return {
    toggleCompletion,
    markPositive,
    markNegative
  };
};