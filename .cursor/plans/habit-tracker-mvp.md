# Habit Tracker MVP Plan

## Overview

A simple habit tracking web app to help users build consistent daily habits through simple tracking and visual progress.

**Tech Stack:** React + TypeScript, localStorage, Simple CSS  
**Timeline:** 2 weeks (solo developer)  
**Approach:** Guideline-based, dependency-aware, MVP-first

---

## Scope Definition

### ✅ Must-Haves (MVP)
- Add a new habit (name only)
- View today's habits as a checklist
- Mark habits complete/incomplete (same day only)
- Edit/delete habits
- Visual streak counter per habit
- Persist data to localStorage
- Mobile responsive layout

### ⏳ Nice-to-Haves (V2+)
- Habit categories/tags
- Notification reminders
- Weekly/monthly calendar view
- Custom habit frequencies
- Progress stats/charts
- Data export
- Edit past entries

### 🚫 Out of Scope
- User authentication/accounts
- Backend server/database
- Cloud sync
- Social features (sharing, leaderboards)
- Native mobile app
- Offline service worker
- Analytics/telemetry

---

## Data Model

```typescript
interface Habit {
  id: string;
  name: string;
  createdAt: string; // ISO date
}

interface CompletionRecord {
  habitId: string;
  date: string; // YYYY-MM-DD
}

interface AppState {
  habits: Habit[];
  completions: CompletionRecord[];
}
```

---

## Implementation Phases

### Phase 1: Foundation (Days 1-3)
*Goal: Runnable app with basic structure*

| # | Task | Depends On | Status |
|---|------|------------|--------|
| 1.1 | Initialize React + TypeScript project (Vite) | — | ✅ Done |
| 1.2 | Define TypeScript interfaces (`Habit`, `CompletionRecord`) | 1.1 | ✅ Done |
| 1.3 | Create `useHabits` hook with in-memory state | 1.2 | ✅ Done |
| 1.4 | Build `App.tsx` shell + basic layout | 1.1 | ✅ Done |

**Milestone ✓**: App runs, state management scaffolded

---

### Phase 1.5: Optimize Streak Calculation & Caching (Days 3-4)
*Goal: Efficient, testable streak computation*

**Problem Statement:**  
Streaks are currently recalculated on every render in `HabitItem.tsx`, which:
1. Is inefficient for large completion histories
2. Makes unit testing harder (tightly coupled to render cycle)
3. Could cause unnecessary re-renders

| # | Task | Depends On | Status |
|---|------|------------|--------|
| 1.5.1 | Create `useStreaks` hook to memoize streak calculations | 1.3 | ⬚ Pending |
| 1.5.2 | Add `useMemo` for streak values keyed by habitId | 1.5.1 | ⬚ Pending |
| 1.5.3 | Extract streak logic into pure, testable functions | 1.5.1 | ⬚ Pending |
| 1.5.4 | Add unit tests for `calculateStreak()` | 1.5.3 | ⬚ Pending |

**Implementation Approach:**

```typescript
// New: useStreaks.ts
export const useStreaks = (habits: Habit[], completions: CompletionRecord[]) => {
  const streaks = useMemo(() => {
    const streakMap: Record<string, number> = {};
    for (const habit of habits) {
      streakMap[habit.id] = calculateStreak(habit.id, completions);
    }
    return streakMap;
  }, [habits, completions]);

  return streaks;
};
```

**Benefits:**
- Streaks recalculated only when `habits` or `completions` change
- Single calculation per state change (not per render)
- Pure `calculateStreak()` function easily unit testable

**Milestone ✓**: Streak calculation memoized, unit tests passing

---

### Phase 2: Core Habit CRUD (Days 4-6)
*Goal: Users can add and view habits*

| # | Task | Depends On | Status |
|---|------|------------|--------|
| 2.1 | Build `AddHabitForm` component | 1.4 | ✅ Done |
| 2.2 | Wire form to `useHabits.addHabit()` | 1.3, 2.1 | ✅ Done |
| 2.3 | Build `HabitList` + `HabitItem` components | 1.4, **1.5** | ✅ Done |
| 2.4 | Display habits from state | 1.3, 2.3 | ✅ Done |
| 2.5 | Add edit/delete functionality | 2.4 | ✅ Done |

**Milestone ✓**: Can add, view, edit, delete habits

---

### Phase 3: Completion Tracking (Days 7-9)
*Goal: Mark today's habits done/not done*

| # | Task | Depends On | Status |
|---|------|------------|--------|
| 3.1 | Add checkbox toggle to `HabitItem` | 2.4 | ✅ Done |
| 3.2 | Implement `toggleCompletion()` in hook | 1.3 | ✅ Done |
| 3.3 | Add `isToday()` guard for edits | 3.2 | ✅ Done |
| 3.4 | Filter display to show today's status | 3.2 | ✅ Done |
| 3.5 | Add localStorage persistence | 3.4 | ✅ Done |

**Milestone ✓**: Core tracking loop works, data persists

---

### Phase 4: Streak Counter (Days 10-11)
*Goal: Visual motivation through streaks*

| # | Task | Depends On | Status |
|---|------|------------|--------|
| 4.1 | Create `streakCalculator.ts` utility | 1.2 | ✅ Done |
| 4.2 | Calculate streak from completion history | 3.5, 4.1 | ✅ Done |
| 4.3 | Display streak badge in `HabitItem` | 4.2, **1.5** | ✅ Done |
| 4.4 | Add streak visual (🔥 icon, color coding) | 4.3 | ✅ Done |

**Milestone ✓**: Streaks visible, motivating feedback loop

---

### Phase 5: Polish & Responsive (Days 12-14)
*Goal: Clean, mobile-friendly UI*

| # | Task | Depends On | Status |
|---|------|------------|--------|
| 5.1 | Style `Dashboard` header component | 2.4 | ✅ Done |
| 5.2 | Add responsive CSS (mobile breakpoints) | 5.1 | ✅ Done |
| 5.3 | Empty states (no habits yet) | 2.4 | ✅ Done |
| 5.4 | Basic error handling (form validation) | 2.2 | ✅ Done |
| 5.5 | Final testing & bug fixes | All | ✅ Done |

**Milestone ✓**: MVP complete, ready for use

---

## Dependency Graph

```
[1.1 Init] → [1.2 Types] → [1.3 Hook] ─────────────────────────────────┐
     │                          │                                       │
     │                          ▼                                       ▼
     │                    [1.5 Streak Optimization] ◄─────────── [3.5 Storage]
     │                          │                                       │
     ▼                          ▼                                       │
[1.4 App Shell] ──────► [2.1-2.5 CRUD UI] ◄─────────────────────────────┘
                              │
                              ▼
                    [3.1-3.4 Completion] → [4.1-4.4 Streak UI]
                                                  │
                                                  ▼
                                        [5.1-5.5 Polish]
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Streak logic edge cases (timezone, missed days) | Use simple UTC date strings; unit tests with mocked dates |
| localStorage quota | Minimal data model; no media storage |
| Scope creep | Strict must-have/nice-to-have separation |
| Render performance | Phase 1.5 memoization addresses this |

---

## Definition of Done (MVP)

- [x] User can add a habit by name
- [x] User can edit/delete existing habits
- [x] User can see today's habits as a checklist
- [x] User can mark habits complete/incomplete (today only)
- [x] Streak counter displays correctly per habit
- [x] Data persists across browser refresh
- [x] Works on mobile viewport (375px+)
- [ ] Streak calculation is memoized (Phase 1.5)
- [ ] Unit tests for streak calculator (Phase 1.5)
