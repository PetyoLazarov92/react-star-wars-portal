# Production React project setup and architecture

_Session date: 2026-08-31_

## Prompt 1

> I want to build this project from scratch and I want us to treat it like a real production-style React project. I want to keep it simple, clean, secure, maintainable, and easy to understand. I don't want to over-engineer it or add libraries just for the sake of having them.
>
> Let's start with setting up the repository and the project foundation first. Don't start building the actual login or table features yet.
>
> The app will be a responsive React and TypeScript application with a login page and a data table page. After successful validation on the login page, the user should navigate to /table. The table will use the Star Wars API at https://swapi.py4e.com/api/people and display name, mass, height, hair color, and skin color. It will also have basic pagination, loading and error states, localStorage caching with simple cache validation, and an offline connection notification shown in a modal with an image.
>
> The login form will have username and password fields. Both fields are required and must contain between 4 and 30 characters. The login button should be disabled while the form is invalid.
>
> For the stack I want to use React, TypeScript, Vite and react-router-dom. I also want to use React Hook Form and Zod for the form and validation, and TailwindCSS for styling. These are intentional choices, but I still want to keep the dependency count low.
>
> Please don't add Redux, Axios, TanStack Query, a UI component library, or other packages unless there is a real technical reason for them. Prefer React and native browser APIs whenever they are enough. For example, use native fetch for the API instead of adding Axios.
>
> I want the code to follow modern React and TypeScript best practices. Use strict TypeScript, avoid any unless there is a very good reason, use clear types for application data and API responses, use functional components and hooks, and keep components focused.
>
> At the same time, don't create abstractions just because they might be useful someday. I want a simple architecture that is easy to understand and can grow naturally if we add more features later.
>
> Let's also treat security as part of the project from the beginning. I want sensible production-ready practices such as safe input handling, safe localStorage usage, no secrets or credentials in the client, safe API error handling, no unsafe HTML rendering, predictable routing, accessible UI, and reasonable performance.
>
> The login is only a client-side validation flow for this project, so don't build fake authentication or pretend that this provides real authentication security.
>
> I also want to prepare the repository for AI-assisted development because I may use Claude Code, Cursor, GitHub Copilot, or other AI coding tools while working on it.
>
> Let's keep this part minimal.
>
> I want one shared source of truth for AI development instructions, preferably AGENTS.md, containing the project architecture, React and TypeScript conventions, coding standards, security principles, dependency rules, and development workflow.
>
> Then create the minimum necessary tool-specific files for Claude, Cursor, and GitHub Copilot. Where possible, use symlinks to the shared instructions instead of duplicating the same content across multiple files. If a particular tool requires its own format or cannot work correctly with a symlink, keep the tool-specific file as small as possible and make it reference or follow the shared instructions.
>
> I don't want a complicated AI documentation system. We don't need a large .ai folder with lots of categories and files.
>
> If you think a small .ai directory is genuinely useful, keep it minimal and only use it for things that don't naturally belong in the main project documentation. For example, a simple place for the development plan could be useful, but don't create folders or files just to fill a structure.
>
> I do want the development plan to live in the repository so we can follow it and update it as we build the project. Please choose a simple and sensible location for it, such as docs/development-plan.md or a similarly appropriate location.
>
> The development plan should be a living document. We should update it as we complete phases, change decisions, or discover something important during implementation.
>
> I also want to keep selected AI conversation exports in the repository when they contain useful architectural discussions or important decisions that another developer or AI assistant could benefit from. Keep this minimal too. Don't export every conversation. If a simple chats folder is useful, add one, otherwise suggest a better lightweight approach.
>
> I want the README to be a living document as well. Keep it concise and professional, but update it whenever the actual project structure, features, scripts, setup process, or important architectural decisions change. It should always describe the real current state of the project.
>
> Please also use Semantic Versioning consistently. Keep package.json, the changelog, and releases aligned. Start with an appropriate 0.x version while the project is under active development and follow SemVer principles for meaningful changes. Don't bump the version for every tiny change. Use patch, minor, and major versions appropriately based on the scope of the change.
>
> I want a CHANGELOG.md from the beginning and I want us to maintain it throughout the project. Use a clear versioned format and keep it synchronized with the actual project history.
>
> For the development workflow, set up only the tooling we genuinely need. I want scripts for development, production builds, linting, formatting, and TypeScript type checking. Add testing if and when it makes sense for the architecture, but don't introduce a testing stack just for the sake of checking a box.
>
> Please make sure the project can be installed and built successfully from a clean checkout.
>
> Before we start implementing features, I want you to inspect the repository, set up the project foundation, and think through the architecture.
>
> I want you to propose the source folder structure instead of blindly creating a large folder hierarchy. Keep the architecture feature-oriented or domain-oriented only where it actually improves the project.
>
> I also want you to think about routing, form handling, validation, API communication, API response types, pagination, caching, cache validation, offline detection, error handling, responsive design, accessibility, theme support, testing, security, performance, documentation, versioning, and AI-assisted development.
>
> I plan to add a light and dark theme later as a separate step, so make sure the initial architecture won't make that difficult, but don't implement the theme yet.
>
> Once you've inspected the repository, first set up the foundation and then give me the architecture and the implementation plan.
>
> Break the implementation into small steps that we can complete one at a time. Each step should leave the project in a working state. Don't implement everything at once.
>
> The plan should cover the repository setup, routing, login and validation, API integration, table, pagination, caching, loading and error states, offline detection and modal, responsive styling, accessibility, light and dark theme, testing, and final cleanup.
>
> For each step, I want to know what we're building, why we're doing it at that point, what will change, and how we'll validate it.
>
> I want us to follow the plan throughout development and update it when something changes.
>
> For now, just set up the repository and project foundation, create the minimum necessary AI instructions and documentation, establish the development workflow, and create the initial development plan.
>
> Don't implement the login or table yet. After the setup and plan are complete, stop and wait for my next instruction.
>
> Throughout the project, prioritize simple solutions, minimal dependencies, clean React and TypeScript, security, accessibility, maintainability, and good production practices.

