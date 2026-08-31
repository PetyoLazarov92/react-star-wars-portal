# AI conversation exports

This folder holds _selected_ AI conversation exports that captured a real architectural decision
or discussion worth preserving for another developer or AI assistant, not a log of every session.

Guidelines:

- Only add a conversation here if it changed a decision, resolved a real trade-off, or explains
  "why" something is built the way it is in a way that isn't already captured in `AGENTS.md`,
  `README.md`, or `docs/development-plan.md`. If it's already documented there, prefer linking to
  the relevant doc instead of exporting the chat.
- Name files `YYYY-MM-DD-short-topic.md`, e.g. `2026-08-31-project-foundation-setup.md`.
- Trim exports to the relevant portion of the conversation rather than pasting the entire
  transcript, and add one or two lines at the top summarizing the decision and linking to any
  doc it affected.
- This folder is expected to stay small. If it starts accumulating routine conversations, that's a
  sign to be more selective, not to add more structure here.
