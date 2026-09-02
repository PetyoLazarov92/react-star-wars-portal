# AGENTS.md

Shared instructions for any AI coding assistant (Claude Code, Cursor, GitHub Copilot, or others)
working in this repository. Tool-specific files (`CLAUDE.md`, `.cursor/rules/*`,
`.github/copilot-instructions.md`) point back to this document instead of duplicating it: this is
the single source of truth. If something here becomes outdated as the project evolves, update it
in the same change, don't leave it stale.

## Writing style for project text

Do not use the em dash character ("—") anywhere in text authored for this repository: README
files, other documentation, CHANGELOG entries, code comments, JSDoc, commit messages, AI
instructions, development plans, or any other project-authored text. Use a comma, period, colon,
parentheses, or a regular hyphen instead, whichever fits the sentence. This applies consistently
across every AI tool working in this repository.

## What this project is

A responsive React + TypeScript application built around two core pages, plus a few static content
pages:

- `/`: a login form (username + password) with client-side validation only.
- `/table`: a paginated table of Star Wars characters from the public SWAPI
  (`https://swapi.py4e.com/api/people`), showing name, mass, height, hair color, and skin color.
- `/about`, `/privacy`, `/terms`: static content pages, sharing
  `shared/components/StaticPage.tsx` for consistent typography, linked from the footer.

The login is **not real authentication**. It only validates input format client-side and then
navigates to `/table`. There is no server, no credential check, and no real account: a valid submit
(any username/password that satisfies the format rules) starts a lightweight, client-side "demo
session" (just the submitted username, held in `sessionStorage` so it doesn't outlive the browser
tab), used only to personalize the UI (a greeting, showing a `People` link instead of `Login`) and
to redirect a visitor away from `/table` before they've gone through the login form. That redirect
is a navigation/UX guard, not a security boundary: nothing behind `/table` is actually protected
(there is no server to enforce it, and the character data itself is public), so never describe it,
in code, comments, or UI copy, as real authentication, a protected resource, or anything implying a
security boundary that doesn't exist. Never introduce a fake session token, a password hash, a
user database, or anything that implies credentials are actually being checked.

## Guiding principles

- Keep it simple. Prefer the boring, obvious solution over a clever or "future-proof" one.
- Minimal dependencies. The agreed stack is React, TypeScript, Vite, react-router-dom,
  React Hook Form, Zod, and Tailwind CSS. Do not add another library (state management, HTTP
  client, UI kit, date library, icon pack, etc.) unless there is a concrete technical reason the
  native platform or the existing stack cannot reasonably do the job. If you think a new
  dependency is justified, say so explicitly and explain why before adding it, don't add it
  silently.
- No premature abstraction. Don't extract a hook, component, or "shared" utility until it's
  actually reused (rule of three) or the current shape is genuinely hard to read. Three similar
  lines are better than a speculative abstraction.
- Native browser APIs first: `fetch`, `AbortController`, `localStorage`, `navigator.onLine`, the
  `online`/`offline` events. Don't wrap them in abstractions that don't earn their keep.
- This is a living codebase with living docs. When you change architecture, scripts, structure,
  or a meaningful decision, update `README.md`, `docs/development-plan.md`, and `CHANGELOG.md` in
  the same change, not as a follow-up.

## Architecture

The project follows the phased structure and folder layout defined in
[`docs/development-plan.md`](docs/development-plan.md). That document is the working source of
truth for what has been built so far and what's next: check it before starting a step, and check
off / update it as steps complete. In short:

- `src/app/`: router and app shell.
- `src/pages/`: thin, route-level components that compose features.
- `src/features/<feature>/`: feature-owned components, hooks, schemas, and types (e.g. `auth`,
  `people`). A feature folder only exists once there's real feature-specific logic to hold.
- `src/shared/`: cross-cutting code used by more than one feature: the fetch wrapper, the
  localStorage cache helper, generic UI primitives (modal, spinner, error message), and generic
  hooks (e.g. online/offline detection).

