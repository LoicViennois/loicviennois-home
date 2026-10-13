# AGENTS.md

## Commits & Push

- Always work on a branch, create one if on main branch
- Use gitmoji exclusively for commit messages (https://gitmoji.dev/)
- Always commit and push when finishing a task
- Always run `pnpm run format` before committing

## Pull Requests

- Always create a PR if none exists for current branch
- Use gitmoji for PR title
- Assign myself when creating a PR
- PR description should only contain a "Summary" section

## Accessibility Requirements

- It must pass all AXE checks.
- It must follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Design

- The logo geometry lives in `src/lib/logo-flyby.ts`; run `pnpm icons` after changing it.
