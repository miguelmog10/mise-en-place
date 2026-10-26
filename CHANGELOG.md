# Changelog

How the design system evolves, recorded as it happens. Versions follow the rules in the [README](README.md#versioning).

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
