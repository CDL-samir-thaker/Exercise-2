import { useState } from 'react';
import type { FormEvent } from 'react';

interface AddHabitFormProps {
  onAdd: (name: string) => void;
}

export const AddHabitForm = ({ onAdd }: AddHabitFormProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Please enter a habit name');
      return;
    }
    
    if (trimmedName.length > 50) {
      setError('Habit name must be 50 characters or less');
      return;
    }

    onAdd(trimmedName);
    setName('');
    setError('');
  };

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter a new habit..."
          className={error ? 'input-error' : ''}
          maxLength={50}
        />
        <button type="submit">Add Habit</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
