# 0007. Name: mise-en-place

- Status: accepted
- Date: 2026-10-26

## Context

The repo was first called `mise-en-page` (French for page layout), with *mise en place* as a secondary nod. Since then, a kitchen theme has become part of my wider brand: the cooking analogy in my AI-assisted engineering principles (vibe cooking versus cooking for guests), the bowl and chef hat bookends in the carousel, and other projects named after kitchen ideas. The first repo was pushed but never tagged or used by anything else.

## Decision

- Rename to **`mise-en-place`**: everything prepped and in its place before you cook, which is what a design system does for design.
- Keep the CSS prefix `--mep-`: it reads as mise-en-place just as well.
- Restart the GitHub repo and git history under the new name, rather than renaming the old one, since nothing depended on it yet.

## Consequences

- The name ties the system to the kitchen story the rest of my work tells.
- A popular developer tool is also called mise, so "mise-en-place" alone is a crowded search term. Under my username it is unambiguous; always link the full `miguelmog10/mise-en-place`.
- Restarting history loses the first two commits. Their content is all here; the rename is recorded in this ADR.
