# Phase 2 Development Plan: UI/UX and Structure Improvements

This is a living document, same as [`docs/development-plan.md`](development-plan.md) (Phase 1,
closed at `1.0.0`). It picks up from there: a user-driven pass to add a proper header and footer,
a fuller theme system, a lightweight login/session experience, protected routes, toast
notifications, static content pages, a client-side unit selector for the people table, and an
overall modern Material Design-inspired visual polish across the whole app. Update the relevant
step's status and notes as work happens, don't leave it describing only the original intent.

Status legend: `Done` · `In progress` · `Planned`

## Versioning for this phase

Unlike Phase 1 (which batched everything up to one `1.0.0` release), each step in this phase gets
its own version bump as soon as it ships, sized by ordinary SemVer rules: a step that only adds a
backward-compatible feature is a minor bump, a pure fix is a patch bump, and a breaking change
would be a major bump (none are expected in this phase). `package.json` / `package-lock.json` and
`CHANGELOG.md` are updated in the same change as the step itself, not batched for later.

## Design direction

Every step in this phase, not just the final polish pass (Step 9), aims at the same visual target:
a clean, modern application that reads as Material Design-inspired without adopting a full
Material component library. Concretely: a consistent elevation model (a small, reused shadow scale
for the header, cards, and the modal, instead of an ad hoc `box-shadow` value per component), a
consistent border-radius and spacing scale, a defined type scale (already mostly in place via
Tailwind's default scale), clear and consistent interactive states (hover, `focus-visible`, active,
disabled) on every button and link, and subtle, purposeful motion (short transitions on
hover/press/open-close, never anything decorative or slow enough to feel sluggish). None of that
requires a new component library: Tailwind's utility classes and its `@theme` tokens (for a small,
named set of shadow/radius/duration values reused across components) cover it.

