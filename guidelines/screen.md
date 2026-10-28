# Screen family: "The pass"

Color, type, shapes and components for screens: websites, docs pages and the Knowledge Automata guide. The pass is the counter between the kitchen and the dining room, where tickets hang and finished plates wait. Modern editorial, with the kitchen identity in the details: tile, ticket paper, a rail, tomato. Shared rules are in [foundations.md](foundations.md); fixed media use the [editorial family](editorial.md). Why: [ADR 0010](../docs/decisions/0010-screen-theme-the-pass.md).

Use it with `build/tokens.css` and `<html data-family="screen">`. It follows the system's light or dark mode unless `data-theme` is set.

## Color

Two themes: light ("day service") and dark ("night service").

| Role (token) | Kitchen name | Use for | Light | Dark |
|---|---|---|---|---|
| `color.background.default` | Tile | Page | `#f3f1ec` | `#191816` |
| `color.surface.default` | Ticket paper | Cards, panels, diagram boxes | `#fffefa` | `#23211e` |
| `color.text.default` | Ink | Headlines, main text, rules | `#1e1c19` | `#f1ece3` |
| `color.text.subtle` | | All small and supporting text, planned items | `#615c54` | `#a9a194` |
| `color.accent` | Tomato | Kickers, focus, the one mark that carries meaning | `#b23a22` | `#f07a5c` |
| `color.background.accent` | | Tint for selected rows and quotes. Fill only | tomato at 7% | tomato at 10% |
| `color.border.default` | Hairline | Dividers. Decorative | `#d9d4ca` | `#3a362f` |
| `color.border.strong` | | Outlines that carry meaning (planned) | `#8a8276` | `#7a7266` |
| `color.diagram.line` | | Diagram connectors | `#615c54` | `#a9a194` |

Contrast, checked by `npm run check`: ink 15:1 on tile in both themes; subtle 5.9:1 (light) and 6.9:1 (dark); tomato 5.3:1 and 6.5:1 on tile, 5.9:1 and 5.8:1 on ticket paper; `border.strong` at least 3.4:1 on tile and ticket paper. Every text color also passes on the accent tint.

The accent rules are the editorial ones: scarce, for meaning, never for whole paragraphs. Quotation marks are ink.

## Typography

| Family (token) | Font | Use for |
|---|---|---|
| `font.family.serif` | Newsreader, then Georgia | Headings, kickers, large numbers, quotes |
| `font.family.sans` | Instrument Sans, then the system UI font | Body, navigation, labels, buttons |
| `font.family.mono` | JetBrains Mono, then `ui-monospace` | Every ID (`ART-0001`, `DEC-0001`), file paths, token counts, tickets, small uppercase labels |

