# development step 11

_Session date: 2026-08-31_

## Prompt 1

> Step 10 is complete.
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

- Ran `find src -type f | sort`
- Edited `src/index.css`
- Wrote `src/shared/hooks/useTheme.ts`
- Wrote `src/shared/components/ThemeToggle.tsx`
- Edited `src/App.tsx`
- Edited `src/pages/LoginPage.tsx`
- Edited `src/pages/TablePage.tsx`
- Edited `src/pages/NotFoundPage.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/auth/LoginForm.tsx`
- Edited `src/features/people/PeopleTable.tsx`
- Edited `src/features/people/PeopleTable.tsx`
- Edited `src/features/people/PeopleTable.tsx`
- Edited `src/features/people/Pagination.tsx`
- Edited `src/features/people/Pagination.tsx`
- Edited `src/shared/components/Modal.tsx`
- Edited `src/shared/components/Modal.tsx`
- Edited `src/app/OfflineModal.tsx`
- Edited `src/app/OfflineModal.tsx`
- Ran `npm run typecheck && npm run lint && npm run format:check`
- Ran `npm run format && npm run format:check`
- Ran `npm run build`
- Ran `which chrome chromium chromium-browser google-chrome 2>/dev/null; ls ./node_modules/.bin | grep -i chrom 2>/dev/null; echo done`
- Ran `ls node_modules | grep -iE "puppeteer|chrome-remote|playwright" ; npm ls -g --depth=0 2>/dev/null | grep -iE "puppeteer|chrome-remote|playwright"; echo done`
- Ran `node --version`
- Ran `nohup npm run dev -- --port 5173 --strictPort > /tmp/vite-dev.log 2>&1 & …` (multi-line/long command, trimmed)
- Ran `mkdir -p /tmp/scratchpad/chrome-profile …` (multi-line/long command, trimmed)
- Wrote `/tmp/scratchpad/cdp-theme-test.mjs`
- Ran `cd /tmp/scratchpad && node cdp-theme-test.mjs`
- Wrote `/tmp/scratchpad/cdp-theme-os-pref.mjs`
- Ran `cd /tmp/scratchpad && node cdp-theme-os-pref.mjs`
- Ran `ls ./node_modules/axe-core/package.json 2>/dev/null && echo "axe-core present" || echo "not found"`
- Wrote `/tmp/scratchpad/cdp-axe-dark.mjs`
- Edited `/tmp/scratchpad/cdp-axe-dark.mjs`
- Ran `cd /tmp/scratchpad && node cdp-axe-dark.mjs`
- Wrote `/tmp/scratchpad/cdp-screenshot.mjs`
- Ran `cd /tmp/scratchpad && node cdp-screenshot.mjs`
- Wrote `/tmp/scratchpad/cdp-screenshot-light.mjs`
- Ran `cd /tmp/scratchpad && node cdp-screenshot-light.mjs`
- Wrote `/tmp/scratchpad/cdp-check-colors.mjs`
- Ran `cd /tmp/scratchpad && node cdp-check-colors.mjs`
- Edited `/tmp/scratchpad/cdp-check-colors.mjs`
- Ran `cd /tmp/scratchpad && node cdp-check-colors.mjs`
- Ran `pkill -f "vite --port 5173" 2>/dev/null; pkill -f "remote-debugging-port=9222" 2>/dev/null; sleep 1; echo done`
- Ran `pgrep -fa "vite --port 5173"; pgrep -fa "remote-debugging-port=9222"; echo checked`
- Ran `kill 210095 2>/dev/null; sleep 1; pgrep -fa "remote-debugging-port=9222" || echo "chrome stopped"`
- Ran `pgrep -fa "chrome" | grep -v "shell-snapshots" || echo "no chrome processes"`
- Edited `docs/development-plan.md`
- Edited `README.md`
- Edited `README.md`
- Edited `CHANGELOG.md`
- Ran `npm run typecheck && npm run lint && npm run format:check && npm run build`
- Ran `npx prettier --write CHANGELOG.md && npm run format:check && npm run build`
- Edited `CHANGELOG.md`
- Ran `npm run format:check && npm run typecheck && npm run lint && npm run build`
- Ran `rm -rf /tmp/scratchpad/*.mjs /tmp/scratchpad/*.png /tmp/scratchpad/chrome-profile …` (multi-line/long command, trimmed)

