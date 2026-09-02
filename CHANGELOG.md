# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). The project reached `1.0.0`
once the planned feature set (see `docs/development-plan.md`) was complete and stable; from here,
patch releases are fixes, minor releases are backward-compatible feature additions, and a major
bump is reserved for a breaking change. Starting with the Phase 2 UI/UX pass (see
`docs/phase-2-development-plan.md`), each completed step gets its own version bump as it lands,
rather than batching several steps under one release.

## [Unreleased]

## [1.13.0] - 2026-09-02

### Added

- Per-page document titles and meta tags (`src/shared/hooks/usePageMeta.ts`): every route now sets
  its own `document.title` (as `<page title> | Star Wars Portal`, or just `Star Wars Portal` on the
  home page), `<meta name="description">`, Open Graph tags (`og:title`, `og:description`,
  `og:image`, `og:url`, `og:type`, `og:site_name`), and Twitter Card tags, covering the home page,
  login, the people table, About, Privacy Policy, Terms and Conditions, and the 404 page.
- A shared Open Graph share image (`public/og-image.png`, 1200x630): the site's own header
  wordmark and Rebel Alliance badge on the app's dark brand background, so links shared to social
  platforms and chat apps show a branded preview instead of a blank one.

### Note

There's no server in this app, so `usePageMeta` writes these tags to the DOM on the client:
they're correct for the visible browser tab and for anything that runs JavaScript before reading
the page, but a link-unfurling bot that only fetches the raw `index.html` (many social share
previews) sees the same static defaults for every route, since a client-only SPA has no per-route
server-rendered HTML to serve instead. `index.html` now carries those static defaults (description,
`og:*`, `twitter:*`, all pointing at the home page and the shared share image) so that fallback is
still a sensible one rather than empty.

## [1.12.0] - 2026-09-02

### Added

