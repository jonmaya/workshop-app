# Project Coding Rules (Non-Obvious Only)

- `PageProps<'/route'>` and `LayoutProps<'/route'>` are global types from `.next/types/routes.d.ts` — **never import them**, just use them.
- Both `params` and `searchParams` in page/layout components are `Promise<…>` — always `await` before destructuring.
- React Compiler is active — do not manually add `useMemo`, `useCallback`, or `memo` wrappers.
- Tailwind v4: theme tokens go in `src/app/globals.css` under `@theme inline { … }`, not in a JS config file.
- `@/*` is the import alias for `./src/*` — use it for all intra-`src` imports.
- No test runner is installed; don't add test files without first installing a framework.
- This is Next.js **16**, not 13/14 — check `node_modules/next/dist/docs/` before using any Next.js API.
