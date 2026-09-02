# Application styling and layout improvements

_Session date: 2026-09-01_

## Prompt 1

> I want to improve the overall styling and structure of the application. Let's approach this as a step-by-step plan, where each stage is a complete and working improvement before moving to the next one.
>
> First, I want to improve the general layout by adding a proper header and footer.
>
> The header should include a Login link and a theme switcher for light and dark mode. If it makes sense, we can also add an auto-detect option that follows the user's system theme. The theme switching should be implemented in a simple and clean way without introducing unnecessary dependencies.
>
> The footer should contain a copyright notice with the year updated automatically, so we don't have to manually change it every year.
>
> The whole application should continue following responsive design principles for all components, just as we have been doing so far. Everything should work well on mobile, tablet, and desktop.
>
> Please avoid adding additional libraries unless they are really necessary. I would prefer to keep the project structure as simple as possible and use the existing tools and dependencies. With minimal styling, let's aim for a modern Material Design look and feel. If using Sass and a proper build process would make the styling structure cleaner and easier to maintain, we can use it, but only if it actually provides value.
>
> I also want to introduce protected routes. For example, if a user tries to access the dashboard while not being logged in, they should be redirected to the home page. Please keep the implementation simple and consistent with the current application architecture.
>
> We can also implement a small notification system with toast notifications. This should not require another library. A simple custom implementation is preferred. The goal is to keep the structure lightweight while still having a polished and modern user experience.
>
> I would also like to add footer navigation with pages for:
>
> Privacy Policy
> Terms and Conditions
> About
>
> Please create appropriate content for these pages instead of leaving them empty. They should all follow the same visual style as the rest of the application, including consistent typography, headings, paragraphs, lists, spacing, and other text elements.
>
> Please make sure there are no em-dashes anywhere in the UI text or the content you add. Use commas, periods, parentheses, colons, or other appropriate punctuation instead.
>
> For the UI and UX in general, please follow current best practices and modern design patterns for applications like this. I want the result to feel clean, modern, consistent, and polished without overengineering it.
>
> There is also one thing I want us to review regarding the API data and the units used by the application.
>
> According to the API documentation, the relevant attributes are:
>
> name: string
> The name of this person.
>
> birth_year: string
> The birth year of the person, using BBY or ABY.
>
> eye_color: string
> The eye color of the person. It can be "unknown" or "n/a".
>
> gender: string
> The gender of the person. It can be "Male", "Female", "unknown", or "n/a".
>
> hair_color: string
> The hair color of the person. It can be "unknown" or "n/a".
>
> height: string
> The height of the person in centimeters.
>
> mass: string
> The mass of the person in kilograms.
>
> skin_color: string
> The skin color of the person.
>
> homeworld: string
> The URL of the planet resource.
>
> films: array
> An array of film resource URLs.
>
> species: array
> An array of species resource URLs.
>
> starships: array
> An array of starship resource URLs.
>
> vehicles: array
> An array of vehicle resource URLs.
>
> url: string
> The hypermedia URL of this resource.
>
> created: string
> The creation date in ISO 8601 format.
>
> edited: string
> The last edited date in ISO 8601 format.
>
> Based on this, we should review how the height and mass values are currently displayed in the table.
>
> For the table, I would like to add a simple unit selector or switcher. For example, for height we could allow the user to choose between centimeters and meters, and potentially other sensible units if they are useful.
>
> The important part is that unit conversion should happen in real time on the client side. We should not make additional API requests just because the user changes the selected unit. The original API value should be used as the source value and all conversions should happen locally.
>
> If there are other fields where unit conversion would make sense, such as mass, we can consider adding the same approach there as well. Please keep the implementation simple and avoid unnecessary abstraction.
>
> I want us to implement all of this as a sequence of clearly defined stages. Each stage should result in a complete, usable improvement that does not leave the application in a half-finished state.
>
> Suggested implementation plan:
>
> Stage 1: Review the existing application
>
> Before changing anything, inspect the current project structure, components, routing, styling approach, authentication logic, API integration, and existing AI instructions or project documentation. Make sure the implementation follows the conventions that are already established in the project.
>
> Also review the API documentation and confirm exactly which units are returned by the API and how they are currently handled in the application.
>
> Stage 2: Improve the application layout
>
> Implement the header and footer, including the Login link, theme switcher, automatic system theme detection if appropriate, copyright notice, and responsive layout.
>
> Make sure the layout works properly across mobile, tablet, and desktop.
>
> Stage 3: Implement the theme system
>
> Add light mode, dark mode, and auto mode if the current architecture allows it cleanly.
>
> The implementation should be lightweight and should not require an additional library unless there is a strong reason for one.
>
> Make sure the selected theme is handled consistently across the entire application.
>
> Stage 4: Protected routes and authentication flow
>
> Implement protected routes for authenticated areas such as the dashboard.
>
> If an unauthenticated user tries to access a protected route, redirect them to the home page.
>
> Keep this consistent with the existing authentication implementation rather than introducing a completely new architecture.
>
> Stage 5: Toast notification system
>
> Implement a small reusable toast notification system without adding another dependency.
>
> It should support the common use cases we need and have a clean, responsive appearance that works with both light and dark themes.
>
> Stage 6: Static pages and footer navigation
>
> Add the Privacy Policy, Terms and Conditions, and About pages.
>
> Populate them with reasonable, professional content and make sure all pages share the same design system and typography.
>
> Stage 7: Unit conversion in the table
>
> Review the current table implementation and add a simple unit selector for values such as height and mass where appropriate.
>
> The API returns height in centimeters and mass in kilograms, so these should be treated as the source units.
>
> Allow users to switch between supported units and update the displayed values immediately without making another API request.
>
> Keep the implementation simple and avoid unnecessary dependencies.
>
> Stage 8: Final UI and UX polish
>
> Once the functionality is complete, review the entire application as a whole.
>
> Look for inconsistencies in spacing, typography, buttons, links, forms, tables, cards, notifications, responsive behavior, colors, borders, and theme handling.
>
> Apply modern UI and UX best practices while keeping the design minimal and avoiding unnecessary styling complexity.
>
> Also check accessibility basics such as keyboard navigation, focus states, readable contrast, semantic HTML, and appropriate labels.
>
> Throughout all stages, please prioritize simplicity, maintainability, responsive design, and consistency with the existing codebase.
>
> Do not add libraries unless they are genuinely necessary.
>
> Before making significant architectural changes, explain why they are needed and whether there is a simpler alternative.
>
> Also, after completing each stage, give me a short summary of what was changed, what files were affected, and anything I should verify manually.
>
> For every completed stage, suggest an appropriate Git commit message based on the project's existing AI instructions and commit conventions. Please first inspect the AI documentation or instruction files in the project and follow their rules when suggesting commit messages.
>
> Do not move on to the next stage until the current stage is complete and the application remains in a working state.

**Actions:**

