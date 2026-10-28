// Checks the tokens against the accessibility rules in guidelines/foundations.md.
// Run: npm run check. Exits with 1 if any rule fails.
import { load, get } from "./lib/tokens.mjs";

const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const luminance = (hex) => {
  const [r, g, b] = channels(hex).map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
// A translucent color as it looks on an opaque one (sRGB alpha compositing, as browsers do).
const over = (top, alpha, under) => "#" + channels(top)
  .map((c, i) => Math.round(c * alpha + channels(under)[i] * (1 - alpha)).toString(16).padStart(2, "0")).join("");

// Backgrounds a paper diagram can land on when it is not on our own page.
const HOSTS = { white: "#ffffff", "github dark": "#0d1117", "github dark dimmed": "#22272e" };

const { families } = load();
const rows = [];
const rule = (theme, fg, bg, min, label) => {
  const r = ratio(fg, bg);
  rows.push({ theme, pair: label, ratio: r.toFixed(2), min, ok: r >= min });
};

for (const [family, { themes }] of Object.entries(families)) {
  for (const [name, list] of Object.entries(themes)) {
    const theme = `${family}/${name}`;
    const has = (d) => list.some((t) => t.path.join(".") === d);
    const color = (d) => get(list, d).value;
    const hex = (d) => color(d).hex;

    // Every opaque surface text can sit on. Screen themes add ticket paper.
    const grounds = [["background", hex("color.background.default")]];
    if (has("color.surface.default")) grounds.push(["surface", hex("color.surface.default")]);

    for (const [where, bg] of grounds) {
      rule(theme, hex("color.text.default"), bg, 4.5, `text.default on ${where}`);
      rule(theme, hex("color.text.subtle"), bg, 4.5, `text.subtle on ${where}`);
      rule(theme, hex("color.accent"), bg, 4.5, `accent on ${where} (used as text)`);
      rule(theme, hex("color.diagram.line"), bg, 3, `diagram.line on ${where}`);
      if (has("color.border.strong")) rule(theme, hex("color.border.strong"), bg, 3, `border.strong on ${where}`);
    }
    // The accent tint is a fill: text on it is checked as it renders, over each surface.
    if (has("color.background.accent")) {
      const tint = color("color.background.accent");
      for (const [where, bg] of grounds) {
        const mixed = over(tint.hex, tint.alpha ?? 1, bg);
        rule(theme, hex("color.text.default"), mixed, 4.5, `text.default on accent tint over ${where}`);
        rule(theme, hex("color.text.subtle"), mixed, 4.5, `text.subtle on accent tint over ${where}`);
        rule(theme, hex("color.accent"), mixed, 4.5, `accent on accent tint over ${where}`);
      }
    }
  }
}
const paperLine = get(families.editorial.themes.paper, "color.diagram.line").value.hex;
for (const [host, hex] of Object.entries(HOSTS)) {
  rule("editorial/paper", paperLine, hex, 3, `diagram.line on ${host} (Mermaid on GitHub)`);
}

console.table(rows.map(({ ok, ...r }) => ({ ...r, result: ok ? "pass" : "FAIL" })));
const failed = rows.filter((r) => !r.ok);
if (failed.length) {
  console.error(`${failed.length} contrast rule(s) failed.`);
  process.exit(1);
}
console.log(`All ${rows.length} contrast rules pass (WCAG 2.2: 4.5:1 text, 3:1 graphics).`);