All three are under the SIL Open Font License. Until they are self-hosted (Later list), load them from Google Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
```

Under `data-family="screen"` the same CSS names change value, so `var(--mep-font-family-serif)` is Newsreader here and Lora in editorial. `--mep-font-family-mono` exists only in the screen family.

### Sizes

From the shared web scale ([foundations.md](foundations.md#type-scale)). The first draft used 72, 40, 24, 16 to 19 and 11 to 13; these are the nearest steps.

| Element | Token | Size | Font |
|---|---|---|---|
| Hero heading, one per page | `font.size.800` | 72px | Newsreader 500 |
| Page heading | `font.size.700` | 48px | Newsreader 500 |
| Section heading | `font.size.600` | 36px | Newsreader 500 |
| Card title | `font.size.400` | 22px | Newsreader 500 |
| Kicker | `font.size.400` | 22px | Newsreader italic, accent |
| Body | `font.size.300` (dense: `200`) | 18px (16px) | Instrument Sans 400, line-height 1.6 |
| Small label | `font.size.050` | 12px | JetBrains Mono, uppercase |

### Rules

- **Kickers:** Newsreader italic in accent, ending with a colon ("On the line:"). Same rule as the editorial kicker.
- **Small labels:** JetBrains Mono, uppercase, `0.08em` letter-spacing (`font.letter-spacing.label`), `text.subtle`.
- **IDs are always mono**, in running text too: `DEC-0001`, not DEC-0001.
- **Emphasis** is Newsreader italic, not bold.
- Body lines under about 75 characters.

## Shapes and lines

- **Square corners.** No shadows, no gradients.
- **Masthead and footer:** a 2px ink rule (`border.width.frame`, `text.default`) under the masthead and above the footer.
- **Between sections:** 1px hairlines (`border.width.hairline`, `border.default`).
- **Ticket card:** ticket paper fill, hairline border, and a 2px dashed `border.strong` top edge. One hero ticket per page may tilt by `ticket.rotate` (-1.2deg); never more than one.
- **The line (rail):** a 3px ink rule (`border.width.rule`) that stations hang from. Each station is a ticket or a status mark.

```css
.ticket {
  background: var(--mep-color-surface-default);
  border: var(--mep-border-width-hairline) solid var(--mep-color-border-default);
  border-top: var(--mep-border-width-frame) dashed var(--mep-color-border-strong);
}
.ticket--hero { transform: rotate(var(--mep-ticket-rotate)); }
.rail { border-top: var(--mep-border-width-rule) solid var(--mep-color-text-default); }
```

## Components

Values marked **proposed** are new in v0.2 and not in the first draft; confirm or change them ([status](../dev/status.md#decisions-to-confirm)).

| Component | Rule |
|---|---|
| **Keyboard focus** | 2px accent outline (`focus.ring.width`), 3px offset (`focus.ring.offset`), on `:focus-visible` only. Never removed without a replacement. |
| **Target size** | At least 44px high and wide (`size.target.min`); 48px where space allows. |
| **Link** (proposed) | Ink text with a 1px accent underline, offset 3px. Hover: the underline grows to 2px. The underline is the cue, so links never rely on color. |
| **Button, primary** | Ink fill, text in the background color, Instrument Sans 500. Hover (proposed): tomato fill. |
| **Button, secondary** | Ink outline (`border.width.mark`), ink text, no fill. Hover (proposed): accent tint fill. |
| **Selected or current** | Ink fill, text in the background color: the current page in navigation, the current step, a selected row label. A selected row with longer content uses the accent tint instead. |

Ink on tile and tile on ink are the same pair, so the selected state and the primary button pass at 15:1. Tile text on tomato passes at the accent ratio (5.3:1 light, 6.5:1 dark).

```css
:focus-visible {
  outline: var(--mep-focus-ring-width) solid var(--mep-color-accent);
  outline-offset: var(--mep-focus-ring-offset);
}
a {
  color: var(--mep-color-text-default);
  text-decoration: underline var(--mep-border-width-hairline) var(--mep-color-accent);
  text-underline-offset: 3px;
}
a:hover { text-decoration-thickness: var(--mep-border-width-frame); }
.button {
  min-height: var(--mep-size-target-min);
  padding: 0 var(--mep-space-300);
  font: 500 var(--mep-font-size-200) var(--mep-font-family-sans);
  border: var(--mep-border-width-mark) solid var(--mep-color-text-default);
}
.button--primary { background: var(--mep-color-text-default); color: var(--mep-color-background-default); }
.button--secondary { background: transparent; color: var(--mep-color-text-default); }
[aria-current], [aria-selected="true"] { background: var(--mep-color-text-default); color: var(--mep-color-background-default); }
```

### Status marks

Small mono labels that say how real something is. The vocabulary is shared ([foundations.md](foundations.md#status-vocabulary)); this is how screens draw it.

| Mark | Drawn as |
|---|---|
| `BUILT` | Solid 1.5px ink border, ink text |
| `PLANNED` | Dashed 1.5px `border.strong` border, subtle text |
| `STAND-IN` | No box: dotted underline, subtle text, with a note such as "simple code does this today" |
| `CURRENT STEP` | Ink fill, text in the background color |

All four are JetBrains Mono, `font.size.050`, uppercase, `0.08em` letter-spacing. Each one differs by line style or fill as well as color.

### Model proposed, code checked

The pair that shows where the model's output ends and deterministic code takes over. Two columns side by side, each headed by a label in Newsreader italic: "model proposed" in `text.subtle`, "code checked" in accent. The columns sit on ticket paper with a hairline between them. Use it once per page, where the hand-off is the point.

## Diagrams

Screen diagrams follow [diagrams.md](diagrams.md): the same vocabulary, with ticket paper boxes, a 6px accent top edge for focus and a double bottom border for data stores.