**Actions:**

- Ran `ls -la && echo "---git---" && git log --oneline -20 2>&1 && echo "---node/npm---" && node -v && npm -v`
- Ran `node -v; npm -v; git config user.name; git config user.email; cat .git/config 2>&1 | head -30`
- Ran `npm view vite version; npm view tailwindcss version; npm view react-router-dom version; npm view react-hook-form version; npm view zod version; npm view @hookfo …` (multi-line/long command, trimmed)
- Ran `npm create vite@latest . -- --template react-ts 2>&1 | tail -40`
- Ran `ls -la && echo --- && cat package.json`
- Asked: “Which linter should the project use?”
- Ran `rm -f .oxlintrc.json && npm pkg delete scripts.lint 2>&1 | tail -5`
- Ran `npm uninstall oxlint 2>&1 | tail -20`
- Ran `cat package.json`
- Ran `npm install react-router-dom react-hook-form zod @hookform/resolvers 2>&1 | tail -30`
- Ran `npm install -D tailwindcss @tailwindcss/vite eslint typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-jsx-a11y prettier esli …` (multi-line/long command, trimmed)
- Ran `cat package.json; echo ---; npm ls eslint typescript-eslint eslint-plugin-jsx-a11y eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-config-prettier  …` (multi-line/long command, trimmed)
- Ran `find src -type f | sort && echo --- && cat vite.config.ts && echo --- && cat index.html`
- Ran `rm -f src/App.css src/assets/react.svg src/assets/hero.png; rmdir src/assets 2>/dev/null; ls public`
- Wrote `vite.config.ts`
- Wrote `src/index.css`
- Wrote `src/App.tsx`
- Ran `rm -f public/icons.svg; ls public src`
- Ran `ls -la src/assets 2>&1`
- Ran `rm -rf src/assets`
- Edited `tsconfig.app.json`
- Edited `tsconfig.node.json`
- Wrote `eslint.config.js`
- Ran `ls node_modules/@eslint/js 2>&1 | head -5; echo ---; node -e "const j=require('./node_modules/eslint-plugin-jsx-a11y'); console.log(Object.keys(j.flatConfigs||{ …` (multi-line/long command, trimmed)
- Ran `cat node_modules/eslint-plugin-react-refresh/package.json | head -20; echo ---; node --input-type=module -e "import r from 'eslint-plugin-react-refresh'; consol …` (multi-line/long command, trimmed)
- Ran `npm install -D @eslint/js 2>&1 | tail -10`
- Ran `grep -A 30 "ERESOLVE" ~/.npm/_logs/2026-08-31T19_18_58_615Z-debug-0.log | head -60`
- Ran `npm view @eslint/js versions --json 2>&1 | tail -5; npm install -D @eslint/js@9 2>&1 | tail -10`
- Wrote `.prettierrc.json`
- Wrote `.prettierignore`
- Ran `cat package.json`
- Edited `package.json`
- Edited `package.json`
- Ran `npm run typecheck 2>&1`
- Ran `npm run lint 2>&1`
- Ran `node --input-type=module -e " …` (multi-line/long command, trimmed)
- Ran `node --input-type=module -e " …` (multi-line/long command, trimmed)
- Ran `grep -n -A 15 "recommended-latest\|flat config\|Flat Config\|## Installation\|## Usage" node_modules/eslint-plugin-react-hooks/README.md | head -100`
- Edited `eslint.config.js`
- Ran `npm run lint 2>&1`
- Ran `npm run format:check 2>&1`
- Ran `npm run format 2>&1 && npm run format:check 2>&1`
- Ran `npm run build 2>&1`
- Ran `rm -rf dist …` (multi-line/long command, trimmed)
- Ran `pkill -f "node.*vite" 2>/dev/null; sleep 1; ps aux | grep -i vite | grep -v grep; npm run build 2>&1 | tail -10`
- Ran `ps aux | grep -i vite | grep -v grep; echo "---"; npm run build`
- Ran `node -e "console.log(require('./node_modules/vite/package.json').engines)"; node -e "console.log(require('./node_modules/typescript/package.json').engines)"`
- Edited `package.json`
- Wrote `.editorconfig`
- Wrote `AGENTS.md`
- Ran `set -e …` (multi-line/long command, trimmed)
- Wrote `.cursor/rules/agents.mdc`
- Wrote `docs/development-plan.md`
- Wrote `docs/chats/README.md`
- Wrote `README.md`
- Edited `README.md`
- Ran `grep -n '^```$' docs/development-plan.md | head`
- Edited `docs/development-plan.md`
- Edited `docs/development-plan.md`
- Ran `npx prettier --write README.md docs/development-plan.md AGENTS.md docs/chats/README.md 2>&1`
- Wrote `CHANGELOG.md`
- Ran `npm run format:check 2>&1 && npm run lint 2>&1 && npm run typecheck 2>&1 && npm run build 2>&1`
- Ran `rm -rf dist …` (multi-line/long command, trimmed)
- Ran `file CLAUDE.md .github/copilot-instructions.md; echo ---; readlink CLAUDE.md .github/copilot-instructions.md; echo ---; cat .github/copilot-instructions.md | he …` (multi-line/long command, trimmed)
- Ran `find . -path ./node_modules -prune -o -path ./.git -prune -o -type f -print -o -type l -print | sort`
- Ran `cat package.json`

