# 0004. Mermaid on GitHub uses the paper theme

- Status: accepted
- Date: 2026-10-26

## Context

Knowledge Automata documents its architecture with Mermaid in GitHub Markdown. GitHub draws the diagram on a white or dark page depending on the reader, cannot load Lora or Inter, and a diagram cannot switch colors with the reader's theme. Text drawn straight on the page background cannot reach 4.5:1 on both white and dark with any single color (the luminance ranges do not overlap).

The carousel had one diagram and no rules for boxes, connectors or status.

## Decision

- Mermaid uses the `base` theme with **paper** colors, generated into `build/mermaid/`.
- **Every piece of text sits on a paper fill:** nodes, subgraphs (`clusterBkg`) and edge labels (`edgeLabelBackground`).
- **System fonts** (`font.family.system`).
- **Connectors use a new color, `color.diagram.line`** (primitive `warm-grey.500`, `#807a71`), chosen so lines keep 3:1 against white (4.25), GitHub dark (4.45), GitHub dark dimmed (3.53) and paper (3.39). `npm run check` enforces this.
- **Three classes:** `built` (solid ink border), `planned` (dashed subtle border, subtle text) and `focus` (thick accent border). Meaning is carried by line style as well as color.
- Square-cornered nodes; subgraphs for layers.

## Consequences

- Diagrams look the same for every reader, light or dark.
- The same diagram style can be reused in slides and docs.
- Sequence diagrams still draw message text on the host background and cannot pass 4.5:1 everywhere. Guidelines prefer flowcharts; a fix is on the Later list.
- Verified by rendering with Mermaid CLI on white and dark backgrounds. Still to verify on GitHub itself after the first push.