**Response:**

Good, I have the full picture. Now implementing Step 11: light/dark theme.

Now the theme hook:

Now the toggle component:

Now wire it into App.tsx and add `dark:` classes across existing components.

Now LoginForm.tsx:

Now PeopleTable.tsx:

Now Pagination.tsx:

Now Modal.tsx:

Now OfflineModal.tsx:

Now let's run typecheck, lint, format, and build.

Typecheck and lint passed; just formatting issues. Let's fix them.

Formatting is clean now. Let's run the build.

Build passes. Now let's manually verify in a browser using the `run` skill / headless Chrome pattern established in prior steps.

Node 22 has native WebSocket. Let me start the dev server and Chrome, then drive it via CDP.

Chrome is up. Now let's write a Node script that connects via CDP to test the theme toggle behavior.

OS preference default is confirmed working correctly. Now let's do a quick visual screenshot check of the login and table pages in both themes, plus check the offline modal in dark mode, and run an axe-core scan for regressions.

Zero violations in both themes on both pages. Now let's verify the offline modal visually in dark mode, and confirm contrast/rendering with a screenshot.

Dark mode looks correct across the login page, table, and offline modal, with good contrast. Let's also check the light-mode screenshots for a sanity check.

That confirms headless Chrome's default `prefers-color-scheme` is dark in this environment, so "light" screenshots followed OS preference correctly (my script just didn't force light). Let me confirm actual light rendering by explicitly forcing the light media feature.

That table screenshot shows some cell text in blue rather than the expected slate color — let me check the actual computed styles rather than trust screenshot rendering.

Computed styles confirm all cells share the same uniform slate color — the blue tint in the screenshot was a headless-Chrome font-rendering artifact, not an actual style bug. Let's clean up the background processes and finalize documentation.

Chrome is still running (vite exited already). Let's kill it explicitly.

Cleanup confirmed — my headless Chrome and vite processes are stopped; that process list is the user's own desktop Chrome, untouched. Now updating the documentation.

Now update README.md:

Now update CHANGELOG.md:

That's a pre-existing lint warning unrelated to my edit (duplicate "### Added" headings across version sections is normal in Keep a Changelog format). Let's clean up scratch files and do a final validation pass.

I'll rewrite this entry to avoid the awkward mid-path line break Prettier introduced.

All checks pass. Let me clean up the scratch files and confirm no stray dev processes remain.

Clean diff, exactly the files expected for this step. Everything checks out.

## Summary

Implemented **Step 11: Light & dark theme** from the development plan:

- `src/index.css`: added Tailwind v4's class-based `dark:` variant recipe (`@custom-variant dark`) plus `color-scheme` tokens.
- `src/shared/hooks/useTheme.ts`: reads a Zod-validated `localStorage` preference or falls back to `prefers-color-scheme`, applies it via the `dark` class, and persists changes.
- `src/shared/components/ThemeToggle.tsx`: a fixed, app-wide 44x44px toggle button (sun/moon icon), the only consumer of the hook.
- Wired into `App.tsx` alongside `OfflineModal`; added `dark:` utility classes across every existing page/component (`LoginPage`, `TablePage`, `NotFoundPage`, `LoginForm`, `PeopleTable`, `Pagination`, `Modal`, `OfflineModal`) with no structural changes needed.

**Validated:** `typecheck`, `lint`, `format:check`, and `build` all pass. Verified in headless Chrome over the DevTools protocol: OS-preference default (both light and dark), manual toggle + `localStorage` persistence across reload and across routes, graceful fallback on a corrupted stored value, zero `axe-core` violations in both themes on both pages, and visual screenshots confirming correct dark-mode contrast on the login page, table, and offline modal.

Updated `docs/development-plan.md`, `README.md`, and `CHANGELOG.md` to reflect the actual implementation. Did not bump the version or touch git.

Suggested commit message:

```
feat: add light and dark theme with a persisted toggle
```
