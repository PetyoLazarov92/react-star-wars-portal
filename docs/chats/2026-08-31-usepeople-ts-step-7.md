# usePeople.ts step 7

_Session date: 2026-08-31_

## Prompt 1

> Step 6 is complete.
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

- Edited `src/shared/cache/localStorageCache.ts`
- Edited `src/features/people/usePeople.ts`
- Edited `src/features/people/usePeople.ts`
- Edited `src/features/people/PeopleTable.tsx`
- Edited `src/pages/TablePage.tsx`
- Edited `src/pages/TablePage.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`
- Used `Agent`
- Edited `docs/development-plan.md`
- Edited `CHANGELOG.md`
- Edited `README.md`
- Edited `README.md`
- Ran `npm run format:check`

**Response:**

Step 6 (caching) is done and Step 7 (loading & error state polish) is next. Let me implement it: the main gap is that a network failure currently wipes out any previously cached page data — I'll make the error state carry a stale fallback (ignoring TTL) so users still see the last known data instead of a blank error, and add a `getStale` helper to the cache module for that.

Now updating `usePeople.ts` to fold a stale fallback into the error state:

Now let's view the final file to make sure it's consistent:

Now update `PeopleTable.tsx` to render stale fallback data with a non-alarming notice, and `TablePage.tsx` to show pagination when stale data is available too.

That inline expression is awkward; let me clean it up.

Now let's run typecheck, lint, format, and build.

All checks pass. Now let's manually verify the behavior in a real browser, exercising the new stale-fallback error path.

All scenarios verified in a real browser. Now let's update the development plan to reflect Step 7's actual result.

Per project conventions, README and CHANGELOG need to stay in sync with real changes. Let me check them.

Now update the README's "Current status" and project structure sections.

All good. Nothing here rose to the level of a durable, user-taught preference worth saving to memory — this was a straightforward continuation of an existing, well-documented plan.

Step 7 (loading & error state polish) is complete:

- **`shared/cache/localStorageCache.ts`**: added `getStale` (reads a cache entry ignoring TTL) alongside the existing `getCached`, sharing validation logic via a new private `readEntry` helper.
- **`usePeople.ts`**: the `error` state now optionally carries `stale: PeopleData`, populated from `getStale` when a fresh fetch fails, so a page that previously loaded successfully doesn't just vanish into a blank error.
- **`PeopleTable.tsx`**: extracted the table markup into `PeopleDataTable`, reused by both the success case and the error case (shown below the alert with a plain-language "Showing previously loaded data, which may be out of date." note) when stale data exists.
- **`TablePage.tsx`**: `Pagination` now renders whenever there's page data to paginate, from either `success` or a stale-fallback `error`.

Deliberately not implemented: true stale-while-revalidate (background refresh while showing cached data) — that would add a second concurrent fetch path and a new state on top of the simpler TTL model chosen in Step 6, more complexity than this app's scope needs. Documented that call in the plan's Decision section.

All validated: `typecheck`, `lint`, `format:check`, and `build` pass, and a headless-Chrome pass over the real API confirmed all four states behave correctly (fresh load, first-load spinner, error-with-stale-fallback showing the note and correct pagination, and true error with no fallback showing nothing but the message). README and CHANGELOG updated to match. `docs/development-plan.md` Step 7 marked Done with full details.

Suggested commit message:

```
feat(people): show stale cached data as a fallback on fetch failure
```

## Prompt 2

> Step 7 is complete.
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

