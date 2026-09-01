# Phase 2 Development Plan: UI/UX and Structure Improvements

This is a living document, same as [`docs/development-plan.md`](development-plan.md) (Phase 1,
closed at `1.0.0`). It picks up from there: a user-driven pass to add a proper header and footer,
a fuller theme system, a lightweight login/session experience, protected routes, toast
notifications, static content pages, and a client-side unit selector for the people table. Update
the relevant step's status and notes as work happens, don't leave it describing only the original
intent.

Status legend: `Done` · `In progress` · `Planned`

## Versioning for this phase

Unlike Phase 1 (which batched everything up to one `1.0.0` release), each step in this phase gets
its own version bump as soon as it ships, sized by ordinary SemVer rules: a step that only adds a
backward-compatible feature is a minor bump, a pure fix is a patch bump, and a breaking change
would be a major bump (none are expected in this phase). `package.json` / `package-lock.json` and
`CHANGELOG.md` are updated in the same change as the step itself, not batched for later.

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

**Status:** Planned

**What:** Extend `shared/hooks/useTheme.ts` from a two-way (`light`/`dark`) preference to a
three-way one (`light`/`dark`/`system`), where `system` means "follow `prefers-color-scheme` live,"
not just "read it once at mount" (today's fallback behavior when nothing is stored). The header's
`ThemeToggle` becomes a small three-way control (or a cycle button through the three states) rather
than a single sun/moon toggle, with an accessible label reflecting all three states.

**Why now:** The user's original request named auto-detect as a nice-to-have alongside light/dark;
doing it right after the header lands (rather than folding it into Step 1) keeps that step focused
on layout, and this one focused purely on the theme model.

**Design notes to confirm during implementation:** `window.matchMedia('(prefers-color-scheme:
dark)')` supports a `change` event listener, so `system` mode can react live to an OS-level theme
change without a page reload, unlike today's read-once behavior. The stored `localStorage` value
needs a third valid entry (`'system'`) in the Zod enum. No new dependency.

---

### Step 3: Password visibility toggle

**Status:** Planned

**What:** A small show/hide button next to the password field in `features/auth/LoginForm.tsx`,
toggling the input's `type` between `password` and `text`. Built the same way as the existing
`SunIcon`/`MoonIcon` pattern in `ThemeToggle.tsx`: a plain inline SVG (eye / eye-with-slash), a
`type="button"` element (so it never submits the form), a real `aria-label` describing the action
("Show password" / "Hide password"), and a 44x44px touch target consistent with the rest of the
app's interactive controls.

**Why now:** Small, fully self-contained change to the login form with no dependency on any other
step in this phase; a natural companion to the login form work the phase is already touching.

---

### Step 4: Login session state, greeting, People link, and input hardening

**Status:** Planned

**What:** On a valid login submit, `LoginForm` records the submitted username (never the password)
as a lightweight, client-side "session," and the app reacts to it in two visible ways: a greeting
("Hi, `<username>`") and a `People` link to `/table` appear in the header in place of the `Login`
link, alongside a way to end the session (a `Log out` action). Because this state is read by
several components that aren't in an ancestor/descendant relationship with each other (the header's
nav, the greeting itself, and Step 5's route guard), it's held in a small React Context
(`SessionProvider`/`useSession`, built on `useState`, no new dependency) rather than prop-drilled or
duplicated, the same "more than one independent reader, one non-ancestor writer" justification the
project's rule-of-three principle already allows for. The session value itself (just `{ username
}`) is kept in `sessionStorage`, not `localStorage`: it should not outlive the browser tab, since
that better matches what it actually is (a demo display convenience for this visit, not a
persistent account), and is read back through a small Zod schema, consistent with every other
trust-boundary read in this codebase.

Because the username is now rendered back into the UI (the greeting) for the first time, this step
also hardens `loginSchema.ts`'s `username` field with a character allowlist (letters, digits,
spaces, hyphens, underscores, and periods only), rejecting anything containing `<`, `>`, quotes, or
other HTML-special characters before it's ever accepted, in addition to (not instead of) React's
existing automatic escaping of all rendered text. A regression test renders the greeting with a
value containing `<img src=x onerror=...>`-style input and asserts it appears as inert text, never
executed, to make the existing "no `dangerouslySetInnerHTML`, ever" rule concrete for this new
surface.

**Why now:** The greeting and the `People` link both need "was the login form just submitted
successfully" to exist as real state, which doesn't exist anywhere in the app yet; this step
introduces it once, and Step 5 (protected routes) reuses it rather than inventing a second
mechanism.

**Decision needed before implementation:** This step requires an amendment to a specific line in
`AGENTS.md` ("never imply a logged-in/session state that doesn't exist"), written when no session
of any kind existed. The amendment keeps every substantive protection that line was written for
(still no real credential check, no password storage, no backend, no persistent account) while
being accurate about the fact that a lightweight, explicitly-labeled demo session is now a real,
if trivial, part of the app. This was applied as part of landing this step; see the `AGENTS.md`
diff in that commit for the exact wording.

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

### Step 9: Final UI/UX and accessibility polish

**Status:** Planned

**What:** A whole-app pass once every feature above is in place: spacing, typography, button and
link consistency, form and table styling, notification appearance, responsive behavior, color and
border consistency, and a repeat of the Phase 1 axe-core/keyboard-navigation audit against the
larger surface area this phase adds (header, footer, toasts, static pages, session UI).

**Why now:** Same reasoning as Phase 1's equivalent closing steps: polishing against a moving
target means redoing it, so this runs last.
