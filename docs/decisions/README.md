# Decisions

Short architecture decision records (ADRs): why the system is the way it is, so future me, and any AI working on it, does not need the original conversation.

One file per decision, numbered, never renumbered. To change a decision, add a new ADR that supersedes the old one and update the old one's status.

Template:

```markdown
# NNNN. Title

- Status: proposed | accepted | superseded by NNNN
- Date: YYYY-MM-DD

## Context
What forced a decision.

## Decision
What we chose.

## Consequences
What gets easier, what gets harder, what we deferred.
```

| # | Decision | Status |
|---|---|---|
| [0001](0001-dtcg-tokens-two-tiers.md) | Tokens in W3C DTCG format, two tiers | accepted |
| [0002](0002-three-themes.md) | Three themes: light, dark, paper | accepted |
| [0003](0003-zero-dependency-build.md) | Zero-dependency build, generated files committed | accepted |
| [0004](0004-mermaid-on-github.md) | Mermaid on GitHub uses the paper theme | accepted |
| [0005](0005-two-scales.md) | Separate web and canvas scales | accepted |
| [0006](0006-mit-license.md) | MIT license | accepted |
| [0007](0007-name-mise-en-place.md) | Name: mise-en-place | accepted |
| [0008](0008-repo-settings-as-code.md) | Repo settings as code | accepted |
