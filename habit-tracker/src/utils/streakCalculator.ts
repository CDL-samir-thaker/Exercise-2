import type { CompletionRecord } from '../types/habit';

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Get yesterday's date in YYYY-MM-DD format
 */
const getYesterday = (fromDate: string): string => {
  const date = new Date(fromDate);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

/**
 * Calculate the current streak for a habit
 * Streak resets if a day is missed (no grace period)
 */
export const calculateStreak = (
  habitId: string,
  completions: CompletionRecord[]
): number => {
  // Get all completion dates for this habit, sorted descending
  const habitCompletions = completions
    .filter((c) => c.habitId === habitId)
    .map((c) => c.date)
    .sort((a, b) => b.localeCompare(a)); // Most recent first

  if (habitCompletions.length === 0) {
    return 0;
  }

  const today = getToday();
  let streak = 0;
  let currentDate = today;

  // Check if today is completed - if not, start checking from yesterday
  if (!habitCompletions.includes(today)) {
    currentDate = getYesterday(today);
  }

  // Count consecutive days
  while (habitCompletions.includes(currentDate)) {
    streak++;
    currentDate = getYesterday(currentDate);
  }

  return streak;
};

/**
 * Check if a habit is completed for a given date
 */
export const isCompletedOnDate = (
  habitId: string,
  date: string,
  completions: CompletionRecord[]
): boolean => {
  return completions.some((c) => c.habitId === habitId && c.date === date);
};
