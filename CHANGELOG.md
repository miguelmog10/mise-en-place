# Changelog

How the design system evolves, recorded as it happens. Versions follow the rules in the [README](README.md#versioning).

## [0.2.0] - 2026-10-28

A second theme family for screens. Requested by the Knowledge Automata guide, which pins `build/tokens.css` and the screen Mermaid themes to this tag.

**New**

- **Two theme families** in one repo: editorial (everything in v0.1) and screen. Shared foundations hold the scales, line widths, accessibility rules and the diagram status vocabulary ([ADR 0009](docs/decisions/0009-two-theme-families.md)).
- **Screen theme, "The pass"**: light (day service) and dark (night service), with tile, ticket paper, ink and tomato; Newsreader, Instrument Sans and JetBrains Mono ([ADR 0010](docs/decisions/0010-screen-theme-the-pass.md), [screen.md](guidelines/screen.md)). Use it with `<html data-family="screen">`.
- New roles in the screen family: `surface.default`, `border.strong`, `background.accent`. New primitives: `stone`, `tomato`, `tomato-tint`.
- Screen components: focus ring, 44px targets, buttons, selected state, status marks (`BUILT`, `PLANNED`, `STAND-IN`, `CURRENT STEP`), ticket card, rail, and the "model proposed / code checked" pair.
- Shared scale steps `font.size.050` (12px) and `font.size.800` (72px); line widths `border.width.mark` (1.5px), `frame` (2px), `double` (4px) and `edge` (6px).
- **Diagram rules** ([ADR 0011](docs/decisions/0011-diagram-legend-and-sequence-pattern.md)): a legend on every diagram with more than one status (added to the starter, the README and the guideline example), focus and data stores per family, and a sequence pattern that passes 4.5:1 on white and dark.
- `build/mermaid/sequence-starter.mmd`, `theme-screen-light.json` and `theme-screen-dark.json`. Every Mermaid theme file now also carries `classDefs` and a ready `frontmatter` block.
- Known GitHub limits documented: node shadows, no custom fonts or theme switching, scaling to about 900px ([diagrams.md](guidelines/diagrams.md#known-limits-on-github)).
- `npm run check` covers every theme in every family, on background and surface, and text on the accent tint (47 rules).
- Guidelines split: [foundations.md](guidelines/foundations.md) (shared), [editorial.md](guidelines/editorial.md), [screen.md](guidelines/screen.md).

**Changed**

- Editorial theme files moved to `tokens/themes/editorial/`. `font.family.serif`, `font.family.sans`, `font.line-height.body` and `font.letter-spacing.label` moved into `editorial/family.tokens.json`. CSS names and values are unchanged, and editorial is still what `build/tokens.css` applies with no attribute.
- `tokens.resolved.json` adds `defaultFamily`, `shared` and `families`. The v0.1 `foundations` and `themes` keys stay, as the editorial view.
- Mermaid message and loop text are ink instead of `diagram.line` (3.39:1 on paper, which failed 4.5:1).
- The starter's flow to a planned component is now dotted, as the vocabulary says.
- [AGENTS.md](AGENTS.md): screens use the screen family; typography and diagram rules per family.

## [0.1.1] - 2026-10-28

**Fixed**

- Mermaid diagrams now use the system font stack. Mermaid 11 reads `fontFamily` only from the root of `config`, so the value under `themeVariables` was ignored and diagrams rendered in Mermaid's default (Trebuchet MS). The build now writes `fontFamily` at the config root of `build/mermaid/starter.mmd` and `build/mermaid/theme.json`, and keeps the `themeVariables` copy. The examples in the README and [diagrams.md](guidelines/diagrams.md) are updated. Checked with Mermaid CLI 11.16: the SVG now contains only the system stack.

## [0.1.0] - 2026-10-26

First version, extracted from the launch carousel of [AI-Assisted Software Engineering](https://github.com/miguelmog10/ai-assisted-software-engineering/tree/main/posts/carousel) (v1.0) and tidied into a system.

**Kept from the carousel**

- All 15 colors across three themes, with the same WCAG AA ratios.
- Lora and Inter, weights, letter-spacing, canvas size and margins, square corners, the accent rules.

**Changed from the carousel**

- `neutral` theme renamed `paper` ([ADR 0002](docs/decisions/0002-three-themes.md)).
- Unused `--frame` color dropped.
- 17 ad hoc canvas type sizes collapsed into a 6-step scale plus one display size, and ad hoc spacing into a 7-step scale ([ADR 0005](docs/decisions/0005-two-scales.md)). The v1.0 carousel is not re-rendered.

**New**

- Tokens in W3C DTCG 2025.10 format, two tiers ([ADR 0001](docs/decisions/0001-dtcg-tokens-two-tiers.md)).
- Web type and spacing scales, real font fallbacks.
- `color.diagram.line` and primitive `warm-grey.500` (#807a71) for diagram connectors that stay visible on white, GitHub dark and paper.
- Zero-dependency build to CSS, resolved JSON and a Mermaid theme, plus a contrast check, run in CI ([ADR 0003](docs/decisions/0003-zero-dependency-build.md)).
- Diagram rules: built, planned and focus ([ADR 0004](docs/decisions/0004-mermaid-on-github.md)).
- Guidelines, AI brief, and a `dev/` folder for how the system is built: status, backlog (the Later list), tool feedback.
- Repo settings as code: `.github/repo-settings.json`, rulesets, and `npm run github:plan` and `npm run github:setup` to create and configure the GitHub repo in one command ([ADR 0008](docs/decisions/0008-repo-settings-as-code.md)).
- Named `mise-en-place` ([ADR 0007](docs/decisions/0007-name-mise-en-place.md)).
