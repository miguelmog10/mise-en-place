# Foundations

What every piece shares, whatever it is made for: theme families, accessibility, space, layout, lines and the diagram status vocabulary. Values live in [`tokens/`](../tokens); this page says how to use them. Color and type are set per family: [editorial](editorial.md) and [screen](screen.md).

## Theme families

Two families, picked by medium ([ADR 0009](../docs/decisions/0009-two-theme-families.md)).

| Family | For | Themes | Fonts |
|---|---|---|---|
| **Editorial** | Fixed media: carousels, PDFs, social cards, Mermaid on GitHub | paper, light, dark | Lora, Inter |
| **Screen** ("The pass") | Websites, docs pages, the Knowledge Automata guide | light (day service), dark (night service) | Newsreader, Instrument Sans, JetBrains Mono |

- **Fixed media: editorial paper.** It sits comfortably in light and dark feeds, and you cannot know which one the reader uses. Editorial light and dark are allowed as fixed media (the carousel shipped all three).
- **Screens: the screen family**, light by default and dark when the system asks for it.
- Every theme defines at least the editorial roles (`background.default`, `text.default`, `text.subtle`, `accent`, `border.default`, `diagram.line`), so anything built on those roles works in either family. Screen adds `surface.default`, `border.strong` and `background.accent`.

### In CSS

Load [`build/tokens.css`](../build/tokens.css). With no attribute you get editorial light or dark, exactly as in v0.1.

```html
<html>                                       <!-- editorial, follows the system -->
<html data-theme="paper">                    <!-- editorial paper -->
<html data-family="screen">                  <!-- screen, follows the system -->
<html data-family="screen" data-theme="dark"> <!-- screen, always dark -->
```

Both attributes also work on a subtree, such as one dark section of a light page. Paper exists only in the editorial family. Do not nest one family inside another.

## Accessibility

Checked by `npm run check`, never by eye. CI fails if any rule fails.

- Text, including accent used as text: **4.5:1** against every surface it can sit on (WCAG 2.2 AA, 1.4.3). For screen themes that is the background, ticket paper (`surface.default`) and the accent tint over both.
- Graphics that carry meaning, such as diagram lines and `border.strong`: **3:1** (WCAG 2.2 AA, 1.4.11).
- `border.default` is decorative and is not held to 3:1. Never use it alone to carry meaning.
- **Never color alone.** Pair color with shape, line style, a label or position (for example, planned items are dashed, not just grey).
- **Keyboard focus is always visible** on screens: see [screen.md](screen.md#components).

## Status vocabulary

One set of meanings for diagrams, guides and status marks, in both families. How each family draws them: [diagrams.md](diagrams.md) and [screen.md](screen.md#status-marks).

| Status | Meaning | Drawn as |
|---|---|---|
| **Built** | Exists today | Solid ink border, ink text |
| **Planned** | Not built yet | Dashed border, subtle text |
| **Stand-in** | Simple code does this today; the real thing is planned | Dotted underline, subtle text (screen) |
| **Focus** | The one thing this view is about | Accent: thick border (editorial), 6px top edge (screen) |

Flows follow the same split: a solid arrow is a built flow, a dotted arrow a planned one.

## Space

One naming rule for both scales: **name = pixels / 8 x 100**. `space.200` is 16px, `canvas.space.700` is 56px.

- Web (`space`, rem): 4, 8, 12, 16, 24, 32, 48, 64, 80 px.
- Canvas (`canvas.space`, px): 8, 16, 24, 32, 56, 80, 120.

Let space do the separating. Prefer a bigger gap to a line.

## Type scale

Two scales, because a 1080px image and a web page are read at very different sizes ([ADR 0005](../docs/decisions/0005-two-scales.md)). The fonts on top of them are set per family.

| Step | Web (`font.size`) | Canvas (`canvas.font.size`) | Typical use |
|---|---|---|---|
| 050 | 12px | | Small mono labels (screen) |
| 100 | 14px | 21px | Labels, captions, page numbers |
| 200 | 16px | 30px | UI text; links and diagram labels on canvas |
| 300 | 18px | 36px | Body |
| 400 | 22px | 46px | Kicker, lead paragraph; card title (screen) |
| 500 | 28px | 74px | Section heading; canvas headline |
| 600 | 36px | 104px | Page heading; section heading (screen) |
| 700 | 48px | | Display heading |
| 800 | 72px | | Hero heading, one per page (screen) |
| display | | 220px | Section numerals only |

Line-height: 1.1 headings, 1.3 lists, 1.42 canvas body. Web body is set per family: 1.5 editorial, 1.6 screen.

## Layout

- One left-aligned column. Nothing is centered.
- Generous margins. Canvas: 92 top, 96 left and right, 84 bottom.
- No grid is defined yet.

## Lines and shapes

- **Square corners** everywhere (`border.radius.none`).
- **No shadows.** **No gradients**, except the editorial highlight fill ([editorial.md](editorial.md#rules)).
- Line widths (`border.width`):

| Token | Width | Use |
|---|---|---|
| `hairline` | 1px | Dividers between sections, headers and footers |
| `mark` | 1.5px | Status marks: built and planned outlines, diagram boxes, secondary buttons |
| `frame` | 2px | Ink rule under a masthead and above a footer (screen), dashed ticket top edge, focus ring |
| `rule` | 3px | Short accent rule under a headline; the rail (screen) |
| `double` | 4px | Double bottom border of a data store (screen) |
| `edge` | 6px | Accent top edge of the focused box (screen diagrams) |

## Icons and illustration

- Thin line drawings, round caps and joins, no fill, stroke in the current text color or the accent.
- At most one illustration per piece, used as a bookend (the steaming bowl opens the carousel; Miguel's chef hat closes it).
- Arrows are text glyphs (→), not icons. No icon library.
- No photos. The style is typography-led.
