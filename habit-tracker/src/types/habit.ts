// Core data types for the Habit Tracker

export interface Habit {
  id: string;
  name: string;
  createdAt: string; // ISO date string
}

export interface CompletionRecord {
  habitId: string;
  date: string; // YYYY-MM-DD format
}

export interface AppState {
  habits: Habit[];
  completions: CompletionRecord[];
}