Routing is declarative (`react-router-dom`'s `<Routes>`/`<Route>`), with route paths defined as
named constants in one place rather than repeated as string literals, so links and `navigate()`
calls can't drift out of sync. Pagination state lives in the URL (`/table?page=2`) so it survives
refresh and back/forward navigation, and any page value read from the URL is validated (a positive
integer, defaulting to `1` if malformed) before use.

## React & TypeScript conventions

- Functional components and hooks only. No class components.
- TypeScript `strict` mode is on; treat `any` as a bug. Use `unknown` plus narrowing, or generics,
  when a type genuinely isn't known ahead of time.
- One component per file, default-exported, to keep Fast Refresh reliable.
- Model async/request state as a discriminated union (e.g.
  `{ status: 'idle' | 'loading' | 'success' | 'error', ... }`) instead of several independent
  booleans.
- Validate data at trust boundaries with Zod: both API responses and anything read back out of
  `localStorage`, and derive TypeScript types from those schemas with `z.infer` rather than
  hand-maintaining parallel types. Never trust `JSON.parse` output without validating its shape
  first.
- Props get explicit `interface`/`type` definitions. No `PropTypes`.

## Security principles

- No secrets, API keys, or credentials in client code. The SWAPI endpoint used here is public and
  needs none; if a future integration ever needs one, it must not be hardcoded or committed.
- The login form is format validation only. Never store the password anywhere (state is fine
  transiently for the form; don't persist it, log it, or send it anywhere). The demo session
  described above stores only the submitted username, never the password, and only in
  `sessionStorage` (read back through a Zod schema, like every other trust-boundary read in this
  project), never `localStorage`, since it shouldn't outlive the tab.
- Never use `dangerouslySetInnerHTML` or otherwise render unescaped HTML. All API-derived text and
  all user-submitted text (including the username, once it's echoed back in a greeting) goes
  through normal React children so it's escaped automatically. Fields whose value can be rendered
  back into the UI also get a character allowlist in their Zod schema (e.g. the username's) as
  defense in depth on top of React's escaping, rejecting HTML-special characters outright rather
  than relying on escaping alone.
- Treat both the API response and `localStorage` cache contents as untrusted input: parse and
  validate them (Zod) before rendering or storing further, since `localStorage` can be edited by
  the user or another script on the same origin.
- Build any dynamic request URLs (e.g. page numbers) from validated, well-typed values, never
  interpolate raw, unvalidated user/URL input directly into a fetch URL.
- Keep user-facing error messages generic; don't leak raw error objects, stack traces, or response
  bodies into the UI.
- Clean up in-flight requests (`AbortController`) on unmount to avoid state updates on unmounted
  components and wasted network calls.

## Accessibility

- Semantic HTML first (`<button>`, `<table>`, `<label>`, landmark elements) over ARIA
  reimplementations.
- Every form field has a real, associated `<label>`; validation errors are announced (e.g.
  `aria-describedby` + `role="alert"`) not just shown visually via color.
- The offline modal is a real focus-trapping dialog (`role="dialog"`, `aria-modal="true"`, labelled
  title, closes on `Escape`, returns focus to the trigger): reach for the native `<dialog>` element
  if it covers the need before hand-rolling one.
- Interactive elements must be keyboard operable and show a visible focus state; don't remove
  focus outlines without replacing them.
- `eslint-plugin-jsx-a11y` runs as part of `npm run lint`; don't disable its rules without a good
  reason recorded in a comment.

## Styling & theming

- Tailwind CSS v4, configured via `@tailwindcss/vite` (CSS-first config in `src/index.css`, no
  `tailwind.config.js` needed unless a future customization genuinely requires one).
- Mobile-first, responsive utility classes; avoid hardcoded pixel widths that break small screens.
- Light, dark, and system-following themes are implemented via a class-based Tailwind `dark:`
  variant (see `shared/hooks/useTheme.ts`). Prefer Tailwind utility classes over inline `style`
  colors, and prefer a small number of reusable primitives (button, input, card, modal) over
  scattering the same raw color utilities across many files, so theme-related changes stay
  additive (an extra `dark:` class alongside the existing one) instead of structural.
- The visual target is a clean, modern, Material Design-inspired look: a consistent elevation
  (shadow) scale, a consistent border-radius and spacing rhythm, a defined type scale, clear
  hover/`focus-visible`/active/disabled states on every interactive element, and short, purposeful
  motion on state changes, without adopting a Material component library. Express all of it with
  Tailwind utilities and, where a small set of reused values earns it, Tailwind v4's `@theme`
  tokens in `src/index.css`.
- No Sass or other CSS preprocessor. Tailwind v4 runs on Lightning CSS, which already provides
  native CSS nesting, custom properties, and `calc()`-based math, the specific problems a
  preprocessor historically solved, so one is not justified here. If a concrete styling need ever
  comes up that Tailwind genuinely cannot express cleanly, name that specific need and revisit the
  decision explicitly rather than adding a preprocessor preemptively.

## Dependency rules

Allowed (already in the project): `react`, `react-dom`, `react-router-dom`, `react-hook-form`,
`zod`, `@hookform/resolvers`, `tailwindcss` + `@tailwindcss/vite`.

Not allowed without an explicit, justified exception: Redux or any other global state library,
Axios or any other HTTP client, TanStack Query or any other data-fetching/cache library, a UI
component library, icon libraries, date libraries, CSS-in-JS libraries. The app's scope (a handful
of pages, one public API, client-side-only "auth") does not need them: native `fetch` + hooks +
Zod-validated `localStorage`/`sessionStorage` cover it. React's own `createContext`/`useContext`
are not a "state library" and don't need an exception to use: reach for them only when a piece of
state genuinely has more than one independent reader that isn't an ancestor of the writer (the
demo session and the toast queue are the two current examples), never for state a single
hook/component can own locally.

## Development workflow

- `npm run dev`: start the dev server.
- `npm run build`: type-check (`tsc -b`) then produce a production build via Vite.
- `npm run preview`: preview the production build locally.
- `npm run lint` / `npm run lint:fix`: ESLint (flat config), including `jsx-a11y` and
  `react-hooks` rules.
- `npm run format` / `npm run format:check`: Prettier.
- `npm run typecheck`: TypeScript project build without emitting.
- Testing (Vitest + React Testing Library) is introduced once there is real logic worth testing
  (validation schemas, the cache helper, pagination), per the step in
  `docs/development-plan.md`, not added speculatively.

Before considering a step done: `npm run typecheck`, `npm run lint`, and `npm run build` should all
pass, and the app should be manually exercised in a browser for UI-affecting changes.

## Commit conventions

This project uses [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for
every commit message. The official specification is the source of truth for format and edge cases;
in short: `<type>[optional scope]: <description>`, e.g. `feat(auth): add login form validation` or
`fix: handle malformed cache entries`. Common types here: `feat`, `fix`, `refactor`, `docs`,
`test`, `chore`, `style`, `perf`, `build`, `ci`. Use a scope when it adds useful context (a feature
name, a shared area) and omit it when the change is broad or a scope wouldn't clarify anything. A
breaking change uses `!` after the type/scope (or a `BREAKING CHANGE:` footer) and maps to a
Semantic Versioning major bump; `feat` maps to a minor bump; `fix` maps to a patch bump, consistent
with the versioning policy below.

After a logical development step is complete, suggest an appropriate Conventional Commit message
for the changes as part of the response, don't wait to be asked. If a step bundled unrelated
changes, suggest separate commit messages for each logical change rather than one combined,
vague message.

**No AI tool creates, amends, or pushes git commits in this repository.** Only suggest commit
messages; the developer decides when and how to commit.

## Versioning & documentation

- Semantic Versioning. The project reached `1.0.0` once its originally planned feature set (Phase
  1, see `docs/development-plan.md`) was complete and stable; from there, patch releases are fixes,
  minor releases are backward-compatible feature additions, and a major bump is reserved for a
  breaking change. Don't bump the version for trivial/internal changes.
- `package.json` version and `CHANGELOG.md` (Keep a Changelog format) must always agree. During
  Phase 2 (see `docs/phase-2-development-plan.md`), each completed step gets its own version bump
  immediately, in the same change as that step, rather than batching several steps under one
  `Unreleased` heading and releasing later.
- `README.md` must always reflect the real, current state of the project (structure, features,
  scripts, setup): update it whenever any of those change, not just at milestones.
- `docs/development-plan.md` (Phase 1, closed) and `docs/phase-2-development-plan.md` (the current
  phase) are living roadmaps: update the relevant step (status, decisions, anything learned during
  implementation) as it's completed or changed, rather than leaving it to describe only the
  original intent.
- Sanitized full-transcript exports of AI coding sessions are kept under `docs/chats/` as a build
  history reference, generated with `scripts/export-chat-history.py` (see the README there for the
  export and sanitization conventions).
