# 0002. Three themes: light, dark, paper

- Status: superseded in part by [0009](0009-two-theme-families.md): screens now use the screen family
- Date: 2026-10-26

## Context

The carousel shipped three fully defined themes: `neutral` (warm grey, published), `light` and `dark`. In token systems "neutral" usually names a grey color role, not a theme, which invites confusion. Fixed media (images, PDFs, diagrams on GitHub) cannot know whether the reader is in light or dark mode.

## Decision

- Keep **three fully defined themes**, all passing the same contrast rules.
- Rename `neutral` to **`paper`**.
- **Screens** default to light and follow the system's dark mode (`prefers-color-scheme`) unless `data-theme` is set.
- **Fixed media** default to paper, because it sits comfortably on both light and dark hosts.

## Consequences

- The web output needs no JavaScript for dark mode.
- Light and dark as fixed media have only been checked on the carousel; other formats need checking before use (Later list).
- Any consumer that used `neutral` must switch to `paper`.
