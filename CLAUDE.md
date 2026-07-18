# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Kento Yoshizu's personal portfolio site: a Next.js 13 (Pages Router) + TypeScript site styled with CSS Modules, using Apollo Client/GraphQL to pull GitHub contribution data, and documented in Storybook.

## Commands

```
npm run dev             # Start Next.js dev server
npm run build            # Production build (also what CI runs on PRs to main)
npm run start             # Serve the production build
npm run lint              # next lint (eslint-config-next + storybook plugin)
npm run sb                # Storybook dev server on port 6006
npm run build-storybook   # Static Storybook build
```

There is no test runner configured (no Jest/RTL despite aspirations mentioned in [pages/summary.tsx](pages/summary.tsx)) — do not assume `npm test` exists.

CSS Modules type declarations (`*.module.css.d.ts` files under [pages/styles/](pages/styles/)) are generated with `typed-css-modules` (config in [typed-css-modules.config.ts](typed-css-modules.config.ts)) but there is no npm script wired up for it; run via `npx tcm pages/styles` if a `.css.d.ts` needs regenerating after editing a `.module.css` file.

CI ([.github/workflows/build.yml](.github/workflows/build.yml)) runs `npm ci && npm run build` on pull requests targeting `main`.

## Environment variables

- `NEXT_PUBLIC_GITHUB_API` — GitHub GraphQL API token, used as a bearer token in [apollo-client.ts](apollo-client.ts) to fetch contribution data.
- `ATCODER_PROBLEMS_API` — base URL for the AtCoder Problems API, used in the [pages/api/ac.ts](pages/api/ac.ts) serverless route.

No `.env.example` exists; these must be set locally (e.g. `.env.local`) to run GitHub contributions or AtCoder features.

## Architecture

- **Single-page app structure**: [pages/index.tsx](pages/index.tsx) is the main page, composed of section components imported from [pages/components/](pages/components/) (Header, AppsAndSites, Contributions, Card, LinkButton, Footer, etc.). [pages/summary.tsx](pages/summary.tsx) is a secondary "site summary" page linked to via anchors (e.g. `summary#sample`) from the home page's `LinkButton`s.
- **Styling**: plain CSS files ([pages/css/global.css](pages/css/global.css), reset.css) are imported globally in [pages/_app.tsx](pages/_app.tsx); component-level styles use CSS Modules under [pages/styles/](pages/styles/), imported as `Styles` and referenced via `Styles.xxx`. Dynamic per-instance values (colors, computed percentages) are passed through inline `style` using CSS custom properties (e.g. `{ "--color": color } as React.CSSProperties}`) and consumed in the `.module.css` file.
- **Scroll-triggered reveal animations**: [lib/elementIntersectionObserver.ts](lib/elementIntersectionObserver.ts) and [lib/cardIntersectionObserver.ts](lib/cardIntersectionObserver.ts) both use `IntersectionObserver` to add a `show` class (or module-scoped equivalent) when elements enter the viewport. They're invoked from `useEffect` in the top-level page/component (e.g. [pages/index.tsx](pages/index.tsx) and [pages/components/Card.tsx](pages/components/Card.tsx)) and target elements by a shared class name (`inter`, or the module's `.card` class) rather than refs — new sections that need the reveal effect must add that class name rather than being wired up individually.
- **Data fetching, two different patterns**:
  - GitHub contributions ([pages/components/Contributions.tsx](pages/components/Contributions.tsx)) go straight from the browser to the GitHub GraphQL API via Apollo Client (`apollo-client.ts`), configured globally in `_app.tsx` via `ApolloProvider`.
  - AtCoder AC counts ([pages/components/ac.tsx](pages/components/ac.tsx), currently unused/WIP marked "工事中") go through a Next.js API route ([pages/api/ac.ts](pages/api/ac.ts)) that proxies to the AtCoder Problems API server-side (keeping `ATCODER_PROBLEMS_API` off the client) and reshapes the result into a date→count map.
- **Storybook**: stories live in [stories/](stories/) and import components directly from `pages/components/`; Storybook is configured via `@storybook/nextjs` ([.storybook/main.ts](.storybook/main.ts)) so Next-specific features (CSS Modules, etc.) work inside stories.
- Commented-out JSX (e.g. extra `<Card>` blocks in `index.tsx`, the AtCoder heatmap section) represents planned/paused features — check with the user before deleting rather than assuming it's dead code.
