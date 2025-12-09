# 🎯 Habit Tracker

A simple, mobile-responsive habit tracking web app built with React + TypeScript.

## Features

- ✅ Add, edit, and delete daily habits
- ✅ Mark habits complete/incomplete (same day only)
- 🔥 Visual streak counter with motivating badges
- 📊 Dashboard showing daily progress
- 💾 Data persists in localStorage
- 📱 Mobile responsive design

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development
- **localStorage** for persistence
- **Simple CSS** (no frameworks)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
├── components/
│   ├── App.tsx          # Main app container
│   ├── Dashboard.tsx    # Header with progress summary
│   ├── AddHabitForm.tsx # Form to add new habits
│   ├── HabitList.tsx    # List container with empty state
│   └── HabitItem.tsx    # Individual habit row
├── hooks/
│   └── useHabits.ts     # State management + localStorage
├── types/
│   └── habit.ts         # TypeScript interfaces
├── utils/
│   └── streakCalculator.ts # Streak computation logic
└── App.css              # All styles
```

## Data Model

```typescript
interface Habit {
  id: string;
  name: string;
  createdAt: string;
}

interface CompletionRecord {
  habitId: string;
  date: string; // YYYY-MM-DD
}
```

## Scope Definition

### ✅ MVP (Current)

Core tracking loop only:
- Add daily habits by name
- View today's habits as checklist
- Mark habits complete/incomplete (same day only)
- Visual streak counter per habit
- localStorage persistence
- Mobile responsive

### ⏳ Deferred (V2+)

| Feature | Version | Rationale |
|---------|---------|-----------|
| Categories/tags | V2 | Organization, not core tracking |
| Reminders/notifications | V2 | Requires permissions, adds complexity |
| Calendar history view | V2 | Nice visualization, not essential |
| Custom frequencies | V2 | Daily covers 80% of use cases |
| Statistics/charts | V2 | Motivation boost, not core |
| Data export | V2 | Backup convenience |
| Edit past entries | V2 | Same-day sufficient for data integrity |

### 🚫 Out of Scope (Not Planned)

| Feature | Reason |
|---------|--------|
| User authentication/accounts | Single-user local app by design |
| Backend server/database | Client-only architecture |
| Cloud sync | Adds complexity, not needed for personal use |
| Social features (sharing, leaderboards) | Outside core value proposition |
| Native mobile app | Web-first, responsive approach sufficient |
| Offline service worker | localStorage sufficient for MVP |
| Analytics/telemetry | Privacy-first, no tracking |
