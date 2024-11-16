'use client';

import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from '@/components/Sidebar';
import TaskList from '@/components/TaskList';
import AddTaskForm from '@/components/AddTaskForm';
import DefaultTaskManager from '@/components/DefaultTaskManager';
import PointsAnimation from '@/components/PointsAnimation';
import Header from '@/components/Header';
import ProgressCard from '@/components/ProgressCard';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useTaskDefaults } from '@/hooks/useTaskDefaults';
import { DEFAULT_DAILY_TASKS, POINT_VALUES } from '@/constants/taskDefaults';

const TaskTracker = () => {
  // State Management
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [defaultTasks, setDefaultTasks] = useLocalStorage("defaultTasks", DEFAULT_DAILY_TASKS);
  const [dailyScores, setDailyScores] = useLocalStorage("dailyScores", {});
  const [accumulatedPoints, setAccumulatedPoints] = useLocalStorage("accumulatedPoints", {});
  const [loggedDays, setLoggedDays] = useLocalStorage("loggedDays", {});

  const [newTask, setNewTask] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [taskDifficulty, setTaskDifficulty] = useState("medium");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [isManagingDefaults, setIsManagingDefaults] = useState(false);
  const [newDefaultTask, setNewDefaultTask] = useState("");
  const [newDefaultCategory, setNewDefaultCategory] = useState("Health");
  const [pointsToAnimate, setPointsToAnimate] = useState(null);
  const [isResetting, setIsResetting] = useState(false);

  const { populateDefaultTasks, addDefaultTask, removeDefaultTask } = useTaskDefaults(
    tasks,
    setTasks,
    defaultTasks,
    setDefaultTasks,
    selectedDate
  );

  // Calculate total points manually
  const totalPoints = tasks.reduce((total, task) => total + (task.points || 0), 0);

  // Reset functionality
  const resetToDefaults = useCallback(() => {
    setIsResetting(true);
    setDefaultTasks(DEFAULT_DAILY_TASKS);
    setTasks([]);
    setDailyScores({}); // Clear all scores
    setAccumulatedPoints({}); // Clear all accumulated points
    setLoggedDays({}); // Clear all logged days

    setTimeout(() => {
      populateDefaultTasks(selectedDate);
      setIsResetting(false);
    }, 100);
  }, [
    setDefaultTasks,
    setTasks,
    setDailyScores,
    setAccumulatedPoints,
    setLoggedDays,
    selectedDate,
    populateDefaultTasks,
  ]);

  // Get Today's Tasks
  const getTodaysTasks = useCallback(() => {
    return tasks.filter(
      (task) => task.isRecurring || task.dateAdded === selectedDate
    );
  }, [tasks, selectedDate]);

  // Add New Task
  const addTask = useCallback(
    (e) => {
      e.preventDefault();
      if (!newTask.trim()) return;

      const newTaskItem = {
        id: uuidv4(),
        text: newTask,
        dateAdded: selectedDate,
        isRecurring,
        isDefault: false,
        difficulty: taskDifficulty,
        points: POINT_VALUES[taskDifficulty],
        completedDates: [],
        negativeDates: [],
      };

      setTasks((prev) => [...prev, newTaskItem]);
      setNewTask("");
      setIsRecurring(false);
      setTaskDifficulty("medium");
    },
    [newTask, isRecurring, taskDifficulty, selectedDate, setTasks]
  );

  // Log Day function
  const logDay = useCallback(() => {
    setLoggedDays((prev) => ({
      ...prev,
      [selectedDate]: {
        score: dailyScores[selectedDate]?.score || 0,
        points: dailyScores[selectedDate]?.points || 0,
        completed: dailyScores[selectedDate]?.completed || 0,
        total: dailyScores[selectedDate]?.total || 0,
      },
    }));
    setIsSidebarOpen(true); // Auto-open sidebar when logging a day
  }, [selectedDate, dailyScores, setLoggedDays]);

  // Mark Positive Function
  const markPositive = useCallback((taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const points = task.points || 5; // Default to 5 points if not specified

    // Update daily scores immediately
    setDailyScores(prev => {
      const currentScore = prev[selectedDate] || { points: 0, completed: 0, total: tasks.length, score: 0 };

      // Prevent division by zero
      const totalTasks = tasks.length > 0 ? tasks.length : 1;

      return {
        ...prev,
        [selectedDate]: {
          ...currentScore,
          points: currentScore.points + points,
          completed: currentScore.completed + 1,
          total: totalTasks,
          score: Math.round(((currentScore.completed + 1) / totalTasks) * 100)
        }
      };
    });

    // Show points animation
    setPointsToAnimate(points);

    // Update task state
    setTasks(currentTasks => 
      currentTasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            completedDates: [...new Set([...t.completedDates, selectedDate])],
            negativeDates: t.negativeDates?.filter(date => date !== selectedDate) || []
          };
        }
        return t;
      })
    );
  }, [tasks, selectedDate, setDailyScores, setTasks]);

  // Mark Negative Function
  const markNegative = useCallback((taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const points = task.points || 5; // Default to 5 points if not specified

    // Update daily scores immediately
    setDailyScores(prev => {
      const currentScore = prev[selectedDate] || { points: 0, completed: 0, total: tasks.length, score: 0 };

      // Prevent division by zero
      const totalTasks = tasks.length > 0 ? tasks.length : 1;

      // Ensure points do not go below zero
      const updatedPoints = currentScore.points - points;
      const newPoints = updatedPoints < 0 ? 0 : updatedPoints;

      // Ensure completed does not go below zero
      const updatedCompleted = Math.max(0, currentScore.completed - 1);

      return {
        ...prev,
        [selectedDate]: {
          ...currentScore,
          points: newPoints,
          completed: updatedCompleted,
          total: totalTasks,
          score: Math.round((updatedCompleted / totalTasks) * 100)
        }
      };
    });

    // Show points animation
    setPointsToAnimate(-points);

    // Update task state
    setTasks(currentTasks => 
      currentTasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            completedDates: t.completedDates.filter(date => date !== selectedDate),
            negativeDates: [...new Set([...(t.negativeDates || []), selectedDate])]
          };
        }
        return t;
      })
    );
  }, [tasks, selectedDate, setDailyScores, setTasks]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        dailyScores={dailyScores}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        totalPoints={totalPoints}
        loggedDays={loggedDays}
      />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`flex-1 p-2 sm:p-4 ${
          isSidebarOpen ? "ml-80" : "ml-0"
        } transition-all duration-200 overflow-auto`}
      >
        <div className="max-w-4xl mx-auto">
          <Header
            resetToDefaults={resetToDefaults}
            setIsManagingDefaults={setIsManagingDefaults}
            logDay={logDay}
            selectedDate={selectedDate}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <ProgressCard
            selectedDate={selectedDate}
            dailyScores={dailyScores}
          />

          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            isRecurring={isRecurring}
            setIsRecurring={setIsRecurring}
            taskDifficulty={taskDifficulty}
            setTaskDifficulty={setTaskDifficulty}
            addTask={addTask}
          />

          <div className="mt-4">
            <TaskList
              tasks={getTodaysTasks()}
              selectedDate={selectedDate}
              markPositive={markPositive}
              markNegative={markNegative}
            />
          </div>
        </div>
      </div>

      {isManagingDefaults && (
        <DefaultTaskManager
          defaultTasks={defaultTasks}
          addDefaultTask={(e) => addDefaultTask(e, newDefaultTask, newDefaultCategory)}
          removeDefaultTask={removeDefaultTask}
          newDefaultTask={newDefaultTask}
          setNewDefaultTask={setNewDefaultTask}
          newDefaultCategory={newDefaultCategory}
          setNewDefaultCategory={setNewDefaultCategory}
          setIsManagingDefaults={setIsManagingDefaults}
        />
      )}

      {pointsToAnimate && <PointsAnimation points={pointsToAnimate} />}
    </div>
  );
};

export default TaskTracker;