**Decision: no Sass.** Revisited here since the look-and-feel goal above raised the question again.
Tailwind CSS v4 is built on Lightning CSS, which already provides native CSS nesting, custom
properties (already how Tailwind v4's own `@theme` tokens work), and `calc()`-based math: the
specific problems Sass historically solved, none of which are missing here. Introducing Sass would
add a build step and a second styling convention (`.scss` partials alongside Tailwind utility
classes) without solving a problem Tailwind can't already handle, which is exactly the kind of
dependency `AGENTS.md` says needs a concrete technical justification, not just a preference for
organization. If a specific, concrete styling need comes up during implementation that Tailwind
genuinely can't express cleanly, it will be raised at that point, named specifically, rather than
added preemptively.

## Steps

### Step 1: Header, footer, and a shared app shell

**Status:** Done (shipped as `1.1.0`)

**What:** `src/app/Header.tsx` (a sticky, `backdrop-blur`d top app bar: the site name as a home
link, a `Login` nav link using `NavLink` so it gets a real `aria-current="page"` state, and the
theme toggle) and `src/app/Footer.tsx` (a copyright line whose year comes from
`new Date().getFullYear()`, so it never needs a manual edit). `src/app/Layout.tsx` composes both
around `<Outlet />` and is now the element for a wrapping layout `<Route>` in `src/app/router.tsx`,
so every page renders inside the same shell instead of each page owning its own full-page chrome.
`shared/components/ThemeToggle.tsx` moved from a `fixed`, floating top-right button (rendered
directly from `App.tsx`) into the header, losing its `fixed` positioning classes since it's now
laid out inline by the header's flex row; `App.tsx` no longer renders it directly. `body` in
`src/index.css` now carries the light/dark background and text color classes that `LoginPage`,
`TablePage`, and `NotFoundPage` previously each repeated on their own `<main>`; each page's `<main>`
now uses `flex flex-1` (filling the space the layout leaves between header and footer) instead of
`min-h-svh` (which the layout's own wrapper div owns instead).

**Why now:** Every later step in this phase (the theme system, the login greeting, protected
routes, toasts, static pages) either lives in or is reachable from this shell, so building it first
avoids retrofitting header/footer wiring into several already-finished pieces.

**Changes:** `src/app/Header.tsx` (new), `src/app/Footer.tsx` (new), `src/app/Layout.tsx` (new),
`src/app/router.tsx` (routes nested under `Layout`), `src/App.tsx` (`ThemeToggle` no longer
rendered directly), `shared/components/ThemeToggle.tsx` (`fixed` positioning removed),
`src/index.css` (`body` base color classes added), `src/pages/LoginPage.tsx` / `TablePage.tsx` /
`NotFoundPage.tsx` (background/text classes removed, `min-h-svh` replaced with `flex flex-1`).

**Decision:** No Sass or other CSS build tooling was introduced. Tailwind v4 already provides a
complete, config-free build pipeline via `@tailwindcss/vite`, and this step's styling need (an app
bar, a footer, and moving a handful of utility classes around) doesn't call for anything a
preprocessor would add: no new abstraction was justified, consistent with `AGENTS.md`'s dependency
and no-premature-abstraction rules.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (27 tests),
and `npm run build` all pass. Verified against the real dev server in headless Chrome (driven
directly over the DevTools protocol) at 360px, 768px, and 1280px, in both light and dark
(`prefers-color-scheme` emulated, with `localStorage` cleared first so the stored-preference
override from Phase 1 Step 11 didn't mask the OS setting): no page-level horizontal overflow at any
width on `/` or `/table`; the header and footer are present and don't overlap other content at
360px; the footer's copyright year renders as the current year; the `Login` nav link carries
`aria-current="page"` on `/` and no `aria-current` on `/table`; clicking the header's theme toggle
button (via a real `Input.dispatchMouseEvent` click, not a DOM property set) flips the `dark` class
on `<html>`, updates the button's `aria-label`, and writes the new value to `localStorage`, all in
sync; no console errors on any page, width, or theme combination tested.

---

### Step 2: Theme system: explicit system/auto option

**Status:** Done (shipped as `1.2.0`)

**What:** `shared/hooks/useTheme.ts` now models the theme as a `ThemePreference`
(`'light' | 'dark' | 'system'`) plus a separately-tracked `ResolvedTheme` (`'light' | 'dark'`, the
value actually applied to the `dark` class). `system` (now the default when nothing is stored in
`localStorage`, replacing the old "resolve the OS preference once at mount and freeze it" fallback)
subscribes to `window.matchMedia('(prefers-color-scheme: dark)')`'s `change` event in a `useEffect`,
so switching the OS theme while the tab is open updates `resolvedTheme` immediately, with no reload
needed. `shared/components/ThemeToggle.tsx` became a three-button segmented control
(`role="group" aria-label="Theme"`, each option a `button` with `aria-pressed` and an icon-only
`aria-label`: "Light theme," "Dark theme," "Match system theme") instead of a single cycling
sun/moon button, so all three states stay visible and directly selectable rather than hidden behind
a cycle.

**Why now:** The user's original request named auto-detect as a nice-to-have alongside light/dark;
doing it right after the header landed (rather than folding it into Step 1) kept that step focused
on layout and this one focused purely on the theme model.

**Changes:** `shared/hooks/useTheme.ts` (rewritten: `ThemePreference`/`ResolvedTheme` types, live
`matchMedia` subscription, `'system'` added to the persisted Zod enum and as the no-stored-value
default), `shared/components/ThemeToggle.tsx` (rewritten as a segmented control, added a
`SystemIcon`), `src/app/Header.tsx` (brand link and nav spacing made responsive: `text-base
sm:text-lg` and tighter gaps/padding below the `sm` breakpoint, to keep the wider three-option
control from wrapping the header onto two lines at 360px).

**Decision:** A native `<select>` (light/dark/system as options) was considered first as the
"boring, obvious" choice for a three-way value, but rejected in favor of a segmented control: the
project's stated goal for this phase is a modern, Material-Design-ish look, and a styled
three-button group keeps every option visible and one tap away, versus hiding two of the three
behind a native dropdown's default closed state. It's still a plain, dependency-free
`<button>`/`role="group"` pattern, not a new abstraction.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (27 tests),
and `npm run build` all pass. Verified against the real dev server in headless Chrome (DevTools
protocol): with `localStorage` cleared and the OS preference emulated as light, the control opens
on "System" pressed and no `dark` class; clicking "Dark" sets the `dark` class and persists
`theme: 'dark'`; clicking "System" reverts to following the OS setting; with preference back on
`system`, emulating a live OS change to dark (via `Emulation.setEmulatedMedia`, no page reload)
correctly flips the `dark` class through the new `matchMedia` `change` listener; no horizontal
overflow at 360px, 768px, or 1280px (the header brand/spacing fix was needed for 360px, where the
wider control had pushed the brand text onto two lines before the fix); no console errors.

---

### Step 3: Password visibility toggle

**Status:** Done (shipped as `1.3.0`)

**What:** A show/hide button inside the password field in `features/auth/LoginForm.tsx`, wrapping
the input in a `relative` container and absolutely positioning the button over its right edge (with
`pr-11` added to the input so typed text never runs under it). Toggles the input's `type` between
`password` and `text` via a `showPassword` boolean in local component state. Built the same way as
the existing `SunIcon`/`MoonIcon` pattern in `ThemeToggle.tsx`: plain inline SVGs (`EyeIcon` /
`EyeSlashIcon`), a `type="button"` element (so it never submits the form), a real `aria-label`
describing the action ("Show password" / "Hide password"), and a 44x44px touch target consistent
with the rest of the app's interactive controls.

**Why now:** Small, fully self-contained change to the login form with no dependency on any other
step in this phase; a natural companion to the login form work the phase is already touching.

**Changes:** `src/features/auth/LoginForm.tsx` (`EyeIcon`/`EyeSlashIcon`, `showPassword` state, the
password field wrapped in a `relative` container with the toggle button), `LoginForm.test.tsx` (new
test for the toggle; the two existing tests' `getByLabelText(/password/i)` calls were changed to an
exact `getByLabelText('Password')`, since the new toggle button's `aria-label="Show password"` also
matched the old, looser regex, making the query ambiguous).

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (28 tests,
one new), and `npm run build` all pass. Verified against the real dev server in headless Chrome
(DevTools protocol): typing into the password field and reading its `.value` back confirms text
entry works before any toggle; the toggle button measures 44x46px; clicking it (a real
`Input.dispatchMouseEvent` click) flips the input's `type` from `password` to `text` and the
button's `aria-label` from "Show password" to "Hide password," with the typed value preserved
across the switch; no horizontal overflow at 360px, and a screenshot confirms the revealed text
doesn't overlap the icon in dark mode; no console errors.

---

### Step 4: Login session state, greeting, People link, and input hardening

**Status:** Done (shipped as `1.4.0`)

**What:** On a valid login submit, `LoginForm` calls `login(username)` (never the password) from a
new `features/auth/useSession.ts` hook, and the app reacts to it in the header: a logged-out
visitor still sees `Login`; a logged-in visitor sees a greeting (`features/auth/Greeting.tsx`, "Hi,
`<username>`!"), a `People` link to `/table`, and a `Log out` action, in place of `Login`. The
session is held in a small React Context: `features/auth/sessionContext.ts` (the `createContext`
call and its `SessionContextValue` type, a plain non-component file so it isn't subject to
`react-refresh/only-export-components`), `features/auth/SessionProvider.tsx` (the component,
default-exported, wraps `<AppRouter />` in `App.tsx`), and `features/auth/useSession.ts` (the
consuming hook, throws if used outside the provider). This is because the session is read by
several components that aren't in an ancestor/descendant relationship with each other (the header's
nav, the greeting, and Step 5's future route guard) and written from one that isn't their ancestor
either (`LoginForm`), the same "more than one independent reader, one non-ancestor writer"
justification `AGENTS.md`'s dependency rules now name explicitly. The session value itself (just
`{ username }`) is kept in `features/auth/session.ts`'s `sessionStorage` (not `localStorage`), read
back through a Zod schema, consistent with every other trust-boundary read in this codebase.

Because the username is now rendered back into the UI (the greeting) for the first time,
`loginSchema.ts`'s `username` field also gained a character allowlist (letters, digits, spaces,
hyphens, underscores, and periods only), rejecting anything containing `<`, `>`, quotes, or other
HTML-special characters before it's ever accepted, in addition to (not instead of) React's existing
automatic escaping of all rendered text; `session.ts`'s schema reuses the same `usernameSchema`, so
a tampered `sessionStorage` entry is held to the same rule, not just "some string." A new
`Greeting.test.tsx` renders the greeting directly with a value containing `<img src=x
onerror=...>`-style input and asserts it appears as inert text, never executed, to make the
existing "no `dangerouslySetInnerHTML`, ever" rule concrete for this new surface.

**Why now:** The greeting and the `People` link both need "was the login form just submitted
successfully" to exist as real state, which doesn't exist anywhere in the app yet; this step
introduces it once, and Step 5 (protected routes) will reuse it rather than inventing a second
mechanism.

**Changes:** `src/features/auth/loginSchema.ts` (`usernameSchema` extracted, character allowlist
added), `loginSchema.test.ts` (allowlist accept/reject cases), `src/features/auth/session.ts`
(new), `session.test.ts` (new), `src/features/auth/sessionContext.ts` (new),
`src/features/auth/SessionProvider.tsx` (new), `src/features/auth/useSession.ts` (new),
`src/features/auth/Greeting.tsx` (new), `Greeting.test.tsx` (new), `src/App.tsx` (wraps
`<AppRouter />` in `SessionProvider`), `src/features/auth/LoginForm.tsx` (calls `login(data
.username)` on valid submit; `LoginForm.test.tsx` renders through `SessionProvider` now and gained
a test asserting the session is recorded), `src/app/Header.tsx` (conditional nav, a `PeopleIcon` and
`LogOutIcon` added for the icon-only mobile rendering described below).

**Decision applied:** `AGENTS.md`'s "What this project is" and "Security principles" sections were
amended (ahead of this step, when this step was first added to the plan) to describe the session
accurately: still no real credential check, no password storage, no backend, no persistent
account, but a real, if intentionally lightweight and tab-scoped, demo session now exists for UI
personalization and navigation, never as a security
boundary.

**Decision found during validation:** the first pass showed `People` and `Log out` as full text
labels, which overflowed the header at 360px (measured: the header's content wanted 389px against a
360px viewport). Rather than shrinking touch targets or the brand text to claw back the difference,
both became icon-first: a `PeopleIcon` (a simple 2x2 grid) and the existing-shape `LogOutIcon` (the
conventional "arrow into a door" glyph), each with their label visible only at the `sm` breakpoint
and up (`hidden sm:inline`) and an `aria-label` on the `Log out` button so its accessible name
doesn't depend on the visible text. This matches the same "hide it below `sm`, keep it at `sm` and
up" treatment already used for the greeting, rather than introducing a new responsive pattern.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (48 tests,
20 new), and `npm run build` all pass. Verified against the real dev server in headless Chrome
(DevTools protocol): logged out, the header shows only `Login`; filling and submitting the login
form navigates to `/table` and writes `{"username":"validUser"}` to `sessionStorage`; the header
immediately reflects it (greeting, `People`, `Log out`) without a reload, since `SessionProvider`'s
state update re-renders the header directly; clicking `Log out` clears `sessionStorage` and reverts
the header to `Login`; no horizontal overflow at 360px, 768px, or 1280px in the logged-in state
(360px required the icon-first fix described above); no console errors. `Greeting.test.tsx` and
`session.test.ts` both pass, confirming the rendering layer and the storage-read layer are each
independently safe against a hostile or tampered username.

