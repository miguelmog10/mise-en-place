# Editorial family

Color and type for fixed media: carousels, PDFs, social cards and Mermaid on GitHub. This is the family the system started with (v0.1, extracted from the launch carousel). Shared rules are in [foundations.md](foundations.md); screens use the [screen family](screen.md).

## Color

Six roles, three themes. Every theme defines the same roles, so switching theme never changes a design, only its values.

| Role (token) | Use for | Light | Dark | Paper |
|---|---|---|---|---|
| `color.background.default` | Page and canvas | `#faf8f4` | `#1d1c1a` | `#e9e5de` |
| `color.text.default` | Headlines, main text | `#1b1a18` | `#ede9e2` | `#22201d` |
| `color.text.subtle` | All small and supporting text | `#5c5750` | `#a9a39a` | `#57524b` |
| `color.accent` | Words and marks that carry meaning | `#a84a28` | `#e3906c` | `#9c4426` |
| `color.border.default` | Hairlines, dividers | `#ddd7cd` | `#3a3733` | `#c9c2b7` |
| `color.diagram.line` | Diagram connectors and arrows | `#5c5750` | `#a9a39a` | `#807a71` |

**Paper is the default** for fixed media. Light and dark as fixed media are allowed (the carousel shipped all three) but have only been checked on the carousel. They are also what `build/tokens.css` applies with no `data-family` attribute, as in v0.1.

### Rules

- **Accent is scarce.** Key phrases, kickers, numerals, one mark per piece (the swipe arrow, the final square, a diagram's focus). Not for decoration, links in body text, or whole paragraphs.
- **One color for small text.** All small or supporting text is `text.subtle`. No two-tone emphasis.
- **Quotation marks are ink**, not accent. **Secondary numbers are subtle**, not accent.
- **No pure black or white**, anywhere.
- **Highlight fill:** when an area needs emphasis, use the accent at 8% opacity fading to transparent, top to bottom (`color-mix(in srgb, var(--mep-color-accent) 8%, transparent)`). There is no separate highlight color. Used once so far; not yet a token. This is the only gradient in the system.

## Typography

| Family (token) | Font | Use for |
|---|---|---|
| `font.family.serif` | Lora, then Georgia | Headlines, quotes, kickers, numerals |
| `font.family.sans` | Inter, then the system UI font | Body, labels, header and footer |
| `font.family.system` | The system UI font | Where custom fonts cannot load (Mermaid on GitHub) |

Weights: 400 regular, 500 medium (headlines, labels), 600 semibold (section names only).

Lora and Inter came from the carousel and are not final: the font review is on the [Later list](../dev/backlog.md). The screen family already moved away from Inter.

### Rules

- **Emphasis is Lora italic in accent**, not bold. Bold is not used for emphasis.
- **Kickers:** Lora italic in accent, ending with a colon ("The catch:").
- Headlines: Lora 500, letter-spacing `-0.012em`, line-height 1.1.
- Uppercase only for small labels, with `0.16em` letter-spacing (`font.letter-spacing.label`) and `text.subtle`.
- Numbers: Roman numerals with a full stop for sections ("IV."), two-digit numbers for items ("01"), tabular figures for page numbers ("03 / 10").
- Body text: web body on `font.line-height.body` (1.5), lines under about 75 characters.

Sizes come from the shared scales in [foundations.md](foundations.md#type-scale); canvas use per element is in [formats.md](formats.md#type-on-canvas).
