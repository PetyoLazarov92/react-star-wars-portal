# Cursor styling on buttons and links

_Session date: 2026-09-02_

## Prompt 1

> Could you check all the buttons and links throughout the app and make sure they have the appropriate pointer cursor by default? I’ve noticed that for some buttons and links, the cursor doesn’t change when I hover over them

**Actions:**

- Ran `grep -rn "cursor-pointer\|cursor-not-allowed\|cursor-" ./src --include="*.tsx" --include="*.ts" --include="*.css"`
- Ran `grep -rln "<button\|<Link\|<NavLink\|role=\"button\"" ./src --include="*.tsx"`
- Ran `grep -rn "INTERACTIVE_CLASS_NAME" ./src --include="*.tsx" --include="*.ts"`
- Ran `grep -rn "cursor" ./node_modules/tailwindcss/*.css ./node_modules/tailwindcss/theme.css 2>/dev/null | head -30 …` (multi-line/long command, trimmed)
- Ran `grep -n "button" ./node_modules/tailwindcss/preflight.css | head -30`
- Ran `cd ./src && grep -n "<button\|<Link\|<NavLink" -A2 features/people/Pagination.tsx features/auth/LoginForm.tsx features/people/UnitToggle.tsx app/Header.tsx shar …` (multi-line/long command, trimmed)
- Edited `src/shared/focusRing.ts`
- Ran `grep -rn "onClick=" --include="*.tsx" | grep -v "\.test\.tsx"`
- Ran `cd . && npm run typecheck && npm run lint`
- Ran `cd . && which node npx yarn pnpm 2>&1; ls -la | grep -i lock`
- Ran `ls -la ~/.nvm 2>/dev/null; find / -maxdepth 4 -iname "node" -type f 2>/dev/null | head -5; echo $PATH`
- Ran `source ~/.nvm/nvm.sh && nvm current && which node npm && npm run typecheck && npm run lint`
- Ran `source ~/.nvm/nvm.sh && npm run build`
- Used `Skill`
- Ran `find . -path ./node_modules -prune -o -iname "SKILL.md" -print 2>/dev/null; which chromium-cli 2>/dev/null; ls /tmp/claude-1000/bundled-skills/2.1.251/dfe75fa06 …` (multi-line/long command, trimmed)
- Ran `which chromium-cli 2>&1; command -v chromium-cli 2>&1`
- Ran `source ~/.nvm/nvm.sh; node -e "console.log(require.resolve('playwright'))" 2>&1; npx --yes playwright --version 2>&1 | head -5`
- Ran `source ~/.nvm/nvm.sh && (npm run dev > /tmp/scratchpad/devserver.log 2>&1 &) && sleep 1 && timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null 2 …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npx --yes playwright install chromium --with-deps 2>&1 | tail -20`
- Ran `source ~/.nvm/nvm.sh && npx --yes playwright install chromium 2>&1 | tail -20`
- Wrote `/tmp/scratchpad/check-cursors.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && npx --yes -p playwright node check-cursors.mjs 2>&1 | tail -60`
- Edited `/tmp/scratchpad/check-cursors.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && npx --yes -p playwright node check-cursors.mjs 2>&1 | tail -80`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && npm init -y >/dev/null 2>&1 && npm install playwright 2>&1 | tail -20`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-cursors.mjs 2>&1`
- Ran `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill`
- Ran `grep '"version"' package.json && head -40 CHANGELOG.md`
- Ran `grep -n "cursor\|Step\|##" docs/phase-2-development-plan.md | tail -60`
- Edited `package.json`
- Edited `CHANGELOG.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `grep -n "1\.9\.0\|cursor\|focusRing" ./README.md`
- Ran `grep -n "1\.9\.0" -B2 -A2 ./README.md`
- Edited `README.md`
- Ran `grep -n "1\.9\.1" ./README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format:check 2>&1 | tail -20`

**Response:**

I'll scan the codebase for all buttons and interactive links to check cursor styling.

Good, that confirms every button/link in the app funnels through `INTERACTIVE_CLASS_NAME`. That's the single spot to fix. I'll add `cursor-pointer` there, keeping the existing `disabled:cursor-not-allowed` overrides intact (cursor-pointer applies before that, and `disabled:` still wins due to specificity/order in Tailwind).

All accounted for — every clickable control in the app is covered. Now let's verify the change type-checks, lints, and builds, and confirm the fix visually.

Both pass. Now let's build and do a quick visual check in the browser.

Build succeeds. Let me quickly verify the fix visually with the dev server.

Now let's write a small script to check computed cursor style on every button and link across the app's pages.

All buttons and links now show a pointer cursor, and disabled buttons correctly show `not-allowed`. Let me clean up.

Now let's bump the version and update the changelog and plan doc.

Now let's add a note to the phase-2 plan's Step 9 section documenting this post-release fix, following the existing precedent there.

Now update the focusRing.ts line comment in the tree listing to mention cursor-pointer, and re-run checks.

That matches the existing wrapped-comment style used elsewhere (e.g. `usePeople.ts`, `localStorageCache.ts`). Now let's re-run the checks to confirm everything's still green after all doc edits.

Everything's clean. Here's a summary:

## Fix
Native `<button>` elements don't get a pointer cursor by default in Chrome/Firefox (only `<a>` links do), and neither Tailwind's preflight nor the app's own styles set one. Since every button and link in the app already shares [`src/shared/focusRing.ts`](src/shared/focusRing.ts)'s `INTERACTIVE_CLASS_NAME`, adding `cursor-pointer` there fixed it everywhere in one place, without touching individual components.

## Verification
Ran the dev server under headless Chrome and checked `getComputedStyle(el).cursor` on every `<button>` and `<a href>` across the login page, table page, About page, and 404 page: all now report `pointer`, while the disabled Pagination `Previous` and login submit buttons correctly still report `not-allowed` (their `disabled:cursor-not-allowed` still wins). `typecheck`, `lint`, `format:check`, and `build` all pass.

## Docs updated (per this repo's conventions)
- `package.json` / `CHANGELOG.md`: patch bump to `1.9.1`.
- `docs/phase-2-development-plan.md`: noted as a post-release fix to Step 9.
- `README.md`: version references and the `focusRing.ts` tree comment.

Suggested commit:
```
fix(a11y): add cursor-pointer to shared interactive control class
```

## Prompt 2

> Let’s also add an icon next to the Login link.
>
> For the logged-in state, let’s separate the greeting with the username from the main navigation. For example, after logging in, we could have the People link first, followed by a divider, then the greeting with the username and the Logout link.

**Actions:**

- Ran `find ./src -iname "*Header*"`
- Ran `grep -rln "Header\|Log out\|People\b" ./src --include="*.test.tsx"`
- Edited `src/app/Header.tsx`
- Edited `src/app/Header.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -30 && npm run build`
- Ran `source ~/.nvm/nvm.sh && (npm run dev > /tmp/scratchpad/devserver.log 2>&1 &) && timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null 2>&1; do sle …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/screenshot-header.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node screenshot-header.mjs 2>&1`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill`
- Edited `docs/phase-2-development-plan.md`
- Edited `package.json`
- Edited `CHANGELOG.md`
- Ran `grep -n "1\.9\.1\|1\.9\.0" ./README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `grep -n "Log out\|Login\|Greeting\|greeting\|People link" ./README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -15 && npm run build`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5 && npm run format:check && npm test -- --run 2>&1 | tail -15 && npm run build`
- Ran `grep -n "Step 10" -A 30 ./docs/phase-2-development-plan.md | head -40`
- Ran `rm -f /tmp/scratchpad/*.png`