---

### Step 5: Protected routes

**Status:** Done (shipped as `1.5.0`)

**What:** `/table` redirects to `/` for a visitor with no session (Step 4's `useSession`), via a
small `src/app/ProtectedRoute.tsx` wrapping element used in `router.tsx`, using React Router's
`<Navigate to={ROUTES.login} replace>` rather than an imperative redirect (`replace` so the
redirect doesn't leave a `/table` entry a visitor could land back on with the browser Back button).
This is explicitly a UX/navigation guard guiding a visitor through the intended login-first flow,
not a security boundary: there is no server, no data behind `/table` that a direct fetch couldn't
already reach, and nothing here should ever be described as "protecting" the character data itself.

**Why now:** Directly depends on Step 4's session state existing; doing it any earlier would mean
inventing a throwaway "is logged in" flag that Step 4 would then have to replace.

**Changes:** `src/app/ProtectedRoute.tsx` (new), `src/app/router.tsx` (`/table`'s route element
wrapped in `ProtectedRoute`), `src/app/ProtectedRoute.test.tsx` (new: redirects with no session,
passes through with one).

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (50 tests,
2 new), and `npm run build` all pass. Verified against the real dev server in headless Chrome
(DevTools protocol, `sessionStorage`/`localStorage` cleared first): a logged-out visitor navigating
directly to `/table` (and separately to `/table?page=2`) ends up at `/` showing the login form, not
the table; a visitor with a session written directly to `sessionStorage` (bypassing the login form,
simulating an already-logged-in visit) navigating to `/table` sees the real table content
("Star Wars People"); no console errors in either case.

**Follow-up:** Step 6 later added a toast notification when this redirect fires, so it isn't
silent; see Step 6 for that change and a StrictMode-related bug it surfaced in `ProtectedRoute`.

---

### Step 6: Toast notification system

**Status:** Done (shipped as `1.6.0`)

**What:** A small, dependency-free toast system in `src/shared/toast/`: `toastContext.ts` (the
`createContext` call and its types, not a component, so it isn't subject to
`react-refresh/only-export-components`), `ToastProvider.tsx` (holds the toast list in state, wraps
`<AppRouter />`/`<OfflineModal />` in `App.tsx`, and renders the one visible stack directly, since
that stack is tightly coupled to the state driving it), and `useToast.ts` (the consuming hook,
`{ showToast(message, variant?) }`). Toasts auto-dismiss after five seconds (`TOAST_DURATION_MS`)
or on a manual close, stack `fixed` at the bottom-center on narrow screens and bottom-right from
`sm` up (each toast `pointer-events-auto` inside an otherwise `pointer-events-none` region so the
stack never blocks clicks elsewhere), and use `role="alert"` for the `error` variant, `role
="status"` for `info`/`success` (each role's implicit `aria-live` is enough, no separate
`aria-live` attribute needed). Three variants (`info`, `success`, `error`) get distinct sky/emerald
/red colors in both themes.

`src/app/ProtectedRoute.tsx` (Step 5) now calls `showToast('Please log in to access that page.')`
when it redirects, per the request that named this specific pairing, so the redirect doesn't
happen silently.

**Why now:** Matches the original plan's ordering; also gives Steps 7 and 8 a place to surface
non-blocking feedback (e.g., a static page's content loading, or a unit-conversion action) if that
turns out to be useful, without inventing a second notification mechanism later. Wiring it into
`ProtectedRoute` immediately (rather than only building the generic system) was requested
alongside this step, and having Step 5 already in place meant it was a small, self-contained
addition rather than a reason to reorder the plan.

**Changes:** `src/shared/toast/toastContext.ts` (new), `ToastProvider.tsx` (new),
`ToastProvider.test.tsx` (new), `useToast.ts` (new), `src/App.tsx` (wraps `<AppRouter />` in
`ToastProvider`), `src/app/ProtectedRoute.tsx` (calls `showToast` on redirect),
`ProtectedRoute.test.tsx` (toast-shown / toast-not-shown cases, plus the StrictMode regression test
below).

**Bug found and fixed during validation:** the first pass showed the redirect toast twice in
`npm run dev`. Cause: `ProtectedRoute`'s `useEffect` calling `showToast` was double-invoked by React
StrictMode's development-only mount/cleanup/remount cycle (main.tsx wraps the whole app in
`<StrictMode>`), producing two toasts for one redirect. The natural-looking fix, an effect cleanup
that dismisses the toast, was rejected: `ProtectedRoute` unmounts for real almost immediately after
the redirect (the matched route changes away from `/table`), so that cleanup would dismiss the
toast right after showing it, in production as well as development, not just cancel StrictMode's
extra invocation. Fixed with a `useRef` guard instead (React's documented escape hatch for an
effect whose side effect must not double-fire but also must not be undone on the component's real
unmount). `ProtectedRoute.test.tsx` gained a test that renders under `<StrictMode>` explicitly and
asserts exactly one toast appears, to catch a regression here.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (57 tests,
9 new), and `npm run build` all pass. Verified against the real dev server (`npm run dev`, so
StrictMode is active, the same environment the bug above only reproduced in) in headless Chrome:
navigating to `/table` while logged out shows exactly one toast reading "Please log in to access
that page." at `/`; no horizontal overflow at 360px with the toast visible; clicking its close
button removes it from the DOM; screenshots confirm readable contrast in dark mode at both 360px
(bottom-center) and 1280px (bottom-right); no console errors.

---

### Step 7: Static pages and footer navigation

**Status:** Done (shipped as `1.7.0`)

**What:** `AboutPage.tsx`, `PrivacyPolicyPage.tsx`, and `TermsPage.tsx` under `src/pages/`, routed
at `/about`, `/privacy`, and `/terms` (added to `ROUTES` and `router.tsx`, public, not wrapped in
`ProtectedRoute`), each with real, project-appropriate written content, not placeholder text.
All three share a new `src/shared/components/StaticPage.tsx` layout: the page itself writes plain
semantic HTML (`h2`, `p`, `ul`/`li`, `a`, `code`), and `StaticPage` applies consistent typography
and spacing to it via Tailwind descendant selectors (e.g. `[&_h2]:mt-6 [&_h2]:text-lg
[&_h2]:font-semibold`), so the three pages read as one visual system without each repeating the
same classes. `src/app/Footer.tsx` gained a `nav aria-label="Footer"` linking to all three pages,
above the existing copyright line.

The Privacy Policy and Terms content was written to describe this specific app's actual behavior,
not generic boilerplate: no backend and no real accounts, the login form's format-only validation,
the demo session (username only, `sessionStorage`, cleared on tab close), what `localStorage` is
used for (the SWAPI response cache and the theme preference), and an explicit "no cookies, no
analytics, no tracking" statement, all of which are true of the app as built in Steps 1 through 6.
The About page credits the public SWAPI, includes the standard "not affiliated with Lucasfilm or
Disney" disclaimer, lists the tech stack, and links to the project's own GitHub repository (the
same URL already used in this changelog's compare links, not a newly invented one).

**Why now:** These pages benefit from the header/footer shell (Step 1) and the finished visual
language from the theme step; doing them after the more structural steps means they're built
against a stable design system instead of one still being revised.

**Changes:** `src/app/routes.ts` (`about`/`privacy`/`terms` added), `src/app/router.tsx` (three new
public routes), `src/app/Footer.tsx` (footer nav added), `src/shared/components/StaticPage.tsx`
(new), `src/pages/AboutPage.tsx` / `PrivacyPolicyPage.tsx` / `TermsPage.tsx` (new).

**Decision:** No dedicated test files for the three new pages, consistent with the existing
convention that `LoginPage.tsx`/`TablePage.tsx`/`NotFoundPage.tsx` (thin, content-only route
components) don't have them either: this project's testing convention is "test real logic," and
static prose content isn't logic. Verified by hand instead (see Validation).

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (57 tests,
unchanged), and `npm run build` all pass. Verified against the real dev server in headless Chrome:
all three pages render their heading and every `h2` (5 on About, 6 on Privacy, 7 on Terms) with no
horizontal overflow at 360px or 1280px in either theme; the footer's three links have the correct
`href`s and clicking one (a real click, not a location assignment) navigates to the right page; no
console errors anywhere.

---

### Step 8: Unit conversion for height and mass

**Status:** Done (shipped as `1.8.0`)

**What:** Per the SWAPI docs, `height` is centimeters and `mass` is kilograms, both returned as
strings (already noted in Phase 1 Step 3's decision, since either can be `"unknown"` or contain a
comma). `features/people/units.ts` (`formatHeight`/`formatMass`) parses that raw string (stripping
commas) and formats it for a given unit; a value that doesn't parse as a finite number (`"unknown"`,
`"n/a"`, empty) is returned as-is rather than run through a conversion. `features/people/
UnitToggle.tsx` is a small, generic two-option segmented control (the same visual pattern as
`shared/components/ThemeToggle.tsx`, parameterized so the table's two uses, height and mass, don't
each hand-roll the same markup). `PeopleTable.tsx` holds the selected `HeightUnit`/`MassUnit` as its
own local state (so it survives switching pages, since `PeopleTable` doesn't unmount between page
changes), renders both toggles above the table, and both the `Mass (<unit>)` / `Height (<unit>)`
column headers and every cell update immediately, client-side, with no new network request: the
original API value and unit remain the single source of truth throughout.

**Why now:** Matches the original plan's ordering: it's independent of every other step in this
phase and was explicitly requested last, once the rest of the table's surrounding chrome (header,
theme, toasts) is in place.

