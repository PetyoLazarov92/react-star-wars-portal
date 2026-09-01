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

**Status:** Planned

**What:** `/table` redirects to `/` for a visitor with no session (Step 4's `useSession`), via a
small `src/app/ProtectedRoute.tsx` wrapping element used in `router.tsx`, using React Router's
`<Navigate replace>` rather than an imperative redirect. This is explicitly a UX/navigation guard
guiding a visitor through the intended login-first flow, not a security boundary: there is no
server, no data behind `/table` that a direct fetch couldn't already reach, and nothing here should
ever be described as "protecting" the character data itself.

**Why now:** Directly depends on Step 4's session state existing; doing it any earlier would mean
inventing a throwaway "is logged in" flag that Step 4 would then have to replace.

---

### Step 6: Toast notification system

**Status:** Planned

**What:** A small, dependency-free toast system: a `ToastProvider`/`useToast()` pair (same
Context justification as Step 4's session: multiple independent components need to trigger a
toast, and there's exactly one place, near the root, that renders the visible stack), rendering
dismissible, auto-expiring toast messages in a fixed corner region, with `role="status"` /
`aria-live="polite"` (or `role="alert"` for error-severity toasts) so they're announced accessibly,
and readable in both themes.

**Why now:** Matches the original plan's ordering; also gives Steps 7 and 8 a place to surface
non-blocking feedback (e.g., a static page's content loading, or a unit-conversion action) if that
turns out to be useful, without inventing a second notification mechanism later.

---

### Step 7: Static pages and footer navigation

**Status:** Planned

**What:** `PrivacyPolicyPage`, `TermsPage`, and `AboutPage` under `src/pages/`, each real,
project-appropriate written content (not placeholder text), sharing the same typography, spacing,
and layout primitives as the rest of the app (rendered inside the same `Layout`). The footer gains
a small nav linking to all three, alongside the existing copyright line.

**Why now:** These pages benefit from the header/footer shell (Step 1) and, ideally, the finished
visual language from the theme step; doing them after the more structural steps means they're
built against a stable design system instead of one still being revised.

---

### Step 8: Unit conversion for height and mass

**Status:** Planned

**What:** Per the SWAPI docs, `height` is centimeters and `mass` is kilograms, both returned as
strings (already noted in Phase 1 Step 3's decision, since either can be `"unknown"` or contain a
comma). A simple unit selector (e.g., cm/m for height, kg/lb for mass) converts the already-fetched
values client-side for display only; the source value and unit from the API response remain the
single source of truth, and switching units never triggers a new fetch. Non-numeric values
(`"unknown"`, `"n/a"`) are displayed as-is rather than run through a conversion.

**Why now:** Matches the original plan's ordering: it's independent of every other step in this
phase and was explicitly requested last, once the rest of the table's surrounding chrome (header,
theme, toasts) is in place.

---

### Step 9: Material Design polish and accessibility pass

**Status:** Planned

**What:** A whole-app pass once every feature above is in place, measured against the "Design
direction" section above: a consistent elevation scale applied to the header, the modal, and any
card-like surfaces; a consistent border-radius and spacing rhythm across buttons, inputs, the
table, and toasts; consistent hover/`focus-visible`/active/disabled states on every interactive
element; short, purposeful transitions where they help (opening the modal, showing a toast,
hovering a button) and none where they don't; and a repeat of the Phase 1 axe-core/keyboard
navigation audit against the larger surface area this phase adds (header, footer, toasts, static
pages, session UI).

**Why now:** Same reasoning as Phase 1's equivalent closing steps: polishing against a moving
target means redoing it, so this runs last, once every other step's UI actually exists to polish.
