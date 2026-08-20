# Project Architecture Rules (Non-Obvious Only)

- **Next.js 16** — APIs differ significantly from 13/14; verify in `node_modules/next/dist/docs/` before designing any Next.js feature.
- **React Compiler** is enabled globally — manual memoization optimizations are unnecessary and may conflict.
- **Tailwind v4** uses PostCSS plugin (`@tailwindcss/postcss`), not the old `tailwindcss` CLI plugin. No `tailwind.config.js` exists — design theme extensions to go into `@theme inline {}` in CSS.
- `params` and `searchParams` in App Router are Promises; any design that reads route params must account for async unwrapping.
- There is no database, API layer, or auth — this is a pure frontend Next.js app.
- No test infrastructure; adding tests requires installing a framework first.