**Response:**

I'll start by inspecting the repository, then set up the project foundation.

Before going further, one decision affects the whole tooling setup: the current Vite scaffold (very fresh — Vite 8, React 19, TS 6) defaults to **oxlint** instead of ESLint.

Now let's install the app dependencies and dev tooling.

Now Tailwind CSS v4 and the ESLint/Prettier stack.

Now let's wire up Tailwind, clean the default template files, and configure ESLint/Prettier.

Replacing the default template content with a minimal Tailwind-based placeholder, and wiring up Tailwind v4 in Vite.

Now let's tighten TypeScript strictness and set up ESLint flat config + Prettier.

Now the ESLint flat config:

Now let's add Prettier config and package.json scripts, then run everything to verify.

Good, file is as intended. Simplifying the typecheck script since `tsc -b` already respects `noEmit` from the referenced configs.

Now let's verify everything actually works: typecheck, lint, format check, build, and dev server startup.

Type check passes cleanly. Now lint:

It's `reactHooks.configs.flat['recommended-latest']`, not `reactHooks.configs['recommended-latest']`. Let me fix that in the eslint config.

Lint passes clean. Now formatting and build.

Now let's build and do a quick dev server smoke test.

Build succeeds. Let's do a quick smoke test of the dev server and confirm Tailwind CSS is actually applied.

Now let's write the shared AI instructions file — the single source of truth for architecture, conventions, and workflow.

Now the tool-specific files. CLAUDE.md and Copilot's instructions can be plain symlinks; Cursor's rule format needs frontmatter, so it gets a tiny real file that references AGENTS.md.

Now the living development plan — the architecture proposal and phased roadmap.

Now the minimal `docs/chats/` convention for selected AI conversation exports:

Replacing the default template README with a real project README.

Now let's run Prettier over the markdown files to fix table alignment and any other style issues, then write CHANGELOG.md.

Good, formatting applied cleanly. Now the CHANGELOG.md.

Now let's run the full validation suite one more time after all doc changes, and check git status.

All green. Let's clean up the build artifact and check the full repo state.

Everything is in place and verified. Here's a summary of what was done, and stopping here as requested.

## What's set up

**Foundation:** Vite + React 19 + TypeScript (strict, plus `noUncheckedIndexedAccess`/`noImplicitReturns`/`noPropertyAccessFromIndexSignature`), Tailwind CSS v4 via `@tailwindcss/vite`, ESLint flat config (`typescript-eslint`, `react-hooks`, `react-refresh`, `jsx-a11y`) + Prettier, and `react-router-dom` / `react-hook-form` / `zod` / `@hookform/resolvers` installed (unused until their features land). `npm run dev|build|preview|lint|lint:fix|format|format:check|typecheck` all verified working from a clean install, including a full `npm run build`.

