# README and badges

_Session date: 2026-09-02_

## Prompt 1

> I’m going to host the app at https://starwars.webtimeless.bg/. Could you add this to the README as the live/demo URL and include it in the project description?
>
> Also, please add a LICENSE file and add relevant badges to the README using img.shields.io. At minimum, include badges for the license, version, and deployment/status if we can do that with the available project setup.
>
> Please keep the README clean and professional, with the badges near the top and the live demo clearly visible.

**Actions:**

- Ran `cat package.json | head -30 && echo "---README---" && cat README.md && echo "---LICENSE---" && ls LICENSE* 2>/dev/null && echo "---workflows---" && ls .github/w …` (multi-line/long command, trimmed)
- Ran `ls -la .github 2>/dev/null; echo "---"; find . -maxdepth 2 -iname "license*"; echo "---full readme---"; wc -l README.md; echo "---package name/repo---"; grep -E …` (multi-line/long command, trimmed)
- Ran `git remote -v; echo "---"; sed -n '1,40p' README.md`
- Asked: “Which license should the LICENSE file use? This also determines the license badge and file content.”
- Ran `git log --reverse --format='%ad' --date=format:'%Y' | head -1`
- Wrote `LICENSE`
- Edited `package.json`
- Edited `README.md`
- Ran `grep -n '^## ' README.md`

**Response:**

Now let me create the LICENSE file and update the README.

The top-of-README badges plus bolded live demo line cover it well; that's the natural, visible spot. Let's verify the final top section renders cleanly.

This looks clean and professional. Note: the license and version badges pull live from GitHub (`img.shields.io/github/license` and `.../package-json/v`), so they'll only resolve correctly once this LICENSE file and the `package.json` "license" field are pushed to `PetyoLazarov92/react-star-wars-portal` on GitHub — the "website" badge pings `starwars.webtimeless.bg` directly, so it'll work once that's live regardless.

Per the CLAUDE.md convention, here's the suggested commit message for this change:

```
docs: add MIT license, live demo link, and README badges
```

