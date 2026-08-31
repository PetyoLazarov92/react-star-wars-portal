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

**Status:** Done

**What:** `shared/api/httpClient.ts`: a generic `fetchJson(url, signal)` that sets `Accept`,
accepts an `AbortSignal`, lets a real `AbortError` propagate unchanged (so a caller's cleanup logic
can ignore it), and otherwise throws a small `ApiError` (a generic message plus an HTTP `status`
when there is one) on a network failure, a non-OK response, or a body that isn't valid JSON. It
returns `unknown`, so every caller has to validate the shape before use.
`features/people/people.schema.ts`: `personSchema` (only `name`, `mass`, `height`, `hair_color`,
`skin_color`) and `peopleResponseSchema` (`count`, `next`, `previous`, `results`).
`features/people/people.types.ts`: `Person` and `PeopleResponse`, both `z.infer` from those
schemas.

**Why now:** Establishing validated, typed API access before building the table means the table
component only ever deals with clean, trusted data: the messy/untrusted parts (network errors,
unexpected API shapes) are handled once, at the boundary.

**Changes:** `src/shared/api/httpClient.ts`, `src/features/people/people.schema.ts`,
`src/features/people/people.types.ts`.

**Decision:** The plan called for "a mapper that narrows the raw response down to the five fields
the UI needs." A separate mapper function turned out to be unnecessary: `z.object()` already drops
any key that isn't listed in the schema when it parses, so `personSchema.parse(...)` (via
`peopleResponseSchema`) does the narrowing by itself. Confirmed while testing this step: a raw
SWAPI person has 16 keys, the parsed result has exactly the 5 defined here. Also worth noting for
Step 4 and onward: SWAPI's `mass` and `height` are plain strings, not numbers, and can be
`"unknown"` or contain a comma (e.g. `"1,358"`), so they are typed and rendered as strings rather
than parsed into numbers.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass (these two files aren't imported anywhere yet, so the build output is otherwise
unchanged). Manually verified from the running dev app (dynamically importing both modules in the
browser console, against the real API, over the DevTools protocol): a real request to
`https://swapi.py4e.com/api/people/?page=1` parses successfully and is narrowed from 16 raw keys
to the 5 expected ones; a malformed shape (wrong types) and a response missing a required field
are both rejected by the schema instead of crashing; requesting a non-existent person correctly
throws an `ApiError` with `status: 404` and a generic message.

---

### Step 4: Table page (basic)

**Status:** Done

**What:** `features/people/usePeople.ts`: a hook that fetches page 1 via the Step 3
`fetchJson`/`peopleResponseSchema`, holding state as a discriminated union
(`loading` / `success` / `error`) and cleaning up with `AbortController` on unmount. A real
`AbortError` is swallowed (no state update on an unmounted/re-run effect); any other failure
(network error, non-OK response, or a response that fails schema validation) sets a single
generic, non-technical error message, never the raw error. `features/people/PeopleTable.tsx`
renders name/mass/height/hair color/skin color in a semantic `<table>` with `scope="col"`
headers, plus a `role="status"` loading line and a `role="alert"` error line. `pages/TablePage.tsx`
now renders it under a heading.

**Why now:** Ship the core "see real data on screen" milestone before layering pagination and
caching on top of it, so each later step adds one concern at a time to something already working.

**Changes:** `features/people/usePeople.ts`, `features/people/PeopleTable.tsx`,
`pages/TablePage.tsx` updated to render it.

