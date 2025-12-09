import { useState } from 'react';
import type { Habit, CompletionRecord } from '../types/habit';
import { calculateStreak, getToday, isCompletedOnDate } from '../utils/streakCalculator';

interface HabitItemProps {
  habit: Habit;
  completions: CompletionRecord[];
  onToggle: (habitId: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export const HabitItem = ({
  habit,
  completions,
  onToggle,
  onUpdate,
  onDelete,
}: HabitItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);

  const today = getToday();
  const isCompleted = isCompletedOnDate(habit.id, today, completions);
  const streak = calculateStreak(habit.id, completions);

  const handleSave = () => {
    const trimmedName = editName.trim();
    if (trimmedName && trimmedName !== habit.name) {
      onUpdate(habit.id, trimmedName);
    } else {
      setEditName(habit.name); // Reset if empty or unchanged
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditName(habit.name);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${habit.name}"? This cannot be undone.`)) {
      onDelete(habit.id);
    }
  };

  return (
    <li className={`habit-item ${isCompleted ? 'completed' : ''}`}>
      <div className="habit-checkbox">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(habit.id)}
          id={`habit-${habit.id}`}
        />
      </div>

      <div className="habit-content">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="edit-input"
            autoFocus
            maxLength={50}
          />
        ) : (
          <label 
            htmlFor={`habit-${habit.id}`}
            className="habit-name"
          >
            {habit.name}
          </label>
        )}
      </div>

      <div className="habit-streak">
        {streak > 0 && (
          <span className={`streak-badge ${streak >= 7 ? 'hot' : ''}`}>
            🔥 {streak} day{streak !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="habit-actions">
        <button
          className="btn-icon btn-edit"
          onClick={() => setIsEditing(true)}
          title="Edit habit"
        >
          ✏️
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={handleDelete}
          title="Delete habit"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};
