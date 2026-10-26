# 0003. Zero-dependency build, generated files committed

- Status: accepted
- Date: 2026-10-26

## Context

Values must exist in one place only, yet CSS, Mermaid and plain JSON need them in different shapes. Editing three files by hand is how the carousel ended up with duplicated values. Style Dictionary is the usual tool for this.

## Decision

- Generate every output from `tokens/` with a small Node script (`scripts/build.mjs`, about 150 lines) instead of Style Dictionary.
- **No dependencies.** Node 20+ is the only requirement.
- **Commit `build/`.** Consumers, and AI assistants reading raw GitHub URLs, get ready-made files without running anything.
- CI rebuilds on every push and fails if the committed `build/` differs, then runs the contrast check.

## Why not Style Dictionary

- Three small outputs do not justify a dependency tree to audit and update.
- The script is short enough for anyone, human or AI, to read in one sitting.
- A practical trigger: the cloud environment where v0.1.0 was built could not install npm packages, so a dependency would also have meant shipping an untested build.

## Consequences

- Each new output format means writing a few lines of script.
- Revisit when outputs grow past what a short script handles well (for example Figma variables, iOS or Android), and move to Style Dictionary then. The token files need no change because they are standard DTCG.
- Generated files show up in diffs. `.gitattributes` marks them as generated so GitHub collapses them.
