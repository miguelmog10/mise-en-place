# Status

Where the work stands right now. Read this first at the start of a session, human or AI, and update it before you finish. Rewrite it rather than append; history lives in git and the [changelog](../CHANGELOG.md).

**Last updated:** 2026-10-28
**Version:** 0.1.1 · **Scale:** prototype

## Where we are

v0.1.0 is live at `miguelmog10/mise-en-place`, set up with `npm run github:setup`: tokens in three themes, a build to CSS, JSON and a Mermaid theme, a contrast check in CI, guidelines, ADRs, an AI brief, and protected `main` and release tags. A warmer, food-inspired palette is being explored for v0.2 (parked, see the backlog).

## Now

- Nothing in progress. Palette v0.2 is parked while Miguel decides.

## Next

1. First real use: architecture diagrams in Knowledge Automata, using `build/mermaid/starter.mmd`.
2. Mirror the tokens into a Claude design system, so Slides and Design pick up the style.
3. Font review (v0.2).

## Decisions to confirm

New values in v0.1.0 that did not come from the carousel. Confirm, or change them in a patch release.

- [ ] Diagram line color `#807a71` (ADR 0004).
- [ ] Web type and spacing scales, 18px body (ADR 0005).
- [ ] Canvas headline at 74px, where the carousel used 86px (ADR 0005).
- [ ] Proposed writing rules: hype-word list, sentence-case headings ([writing.md](../guidelines/writing.md)).
- [ ] MIT license (ADR 0006).
- [ ] Screen lines: 1px hairline, 3px accent rule (`border.width`).
- [ ] Web body line-height 1.5 (`font.line-height.body`); the canvas keeps 1.42.
- [ ] Line length of about 70 to 75 characters for body text ([foundations.md](../guidelines/foundations.md), [formats.md](../guidelines/formats.md)).
- [ ] Diagram habits: one focus per diagram, under about 12 boxes, top to bottom for layers, left to right for pipelines ([diagrams.md](../guidelines/diagrams.md)).

## Recent sessions

Newest first. Keep the last five; older ones are in git history.

- **2026-10-28, Miguel + Claude:** v0.1.1, Mermaid font fix (`fontFamily` at the config root).
- **2026-10-27, Miguel + Claude:** repo live via the setup script; explored a warmer palette from a mood board (parked); compared the repo against the original brief and listed the remaining unconfirmed values above.
- **2026-10-26, Miguel + Claude:** renamed to mise-en-place (ADR 0007); repo settings as code with a setup script (ADR 0008); first GitHub repo deleted to redo the setup properly.
- **2026-10-26, Miguel + Claude:** added `dev/` with this file; moved backlog and tool feedback here.
- **2026-10-26, Miguel + Claude:** v0.1.0 extracted from the launch carousel and scaffolded.