**Changes:** `src/features/people/units.ts` (new), `units.test.ts` (new), `UnitToggle.tsx` (new),
`PeopleTable.tsx` (rewritten: local `heightUnit`/`massUnit` state, the two toggles rendered above
the table, headers and cells driven by the formatters), `PeopleTable.test.tsx` (new: default
cm/kg display, switching to m/lb updates headers and cell values).

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (71 tests,
14 new), and `npm run build` all pass. Verified against the real dev server (a session written
directly to `sessionStorage` to get past `ProtectedRoute`) in headless Chrome, against the real
SWAPI response: default headers read "Mass (kg)"/"Height (cm)" with Luke Skywalker showing `77`/
`172`; clicking `m` and `lb` updates the headers to "Mass (lb)"/"Height (m)" and every cell (Luke
Skywalker to `169.8`/`1.72`) with the Network domain confirming zero new requests to the SWAPI host
were made by the switch; no horizontal overflow at 360px with both toggles visible; no console
errors.

---

### Step 9: Material Design polish and accessibility pass

**Status:** Done (shipped as `1.9.0`)

**What:** Audited first, per the Phase 1 precedent for this kind of step: an `axe-core` scan
(already a transitive dependency, same as Phase 1 Step 10, so no new dependency) across `/`,
`/table`, `/about`, `/privacy`, and `/terms`, in both themes, reported zero violations both before
and after this step's changes, confirming nothing here was an accessibility bug so much as a
polish gap the plan's own "Design direction" section named. Reading every interactive component
against that section's criteria turned up two genuine, concrete gaps, both fixed:

