# Star Wars Portal

[![License: MIT](https://img.shields.io/github/license/PetyoLazarov92/react-star-wars-portal?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/github/package-json/v/PetyoLazarov92/react-star-wars-portal?style=flat-square&color=blue)](CHANGELOG.md)
[![Live demo](https://img.shields.io/website?url=https%3A%2F%2Fstarwars.webtimeless.bg%2F&label=live%20demo&style=flat-square)](https://starwars.webtimeless.bg/)

[![React](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/react?label=React&logo=react&logoColor=white&color=61DAFB&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/dev/typescript?label=TypeScript&logo=typescript&logoColor=white&color=3178C6&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/dev/vite?label=Vite&logo=vite&logoColor=white&color=646CFF&style=flat-square)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/dev/tailwindcss?label=Tailwind%20CSS&logo=tailwindcss&logoColor=white&color=06B6D4&style=flat-square)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/react-router-dom?label=React%20Router&logo=reactrouter&logoColor=white&color=CA4245&style=flat-square)](https://reactrouter.com/)
[![React Hook Form](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/react-hook-form?label=React%20Hook%20Form&logo=reacthookform&logoColor=white&color=EC5990&style=flat-square)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/zod?label=Zod&logo=zod&logoColor=white&color=3E67B1&style=flat-square)](https://zod.dev/)
[![Vitest](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/dev/vitest?label=Vitest&logo=vitest&logoColor=white&color=6E9F18&style=flat-square)](https://vitest.dev/)
[![ESLint](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/dev/eslint?label=ESLint&logo=eslint&logoColor=white&color=4B32C3&style=flat-square)](https://eslint.org/)
[![Prettier](https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/dev/prettier?label=Prettier&logo=prettier&logoColor=white&color=F7B93E&style=flat-square)](https://prettier.io/)

A small, production-style React + TypeScript application: a home page leading to a login form
(client-side format validation only, no real authentication) that in turn leads to a paginated
table of Star Wars characters from the public [SWAPI](https://swapi.py4e.com/api/people).

**🔗 Live demo: [starwars.webtimeless.bg](https://starwars.webtimeless.bg/)**

This README describes the project's real, current state. See [`AGENTS.md`](AGENTS.md) for full
architecture, coding, and security conventions, and [Documentation](#documentation) below for the
project's roadmaps and release history.

## Key features

- **Home page (`/`)** — a short introduction to the app.
- **Login (`/login`)** — a React Hook Form + Zod validated login form (username/password format
  only), with a show/hide password toggle. There is no server and no credential check: a
  successful submit simply starts a lightweight, client-side "demo session" (the submitted
  username, held in `sessionStorage`, never the password) used only to personalize the UI and
  guide navigation. It is explicitly **not** real authentication or a protected resource.
- **Character table (`/table`)** — paginated, live [SWAPI](https://swapi.py4e.com/api/people) data
  (name, mass, height, hair color, skin color) with loading and error states, and client-side
  kg/lb and cm/m unit toggles that re-render instantly with no extra network request.
- **Resilient data fetching** — each page is cached in `localStorage` for five minutes for instant
  revisits; if a fresh fetch fails, the last cached page is still shown beneath a generic error
  message instead of a blank failure.
- **Navigation guards** — `/table` redirects to `/login` without a demo session and `/login`
  redirects to `/` with one already, each with an explanatory toast. Both are UX conveniences
  through the intended flow, not a security boundary.
- **Theming** — a light/dark/system-following theme, persisted in `localStorage` and reacting live
  to OS-level changes in system mode.
- **Accessibility** — semantic HTML, a focus-trapping offline dialog, visible focus states
  throughout, and zero automated `axe-core` violations in either theme.
- **SEO & social sharing** — every route sets its own document title and Open Graph/Twitter Card
  meta tags via `usePageMeta`, with a branded share image for link previews.
- **Fully responsive** — mobile, tablet, and desktop layouts with no page-level horizontal
  overflow and comfortable touch targets.
- **Static content pages** — About, Privacy Policy, and Terms and Conditions, sharing one
  typography layout and describing the app's actual (server-less, account-less) behavior.
- **Automated tests** — a Vitest + React Testing Library suite covers form validation boundaries,
  the `localStorage` cache helper, URL page-param parsing, the demo session, both route guards,
  and the toast system.

## Technologies

| Category             | Choice                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Framework            | [React](https://react.dev/) 19                                                             |
| Language             | [TypeScript](https://www.typescriptlang.org/) (`strict` mode)                              |
| Build tool           | [Vite](https://vite.dev/)                                                                  |
| Routing              | [React Router](https://reactrouter.com/)                                                   |
| Forms & validation   | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)                  |
| Styling              | [Tailwind CSS](https://tailwindcss.com/) v4                                                |
| Data fetching        | Native `fetch` + `AbortController` (no HTTP client library)                                |
| Persistence          | Native `localStorage` / `sessionStorage`, Zod-validated on every read                      |
| Testing              | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) |
| Linting & formatting | [ESLint](https://eslint.org/) (incl. `jsx-a11y`) + [Prettier](https://prettier.io/)        |

See [`AGENTS.md`](AGENTS.md) for why the dependency list is intentionally kept this short.

## Requirements

- Node.js `^20.19.0 || >=22.12.0`

## Getting started

```bash
npm install
npm run dev
```

## Available scripts

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
├── app/                             # router, layout shell, route guards
│   ├── routes.ts                    # named route path constants
│   ├── router.tsx                   # route definitions, nested under Layout
│   ├── Layout.tsx                   # app shell: Header, <Outlet />, Footer
│   ├── Header.tsx                   # sticky app bar, session-aware nav, ThemeToggle
│   ├── Footer.tsx                   # footer nav, auto-updating copyright year
│   ├── ProtectedRoute.tsx           # redirects /table to /login without a session
│   ├── RedirectIfAuthenticated.tsx  # redirects /login to / with a session
│   └── OfflineModal.tsx             # offline dialog, shown app-wide
├── pages/                           # thin route-level components
│   ├── HomePage.tsx                 # heading, illustration, short description
│   ├── LoginPage.tsx                # renders the login form
│   ├── TablePage.tsx                # renders the people table
│   ├── AboutPage.tsx                # tech stack, SWAPI credit, repo link
│   ├── PrivacyPolicyPage.tsx        # storage usage, no cookies or tracking
│   ├── TermsPage.tsx                # demo/no-warranty disclaimer
│   └── NotFoundPage.tsx
├── features/                        # feature-owned components, hooks, schemas
│   ├── auth/
│   │   ├── loginSchema.ts           # Zod schema, username character allowlist
│   │   ├── LoginForm.tsx            # React Hook Form + zodResolver
│   │   ├── session.ts               # sessionStorage-backed demo session
│   │   ├── sessionContext.ts        # context definition and type
│   │   ├── SessionProvider.tsx      # session state, login()/logout()
│   │   ├── useSession.ts            # consumes SessionContext
│   │   └── Greeting.tsx             # "Hi, <username>!" in the header
│   └── people/
│       ├── people.schema.ts         # Zod schemas for SWAPI responses
│       ├── people.types.ts          # types inferred from the schemas
│       ├── pageParam.ts             # parses and validates ?page=
│       ├── usePeople.ts             # cache-first fetch, loading/success/error
│       ├── PeopleTable.tsx          # presentational, owns unit state
│       ├── units.ts                 # client-side mass/height conversion
│       ├── UnitToggle.tsx           # generic 2-option segmented control
│       └── Pagination.tsx           # Previous/Next controls
├── shared/                          # cross-cutting code used by more than one feature
│   ├── focusRing.ts                 # shared hover/focus-visible style
│   ├── api/
│   │   └── httpClient.ts            # fetch wrapper, AbortSignal, typed ApiError
│   ├── cache/
│   │   └── localStorageCache.ts     # Zod-validated reads, TTL, stale fallback
│   ├── hooks/
│   │   ├── useOnlineStatus.ts       # navigator.onLine, kept in sync
│   │   ├── useTheme.ts              # light/dark theme, localStorage-persisted
│   │   └── usePageMeta.ts           # per-page title and Open Graph/Twitter tags
│   ├── components/
│   │   ├── Modal.tsx                # accessible dialog on the native <dialog>
│   │   ├── ThemeToggle.tsx          # light/dark toggle button
│   │   └── StaticPage.tsx           # shared typography for content pages
│   └── toast/
│       ├── toastContext.ts          # context definition and type
│       ├── ToastProvider.tsx        # toast state, showToast(), renders the stack
│       └── useToast.ts              # consumes ToastContext
├── test/
│   └── setup.ts                     # Vitest setup, jest-dom, Testing Library cleanup
├── App.tsx                          # root component, router and app-wide OfflineModal
├── main.tsx                         # entry point, wraps App in BrowserRouter
└── index.css                        # Tailwind entry
```

Every feature and shared module above has a co-located `*.test.ts`/`*.test.tsx` file mirroring it
(omitted here for brevity); see [Key features](#key-features) for what the test suite covers.

## Documentation

- [`AGENTS.md`](AGENTS.md) — the single source of truth for architecture, coding, security, and
  accessibility conventions (shared by every AI coding assistant working in this repo: `CLAUDE.md`,
  `.cursor/rules/agents.mdc`, and `.github/copilot-instructions.md` all point back to it).
- [`docs/development-plan.md`](docs/development-plan.md) — the Phase 1 roadmap that shipped
  `1.0.0`.
- [`docs/phase-2-development-plan.md`](docs/phase-2-development-plan.md) — the follow-up UI/UX and
  structure pass, complete as of `1.9.0`.
- [`CHANGELOG.md`](CHANGELOG.md) — full release history, in [Keep a
  Changelog](https://keepachangelog.com/en/1.1.0/) format.

## Versioning

This project follows [Semantic Versioning](https://semver.org/): patch releases are fixes, minor
releases are backward-compatible feature additions, and a major bump is reserved for a breaking
change. See [`CHANGELOG.md`](CHANGELOG.md) for the version currently released and its full history.

## License

Released under the [MIT License](LICENSE).
