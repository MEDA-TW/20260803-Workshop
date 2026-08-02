# Project Architecture Guide

This project is a **documentation repository** for MEDA Lab. It is written in Markdown and is used as the shared handbook for onboarding, GitHub collaboration, AI tool setup, skills usage, and the MEDA Lab Web Design System.

`CLAUDE.md` is read by Claude Code. Keep this file consistent with `AGENTS.md`.

---

## Project Purpose

- Help new MEDA Lab members set up their development environment.
- Document GitHub workflow, branch naming, Pull Request, and code review conventions.
- Explain how to use and maintain `CLAUDE.md`, `AGENTS.md`, local agent settings, and shared skills.
- Provide a reusable MEDA Lab Web Design System baseline for future web projects.

This repo is a handbook first. Prefer clear, beginner-friendly documentation over implementation-heavy content.

---

## Repository Structure

| Path | Purpose |
|------|---------|
| `README.md` | Main handbook entry and chapter navigation |
| `01-getting-started/` | Environment setup, GitHub Desktop, Claude Code / Codex CLI setup |
| `02-github-workflow/` | Branch management, naming conventions, PR workflow |
| `03-collaboration/` | Documentation contribution, project rule files, shared skills guide |
| `04-design-system/` | MEDA Lab Web Design System, component specs, token baseline |
| `skills/` | MEDA Lab shared skills index and recommendations |
| `MEMORY.md` | Cross-tool project memory and current state snapshot |

---

## Language and Writing Style

- Primary language is **Traditional Chinese (Taiwan)**.
- Use beginner-friendly wording. Assume readers may be new to Git, GitHub, terminal tools, or AI agents.
- Prefer concrete steps, examples, command snippets, and expected outcomes.
- Avoid unexplained jargon. If technical terms are necessary, briefly explain them.
- Keep headings descriptive and searchable.
- Chinese and English / numbers should be separated by a half-width space.
- Avoid emoji in official documentation.

---

## Documentation Rules

- Keep each chapter focused on one workflow or concept.
- When adding a new guide, update the nearest `README.md` chapter navigation and the root `README.md` if it is a new major topic.
- Use relative links between files so the handbook works on GitHub and locally.
- Prefer tables for navigation, checklists, role comparisons, and step summaries.
- Do not duplicate long instructions across multiple files. Link to the canonical file instead.
- If a workflow changes, update all affected references in the same change.
- If the task changes long-term project context, update `MEMORY.md` before finishing.

---

## Design System

- Before creating, changing, reviewing, or documenting any MEDA Lab Web UI, first read the Design System entry: [`04-design-system/README.md`](../04-design-system/README.md).
- All MEDA Lab Web UI guidance must follow the core Design System rules in [`04-design-system/DESIGN.md`](../04-design-system/DESIGN.md).
- Component and token details must follow [`04-design-system/design-system/components.md`](../04-design-system/design-system/components.md) and [`04-design-system/design-system/web/tokens.css`](../04-design-system/design-system/web/tokens.css).
- The official brand name is `MEDA Lab`.
- Design System content should remain Web-focused unless the document explicitly says it is adapting principles for another platform.
- Do not introduce arbitrary colors, component variants, visual patterns, or UI guidance without updating the relevant Design System files.

---

## Skills and Agent Rules

- The shared skills guide is in [`skills/README.md`](../skills/README.md).
- The collaboration guide for `CLAUDE.md` and `AGENTS.md` is [`03-collaboration/02-project-guide.md`](02-project-guide.md).
- `CLAUDE.md` and `AGENTS.md` should describe the same project rules; keep them synchronized.
- Personal preferences belong in `CLAUDE.local.md` or `AGENTS.local.md`, not in shared project files.

---

## Git and Collaboration

- Follow the branch and PR workflow documented in [`02-github-workflow/`](../02-github-workflow/).
- Do not rewrite or delete existing user changes unless explicitly requested.
- Keep edits scoped to the requested files and nearby documentation that must be updated for consistency.
- Before large documentation rewrites, inspect related files and preserve useful existing content.
- For documentation-only changes, verification usually means reading the edited files, checking links, and searching for outdated terminology.

---

## Validation Checklist

After editing documentation, verify:

- Links point to existing files.
- Chapter navigation is updated when needed.
- `MEDA Lab` naming is consistent.
- UI / Web guidance follows `04-design-system/README.md`, `04-design-system/DESIGN.md`, `04-design-system/design-system/components.md`, and `04-design-system/design-system/web/tokens.css`.
- `CLAUDE.md` and `AGENTS.md` remain aligned when one is changed.
- Markdown headings, tables, and code fences render correctly.
- No stale references remain after renaming or moving content.

---

## Response Expectations

- Respond in Traditional Chinese (Taiwan) unless the user explicitly requests another language.
- Lead with the result, risk, or next step.
- When reporting changes, say what changed, how it was verified, and what remains as a limitation.
- If a requested change conflicts with existing handbook rules, point it out and propose a practical path forward.
