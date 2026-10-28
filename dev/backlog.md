# Backlog

The Later list: everything deliberately deferred, so it lives in the repo and not in anyone's head. When you start an item, move it to "Now" in [status.md](status.md); delete it here when it is done or no longer wanted.

## Next

- [ ] **Social preview** (Settings > General): manual, no API. Skip until it is generated from tokens (below).

## Design

- [ ] **Font review (v0.2).** Lora and Inter were picked partly because they were available, not chosen against alternatives. Inter is also the default of many AI-generated interfaces. Compare a few serif and sans pairs on the carousel and a doc page, then decide in an ADR.
- [ ] **Validate canvas headline size.** The v1.0 default headline was 86px; the scale has 74 and 104. Test on the next carousel.
- [ ] **Palette v0.2 (parked).** A warmer, food-inspired palette from a mood board (creativomerch, slides 10 to 13). Favorite direction: cream paper `#F3E2C1` with burgundy ink `#590222` and a rust accent `#A61F12` for light and paper; burgundy `#590222` with cream text and golden amber `#FCBC03` for dark; olive `#8A9169` as quiet support. Marigold and amber fail as text on cream, so fills only there. The market palette (green, blue, chili red, gold) is a candidate illustration palette for carousels, not the core system. Decide, then tokens, contrast check, ADR, and a sample slide and diagram.
- [ ] **Slides (16:9).** Still not defined; it was goal 4 of the original brief. Decide canvas size, frame and type scale. Best done together with the Claude design system mirror, which needs a 16:9 answer anyway.
- [ ] **Self-host fonts** in `assets/fonts/` with their OFL license and a generated `fonts.css`.
- [ ] **Icons:** move the steaming bowl and chef hat into `assets/icons/`, with a note on reuse of personal marks.
- [ ] **Personal mark or logo.** Deferred since the carousel.
- [ ] **Highlight fill token** (accent at 8%) once it is used a second time.
- [ ] **Canvas diagram connectors** (arrows and boxes on images). Only one canvas diagram exists so far.
- [ ] **Check light and dark on other formats** (only checked on the carousel).
- [ ] **Social preview card from tokens**, for this repo and the principles repo.

## Tooling and integrations

- [ ] **Repo template.** Once `setup-github.mjs` has set up two or three repos (this one, Knowledge Automata, the principles repo), move it with the workflow and rulesets into a template repo.

- [ ] **Mirror into a Claude Design System artifact** so Claude Slides and Design use these tokens directly.
- [ ] **Figma variables import** (light, dark, paper as modes).
- [ ] **Consume from the principles repo:** point the carousel at `build/tokens.css` instead of its own copy.
- [ ] **Sequence diagram contrast.** Message text sits on the host background; find a pattern that passes 4.5:1 on white and dark, or keep preferring flowcharts.
- [ ] **DTCG theming.** Revisit one-file-per-theme when tools support a theming standard.
- [ ] **Move to Style Dictionary** if outputs outgrow the build script (ADR 0003).