- Ran `find src -type f | sort && echo "---" && cat package.json`
- Ran `find . -iname "*phase-2*" -o -iname "*phase2*" 2>/dev/null; ls ./docs/`
- Wrote `src/app/Header.tsx`
- Wrote `src/app/Footer.tsx`
- Wrote `src/app/Layout.tsx`
- Edited `src/app/Footer.tsx`
- Edited `src/app/router.tsx`
- Edited `src/App.tsx`
- Edited `src/shared/components/ThemeToggle.tsx`
- Edited `src/index.css`
- Edited `src/pages/LoginPage.tsx`
- Edited `src/pages/TablePage.tsx`
- Edited `src/pages/NotFoundPage.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -60`
- Ran `which node nvm 2>&1; ls ~/.nvm 2>&1; cat ~/.bashrc 2>/dev/null | grep -i nvm; echo "---"; source ~/.nvm/nvm.sh 2>/dev/null && nvm current 2>&1; echo $PATH`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -40 && npm run build 2>&1 | tail -30`
- Used `Skill`
- Ran `d=$PWD; while :; do …` (multi-line/long command, trimmed)
- Ran `which chromium-cli 2>&1; cat /tmp/claude-1000/bundled-skills/2.1.251/6bba191e834615c63a15094d863a554e/run/examples/playwright.md 2>&1 | head -100`
- Ran `source ~/.nvm/nvm.sh 2>/dev/null; node -e "require.resolve('playwright')" 2>&1; npm ls playwright -g 2>&1; which chromium-cli; ls /usr/bin | grep -i chrom`
- Ran `find ./node_modules -maxdepth 1 -iname "*puppeteer*" -o -maxdepth 1 -iname "*playwright*" 2>/dev/null; node -e "console.log(typeof WebSocket)"`
- Ran `source ~/.nvm/nvm.sh && find ./node_modules -maxdepth 1 \( -iname "*puppeteer*" -o -iname "*playwright*" \) 2>/dev/null; node -e "console.log(typeof WebSocket)"`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Ran `mkdir -p /tmp/scratchpad/chrome-profile …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/cdp.mjs`
- Wrote `/tmp/scratchpad/check-layout.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-layout.mjs`
- Edited `/tmp/scratchpad/check-layout.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-layout.mjs`
- Edited `/tmp/scratchpad/check-layout.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-layout.mjs`
- Wrote `/tmp/scratchpad/check-toggle.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-toggle.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/debug.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node debug.mjs`
- Edited `/tmp/scratchpad/debug.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node debug.mjs`
- Edited `/tmp/scratchpad/check-toggle.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-toggle.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port=9222" 2>/dev/null; echo "check-done"`
- Ran `kill 63569 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Edited `CHANGELOG.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `docs/development-plan.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -20`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | grep -iE "readme|changelog|development-plan"; git status --short`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -15 && npm run build 2>&1 | tail -15`

**Response:**

I'll start with Stage 1: reviewing the current codebase, architecture, and conventions before touching anything.

Now I have a clear picture. Before implementing, one important thing surfaced during review that I want to flag early (it affects Stage 4 later, not Stage 2): AGENTS.md explicitly says to "never introduce fake session tokens, protected-route guards, or anything that implies a real security boundary exists" for this login flow, since there is no real authentication. Stage 4 of your plan literally asks for a protected-route redirect. I'll park that conflict for now and raise it again with options when we get to Stage 4, since it doesn't block Stage 2 or 3.

Starting Stage 2: header, footer, and a shared layout wrapper. I'll route both pages through a new `Layout` component (header + `<Outlet />` + footer) rather than duplicating chrome per page, and fold the theme toggle into the header instead of leaving it floating.

Now wiring the router to use the new `Layout`, updating `App.tsx`, `ThemeToggle`, and the three page components to fit inside it.

Good, npm is available via nvm; the bash tool's non-interactive shell just didn't source it.

All clean. Now tests and build, then a real browser check with the dev server.

Everything passes. Now let's actually look at it in a browser to verify responsive behavior and theme integration.

Both are up. Now writing a small CDP driver script to check the layout across viewports and themes.

Now let's check the mobile screenshot specifically to confirm the header doesn't overlap at 360px, and click the theme toggle to confirm it actually works interactively.

Good, confirmed. Now let's add the same wait-poll to the click test and rerun it.

Verified: theme toggle works from inside the header (dark → light, class + aria-label + localStorage all update together), with no console errors anywhere. Cleaning up the background dev server and headless Chrome now.

Both stopped. Now updating the living docs per project convention (README, development plan, CHANGELOG) before wrapping the stage.

Now updating the README's project structure diagram to include the new app-shell files.

Now let's check and update the `shared/components/ThemeToggle.tsx` line in the README structure listing, then add a new step to `docs/development-plan.md`.

Let's re-verify formatting and everything still passes after the doc edits.

Everything is formatted correctly. Final full verification pass:

## Stage 2 complete: header, footer, and app shell

**What changed:**
- New `src/app/Layout.tsx` wraps every route (via a nested layout `<Route>` in `router.tsx`) with a shared `Header` and `Footer`, so page chrome isn't duplicated per page.
- New `src/app/Header.tsx`: sticky app bar with the site name (links home), a `Login` nav link (uses `NavLink` so it gets a real `aria-current="page"` state), and the theme toggle.
- New `src/app/Footer.tsx`: copyright notice with the year computed from `new Date()`, so it never needs manual bumping.
- `ThemeToggle` moved out of a floating fixed button into the header (its `fixed` positioning classes were removed); `App.tsx` no longer renders it directly.
- `body` in `index.css` now owns the light/dark background/text colors that `LoginPage`, `TablePage`, and `NotFoundPage` used to each repeat; those pages now use `flex flex-1` instead of `min-h-svh` since the layout wrapper owns full-viewport height.
- No new dependencies. Considered Sass per your note, but Tailwind v4 already gives a complete build pipeline for this need, so it wasn't justified here.

**Verified:** typecheck, lint, format, all 27 tests, and build all pass. Also drove a real headless Chrome session over the DevTools protocol against the dev server: no horizontal overflow at 360/768/1280px, header/footer present with no overlap at 360px, correct `aria-current` on the Login link on `/` vs `/table`, and a real click on the header's theme toggle correctly flips the `dark` class, updates the `aria-label`, and persists to `localStorage`, all with zero console errors.

**One thing flagged, not blocking:** Stage 4 (protected routes) conflicts with AGENTS.md's explicit rule against "protected-route guards, or anything that implies a real security boundary exists," since there's no real auth here. I noted this in the dev plan and will bring it back with concrete options when we reach that stage.

Suggested commit message:
```
feat(app): add header, footer, and shared layout shell
```

Ready to move to Stage 3 (theme system) whenever you'd like — though note the theme toggle/hook mechanics already existed and are now just relocated into the header, so Stage 3's main remaining piece is deciding whether to add an explicit "auto/system" third option alongside light/dark. Want me to proceed with that?

## Prompt 2

> Let’s write out the plan separately in a new file so we can follow it step by step, just like the first one. Also, with each new step, let’s bump the version according to SemVer based on the changes we make.
>
> Let’s also add a login state, so after the user logs in successfully, we show a greeting with their username somewhere.
>
> Somewhere in the steps, let’s also include protection against attacks involving malicious HTML being injected into input fields.
>
> We should also have a password visibility toggle for the password field.
>
> After the user logs in, let’s show a People link that points to the table route.

**Actions:**

- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Edited `docs/development-plan.md`
- Wrote `docs/phase-2-development-plan.md`
- Ran `ls -la ./AGENTS.md ./CLAUDE.md 2>&1`
- Edited `AGENTS.md`
- Edited `AGENTS.md`
- Edited `AGENTS.md`
- Edited `AGENTS.md`
- Edited `AGENTS.md`
- Edited `README.md`
- Ran `grep -n "1\.0\.0" ./README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

This calls for restructuring the plan and a policy update. Let me first move the header/footer step into its own dedicated plan file (as requested) and put a per-step SemVer bump in place, then fold in the four new requirements as concrete steps.

Now updating the compare links at the bottom of the changelog.

Now removing the Phase 2 section I'd appended to `development-plan.md` and replacing it with a pointer to the new dedicated file.

Confirmed: `CLAUDE.md` is a symlink to `AGENTS.md`. I'll edit `AGENTS.md` directly.

Now fixing the stale "theme not implemented yet" line, and adding the phase-2 versioning cadence + Context clarification.

Now let's run the full verification suite again to make sure the doc/version changes didn't break anything.

## Plan restructured, Step 1 versioned, and four new requirements folded in

**Plan restructuring:**
- Created [`docs/phase-2-development-plan.md`](docs/phase-2-development-plan.md) as its own living document (same format as the original), with `docs/development-plan.md` now closed to Phase 1 and just pointing to it.
- Header/footer is now **Step 1** there, marked Done. Steps 2 through 9 are planned, in this order: theme system (explicit system/auto option) → password visibility toggle → **login session state, greeting, People link, and input hardening** → protected routes → toasts → static pages → unit conversion → final polish.

**Versioning:** Retroactively cut `1.1.0` for the header/footer step (`npm version minor`) and documented the new per-step cadence in `AGENTS.md`, `README.md`, and `CHANGELOG.md`: from here, each completed phase-2 step gets its own SemVer bump immediately, not batched.

**Your four new asks, folded into the plan (not yet implemented):**
- **Password visibility toggle** → its own small Step 3.
- **Login state + username greeting + People link** → Step 4, one cohesive feature. Since the greeting, the header's nav, and the future protected-route guard all need to read this state independently of each other, I planned it as a small React Context (`useSession`), not a new dependency, and explicitly justified in the plan against the project's "no global state" default.
- **HTML-injection protection** → folded into that same step, since the username becoming render-visible (in the greeting) is exactly what creates that new attack surface: a character allowlist on the username field plus a regression test proving a `<script>`-style payload renders as inert text.

**One policy change worth your attention:** this session feature directly conflicted with an explicit line in `AGENTS.md` ("never imply a logged-in/session state that doesn't exist"). Since you've now explicitly asked for it, I amended that section rather than leaving it stale: it still forbids anything implying a real credential check, a backend, or password storage, but now permits a clearly-labeled, `sessionStorage`-only demo session used for personalization and navigation, not security. Worth a read in `AGENTS.md`'s "What this project is" and "Security principles" sections if you want to adjust the wording.

All checks pass (typecheck, lint, format, 27 tests, build).

Suggested commits (separate, per the project's convention):
```
feat(app): add header, footer, and shared layout shell
docs: split phase 2 plan into its own file and record new versioning cadence
chore(release): cut 1.1.0
```

Ready to move on to Step 2 (theme system's system/auto option) next, then Step 3 (password toggle) and Step 4 (session/greeting/People link/hardening) in that order, unless you'd like to reorder or adjust anything first.

## Prompt 3

> lets proceed with the next step from the new plan

**Actions:**

- Ran `grep -rn "useTheme\|Theme'" ./src --include="*.tsx" --include="*.ts" | grep -v node_modules`
- Wrote `src/shared/hooks/useTheme.ts`
- Wrote `src/shared/components/ThemeToggle.tsx`
- Edited `src/shared/components/ThemeToggle.tsx`
- Edited `src/shared/components/ThemeToggle.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format 2>&1 | tail -5`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -10 && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Ran `curl -s http://127.0.0.1:9222/json/version; echo "exit:$?"; ps aux | grep remote-debugging | grep -v grep`
- Ran `nohup google-chrome --headless=new --disable-gpu --no-sandbox --remote-debugging-port=9222 --remote-debugging-address=127.0.0.1 --user-data-dir=/tmp/scratchpad/ …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-theme.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-theme.mjs`
- Edited `src/app/Header.tsx`
- Edited `src/app/Header.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format 2>&1 | tail -3 && npm test 2>&1 | tail -8 && npm run build 2>&1 | tail -8`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-theme.mjs`
- Wrote `/tmp/scratchpad/check-theme-wide.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-theme-wide.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port=9222" 2>/dev/null; echo "checked"`
- Ran `kill 85060 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | grep -iE "readme|changelog|phase-2|development-plan"`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build 2>&1 | tail -10`
- Ran `git status --short`

**Response:**

Good, only `ThemeToggle` consumes it, and there's no test file for it. Let's rewrite both.

Now let's run typecheck/lint to catch any issues before browser testing.

Clean. Let's run tests and build, then verify in the browser (segmented control fit at 360px, live system-theme reaction, persistence).

Now let's spin the dev server + headless Chrome back up and verify the segmented control fits at 360px and that system mode reacts live to an OS theme change without a reload.

Good, up now. Let's write a check script for the theme control: layout fit at 360px, segmented control ARIA state, clicking each option, and live system-preference reaction without reload.

The brand text wraps to two lines at 360px now that the theme control takes more width. Let me shrink it responsively.

Now let's re-verify with a fresh screenshot at 360px and re-run the full checks (typecheck/lint/format/tests/build) plus responsive re-check at 768/1280.

Fits on one line now, no overflow, everything functionally verified. Let's also spot-check 768/1280 and dark mode quickly, then clean up processes.

Looks clean. Let's stop the dev server and headless Chrome now.

Now updating the plan doc, changelog, and version bump for this step.

Now updating the phase-2 plan doc to mark Step 2 done, and the README's version reference.

Now final validation pass across everything touched.

## Step 2 complete: theme system upgrade (system/auto option)

**What changed:**
- `shared/hooks/useTheme.ts`: now a three-way `ThemePreference` (`light`/`dark`/`system`) plus a `resolvedTheme`. `system` is now the default (replacing the old "resolve once at mount" fallback) and reacts live to OS theme changes via a `matchMedia` `change` listener, no reload needed.
- `shared/components/ThemeToggle.tsx`: rewritten as a three-button segmented control (`role="group"`, `aria-pressed` per option) instead of a single cycling sun/moon button, so all three states stay visible and one tap away.
- `src/app/Header.tsx`: made the brand text and nav spacing responsive (`text-base sm:text-lg`, tighter gaps below `sm`) since the wider control was pushing the header to wrap onto two lines at 360px.

**Decision made along the way:** considered a native `<select>` for the three-way choice (the more "boring, obvious" option) but went with a styled segmented control instead, since the phase's stated goal is a modern Material-Design-ish look and a dropdown hides two of three options by default.

**Verified:** typecheck, lint, format, all 27 tests, and build pass. Also drove headless Chrome directly: no horizontal overflow at 360/768/1280px; correct `aria-pressed` states; clicking each option updates the `dark` class and `localStorage`; and, with preference on "System," emulating a live OS theme change (no page reload) correctly flipped the applied theme, confirming the `change`-event subscription actually works.

Version bumped to `1.2.0` (minor, backward-compatible feature), docs and CHANGELOG updated.

Suggested commits:
```
feat(theme): add system/auto option with live OS-theme reaction
chore(release): cut 1.2.0
```

Next up per the plan: Step 3, the password visibility toggle on the login form.

## Prompt 4

> Let’s also add improving the overall look and feel to the plan. It should follow a modern Material Design style and feel like a polished, modern application, with a clean and consistent UI based on UI/UX best practices.
>
> If possible, let’s avoid adding extra libraries and use custom styles instead. We can use a Sass structure if needed to keep the styles organized and maintainable.

**Actions:**

- Edited `docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `AGENTS.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | grep -iE "agents|phase-2" ; npm run format:check 2>&1 | tail -5`
- Ran `git status --short`