**Decision:** An initial explicit `setState({ status: 'loading' })` call at the top of the effect
tripped the `react-hooks/set-state-in-effect` ESLint rule (setState called synchronously within an
effect body). It was also redundant: `useState`'s initial value is already `{ status: 'loading' }`,
and the effect only re-runs when the component mounts, so the line was removed rather than the
rule suppressed.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Manually exercised against the real API in headless Chrome (driven directly over the
DevTools protocol): `/table` renders the real SWAPI page-1 rows (10 characters, headers Name,
Mass, Height, Hair color, Skin color; first row `Luke Skywalker / 77 / 172 / blond / fair`) with no
console errors. A simulated failure (blocking requests to the SWAPI host at the network layer,
then reloading) shows the `role="alert"` error message ("Unable to load Star Wars characters right
now. Please try again later.") instead of a crash or a leaked technical error.

---

### Step 5: Pagination

**Status:** Done

**What:** `features/people/Pagination.tsx`: a `<nav aria-label="Pagination">` with Previous/Next
buttons and a "Page N" label, taking `page`, `hasNext`, `hasPrevious`, `onPrevious`, and `onNext`
as props. `usePeople` now takes a `page: number` argument, builds the SWAPI request URL with
`URL`/`searchParams.set` (never string-interpolating the page value), re-fetches whenever `page`
changes, and reports `hasNext`/`hasPrevious` on its success state directly from SWAPI's own
`next`/`previous` response fields (both `string | null`), rather than computing them from `count`
and a hardcoded page size. `TablePage.tsx` reads and validates the `?page=` search param with Zod
(`z.coerce.number().int().positive()`, falling back to `1` on a missing or invalid value), owns
the single `usePeople(page)` call, and passes the resulting state down to `PeopleTable` (now a
prop-driven, presentational component) and to `Pagination`; the Previous/Next handlers update the
URL via `setSearchParams`.

**Why now:** Natural next layer on top of a working single-page table; keeping the page number in
the URL (rather than only in component state) is what makes routing "predictable": refresh,
back/forward, and sharing a link to page 3 all keep working.

**Changes:** `features/people/Pagination.tsx` (new), `usePeople.ts` updated, `TablePage.tsx`
updated, and `PeopleTable.tsx` updated (see decision below; not originally planned for this step).

**Decision:** The original plan didn't list `PeopleTable.tsx` as a change for this step. In
practice, `Pagination` needs `hasNext`/`hasPrevious`, which only exist after `usePeople` resolves,
and `Pagination` is rendered as a sibling of `PeopleTable`, not a child of it. Calling `usePeople`
independently in two sibling components would have meant two competing fetches for the same data.
Instead, `TablePage` now makes the single `usePeople(page)` call and passes the resulting
`PeopleState` down as a prop to both `PeopleTable` (which lost its internal `usePeople()` call and
became presentational) and `Pagination`, so the fetched state has exactly one owner.

Separately, resetting `usePeople`'s state to `{ status: 'loading' }` when `page` changes could not
be done with a synchronous `setState` call at the top of the effect body: `eslint-plugin-react-hooks`'s
`set-state-in-effect` rule flags that pattern (it also flagged the analogous, redundant call removed
in Step 4). The fix is the pattern React's own docs describe for "adjusting state when a prop
changes": track the last-requested page in its own `useState`, and when the incoming `page` prop
no longer matches it, call `setState` conditionally during render (not inside the effect) to reset
to `loading` before the effect re-fetches.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Manually exercised against the real API in headless Chrome (driven directly over the
DevTools protocol): loading `/table` shows page 1 with Previous disabled; clicking Next updates the
URL to `?page=2`, shows page 2's data (first row `Anakin Skywalker`), and enables Previous;
reloading directly on `/table?page=2` shows page 2 immediately; navigating to the real last page
(`?page=9`, from SWAPI's `count: 87` at 10 results per page) shows Next disabled; an invalid
`?page=abc` value falls back to page 1 instead of crashing; browser back/forward after two Next
clicks moves `/table` -> `?page=2` -> `?page=3` -> back to `?page=2` -> back to `/table` -> forward
to `?page=2` correctly.

---

### Step 6: localStorage caching & cache validation

**Status:** Done

**What:** `shared/cache/localStorageCache.ts`: a generic `getCached(key, dataSchema, ttlMs)` /
`setCached(key, data)` pair. `getCached` reads the raw string, parses it as JSON, validates it
against `z.object({ data: dataSchema, fetchedAt: z.number() })` (the caller's own data schema
nested inside a small envelope), and checks `fetchedAt` against the given TTL; a missing key,
unparsable JSON, a shape that fails validation, or an expired `fetchedAt` are all treated the same
way, as a plain cache miss (`null`), never thrown. `setCached` writes the same envelope and
swallows any write failure (e.g. a full or disabled store) since caching is best-effort and must
never break the page. `usePeople` now caches per page under the key `swapi:people:page:<page>`,
storing the full Step 3 `peopleResponseSchema`-shaped object (so `next`/`previous` are cached
too, not just the narrowed `results`), with a five-minute TTL. On mount and on every page change,
it checks the cache first (both in the lazy `useState` initializer and in the page-change
comparison already used for resetting to `loading`, so a cache hit never shows a loading flash) and
only runs the network fetch when there is a miss; a successful network fetch writes the cache
before updating state.

**Why now:** Caching only makes sense once there's real paginated data to cache, and validating it
is the direct, low-cost application of the schemas already built in Step 3, no new dependency
needed.

**Changes:** `shared/cache/localStorageCache.ts` (new), `usePeople.ts` updated to read/write it.

**Decision:** The cache check could not be placed inside the effect's synchronous body in the
"check cache, else fetch" order originally imagined, for the same `set-state-in-effect` reason
recorded in Step 5: a cache hit would have meant calling `setState` synchronously at the top of the
effect. Instead, the cache is read in two places that already run outside the effect: the `useState`
lazy initializer (for the very first render) and the render-time `page !== requestedPage` check
already added in Step 5 to reset state on a page change. The effect itself only ever calls
`getCached` to decide whether to skip fetching. `setState` inside the effect is called exclusively
from the `fetchJson(...).then(...)`/`.catch(...)` callbacks, same as before.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Manually exercised against the real API in headless Chrome (driven directly over the
DevTools protocol): a fresh load of `/table` writes a `swapi:people:page:1` entry to
`localStorage`; reloading with the SWAPI host blocked at the network layer still renders instantly
from that cache entry; overwriting the entry with invalid JSON, and separately with valid JSON that
fails schema validation, both still load correctly from the network on reload rather than erroring;
an entry with `fetchedAt` set ten minutes in the past (past the five-minute TTL), combined with the
network blocked, correctly shows the error state instead of serving the stale data, proving expired
entries are treated as a real miss; the same expired entry with the network available triggers a
fresh fetch and a newer `fetchedAt` is written back.

---

### Step 7: Loading & error states (polish)

**Status:** Done

**What:** `usePeople`'s `error` state now carries an optional `stale` field
(`{ people, hasNext, hasPrevious }`): when a network fetch fails, the hook also looks for any
previously cached entry for that page, ignoring its TTL, and attaches it if one exists. A shared
`PeopleData` interface (`people`/`hasNext`/`hasPrevious`) removes the duplication that would
otherwise exist between the `success` and `error.stale` shapes. `shared/cache/localStorageCache.ts`
gained `getStale(key, dataSchema)`, sharing its envelope-reading and validation logic with
`getCached` via a private `readEntry` helper, but skipping the TTL check, for this exact fallback
use case. `PeopleTable.tsx` now renders the table markup through an internal `PeopleDataTable`
component reused by both the `success` case and the `error` case when `state.stale` is present (the
latter shown below the `role="alert"` message, with a plain-language note: "Showing previously
loaded data, which may be out of date."). `TablePage.tsx` now shows `Pagination` whenever there is
page data to paginate, whether from `success` or from an `error`'s `stale` fallback, driven by a
shared `pageData` value instead of only checking `state.status === 'success'`.

**Why now:** Steps 4 to 6 already converged on a single, clean discriminated union and a
render-time reset pattern (recorded in the Step 5 and Step 6 decisions), so the "ad hoc flags"
problem this step was originally scoped to prevent had not actually materialized. The real gap left
by Step 6 was behavioral: an expired cache entry was already being treated as a plain miss by
`getCached`, so a fetch failure right after expiry showed a blank error and discarded data that was
still sitting in `localStorage` and still useful to show.

**Changes:** `shared/cache/localStorageCache.ts` (`getStale` added, `readEntry` extracted),
`usePeople.ts` (`PeopleData` interface, `error.stale`, `readStale`), `PeopleTable.tsx`
(`PeopleDataTable` extracted, error case renders it when `stale` is present), `TablePage.tsx`
(`pageData` drives `Pagination` visibility for both `success` and stale-fallback `error`).

**Decision:** The plan's parenthetical example of "showing cached data immediately while a
background revalidation is in flight" (stale-while-revalidate) was deliberately not implemented.
Step 6 already chose a simpler TTL model (a cache hit is served as-is until it expires, no
background refresh), and adding true background revalidation on top would mean a second concurrent
fetch path and a new "revalidating" state, more complexity than the app's scope justifies. The two
combinations that do actually occur with the existing TTL model, a true first-load spinner (no
cache to show yet) and a network error with a stale cache entry to fall back on, are what got
modeled instead.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Manually exercised against the real API in headless Chrome (driven directly over the
DevTools protocol): a fresh `/table` load shows the real page-1 data with a `swapi:people:page:1`
entry written to `localStorage` and no console errors; clearing `localStorage` and reloading
exercises the true first-load spinner path before data replaces it; rewriting that entry's
`fetchedAt` to 15 minutes in the past (past the TTL) and blocking network access to the SWAPI host,
then reloading, shows the `role="alert"` error message together with the stale page-1 table, the
"Showing previously loaded data, which may be out of date." note, and a pagination nav correctly
reflecting the stale entry's `hasPrevious: false` / `hasNext: true`; clearing `localStorage`
entirely with the network still blocked and reloading shows only the error message, with no table
and no pagination underneath it.

---

### Step 8: Offline detection & modal

**Status:** Done

**What:** `shared/hooks/useOnlineStatus.ts`: a hook wrapping `navigator.onLine`, kept in sync via
the `online`/`offline` window events (added/removed in a `useEffect`). `shared/components/Modal.tsx`:
a generic, controlled (`open`/`title`/`onClose`/`children`) dialog built on the native `<dialog>`
element (`showModal()`/`close()` driven by the `open` prop), per the "reach for `<dialog>` before
hand-rolling one" guidance in `AGENTS.md`: it gets an accessible name via `aria-labelledby`, a focus
trap, Escape-to-close, and focus restored to whatever had focus before it opened, all as native
browser behavior, plus an explicit close (×) button as a pointer/non-Escape alternative.
`app/OfflineModal.tsx`: composes the hook and the primitive into the offline-specific modal (title
"You're offline", a small inline SVG illustration, and a plain-language explanation), shown
whenever `useOnlineStatus()` is `false`. Dismissing it (Escape or the close button) keeps it hidden
for the rest of that offline period, but it re-arms as soon as the connection returns, so it shows
again the next time the connection actually drops rather than being permanently silenced by one
dismissal. `App.tsx` renders `<OfflineModal />` alongside `<AppRouter />`, so it's app-wide rather
than tied to `/table`.

**Why now:** Depends on the table's fetch flow already existing (Steps 4 to 7) so there's a real
network failure mode to react to; the accessible `Modal` primitive built here is also reusable if
the project ever needs another dialog.

**Changes:** `shared/hooks/useOnlineStatus.ts` (new), `shared/components/Modal.tsx` (new),
`app/OfflineModal.tsx` (new, not originally named in the plan, see decision below), `App.tsx`
updated to render it.

**Decision:** The plan named `TablePage.tsx` or `App.tsx` as the two candidate wiring points and
left the offline-specific modal itself unnamed as a file. App-wide won out: connectivity is a
device-level condition, not something specific to the people table, so wiring it once at `App.tsx`
covers every current and future route without per-page duplication. The offline-specific modal
(illustration, copy, and the dismiss/re-arm behavior) was split into its own `app/OfflineModal.tsx`
rather than inlined into `App.tsx`, keeping `App.tsx` a thin shell and `Modal.tsx` a fully generic
primitive with no offline-specific knowledge in it.

The plan's parenthetical "or a fetch fails for network reasons while online status hasn't updated
yet" was deliberately not wired up: `usePeople`'s own error state (Step 7) already gives a network
failure a specific, inline treatment for that feature, including a stale-data fallback when one
exists. Also opening a blocking app-wide modal on top of that would fight with, rather than
complement, an inline experience that's often already showing useful stale data underneath;
`navigator.onLine` plus the `online`/`offline` events remains the modal's only trigger.

For re-arming the dismissal once back online, the render-time "adjust state when a prop changes"
pattern already used in `usePeople` (Steps 5 and 6) was reused here too: comparing the current
`isOnline` value against the last-seen one during render and resetting `dismissed` there, rather
than in a `useEffect`, keeps the same convention instead of introducing a different way to react to
a changing value.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Manually exercised in headless Chrome (driven directly over the DevTools protocol, since
the harness has no real network to disconnect): overriding `navigator.onLine` to `false` and
dispatching a synthetic `offline` event opens the dialog with the accessible name "You're offline",
the illustration, and the explanatory text, with no console errors; before dismissing it, the
focused element (the close button) is inside the dialog, confirming the native focus trap; a real
Escape keypress closes it via the native `cancel`/`close` behavior; while still offline, it stays
dismissed and does not reappear on its own; flipping back to online (and dispatching `online`)
keeps it hidden; going offline again afterward makes it reappear, confirming the dismissal resets on
reconnect; the close (×) button closes it as an alternative to Escape.

**Follow-up fix:** After this step shipped, the modal was reported appearing pinned to the top-right
corner instead of centered. Cause: Tailwind's preflight resets `margin: 0` on all elements
(`shared/components/Modal.tsx` is a `<dialog>`), and that author-origin rule overrides the browser's
built-in `dialog:modal { margin: auto }` centering, regardless of selector specificity, because
author rules beat user-agent rules in the cascade. The native `position: fixed; inset: 0` for a
modal dialog was untouched by preflight, so adding the `m-auto` Tailwind utility to the `<dialog>`
element's `className` was enough to restore centering, both horizontally and vertically, with no
other behavior, accessibility, or styling changes. Verified in headless Chrome: the dialog's
computed margins resolve to exact centering in the viewport, and the backdrop still covers it fully.

---

### Step 9: Responsive styling pass

**Status:** Done

**What:** Audited `/`, `/table`, and the offline modal at 360px, 768px, and 1280px widths in a real
browser before making any change, to fix actual problems rather than guess at them. Most of the
app was already fine: the table's horizontal-scroll container (built in Step 4) already keeps a
wide table from ever overflowing the page body, and neither page showed page-level horizontal
overflow at any width. Two real issues turned up and were fixed:

- The offline modal (`shared/components/Modal.tsx`) touched both viewport edges with zero side
  margin at 360px: its `max-w-sm` class is only an upper bound, and the browser's shrink-to-fit
  width algorithm for the unconstrained `<dialog>` filled the entire viewport once the content's
  preferred width (driven by the paragraph text) exceeded 360px, leaving `margin: auto` nothing to
  distribute. Replaced `max-w-sm` with `w-[min(24rem,calc(100%-2rem))]`, which guarantees at least
  1rem (16px) of margin on each side while still capping the modal at 24rem (384px, the same value
  `max-w-sm` used) on wider screens.
- The modal's close ("&times;") button had an approximately 11.5 by 20 pixel hit area, well under
  the roughly 44 by 44 pixel touch-target guideline, since it was just the glyph's own inline box
  with no padding. Fixed with `flex min-h-11 min-w-11 shrink-0 items-center justify-center`
  (Tailwind's `11` spacing step is `2.75rem`, i.e. 44px), and the header row's alignment changed
  from `items-start` to `items-center` so it still looks balanced next to the now-taller button.

The plan's other named concern, "cramped touch targets," was addressed for the remaining
interactive controls too, even though the page-level overflow they were originally grouped with
was already fine: the Pagination Previous/Next buttons and the login form's inputs and submit
button were about 40 to 42px tall (`py-2`); bumped to `py-2.5` plus an explicit `min-h-11` so they
comfortably clear the 44px guideline instead of sitting just under it.

**Why now:** Easiest to do once all the real content and states exist; polishing layout before
that would mean redoing it.

**Changes:** `shared/components/Modal.tsx` (width and close-button sizing), `Pagination.tsx` and
`LoginForm.tsx` (button/input touch-target sizing). No new files.

**Decision:** No changes were made purely to hit a number when nothing was actually broken. The
Pagination and login control heights were a soft, minor shortfall (2 to 4px) rather than something
a real user would call "cramped," but the plan's own wording for this step explicitly calls out
"cramped touch targets" as in scope, so the small, low-risk padding adjustment was made rather than
left as a borderline case.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`
all pass. Audited and re-verified in headless Chrome (driven directly over the DevTools protocol) at
360px, 768px, and 1280px widths: no page-level horizontal overflow on `/` or `/table` at any width
(`document.documentElement.scrollWidth` equals the viewport width in every case); the offline modal
keeps roughly 19px of margin on each side at 360px and is exactly centered at 768px and 1280px
(`(768-384)/2 = 192`, `(1280-384)/2 = 448`); the close button measures 44 by 44px at all three
widths; the Pagination buttons measure 46px tall and the login inputs/submit button measure 44 to
46px tall, all at every width tested; no console errors anywhere.

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
