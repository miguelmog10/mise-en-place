# Foundations

Color, type, space and lines. Values live in [`tokens/`](../tokens); this page says how to use them.

## Color

Five roles, three themes. Every theme defines the same roles, so switching theme never changes a design, only its values.

| Role (token) | Use for | Light | Dark | Paper |
|---|---|---|---|---|
| `color.background.default` | Page and canvas | `#faf8f4` | `#1d1c1a` | `#e9e5de` |
| `color.text.default` | Headlines, main text | `#1b1a18` | `#ede9e2` | `#22201d` |
| `color.text.subtle` | All small and supporting text | `#5c5750` | `#a9a39a` | `#57524b` |
| `color.accent` | Words and marks that carry meaning | `#a84a28` | `#e3906c` | `#9c4426` |
| `color.border.default` | Hairlines, dividers | `#ddd7cd` | `#3a3733` | `#c9c2b7` |
| `color.diagram.line` | Diagram connectors and arrows | `#5c5750` | `#a9a39a` | `#807a71` |

### Which theme

- **Screens** (web, docs sites, apps): light by default, dark when the system asks for it. `build/tokens.css` does this for you.
- **Fixed media** (images, PDFs, carousels, social cards, Mermaid on GitHub): paper. It sits comfortably in both light and dark feeds, and you cannot know which one the reader uses.
- Light and dark as fixed media are allowed (the carousel shipped all three) but have only been checked on the carousel.

### Rules

- **Accent is scarce.** Key phrases, kickers, numerals, one mark per piece (the swipe arrow, the final square, a diagram's top edge). Not for decoration, links in body text, or whole paragraphs.
- **One color for small text.** All small or supporting text is `text.subtle`. No two-tone emphasis.
- **Quotation marks are ink**, not accent. **Secondary numbers are subtle**, not accent.
- **No pure black or white**, anywhere.
- **Highlight fill:** when an area needs emphasis, use the accent at 8% opacity fading to transparent, top to bottom (`color-mix(in srgb, var(--mep-color-accent) 8%, transparent)`). There is no separate highlight color. Used once so far; not yet a token.

## Accessibility

Checked by `npm run check`, never by eye. CI fails if any rule fails.

- Text, including accent used as text: **4.5:1** against its background (WCAG 2.2 AA, 1.4.3).
- Graphics that carry meaning, such as diagram lines: **3:1** (WCAG 2.2 AA, 1.4.11).
- `border.default` is decorative and is not held to 3:1. Never use it alone to carry meaning.
- **Never color alone.** Pair color with shape, line style, a label or position (for example, planned components are dashed, not just grey).

## Typography

| Family (token) | Font | Use for |
|---|---|---|
| `font.family.serif` | Lora, then Georgia | Headlines, quotes, kickers, numerals |
| `font.family.sans` | Inter, then the system UI font | Body, labels, header and footer |
| `font.family.system` | The system UI font | Where custom fonts cannot load (Mermaid on GitHub) |

Weights: 400 regular, 500 medium (headlines, labels), 600 semibold (section names only).

Lora and Inter came from the carousel and are not final: a deliberate font review is on the [Later list](../dev/backlog.md).

### Rules

- **Emphasis is Lora italic in accent**, not bold. Bold is not used for emphasis.
- Headlines: Lora 500, letter-spacing `-0.012em`, line-height 1.1.
- Uppercase only for small labels, with `0.16em` letter-spacing and `text.subtle`.
- Numbers: Roman numerals with a full stop for sections ("IV."), two-digit numbers for items ("01"), tabular figures for page numbers ("03 / 10").
- Body text: keep lines under about 75 characters.

### Sizes

Two scales, because a 1080px image and a web page are read at very different sizes ([ADR 0005](../docs/decisions/0005-two-scales.md)).

| Step | Web (`font.size`) | Canvas (`canvas.font.size`) | Typical use |
|---|---|---|---|
| 100 | 14px | 21px | Labels, captions, page numbers |
| 200 | 16px | 30px | UI text; links and diagram labels on canvas |
| 300 | 18px | 36px | Body |
| 400 | 22px | 46px | Kicker, lead paragraph |
| 500 | 28px | 74px | Section heading; canvas headline |
| 600 | 36px | 104px | Page heading; canvas headline, extra large |
| 700 | 48px | | Display heading |
| display | | 220px | Section numerals only |

Line-height: 1.1 headings, 1.3 lists, 1.5 web body, 1.42 canvas body.

## Space

One naming rule for both scales: **name = pixels / 8 x 100**. `space.200` is 16px, `canvas.space.700` is 56px.

- Web (`space`, rem): 4, 8, 12, 16, 24, 32, 48, 64, 80 px.
- Canvas (`canvas.space`, px): 8, 16, 24, 32, 56, 80, 120.

Let space do the separating. Prefer a bigger gap to a line.

## Layout

- One left-aligned column. Nothing is centered.
- Generous margins. Canvas: 92 top, 96 left and right, 84 bottom.
- No grid is defined yet.

## Lines and shapes

- **Square corners** everywhere (`border.radius.none`).
- **Hairlines** (`border.width.hairline`, `color.border.default`) for headers, footers and dividers only. No lines between list items.
- **Accent rule:** a short bar under a headline, 120 x 4px on canvas, 3px thick on screen.
- No shadows. No gradients except the highlight fill above.

## Icons and illustration

- Thin line drawings, round caps and joins, no fill, stroke in the current text color or the accent.
- At most one illustration per piece, used as a bookend (the steaming bowl opens the carousel; Miguel's chef hat closes it).
- Arrows are text glyphs (→), not icons. No icon library.
- No photos. The style is typography-led.
