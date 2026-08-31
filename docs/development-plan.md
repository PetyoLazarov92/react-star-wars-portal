# Development Plan

This is a living document. Update the relevant step's status and notes as work happens, don't
leave it describing only the original intent. If a decision changes during implementation, record
what changed and why, right there in that step.

Status legend: `Done` · `In progress` · `Planned`

## Proposed source folder structure

This is the target shape, built up incrementally (a folder appears in the step that first needs
it, nothing here is pre-created speculatively). It's feature-oriented only where a feature
actually has enough of its own logic to justify a folder; everything else stays flat.

```text
src/
  app/
    router.tsx          # <BrowserRouter> + <Routes>, route path constants
  pages/
    LoginPage.tsx        # composes features/auth
    TablePage.tsx        # composes features/people
    NotFoundPage.tsx
  features/
    auth/
      LoginForm.tsx
      loginSchema.ts      # Zod schema (username/password rules) + inferred type
    people/
      PeopleTable.tsx
      Pagination.tsx
      usePeople.ts         # fetch + cache + pagination state for the people list
      people.schema.ts      # Zod schemas for the SWAPI person + list response
      people.types.ts        # types derived from the schemas, mapped UI-facing Person type
  shared/
    api/
      httpClient.ts          # fetch wrapper: base URL, AbortController, typed errors
    cache/
      localStorageCache.ts    # get/set with TTL + Zod-validated read
    hooks/
      useOnlineStatus.ts       # navigator.onLine + online/offline events
    components/
      Modal.tsx                 # accessible dialog primitive (used by the offline modal)
      Spinner.tsx
      ErrorMessage.tsx
  App.tsx
  main.tsx
  index.css
```

Notes:

- `shared/` only holds code used by more than one feature, or generic enough that it never
  belongs to one (the HTTP client, the cache helper, generic UI primitives). If something in
  `features/people` turns out to be reusable later, it moves to `shared/` at that point, not
  before.
- No global state library and no `store/` folder: `usePeople` owns its own state locally; the
  login form owns its own state locally. Nothing here needs cross-tree shared state.
- No `tailwind.config.js` unless a real customization need shows up. Tailwind v4 is configured
  in `src/index.css` via `@import 'tailwindcss'` and the `@tailwindcss/vite` plugin.

## Steps

### Step 0: Repository & project foundation

**Status:** Done

**What:** Vite + React + TypeScript (strict) scaffold; Tailwind CSS v4 wired in; ESLint (flat
config, with `typescript-eslint`, `react-hooks`, `react-refresh`, `jsx-a11y`) + Prettier;
`npm run dev|build|preview|lint|lint:fix|format|format:check|typecheck` scripts; `AGENTS.md` as
the shared AI-instructions source of truth with `CLAUDE.md` / `.cursor/rules/agents.mdc` /
`.github/copilot-instructions.md` pointing to it; this development plan; `README.md`;
`CHANGELOG.md`; SemVer starting at `0.1.0`.

**Why now:** Everything else builds on this. Getting linting, formatting, strict types, and the
AI instructions right before any feature code exists means every following step starts from a
consistent baseline instead of retrofitting standards later.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass on a clean `npm install`; `npm run dev` serves a placeholder page styled with Tailwind.

---

### Step 1: Routing skeleton

**Status:** Done

**What:** Wired `react-router-dom` (already installed in Step 0); added `src/app/routes.ts` with
named route path constants (`ROUTES.login`, `ROUTES.table`) and `src/app/router.tsx` rendering
`<Routes>`/`<Route>` against them; added placeholder `LoginPage`, `TablePage`, and a catch-all
`NotFoundPage` under `src/pages/`; `BrowserRouter` wraps `App` in `main.tsx`, and `App.tsx` renders
`AppRouter`.

**Why now:** Routing is structural: login and table both need a real page/URL to exist before
either feature has somewhere to live. Doing it first also lets us decide the URL shape for
pagination (`/table?page=n`) before the table exists, instead of retrofitting it.

**Changes:** `src/app/routes.ts`, `src/app/router.tsx`, `src/pages/LoginPage.tsx`,
`src/pages/TablePage.tsx`, `src/pages/NotFoundPage.tsx`, `src/App.tsx`, `src/main.tsx`.

**Decision:** The login page is served at `/` (not `/login`), so `ROUTES.login = '/'`, matching
the "or `/login`" alternative already noted in `AGENTS.md` and keeping a single, simple entry
route instead of an extra redirect from `/` to `/login`.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Verified with the dev server that `/`, `/table`, and an unknown path each serve the app
shell and resolve to the correct page component (login, table, and 404 with a link back to
login, respectively).

---

### Step 2: Login page & validation

**Status:** Done

**What:** `features/auth/loginSchema.ts` (Zod: username and password both required, 4 to 30
characters, with the min/max values named as constants and reused in the error messages) and
`features/auth/LoginForm.tsx` (React Hook Form in `mode: 'onChange'` with `zodResolver`, so
`formState.isValid` updates on every keystroke). The submit button is disabled while the form is
invalid; on valid submit, `navigate(ROUTES.table)` runs and nothing else. No fake authentication,
no token, no stored session, no protected-route check on `/table`, and neither field's value is
persisted anywhere. `LoginPage.tsx` now renders `LoginForm` under a heading.