**Response:**

Now let's update Step 9 to reflect this design direction explicitly.

Now let's record this as a durable convention in `AGENTS.md`'s Styling & theming section, since it's a standing decision, not just a one-off plan note.

Let's verify formatting stays clean and nothing else broke (no code changed, just docs, but good to confirm).

## Plan updated: Material Design polish direction added, Sass question settled

Since this was a documentation-only change (no code shipped), no version bump this time — consistent with the cadence being tied to shipped steps.

**What changed:**
- **`docs/phase-2-development-plan.md`**: added a new "Design direction" section, applying to every remaining step, not just the last one: a consistent elevation/shadow scale, border-radius and spacing rhythm, a defined type scale, consistent hover/focus/active/disabled states, and short purposeful motion. Step 9 was renamed to "Material Design polish and accessibility pass" with concrete criteria tied back to that direction.
- **`AGENTS.md`**: recorded the same Material Design direction as a durable styling convention (not just a plan note), and made the Sass decision explicit and standing.

**My recommendation on Sass, which I went ahead with:** no Sass. Tailwind v4 runs on Lightning CSS, which already gives native CSS nesting, custom properties, and `calc()`-based math — the exact things Sass historically solved. Adding it would mean a second styling convention (`.scss` alongside Tailwind utilities) without solving a problem Tailwind can't already handle. I documented this as a standing decision rather than a one-off, but left the door open: if a concrete styling need comes up later that Tailwind genuinely can't express cleanly, I'll name it specifically and we can revisit.

Let me know if you'd rather commit to Sass now regardless — happy to wire it up if you'd prefer that structure. Otherwise, next up per the plan is Step 3: the password visibility toggle.

## Prompt 5

> lets proceed with the next step

**Actions:**

- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -15 && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh && npx vitest run src/features/auth/LoginForm.test.tsx 2>&1 | head -80`
- Edited `src/features/auth/LoginForm.test.tsx`
- Edited `src/features/auth/LoginForm.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -15 && npm run build  …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Ran `nohup google-chrome --headless=new --disable-gpu --no-sandbox --remote-debugging-port=9222 --remote-debugging-address=127.0.0.1 --user-data-dir=/tmp/scratchpad/ …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-password.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-password.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port=9222" 2>/dev/null; echo "checked"`
- Ran `kill 101340 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

Implementing Step 3: a show/hide toggle on the password field.

Now updating the password field's markup itself.

Let's view the full file to make sure it reads correctly.

Now let's run the full verification suite.

All 28 tests pass. Now let's verify visually in the browser (touch target, no overlap with text, works at 360px, both themes).

Toggle button is 44×46px (meets touch target), typed value is preserved across the toggle, and no overflow at 360px. Let's view the screenshot.

Text is clearly visible with no overlap between the typed value and the eye-slash icon, in dark mode too. Let's clean up the background processes.

Now let's version this step, update the plan doc and changelog.

Expected (Keep a Changelog's repeated `### Added`/`### Fixed` per version). Now updating the compare links.

Now updating the plan doc's Step 3 status and the README version reference.

Final verification pass across everything.

## Step 3 complete: password visibility toggle

**What changed:**
- `LoginForm.tsx`: the password field is now wrapped in a `relative` container with an absolutely-positioned show/hide button (inline eye/eye-slash SVGs, `type="button"`, 44×44px+ touch target, `aria-label` flipping between "Show password"/"Hide password").
- `LoginForm.test.tsx`: added a test for the toggle, and fixed the two existing tests, whose `getByLabelText(/password/i)` became ambiguous once the toggle button's own `aria-label="Show password"` matched that same loose regex (switched to an exact `getByLabelText('Password')`).

**Verified:** typecheck, lint, format, all 28 tests, and build pass. Also drove a real headless Chrome session: typed a value, confirmed the toggle button is 44×46px, clicking it flips the input's `type` and the `aria-label` while preserving the typed value, no horizontal overflow at 360px, and a screenshot confirms the revealed text doesn't collide with the icon in dark mode.

Version bumped to `1.3.0` (minor). Suggested commits:
```
feat(auth): add password visibility toggle to login form
chore(release): cut 1.3.0
```

Next up per the plan is Step 4: login session state, greeting, People link, and the input-hardening work against HTML injection. That one includes the `AGENTS.md` policy change we already discussed — let me know if you want to review that wording again before I proceed, or if I should just go ahead.

## Prompt 6

> proceed with the next step

**Actions:**