(and separately, if you want the version bump reflected: this is a docs-only change, so per the versioning policy it doesn't need a version bump on its own.)

## Prompt 2

> Let’s rewrite the README to make it look more polished and professional overall.
>
> I don’t really like how the current “Current Status” section looks, so let’s replace it with something cleaner and more useful, or remove it if it doesn’t add much value.
>
> Let’s also improve the overall README structure and presentation. Add a proper project overview, live demo link, key features, and a Technologies section.
>
> For the badges, let’s add more relevant technology badges using img.shields.io, for example for the framework, language, styling, build tools, testing, license, and other technologies that are actually used in the project. Keep the badges clean and consistent and only include technologies that are part of the project.
>
> Overall, I’d like the README to feel like a professional open-source project rather than a basic development status document.

**Actions:**

- Ran `head -40 ./CHANGELOG.md`
- Ran `sed -n '1,60p' package.json`
- Ran `curl -s -o /dev/null -w "%{http_code}\n" "https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/react" ; curl -s - …` (multi-line/long command, trimmed)
- Ran `curl -s "https://img.shields.io/github/package-json/dependency-version/PetyoLazarov92/react-star-wars-portal/react" | grep -o 'react[^<]*' | head -5`
- Wrote `README.md`
- Ran `npx prettier --write README.md && npx prettier --check README.md`
- Ran `ls node_modules/.bin/prettier 2>/dev/null && node_modules/.bin/prettier --write README.md && node_modules/.bin/prettier --check README.md`
- Ran `which nodejs node npm 2>/dev/null; ls /usr/local/bin | grep -i node; cat ~/.nvm/nvm.sh 2>/dev/null | head -1; ls ~/.nvm/versions/node 2>/dev/null`
- Ran `source ~/.nvm/nvm.sh && nvm use v22.22.2 && node_modules/.bin/prettier --write README.md && node_modules/.bin/prettier --check README.md`
- Ran `source ~/.nvm/nvm.sh && nvm use v22.22.2 >/dev/null 2>&1 && npm run format:check && npm run typecheck && npm run lint 2>&1 | tail -30`
- Ran `for slug in reacthookform reactrouter zod vitest tailwindcss; do …` (multi-line/long command, trimmed)

**Response:**

Prettier auto-formatted the tables correctly, good. Let me run lint/format/typecheck/build to confirm the whole thing is clean, and check the AboutPage since it references tech stack/GitHub link that might now be stale.

All clean. Let me verify a couple of the simple-icons logo slugs actually render (not silently blank) for the less-common ones, and give the README a final read-through.

All logo slugs resolve fine. The README rewrite is complete:

- **Badges**: two rows near the top — meta (License, Version, Live demo) and tech stack (React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod, Vitest, ESLint, Prettier), all dynamically pulled from `package.json`/GitHub so they can't drift stale.
- **"Current status"** replaced with a scannable **Key features** bullet list, keeping the required framing (login is format-validation only, guards are UX not security).
- Added a **Technologies** table, cleaned up **Documentation** and **Versioning** sections (no more hardcoded version numbers going stale), kept **Project structure** and **Scripts** as-is since those weren't in question.
- Verified with `format:check`, `typecheck`, and `lint` — all pass.

One thing worth flagging: `package.json` is now at `1.13.1` but `CHANGELOG.md`'s newest entry is still `1.13.0` with an empty `[Unreleased]` — per your own `AGENTS.md` convention those two must always agree, so that's worth reconciling (either add a `1.13.1` entry or revert the bump) before this ships.

Suggested commit message:
```
docs: overhaul README with tech-stack badges, feature list, and live demo link
```

## Prompt 3

> can you make the project structure to looks better

**Actions:**

- Ran `which python3`
- Ran `cat << 'PYEOF' > /tmp/scratchpad/gen_tree.py …` (multi-line/long command, trimmed)
- Edited `README.md`
- Ran `source ~/.nvm/nvm.sh && nvm use v22.22.2 >/dev/null 2>&1 && npm run format:check 2>&1 | tail -10`

**Response:**

This is clean and properly aligned. Now let me swap it into the README, replacing the old ragged tree, and add a one-line footnote that test files were omitted for brevity.

Now let me verify formatting is clean end-to-end.

The Project Structure section now uses proper `tree`-style connectors (├──/└──/│) with all comments aligned to one column, and I dropped the inline `*.test.*` file listings (which were cluttering it and causing the ragged wrapping) in favor of a one-line footnote saying tests mirror the source files. It reads as a clean, professional file tree now rather than a dev log.

Side note: `package.json` has ticked up again (now `1.13.2`) while `CHANGELOG.md`'s latest entry is still `1.13.0` — same drift I flagged last time, now one step further out of sync.

## Prompt 4

> adjust changelog to v1.13.2

**Actions:**

- Ran `git status --short && echo "---diff package.json---" && git diff package.json && echo "---log---" && git log --oneline -5`
- Ran `git show --stat 9f66750 && echo "---package.json in that commit---" && git show 9f66750:package.json | grep version && echo "---CHANGELOG at HEAD---" && sed -n  …` (multi-line/long command, trimmed)
- Ran `sed -n '1,90p' CHANGELOG.md`
- Edited `CHANGELOG.md`
- Edited `CHANGELOG.md`
- Ran `source ~/.nvm/nvm.sh && nvm use v22.22.2 >/dev/null 2>&1 && npm run format:check 2>&1 | tail -10 && echo "---" && sed -n '1,42p' CHANGELOG.md`

**Response:**

I used a wrong relative path for the LICENSE link (`../LICENSE`) — CHANGELOG.md sits at the repo root next to LICENSE, so it should just be `LICENSE`. Let me fix that.

Now let's verify formatting passes and the diff looks right.

CHANGELOG.md now has entries for `1.13.1` (LICENSE + initial badges/live demo) and `1.13.2` (the full README overhaul), matching `package.json`'s current `1.13.2`. Formatting checks pass.
