# Formats

How the foundations apply to each kind of output. Formats marked **not defined** have no rules yet; propose them, don't improvise silently.

## LinkedIn carousel

Reference: the [launch carousel](https://github.com/miguelmog10/ai-assisted-software-engineering/tree/main/posts/carousel) (v1.0).

- **Canvas:** 1080 x 1350 px (4:5 portrait). Export PDF, one slide per page, plus PNG.
- **Theme:** paper.
- **Margins:** 92 top, 96 left and right, 84 bottom (888px content width).
- **Frame on every slide:**
  - Header: series label left, page number right ("03 / 10"), hairline below.
  - Footer: author name left, marker right, hairline above.
  - Marker: accent → on every slide except the last; the last ends with a 14px solid accent square, like a full stop.
- **Content** is vertically centered between header and footer. Section slides are top-aligned instead, so their numerals sit at the same height on every slide.
- **One idea per slide.** Kicker, headline, one or two supporting lines.
- **Bookends:** one illustration on the first slide, one small mark on the last.

### Type on canvas

| Element | Token | Font |
|---|---|---|
| Header label, page number | `canvas.font.size.100` | Inter 500, uppercase label style |
| Footer author | `canvas.font.size.100` | Inter 500, subtle |
| Links, diagram labels | `canvas.font.size.200` | Inter 400 or 500 |
| Body, list items, section name | `canvas.font.size.300` | Inter 400 (section name 600) |
| Kicker, list numbers | `canvas.font.size.400` | Lora italic, accent (numbers: Lora 500, subtle) |
| Headline, closing question | `canvas.font.size.500` | Lora 500 (question: italic, accent) |
| Headline, extra large | `canvas.font.size.600` | Lora 500 |
| Section numeral | `canvas.font.size.display` | Lora italic 500, accent |

The v1.0 carousel predates this scale (its default headline was 86px). It stays as published.

## Social preview card

- 1280 x 640 px (GitHub social preview). Paper theme.
- Padding 52 top, 80 sides, 48 bottom. Headline Lora 56px, subline Inter 28px.
- Not yet on the canvas scale.

## Docs (GitHub Markdown)

- One H1 per file. Sentence-case headings.
- Lead with what the reader can do, then why.
- Tables for comparisons, lists for steps, prose for reasoning.
- Diagrams follow [diagrams.md](diagrams.md).
- Writing follows [writing.md](writing.md).

## Web pages

Load `build/tokens.css`. Body `font.size.300` on `font.line-height.body`, headings in `font.family.serif`, one left-aligned column of about 70 characters.

## Slides (16:9)

**Not defined.** Expected to follow the carousel: paper theme, frame, one idea per slide. Needs a canvas size and scale check.

## Personal mark or logo

**Not defined.** Discussed and deferred.
