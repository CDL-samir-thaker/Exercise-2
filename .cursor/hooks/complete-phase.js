/**
 * Cursor Hook: Complete Phase
 * 
 * This hook generates a prompt to guide the Agent through completing
 * a phase of the Habit Tracker MVP plan.
 * 
 * Usage:
 *   Invoke with { phase: "1" } or { phase: "1.5" } etc.
 * 
 * Example:
 *   @complete-phase { "phase": "1.5" }
 */

function completePhase({ phase }) {
  if (!phase) {
    return `
❌ Error: No phase specified.

Please provide a phase number, e.g.:
  @complete-phase { "phase": "1" }
  @complete-phase { "phase": "1.5" }
  @complete-phase { "phase": "2" }
`;
  }

  const phaseDescriptions = {
    "1": "Foundation",
    "1.5": "Optimize Streak Calculation & Caching",
    "2": "Core Habit CRUD",
    "3": "Completion Tracking",
    "4": "Streak Counter",
    "5": "Polish & Responsive",
  };

  const phaseName = phaseDescriptions[phase] || `Phase ${phase}`;
  const nextPhase = getNextPhase(phase);

  return `
## 🎯 Complete Phase ${phase}: ${phaseName}

Please perform the following steps:

### Step 1: Run Tests (if present)
- Check if there are any test files related to Phase ${phase}
- Run \`npm test\` or \`npm run test\` if tests exist
- Report test results (pass/fail count)
- If no tests exist, note that and continue

### Step 2: Update Plan
- Open @.cursor/plans/habit-tracker-mvp.md
- Find all tasks for Phase ${phase} (tasks numbered ${phase}.X)
- Change their status from \`⬚ Pending\` to \`✅ Done\`
- Update any checkboxes in "Definition of Done" if applicable

### Step 3: Suggest Git Commit
Suggest a commit message following this format:

\`\`\`
feat: complete phase ${phase} - ${phaseName.toLowerCase()}

- [List key accomplishments]
- [List files changed]
\`\`\`

### Step 4: Next Steps
${nextPhase 
  ? `Phase ${nextPhase} (${phaseDescriptions[nextPhase] || "Next"}) is next.

Ask: "Phase ${phase} is complete. Would you like to proceed to Phase ${nextPhase}: ${phaseDescriptions[nextPhase] || "Next"}?"`
  : "🎉 This is the final phase! The MVP is complete."}

---

**Remember:**
- Follow @anti-pitfall-guidelines
- Stay within MVP scope defined in @.cursor/plans/habit-tracker-mvp.md
- Keep changes focused on this phase only
`;
}

/**
 * Helper: Get the next phase in sequence
 */
function getNextPhase(currentPhase) {
  const phaseOrder = ["1", "1.5", "2", "3", "4", "5"];
  const currentIndex = phaseOrder.indexOf(currentPhase);
  
  if (currentIndex === -1 || currentIndex === phaseOrder.length - 1) {
    return null;
  }
  
  return phaseOrder[currentIndex + 1];
}

// Export for Cursor hooks system
module.exports = completePhase;
