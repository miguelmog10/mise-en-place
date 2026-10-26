# Status

Where the work stands right now. Read this first at the start of a session, human or AI, and update it before you finish. Rewrite it rather than append; history lives in git and the [changelog](../CHANGELOG.md).

**Last updated:** 2026-10-26
**Version:** 0.1.0 (ready, not yet on GitHub) · **Scale:** prototype

## Where we are

v0.1.0 is complete locally under its new name, mise-en-place: tokens in three themes, a build to CSS, JSON and a Mermaid theme, a contrast check for CI, guidelines, ADRs, an AI brief, and a script that creates and configures the GitHub repo in one command. The first repo (`mise-en-page`) was deleted to start over cleanly.

## Now

- Second round of the GitHub setup, this time with the script: [repo-setup.md](repo-setup.md). It has only been tested against a simulated GitHub, so this run is its real test.

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

## Recent sessions

Newest first. Keep the last five; older ones are in git history.

- **2026-10-26, Miguel + Claude:** renamed to mise-en-place (ADR 0007); repo settings as code with a setup script (ADR 0008); first GitHub repo deleted to redo the setup properly.
- **2026-10-26, Miguel + Claude:** added `dev/` with this file; moved backlog and tool feedback here.
- **2026-10-26, Miguel + Claude:** v0.1.0 extracted from the launch carousel and scaffolded.