- **No consistent focus-visible treatment.** Every button and link relied on the bare browser
  default outline, which is accessible but generic, not something the app deliberately designed.
  Fixed with a new `src/shared/focusRing.ts` (`INTERACTIVE_CLASS_NAME`: a solid sky-colored outline
  plus a short transition), applied to every interactive control that didn't already define its
  own treatment: the header's nav links and `Log out` button, `ThemeToggle`/`UnitToggle`'s
  segmented buttons, `Pagination`'s Previous/Next buttons, the login form's submit and
  password-visibility buttons, `Modal`'s and the toast's close/dismiss buttons, the footer's links,
  and the 404 page's link. The login form's own input focus ring was also changed from neutral
  slate to the same sky accent, so focus reads as one consistent color everywhere, not two.
- **No elevation (shadow) scale**, despite the design direction naming the header and the modal
  specifically. The toast stack already had `shadow-lg`; the header and `Modal` had none. Added a
  three-tier scale: `shadow-sm` on the sticky header (subtle, since it's always on screen),
  `shadow-lg` on toasts (unchanged), `shadow-xl` on `Modal` (most prominent, since it's the one
  blocking, full-attention surface).

Everything else checked against the design direction (border-radius scale, spacing rhythm, hover
and disabled states) was already consistent: a two-tier radius system (`rounded` for controls,
`rounded-lg` for surfaces like `Modal` and toasts) was already in place across every component from
earlier steps, and hover/disabled states already existed everywhere they were needed. No changes
were made there, consistent with the Phase 1 precedent of not changing what isn't actually broken.
Modal open/close and toast enter/exit animations were considered and deliberately not added: both
already work correctly and accessibly without one, and animating a native `<dialog>`'s entrance
needs either newer `@starting-style` CSS (no Tailwind utility for it) or extra mount-timing state
for the toast, for a cosmetic gain not called for here.

**Why now:** Same reasoning as Phase 1's equivalent closing steps: polishing against a moving
target means redoing it, so this runs last, once every other step's UI actually exists to polish.

**Changes:** `src/shared/focusRing.ts` (new), `src/app/Header.tsx` (`shadow-sm`, focus ring on the
brand link and nav items), `shared/components/ThemeToggle.tsx` / `features/people/UnitToggle.tsx`
(focus ring on each segmented button), `features/people/Pagination.tsx` (focus ring),
`features/auth/LoginForm.tsx` (focus ring on the submit and password-toggle buttons; input focus
ring color unified to sky), `shared/components/Modal.tsx` (`shadow-xl`, focus ring on the close
button), `shared/toast/ToastProvider.tsx` (focus ring on the dismiss button), `app/Footer.tsx` and
`pages/NotFoundPage.tsx` (focus ring plus a hover color the 404 link was missing entirely),
`shared/components/StaticPage.tsx` (a hover-color transition added to prose links).

**Bug found and fixed during validation:** the first attempt at the focus ring used `outline-none`
unconditionally plus `focus-visible:outline-2`, on the assumption the latter would restore a
visible outline at focus time. Testing it (via `getComputedStyle(...).outlineStyle` in a headless
browser check, not a screenshot alone, since an invisible-by-definition bug doesn't show up as a
visible difference) found `outline-style: none` even while focus-visible matched. Cause: Tailwind
v4's `outline-<n>` utilities read `outline-style` from a shared `--tw-outline-style` custom
property, which Tailwind's own base layer sets to `solid` on every element by default;
`outline-none` overwrites that same property to `none` unconditionally (it isn't scoped to
`:focus-visible`), and no `focus-visible:` utility ever writes the property back, only reads it, so
it stayed `none` even once focused. Fixed by dropping `outline-none` entirely: Tailwind's own
default (`solid`) is exactly what's needed, and the CSS-spec initial `outline-style` (`none`,
absent any authored outline utility) already keeps the outline invisible outside `:focus-visible`
with no extra class required.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (71 tests,
unchanged, since this step was styling-only), and `npm run build` all pass. `axe-core` reported
zero violations on all five routes, both themes, both before and after. Verified the focus ring
itself against the real dev server in headless Chrome: `getComputedStyle` on the actively-focused
element after a real `Input.dispatchKeyEvent` Tab press confirmed `outline-style: solid`,
`outline-width: 2px`, and the sky outline color, in both light and dark; a cropped screenshot of
the focused `Login` link shows a clearly visible ring. The header's and `Modal`'s computed
`box-shadow` values confirmed `shadow-sm` and `shadow-xl` are actually applied (not just present in
source). Tab order through the header (brand link, then `Login`, then the three theme buttons)
was unchanged from before this step.

