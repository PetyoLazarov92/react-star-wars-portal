# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). The project is `0.x` during
active development: patch releases are fixes, minor releases are meaningful feature additions, and
`1.0.0` lands once the planned feature set (see `docs/development-plan.md`) is complete.

## [Unreleased]

### Added

- Routing skeleton: `react-router-dom` wired up via `BrowserRouter` in `main.tsx`, named route
  path constants in `src/app/routes.ts`, and `src/app/router.tsx` rendering placeholder
  `LoginPage` (`/`), `TablePage` (`/table`), and a catch-all `NotFoundPage`.
- Login form: `features/auth/loginSchema.ts` (Zod, username and password required, 4 to 30
  characters) and `features/auth/LoginForm.tsx` (React Hook Form + `zodResolver`), rendered by
  `LoginPage`. The submit button is disabled until the form is valid; a valid submit navigates to
  `/table`. Client-side format validation only, no authentication.
- API layer for the upcoming data table: `shared/api/httpClient.ts` (a generic `fetchJson` with
  `AbortSignal` support and a typed `ApiError`) and `features/people/people.schema.ts` /
  `people.types.ts` (Zod schemas and inferred types for the SWAPI person and paginated list
  response, narrowed to the five fields the table will render). Not wired into any page yet.
- Basic data table: `features/people/usePeople.ts` (fetches SWAPI page 1, holding
  loading/success/error state as a discriminated union) and `features/people/PeopleTable.tsx`
  (a semantic `<table>` of name, mass, height, hair color, and skin color, with a loading line and
  a generic, non-technical error message), rendered by `TablePage` at `/table`. No pagination or
  caching yet.
- Pagination: `features/people/Pagination.tsx` (Previous/Next controls, disabled at the first/last
  page); `usePeople` now fetches the page given to it and reports whether a next/previous page
  exists; the page number lives in the `?page=` URL search param (`TablePage`, validated with Zod,
  defaulting to `1`), so refresh, direct links, and browser back/forward all work.
- `localStorage` caching: `shared/cache/localStorageCache.ts` (`getCached`/`setCached`, Zod-validated
  reads with a TTL, any invalid or expired entry treated as a cache miss rather than an error);
  `usePeople` now caches each fetched page for five minutes and serves a cache hit instantly
  without a network request.
- Stale-data fallback on fetch failure: `shared/cache/localStorageCache.ts` gained `getStale`
  (reads a cache entry ignoring its TTL); when a network fetch fails, `usePeople`'s error state now
  carries that page's last cached data (if any), and `PeopleTable`/`TablePage` render it below the
  error message, with pagination still available, instead of showing a blank error.
- Offline detection and modal: `shared/hooks/useOnlineStatus.ts` (`navigator.onLine`, kept in sync
  via the `online`/`offline` events), `shared/components/Modal.tsx` (a generic accessible dialog
  built on the native `<dialog>` element), and `app/OfflineModal.tsx` (the offline-specific modal,
  wired app-wide in `App.tsx`), shown whenever the browser reports no connection and re-armed for
  the next disconnect after being dismissed once the connection returns.
- Light and dark theme: a class-based `dark:` Tailwind variant (`src/index.css`), a Zod-validated,
  `localStorage`-persisted `shared/hooks/useTheme.ts` (defaulting to the OS `prefers-color-scheme`
  when there is no stored preference), and a fixed, app-wide toggle button rendered from
  `App.tsx` (`shared/components/ThemeToggle.tsx`). `dark:` classes were added across every
  existing page and component (`LoginPage`, `TablePage`, `NotFoundPage`, `LoginForm`,
  `PeopleTable`, `Pagination`, `Modal`, `OfflineModal`) with no structural changes.
- Testing: Vitest + React Testing Library (`vitest.config.ts`, `src/test/setup.ts`), a `npm test`
  script, and an initial test suite covering `loginSchema`'s validation boundaries (4 and 30
  character limits on both fields), `localStorageCache`'s `getCached`/`getStale` (TTL expiry,
  corrupted JSON, and schema-invalid data all treated as a miss), the new
  `features/people/pageParam.ts` `?page=` parsing helper (extracted out of `TablePage.tsx` so it
  can be tested directly and to satisfy the `react-refresh/only-export-components` lint rule), and
  a smoke test of `LoginForm`'s submit button enable/disable behavior.

### Changed

- Responsive styling pass: the offline modal now keeps a guaranteed minimum side margin on narrow
  viewports instead of touching both edges, its close button grew to a proper ~44x44px touch
  target, and the pagination Previous/Next buttons and the login form's inputs/submit button grew
  from ~40-42px tall to ~44-46px tall to comfortably clear the same touch-target guideline.
- Accessibility pass: the people table now has a real programmatic accessible name via a visually
  hidden `<caption>`, and the shared `Modal` component's focus trap now wraps Tab/Shift+Tab between
  its first and last focusable elements as a fallback, fixing a case (the offline modal's single
  close button) where keyboard focus could otherwise escape to the page body.

### Fixed

- Offline modal appearing pinned to the top-right corner instead of centered: Tailwind's preflight
  resets `margin: 0` on all elements, which overrode the browser's built-in centering for the
  native `<dialog>` element. Restored with an explicit `m-auto` on `shared/components/Modal.tsx`'s
  `<dialog>`.

## [0.1.0] - 2026-08-31

### Added

- Project scaffold: Vite, React 19, TypeScript in strict mode.
- Tailwind CSS v4 via `@tailwindcss/vite`.
- ESLint (flat config) with `typescript-eslint`, `eslint-plugin-react-hooks`,
  `eslint-plugin-react-refresh`, and `eslint-plugin-jsx-a11y`, plus Prettier, wired into
  `npm run lint` / `lint:fix` / `format` / `format:check`.
- `npm run typecheck`, `npm run build`, `npm run dev`, `npm run preview` scripts.
- App dependencies for upcoming features: `react-router-dom`, `react-hook-form`, `zod`,
  `@hookform/resolvers`.
- `AGENTS.md` as the shared source of truth for AI-assisted development (architecture,
  conventions, security, dependency rules, workflow), with `CLAUDE.md`,
  `.cursor/rules/agents.mdc`, and `.github/copilot-instructions.md` pointing to it.
- `docs/development-plan.md`: the proposed folder structure and a phased, step-by-step
  implementation plan.
- `docs/chats/README.md`: lightweight convention for keeping selected AI conversation exports.
- Project `README.md` and this `CHANGELOG.md`.
- Two project-wide conventions in `AGENTS.md`: no em dash characters in project-authored text, and
  [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for commit
  messages, aligned with the Semantic Versioning policy. AI tools suggest commit messages only;
  commits are made manually.

[unreleased]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/releases/tag/v0.1.0
