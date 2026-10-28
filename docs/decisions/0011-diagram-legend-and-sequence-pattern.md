# 0011. Diagram legend and sequence pattern

- Status: accepted
- Date: 2026-10-28
- Closes a gap left by: [0004](0004-mermaid-on-github.md)

## Context

Diagrams mix built and planned parts, and line style alone only helps a reader who knows the code. Sequence diagrams were discouraged in v0.1: the starter set message text to `#807a71`, 3.39:1 on paper, and that text is drawn on the host background, where no single color passes 4.5:1 on both white and dark. Actor names had the same problem. Mermaid also ignored the font (fixed in 0.1.1).

## Decision

- **Legend:** every diagram with more than one status shows one: solid border built, dashed border planned, solid arrow built flow, dotted arrow planned flow. In Mermaid, a `Legend` subgraph with two pairs of example nodes. The starter includes it.
- **Sequence pattern:** wrap all messages in `rect rgb(233, 229, 222)` (paper, generated from the token), set `signalTextColor` and `loopTextColor` to `text.default` (12.9:1 on paper), and use `participant`, never `actor`. Generated as `build/mermaid/sequence-starter.mmd`.
- **Screen Mermaid themes:** `build/mermaid/theme-screen-light.json` and `theme-screen-dark.json`, generated from the screen tokens, each with the Mermaid config, a ready frontmatter block and the three `classDef` lines. Every Mermaid theme file now carries `classDefs`.
- **Data stores:** Mermaid cylinders on GitHub (rounded is unavoidable there); a square box with a 4px double bottom border on screens.

## Consequences

- Sequence diagrams are allowed again on GitHub. Verified with Mermaid CLI 11.16 on white and GitHub dark.
- The legend costs space; it is worth it for any diagram read by someone new to the system.
- GitHub limits that cannot be fixed (node shadows, no custom fonts, no theme switching, scaling to about 900px) are documented in [diagrams.md](../../guidelines/diagrams.md#known-limits-on-github).
