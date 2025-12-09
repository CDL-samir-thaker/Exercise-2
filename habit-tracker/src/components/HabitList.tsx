import type { Habit, CompletionRecord } from '../types/habit';
import { HabitItem } from './HabitItem';

interface HabitListProps {
  habits: Habit[];
  completions: CompletionRecord[];
  onToggle: (habitId: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export const HabitList = ({
  habits,
  completions,
  onToggle,
  onUpdate,
  onDelete,
}: HabitListProps) => {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h2>No habits yet</h2>
        <p>Add your first habit above to start building better routines!</p>
      </div>
    );
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          completions={completions}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