**Response:**

Let's review the full file and check formatting/lint/types.

Good, just line-wrapping. Now let's build and run tests to confirm nothing broke.

All checks pass. Now let's visually verify in the browser.

Login icon looks good. Let's check the logged-in states.

People, divider, greeting, and Log out with correctly-mirrored icons (arrow entering for Login, arrow exiting for Log out). Let's check mobile and dark mode too.

The divider renders fine on mobile too, separating People from the account actions. Let's check dark mode.

Dark mode looks correct too. Let's clean up and stop the dev server.

Now update `package.json`, `CHANGELOG.md`, and `README.md`.

This describes the old order and lacks the divider/icon mention. Let's update it to reflect the new layout.

Now let's re-run full verification.

Good, formatting looks correct. Everything's now consistent and verified. Let's clean up scratchpad artifacts and finalize.

## Summary

**Header changes** (`src/app/Header.tsx`):
- Added a `LoginIcon` next to the `Login` link, matching the icon+label pattern `People`/`Log out` already used.
- Reordered the logged-in nav to `People` → a thin decorative divider → the username greeting → `Log out`.
- Along the way I found the existing `LogOutIcon` was actually lucide's "sign-in" glyph (arrow entering a box), mismatched to the `Log out` button — it had never been caught because there was no `Login` icon to compare against. Renamed it to `LoginIcon` (where it's correct) and added a properly mirrored `LogOutIcon` (arrow exiting the box).

