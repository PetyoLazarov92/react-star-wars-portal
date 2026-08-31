# Star Wars Portal

A small, production-style React + TypeScript application: a login page (client-side validation
only, no real authentication) that leads to a paginated table of Star Wars characters from the
public [SWAPI](https://swapi.py4e.com/api/people).

This README describes the project's real, current state. See
[`AGENTS.md`](AGENTS.md) for full architecture, coding, and security conventions, and
[`docs/development-plan.md`](docs/development-plan.md) for the phased roadmap.

## Current status

Project foundation, routing, and the login form are in place: `/` has a working, client-side
validated login form that navigates to `/table` on success, and `/table` is still a placeholder.
The data table is not implemented yet. See `docs/development-plan.md` for what's next.

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict)
- [Vite](https://vite.dev/)
- [react-router-dom](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for forms and
  validation (including runtime validation of API responses and cached data)
- [Tailwind CSS](https://tailwindcss.com/) v4
- Native `fetch` and `localStorage`: no HTTP client or data-fetching library

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

A test script will be added once a testing stack is introduced (see the development plan).

## Project structure

```text
src/
  app/
    routes.ts      # named route path constants
    router.tsx     # <Routes>/<Route> definitions
  pages/
    LoginPage.tsx      # renders the login form
    TablePage.tsx       # placeholder, data table lands in a later step
    NotFoundPage.tsx
  features/
    auth/
      loginSchema.ts     # Zod schema for username/password validation
      LoginForm.tsx        # React Hook Form + zodResolver, navigates to /table on success
  App.tsx        # root component, renders the router
  main.tsx       # entry point, wraps App in BrowserRouter
  index.css      # Tailwind entry
```

This will grow feature by feature (`features/people`, `shared/`) per the plan in
`docs/development-plan.md`, which documents the target folder structure and the reasoning behind
it.

## AI-assisted development

This repo is set up to work with AI coding assistants. `AGENTS.md` is the single shared source of
truth for project conventions; `CLAUDE.md`, `.cursor/rules/agents.mdc`, and
`.github/copilot-instructions.md` all point back to it (via symlink where the tool supports one)
rather than duplicating its content.

## Versioning

This project follows [Semantic Versioning](https://semver.org/) and keeps a
[`CHANGELOG.md`](CHANGELOG.md). It's currently `0.x` (active development); breaking changes can
happen between minor versions until `1.0.0`.