- Wrote `src/features/auth/loginSchema.ts`
- Edited `src/features/auth/loginSchema.test.ts`
- Wrote `src/features/auth/session.ts`
- Wrote `src/features/auth/session.test.ts`
- Wrote `src/features/auth/sessionContext.ts`
- Wrote `src/features/auth/SessionProvider.tsx`
- Wrote `src/features/auth/useSession.ts`
- Wrote `src/features/auth/Greeting.tsx`
- Wrote `src/features/auth/Greeting.test.tsx`
- Wrote `src/App.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.test.tsx`
- Edited `src/features/auth/LoginForm.test.tsx`
- Edited `src/features/auth/LoginForm.test.tsx`
- Wrote `src/app/Header.tsx`
- Edited `src/features/auth/Greeting.tsx`
- Edited `src/features/auth/Greeting.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck 2>&1 | tail -40`
- Ran `source ~/.nvm/nvm.sh && npm run lint 2>&1 | tail -60`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -80`
- Ran `source ~/.nvm/nvm.sh && npm run format:check && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Ran `sleep 2; curl -s http://127.0.0.1:9222/json/version; cat /tmp/scratchpad/chrome.log | tail -20`
- Ran `curl -s http://127.0.0.1:9222/json/version`
- Ran `pkill -f "remote-debugging-port=9222" 2>/dev/null; sleep 1 …` (multi-line/long command, trimmed)
- Ran `curl -s http://127.0.0.1:9222/json/version; echo "exit:$?"`
- Ran `ps aux | grep chrome | grep -v grep; cat /tmp/scratchpad/chrome.log | tail -30`
- Ran `rm -rf /tmp/scratchpad/chrome-profile7 …` (multi-line/long command, trimmed)
- Edited `/tmp/scratchpad/cdp.mjs`
- Wrote `/tmp/scratchpad/check-session.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-session.mjs`
- Wrote `src/app/Header.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-session.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Edited `src/app/Header.tsx`
- Edited `src/app/Header.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-session.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port" 2>/dev/null; echo checked`
- Ran `kill 116970 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -15 && npm run build  …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `grep -n "1\.3\.0\|1\.4\.0" ./README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`
- Ran `grep -n "amended (in this change)" ./docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | grep -i phase-2; npm run format:check 2>&1 | tail -3`

**Response:**

Now adding tests for the allowlist to `loginSchema.test.ts`.

Now creating the session module (write/read helpers over `sessionStorage`).

Now a test for it, matching the project's existing trust-boundary test conventions.

Now wiring `SessionProvider` into `App.tsx`.

Now updating `LoginForm.tsx` to record the session on a valid submit.

The `LoginForm` tests render without a `SessionProvider` — need to fix that before running.

Now updating `Header.tsx` for the logged-in vs logged-out nav states.

Now let's run the full verification.

Typecheck passes cleanly. Now lint and tests.

Lint clean too (no `react-refresh/only-export-components` issue, confirming the file split worked). Now tests.

All 48 tests pass (20 new). Now build and format:check.

All checks pass. Now let's verify in the browser: full login flow, header switching to greeting/People/Log out, responsive fit at 360/768/1280, and that the greeting renders safely.

Now let's write a check script that logs in, verifies the header switches to greeting/People/Logout, then checks responsive fit at 360/768/1280.

Login/logout wiring works, but there's horizontal overflow at 360px when logged in. Let's see what's happening.

Expected, using it now in the People link.

No more overflow at 360px or 768px. Let's view the 360 and 1280 screenshots to confirm visually.

Excellent — clean at both breakpoints, and the logout icon matches the conventional "sign out through a door" glyph. Let's stop the browser/dev-server processes and finalize.

Now let's run the complete verification suite one more time before wrapping up docs/versioning.

All green. Now version bump and doc updates.

Expected/benign, as before. Now the compare links.

Now updating the phase-2 plan doc to mark Step 4 done, with implementation notes and the responsive-overflow fix I had to make.

Now updating README: project structure listing, current-status paragraph, and version reference.

Now the current-status paragraph and version reference.

Now let's format and run the full verification suite one final time.

I should fix a small inaccuracy in the plan doc — the `AGENTS.md` amendment happened in an earlier turn, not in this change.

## Step 4 complete: login session state, greeting, People link, and input hardening

**What changed:**
- **Session:** `LoginForm` now calls `login(username)` on a valid submit, backed by a small React Context (`sessionContext.ts` + `SessionProvider.tsx` + `useSession.ts`, split across files to satisfy the Fast Refresh lint rule) and `session.ts` (`sessionStorage`-only, Zod-validated on read).
- **Header:** logged out still shows `Login`; logged in shows a greeting ("Hi, `username`!"), a `People` link, and `Log out`. Both action items became icon-first with `sm:`-only text labels after a real overflow was found and fixed at 360px (measured 389px vs. 360px available) — documented as a decision in the plan rather than silently patched.
- **Hardening:** `loginSchema.ts`'s username field now allows only letters/digits/spaces/hyphens/underscores/periods, rejecting HTML-special characters outright; `session.ts` reuses that same schema so a tampered `sessionStorage` entry gets the same treatment. `Greeting.test.tsx` proves React's escaping holds even for a hostile payload, independent of the schema.
- 20 new tests (`session.test.ts`, `Greeting.test.tsx`, `loginSchema.test.ts` allowlist cases, `LoginForm.test.tsx` session-recording case), all passing alongside the existing suite (48 total).

**Verified live:** full login → session-write → header-update → logout → session-clear cycle in headless Chrome, plus no horizontal overflow at 360/768/1280px, no console errors.

Version bumped to `1.4.0`. Suggested commits:
```
feat(auth): add demo login session with header greeting and People link
fix(auth): harden username against HTML injection
chore(release): cut 1.4.0
```

Next up per the plan is Step 5: protected routes, redirecting an unauthenticated visitor away from `/table`, now that the session state this depends on exists.

## Prompt 7

> proceed with the next step

**Actions:**

- Wrote `src/app/ProtectedRoute.tsx`
- Edited `src/app/router.tsx`
- Wrote `src/app/ProtectedRoute.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -20 && npm run format:check && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-protected.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-protected.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port" 2>/dev/null; echo checked`
- Ran `kill 128198 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

Now creating `ProtectedRoute.tsx`.

Now wiring it into the router.

Now writing a test for `ProtectedRoute`.

Now let's run the full verification suite.

All 50 tests pass. Now let's verify in the browser: direct nav to `/table` while logged out redirects to `/`, and works normally when logged in.

All three cases behave correctly: logged-out direct visits to `/table` (with or without a `?page=` param) redirect to `/`, and a logged-in visit renders the table normally. Let's clean up the browser/dev-server processes.

Now version bump and doc updates.

Expected/benign, as before. Now updating the compare links.

Now updating the phase-2 plan doc's Step 5.

Now updating README: project structure, current-status paragraph, and version.

Now the current-status paragraph and version.

Final full verification pass.

## Step 5 complete: protected routes

**What changed:**
- `src/app/ProtectedRoute.tsx`: redirects to `/` (`<Navigate replace>`) when there's no demo session; otherwise renders its children.
- `src/app/router.tsx`: `/table`'s route element is now wrapped in `ProtectedRoute`.
- `ProtectedRoute.test.tsx`: covers both the redirect (no session) and pass-through (session exists) cases.

**Verified live:** a logged-out visitor hitting `/table` directly, or `/table?page=2`, lands on `/` showing the login form instead; a visitor with a session (written directly to `sessionStorage`, simulating an already-logged-in visit) sees the real table. No console errors either way.

All checks pass (typecheck, lint, format, 50 tests, build). Version bumped to `1.5.0`.

Suggested commits:
```
feat(app): add protected-route redirect for /table
chore(release): cut 1.5.0
```

Next up per the plan is Step 6: the dependency-free toast notification system.

## Prompt 8

> lets proceed with teh next step, and can use notification for the protected routes, so the user must be logged in first

**Actions:**

- Wrote `src/shared/toast/toastContext.ts`
- Wrote `src/shared/toast/useToast.ts`
- Wrote `src/shared/toast/ToastProvider.tsx`
- Wrote `src/shared/toast/ToastProvider.test.tsx`
- Wrote `src/App.tsx`
- Wrote `src/app/ProtectedRoute.tsx`
- Wrote `src/app/ProtectedRoute.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck 2>&1 | tail -40`
- Ran `source ~/.nvm/nvm.sh && npm run lint 2>&1 | tail -60`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -80`
- Edited `src/shared/toast/ToastProvider.test.tsx`
- Edited `src/shared/toast/ToastProvider.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm test 2>&1 | tail -20`
- Ran `source ~/.nvm/nvm.sh && npm run format:check && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Ran `pgrep -af "remote-debugging-port"; curl -s http://127.0.0.1:9333/json/version; echo "exit:$?"`
- Ran `rm -rf /tmp/scratchpad/chrome-profile10 …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-toast.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-toast.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null; pkill -f "remote-debugging-port" 2>/dev/null; echo stopped`
- Wrote `src/app/ProtectedRoute.tsx`
- Edited `src/app/ProtectedRoute.test.tsx`
- Edited `src/app/ProtectedRoute.test.tsx`
- Edited `src/app/ProtectedRoute.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -30`
- Ran `source ~/.nvm/nvm.sh && npm run format:check && npm run build 2>&1 | tail -10 …` (multi-line/long command, trimmed)
- Ran `pgrep -af "remote-debugging-port" | grep -v pgrep; curl -s http://127.0.0.1:9333/json/version`
- Ran `rm -rf /tmp/scratchpad/chrome-profile11 …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-toast.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port" 2>/dev/null; echo checked`
- Ran `kill 146081 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Ran `grep -n "^### Step 6" -A 20 ./docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `grep -n "1\.5\.0\|shared/\|components/\|hooks/" ./README.md | head -30`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