- A favicon showing the Rebel Alliance insignia (from [svgrepo.com](https://www.svgrepo.com/)),
  replacing the plain yellow star placeholder used since Phase 1.

### Changed

- The header's plain-text "Star Wars Portal" title replaced with the official Star Wars wordmark
  (also from svgrepo.com), inlined as SVG in `src/app/Header.tsx` rather than an `<img>` so its
  path can use `fill="currentColor"` and switch between light and dark automatically, the same way
  every other icon in the header already does; the source SVG's solid white background rect was
  dropped for this (an inline icon on a themed header doesn't need one). The brand link keeps its
  accessible name via `aria-label="Star Wars Portal"` since the logo itself carries no visible text
  for assistive tech to read. The source file's square `0 0 192.756 192.756` viewBox left over
  half of it empty above and below the actual wordmark, which made the sized-by-height logo look
  tiny with a lot of surrounding whitespace; the viewBox was cropped to the wordmark's actual
  bounding box (measured with `getBBox()`, plus a little breathing room) so it fills its box
  properly.

## [1.11.0] - 2026-09-02

### Added

- A dedicated home page (`/`, `src/pages/HomePage.tsx`): a heading, an illustration
  (`public/space-exploration.svg`, from [undraw.co](https://undraw.co/)), and a short description
  of what the app does. The login form moved off `/` and now lives at its own `/login` route.
- `src/app/RedirectIfAuthenticated.tsx`: a route guard for `/login`, the mirror image of the
  existing `ProtectedRoute`. A visitor who already has a demo session and navigates to `/login`
  directly (e.g. by URL or a stale bookmark) is redirected to the home page with a toast
  ("You're already logged in."), instead of being shown the login form again.

### Changed

- `ROUTES.login` changed from `/` to `/login`; a new `ROUTES.home` (`/`) was added. The header's
  brand link and the 404 page's link now point at the home page instead of the login page.

### Fixed

- Caught during manual testing: `RedirectIfAuthenticated`'s first implementation re-read the
  session on every render, which raced `LoginForm`'s own submit handler. That handler calls
  `login()` (setting the session) and then `navigate('/table')` in the same function, but those
  two navigations don't land in the same React commit, so the guard's reactive check saw the
  session become non-null while the route was still `/login` and redirected the freshly logged-in
  user to the home page instead of letting them reach `/table`. Fixed by capturing "was there
  already a session when this route was entered" once, via a lazy `useState` initializer, instead
  of re-checking on every render: this catches a direct visit to `/login` while signed in (the
  actual intent) without reacting to signing in from the very form it wraps. Covered by a
  regression test that fills out and submits the real `LoginForm` inside the guard and asserts it
  reaches `/table`, not `/`.

## [1.10.0] - 2026-09-02

### Added

- An icon next to the header's `Login` link, matching the icon-plus-label pattern `People` and
  `Log out` already used.
- A thin vertical divider in the header's logged-in nav, separating the primary nav item
  (`People`) from the account-related items (the username greeting and `Log out`), which are now
  grouped together after it (previous order had the greeting first, with no divider).

### Fixed

- The header's `Log out` button used an icon that actually depicts an arrow entering a box (the
  conventional "sign in" glyph), not exiting one, because no `Login` icon existed yet to reveal the
  mismatch. Reused that icon (now `LoginIcon`) for the new `Login` link, where it's the correct
  glyph, and added a properly mirrored `LogOutIcon` (arrow exiting the box) for the `Log out`
  button.

## [1.9.1] - 2026-09-02

### Fixed

- Every button in the app showed the browser's default (arrow) cursor on hover instead of a
  pointer, since native `<button>` elements don't get a pointer cursor by default in Chrome/
  Firefox (unlike `<a>` links, which already did) and neither Tailwind's preflight nor this app's
  own styles added one. Fixed by adding `cursor-pointer` to `src/shared/focusRing.ts`'s
  `INTERACTIVE_CLASS_NAME`, the class already shared by every button and link in the app, so the
  fix applies everywhere at once. Disabled buttons are unaffected: their existing
  `disabled:cursor-not-allowed` still wins.

## [1.9.0] - 2026-09-02

### Added

- `src/shared/focusRing.ts` (`INTERACTIVE_CLASS_NAME`): a single, consistent focus-visible
  (a solid sky-colored outline, not Tailwind's `ring` utilities, so it reads correctly against
  any background without a matching `ring-offset-color`) and hover-transition treatment, applied
  to every interactive control across the app that didn't already define its own: the header's
  nav links and Log out button, the theme and unit segmented controls, Pagination's Previous/Next
  buttons, the login form's submit and password-visibility buttons, the Modal and Toast close/
  dismiss buttons, the footer's links, and the 404 page's link.
- A three-tier elevation (shadow) scale for the app's floating/overlay surfaces: the sticky header
  gained a subtle `shadow-sm`, the blocking `Modal` (used by the offline dialog) gained a
  prominent `shadow-xl`, alongside the toast stack's existing `shadow-lg`.

### Changed

- The login form's input focus ring (`border`/`ring` color on focus) changed from neutral slate to
  sky, matching the new focus-visible accent color used everywhere else, so "this is focused"
  reads as one consistent visual language across inputs, buttons, and links.

### Fixed

- The first pass of the new focus-visible treatment used `outline-none` (unconditionally) plus
  `focus-visible:outline-2` (width only), assuming the latter would restore a visible outline at
  focus time. It didn't: Tailwind v4's `outline-<n>` utilities read `outline-style` from a shared
  `--tw-outline-style` custom property that Tailwind's own base layer sets to `solid` on every
  element, and `outline-none` overwrites that same property to `none` unconditionally, not scoped
  to `:focus-visible`. No `focus-visible:` utility ever writes that property back, only reads it,
  so once set to `none` it stayed `none` even while focused, and the ring was invisible. Fixed by
  removing `outline-none` entirely: leaving the property at Tailwind's own default (`solid`) and
  applying width/offset/color only within `focus-visible:` is enough on its own, since the CSS-spec
  initial `outline-style` (`none`, absent any authored outline utility) already keeps it invisible
  outside `:focus-visible`. Caught by computing `getComputedStyle(...).outlineStyle` in a headless
  browser check rather than trusting a screenshot alone, since the bug was invisible-by-definition.

## [1.8.0] - 2026-09-01

### Added

- Unit conversion for the people table: `features/people/units.ts` (`formatHeight`/`formatMass`),
  parsing SWAPI's centimeter/kilogram string values (handling a comma, e.g. `"1,358"`, and
  non-numeric values like `"unknown"`/`"n/a"`, which are shown as-is) and formatting them for
  display in the selected unit. `features/people/UnitToggle.tsx` (a small, generic segmented
  control, the same visual pattern as `ThemeToggle`) lets a visitor switch height between
  centimeters and meters and mass between kilograms and pounds; `PeopleTable.tsx` renders one of
  each above the table and updates the `Mass (<unit>)` / `Height (<unit>)` column headers and
  every cell immediately, entirely client-side, with no new network request. The original API
  value and unit remain the single source of truth; switching units only changes how the
  already-fetched data is displayed.
- `features/people/units.test.ts` and `PeopleTable.test.tsx` (the default cm/kg display, switching
  to m/lb updates both the headers and the cell values).

## [1.7.0] - 2026-09-01

### Added

- Static content pages: `src/pages/AboutPage.tsx`, `PrivacyPolicyPage.tsx`, and `TermsPage.tsx`
  (routed at `/about`, `/privacy`, and `/terms`), all sharing a new
  `src/shared/components/StaticPage.tsx` layout (consistent heading, paragraph, list, code, and
  link styling via Tailwind descendant selectors, reused by exactly these three pages). The
  Privacy Policy and Terms content describes the app's actual behavior plainly (no backend, no
  real accounts, no cookies or tracking, what `sessionStorage`/`localStorage` are used for) rather
  than generic boilerplate that would misrepresent it; the About page credits the public SWAPI and
  links to the project's GitHub repository.
- Footer navigation: `src/app/Footer.tsx` gained a `nav aria-label="Footer"` linking to all three
  new pages, above the existing copyright line.

## [1.6.0] - 2026-09-01

### Added

- Toast notification system: `src/shared/toast/` (`toastContext.ts`, `ToastProvider.tsx`,
  `useToast.ts`), a dependency-free `showToast(message, variant?)` API backed by a small React
  Context (justified the same way as the demo session: multiple independent callers, one visible
  stack rendered near the root in `App.tsx`). Toasts auto-dismiss after five seconds or on a
  manual close, stack bottom-center on narrow screens and bottom-right from `sm` up, and use
  `role="alert"` for the `error` variant and `role="status"` for `info`/`success` so they're
  announced accessibly without extra `aria-live` wiring.
- `src/app/ProtectedRoute.tsx` now shows a toast ("Please log in to access that page.") when it
  redirects an unauthenticated visitor away from `/table`, so the redirect doesn't happen silently.

### Fixed

- A first pass of the `ProtectedRoute` toast showed twice under React StrictMode (development
  only): the effect that calls `showToast` was double-invoked by StrictMode's intentional
  mount/cleanup/remount cycle, producing two stacked toasts for one redirect. Fixed with a
  `useRef` guard rather than an effect cleanup, since a cleanup that dismissed the toast would
  also fire on `ProtectedRoute`'s real unmount, which happens almost immediately after the
  redirect in both development and production, clearing the toast right after showing it. A new
  test renders under `<StrictMode>` to catch a regression here.

## [1.5.0] - 2026-09-01

### Added

- Protected routes: a new `src/app/ProtectedRoute.tsx` wraps `/table`'s route element in
  `src/app/router.tsx`, redirecting (`<Navigate to={ROUTES.login} replace>`) a visitor with no
  demo session (from Step 4's `useSession`) back to `/`, whether they land on `/table` directly, via
  a bookmark, or with a `?page=` search param. This is a navigation/UX guard, not a security
  boundary: there is no server, and the character data behind `/table` isn't actually protected.
  `ProtectedRoute.test.tsx` covers both the redirect (no session) and the pass-through (a session
  exists) cases.

## [1.4.0] - 2026-09-01

### Added

- Lightweight demo login session: on a valid login submit, `features/auth/LoginForm.tsx` now
  records the submitted username via a new `features/auth/SessionProvider.tsx`
  (`SessionContext`/`useSession`, a small React Context), held only in `sessionStorage` (not
  `localStorage`, so it doesn't outlive the tab) and read back through a Zod schema, same as every
  other trust-boundary read in this project. The header (`src/app/Header.tsx`) now reflects it: a
  logged-out visitor still sees `Login`; a logged-in visitor sees a greeting
  (`features/auth/Greeting.tsx`, "Hi, `<username>`!", hidden below the `sm` breakpoint to keep the
  header from overflowing on narrow screens), a `People` link to `/table`, and a `Log out` action,
  both of the latter icon-only below `sm` and icon-plus-text at `sm` and up.
- Username input hardening: `features/auth/loginSchema.ts`'s username field gained a character
  allowlist (letters, digits, spaces, hyphens, underscores, and periods only), rejecting `<`, `>`,
  quotes, and other HTML-special characters outright. This is defense in depth on top of (not a
  replacement for) React's automatic escaping of rendered text, since the username is now rendered
  back into the UI via the header greeting for the first time. A new `Greeting.test.tsx` renders
  the greeting with a hostile, `<img onerror=...>`-style value and asserts it's shown as inert
  text, never executed.
- New `features/auth/session.ts` (`getSession`/`setSession`/`clearSession`) and
  `features/auth/session.test.ts` (round-trip, corrupted JSON, a stored username that fails the
  character allowlist, and a missing field, all treated as a miss, mirroring
  `shared/cache/localStorageCache.ts`'s existing conventions).

### Changed

- `AGENTS.md`'s "What this project is" and "Security principles" sections were amended to
  describe this session accurately: still no real credential check, no password storage, no
  backend, and no persistent account, but a real (if intentionally lightweight and
  tab-scoped) demo session now exists for UI personalization and navigation, not as a security
  boundary.

## [1.3.0] - 2026-09-01

### Added

- Password visibility toggle: `features/auth/LoginForm.tsx` gained a show/hide button inside the
  password field (an inline eye / eye-slash SVG, `type="button"` so it never submits the form, a
  44x44px touch target, and an `aria-label` of "Show password"/"Hide password" that flips with the
  field's `type` between `password` and `text`). A new `LoginForm.test.tsx` case exercises the
  toggle.

### Fixed

- `LoginForm.test.tsx`'s two existing tests queried the password field with
  `getByLabelText(/password/i)`, which became ambiguous once the new toggle button's
  `aria-label="Show password"` also matched that pattern; changed to an exact
  `getByLabelText('Password')` match.

## [1.2.0] - 2026-09-01

### Added

- Theme system upgrade: `shared/hooks/useTheme.ts` now models the theme as a three-way
  `ThemePreference` (`light`/`dark`/`system`) plus a separately-tracked `ResolvedTheme`, instead of
  a two-way `light`/`dark` value. `system` (now the default when nothing is stored, replacing the
  previous "read the OS preference once at mount" fallback) subscribes to
  `matchMedia('(prefers-color-scheme: dark)')`'s `change` event, so it reacts live to an OS-level
  theme change without a page reload. `shared/components/ThemeToggle.tsx` is now a three-button
  segmented control (`role="group"`, each option a `button` with `aria-pressed`) instead of a
  single sun/moon toggle.

### Changed

- `src/app/Header.tsx`: the brand link shrinks from `text-lg` to `text-base` below the `sm`
  breakpoint (and drops to a tighter nav gap/padding) to keep the wider three-option theme control
  from wrapping the header onto two lines at 360px.

## [1.1.0] - 2026-09-01

### Added

- App shell: `src/app/Header.tsx` (a sticky top app bar with the site name, a Login nav link, and
  the theme toggle) and `src/app/Footer.tsx` (a copyright notice whose year is computed from the
  current date, so it never needs a manual update), composed by a new `src/app/Layout.tsx` and
  rendered around every route via a nested layout route in `src/app/router.tsx`.

### Changed

- `shared/components/ThemeToggle.tsx` moved from a fixed, floating top-right button into the new
  header, losing its `fixed` positioning classes accordingly.
- `LoginPage.tsx`, `TablePage.tsx`, and `NotFoundPage.tsx` no longer render their own full-height
  `<main>` background/text color classes; those are now set once on `body` in `src/index.css`, and
  each page's `<main>` grows to fill the space between the header and footer instead
  (`flex flex-1` in place of `min-h-svh`).

## [1.0.0] - 2026-09-01

### Added

- Routing skeleton: `react-router-dom` wired up via `BrowserRouter` in `main.tsx`, named route
  path constants in `src/app/routes.ts`, and `src/app/router.tsx` rendering placeholder
  `LoginPage` (`/`), `TablePage` (`/table`), and a catch-all `NotFoundPage`.
- Login form: `features/auth/loginSchema.ts` (Zod, username and password required, 4 to 30
  characters) and `features/auth/LoginForm.tsx` (React Hook Form + `zodResolver`), rendered by
  `LoginPage`. The submit button is disabled until the form is valid; a valid submit navigates to
  `/table`. Client-side format validation only, no authentication.
- API layer for the upcoming data table: `shared/api/httpClient.ts` (a generic `fetchJson` with
  `AbortSignal` support and a typed `ApiError`) and `features/people/people.schema.ts` /
  `people.types.ts` (Zod schemas and inferred types for the SWAPI person and paginated list
  response, narrowed to the five fields the table will render). Not wired into any page yet.
- Basic data table: `features/people/usePeople.ts` (fetches SWAPI page 1, holding
  loading/success/error state as a discriminated union) and `features/people/PeopleTable.tsx`
  (a semantic `<table>` of name, mass, height, hair color, and skin color, with a loading line and
  a generic, non-technical error message), rendered by `TablePage` at `/table`. No pagination or
  caching yet.
- Pagination: `features/people/Pagination.tsx` (Previous/Next controls, disabled at the first/last
  page); `usePeople` now fetches the page given to it and reports whether a next/previous page
  exists; the page number lives in the `?page=` URL search param (`TablePage`, validated with Zod,
  defaulting to `1`), so refresh, direct links, and browser back/forward all work.
- `localStorage` caching: `shared/cache/localStorageCache.ts` (`getCached`/`setCached`, Zod-validated
  reads with a TTL, any invalid or expired entry treated as a cache miss rather than an error);
  `usePeople` now caches each fetched page for five minutes and serves a cache hit instantly
  without a network request.
- Stale-data fallback on fetch failure: `shared/cache/localStorageCache.ts` gained `getStale`
  (reads a cache entry ignoring its TTL); when a network fetch fails, `usePeople`'s error state now
  carries that page's last cached data (if any), and `PeopleTable`/`TablePage` render it below the
  error message, with pagination still available, instead of showing a blank error.
- Offline detection and modal: `shared/hooks/useOnlineStatus.ts` (`navigator.onLine`, kept in sync
  via the `online`/`offline` events), `shared/components/Modal.tsx` (a generic accessible dialog
  built on the native `<dialog>` element), and `app/OfflineModal.tsx` (the offline-specific modal,
  wired app-wide in `App.tsx`), shown whenever the browser reports no connection and re-armed for
  the next disconnect after being dismissed once the connection returns.
- Light and dark theme: a class-based `dark:` Tailwind variant (`src/index.css`), a Zod-validated,
  `localStorage`-persisted `shared/hooks/useTheme.ts` (defaulting to the OS `prefers-color-scheme`
  when there is no stored preference), and a fixed, app-wide toggle button rendered from
  `App.tsx` (`shared/components/ThemeToggle.tsx`). `dark:` classes were added across every
  existing page and component (`LoginPage`, `TablePage`, `NotFoundPage`, `LoginForm`,
  `PeopleTable`, `Pagination`, `Modal`, `OfflineModal`) with no structural changes.
- Testing: Vitest + React Testing Library (`vitest.config.ts`, `src/test/setup.ts`), a `npm test`
  script, and an initial test suite covering `loginSchema`'s validation boundaries (4 and 30
  character limits on both fields), `localStorageCache`'s `getCached`/`getStale` (TTL expiry,
  corrupted JSON, and schema-invalid data all treated as a miss), the new
  `features/people/pageParam.ts` `?page=` parsing helper (extracted out of `TablePage.tsx` so it
  can be tested directly and to satisfy the `react-refresh/only-export-components` lint rule), and
  a smoke test of `LoginForm`'s submit button enable/disable behavior.

### Changed

- Responsive styling pass: the offline modal now keeps a guaranteed minimum side margin on narrow
  viewports instead of touching both edges, its close button grew to a proper ~44x44px touch
  target, and the pagination Previous/Next buttons and the login form's inputs/submit button grew
  from ~40-42px tall to ~44-46px tall to comfortably clear the same touch-target guideline.
- Accessibility pass: the people table now has a real programmatic accessible name via a visually
  hidden `<caption>`, and the shared `Modal` component's focus trap now wraps Tab/Shift+Tab between
  its first and last focusable elements as a fallback, fixing a case (the offline modal's single
  close button) where keyboard focus could otherwise escape to the page body.

### Fixed

- Offline modal appearing pinned to the top-right corner instead of centered: Tailwind's preflight
  resets `margin: 0` on all elements, which overrode the browser's built-in centering for the
  native `<dialog>` element. Restored with an explicit `m-auto` on `shared/components/Modal.tsx`'s
  `<dialog>`.
- Leftover Vite scaffold placeholders found during the final cleanup pass: `index.html`'s `<title>`
  still read the raw package name (`react-star-wars-portal`) instead of a real title, and
  `public/favicon.svg` was still the default Vite logo. Replaced with `Star Wars Portal` and a
  small hand-authored star icon respectively.

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

[unreleased]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.9.0...HEAD
[1.9.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/PetyoLazarov92/react-star-wars-portal/releases/tag/v0.1.0
