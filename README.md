# Star Wars Portal

[![License: MIT](https://img.shields.io/github/license/PetyoLazarov92/react-star-wars-portal)](LICENSE)
[![Version](https://img.shields.io/github/package-json/v/PetyoLazarov92/react-star-wars-portal)](CHANGELOG.md)
[![Live demo](https://img.shields.io/website?url=https%3A%2F%2Fstarwars.webtimeless.bg%2F&label=live%20demo)](https://starwars.webtimeless.bg/)

A small, production-style React + TypeScript application: a home page leading to a login form
(client-side validation only, no real authentication) that in turn leads to a paginated table of
Star Wars characters from the public [SWAPI](https://swapi.py4e.com/api/people).

**Live demo: [starwars.webtimeless.bg](https://starwars.webtimeless.bg/)**

This README describes the project's real, current state. See
[`AGENTS.md`](AGENTS.md) for full architecture, coding, and security conventions,
[`docs/development-plan.md`](docs/development-plan.md) for the Phase 1 roadmap that shipped
`1.0.0`, and [`docs/phase-2-development-plan.md`](docs/phase-2-development-plan.md) for the
follow-up UI/UX and structure pass that shipped `1.9.0` (with small post-release fixes and polish
in `1.9.1`, `1.10.0`, `1.11.0`, `1.12.0`, and `1.13.0`).

## Current status

Version `1.0.0`'s full planned feature set (see `docs/development-plan.md`) shipped first; a
follow-up UI/UX and structure pass (see `docs/phase-2-development-plan.md`) is now complete on top
of it as of `1.9.0`. `/` is a simple home page (a heading, an
[undraw.co](https://undraw.co/) illustration, and a short description of the app), and `/login` has
a working, client-side validated login form (with a show/hide toggle on the password field) that,
on success, records a lightweight demo session (just the submitted username, in `sessionStorage`,
never the password) and navigates to `/table`, which shows real, paginated SWAPI character data
(name, mass, height, hair color, skin color) with Previous/Next controls, a loading state, and a
generic error message on failure. Mass and height each have a small unit toggle above the table
(kilograms/pounds, centimeters/meters): switching units updates the column headers and every cell
immediately, purely client-side, with no new network request, since the original API value and unit
are the source of truth throughout. `/table` itself redirects a visitor with no session to `/login`
(`src/app/ProtectedRoute.tsx`), with a toast notification explaining why; the reverse also holds:
`/login` redirects a visitor who already has a session to `/` (`src/app/RedirectIfAuthenticated.tsx`),
with a toast noting they're already logged in. Both are navigation guards through the intended
login-first flow, not a security boundary, since there's no server and the character data isn't
actually protected. The current page lives in the
`?page=` URL search param, so reloading, sharing a link, and browser back/forward all keep working
for a logged-in visitor. Each fetched page is cached in `localStorage` for five
minutes, so revisiting it loads instantly without a network request; if a fresh fetch fails, the
last cached data for that page (even past its five-minute TTL) is shown below the error message
instead of a blank failure, with pagination still available. Losing the connection anywhere in the
app shows an accessible, dismissible offline modal that reappears the next time the connection
drops. A small toast notification system (`src/shared/toast/`) shows dismissible, auto-expiring
messages (five seconds, or a manual close) in the bottom corner, used today for both redirects
above. Every page is wrapped in a shared app shell (`src/app/Layout.tsx`): a sticky header with the
Star Wars wordmark (linking to the home page, its `fill="currentColor"` adapting to the theme like
every other header icon), a light/dark/system theme control, and session-aware
navigation (an icon plus a `Login`
link when logged out; when logged in, a `People` link to `/table`, a decorative divider, a greeting,
and a `Log out` action, `People` and `Log out` shown icon-only below the `sm` breakpoint to keep the
header from overflowing on narrow screens), and a footer with a copyright notice whose year updates
on its own. This demo session is
explicitly not real authentication: it's a client-side personalization and navigation convenience,
with no server, no credential check, and no persistent account behind it. The theme control is a
three-way segmented switch (light, dark, or follow the OS preference, the default until a choice is
made), persisting the choice in `localStorage` and, in system mode, reacting live to an OS-level
theme change with no reload needed. The footer links to three static pages, About, Privacy Policy,
and Terms and Conditions (`/about`, `/privacy`, `/terms`), sharing one typography layout
(`shared/components/StaticPage.tsx`) so their headings, paragraphs, lists, and links read as one
visual system; the Privacy Policy and Terms describe this app's actual behavior (no backend, no
real accounts, no cookies or tracking) rather than generic boilerplate. All pages, the header, the
footer, and the offline modal hold up at mobile, tablet, and desktop widths without page-level
horizontal overflow, with interactive controls sized for comfortable touch targets. Every
interactive control (buttons, links, nav items) shares one deliberate focus-visible outline and
hover transition (`shared/focusRing.ts`), and a three-tier shadow scale gives the sticky header, the
modal, and toasts a consistent sense of elevation. An automated `axe-core` scan reports zero
violations (in both themes), and the table and the offline modal's keyboard focus handling have
both been verified by hand. Every page sets its own document title (as `<page> | Star Wars
Portal`, or just `Star Wars Portal` on the home page) and meta tags (description, Open Graph, and
Twitter Card) via `src/shared/hooks/usePageMeta.ts`, so the browser tab title updates correctly on
navigation and a shared link carries a real preview, using one branded share image
(`public/og-image.png`) built from the site's own header wordmark. A Vitest + React Testing Library
suite covers the login validation boundaries, the `localStorage` cache helper (TTL expiry and
corrupted or invalid data), the `?page=` parsing helper, the demo session and toast systems, both
route guards (`ProtectedRoute` and `RedirectIfAuthenticated`, including a regression test that
submits the real login form through the guard to confirm it reaches `/table` rather than being
redirected home), the per-page title/meta tag hook, and a smoke test of the login form's
enable/disable behavior. See `docs/development-plan.md` for the full step-by-step history.

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict)
- [Vite](https://vite.dev/)
- [react-router-dom](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for forms and
  validation (including runtime validation of API responses and cached data)
- [Tailwind CSS](https://tailwindcss.com/) v4
- Native `fetch` and `localStorage`: no HTTP client or data-fetching library
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for
  tests

See `AGENTS.md` for why the dependency list is intentionally short.

## Requirements

- Node.js `^20.19.0 || >=22.12.0`

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script                 | Purpose                                |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Start the Vite dev server.             |
| `npm run build`        | Type-check, then build for production. |
| `npm run preview`      | Preview the production build locally.  |
| `npm run lint`         | Lint with ESLint.                      |
| `npm run lint:fix`     | Lint and auto-fix.                     |
| `npm run format`       | Format with Prettier.                  |
| `npm run format:check` | Check formatting without writing.      |
| `npm run typecheck`    | Type-check without emitting.           |
| `npm test`             | Run the Vitest test suite once.        |

## Project structure

```text
src/
  app/
    routes.ts      # named route path constants
    router.tsx     # <Routes>/<Route> definitions, nested under Layout
    Layout.tsx     # app shell: Header, <Outlet /> for the current route, Footer
    Header.tsx     # sticky app bar: Star Wars wordmark, Login/session-aware nav, ThemeToggle
    Footer.tsx     # nav to About/Privacy/Terms, copyright notice with an auto-updating year
    ProtectedRoute.tsx  # redirects /table to /login when there is no demo session (nav guard, not security)
    ProtectedRoute.test.tsx  # redirect vs. pass-through cases, toast shown, StrictMode regression
    RedirectIfAuthenticated.tsx  # redirects /login to / when a demo session already exists
    RedirectIfAuthenticated.test.tsx  # redirect/pass-through cases, toast, and the login-race regression
    OfflineModal.tsx  # offline-specific modal, shown app-wide via useOnlineStatus
  pages/
    HomePage.tsx        # heading, undraw.co illustration, short description
    LoginPage.tsx      # renders the login form
    TablePage.tsx       # renders the people table
    AboutPage.tsx         # tech stack, SWAPI credit, link to the GitHub repo
    PrivacyPolicyPage.tsx    # what sessionStorage/localStorage are used for, no cookies/tracking
    TermsPage.tsx              # demo/no-warranty disclaimer, SWAPI/trademark credit
    NotFoundPage.tsx
  features/
    auth/
      loginSchema.ts     # Zod schema for username/password validation, username character allowlist
      loginSchema.test.ts  # boundary tests for the schema
      LoginForm.tsx        # React Hook Form + zodResolver; records a session, navigates to /table
      LoginForm.test.tsx     # submit button enable/disable, password toggle, session recording
      session.ts               # sessionStorage-backed demo session, Zod-validated on read
      session.test.ts            # round-trip, corrupted/invalid/tampered data all treated as a miss
      sessionContext.ts            # createContext() call and its type (not a component)
      SessionProvider.tsx            # session state + login()/logout(), wraps AppRouter in App.tsx
      useSession.ts                    # consumes SessionContext
      Greeting.tsx                       # renders "Hi, <username>!" in the header when logged in
      Greeting.test.tsx                    # a hostile username renders as inert text, never markup
    people/
      people.schema.ts     # Zod schemas for the SWAPI person and paginated list response
      people.types.ts        # Person and PeopleResponse types, inferred from the schemas
      pageParam.ts             # parses and validates the ?page= URL search param
      pageParam.test.ts          # tests for valid, missing, and malformed page values
      usePeople.ts                # fetches the given SWAPI page (cache-first), loading/success/error
                                  # state, error state carries a stale cached fallback when one exists
      PeopleTable.tsx               # presentational: renders a PeopleState prop, owns unit state
      PeopleTable.test.tsx            # default cm/kg display, switching to m/lb updates the table
      units.ts                          # formatHeight/formatMass: client-side unit conversion
      units.test.ts                       # comma-formatted, non-numeric, and unit-switch cases
      UnitToggle.tsx                        # generic 2-option segmented control (height, mass)
      Pagination.tsx                          # Previous/Next controls, disabled at the first/last page
  shared/
    focusRing.ts    # INTERACTIVE_CLASS_NAME: the app-wide cursor-pointer, focus-visible, and
                    # hover-transition style
    api/
      httpClient.ts    # fetch wrapper: AbortSignal support, typed ApiError, returns unknown
    cache/
      localStorageCache.ts    # getCached/setCached/getStale: Zod-validated reads, getCached applies
                              # a TTL, getStale ignores it for fallback use
      localStorageCache.test.ts  # TTL expiry, corrupted/invalid data handling
    hooks/
      useOnlineStatus.ts    # navigator.onLine, kept in sync via the online/offline events
      useTheme.ts    # light/dark theme, localStorage-persisted, defaults to the OS preference
      usePageMeta.ts    # sets document.title and description/Open Graph/Twitter meta tags per page
      usePageMeta.test.tsx    # title formatting, tag upsert (no duplicates), og:url per route
    components/
      Modal.tsx    # generic accessible dialog built on the native <dialog> element
      ThemeToggle.tsx    # light/dark toggle button, rendered once from app/Header.tsx
      StaticPage.tsx    # shared heading/paragraph/list/link typography for content pages
    toast/
      toastContext.ts    # createContext() call and its type (not a component)
      ToastProvider.tsx    # toast state + showToast(); renders the one visible stack
      ToastProvider.test.tsx  # show, auto-dismiss, manual dismiss, role per variant
      useToast.ts               # consumes ToastContext
  test/
    setup.ts    # Vitest setup: jest-dom matchers, Testing Library cleanup after each test
  App.tsx        # root component, renders the router and the app-wide OfflineModal
  main.tsx       # entry point, wraps App in BrowserRouter
  index.css      # Tailwind entry
```

This is the full structure built out over the plan in `docs/development-plan.md`, which documents
the target folder structure and the reasoning behind it, step by step.

## AI-assisted development

This repo is set up to work with AI coding assistants. `AGENTS.md` is the single shared source of
truth for project conventions; `CLAUDE.md`, `.cursor/rules/agents.mdc`, and
`.github/copilot-instructions.md` all point back to it (via symlink where the tool supports one)
rather than duplicating its content.

## Versioning

This project follows [Semantic Versioning](https://semver.org/) and keeps a
[`CHANGELOG.md`](CHANGELOG.md). It reached `1.0.0` once its Phase 1 feature set was complete and
stable; patch releases are fixes, minor releases are backward-compatible feature additions, and a
major bump is reserved for a breaking change. Since Phase 2 (see
`docs/phase-2-development-plan.md`), each completed step ships its own version bump rather than
batching several steps under one release; the current version is `1.12.0`.
