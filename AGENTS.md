# AGENTS.md

## Commits & Push

- Always work on a branch, create one if on master branch
- Use gitmoji exclusively for commit messages (https://gitmoji.dev/)
- Always commit when finishing a task
- Always run `pnpm run format` before committing

## Pull Requests

- Use gitmoji for PR title
- PR description should only contain a "Summary" section

## Design

- Stay visually consistent with the sibling apps (The Binary Game, Project Euler Solver): same
  colour token names (`--bg`, `--surface`, `--ink`, `--ink-soft`, `--line`, `--tint`), dark theme
  by default with a toggle, sticky blurred header, pill buttons, `rise`/`pop` animations.
- The logo geometry lives in `src/lib/logo-flyby.ts`; run `pnpm icons` after changing it.

## Accessibility Requirements

- It must pass all AXE checks.
- It must follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.
