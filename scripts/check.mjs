// Checks the tokens against the accessibility rules in guidelines/foundations.md.
// Run: npm run check. Exits with 1 if any rule fails.
import { load, cssValue, get } from "./lib/tokens.mjs";

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Backgrounds a paper diagram can land on when it is not on our own page.
const HOSTS = { white: "#ffffff", "github dark": "#0d1117", "github dark dimmed": "#22272e" };

const { themes } = load();
const rows = [];
const rule = (theme, fg, bg, min, label) => {
  const r = ratio(fg, bg);
  rows.push({ theme, pair: label, ratio: r.toFixed(2), min, ok: r >= min });
};

for (const [name, list] of Object.entries(themes)) {
  const c = (d) => cssValue(get(list, d));
  const bg = c("color.background.default");
  rule(name, c("color.text.default"), bg, 4.5, "text.default on background");
  rule(name, c("color.text.subtle"), bg, 4.5, "text.subtle on background");
  rule(name, c("color.accent"), bg, 4.5, "accent on background (used as text)");
  rule(name, c("color.diagram.line"), bg, 3, "diagram.line on background");
}
const paperLine = cssValue(get(themes.paper, "color.diagram.line"));
for (const [host, hex] of Object.entries(HOSTS)) {
  rule("paper", paperLine, hex, 3, `diagram.line on ${host} (Mermaid on GitHub)`);
}

console.table(rows.map(({ ok, ...r }) => ({ ...r, result: ok ? "pass" : "FAIL" })));
const failed = rows.filter((r) => !r.ok);
if (failed.length) {
  console.error(`${failed.length} contrast rule(s) failed.`);
  process.exit(1);
}
console.log("All contrast rules pass (WCAG 2.2: 4.5:1 text, 3:1 graphics).");
