# 0001. Tokens in W3C DTCG format, two tiers

- Status: accepted
- Date: 2026-10-26

## Context

The carousel defined colors as CSS variables inside one HTML file, and the social preview copied the same values by hand. The system needs one source that CSS, Mermaid, Figma, other tools and AI assistants can all read.

## Decision

- Store tokens in the **W3C Design Tokens Community Group format, version 2025.10** (the first stable version): `$value`, `$type`, `$description`, `{alias}` references, `.tokens.json` files.
- Colors use the spec's object form (`colorSpace`, `components`, `hex`). The build checks that `hex` matches `components`.
- **Two tiers**, following the approach of systems such as Atlassian's:
  - Tier 1, `primitives.tokens.json`: raw colors named by hue and lightness step (`warm-grey.750`). Never used directly.
  - Tier 2, `themes/*.tokens.json`: semantic roles (`color.text.subtle`) that reference primitives. Products use only these.
- Theme-independent tokens (type, space, lines) live in `foundations.tokens.json`.
- One file per theme, all defining the same names. The build fails if a theme is missing a token.

## Consequences

- Changing a theme means changing references in one file; nothing else moves.
- Figma and token tools that support DTCG can import the files directly.
- DTCG dimensions allow only `px` and `rem`, so letter-spacing (in `em`) is stored as a plain number and the build adds the unit.
- The format module does not standardize themes. One file per theme is a convention, not the spec. Revisit when tools support a theming standard (Later list).
- The color object form is verbose and less widely supported than hex strings by older tools. The resolved JSON in `build/` gives plain hex for those.
