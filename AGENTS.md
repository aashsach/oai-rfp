# Agent Operating Instructions

This repository uses persistent project memory. Never rely on chat history as the source of truth.

At the start of every session:

1. Read `docs/project-memory/PROJECT_CONTEXT.md`.
2. Read `docs/project-memory/CONTINUITY.md`.
3. Read `docs/project-memory/BUILD_PLAN_INDEX.md`.
4. Read the current branch context file from `docs/project-memory/branch-context/<branch-name>.md`.
5. Identify active build plans and dependencies before making changes.
6. Summarize your understanding before implementing changes.

If repository documents and chat history conflict, the repository documents win.

## Build Plan Workflow

Whenever asked to create a build plan:

1. Assign the next `BP-###` number.
2. Update `docs/project-memory/BUILD_PLAN_INDEX.md`.
3. Create `docs/project-memory/build-plans/BP-###.md`.
4. Update the current branch context in `docs/project-memory/branch-context/`.
5. Update `docs/project-memory/CONTINUITY.md`.

Whenever work is completed:

1. Update the build plan status.
2. Record related commit hashes, or `none yet` if the work is uncommitted.
3. Update `docs/project-memory/CONTINUITY.md`.
4. Update `docs/project-memory/PROJECT_CONTEXT.md` if architecture changed.
5. Update `docs/project-memory/ARCHITECTURE_DECISIONS.md` if a new architecture decision was made.

Keep memory updates concise, factual, and branch-aware.
