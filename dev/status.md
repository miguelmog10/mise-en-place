# Status

Where the work stands right now. Read this first at the start of a session, human or AI, and update it before you finish. Rewrite it rather than append; history lives in git and the [changelog](../CHANGELOG.md).

**Last updated:** 2026-10-28
**Version:** 0.2.0 · **Scale:** prototype

## Where we are

v0.2.0 splits the system into shared foundations and two theme families: **editorial** (everything from v0.1: paper, light, dark, for carousels, PDFs and Mermaid on GitHub) and **screen**, "The pass" (light and dark for websites, docs pages and the Knowledge Automata guide). It adds screen components, diagram rules (legend, sequence pattern, screen Mermaid themes), and a 47-rule contrast check. v0.1.1 fixed the Mermaid font. Built in a cloud session and handed over as patches; Miguel applies, merges and tags.

## Now

- Merge and tag v0.1.1 and v0.2.0 (handover notes in the session that produced them).
- Knowledge Automata guide: first consumer of the screen family. It pins `build/tokens.css` and `build/mermaid/theme-screen-*.json` to the v0.2.0 tag.

## Next

1. Confirm the proposed screen values below on the first guide pages.
2. Check the new Mermaid outputs on github.com in light and dark (legend, sequence starter).
3. Font review: the screen family moved to Newsreader and Instrument Sans; decide whether editorial follows.
4. Mirror the tokens into a Claude design system, so Slides and Design pick up the style.

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

New in v0.2.0, not in the canvas draft of "The pass" ([screen.md](../guidelines/screen.md)):

- [ ] Section heading 36px and card title 22px (draft: 40 and 24), to stay on the shared scale (ADR 0010).
- [ ] Link: ink text, 1px accent underline, 2px on hover.
- [ ] Primary button hover: tomato fill. Secondary button hover: accent tint.
- [ ] Minimum target 44px (draft used 48px).
- [ ] Screen Mermaid focus: 3px accent border, since Mermaid cannot draw the 6px top edge.

## Recent sessions

Newest first. Keep the last five; older ones are in git history.

- **2026-10-28, Miguel + Claude:** v0.1.1, Mermaid font fix (`fontFamily` at the config root). v0.2.0 from the Knowledge Automata brief: two theme families (ADR 0009), screen theme "The pass" (ADR 0010), diagram legend and sequence pattern (ADR 0011).
- **2026-10-27, Miguel + Claude:** repo live via the setup script; explored a warmer palette from a mood board (parked); compared the repo against the original brief and listed the remaining unconfirmed values above.
- **2026-10-26, Miguel + Claude:** renamed to mise-en-place (ADR 0007); repo settings as code with a setup script (ADR 0008); first GitHub repo deleted to redo the setup properly.
- **2026-10-26, Miguel + Claude:** added `dev/` with this file; moved backlog and tool feedback here.
- **2026-10-26, Miguel + Claude:** v0.1.0 extracted from the launch carousel and scaffolded.
