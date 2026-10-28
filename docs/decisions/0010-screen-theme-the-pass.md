# 0010. Screen theme: "The pass"

- Status: accepted
- Date: 2026-10-28

## Context

The Knowledge Automata guide needs a theme made for screens: light and dark that follow the system, long-form reading, navigation, keyboard focus, IDs and file paths everywhere, and diagrams that change state (built, planned, stand-in, current step). Miguel compared two directions on a design canvas and chose **direction B, "The pass"**: modern editorial with the kitchen identity, plus three ideas borrowed from the more technical direction (a mono face for IDs, status marks, the rail).

The pass is the counter between the kitchen and the dining room, where order tickets hang on a rail. It gives names to the parts: tile (page), ticket paper (cards), ink, tomato (accent), the line.

## Decision

- **Color:** tile background, ticket paper surface, ink, tomato accent, in light (day service) and dark (night service). Values in [screen.md](../../guidelines/screen.md#color). New primitives `stone` (greys) and `tomato`, and `tomato-tint` for the translucent accent fill.
- **New roles:** `surface.default` (cards), `border.strong` (outlines that carry meaning, held to 3:1), `background.accent` (accent at 7% light, 10% dark). The brief called the last one `accent.subtle`; `accent` is already a token and a DTCG token cannot also be a group, so it is a background role, which is also what it is: a fill.
- **`border.strong` light is `#8a8276`.** The canvas draft used `#9a9286`, which is 2.7:1 on tile and fails 3:1.
- **`diagram.line` is `text.subtle`**, as in editorial light and dark.
- **Type:** Newsreader (display), Instrument Sans (body), JetBrains Mono (IDs, paths, labels), all OFL. The screen family moves away from Inter, which feeds the font review.
- **Scale:** the draft's sizes fitted to the shared web scale, which gains `font.size.050` (12px) and `font.size.800` (72px). Section headings use 36px (draft 40px) and card titles 22px (draft 24px). Body line height 1.6.
- **Lines:** new shared widths `mark` (1.5px), `frame` (2px), `double` (4px), `edge` (6px), alongside `hairline` and `rule`.
- **Components:** focus ring (2px accent, 3px offset), 44px minimum target, primary and secondary buttons, selected state, status marks, ticket card, rail, the "model proposed / code checked" pair. Component values live in `screen/family.tokens.json`; compositions live in [screen.md](../../guidelines/screen.md#components).
- **Contrast** is enforced by `npm run check` on both background and surface, and on the accent tint over both.

## Consequences

- The guide can pin `build/tokens.css` and the screen Mermaid themes to a tag.
- Three values were not in the draft and are marked proposed: link style (ink text, accent underline), primary button hover (tomato fill), secondary button hover (accent tint). Confirm on the guide.
- Fonts load from Google Fonts until self-hosting (Later list).
- Mermaid cannot draw a single top edge, so screen Mermaid keeps a 3px accent border for focus; the 6px top edge is for diagrams built in HTML and CSS.
- Two greys, two type scales and two accents now coexist. The font review should decide whether editorial follows screen or stays as it is.