**Bug found and fixed after release (`1.9.1`):** every button in the app showed the browser's
default cursor on hover, not a pointer, because native `<button>` elements don't get one by
default in Chrome/Firefox (only `<a>` links do), and neither Tailwind's preflight nor this app's
own styles set one. Since `INTERACTIVE_CLASS_NAME` (added by this step) is already applied to
every button and link in the app, adding `cursor-pointer` to it there fixed every site at once,
without touching individual components. Confirmed via `getComputedStyle(...).cursor` in headless
Chrome across the login page, the table page, the About page, and the 404 page: every `<button>`
and `<a href>` now reports `pointer`, and disabled buttons (Pagination's `Previous`, the login
form's submit button before the form is valid) correctly still report `not-allowed`.

---

### Step 10: Header nav polish: Login icon and a logged-in grouping divider

**Status:** Done (shipped as `1.10.0`)

**What:** Two small header changes, requested after using the app for a while: an icon next to the
`Login` link, matching the icon-plus-label pattern `People` and `Log out` already used, and a
visual separation, in the logged-in state, between the primary nav item (`People`) and the
account-related items (the username greeting and `Log out`). The logged-in nav order is now
`People`, a thin vertical divider (`aria-hidden`, purely decorative, so it isn't announced or
tab-stopped), the greeting, then `Log out` (previously the greeting came first, with no divider).

**Bug found and fixed along the way:** the existing `LogOutIcon` in `src/app/Header.tsx` was, on
inspection, actually the "arrow entering a box" glyph (an open-ended box with an arrow pointing
into it from the outside), the conventional icon for _signing in_, not signing out, even though it
was wired up to the `Log out` button. It had no counterpart for `Login` before this step, so the
mismatch was never visually obvious. Reusing that existing SVG for the new `Login` icon (where the
"entering" motion is actually correct) and adding a properly mirrored `LogOutIcon` (an open-ended
box with an arrow exiting it) fixed both at once, rather than giving `Login` and `Log out` the same
icon.

**Changes:** `src/app/Header.tsx`: the old `LogOutIcon` function renamed to `LoginIcon` and applied
to the `Login` link; a new, correctly-mirrored `LogOutIcon` added and applied to the `Log out`
button; a decorative divider (`h-6 w-px` bar) inserted between `People` and the greeting in the
logged-in nav; nav order changed to `People`, divider, greeting, `Log out`.

**Validation:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` (71 tests,
unchanged), and `npm run build` all pass. Verified visually with screenshots from a headless
Chrome session against the real dev server: logged-out header (icon reads as "entering", next to
`Login`), logged-in header at desktop and mobile widths (divider visible at both, between `People`
and the greeting/`Log out` group), and both in dark mode.

---

All nine steps originally planned for this phase are complete as of `1.9.0` (a cursor-style fix
landed after release as `1.9.1`, and a header nav polish pass as `1.10.0`; see Steps 9 and 10
above). Any further UI/UX work beyond what's described above (e.g. real user accounts, additional
unit types, more toast use sites) would be a new phase with its own plan document, not an addition
to this one.
