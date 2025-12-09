import { useState, useEffect, useCallback } from 'react';
import type { Habit, CompletionRecord, AppState } from '../types/habit';
import { getToday } from '../utils/streakCalculator';

const STORAGE_KEY = 'habit-tracker-data';

/**
 * Generate a unique ID for habits
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Load state from localStorage
 */
const loadFromStorage = (): AppState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return { habits: [], completions: [] };
};

/**
 * Save state to localStorage
 */
const saveToStorage = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Custom hook for managing habits state with localStorage persistence
 */
export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    setHabits(stored.habits);
    setCompletions(stored.completions);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes (after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveToStorage({ habits, completions });
    }
  }, [habits, completions, isLoaded]);

  /**
   * Add a new habit
   */
  const addHabit = useCallback((name: string): void => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newHabit: Habit = {
      id: generateId(),
      name: trimmedName,
      createdAt: new Date().toISOString(),
    };

    setHabits((prev) => [...prev, newHabit]);
  }, []);

  /**
   * Update an existing habit's name
   */
  const updateHabit = useCallback((id: string, newName: string): void => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, name: trimmedName } : habit
      )
    );
  }, []);

  /**
   * Delete a habit and its completion records
   */
  const deleteHabit = useCallback((id: string): void => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    setCompletions((prev) => prev.filter((c) => c.habitId !== id));
  }, []);

  /**
   * Toggle completion for a habit on today's date only
   * (Same-day only guard as per MVP requirements)
   */
  const toggleCompletion = useCallback((habitId: string): void => {
    const today = getToday();

    setCompletions((prev) => {
      const existingIndex = prev.findIndex(
        (c) => c.habitId === habitId && c.date === today
      );

      if (existingIndex >= 0) {
        // Remove completion (uncheck)
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        // Add completion (check)
        return [...prev, { habitId, date: today }];
      }
    });
  }, []);

  return {
    habits,
    completions,
    isLoaded,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
  };
};