Verified visually via headless Chrome screenshots at desktop/mobile widths and in both themes — the divider and icons render correctly everywhere; `typecheck`, `lint`, `format:check`, all 71 tests, and `build` pass.

**Docs updated** per this repo's conventions: `package.json`/`CHANGELOG.md` bumped to `1.10.0` (minor, new UI addition), a new Step 10 in `docs/phase-2-development-plan.md`, and `README.md`'s header description and version references.

Suggested commit:
```
feat(app): add Login icon and group logged-in nav with a divider

fix(app): correct mismatched Login/Logout header icons
```

## Prompt 3

> Could you move the login form so that it’s displayed on the Login route, and use the SVG image for the home page instead?
>
> For the home page, let’s create something nice and simple, with a heading, the image, and a short description or some basic information.
>
> Also, when a user is already logged in and tries to access the Login URL, redirect them to the home page and show a notification saying that they’re already logged in.

**Actions:**

- Ran `find src -iname "*.tsx" -o -iname "*.ts" | grep -v test | sort`
- Ran `find . -iname "*.svg" -not -path "*/node_modules/*"; ls ./public 2>/dev/null; ls ./src/assets 2>/dev/null`
- Ran `wc -c ./public/favicon.svg; head -c 300 ./public/favicon.svg; echo; grep -n "favicon" ./index.html`
- Ran `ls -la ./public/`
- Wrote `public/space-exploration.svg`
- Ran `find ./src -iname "*ProtectedRoute*"`
- Ran `grep -rn "ROUTES\.\|MemoryRouter\|initialEntries" ./src --include="*.test.tsx"`
- Ran `grep -rn "ROUTES\.login\|ROUTES\.home\|ROUTES\.table" ./src --include="*.tsx" --include="*.ts"`
- Ran `grep -rln "LoginPage\|Login page\|aria-current\|to={ROUTES" ./src --include="*.test.tsx"`
- Edited `src/app/routes.ts`
- Wrote `src/pages/HomePage.tsx`
- Wrote `src/app/RedirectIfAuthenticated.tsx`
- Edited `src/app/router.tsx`
- Edited `src/app/Header.tsx`
- Edited `src/pages/NotFoundPage.tsx`
- Ran `grep -rln "Go back to the login page\|NotFoundPage" ./src --include="*.test.tsx"`
- Wrote `src/app/RedirectIfAuthenticated.test.tsx`
- Ran `grep -n "export" ./src/features/auth/session.ts`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck 2>&1 | tail -30`
- Ran `source ~/.nvm/nvm.sh && npm run lint 2>&1 | tail -40 && npm run format:check 2>&1 | tail -10 && npm test -- --run 2>&1 | tail -50`
- Ran `source ~/.nvm/nvm.sh && npx vitest run src/app/ProtectedRoute.test.tsx 2>&1 | tail -60`
- Edited `src/app/ProtectedRoute.test.tsx`
- Edited `src/app/ProtectedRoute.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -40 && npm run build`
- Ran `ls -la ./dist/ | grep -i svg`
- Ran `source ~/.nvm/nvm.sh && (npm run dev > /tmp/scratchpad/devserver.log 2>&1 &) && timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null 2>&1; do sle …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-routes.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-routes.mjs 2>&1`
- Edited `/tmp/scratchpad/check-routes.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-routes.mjs 2>&1`
- Edited `/tmp/scratchpad/check-routes.mjs`
- Edited `/tmp/scratchpad/check-routes.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-routes.mjs 2>&1 | head -60`
- Edited `/tmp/scratchpad/check-routes.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-routes.mjs 2>&1 | grep -E "URL|session"`
- Wrote `/tmp/scratchpad/simple-login.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node simple-login.mjs 2>&1`
- Edited `src/app/RedirectIfAuthenticated.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node simple-login.mjs 2>&1`
- Edited `src/app/RedirectIfAuthenticated.tsx`
- Wrote `src/app/RedirectIfAuthenticated.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node simple-login.mjs 2>&1`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-routes.mjs 2>&1 | grep -E "URL|Toast|link"`
- Ran `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -30 && npm run build`
- Edited `src/app/RedirectIfAuthenticated.test.tsx`
- Edited `src/app/RedirectIfAuthenticated.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npx vitest run src/app/RedirectIfAuthenticated.test.tsx 2>&1 | tail -40`
- Ran `sed -n '1,40p' src/app/RedirectIfAuthenticated.tsx`
- Ran `cp src/app/RedirectIfAuthenticated.tsx /tmp/RedirectIfAuthenticated.tsx.bak && python3 - <<'EOF' …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npx vitest run src/app/RedirectIfAuthenticated.test.tsx 2>&1 | tail -40`
- Ran `cp /tmp/RedirectIfAuthenticated.tsx.bak src/app/RedirectIfAuthenticated.tsx && rm /tmp/RedirectIfAuthenticated.tsx.bak && grep -n "wasAuthenticatedOnEntry" src/ …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -20 && npm run build`
- Ran `grep -n "1\.10\.0\|1\.9\.1" ./README.md ./package.json ./CHANGELOG.md | head -20`
- Edited `package.json`
- Edited `CHANGELOG.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `README.md`
- Ran `grep -n "brand\|site name\|Star Wars Portal.*link\|home page" ./README.md`
- Edited `README.md`
- Ran `grep -n "LoginPage.tsx\|ProtectedRoute\|RedirectIfAuthenticated\|router.tsx\|routes.ts\|1\.10\.0\|1\.9\.1\|HomePage" ./README.md`
- Edited `README.md`
- Ran `grep -n "favicon\|^public" ./README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5 && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -20 && npm r …` (multi-line/long command, trimmed)
- Ran `rm -f /tmp/scratchpad/*.mjs /tmp/scratchpad/devserver.log …` (multi-line/long command, trimmed)
- Ran `git diff package-lock.json | head -30`
- Ran `git diff src/app/router.tsx src/app/routes.ts src/pages/NotFoundPage.tsx`

**Response:**

Good, that's unaffected. Now let's implement all the changes: routes, HomePage, RedirectIfAuthenticated guard, router wiring, Header/NotFoundPage link updates.

Now let's create the HomePage.

Now the reverse guard for the login route.

Now wire up the router.

Now update the Header's brand link to point home, and NotFoundPage's link to point home.

Good, matches. Now let's run the full check suite.

Now let's fix the Prettier formatting issue on HomePage.tsx and re-run the full suite.

That's just Prettier's line-wrap, consistent with expected output. Now let's re-run the full check suite.

Good, it's copied to `dist/`. Now let's manually verify the flows in the browser: home page, login redirect, already-logged-in redirect with toast, and 404 link.

Now let's rewrite the whole file with the fix.

Now remove the debug logging from LoginForm.tsx.

Now let's re-run the isolated login test to confirm the race is fixed.

Fixed. Now let's re-run the full route flow check and the test suite.

All flows work correctly now. Let's check the home page screenshot and run the full test/lint/build suite.

Redirected home with the toast, correct nav state. Now let's check the not-found page link and run the full checks + tests.

Everything checks out. Now let's stop the server and run the full validation suite.

Now let's verify this test actually catches the regression (temporarily revert the fix to confirm it fails) and then confirm it passes with the fix.

That's a deliberate temporary revert to verify the regression test catches the bug (I'll restore the fix right after).

Confirmed: the test correctly catches the regression. Now let's restore the fix.

Fix restored. Let's run the full suite one final time.

All 77 tests pass. Now let's update the project docs per this repo's conventions (README, CHANGELOG, phase-2 plan, version bump).

Now let's update the README to reflect the new routes, home page, and file structure.

Now let's make the edits.

Now let's update the file-tree section and version references.

Now let's re-run full validation once more after all doc edits.

Everything looks correct and complete. Here's a summary:

## Summary

- **`/login`**: the login form moved off `/` onto its own route (`LoginPage` unchanged internally).
- **`/`**: a new `HomePage` with a heading, the undraw.co illustration (`public/space-exploration.svg`, trimmed of an unneeded ~35KB embedded AI-provenance manifest, attribution attributes kept), and a short description.
- **`RedirectIfAuthenticated`**: a new guard (mirroring `ProtectedRoute`) wraps `/login` — a visitor with an existing session who navigates there directly gets redirected to `/` with a "You're already logged in." toast.
- Header brand link and the 404 page's link now point at the home page.

**Bug caught during manual verification**: the guard's first version re-read the session on every render, which raced `LoginForm`'s own `login()` + `navigate('/table')` call and sent freshly-logged-in users to `/` instead of `/table`. Fixed by capturing "was there already a session on entry" once via a lazy `useState` initializer. I verified the fix by temporarily reverting it and confirming the new regression test (which submits the real `LoginForm` through the guard) fails, then restored the fix and confirmed it passes.

All 77 tests pass, plus `typecheck`, `lint`, `format:check`, and `build`. Verified the full flow visually in headless Chrome (home page, login page, already-logged-in redirect + toast, 404 link) in both themes.

**Docs updated** per convention: version bumped to `1.11.0`, `CHANGELOG.md`, a new Step 11 in `docs/phase-2-development-plan.md`, and `README.md`.

Suggested commits:
```
feat(app): split login form onto /login, add a home page at /

fix(app): stop login-race from redirecting a fresh login back home
```

## Prompt 4

> Can you replace the title in the navigation with the attached logo? For this logo, you can remove the path that has a `#FFFFFF` fill and make the logo color change based on the theme. For the icon, use the other image with the icon.

**Actions:**

- Ran `grep -n "body\|text-slate\|@apply" ./src/index.css | head -20`
- Ran `grep -rln "Star Wars Portal" ./src --include="*.test.tsx" …` (multi-line/long command, trimmed)
- Edited `src/app/Header.tsx`
- Edited `src/app/Header.tsx`
- Wrote `public/favicon.svg`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check`
- Ran `source ~/.nvm/nvm.sh && npm test -- --run 2>&1 | tail -20 && npm run build`
- Ran `source ~/.nvm/nvm.sh && (npm run dev > /tmp/scratchpad/devserver.log 2>&1 &) && timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null 2>&1; do sle …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-logo.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-logo.mjs 2>&1`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill …` (multi-line/long command, trimmed)
- Edited `package.json`
- Edited `CHANGELOG.md`
- Ran `tail -15 ./docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `grep -n "1\.11\.0\|1\.10\.0\|site name\|Header.tsx.*#" ./README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5 && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -20 && npm r …` (multi-line/long command, trimmed)
- Ran `git -C . status --short`

**Response:**

Now let's implement. First, the header brand logo.

Now let's replace the favicon with the star_wars icon (using the second SVG as "the icon").

All green. Now let's visually verify the logo renders correctly and adapts to theme, plus the favicon.

Excellent, the logo renders black on light background. Let's check dark mode.

The logo correctly switches to white/light in dark mode via `currentColor`, no white background box, and the link has a proper accessible name. Now let's check the favicon renders correctly.

The favicon (Rebel Alliance insignia) renders cleanly too. Let's clean up and finalize.

Now let's update the docs per this repo's conventions.

Now let's add a Step to the phase-2 plan and update the README.

Now let's update the README's relevant mentions.

Now let's run the full validation suite once more.

All checks pass.

## Summary

- **Header title → logo**: replaced the plain-text "Star Wars Portal" title with the official Star Wars wordmark, inlined as SVG in [Header.tsx](src/app/Header.tsx) (not `<img>`) so its path can use `fill="currentColor"`, matching every other icon in the header and switching between light/dark automatically. Dropped the source SVG's white background rect. Added `aria-label="Star Wars Portal"` to the link so it keeps an accessible name now that it has no visible text.
- **Favicon → icon**: replaced [public/favicon.svg](public/favicon.svg) (previously a plain yellow star) with the Rebel Alliance insignia from the second SVG you attached, flattening its original nested-transform coordinates into one `<path>`, kept in the app's existing accent yellow.

I interpreted "the icon" as the browser-tab favicon, since it's the one other spot in the app that already uses a small standalone icon distinct from the header's title/logo — let me know if you actually meant it somewhere else (e.g. as a new nav icon) and I'll move it.

Verified visually in headless Chrome: the logo renders black in light mode, white in dark mode, no background box, correct accessible name; the favicon renders as the insignia. All 77 tests, typecheck, lint, format, and build pass. Docs updated per convention (version bumped to `1.12.0`, CHANGELOG, a new Step 12 in the phase-2 plan, README).

Suggested commit:
```
feat(app): replace header title with Star Wars logo, swap favicon
```

## Prompt 5

> the logo is too small, can you adjust it, to not hawe so much space around it

**Actions:**

- Ran `source ~/.nvm/nvm.sh 2>/dev/null; which node; node -e "console.log(1)" 2>&1`
- Ran `ls /tmp/scratchpad/node_modules 2>/dev/null | head; ls /tmp/scratchpad/ 2>/dev/null`
- Wrote `/tmp/scratchpad/bbox.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node bbox.mjs 2>&1`
- Edited `src/app/Header.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check`
- Ran `source ~/.nvm/nvm.sh && (npm run dev > /tmp/scratchpad/devserver.log 2>&1 &) && timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null 2>&1; do sle …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npm test -- --run 2>&1 | tail -15 && npm run build`
- Edited `CHANGELOG.md`
- Ran `grep -n "Step 12" -A 25 ./docs/phase-2-development-plan.md | head -30`
- Ran `grep -n "Step 12" -A 40 ./docs/phase-2-development-plan.md | tail -20`
- Edited `docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5 && npm run typecheck && npm run lint && npm run format:check`

**Response:**

Good, playwright's still there. Let's compute the exact bounding box of the logo path via a headless browser.

Now let's verify visually and check lint/type/tests still pass.

Much better — the logo now fills its box with no wasted space and looks proportionally larger. Let's check dark mode too.

Looks good in both themes. Let's clean up and run the full check suite once more.

This refinement is still part of the uncommitted `1.12.0` work, so I'll fold it into that same changelog entry and plan step rather than bumping the version again.

Now let's run the final formatting/lint pass to confirm everything's still clean.

All clean. Fixed the logo sizing: the source SVG's square viewBox left the wordmark occupying less than half its height, so cropping the viewBox to the wordmark's actual bounding box (via `getBBox()`) makes it fill its box properly — visibly bigger with no wasted space around it, in both light and dark mode. Docs (CHANGELOG, phase-2 plan) updated in place since this was a same-session refinement to the not-yet-committed `1.12.0` change.

## Prompt 6

> Could we make the table look more like it’s inside a container rather than taking up the full width of the page? I’d like it to have a max width and some spacing around it so the layout feels cleaner and more contained.

**Actions:**

- Ran `grep -n "bg-white\|dark:bg-slate\|border-slate\|rounded" ./src/shared/components/Modal.tsx | head -10`
- Edited `src/pages/TablePage.tsx`
- Edited `src/features/people/PeopleTable.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -15`
- Ran `source ~/.nvm/nvm.sh && (npm run dev > /tmp/scratchpad/devserver.log 2>&1 &) && timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null 2>&1; do sle …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-table.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-table.mjs 2>&1`
- Ran `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npm run build 2>&1 | tail -10`
- Ran `grep -n "\"version\"" ./package.json`
- Edited `package.json`
- Edited `CHANGELOG.md`
- Ran `tail -8 ./docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `grep -n "1\.12\.0\|1\.11\.0\|paginated table\|/table.*full\|w-full" ./README.md | head -20`
- Edited `README.md`
- Edited `README.md`
- Ran `grep -n "paginated SWAPI\|hair color, skin color\|Previous/Next controls" ./README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5 && npm run typecheck && npm run lint && npm run format:check && npm test -- --run 2>&1 | tail -15 && npm r …` (multi-line/long command, trimmed)

**Response:**

Now let's add the card treatment around the table itself in `PeopleTable.tsx`.

Now let's run the checks and verify visually.

All good. Let's check it visually across widths and both themes.

This looks great — the table is now a clean, contained card with a max width and proper margins on wide screens. Let's check dark mode and mobile.

Dark mode card contrast reads well too. Let's check mobile width.

Mobile still works correctly — the card scrolls horizontally within its bounds for the extra columns, no page-level overflow. Let's clean up and finalize.

Now let's update the docs per this repo's conventions.

Expected pre-existing pattern (Keep a Changelog headings repeat per release). Now let's add a Step to the phase-2 plan and update the README.

Now let's update the README references.

Now let's run the full validation once more.

All green.

## Summary

- **`TablePage`**: content (heading, table, pagination) now wraps in a centered `max-w-5xl` column instead of stretching to fill `<main>`, matching the width the header/footer already use.
- **`PeopleTable`**: the table itself now sits inside a bordered, rounded card (light/dark backgrounds, `rounded-lg border`), so it reads as a distinct contained surface rather than bare rows on the page — no shadow, since the app's elevation scale reserves that for floating surfaces (header, modal, toasts), and this table is a plain inline part of the page.

Verified visually at 1440px (evenly margined, centered card in both themes) and 375px (still scrolls horizontally within the card, no page-level overflow). All 77 tests, typecheck, lint, format, and build pass.

Docs updated per convention: version bumped to `1.13.0`, CHANGELOG, a new Step 13 in the phase-2 plan, README.

Suggested commit:
```
feat(people): contain the table in a centered, max-width card
```
