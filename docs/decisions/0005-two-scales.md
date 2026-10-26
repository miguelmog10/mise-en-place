# 0005. Separate web and canvas scales

- Status: accepted
- Date: 2026-10-26

## Context

The carousel used 17 type sizes and 13 spacing values, all ad hoc, all for a 1080px-wide image. Web and docs sizes were never defined. Dividing canvas sizes by 2.5 would put web body text near 14px, too small to read comfortably.

## Decision

- **Canvas scale** (px, for 1080px-wide images): type 21, 30, 36, 46, 74, 104 plus a 220 display size for numerals; space 8, 16, 24, 32, 56, 80, 120. Taken from the tidy-up proposed when the carousel was extracted.
- **Web scale** (rem, 16px root): type 14, 16, 18, 22, 28, 36, 48 with 18px body; space on a 4px base from 4 to 80. New values, not from the carousel.
- **One naming rule for space:** name = px / 8 x 100 (`space.200` = 16px). Type steps are ordinal (100 to 700) so a step can be retuned without renaming.

## Consequences

- The v1.0 carousel does not match the canvas scale exactly (its default headline was 86px; the scale has 74 and 104). It stays as published. The next carousel tests whether 74 is right (Later list).
- New formats (16:9 slides) need their own check before reusing the canvas scale.