Good addition — I'll build the toast system and wire it into `ProtectedRoute` so a redirected visitor sees why they landed back on the login page.

Now wiring `ToastProvider` into `App.tsx`.

Now updating `ProtectedRoute.tsx` to fire a toast on redirect.

Now updating `ProtectedRoute.test.tsx` to wrap with `ToastProvider` and assert the toast appears.

Now let's run the full verification suite.

That's just Prettier's auto-format wrapping a long line — expected. Continuing verification.

Clean. Now tests.

All 56 tests pass. Now format-check and build.

All checks pass. Now let's verify in the browser: the toast appears on redirect, is dismissible, auto-expires, and looks right in both themes at mobile width.

Found a real bug: React StrictMode double-invokes the effect in dev mode, producing two stacked toasts. Fixing with a ref guard (a cleanup-based dismiss would wrongly clear the toast the instant the real redirect unmounts `ProtectedRoute`).

Now let's add a regression test that specifically wraps in `StrictMode` to catch this class of bug.

Now let's run the full verification suite.

All 57 tests pass, including the StrictMode regression test that catches the exact bug I found. Now let's re-verify live in the browser to confirm only one toast appears.

Fixed — exactly one toast now, confirmed against the real dev server. Let's re-run the full dismiss/screenshot check.

All correct now: redirect happens, toast shows once, no overflow, and dismiss actually removes it. Let's look at the screenshots for visual polish.

Clean, readable in dark mode, sits at bottom-center on mobile and bottom-right on desktop, no overlap issues. Let's clean up processes and finalize.

Now let's finalize: version bump and update docs.

Expected/benign, as before. Now the compare links.

Now updating the phase-2 plan doc's Step 5 (toast mention) and Step 6.

Now let's add a brief cross-reference note in Step 5 mentioning the toast was added afterward in Step 6.

Now updating README: project structure, current-status paragraph, and version.

Now the current-status paragraph.

Final full verification pass.

## Step 6 complete: toast notification system, wired into the protected-route redirect

**What changed:**
- `src/shared/toast/`: a dependency-free `ToastProvider`/`useToast()` pair (`showToast(message, variant?)`), auto-dismissing after 5s or on manual close, `role="alert"` for errors and `role="status"` otherwise, three color-coded variants (info/success/error), stacked bottom-center on mobile and bottom-right from `sm` up.
- `ProtectedRoute.tsx` now calls `showToast('Please log in to access that page.')` when it redirects, so the redirect isn't silent — the specific thing you asked for.

