import { useCallback, useMemo } from 'react';
import { POINT_VALUES } from '@/constants/taskDefaults';

export const useScoreCalculator = (
  tasks, 
  accumulatedPoints, 
  setDailyScores,
  dailyScores
) => {
  const calculateAndSaveDailyScore = useCallback(
    (date) => {
      const dayTasks = tasks.filter(
        (task) => task.isRecurring || task.dateAdded === date
      );

      let totalPoints = 0;
      let completed = 0;
      const total = dayTasks.length;

      // Calculate points for each task
      dayTasks.forEach(task => {
        const taskPoints = task.points || POINT_VALUES[task.difficulty] || POINT_VALUES.medium;
        const taskKey = `${task.id}-${date}`;
        
        // Add points from completion
        if (task.completedDates.includes(date)) {
          totalPoints += taskPoints;
          completed++;
        }

        // Add/subtract points from marks (positive/negative)
        if (accumulatedPoints[taskKey]) {
          totalPoints += accumulatedPoints[taskKey];
        }
      });

      const totalPossiblePoints = dayTasks.reduce(
        (acc, task) => acc + (task.points || POINT_VALUES[task.difficulty] || POINT_VALUES.medium),
        0
      );

      const score = total > 0 ? Math.round((completed / total) * 100) : 0;

      // Update daily scores
      setDailyScores(prev => ({
        ...prev,
        [date]: {
          score,
          completed,
          total,
          points: totalPoints,
          possiblePoints: totalPossiblePoints,
        }
      }));
    },
    [tasks, accumulatedPoints, setDailyScores]
  );

  return {
    calculateAndSaveDailyScore,
    totalPoints: useMemo(() => 
      Object.values(dailyScores).reduce((sum, day) => sum + (day.points || 0), 0)
    , [dailyScores])
  };
};