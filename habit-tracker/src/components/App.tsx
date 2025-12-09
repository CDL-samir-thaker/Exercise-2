import { useHabits } from '../hooks/useHabits';
import { Dashboard } from './Dashboard';
import { AddHabitForm } from './AddHabitForm';
import { HabitList } from './HabitList';
import '../App.css';

export const App = () => {
  const {
    habits,
    completions,
    isLoaded,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
  } = useHabits();

  // Show loading state while data loads from localStorage
  if (!isLoaded) {
    return (
      <div className="app loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Dashboard habits={habits} completions={completions} />
      
      <main className="main-content">
        <AddHabitForm onAdd={addHabit} />
        
        <section className="habits-section">
          <h2>Today's Habits</h2>
          <HabitList
            habits={habits}
            completions={completions}
            onToggle={toggleCompletion}
            onUpdate={updateHabit}
            onDelete={deleteHabit}
          />
        </section>
      </main>
    </div>
  );
};