**Why now:** It's the app's entry point and the smallest fully-isolated feature (no external API
dependency), so it's a good first real feature to validate the RHF, Zod, and Tailwind pattern the
rest of the app will reuse.

**Changes:** `src/features/auth/loginSchema.ts`, `src/features/auth/LoginForm.tsx`,
`src/pages/LoginPage.tsx` updated to render `LoginForm`.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Manually exercised in a real browser (headless Chrome, driven directly over the DevTools
protocol so the checks reflect actual rendered and interactive behavior, not just static output):
the submit button starts disabled, stays disabled and shows the length error while the username is
too short, becomes enabled once both fields are 4 to 30 characters with the error cleared, and
clicking submit while valid navigates to `/table`.

---

### Step 3: API layer & types

**Status:** Planned

**What:** `shared/api/httpClient.ts` (fetch wrapper: builds the URL, sets `Accept`, supports
`AbortController`, throws a small typed `ApiError` on non-OK responses or network failure).
`features/people/people.schema.ts`: Zod schemas for a single SWAPI person and the paginated list
response (`count`/`next`/`previous`/`results`), and a mapper that narrows the raw response down to
the five fields the UI needs (`name`, `mass`, `height`, `hair_color`, `skin_color`). Types are
derived from the schemas with `z.infer`, not hand-written separately.

**Why now:** Establishing validated, typed API access before building the table means the table
component only ever deals with clean, trusted data: the messy/untrusted parts (network errors,
unexpected API shapes) are handled once, at the boundary.

**Changes:** `shared/api/httpClient.ts`, `features/people/people.schema.ts`,
`features/people/people.types.ts`.

**Validation:** A temporary manual check (e.g. a console call during development) confirms a real
request against `https://swapi.py4e.com/api/people` parses successfully and a malformed/mocked
response is rejected by the schema instead of crashing; `typecheck`/`lint`/`build` pass. No UI
changes yet.

---

### Step 4: Table page (basic)

**Status:** Planned

**What:** `features/people/usePeople.ts` (fetches page 1 via the Step 3 client/schema) and
`features/people/PeopleTable.tsx` rendering name/mass/height/hair color/skin color in a semantic
`<table>`. Minimal loading and error states only (spinner / plain error message): they get
refined in Step 7 once caching and pagination exist.

**Why now:** Ship the core "see real data on screen" milestone before layering pagination and
caching on top of it, so each later step adds one concern at a time to something already working.

**Changes:** `features/people/usePeople.ts`, `features/people/PeopleTable.tsx`,
`pages/TablePage.tsx` updated to render it.

**Validation:** `/table` shows real SWAPI data in the browser; a simulated failure (e.g. temporary
bad URL) shows the error state instead of a crash; `typecheck`/`lint`/`build` pass.

---

### Step 5: Pagination

**Status:** Planned

**What:** `features/people/Pagination.tsx`; `usePeople` takes a validated page number (from the
`?page=` URL search param, parsed with Zod, defaulting to `1` if missing/invalid) and fetches the
matching SWAPI page. Next/previous controls update the URL via `navigate`.

**Why now:** Natural next layer on top of a working single-page table; keeping the page number in
the URL (rather than only in component state) is what makes routing "predictable": refresh,
back/forward, and sharing a link to page 3 all keep working.

**Changes:** `features/people/Pagination.tsx`, `usePeople.ts` updated, `TablePage.tsx` updated.

**Validation:** Manual test: next/previous disable at the first/last page, browser back/forward
moves between pages correctly, reloading on `/table?page=2` shows page 2 directly, an invalid
`?page=` value falls back to page 1 without crashing.

---

### Step 6: localStorage caching & cache validation

**Status:** Planned

**What:** `shared/cache/localStorageCache.ts`, a small `get`/`set` helper keyed per page (e.g.
`swapi:people:page:2`), storing `{ data, fetchedAt }`. Reads are validated against the Step 3 Zod
schema and checked against a TTL before being trusted; anything invalid, expired, or unparsable is
treated as a cache miss (never thrown as an error to the user). `usePeople` checks the cache
before hitting the network.

**Why now:** Caching only makes sense once there's real paginated data to cache, and validating it
is the direct, low-cost application of the schemas already built in Step 3, no new dependency
needed.

**Changes:** `shared/cache/localStorageCache.ts`, `usePeople.ts` updated to read/write it.

**Validation:** Manual test: revisiting a previously-loaded page shows data instantly from cache;
clearing/corrupting the relevant `localStorage` key still loads correctly from the network instead
of erroring; waiting past the TTL triggers a fresh fetch.

---

### Step 7: Loading & error states (polish)

**Status:** Planned

**What:** Consolidate `usePeople`'s state into one discriminated union covering all real
combinations now that both cache and network are in play (e.g. showing cached data immediately
while a background revalidation is in flight, vs. a true first-load spinner, vs. a network error
with cached data still available to fall back on). Clear, non-technical user-facing error copy.

