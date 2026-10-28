# 0009. Two theme families: editorial and screen

- Status: accepted
- Date: 2026-10-28
- Supersedes in part: [0002](0002-three-themes.md) (which themes screens use)

## Context

v0.1.0 was extracted from the LinkedIn carousel, so it is a system for fixed media: paper, a canvas scale, Lora and Inter. Knowledge Automata now needs a docs website (a visual guide on GitHub Pages) and architecture diagrams on GitHub. Miguel compared two directions on a design canvas and chose direction B, "The pass": modern editorial with the kitchen identity ([ADR 0010](0010-screen-theme-the-pass.md)).

Its fonts and colors differ from the carousel's, but its voice, accessibility rules and diagram vocabulary are the same. A second repo would have duplicated all of that and let the two drift.

## Decision

Keep one repo and one source, split into shared foundations and two **theme families**:

- **Shared foundations** (`tokens/foundations.tokens.json` and [foundations.md](../../guidelines/foundations.md)): type and space scales, line widths, accessibility rules, the diagram status vocabulary (built, planned, stand-in, focus), and voice ([writing.md](../../guidelines/writing.md)).
- **Editorial** (`tokens/themes/editorial/`): everything that existed in v0.1. Paper, light and dark, for carousels, PDFs, social cards and Mermaid on GitHub.
- **Screen** (`tokens/themes/screen/`): light ("day service") and dark ("night service"), for websites, docs pages and the Knowledge Automata guide.

Layout:

```
tokens/
  primitives.tokens.json         Tier 1: raw colors for both families
  foundations.tokens.json        Shared: scales, line widths, canvas
  themes/
    editorial/
      family.tokens.json         Lora, Inter, body line height, label spacing
      light, dark, paper.tokens.json
    screen/
      family.tokens.json         Newsreader, Instrument Sans, JetBrains Mono, component values
      light, dark.tokens.json
```

Rules, enforced by the build:

- `family.tokens.json` holds what is specific to a family. It cannot redefine a shared token.
- Every theme in a family defines the same tokens, and every family has light and dark.
- Every theme defines at least the editorial roles, so anything built on those roles works in either family. A family may add roles (screen adds `surface.default`, `border.strong`, `background.accent`).
- Family tokens keep the same names across families (`font.family.serif` is Lora in editorial, Newsreader in screen), so CSS written once follows the family.

In `build/tokens.css`, **editorial stays the default**: with no attribute a page gets editorial light or dark, exactly as in v0.1. `data-family="screen"` switches a page or a subtree to the screen family, which follows the system's light or dark mode unless `data-theme` is set. The resolved JSON adds `shared` and `families` and keeps the v0.1 `foundations` and `themes` keys as the editorial view.

## Consequences

- Nothing that used v0.1 breaks: every CSS name and value is the same, so this is a minor release. Four tokens moved from the shared file into `editorial/family.tokens.json` (`font.family.serif`, `font.family.sans`, `font.line-height.body`, `font.letter-spacing.label`); their CSS names did not change.
- [AGENTS.md](../../AGENTS.md) rule 3 changes meaning: screens now use the screen family, not editorial light and dark. Editorial light and dark remain for fixed media and as the attribute-free default.
- A third family is a new folder and no script change.
- Paper exists only in editorial. `data-theme="paper"` inside the screen family falls back to screen light.
- Families should not be nested. The CSS handles a screen subtree on an editorial page, not the reverse.
- The diagram vocabulary is shared, but focus is drawn per family (thick border in editorial and Mermaid, top edge on screens).
