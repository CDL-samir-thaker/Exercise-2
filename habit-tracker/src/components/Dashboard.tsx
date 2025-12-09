import type { Habit, CompletionRecord } from '../types/habit';
import { getToday, isCompletedOnDate } from '../utils/streakCalculator';

interface DashboardProps {
  habits: Habit[];
  completions: CompletionRecord[];
}

export const Dashboard = ({ habits, completions }: DashboardProps) => {
  const today = getToday();
  const completedToday = habits.filter((habit) =>
    isCompletedOnDate(habit.id, today, completions)
  ).length;

  const totalHabits = habits.length;
  const progressPercent = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100) 
    : 0;

  // Format today's date nicely
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="dashboard">
      <h1>🎯 Habit Tracker</h1>
      <p className="date">{formattedDate}</p>
      
      {totalHabits > 0 && (
        <div className="progress-summary">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="progress-text">
            {completedToday} of {totalHabits} habits completed today ({progressPercent}%)
          </p>
        </div>
      )}
    </header>
  );
};