**Why now:** Steps 4 to 6 introduced multiple overlapping sources of "loading"/"error" (network
vs. cache); this step is where that gets unified into one coherent state machine instead of ad hoc
flags accumulating across steps.

**Changes:** `usePeople.ts` refactored; `PeopleTable.tsx` updated to reflect the fuller set of
states.

**Validation:** Manual test of each state (cold load, cached load, background revalidation,
network failure with and without a cached fallback); `typecheck`/`lint`/`build` pass.

---

### Step 8: Offline detection & modal

**Status:** Planned

**What:** `shared/hooks/useOnlineStatus.ts` (wraps `navigator.onLine` + `online`/`offline`
events); `shared/components/Modal.tsx` (accessible dialog: focus trap, `Escape` to close, returns
focus on close); an offline-specific modal with a simple illustration, shown when the app detects
it's offline (or a fetch fails for network reasons while online status hasn't updated yet).

**Why now:** Depends on the table's fetch flow already existing (Steps 4 to 7) so there's a real
network failure mode to react to; the accessible `Modal` primitive built here is also reusable if
the project ever needs another dialog.

**Changes:** `shared/hooks/useOnlineStatus.ts`, `shared/components/Modal.tsx`, wiring into
`TablePage.tsx` (or `App.tsx` if it should be app-wide).

**Validation:** Manually toggle the browser's offline mode (devtools): modal appears/dismisses
correctly, is keyboard-operable, and doesn't trap focus incorrectly; back online, the table
recovers.

---

### Step 9: Responsive styling pass

**Status:** Planned

**What:** Review both pages at mobile/tablet/desktop widths; fix any overflow, cramped touch
targets, or awkward table wrapping (e.g. horizontal scroll container for the table on narrow
screens rather than squeezing columns unreadably).

**Why now:** Easiest to do once all the real content and states exist; polishing layout before
that would mean redoing it.

**Changes:** Tailwind class adjustments across existing components; no new files expected.

**Validation:** Manual check across a few breakpoints (e.g. 360px, 768px, 1280px) in the browser.

---

### Step 10: Accessibility pass

**Status:** Planned

**What:** Full keyboard-only pass over both pages; verify labels/`aria-describedby` on the form,
table semantics, focus order, visible focus states, and color contrast; address anything
`eslint-plugin-jsx-a11y` and manual testing surface.

**Why now:** Same reasoning as the responsive pass: verify against the finished UI rather than a
moving target, though the accessibility _requirements_ in `AGENTS.md` apply from Step 1 onward.

**Changes:** Targeted fixes across existing components.

**Validation:** Full keyboard-only walkthrough of login, table, pagination, and the offline modal;
`npm run lint` (jsx-a11y rules) passes.

---

### Step 11: Light & dark theme

**Status:** Planned

**What:** Add Tailwind's `dark:` variant support (class-based, toggled by a small
`useTheme`/localStorage-persisted preference, defaulting to the user's OS preference) and apply it
across the existing components.

**Why now:** Deliberately last-but-two: the architecture (Tailwind utility classes, a small set of
reusable primitives, no inline colors) was kept theme-friendly from Step 0 onward specifically so
this step is additive, going through already-finished components once, rather than threading
theme concerns through every step above.

**Changes:** `src/index.css` (dark variant setup), theme toggle + persistence, `dark:` classes
across components.

**Validation:** Manual check of both themes on both pages, including the modal; OS-level
preference is respected by default; the toggle persists across a reload.

---

### Step 12: Testing

**Status:** Planned

**What:** Add Vitest + React Testing Library (the natural fit for a Vite project, minimal setup).
Cover the logic that's actually risky to get wrong: `loginSchema` validation boundaries,
`localStorageCache` (TTL expiry, corrupted/invalid data handling), the `?page=` parsing helper,
and a smoke test of `LoginForm`'s enable/disable behavior.

**Why now:** By this point the logic worth testing actually exists and has stabilized; adding a
test stack earlier would mean testing code that's still being reshaped step to step.

**Changes:** `vitest.config.ts` (or Vite test config block), `*.test.ts(x)` files next to the code
they cover, `npm test` script.

**Validation:** `npm test` passes; the suite fails meaningfully if a boundary condition (e.g. a
3- or 31-character password) is broken.

---

### Step 13: Final cleanup & 1.0 readiness

**Status:** Planned

**What:** Full re-read of `AGENTS.md`, `README.md`, and this plan against what was actually built;
remove any dead code or leftover placeholders; final lint/format/typecheck/build pass; review the
`CHANGELOG.md` history and cut a `1.0.0` release if the planned scope is complete and stable.

**Why now:** Closing step: confirms documentation matches reality before calling the project
"done" for its initial scope.

**Validation:** Clean checkout, `npm install`, `npm run build` succeeds; `npm run lint`,
`npm run typecheck`, `npm test` all pass; README setup instructions followed literally, from
scratch, actually work.
