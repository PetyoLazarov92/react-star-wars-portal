#!/usr/bin/env python3
"""Convert raw Claude Code session transcripts (JSONL, from
~/.claude/projects/<project-slug>/*.jsonl) into sanitized markdown files
under docs/chats/: prompts, responses, and a compact list of the actions
(edits, commands, questions) taken in between. Strips absolute filesystem
paths, IDE/system-reminder noise, and other non-prompt harness content.

Usage:
    python3 scripts/export-chat-history.py <session.jsonl> [more.jsonl ...]

Each input file produces one docs/chats/YYYY-MM-DD-<title-slug>.md, named
from the session's auto-generated title. Review the output before committing:
this is a mechanical export, not a substitute for judgment about what's
actually worth keeping (see docs/chats/README.md).
"""
import json
import re
import sys
from pathlib import Path

REPO_ROOT = str(Path(__file__).resolve().parent.parent)
HOME = str(Path.home())
SCRATCHPAD_RE = re.compile(r"/tmp/claude-\d+/[^\s\"']*scratchpad")
MAX_COMMAND_LEN = 160

TAG_BLOCK_RE = re.compile(
    r"<(ide_opened_file|ide_selection|system-reminder|local-command-stdout|"
    r"local-command-stderr|command-message|command-name|command-args)>.*?</\1>",
    re.DOTALL,
)

NON_PROMPT_MARKERS = (
    "Base directory for this skill:",
    "<local-command-stdout>",
)

SKIP_TOOLS = {"Read", "Grep", "Glob", "TodoWrite", "BashOutput", "KillShell"}


def relpath(p: str) -> str:
    if p.startswith(REPO_ROOT):
        p = p[len(REPO_ROOT):].lstrip("/")
    elif SCRATCHPAD_RE.match(p):
        p = SCRATCHPAD_RE.sub("/tmp/scratchpad", p)
    elif p.startswith(HOME):
        p = "~" + p[len(HOME):]
    return p


def sanitize(text: str) -> str:
    if not text:
        return text
    text = text.replace(REPO_ROOT, ".")
    text = SCRATCHPAD_RE.sub("/tmp/scratchpad", text)
    text = text.replace(HOME, "~")
    return text


def strip_tags(text: str) -> str:
    return TAG_BLOCK_RE.sub("", text).strip()


def format_command(cmd: str) -> str:
    cmd = sanitize(cmd)
    first_line = cmd.splitlines()[0] if cmd else ""
    if "\n" in cmd or len(cmd) > MAX_COMMAND_LEN:
        first_line = first_line[:MAX_COMMAND_LEN]
        return f"`{first_line} …` (multi-line/long command, trimmed)"
    return f"`{cmd}`"


TOOL_ACTION_LABELS = {
    "Bash": lambda inp: f"Ran {format_command(inp.get('command', ''))}",
    "Edit": lambda inp: f"Edited `{relpath(inp.get('file_path', ''))}`",
    "Write": lambda inp: f"Wrote `{relpath(inp.get('file_path', ''))}`",
    "NotebookEdit": lambda inp: f"Edited notebook `{relpath(inp.get('notebook_path', ''))}`",
}


def extract_user_text(content):
    parts = []
    for item in content:
        if item.get("type") == "text":
            raw = item.get("text", "")
            if any(raw.startswith(m) for m in NON_PROMPT_MARKERS):
                continue
            t = strip_tags(raw)
            if t:
                parts.append(t)
    return "\n\n".join(parts).strip()


def extract_assistant(content):
    text_parts = []
    actions = []
    for item in content:
        t = item.get("type")
        if t == "text":
            txt = item.get("text", "").strip()
            if txt:
                text_parts.append(txt)
        elif t == "tool_use":
            name = item.get("name")
            inp = item.get("input", {}) or {}
            if name in SKIP_TOOLS:
                continue
            if name == "AskUserQuestion":
                for q in inp.get("questions", []):
                    actions.append(f"Asked: “{q.get('question', '')}”")
            elif name in TOOL_ACTION_LABELS:
                actions.append(TOOL_ACTION_LABELS[name](inp))
            else:
                actions.append(f"Used `{name}`")
    return "\n\n".join(text_parts).strip(), actions


def convert(path: Path):
    title = None
    session_date = None
    turns = []
    current = None

    with path.open() as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                d = json.loads(line)
            except json.JSONDecodeError:
                continue

            dtype = d.get("type")
            if dtype == "ai-title":
                title = d.get("aiTitle")
                continue
            if session_date is None and d.get("timestamp"):
                session_date = d["timestamp"][:10]

            if dtype == "user":
                content = d.get("message", {}).get("content")
                if not isinstance(content, list):
                    continue
                text = extract_user_text(content)
                if not text:
                    continue
                if current:
                    turns.append(current)
                current = {"prompt": sanitize(text), "actions": [], "response": ""}

            elif dtype == "assistant":
                if current is None:
                    continue
                content = d.get("message", {}).get("content", [])
                text, actions = extract_assistant(content)
                current["actions"].extend(actions)
                if text:
                    sep = "\n\n" if current["response"] else ""
                    current["response"] += sep + sanitize(text)

    if current:
        turns.append(current)

    title = title or "Untitled session"
    title = re.sub(r"^React Star Wars [Pp]ortal\s*", "", title).strip() or title
    return title, session_date or "unknown-date", turns


def to_markdown(title, session_date, turns):
    lines = [f"# {title}", "", f"_Session date: {session_date}_", ""]
    for i, turn in enumerate(turns, 1):
        if not turn["prompt"] and not turn["response"]:
            continue
        lines.append(f"## Prompt {i}")
        lines.append("")
        for pline in turn["prompt"].splitlines() or [""]:
            lines.append(f"> {pline}" if pline else ">")
        lines.append("")
        if turn["actions"]:
            lines.append("**Actions:**")
            lines.append("")
            lines.extend(f"- {a}" for a in turn["actions"])
            lines.append("")
        if turn["response"]:
            lines.append("**Response:**")
            lines.append("")
            lines.append(turn["response"])
            lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


def main(argv):
    if not argv:
        print(__doc__)
        return 1
    out_dir = Path(REPO_ROOT) / "docs" / "chats"
    for arg in argv:
        src = Path(arg)
        title, session_date, turns = convert(src)
        md = to_markdown(title, session_date, turns)
        out_path = out_dir / f"{session_date}-{slugify(title)}.md"
        out_path.write_text(md)
        print(f"{src.name} -> {out_path.relative_to(REPO_ROOT)} ({len(turns)} turns)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