**A real bug found and fixed along the way:** the first pass showed the toast twice under `npm run dev`. Cause: React StrictMode double-invokes effects in development, and the effect calling `showToast` fired twice. I initially considered an effect-cleanup fix, but that would have dismissed the toast immediately after showing it in **production too** (since `ProtectedRoute` genuinely unmounts right after the redirect, not just in StrictMode's simulated cycle). Fixed with a `useRef` guard instead — React's documented escape hatch for exactly this situation. Added a test that renders under `<StrictMode>` explicitly to catch a regression here.

**Verified:** typecheck, lint, format, all 57 tests (9 new), and build pass. Confirmed live against the actual dev server (where the bug reproduced): exactly one toast on redirect, no overflow at 360px, dismiss button works, readable in dark mode at both mobile and desktop.

Version bumped to `1.6.0`. Suggested commits:
```
feat(toast): add dependency-free toast notification system
feat(app): notify visitors when redirected from a protected route
fix(app): prevent duplicate redirect toast under StrictMode
chore(release): cut 1.6.0
```

Next up per the plan is Step 7: the Privacy Policy, Terms and Conditions, and About pages, plus footer navigation to them.

## Prompt 9

> proceed with the next step

**Actions:**

- Edited `src/app/routes.ts`
- Wrote `src/shared/components/StaticPage.tsx`
- Wrote `src/pages/AboutPage.tsx`
- Wrote `src/pages/PrivacyPolicyPage.tsx`
- Wrote `src/pages/TermsPage.tsx`
- Wrote `src/app/router.tsx`
- Wrote `src/app/Footer.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck`
- Ran `source ~/.nvm/nvm.sh && npm run lint 2>&1 | tail -60`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -15 && npm run format:check && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-static-pages.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-static-pages.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port" 2>/dev/null; echo checked`
- Ran `kill 155746 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Ran `grep -n "^### Step 7" -A 20 ./docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `grep -n "two pages\|A responsive React" ./AGENTS.md`
- Edited `AGENTS.md`
- Edited `README.md`
- Ran `grep -n "Modal.tsx\|ThemeToggle.tsx" ./README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

Proceeding with Step 7: static pages (About, Privacy Policy, Terms and Conditions) and footer navigation.

Now let's update `routes.ts` to add the three new route constants.

Now creating the shared `StaticPage` layout wrapper.

Now creating the three content pages.

Now wiring the routes into `router.tsx`.

Now updating `Footer.tsx` with navigation links.

Now let's run the full verification suite.

That's just Prettier's prose re-wrapping, expected. Typecheck is clean. Continuing.

Clean. Now tests, format-check, and build.

All checks pass. Now let's verify visually in the browser: footer links, page content, typography, responsive layout, and both themes.

No overflow anywhere, all headings/links present, footer navigation works. Let's look at the screenshots for visual polish, in both light and dark.

Clean, consistent, and readable in both themes. Let's stop the browser/dev-server processes.

Now version bump and doc updates.

Expected/benign, as before. Now the compare links.

Now updating the phase-2 plan doc's Step 7.

Let's also fix the now-stale "two pages" description in `AGENTS.md`.

Now updating README's project structure, current-status paragraph, and version.

Now the current-status paragraph and version.

Final full verification pass.

## Step 7 complete: static pages and footer navigation

**What changed:**
- New `src/shared/components/StaticPage.tsx`: a shared prose layout (headings, paragraphs, lists, inline code, links) applied via Tailwind descendant selectors, so the three new pages share one visual system without repeating classes.
- New `AboutPage.tsx`, `PrivacyPolicyPage.tsx`, `TermsPage.tsx` at `/about`, `/privacy`, `/terms` (public, not behind `ProtectedRoute`).
- `Footer.tsx` now has a `nav` linking to all three, above the copyright line.
- Content was written to describe *this app's actual behavior* honestly rather than generic legal boilerplate: no backend, no real accounts, what `sessionStorage`/`localStorage` are actually used for, an explicit no-cookies/no-tracking statement, and the standard SWAPI/Lucasfilm-Disney disclaimer on the About and Terms pages.
- No test files added for these, matching the existing convention that thin content-only page components (`LoginPage`, `TablePage`, `NotFoundPage`) don't have them either — verified by hand instead.

**Verified live:** all three pages render every heading with no horizontal overflow at 360px or 1280px, in both themes; footer links have correct hrefs and a real click navigates correctly; no console errors.

All checks pass (typecheck, lint, format, 57 tests, build). Version bumped to `1.7.0`.

Suggested commits:
```
feat(pages): add About, Privacy Policy, and Terms pages with footer navigation
chore(release): cut 1.7.0
```

Next up per the plan is Step 8: the client-side unit selector for height and mass in the people table.

## Prompt 10

> proceed with the next step

**Actions:**

- Wrote `src/features/people/units.ts`
- Wrote `src/features/people/units.test.ts`
- Wrote `src/features/people/UnitToggle.tsx`
- Wrote `src/features/people/PeopleTable.tsx`
- Wrote `src/features/people/PeopleTable.test.tsx`
- Edited `src/features/people/PeopleTable.test.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck 2>&1 | tail -40`
- Ran `source ~/.nvm/nvm.sh && npm run lint 2>&1 | tail -60`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -60`
- Ran `source ~/.nvm/nvm.sh && npm run format:check && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-units.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-units.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port" 2>/dev/null; echo checked`
- Ran `kill 166708 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Ran `grep -n "^### Step 8" -A 15 ./docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `grep -n "people/\|PeopleTable\|people.schema" ./README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

Let me check the current `usePeople` state shape and `people.types.ts` before writing the table changes and its test.

Now creating the unit-conversion module.

Now creating the `UnitToggle` component.

Now updating `PeopleTable.tsx` to add the unit toggles and wire in the formatters.

Now let's add a test for `PeopleTable`'s unit-toggle behavior.

Now let's run the full verification suite.

Clean. Now lint and tests.

All 71 tests pass (14 new). Now format-check and build.

All checks pass. Now let's verify visually in the browser: unit toggles render, convert values in real time without a network request, and fit responsively.

Real network data loaded, values convert correctly and instantly with **zero new network requests**, headers update to reflect the selected unit, and no overflow at 360px. Let's check the screenshots.

Excellent — clean, correct, and matches the app's existing visual language. Let's stop the browser/dev-server processes.

Now version bump and doc updates.

Expected/benign, as before. Now the compare links.

Now updating the phase-2 plan doc's Step 8.

Now updating README: project structure, current-status paragraph, and version.

Now the current-status paragraph and version.

Final full verification pass.

## Step 8 complete: unit conversion for height and mass

**What changed:**
- `features/people/units.ts`: `formatHeight`/`formatMass` parse SWAPI's raw centimeter/kilogram strings (stripping commas, e.g. `"1,358"`) and format them for a target unit; non-numeric values (`"unknown"`, `"n/a"`) pass through unchanged.
- `features/people/UnitToggle.tsx`: a small, generic two-option segmented control (same visual pattern as `ThemeToggle`), reused for both height and mass.
- `PeopleTable.tsx` now owns the selected units as local state (persists across pagination since the component doesn't unmount), renders both toggles above the table, and updates both the column headers (`Mass (kg)` → `Mass (lb)`) and every cell immediately.
- 14 new tests covering the conversion math, comma/non-numeric edge cases, and the toggle's effect on the rendered table.

**Verified live against the real SWAPI response:** default `Mass (kg)`/`Height (cm)` showing Luke Skywalker as `77`/`172`; clicking `m` and `lb` updates to `Mass (lb)`/`Height (m)` with values `169.8`/`1.72` — and I confirmed via the Network domain that **zero new requests** were made to the SWAPI host when switching units, exactly as required. No overflow at 360px, no console errors.

All checks pass (typecheck, lint, format, 71 tests, build). Version bumped to `1.8.0`.

Suggested commits:
```
feat(people): add client-side unit conversion for height and mass
chore(release): cut 1.8.0
```

That completes every step through Step 8. The one remaining step in the plan is **Step 9: Material Design polish and accessibility pass**, a whole-app review once everything above exists. Want me to proceed with that next?

## Prompt 11

> proceed with the next step

**Actions:**

- Ran `find ./node_modules -maxdepth 2 -iname "axe-core" 2>/dev/null`
- Ran `source ~/.nvm/nvm.sh …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/check-a11y.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-a11y.mjs 2>&1 | head -150`
- Wrote `/tmp/scratchpad/check-focus.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-focus.mjs`
- Ran `grep -rn "transition\|duration-\|ease-" ./src --include="*.tsx" --include="*.ts" | grep -v ".test."`
- Wrote `src/shared/focusRing.ts`
- Edited `src/app/Header.tsx`
- Edited `src/app/Header.tsx`
- Edited `src/shared/components/ThemeToggle.tsx`
- Edited `src/shared/components/ThemeToggle.tsx`
- Edited `src/features/people/UnitToggle.tsx`
- Edited `src/features/people/UnitToggle.tsx`
- Edited `src/features/people/Pagination.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/shared/components/Modal.tsx`
- Edited `src/shared/components/Modal.tsx`
- Edited `src/shared/components/Modal.tsx`
- Edited `src/shared/toast/ToastProvider.tsx`
- Edited `src/shared/toast/ToastProvider.tsx`
- Edited `src/app/Footer.tsx`
- Edited `src/pages/NotFoundPage.tsx`
- Edited `src/shared/components/StaticPage.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -5 && npm run typecheck 2>&1 | tail -40`
- Ran `source ~/.nvm/nvm.sh && npm run lint 2>&1 | tail -80`
- Ran `head -8 ./src/app/Header.tsx`
- Edited `src/app/Header.tsx`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run lint 2>&1 | tail -10 && npm run typecheck 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh && npm test 2>&1 | tail -30`
- Ran `source ~/.nvm/nvm.sh && npm run format:check && npm run build 2>&1 | tail -10`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-a11y.mjs 2>&1 | grep -v consoleErrors`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-focus.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Edited `src/shared/focusRing.ts`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `curl -s "http://localhost:5183/src/index.css?direct" 2>/dev/null | head -5 …` (multi-line/long command, trimmed)
- Ran `grep -n "outline-style\|\.outline\b\|\.outline-2\b\|\.outline-none\b" ./node_modules/tailwindcss/utilities.css | head -30`
- Ran `curl -s "http://localhost:5183/src/index.css" | grep -n "outline" | head -60`
- Ran `grep -o '\.focus-visible\\:outline[^{]*{[^}]*}' "~/.claude/projects/-home-webtl-projects-web-react-star-wars-portal/1431f905-becb-45f2-a225-0f3925ae3ecb/tool-re …` (multi-line/long command, trimmed)
- Ran `grep -o '\.focus-visible[^{]*outline[^{]*{[^}]*}' "~/.claude/projects/-home-webtl-projects-web-react-star-wars-portal/1431f905-becb-45f2-a225-0f3925ae3ecb/tool- …` (multi-line/long command, trimmed)
- Ran `grep -o '[^,{]*{\\n[^}]*outline-style: solid[^}]*}' "~/.claude/projects/-home-webtl-projects-web-react-star-wars-portal/1431f905-becb-45f2-a225-0f3925ae3ecb/too …` (multi-line/long command, trimmed)
- Ran `grep -n "outline" ./node_modules/tailwindcss/preflight.css`
- Ran `grep -n -B5 "outline: auto" ./node_modules/tailwindcss/preflight.css`
- Edited `src/shared/focusRing.ts`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node -e " …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-a11y.mjs 2>&1 | grep -v consoleErrors`
- Wrote `/tmp/scratchpad/check-focus-wide.mjs`
- Ran `source ~/.nvm/nvm.sh && cd /tmp/scratchpad && node check-focus-wide.mjs`
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null …` (multi-line/long command, trimmed)
- Ran `lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; pgrep -f "remote-debugging-port" 2>/dev/null; echo checked`
- Ran `kill 189491 2>/dev/null; sleep 1; lsof -ti:5183 -sTCP:LISTEN 2>/dev/null; echo done`
- Ran `source ~/.nvm/nvm.sh && npm version minor --no-git-tag-version`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Ran `grep -n "^### Step 9" -A 20 ./docs/phase-2-development-plan.md`
- Edited `docs/phase-2-development-plan.md`
- Ran `tail -5 ./docs/phase-2-development-plan.md`
- Ran `cat >> ./docs/phase-2-development-plan.md << 'EOF' …` (multi-line/long command, trimmed)
- Ran `grep -n "shared/$\|focusRing\|components/$" ./README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && npm run format 2>&1 | tail -3 && npm run typecheck && npm run lint && npm run format:check && npm test 2>&1 | tail -10 && npm run build  …` (multi-line/long command, trimmed)
- Ran `git status --short`

**Response:**

Starting Step 9 with an audit first, following the same discipline used in Phase 1's polish steps: review the whole app for real inconsistencies before touching anything.

Available, no new dependency needed. Let's start the dev server and headless Chrome, then run a full audit.

Zero axe violations across every page and theme. Now checking keyboard focus visibility, which axe-core doesn't evaluate.

Tab order is correct. Let's look at the focus screenshots to check visual clarity of the default browser outline against the app's custom controls.

Let's check whether any transition classes exist yet anywhere in the app.

Let's re-read the current `ToastProvider.tsx` and `Modal.tsx`/`Pagination.tsx`/`NotFoundPage.tsx` in full before editing, to work from exact current text.

Now implementing the changes: a shared focus-visible/transition utility, a consistent elevation scale, and the input focus-color unification.

Now applying it to `Header.tsx` and adding the header's elevation shadow.

Now `ThemeToggle.tsx`:

Now `UnitToggle.tsx`:

Now `Pagination.tsx`:

Good, it landed at the top correctly. Now `LoginForm.tsx` (submit button, password toggle, and unifying the input focus color to sky):

Now `Modal.tsx`: add `shadow-xl` and the focus-ring/transition treatment on the close button.

Now `ToastProvider.tsx`'s dismiss button:

Now `Footer.tsx`:

Now `NotFoundPage.tsx`: add a hover state and the shared treatment, matching the rest of the app's link style.

Now `StaticPage.tsx`: add a transition to the prose links.

Let's run the full verification suite now to catch any import-order or lint issues.

Clean. Now lint.

Now tests, format-check, and build.

All 71 tests still pass (no behavior changed, only styling). Now format-check and build.

All checks pass. Now let's re-run the axe-core audit and re-check keyboard focus visually to confirm the new focus rings actually look right and nothing regressed.

Still zero violations. Now let's re-check the visual focus states.

That's concerning — let me check whether this is a real regression or an artifact of how CDP synthesizes Tab key presses.

Found the real bug: Tailwind's `outline-2` only sets width, not style — since I set `outline-none` as the base, `outline-style` stayed `none` even when focus-visible matched. Fixing it.

Let's re-verify with the same computed-style check before trusting a screenshot.

Still "none" after the fix. Let me check what Tailwind is actually generating for the `outline` utility.

Understood the actual bug: `outline-none` unconditionally poisons Tailwind's shared `--tw-outline-style` variable to `none` for that element, and no later `focus-visible:` variant ever resets it back — it only *reads* the variable. Since Tailwind's own base layer already sets that variable to `solid` globally, I don't need `outline-none` at all. Simplifying.

Let's verify this actually renders now.

`outline-style: solid` now, confirmed. Let's look at the zoomed screenshot to see it visually.

A clean, deliberate sky-colored outline, clearly visible in dark mode. Let's run full verification and re-check the broader focus tab sequence and both themes.

All still passing. Let's re-run the axe-core audit once more (final confirmation) and check focus visibility on a couple more elements (segmented control, Modal close button, Pagination) and light theme.

Zero violations everywhere. Let's check focus visibility on the theme toggle segmented buttons and in light mode too, plus the header's new shadow and Modal's shadow.

Excellent — clear, deliberate sky-colored focus rings in light mode too, the header's subtle shadow gives it real elevation over the page, and the modal's `shadow-xl` gives it visible depth against the dimmed backdrop, with its close button correctly auto-focused and clearly ring-highlighted. Everything works as intended. Let's stop the background processes.

Now finalizing: version bump and documentation updates.

Expected/benign, as before. Now the compare links.

Now updating the phase-2 plan doc's Step 9.

Now updating README's project structure, current-status paragraph, and version.

Now the current-status paragraph and version.

Let's also update the intro line since Phase 2 is now fully complete, not "in progress."

Final full verification pass.

## Step 9 complete: Material Design polish and accessibility pass — Phase 2 is now fully done

**Audited first, changed only what was actually broken** (same discipline as Phase 1's equivalent steps): an `axe-core` scan across all 5 routes in both themes reported **zero violations**, both before and after. Reading every interactive component against the plan's own "Design direction" found two real, concrete gaps:

1. **No deliberate focus-visible treatment** — every button/link relied on the bare browser default outline. Added `src/shared/focusRing.ts` (a shared sky-colored outline + transition) to every control that lacked one: header nav, theme/unit toggles, pagination, login form buttons, Modal/toast close buttons, footer links, and the 404 link. Unified the login inputs' focus ring from slate to the same sky accent.
2. **No elevation scale**, despite the plan naming the header and modal specifically. Toast already had `shadow-lg`; added `shadow-sm` to the header and `shadow-xl` to Modal for a real 3-tier scale.

Everything else (border-radius scale, spacing, hover/disabled states) was already consistent — confirmed by reading every relevant file, not changed just to "do something." I deliberately skipped modal/toast entrance animations as not worth the added complexity for what's already a working, accessible experience.

**A real bug, caught before shipping:** my first attempt (`outline-none` + `focus-visible:outline-2`) rendered *no visible outline at all*. Root cause: Tailwind v4's `outline-<n>` utilities read `outline-style` from a shared `--tw-outline-style` CSS variable that Tailwind's base layer sets to `solid` globally — `outline-none` overwrites that variable to `none` unconditionally, and no `focus-visible:` utility ever writes it back, only reads it. I caught this by checking `getComputedStyle(...).outlineStyle` directly in headless Chrome rather than trusting a screenshot (an invisible bug doesn't show up as a visible diff), then fixed it by simply dropping `outline-none` — Tailwind's own default already does the right thing.

**Verified live:** real Tab-key presses in headless Chrome confirm a crisp, clearly visible sky-colored ring in both themes; header and Modal shadows confirmed via computed `box-shadow`; tab order unchanged.

All checks pass (typecheck, lint, format, 71 tests, build). Version bumped to `1.9.0`.

Suggested commits:
```
feat(a11y): add consistent focus-visible treatment and elevation scale
fix(a11y): fix invisible focus outline caused by outline-none/Tailwind v4 interaction
chore(release): cut 1.9.0
```

With this, **all 9 steps of the Phase 2 plan are complete** — header/footer, theme system, password toggle, login session/greeting, protected routes, toasts, static pages, unit conversion, and this polish pass. The app is at `1.9.0`, fully verified end to end.
