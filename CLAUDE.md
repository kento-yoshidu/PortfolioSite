# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Kento Yoshizu's personal portfolio site: a React 19 + TypeScript single-page app built with Vite, routed with TanStack Router (file-based routes), styled with CSS Modules, and using Apollo Client/GraphQL to pull GitHub contribution data. Deployed as a static site on AWS Amplify.

## Commands

The package manager is **pnpm 12**, pinned via `packageManager` in [package.json](package.json) (lockfile: `pnpm-lock.yaml`). Do not use `npm install` / `npm ci` — they would create a `package-lock.json` and bypass the pnpm lockfile.

```
pnpm install      # Install dependencies (CI/Amplify use --frozen-lockfile)
pnpm dev          # Start Vite dev server (http://localhost:5173)
pnpm build        # tsc type-check, then vite build → dist/ (also what CI and Amplify run)
pnpm preview      # Serve the built dist/ locally
pnpm lint         # ESLint (flat config: eslint.config.mjs)
```

pnpm 12 refuses packages published less than ~24h ago (`minimumReleaseAge`). If `pnpm install` fails with `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`, the lockfile references a too-new version: wait a day, or regenerate with `pnpm clean --lockfile && pnpm install`.

When bumping pnpm, update both `packageManager` in `package.json` and the `npm install -g pnpm@…` line in [amplify.yml](amplify.yml).

There is no test runner configured (no Jest/RTL/Vitest despite aspirations mentioned in [src/routes/summary.tsx](src/routes/summary.tsx)) — do not assume a `test` script exists.

Lint rules enforce semicolons and double quotes (`@stylistic/semi`, `@stylistic/quotes`, `@stylistic/jsx-quotes`); `pnpm exec eslint . --fix` fixes them.

CSS Modules type declarations (`*.module.css.d.ts` files under [src/styles/](src/styles/)) are generated with `typed-css-modules` (config in [typed-css-modules.config.ts](typed-css-modules.config.ts)) but there is no package script wired up for it; run via `pnpm exec tcm src/styles` if a `.css.d.ts` needs regenerating after editing a `.module.css` file.

Node version is pinned in [.nvmrc](.nvmrc) (used by CI) and [amplify.yml](amplify.yml); `package.json` `engines` requires `>=22.12`.

CI ([.github/workflows/build.yml](.github/workflows/build.yml)) runs `pnpm install --frozen-lockfile && pnpm build` on pull requests targeting `main` (pnpm is installed by `pnpm/action-setup`, which reads `packageManager`).

## Environment variables

- `VITE_GITHUB_API` — GitHub GraphQL API token, used as a bearer token in [src/apollo-client.ts](src/apollo-client.ts) to fetch contribution data. Typed in [src/vite-env.d.ts](src/vite-env.d.ts).

Vite inlines `VITE_*` variables into the client bundle at build time, so the token is public in the shipped JS (same as before the migration) and must also be set in the Amplify console's environment variables for production builds. No `.env.example` exists; set it locally in `.env` / `.env.local`.

## Architecture

- **Entry & routing**: [index.html](index.html) loads [src/main.tsx](src/main.tsx), which wraps TanStack Router's `RouterProvider` in Apollo's `ApolloProvider`. Routes are files under [src/routes/](src/routes/); the `@tanstack/router-plugin` Vite plugin (see [vite.config.mts](vite.config.mts)) generates [src/routeTree.gen.ts](src/routeTree.gen.ts) on dev/build — never edit it by hand, and keep it committed.
  - [src/routes/__root.tsx](src/routes/__root.tsx): imports global CSS, sets the default `<title>`, renders `<HeadContent />` + `<Outlet />`.
  - [src/routes/index.tsx](src/routes/index.tsx): home page, composed of section components from [src/components/](src/components/) (Header, AppsAndSites, Contributions, Card, LinkButton, Footer, etc.).
  - [src/routes/summary.tsx](src/routes/summary.tsx): secondary "site summary" page, linked from the home page's `LinkButton`s via `to="/summary"` + `hash` (e.g. `hash="apps"`).
- **Page titles**: set per route with the route's `head` option. This relies on React 19 hoisting `<title>` into `<head>`; do not downgrade React below 19 without replacing this.
- **Styling**: plain CSS ([src/css/global.css](src/css/global.css), which `@import`s reset.css) is imported once in `__root.tsx`; component-level styles use CSS Modules under [src/styles/](src/styles/), imported as `Styles` and referenced via `Styles.xxx`. Dynamic per-instance values (colors, computed percentages) are passed through inline `style` using CSS custom properties (e.g. `{ "--color": color } as React.CSSProperties}`) and consumed in the `.module.css` file.
- **Scroll-triggered reveal animations**: [src/lib/elementIntersectionObserver.ts](src/lib/elementIntersectionObserver.ts) and [src/lib/cardIntersectionObserver.ts](src/lib/cardIntersectionObserver.ts) both use `IntersectionObserver` to add a `show` class (or module-scoped equivalent) when elements enter the viewport. They're invoked from `useEffect` in the top-level page/component (e.g. [src/routes/index.tsx](src/routes/index.tsx) and [src/components/Card.tsx](src/components/Card.tsx)) and target elements by a shared class name (`inter`, or the module's `.card` class) rather than refs — new sections that need the reveal effect must add that class name rather than being wired up individually.
- **Data fetching**: GitHub contributions ([src/components/Contributions.tsx](src/components/Contributions.tsx)) go straight from the browser to the GitHub GraphQL API via Apollo Client ([src/apollo-client.ts](src/apollo-client.ts)). There is no backend; the former AtCoder API route was removed during the Next.js → Vite migration.
- **Deployment**: Amplify builds with [amplify.yml](amplify.yml) and serves `dist/` as a static SPA. A rewrite rule in the Amplify console sends non-file paths to `/index.html` so deep links like `/summary` work on reload.
- Commented-out JSX (e.g. the "Sample Pages" section in `src/routes/index.tsx`) represents planned/paused features — check with the user before deleting rather than assuming it's dead code. (Its `PageLink` import was removed to satisfy lint; re-add it when uncommenting.)
