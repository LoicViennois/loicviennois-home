# [loicviennois.com](https://loicviennois.com/)

<a href="https://loicviennois.com/" target="_blank"><img src="public/favicon.512.png" width="192" alt="logo" /></a>

Home of Loïc Viennois on the internet, and the launch pad to his projects:
[The Binary Game](https://binary.loicviennois.com),
[Project Euler Solver](https://euler.loicviennois.com) and
[KSP Delta-V Planner](https://ksp.loicviennois.com).

The logo is a gravity-assist flyby: a trajectory swings around a planet and heads off somewhere new,
drawing a V on the way.

It is a static site built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com),
deployed on Vercel.

## Development

Tools are pinned in `mise.toml` (`mise install`).

```bash
pnpm install
pnpm dev     # dev server on http://localhost:4321
pnpm build   # type-check and build to dist/
pnpm check   # formatting
pnpm e2e     # Playwright end-to-end and accessibility tests
pnpm icons   # regenerate the favicon and touch icons from src/lib/logo-flyby.ts
```

## Deployment

Import the repository in Vercel: the Astro framework preset and `vercel.json` cover the rest.
