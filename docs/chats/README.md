# AI conversation exports

This folder holds sanitized markdown exports of AI coding sessions from this project's build,
kept as a build-history reference for another developer or AI assistant.

Each file is a full session transcript: every human prompt, a compact list of the actions taken in
between (files edited/written, commands run, questions asked), and the assistant's visible
responses. It is a mechanical export, not a curated summary: raw tool output, internal reasoning
("thinking" blocks), and harness-internal messages (system reminders, IDE context tags, skill
loading noise) are stripped, and local filesystem paths are sanitized (the repo root becomes `.`,
the home directory becomes `~`, scratch-file paths are collapsed to `/tmp/scratchpad`).

Guidelines:

- Generate exports with `python3 scripts/export-chat-history.py <session.jsonl> ...`, pointing at
  the raw session file(s) under `~/.claude/projects/<project-slug>/`. The script names the output
  `YYYY-MM-DD-<session-title-slug>.md` automatically.
- Review a fresh export before committing it: skim for anything the script's sanitization
  wouldn't know to catch (unusual paths, pasted secrets, etc.) before it lands in git history.
- If a session captured a real architectural decision or trade-off that isn't already explained in
  `AGENTS.md`, `README.md`, or `docs/development-plan.md`, prefer linking to that doc rather than
  relying on the reader to find it in a long transcript, but the full transcript can stay too.
- This folder can grow with the project. If a transcript is mostly noise (a session that stalled,
  or one fully superseded by a later one covering the same step), it's fine to delete it rather
  than keep every session ever run.