**AI instructions:** [AGENTS.md](AGENTS.md) is the single source of truth (architecture, conventions, security, dependency rules, workflow). [CLAUDE.md](CLAUDE.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md) are symlinks to it; [.cursor/rules/agents.mdc](.cursor/rules/agents.mdc) is a small real file (Cursor's format needs frontmatter) that references it via `@AGENTS.md`.

**Docs:** [docs/development-plan.md](docs/development-plan.md) has the proposed folder structure and a 14-step plan (routing → login → API layer → table → pagination → caching → loading/error polish → offline modal → responsive → accessibility → theme → testing → cleanup), each with what/why/changes/validation. [docs/chats/README.md](docs/chats/README.md) sets a lightweight convention for selected AI conversation exports. [README.md](README.md) and [CHANGELOG.md](CHANGELOG.md) reflect the real current state; version is `0.1.0`.

**Note:** the repo has no commits yet — everything above is on disk but unstaged, since I don't commit without being asked. Let me know if you'd like an initial commit.

**Architecture highlights worth flagging:**
- `/table` won't have a route guard — since login isn't real auth, faking a protected route would be misleading. It's called out explicitly in `AGENTS.md`.
- Pagination state will live in the URL (`/table?page=2`) for predictable, shareable, refresh-safe routing.
- Zod will validate both API responses and `localStorage` cache reads (not just the login form) — one dependency, two trust boundaries covered.
- Theme is deliberately deferred (Step 11) but the plan keeps things theme-friendly now: Tailwind utilities over inline colors, few reusable primitives.

Nothing beyond this foundation was built — no login, no table, no routing yet. Ready for your next instruction (likely Step 1: routing skeleton).

## Prompt 2

> I want to add two project-wide conventions to the AI instructions before we continue.
>
> First, I do not want em dashes used anywhere in project-authored text. Please add this as a clear rule to the shared AI instructions in AGENTS.md.
>
> Do not use the em dash character "—" in README files, documentation, CHANGELOG entries, code comments, JSDoc, commit message suggestions, AI instructions, development plans, or any other text we create for the repository.
>
> Use commas, periods, colons, parentheses, or a normal hyphen instead, depending on the context. Please apply this rule consistently across all AI tools and project documentation.
>
> Second, I want to use Conventional Commits for the project, following the Conventional Commits 1.0.0 specification:
>
> https://www.conventionalcommits.org/en/v1.0.0/
>
> Please add this as a project-wide convention in AGENTS.md and use the official specification as the source of truth when suggesting commit messages.
>
> Whenever we complete a meaningful development step, suggest an appropriate Conventional Commit message for the changes.
>
> Do not create, amend, or push git commits yourself. I will handle all git commits manually.
>
> Your role is only to suggest an appropriate commit message after a logical development step is complete.
>
> Keep commit messages concise, meaningful, and consistent with the actual changes. Use scopes when they provide useful context, but do not force them when they are unnecessary.
>
> Keep the commit history focused around logical changes. If a development step contains unrelated changes, suggest separate commit messages rather than combining unrelated work into one vague message.
>
> Keep the Conventional Commits approach aligned with the project's Semantic Versioning strategy.
>
> Do not create or modify git commits automatically under any circumstances. Only suggest the commit message and let me decide when and how to commit.
>
> Please update the shared AI instructions with these conventions while keeping the AI setup minimal and avoiding duplicated content.

**Actions:**

- Ran `grep -rn "—" --include="*.md" --include="*.mdc" --include="*.ts" --include="*.tsx" . --exclude-dir=node_modules --exclude-dir=.git | wc -l …` (multi-line/long command, trimmed)
- Ran `grep -n "—" AGENTS.md`
- Wrote `AGENTS.md`
- Ran `grep -n "—" README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `grep -n "—" docs/chats/README.md`
- Edited `docs/chats/README.md`
- Ran `grep -n "—" docs/development-plan.md`
- Ran `cat -n docs/development-plan.md`
- Wrote `docs/development-plan.md`
- Ran `grep -rn "—" --include="*.md" --include="*.mdc" --include="*.ts" --include="*.tsx" --include="*.json" . --exclude-dir=node_modules --exclude-dir=.git`
- Ran `npm run format:check 2>&1`
- Edited `CHANGELOG.md`
- Ran `npm run format:check 2>&1 && npm run lint 2>&1 && npm run typecheck 2>&1`
- Ran `git log --oneline -20 2>&1; echo "---"; git status --short 2>&1 | head -30`
- Ran `grep -rn "—" .cursor .github 2>&1`

**Response:**

Now rewriting AGENTS.md wholesale: replacing every em dash with appropriate punctuation, and adding the two new convention sections.

Now let's clean up the em dashes in the other three files: README.md, docs/development-plan.md, and docs/chats/README.md.

Now `docs/chats/README.md`:

Now the largest one, `docs/development-plan.md`. Let me view it in full to fix all instances in context.

That's the intentional literal reference to the character itself in the rule statement, so it's correct. Let's run formatting/lint checks to confirm the docs still pass.

Now let's add an entry to CHANGELOG.md for this documentation update, and check the file first.

Let's run the full validation once more to confirm nothing broke.

Clean. Both conventions are now in `AGENTS.md`, and I've swept every existing doc (README, development plan, chats README) to remove the em dashes I'd originally written, replacing each with a comma, period, colon, or hyphen depending on context. Format/lint/typecheck all still pass.

**Summary of changes:**
- `AGENTS.md`: added a "Writing style for project text" section banning em dashes everywhere in repo-authored text, and a "Commit conventions" section establishing Conventional Commits 1.0.0 (with the official spec as source of truth, type-to-SemVer mapping, and an explicit rule that AI tools only suggest commit messages, never create/amend/push commits).
- Purged em dashes from `README.md`, `docs/development-plan.md`, and `docs/chats/README.md`.
- Added a `CHANGELOG.md` entry documenting both new conventions.

Since the repository has no commits yet, here's a suggested message for the whole current state as the initial commit:

```
chore: scaffold project foundation and AI development conventions

Set up Vite, React, TypeScript (strict), Tailwind CSS v4, ESLint, and Prettier
with dev, build, lint, format, and typecheck scripts. Add react-router-dom,
react-hook-form, zod, and hookform-resolvers as dependencies for upcoming
features. Add AGENTS.md as the shared source of truth for AI-assisted
development, with CLAUDE.md, Cursor rules, and Copilot instructions pointing
to it, including the no-em-dash writing rule and the Conventional Commits
convention. Add the phased development plan, README, and CHANGELOG.
```

From here on, each completed step gets its own focused commit suggestion rather than one bundled message. Let me know if you'd rather split this initial commit differently, otherwise I'll wait for your next instruction.

## Prompt 3

> Step 0 is complete.
>
> Let's continue with the next step in the development plan.
>
> Please read the current development plan and project instructions first, then implement the next planned step only.
>
> Follow the existing architecture, coding standards, security practices, dependency strategy, and documentation conventions. Keep the implementation simple and avoid unnecessary abstractions or dependencies.
>
> Work incrementally and make sure the project remains in a working state after this step.
>
> After completing the step, run the appropriate validation checks, update the development plan to reflect the actual state of the work, and update the README or CHANGELOG only if the changes require it.
>
> Do not move on to the following step.
>
> Do not create, amend, or push any git commits. Only suggest an appropriate Conventional Commit message at the end for me to review and commit manually.
>
> Also remember our project-wide writing convention: never use em dashes in any project-authored text.
>
> When finished, briefly summarize what you changed, the validation results, any important decisions or deviations from the plan, and the suggested commit message.

**Actions:**

- Ran `mkdir -p src/app src/pages`
- Wrote `src/app/routes.ts`
- Wrote `src/pages/LoginPage.tsx`
- Wrote `src/pages/TablePage.tsx`
- Wrote `src/pages/NotFoundPage.tsx`
- Wrote `src/app/router.tsx`
- Wrote `src/App.tsx`
- Edited `src/main.tsx`
- Ran `npm run typecheck 2>&1 && npm run lint 2>&1 && npm run format:check 2>&1 && npm run build 2>&1`
- Ran `rm -rf dist …` (multi-line/long command, trimmed)
- Ran `curl -s http://localhost:5184/src/pages/LoginPage.tsx | head -20 …` (multi-line/long command, trimmed)
- Ran `ps aux | grep -i vite | grep -v grep; npm run build 2>&1 | tail -6; rm -rf dist`
- Edited `docs/development-plan.md`
- Edited `AGENTS.md`
- Ran `grep -n "Project structure" -A 15 README.md`
- Edited `README.md`
- Ran `grep -n "Current status" -A 5 README.md`
- Edited `README.md`
- Ran `git log --oneline -20 2>&1`
- Edited `CHANGELOG.md`
- Ran `npm run format:check 2>&1`
- Ran `grep -rn "—" --include="*.md" --include="*.mdc" --include="*.ts" --include="*.tsx" . --exclude-dir=node_modules --exclude-dir=.git …` (multi-line/long command, trimmed)
- Ran `rm -rf dist; git status --short`

**Response:**

Now let's read `AGENTS.md`'s architecture section and implement Step 1 (routing skeleton). First, let's check current `index.html`/App.tsx state again quickly, then create the files.

Now updating `App.tsx` to render the router, and `main.tsx` to provide `BrowserRouter`.

Now let's run validation: typecheck, lint, format, build.

All clean. Now let's manually verify the routing behavior in a running dev server.

All three pages compile and serve correctly with the expected content and route wiring. Let's confirm the server is stopped and rebuild clean.

Now let's update the development plan to mark Step 1 as done, and update `AGENTS.md`'s architecture section since I made one deviation worth documenting (login lives at `/`, not `/login`).

That's just markdownlint flagging two "### Added" headings under different version sections, which is normal and expected in Keep a Changelog format. Let's run the final validation pass across everything.

Let's do a final sweep for stray em dashes across everything I just touched, then re-run the full validation suite once more.

Everything is clean and scoped tightly to Step 1.

## Summary

**What changed:** Implemented Step 1 (routing skeleton) from the development plan.

- `src/app/routes.ts`: named route path constants (`ROUTES.login = '/'`, `ROUTES.table = '/table'`).
- `src/app/router.tsx`: `<Routes>`/`<Route>` wiring against those constants, plus a catch-all `*` route.
- `src/pages/LoginPage.tsx`, `TablePage.tsx`, `NotFoundPage.tsx`: placeholder pages (no form/table logic yet, that's Steps 2 and 4). `NotFoundPage` links back to `/`.
- `src/main.tsx`: wraps `App` in `BrowserRouter`.
- `src/App.tsx`: now just renders `AppRouter`.
- Updated `docs/development-plan.md` (Step 1 marked Done, with an implementation note), `AGENTS.md` (dropped the now-resolved "`/` or `/login`" ambiguity), `README.md` (current status and project structure), and `CHANGELOG.md` (new Unreleased entry).

**Decision:** Login lives at `/` rather than `/login`, avoiding an unnecessary redirect since the app has no other content at the root. Documented in the plan and `AGENTS.md`.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build` all pass. Manually confirmed via the dev server that `/`, `/table`, and an unknown path each serve the SPA shell and resolve to the correct page component (checked the actual compiled module content for each page, including the `NotFoundPage` link back to login). No em dashes introduced; swept the whole repo to confirm.

**Suggested commit message:**

```
feat(routing): add router skeleton with login, table, and 404 pages

Wire up react-router-dom via BrowserRouter, add named route path
constants in src/app/routes.ts, and add placeholder LoginPage (/),
TablePage (/table), and a catch-all NotFoundPage.
```

Not moving on to Step 2. Let me know when you'd like to continue.

## Prompt 4

> Step 1 is complete.
>
> Let's continue with Step 2 from the development plan.
>
> Please read the plan and project instructions, implement this step only, validate the changes, and update the plan to reflect the actual result.
>
> Keep the implementation simple and follow the existing architecture and conventions.
>
> Do not move on to the next step and do not create or modify any git commits. Only suggest a Conventional Commit message when the step is complete.
>
> Remember not to use em dashes in any project-authored text.

**Actions:**

- Ran `git log --oneline -5; echo ---; git status --short`
- Ran `sed -n '100,125p' docs/development-plan.md`
- Ran `mkdir -p src/features/auth`
- Wrote `src/features/auth/loginSchema.ts`
- Wrote `src/features/auth/LoginForm.tsx`
- Wrote `src/pages/LoginPage.tsx`
- Ran `npm run typecheck 2>&1`
- Ran `npm run lint 2>&1`
- Edited `src/features/auth/LoginForm.tsx`
- Ran `npm run lint 2>&1`
- Ran `npm run format:check 2>&1`
- Ran `npm run build 2>&1`
- Ran `rm -rf dist …` (multi-line/long command, trimmed)
- Ran `which chromium chromium-browser google-chrome 2>&1; npx --yes playwright --version 2>&1 | head -5`
- Ran `npm ls -g playwright 2>&1; find / -maxdepth 6 -iname "playwright" -type d 2>/dev/null | grep -v proc | head -20`
- Ran `timeout 20 google-chrome --headless=new --disable-gpu --no-sandbox --virtual-time-budget=3000 --dump-dom http://localhost:5185/ 2>/dev/null | tr '>' '>\n' | gre …` (multi-line/long command, trimmed)
- Ran `timeout 5 google-chrome --headless=new --disable-gpu --no-sandbox --remote-debugging-port=9333 about:blank > /tmp/chrome.log 2>&1 & …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/cdp-test.mjs`
- Ran `cd /tmp/scratchpad && node cdp-test.mjs 2>&1`
- Ran `nohup google-chrome --headless=new --disable-gpu --no-sandbox --remote-debugging-port=9333 about:blank > /tmp/chrome.log 2>&1 & …` (multi-line/long command, trimmed)
- Ran `cd /tmp/scratchpad && node cdp-test.mjs 2>&1`
- Ran `curl -s "http://localhost:9333/json/new?http://localhost:5185/"`
- Edited `/tmp/scratchpad/cdp-test.mjs`
- Ran `cd /tmp/scratchpad && node cdp-test.mjs 2>&1`
- Ran `pkill -f "remote-debugging-port=9333" 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `ps aux | grep -iE "chrome|vite" | grep -v grep; npm run build 2>&1 | tail -6; rm -rf dist`
- Ran `curl -s -m 2 http://localhost:9333/json/version; echo "exit:$?" …` (multi-line/long command, trimmed)
- Ran `rm -rf dist /tmp/chrome.log …` (multi-line/long command, trimmed)
- Edited `docs/development-plan.md`
- Ran `grep -n "Current status" -A 5 README.md; echo ---; grep -n "Project structure" -A 20 README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `CHANGELOG.md`
- Ran `grep -rln "—" --include="*.md" --include="*.ts" --include="*.tsx" . --exclude-dir=node_modules --exclude-dir=.git …` (multi-line/long command, trimmed)
- Ran `rm -rf dist; git status --short`

**Response:**

Good, clean tree and Step 1 is committed. Let's re-read the plan and current source files relevant to Step 2.

Now let's implement Step 2: the login schema and form.

Now let's run the validation suite.

Lint passes. Now format and build.

All checks pass. Now let's manually exercise the form in a running browser to confirm the actual UX behavior (button disable/enable, error display, navigation on submit).

All behaviors verified end-to-end in a real browser via DevTools Protocol. Let's clean up background processes.

Good: the debug Chrome instance and dev server are both stopped, and the user's normal Chrome windows were untouched. Now let's finalize the docs.

Now let's update the development plan, README, and CHANGELOG to reflect Step 2's completion.

Now the README's current status and project structure sections:

Now the CHANGELOG:

That's the same expected duplicate-heading warning from Keep a Changelog's repeated "### Added" sections. Let's do a final full validation pass and em-dash sweep.

That's only the intentional literal reference in AGENTS.md's own rule statement (already confirmed earlier). Everything passes.

## Summary

**What I built:** Step 2, the login page and its validation.

- `src/features/auth/loginSchema.ts`: a Zod schema requiring `username` and `password` to each be 4 to 30 characters (min/max defined once as named constants, reused in both the schema and the error messages).
- `src/features/auth/LoginForm.tsx`: React Hook Form with `zodResolver`, in `mode: 'onChange'` so `formState.isValid` tracks validity on every keystroke. Labeled inputs with `aria-invalid`/`aria-describedby` wired to `role="alert"` error text. The submit button is `disabled={!isValid}`. On a valid submit it only calls `navigate(ROUTES.table)`, nothing is stored, logged, or persisted.
- `src/pages/LoginPage.tsx`: updated to render `LoginForm` under a heading.

**Validation:** `typecheck`, `lint`, `format:check`, and `build` all pass. I also drove the actual rendered page in headless Chrome over the DevTools protocol (not just static output) and confirmed: the button starts disabled, stays disabled with the length error visible while the username is too short, becomes enabled with the error cleared once both fields are valid, and clicking submit navigates to `/table`. All temporary browser/debug processes were cleaned up afterward; your own Chrome windows were untouched.

**Decisions/notes:** I hit one lint issue worth flagging: `no-floating-promises` fired on the `navigate()` call because `NavigateFunction`'s type includes `Promise<void>` (for view-transition support), even though it's synchronous here. Fixed with `void navigate(...)`, a standard, narrow fix, not a behavior change. No other deviations from the plan. Docs updated: `docs/development-plan.md` (Step 2 marked Done with what was actually verified), `README.md` (current status and project structure), `CHANGELOG.md` (Unreleased entry). No em dashes introduced, confirmed via a repo-wide sweep.

**Suggested commit message:**

```
feat(auth): add login form with client-side validation

Add a Zod schema requiring username and password to be 4 to 30
characters, and a React Hook Form + zodResolver LoginForm that
disables submit until valid and navigates to /table on success.
No authentication is implied or performed.
```

Not moving on to Step 3. Let me know when you'd like to continue.

## Prompt 5

> Step 2 is complete.
>
> Let's continue with the next step in the development plan.
>
> Please read the current plan and project instructions, implement the next step only, validate the changes, and update the plan to reflect the actual result.
>
> Keep the implementation simple and consistent with the existing architecture and conventions. Do not move on to the following step.
>
> Do not create or modify any git commits. Only suggest an appropriate Conventional Commit message when the step is complete.
>
> Do not bump the project version unless the changes represent a meaningful release.
>
> Remember not to use em dashes in any project-authored text.

**Actions:**

- Ran `git log --oneline -5; echo ---; git status --short`
- Ran `sed -n '108,150p' docs/development-plan.md`
- Ran `sed -n '150,175p' docs/development-plan.md`
- Ran `curl -s "https://swapi.py4e.com/api/people/?page=1" | head -c 3000`
- Ran `for p in 1 2 3 4 5 6 7 8 9; do curl -s "https://swapi.py4e.com/api/people/?page=$p"; echo; done | grep -o '"mass":"[^"]*"' | sort -u …` (multi-line/long command, trimmed)
- Ran `curl -sI "https://swapi.py4e.com/api/people/?page=1" | grep -i "access-control"`
- Ran `curl -sI -H "Origin: http://localhost:5185" "https://swapi.py4e.com/api/people/?page=1" | grep -i "access-control\|vary" …` (multi-line/long command, trimmed)
- Ran `mkdir -p src/shared/api src/features/people`
- Wrote `src/shared/api/httpClient.ts`
- Wrote `src/features/people/people.schema.ts`
- Edited `src/features/people/people.schema.ts`
- Wrote `src/features/people/people.types.ts`
- Ran `npm run typecheck 2>&1`
- Ran `npm run lint 2>&1`
- Ran `npm run format:check 2>&1 && npm run build 2>&1`
- Ran `rm -rf dist …` (multi-line/long command, trimmed)
- Ran `nohup google-chrome --headless=new --disable-gpu --no-sandbox --remote-debugging-port=9334 about:blank > /tmp/chrome2.log 2>&1 & …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/cdp-api-test.mjs`
- Ran `cd /tmp/scratchpad && node cdp-api-test.mjs 2>&1`
- Ran `pkill -f "remote-debugging-port=9334" 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `curl -s -m 2 -o /dev/null -w "vite:%{http_code}\n" http://localhost:5186/ 2>&1 …` (multi-line/long command, trimmed)
- Ran `pgrep -af "vite --port 5186"`
- Ran `kill 120430 120431 2>&1 …` (multi-line/long command, trimmed)
- Ran `curl -s -m 2 -o /dev/null -w "vite:%{http_code}\n" http://localhost:5186/ 2>&1; ls /tmp/scratchpad/ 2>&1 …` (multi-line/long command, trimmed)
- Ran `rm -rf dist`
- Edited `docs/development-plan.md`
- Ran `grep -n "Project structure" -A 25 README.md`
- Edited `README.md`
- Edited `CHANGELOG.md`
- Ran `grep -rln "—" --include="*.md" --include="*.ts" --include="*.tsx" . --exclude-dir=node_modules --exclude-dir=.git …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

Clean tree, Step 2 committed. Let's re-read the plan (Step 3) and the current relevant AGENTS.md sections.

Let's check the real SWAPI response shape before writing the schema.

CORS is open (`access-control-allow-origin: *` is present when a browser sends an `Origin` header), so a direct client-side `fetch` will work fine. Now let's implement Step 3.

Now `people.types.ts`:

Now let's run typecheck, lint, format, and build.

Now let's do the manual validation the plan calls for: confirm a real SWAPI request parses successfully, and a malformed response is rejected.

Excellent, all three scenarios confirmed. Let's clean up.

Good, the vite process is gone now (only the current shell's own process shows up), and the temp file is removed. Let's do a final confirmation and re-run the full validation suite.

All clean. Now let's update the development plan, README, and CHANGELOG.

That's the same expected duplicate-heading pattern as before. Let's do a final full validation and em-dash sweep.

That's only the expected literal reference in AGENTS.md's own rule. Let's confirm the diff scope.

## Summary

**What I built:** Step 3, the API layer and types.

- `src/shared/api/httpClient.ts`: a generic `fetchJson(url, signal)`. Sets `Accept`, accepts an `AbortSignal` and lets a genuine `AbortError` propagate unchanged (so a future caller's unmount cleanup can ignore it), and otherwise throws a small `ApiError` (generic message, optional HTTP `status`) on a network failure, a non-OK response, or an unparsable body. Returns `unknown`, so nothing downstream can skip validation.
- `src/features/people/people.schema.ts`: `personSchema` (only `name`, `mass`, `height`, `hair_color`, `skin_color`) and `peopleResponseSchema` (`count`, `next`, `previous`, `results`).
- `src/features/people/people.types.ts`: `Person` and `PeopleResponse`, both `z.infer`'d from those schemas.

Nothing imports these yet (that's Step 4), so there are no UI changes.

**Validation:** `typecheck`, `lint`, `format:check`, and `build` all pass. I also checked the real SWAPI API shape directly before writing the schema (`mass`/`height` are strings, not numbers, and can be `"unknown"` or contain a comma like `"1,358"`, which is why they're kept and typed as plain strings), and confirmed CORS is open for browser fetches. Then, from the running dev app, I dynamically imported both modules in a real browser (headless Chrome, DevTools protocol) and confirmed against the live API: a real request parses successfully and narrows from 16 raw keys to the 5 defined ones, a malformed shape and a response missing a required field are both rejected instead of crashing, and a request for a non-existent person throws `ApiError` with `status: 404`. All temporary browser/dev-server processes were cleaned up afterward.

**Decision worth flagging:** the plan called for "a mapper that narrows the raw response down to the five fields." I didn't add a separate mapper function: `z.object()` already strips any key not listed in the schema on parse, so `personSchema` (via `peopleResponseSchema`) does that narrowing by itself, no extra code needed. Documented in the plan.

**Version:** no bump, this is an internal/infrastructure step with no user-visible change.

**Suggested commit message:**

```
feat(people): add validated API layer for SWAPI people data

Add a generic fetchJson wrapper with AbortSignal support and a typed
ApiError, plus Zod schemas and inferred types for the SWAPI person
and paginated list response, narrowed to the five fields the table
will need. Not wired into any page yet.
```

Not moving on to Step 4. Let me know when you'd like to continue.
