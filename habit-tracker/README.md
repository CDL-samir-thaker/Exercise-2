# 🎯 Habit Tracker

A simple, mobile-responsive habit tracking web app built with React + TypeScript. Helps users build consistent daily habits through simple tracking and visual progress feedback.

![MVP Status](https://img.shields.io/badge/status-MVP%20Complete-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-19.x-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.x-646cff)

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Data Model](#-data-model)
- [State Flow](#-state-flow)
- [Cursor Integration](#-cursor-integration)
- [Development Workflow](#-development-workflow)
- [Scope Definition](#-scope-definition)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
| Feature | Description |
|---------|-------------|
| ➕ **Add Habits** | Create new daily habits with a simple form |
| ✏️ **Edit Habits** | Rename existing habits inline |
| 🗑️ **Delete Habits** | Remove habits with confirmation dialog |
| ✅ **Track Completion** | Check off habits as you complete them (same day only) |
| 🔥 **Streak Counter** | Visual streak badges that motivate consistency |
| 📊 **Progress Dashboard** | See today's completion percentage at a glance |
| 💾 **Auto-Save** | Data persists automatically to localStorage |
| 📱 **Responsive Design** | Works beautifully on mobile, tablet, and desktop |

### User Experience
- **Empty State**: Friendly guidance when no habits exist
- **Visual Feedback**: Green highlighting for completed habits
- **Hot Streaks**: Special animation for 7+ day streaks
- **Form Validation**: Prevents empty or too-long habit names
- **Keyboard Support**: Enter to save, Escape to cancel edits

---

## 🎬 Demo

### Quick Start
```bash
git clone <repo-url>
cd habit-tracker
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and:

1. **Add a habit**: Type "Drink 8 glasses of water" → Click "Add Habit"
2. **Complete it**: Click the checkbox → Row turns green, streak appears
3. **Refresh**: Data persists! ✨
4. **Check localStorage**: DevTools → Application → Local Storage → `habit-tracker-data`

---

## 🛠 Tech Stack

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **React 19** | UI Framework | Component-based, great DX |
| **TypeScript** | Type Safety | Catch errors early, better IDE support |
| **Vite** | Build Tool | Fast HMR, minimal config |
| **localStorage** | Persistence | Simple, no backend needed |
| **CSS** | Styling | No framework overhead, full control |

### No Backend Required
This is a **client-only** application. All data lives in your browser's localStorage.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd habit-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (when available) |

---

## 📁 Project Structure

```
habit-tracker/
├── .cursor/                    # Cursor AI configuration
│   ├── hooks/
│   │   └── complete-phase.js   # Phase completion workflow hook
│   ├── plans/
│   │   └── habit-tracker-mvp.md # MVP implementation plan
│   └── rules/
│       └── habit-tracker.mdc   # Project-specific rules
│
├── src/
│   ├── components/             # React components
│   │   ├── App.tsx             # Root component, orchestrates everything
│   │   ├── Dashboard.tsx       # Header with progress bar
│   │   ├── AddHabitForm.tsx    # New habit input form
│   │   ├── HabitList.tsx       # List container + empty state
│   │   └── HabitItem.tsx       # Individual habit row
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useHabits.ts        # Central state + localStorage
│   │
│   ├── types/                  # TypeScript interfaces
│   │   └── habit.ts            # Habit, CompletionRecord, AppState
│   │
│   ├── utils/                  # Pure utility functions
│   │   └── streakCalculator.ts # Streak computation logic
│   │
│   ├── App.css                 # All application styles
│   ├── index.css               # Base reset
│   └── main.tsx                # Entry point
│
├── rules/                      # General guidelines
│   └── anti-pitfall-guidelines.mdc
│
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

---

## 🏗 Architecture

### Design Principles

1. **Single Source of Truth**: All state lives in `useHabits` hook
2. **Unidirectional Data Flow**: Data flows down via props, actions flow up via callbacks
3. **Separation of Concerns**: Components render, hooks manage state, utils compute
4. **Type Safety**: Explicit interfaces for all data structures

### Component Hierarchy

```
App
├── Dashboard (read-only, displays progress)
├── AddHabitForm (captures input, calls addHabit)
└── HabitList
    └── HabitItem (×N)
        ├── Checkbox (toggleCompletion)
        ├── Name/Edit Input (updateHabit)
        ├── Streak Badge (calculated)
        └── Action Buttons (deleteHabit)
```

---

## 📊 Data Model

### TypeScript Interfaces

```typescript
// A habit the user wants to track
interface Habit {
  id: string;          // Unique identifier (timestamp + random)
  name: string;        // Display name (e.g., "Exercise")
  createdAt: string;   // ISO timestamp of creation
}

// Record of a habit completion on a specific date
interface CompletionRecord {
  habitId: string;     // References Habit.id
  date: string;        // YYYY-MM-DD format
}

// Complete application state
interface AppState {
  habits: Habit[];
  completions: CompletionRecord[];
}
```

### localStorage Schema

```json
{
  "habit-tracker-data": {
    "habits": [
      { "id": "1699...", "name": "Drink water", "createdAt": "2024..." }
    ],
    "completions": [
      { "habitId": "1699...", "date": "2024-12-09" }
    ]
  }
}
```

---

## 🔄 State Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         useHabits()                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐    │
│  │   habits: []    │    │      completions: []            │    │
│  └─────────────────┘    └─────────────────────────────────┘    │
│                                                                 │
│  Actions:                    Effects:                          │
│  • addHabit(name)            • Load from localStorage on mount │
│  • updateHabit(id, name)     • Save to localStorage on change  │
│  • deleteHabit(id)                                             │
│  • toggleCompletion(id)                                        │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼ props & callbacks
┌────────────────────────────────────────────────────────────────┐
│                           App.tsx                              │
│  • Calls useHabits()                                           │
│  • Passes state DOWN as props                                  │
│  • Passes action functions DOWN as callbacks                   │
└────────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
    ┌──────────┐      ┌──────────────┐      ┌─────────────┐
    │Dashboard │      │AddHabitForm  │      │ HabitList   │
    │(read)    │      │              │      │             │
    │          │      │ onAdd={      │      │ habits,     │
    │ habits,  │      │  addHabit    │      │ completions │
    │ complet- │      │ }            │      │ onToggle,   │
    │ ions     │      │              │      │ onUpdate,   │
    │    │     │      │ User types → │      │ onDelete    │
    │    ▼     │      │ Submit →     │      │      │      │
    │ Progress │      │ addHabit()   │      │      ▼      │
    │ computed │      │              │      │ HabitItem   │
    └──────────┘      └──────────────┘      └─────────────┘
```

### Data Flow Example: Completing a Habit

```
1. User clicks checkbox in HabitItem
2. HabitItem calls onToggle(habitId)
3. onToggle is actually toggleCompletion from useHabits
4. toggleCompletion updates completions state
5. useEffect detects change, saves to localStorage
6. React re-renders with new state
7. Dashboard recalculates progress %
8. HabitItem recalculates streak
9. UI updates to show completion
```

---

## 🤖 Cursor Integration

This project includes Cursor AI configuration for guided development.

### Directory: `.cursor/`

```
.cursor/
├── hooks/
│   └── complete-phase.js    # Workflow automation
├── plans/
│   └── habit-tracker-mvp.md # Implementation roadmap
└── rules/
    └── habit-tracker.mdc    # Project conventions
```

### Project Rules (`.cursor/rules/habit-tracker.mdc`)

Enforces:
- TypeScript for all files
- Small, focused components (<100 lines)
- Respect MVP scope
- Follow anti-pitfall guidelines

**Usage**: Reference with `@habit-tracker` in prompts.

### MVP Plan (`.cursor/plans/habit-tracker-mvp.md`)

Contains:
- Phased implementation roadmap
- Task dependencies
- Status tracking
- Definition of Done

**Usage**: Reference with `@.cursor/plans/habit-tracker-mvp.md`.

### Phase Completion Hook (`.cursor/hooks/complete-phase.js`)

Automates phase completion workflow:

```
@complete-phase { "phase": "1.5" }
```

This generates a prompt to:
1. Run tests
2. Update plan with completed tasks
3. Suggest git commit message
4. Ask about proceeding to next phase

### Anti-Pitfall Guidelines (`rules/anti-pitfall-guidelines.mdc`)

Planning principles:
1. **MVP First**: Core functionality before extras
2. **Dependency Awareness**: Sequence tasks clearly
3. **Iterative Milestones**: Independently valuable chunks
4. **Avoid Over-Engineering**: Happy path first
5. **Clear Scope**: Must-haves vs nice-to-haves

**Usage**: Reference with `@anti-pitfall-guidelines`.

---

## 👷 Development Workflow

### Implementation Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | Foundation | ✅ Complete |
| 1.5 | Streak Optimization | ⬚ Pending |
| 2 | Core Habit CRUD | ✅ Complete |
| 3 | Completion Tracking | ✅ Complete |
| 4 | Streak Counter | ✅ Complete |
| 5 | Polish & Responsive | ✅ Complete |

### Completing a Phase

1. **Verify Implementation**: Test all features for the phase
2. **Run Tests**: `npm test` (if tests exist)
3. **Update Plan**: Mark tasks complete in `habit-tracker-mvp.md`
4. **Commit**: `git commit -m "feat: complete phase X - description"`
5. **Continue**: Proceed to next phase

Or use the Cursor hook:
```
@complete-phase { "phase": "X" }
```

### Code Style

- **Components**: PascalCase, `.tsx` extension
- **Hooks**: `use` prefix, camelCase
- **Utils**: camelCase, pure functions
- **Types**: PascalCase interfaces in `/types`

### Before Committing

- [ ] TypeScript compiles (`npm run build`)
- [ ] Linter passes (`npm run lint`)
- [ ] Feature works in browser
- [ ] Data persists after refresh
- [ ] Mobile layout looks good

---

## 🎯 Scope Definition

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

---

## 🤝 Contributing

### Getting Started

1. Read the [Project Rules](#cursor-integration)
2. Check the [MVP Plan](#development-workflow) for current phase
3. Follow the [Code Style](#code-style) guidelines

### Pull Request Checklist

- [ ] Follows TypeScript conventions
- [ ] Components are small and focused
- [ ] Within MVP scope (or clearly marked V2)
- [ ] Tests added/updated (if applicable)
- [ ] Documentation updated

### Commit Message Format

```
type: short description

- Detail 1
- Detail 2
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

---

## 📄 License

MIT License - feel free to use this project for learning or building your own habit tracker!

---

## 🙏 Acknowledgments

Built with guidance from:
- Anti-pitfall planning guidelines
- MVP-first development approach
- Cursor AI assistance

---

**Happy habit tracking! 🎯🔥**
