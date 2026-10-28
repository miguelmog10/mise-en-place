# Brief for AI assistants

You are helping Miguel Morales produce something that should follow his design system, **mise-en-place**. Read this page first. Follow it unless Miguel says otherwise in the conversation.

## The style in one line

Minimal, editorial, typography-led. Warm paper or tile, near-black ink, one warm accent used sparingly, square corners, generous space, no decoration for its own sake.

## Two theme families

- **Editorial** (fixed media: carousels, PDFs, social cards, Mermaid on GitHub): paper, light, dark. Lora and Inter. Terracotta accent.
- **Screen**, "The pass" (websites, docs pages, the Knowledge Automata guide): light and dark. Newsreader, Instrument Sans, JetBrains Mono. Tomato accent, tile background, ticket paper cards.

## Where the values are

- Resolved values, flat and easy to read: `build/tokens.resolved.json`
- CSS custom properties: `build/tokens.css` (editorial by default; add `data-family="screen"` for the screen family)
- Mermaid on GitHub: `build/mermaid/starter.mmd`, `build/mermaid/sequence-starter.mmd`
- Mermaid on screens: `build/mermaid/theme-screen-light.json`, `build/mermaid/theme-screen-dark.json`
- Rules: `guidelines/foundations.md` (shared), `guidelines/editorial.md`, `guidelines/screen.md`, `guidelines/diagrams.md`, `guidelines/writing.md`, `guidelines/formats.md`

Raw URLs for the current version: `https://raw.githubusercontent.com/miguelmog10/mise-en-place/main/<path>`

## Hard rules

1. **Use semantic tokens, never primitives.** `color.text.subtle`, not `color.warm-grey.750` or a hex you picked.
2. **Do not invent design values.** If something is not defined, say so and propose a value as a question. Gaps are listed in `dev/backlog.md`.
3. **Pick the family by medium.** Screens (websites, docs pages): the screen family, light or dark following the system. Fixed media (images, PDFs, carousels, Mermaid on GitHub): editorial paper.
4. **Accent is for meaning.** Key words, kickers, numerals, one mark. Never for decoration, never for whole paragraphs. Quotation marks and secondary numbers are not accent.
5. **No pure black or pure white.** No rounded corners. No shadows. No gradients, except the 8% accent fade in editorial diagrams.
6. **Accessibility is not optional.** Text 4.5:1, graphics 3:1, and never color alone to carry meaning.
7. **Writing:** first person, plain American English, short sentences, no hype, no em dashes. See `guidelines/writing.md`.
8. **Typography by family.** Editorial: Lora for headlines, quotes and numerals; Inter for body and labels. Screen: Newsreader for headings, kickers and quotes; Instrument Sans for body and UI; JetBrains Mono for every ID, file path and small label. Emphasis is serif italic, not bold. Kickers are serif italic in accent, ending with a colon.
9. **Diagrams:** built is solid, planned is dashed, focus is accent, and every diagram with more than one status has a legend. See `guidelines/diagrams.md`.

## If you change this repo

- Edit `tokens/`, never `build/`. Run `npm run verify` and commit `build/` with the change.
- Record decisions in `docs/decisions/` (short ADR) and note changes in `CHANGELOG.md`.
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`), small pull requests, and a co-author trailer when an AI helped.
- Start by reading `dev/status.md`, and update it before you finish.
- Add anything you defer to `dev/backlog.md`. Add tool friction you hit to `dev/tool-feedback.md`.
