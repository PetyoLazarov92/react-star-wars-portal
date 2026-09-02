# Meta tags and page titles

_Session date: 2026-09-02_

## Prompt 1

> Could we add proper meta tags to every page and make sure the page title changes accordingly when navigating between routes?
>
> I’d also like to have an OG image when links are shared. We could use the logo for this if it makes sense.
>
> Let’s include the relevant meta information for all pages, including Not Found, Login, PP, TC, and Table. Each page should have its own appropriate title and description, while sharing the same OG image where appropriate.

**Actions:**

- Ran `find src -type f -name "*.tsx" -o -name "*.ts" | grep -v test | sort`
- Ran `ls public 2>/dev/null; find . -maxdepth 2 -iname "*.svg" -o -iname "*.png" 2>/dev/null | grep -v node_modules`
- Ran `grep -rn "logo\|favicon\|space-exploration" src/app/Header.tsx src/app 2>/dev/null; echo ---; find . -maxdepth 3 -iname "*logo*" | grep -v node_modules; echo -- …` (multi-line/long command, trimmed)
- Ran `for cmd in rsvg-convert convert inkscape resvg magick cairosvg; do command -v $cmd >/dev/null 2>&1 && echo "$cmd: found" || echo "$cmd: missing"; done …` (multi-line/long command, trimmed)
- Ran `which node nodejs npx python3 2>/dev/null; echo ---; python3 -c "import PIL; print(PIL.__version__)" 2>&1; echo ---; ls -la $(dirname $(which npm 2>/dev/null) 2 …` (multi-line/long command, trimmed)
- Ran `python3 -c "import cairosvg" 2>&1; echo ---; pip3 list 2>/dev/null | grep -i -E "cairo|svg|pillow"; echo ---; pip3 install --quiet cairosvg 2>&1 | tail -20`
- Ran `python3 -m pip --version 2>&1; echo ---; python3 -m pip install --quiet cairosvg 2>&1 | tail -30`
- Ran `for p in /usr/bin/google-chrome /usr/bin/google-chrome-stable /usr/bin/chromium /usr/bin/chromium-browser /opt/google/chrome/chrome /snap/bin/chromium; do [ -x  …` (multi-line/long command, trimmed)
- Ran `cd /tmp/scratchpad && mkdir -p ogtest && cat > ogtest/test.html <<'EOF' …` (multi-line/long command, trimmed)
- Ran `cd /tmp/scratchpad …` (multi-line/long command, trimmed)
- Ran `cd /tmp/scratchpad …` (multi-line/long command, trimmed)
- Ran `find src -iname "*.test.*"; echo ---; cat docs/phase-2-development-plan.md 2>/dev/null | head -150`
- Ran `grep -n "^### Step" docs/phase-2-development-plan.md; echo ---; grep -n "^## \[" CHANGELOG.md | head -5; echo ---; tail -60 docs/phase-2-development-plan.md`
- Ran `find . -maxdepth 2 -iname "vercel.json" -o -iname "netlify.toml" -o -iname "CNAME" 2>/dev/null | grep -v node_modules …` (multi-line/long command, trimmed)
- Ran `cp /tmp/scratchpad/og-image.png ./public/og-image.png …` (multi-line/long command, trimmed)
- Wrote `src/shared/hooks/usePageMeta.ts`
- Edited `index.html`
- Edited `src/pages/HomePage.tsx`
- Edited `src/pages/LoginPage.tsx`
- Edited `src/pages/LoginPage.tsx`
- Edited `src/pages/TablePage.tsx`
- Edited `src/pages/NotFoundPage.tsx`
- Edited `src/pages/AboutPage.tsx`
- Edited `src/pages/PrivacyPolicyPage.tsx`
- Edited `src/pages/TermsPage.tsx`
- Wrote `src/shared/hooks/usePageMeta.test.tsx`
- Edited `src/shared/hooks/usePageMeta.test.tsx`
- Edited `src/shared/hooks/usePageMeta.test.tsx`
- Ran `npm run format 2>&1 | tail -30`
- Ran `ls -la ~/.nvm 2>/dev/null | head -3; find / -maxdepth 6 -iname "npm" -type f 2>/dev/null | grep -v node_modules | head; cat ~/.bashrc 2>/dev/null | grep -i nvm; …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && nvm use default 2>&1 | tail -5; node -v; npm -v`
- Ran `source ~/.nvm/nvm.sh && nvm use default >/dev/null 2>&1 …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && nvm use default >/dev/null 2>&1 …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && nvm use default >/dev/null 2>&1 …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && nvm use default >/dev/null 2>&1 …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && nvm use default >/dev/null 2>&1 …` (multi-line/long command, trimmed)
- Ran `source ~/.nvm/nvm.sh && nvm use default >/dev/null 2>&1 …` (multi-line/long command, trimmed)
- Ran `cd /tmp/scratchpad …` (multi-line/long command, trimmed)
- Ran `for route in "/" "/login" "/table" "/about" "/privacy" "/terms" "/does-not-exist"; do …` (multi-line/long command, trimmed)
- Ran `pkill -f "vite preview" 2>/dev/null; pkill -f "npm run preview" 2>/dev/null; sleep 1; echo done`
- Ran `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4173/ --max-time 2 || echo "server down"`
- Ran `sed -n '1,40p' ./CHANGELOG.md`
- Edited `CHANGELOG.md`
- Edited `package.json`
- Ran `grep -n '"version"' ./package-lock.json | head -5`
- Ran `cd . …` (multi-line/long command, trimmed)
- Edited `docs/phase-2-development-plan.md`
- Ran `grep -n "shared/hooks\|og-image\|meta tag\|Open Graph\|Vitest\|structure\|src/pages\|src/shared" ./README.md | head -40`
- Edited `README.md`
- Edited `README.md`
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && nvm use default >/dev/null 2>&1 …` (multi-line/long command, trimmed)
- Ran `rm -rf /tmp/scratchpad/ogtest /tmp/scratchpad/og-image.html /tmp/scratchpad/check_meta.js /tmp/scratchpad/preview.log`
- Ran `git status --short`

**Response:**

Headless Chrome works for rasterizing. Now let me build the actual OG image at 1200x630 using the site's real wordmark logo and brand colors.

Now let's create the shared hook.

Now let's update `index.html` with static fallback meta tags:

Now let's wire up each page. Starting with the simple ones:

Good, that's already correctly placed. Now the other pages:

I'll fix the quote style and let Prettier normalize formatting afterward with `npm run format`. Now the TablePage:

Now let's write a unit test for the hook, then run typecheck/lint/format/test/build.

Now let's run format, typecheck, lint, tests, and build.

Good, need to source nvm each time. Let's run the checks.

All unchanged, good formatting already. Now typecheck, lint, test, build.

All 82 tests pass (5 new). Now the build:

All checks pass. Now let's manually verify in the browser using headless Chrome that the title and meta tags update correctly across routes.

All routes correctly show per-page titles/descriptions/OG tags; `/table` correctly redirects to the login page's meta since it's a protected route without a session, which is expected. Let's clean up the preview server.

Good, server stopped. Now let's update the docs (development plan, CHANGELOG, README) and bump the version, per this project's living-docs convention.

This is a minor, backward-compatible feature addition, so it's `1.13.0`.

Now let's add Step 13 to the phase-2 development plan.

Now let's check the README for anything that needs updating (structure listing, features).

Let me update the README: version reference in intro, current-status paragraph, and the project structure listing.

Let's verify formatting and re-run the full test suite once more to confirm nothing broke.

Everything passes. Let me clean up the scratch directory.

Done. Summary of what shipped (v1.13.0):

**Per-page meta tags & dynamic titles**
- New [usePageMeta.ts](src/shared/hooks/usePageMeta.ts) hook: every page calls it with its own title/description. It sets `document.title` (as `<Page> | Star Wars Portal`, or just `Star Wars Portal` on the home page), `<meta name="description">`, full Open Graph tags, and Twitter Card tags, upserting elements in `<head>` rather than duplicating them on navigation.
- Wired into all 7 routes: [HomePage](src/pages/HomePage.tsx), [LoginPage](src/pages/LoginPage.tsx), [TablePage](src/pages/TablePage.tsx), [AboutPage](src/pages/AboutPage.tsx), [PrivacyPolicyPage](src/pages/PrivacyPolicyPage.tsx), [TermsPage](src/pages/TermsPage.tsx), [NotFoundPage](src/pages/NotFoundPage.tsx), each with an appropriate, honest title/description.
- Verified against a real production preview build in headless Chrome: title and meta tags update correctly per route, and `/table` correctly falls back to the login page's meta when there's no session (existing guard behavior).

**OG image**
- Built [public/og-image.png](public/og-image.png) (1200×630) from the site's actual header wordmark and Rebel Alliance badge on the brand's dark gradient, rather than a generic placeholder — rendered via headless Chrome from the same inline SVGs already used in the header/favicon, since no image-conversion tooling was available and adding an npm dependency for a one-off asset wasn't justified. Shared by every page.

**One important limitation to flag:** this app has no server or route-level prerendering, so `usePageMeta` only updates tags after JavaScript runs. Many link-unfurling bots (Facebook, Slack, etc.) fetch raw `index.html` without executing JS, so they'll see the same static fallback tags for every route (now filled in properly in `index.html`) rather than truly per-page previews. Fixing that for real would need prerendering/SSR, a bigger architectural change I didn't make unilaterally, consistent with the project's minimal-dependency/no-premature-abstraction rules — flag if you want that taken further.

All checks pass: typecheck, lint, format, 82 tests (5 new), and build. Docs (`README.md`, `CHANGELOG.md`, `docs/phase-2-development-plan.md`) and the version bump (`1.12.0` → `1.13.0`) are updated in the same change.

Suggested commit messages (bundled as separate logical commits since docs/version bump vs. code are usually squashed together per this repo's phase-2 convention, but flagging the split in case you'd rather separate):
- `feat(seo): add per-page meta tags, dynamic titles, and an Open Graph share image`
