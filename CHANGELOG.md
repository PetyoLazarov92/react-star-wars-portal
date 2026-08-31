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