- Ran `cat ./package.json | grep -E "tailwind|react\"|typescript\"|zod"`
- Ran `mkdir -p ./src/shared/hooks ./src/shared/components`
- Wrote `src/shared/hooks/useOnlineStatus.ts`
- Wrote `src/shared/components/Modal.tsx`
- Wrote `src/app/OfflineModal.tsx`
- Edited `src/App.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`
- Used `Agent`
- Edited `docs/development-plan.md`
- Edited `CHANGELOG.md`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`

**Response:**

Confirmed Step 8 is next: Offline detection & modal.

Now implementing Step 8. Let's create the online-status hook, the accessible `Modal` primitive (built on native `<dialog>`, per the accessibility guidance to prefer it over hand-rolling), and an `OfflineModal` wired at the app level.

Now the offline-specific modal, using the render-time state-adjustment pattern already established in this codebase (avoids `set-state-in-effect`):

Now wire it into `App.tsx`:

Now let's run validation.

All checks pass. Now let's manually verify in a real browser using DevTools' offline emulation, as the plan's validation calls for.

All scenarios verified in a real browser. Now let's update the development plan, README, and CHANGELOG.

That lint warning is expected in Keep a Changelog format (each version section reuses an "Added" heading) and predates this change, so no action needed there. Now updating the README.

Now let's update the project structure section of the README to include the new files.

Let's do a final validation pass to confirm everything still passes after the doc edits.

All passing. Nothing in this turn met the bar for a durable memory save — this was execution of an already-established plan, not new user-taught preferences.

Step 8 (offline detection & modal) is complete:

- **`shared/hooks/useOnlineStatus.ts`**: wraps `navigator.onLine`, kept live via the `online`/`offline` window events.
- **`shared/components/Modal.tsx`**: a generic, controlled dialog built on the native `<dialog>` element (per `AGENTS.md`'s "prefer native `<dialog>`" guidance), getting a focus trap, Escape-to-close, and automatic focus restoration for free, plus an explicit close button.
- **`app/OfflineModal.tsx`**: composes the two into the offline-specific UI (title, inline SVG illustration, plain-language copy), dismissible but re-armed once back online so it reappears on the next real disconnect.
- **`App.tsx`**: renders `OfflineModal` app-wide alongside the router, rather than only on `/table`, since connectivity is a device-level condition, not a page-specific one.

Deliberately not wired: triggering the modal from an in-flight fetch failure (the plan's parenthetical). `usePeople`'s Step 7 error/stale-fallback handling already covers that case well at the feature level, and layering a blocking modal on top would fight with an inline experience that often already shows useful stale data.

All checks pass (`typecheck`, `lint`, `format:check`, `build`), and a full headless-Chrome pass verified the dialog's accessible name, focus trap, Escape/close-button dismissal, focus restoration, and the dismiss-then-reappear-on-reconnect behavior. `docs/development-plan.md`, `README.md`, and `CHANGELOG.md` are updated to match.

Suggested commit message:

```
feat: add offline detection with an accessible offline modal
```

## Prompt 3

> The offline modal is currently appearing in the top-right corner.
>
> Please update it so the modal is properly centered both horizontally and vertically in the viewport, with the backdrop covering the full viewport.
>
> Keep the existing modal behavior, accessibility, and styling intact. Only adjust the positioning/layout needed to center it.
>
> After the change, run the appropriate validation checks. Do not create or modify any git commits. Only suggest a Conventional Commit message.

**Actions:**

- Ran `grep -rn "dialog" ./node_modules/tailwindcss/*.css ./node_modules/tailwindcss/theme.css 2>/dev/null; find ./node_modules/tailwindcss -iname "*preflight*"`
- Ran `cat ./node_modules/tailwindcss/preflight.css`
- Edited `src/shared/components/Modal.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`
- Used `Agent`

**Response:**

Found it — Tailwind's preflight resets `margin: 0` on all elements as an author-origin rule, which overrides the browser's built-in `dialog:modal { margin: auto }` centering rule (author styles beat user-agent styles regardless of specificity). That's why the dialog sticks to a corner instead of centering. The fix is to explicitly restore `margin: auto` via a Tailwind utility on the `<dialog>` itself.

All checks pass. Let's verify the fix visually in a real browser.

Let me view the screenshot directly to confirm visually.

Confirmed visually — the modal is centered both horizontally and vertically, and the backdrop covers the full viewport.

Fixed: Tailwind's preflight resets `margin: 0` on all elements (including `<dialog>`) as an author-origin rule, which overrides the browser's built-in `dialog:modal { margin: auto }` centering behavior regardless of specificity (author rules beat user-agent rules in the cascade). Adding `m-auto` to the `<dialog>`'s className in [Modal.tsx](src/shared/components/Modal.tsx) restores that centering explicitly — the native `position: fixed; inset: 0` from the browser's dialog styling was untouched by preflight, so `m-auto` alone was enough. No behavior, accessibility, or other styling changed.

Validated: `typecheck`, `lint`, `format:check`, and `build` all pass, and a headless-Chrome check confirmed the dialog's computed margins now resolve to exact centering (`(1280-384)/2 = 448px`, `(800-242)/2 = 279px`) with a full-viewport backdrop and no console errors.

Suggested commit message:

```
fix(shared): center the offline modal in the viewport
```

## Prompt 4

> Step 8 is complete.
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

- Edited `docs/development-plan.md`
- Edited `CHANGELOG.md`
- Ran `npm run format:check 2>&1 | tail -5`
- Used `Agent`
- Edited `src/shared/components/Modal.tsx`
- Edited `src/features/people/Pagination.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`
- Used `Agent`
- Edited `docs/development-plan.md`
- Edited `CHANGELOG.md`
- Edited `README.md`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`

**Response:**

Before moving on, let me record the modal-centering bug fix in Step 8's writeup, since it's a real correction to that step's delivered behavior.

Also adding a `Fixed` entry to the changelog for that bug fix.

Now let's move to Step 9: Responsive styling pass. First, let's look at all existing components to review their current responsive state.

Let me first audit actual responsive behavior across breakpoints in a real browser before making blind guesses about what needs fixing.

The audit found two real issues worth fixing (plus two very minor ones the step explicitly calls out): the offline modal touches the viewport edges with zero margin at 360px width, and its close button has an ~11×20px hit area. Let's fix those, and give the pagination/login buttons a touch-target-friendly padding bump per the step's own "cramped touch targets" scope.

Now let's validate with typecheck, lint, format, and build.

All checks pass. Let's re-verify the fixes in a real browser across the three breakpoints.

All fixes confirmed. Let's view the screenshot to double-check visually.

Confirmed visually — clean side margins, comfortable close button, no edge-touching. Now let's update the development plan, README, and CHANGELOG.

That warning is the same expected Keep-a-Changelog pattern as before. Now updating the README's status line.

Let's do a final validation pass after all doc edits.

All checks pass. No durable, user-taught preference emerged this turn worth saving to memory — this was execution of the existing plan and my own investigation-driven fixes.

Step 9 (responsive styling pass) is complete. I audited `/`, `/table`, and the offline modal at 360px/768px/1280px in a real browser first, rather than guessing at changes, and found:

- **Real bug**: the offline modal touched both viewport edges with zero side margin at 360px (its `max-w-sm` upper bound didn't stop the browser's shrink-to-fit algorithm from filling the viewport). Fixed with `w-[min(24rem,calc(100%-2rem))]`, guaranteeing 16px of margin while still capping at 384px on wider screens.
- **Real bug**: the modal's close button had an ~11.5×20px hit area. Fixed with `min-h-11 min-w-11` (Tailwind's `11` = 44px) plus flex-centering.
- **Minor, in-scope per the plan's own wording**: Pagination and login controls were ~40-42px tall; bumped to `py-2.5` + `min-h-11` to comfortably clear the ~44px touch-target guideline.
- Everything else (table's horizontal-scroll container from Step 4, both pages at all three widths) was already fine — no page-level horizontal overflow anywhere, confirmed numerically via `scrollWidth`.

All changes re-verified in headless Chrome with concrete measurements (margins, button dimensions, no overflow, no console errors). `typecheck`/`lint`/`format:check`/`build` all pass. I also backfilled Step 8's writeup and the changelog with the modal-centering fix from the prior turn, which hadn't been recorded yet. `docs/development-plan.md`, `README.md`, and `CHANGELOG.md` are all updated.

Suggested commit message:

```
fix: improve responsive layout and touch target sizing
```

## Prompt 5

> Step 9 is complete.
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

- Ran `grep -rn "outline" src/ && echo "---" && grep -rn "focus:" src/`
- Used `Agent`
- Edited `src/features/people/PeopleTable.tsx`
- Edited `src/shared/components/Modal.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`
- Ran `grep -n "no-non-null-assertion\|noUncheckedIndexedAccess" ./eslint.config.* ./tsconfig*.json 2>/dev/null`
- Ran `cat ./eslint.config.js 2>/dev/null || cat ./eslint.config.mjs 2>/dev/null`
- Edited `src/shared/components/Modal.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`
- Used `Agent`
- Edited `docs/development-plan.md`
- Edited `CHANGELOG.md`
- Edited `README.md`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`

**Response:**

Let me do a real accessibility audit before making any changes — checking keyboard navigation, focus order, ARIA semantics, and contrast in an actual browser (ideally with axe-core) rather than guessing what's broken.

The audit found two genuine, minor findings: the table has no programmatic accessible name, and the offline modal's manual focus trap can leak focus to `document.body` when there's only one focusable element inside. Both are legitimate one-line-scope fixes. Let's apply them.

Now let's add the table caption and the manual Tab-wrap safety net to the Modal.

Now let's validate.

All checks pass. Let's re-verify both fixes in a real browser.

Both fixes confirmed working. Now let's update the development plan, README, and CHANGELOG.

Same pre-existing Keep-a-Changelog heading pattern, no action needed. Now updating the README status line.

Final validation pass after doc edits.

All passing. No durable, user-taught preference surfaced this turn worth saving to memory.

Step 10 (accessibility pass) is complete. Rather than guess at fixes, I audited first: an `axe-core` scan (already present transitively via `eslint-plugin-jsx-a11y`, no new dependency) found zero violations, and a manual keyboard-driven pass covered tab order, ARIA associations, focus indicators, and contrast. Because the app was built accessibility-first since Step 1, almost everything checked out. Two genuine issues turned up and were fixed:

- **`PeopleTable.tsx`**: the table had no programmatic accessible name (relied only on an unassociated `<h1>`). Added a visually hidden `<caption className="sr-only">Star Wars people</caption>`.
- **`Modal.tsx`**: the native `<dialog>`'s focus trap could leak focus to `document.body` on Tab when it had only one focusable descendant (the offline modal's close button is exactly that case). Added a manual `onKeyDown` handler that wraps Tab/Shift+Tab between the dialog's first and last focusable elements, as a fallback layered on top of the native trap.

Both fixes were re-verified in headless Chrome with real dispatched keyboard events (not just DOM state changes): the table's computed accessible name now resolves correctly, and focus stays pinned on the close button through repeated Tab/Shift+Tab presses, with Escape-to-close still working. `typecheck`/`lint`/`format:check`/`build` all pass. `docs/development-plan.md`, `README.md`, and `CHANGELOG.md` are updated.

Suggested commit message:

```
fix: add table accessible name and harden modal focus trap
```
