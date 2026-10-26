# Brief for AI assistants

You are helping Miguel Morales produce something that should follow his design system, **mise-en-place**. Read this page first. Follow it unless Miguel says otherwise in the conversation.

## The style in one line

Minimal, editorial, typography-led. Warm grey paper, near-black ink, one terracotta accent used sparingly, square corners, generous space, no decoration for its own sake.

## Where the values are

- Resolved values, flat and easy to read: `build/tokens.resolved.json`
- CSS custom properties: `build/tokens.css`
- Mermaid diagrams: `build/mermaid/starter.mmd`
- Rules: `guidelines/foundations.md`, `guidelines/diagrams.md`, `guidelines/writing.md`, `guidelines/formats.md`

Raw URLs for the current version: `https://raw.githubusercontent.com/miguelmog10/mise-en-place/main/<path>`

## Hard rules

1. **Use semantic tokens, never primitives.** `color.text.subtle`, not `color.warm-grey.750` or a hex you picked.
2. **Do not invent design values.** If something is not defined, say so and propose a value as a question. Gaps are listed in `dev/backlog.md`.
3. **Pick the theme by medium.** Screens: light or dark (follow the system). Fixed media (images, PDFs, carousels, Mermaid on GitHub): paper.
4. **Accent is for meaning.** Key words, kickers, numerals, one mark. Never for decoration, never for whole paragraphs. Quotation marks and secondary numbers are not accent.
5. **No pure black or pure white.** No rounded corners. No shadows. No gradients except the 8% accent fade in diagrams.
6. **Accessibility is not optional.** Text 4.5:1, graphics 3:1, and never color alone to carry meaning.
7. **Writing:** first person, plain American English, short sentences, no hype, no em dashes. See `guidelines/writing.md`.
8. **Typography:** Lora (serif) for headlines, quotes and numerals; Inter (sans) for body and labels. Emphasis is Lora italic in accent, not bold.

## If you change this repo

- Edit `tokens/`, never `build/`. Run `npm run verify` and commit `build/` with the change.
- Record decisions in `docs/decisions/` (short ADR) and note changes in `CHANGELOG.md`.
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`), small pull requests, and a co-author trailer when an AI helped.
- Start by reading `dev/status.md`, and update it before you finish.
- Add anything you defer to `dev/backlog.md`. Add tool friction you hit to `dev/tool-feedback.md`.
