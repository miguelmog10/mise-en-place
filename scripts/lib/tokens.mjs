// Loads the DTCG token files, resolves aliases and returns flat token lists.
// Zero dependencies on purpose: see docs/decisions/0003-zero-dependency-build.md.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const TOKENS = path.join(ROOT, "tokens");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

// Walk a DTCG tree and return [{ path: ["color","text","default"], type, value, description }].
// $type is inherited from the closest parent group (DTCG 2025.10, section on type resolution).
export function flatten(tree, trail = [], inheritedType) {
  const type = tree.$type ?? inheritedType;
  if ("$value" in tree) {
    return [{ path: trail, type, value: tree.$value, description: tree.$description }];
  }
  // JavaScript lists integer-like keys first, so "050" would land after "1000": sort numeric keys by value.
  const entries = Object.entries(tree).filter(([key]) => !key.startsWith("$"));
  if (entries.every(([key]) => /^\d+$/.test(key))) entries.sort(([a], [b]) => Number(a) - Number(b));
  return entries
    .flatMap(([key, child]) => flatten(child, [...trail, key], type));
}

const isAlias = (v) => typeof v === "string" && /^\{[^{}]+\}$/.test(v);

// Resolve "{a.b.c}" aliases against a map of path -> token. Chains are followed; cycles throw.
export function resolve(tokens) {
  const byPath = new Map(tokens.map((t) => [t.path.join("."), t]));
  const seen = new Set();
  const valueOf = (token) => {
    if (!isAlias(token.value)) return { value: token.value, type: token.type };
    const key = token.value.slice(1, -1);
    if (seen.has(key)) throw new Error(`Circular alias at ${key}`);
    const target = byPath.get(key);
    if (!target) throw new Error(`Unresolved alias ${token.value} in ${token.path.join(".")}`);
    seen.add(key);
    const out = valueOf(target);
    seen.delete(key);
    return { value: out.value, type: token.type ?? out.type };
  };
  return tokens.map((t) => ({ ...t, ...valueOf(t), alias: isAlias(t.value) ? t.value : undefined }));
}

// The default family is what build/tokens.css applies with no data-family attribute,
// and what the top-level "foundations" and "themes" of the resolved JSON describe (as in v0.1).
// See docs/decisions/0009-two-theme-families.md.
export const DEFAULT_FAMILY = "editorial";
// Every family needs these modes, so "follow the system" works in each one.
const REQUIRED_MODES = ["light", "dark"];

export function load() {
  const primitives = flatten(readJson(path.join(TOKENS, "primitives.tokens.json")));
  const foundations = resolve(flatten(readJson(path.join(TOKENS, "foundations.tokens.json"))));
  const themesDir = path.join(TOKENS, "themes");
  const familyNames = fs.readdirSync(themesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => d.name)
    .sort((a, b) => (a === DEFAULT_FAMILY ? -1 : b === DEFAULT_FAMILY ? 1 : a.localeCompare(b)));

  const families = {};
  for (const family of familyNames) {
    const dir = path.join(themesDir, family);
    const familyFile = path.join(dir, "family.tokens.json");
    const ownFamily = fs.existsSync(familyFile) ? flatten(readJson(familyFile)) : [];
    const familyKeys = new Set(ownFamily.map((t) => t.path.join(".")));
    const tokens = resolve([...foundations, ...ownFamily]).filter((t) => familyKeys.has(t.path.join(".")));
    const themes = {};
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".tokens.json") && f !== "family.tokens.json").sort()) {
      const name = file.replace(".tokens.json", "");
      const own = flatten(readJson(path.join(dir, file)));
      const ownKeys = new Set(own.map((t) => t.path.join(".")));
      themes[name] = resolve([...primitives, ...own]).filter((t) => ownKeys.has(t.path.join(".")));
    }
    families[family] = { tokens, themes };
  }
  validate(primitives, foundations, families);
  // v0.1 shape, kept so existing callers still work: the default family's themes.
  return { primitives, foundations, families, themes: families[DEFAULT_FAMILY].themes };
}

function validate(primitives, foundations, families) {
  for (const t of primitives) {
    if (t.type !== "color") continue;
    const { components, hex } = t.value;
    const fromComponents = "#" + components.map((c) => Math.round(c * 255).toString(16).padStart(2, "0")).join("");
    if (fromComponents !== hex.toLowerCase()) {
      throw new Error(`${t.path.join(".")}: components ${fromComponents} do not match hex ${hex}`);
    }
  }
  if (!families[DEFAULT_FAMILY]) throw new Error(`Default family "${DEFAULT_FAMILY}" not found in tokens/themes/.`);
  const shared = new Set(foundations.map((t) => t.path.join(".")));
  const keysOf = (list) => list.map((t) => t.path.join(".")).sort();
  const coreKeys = keysOf(Object.values(families[DEFAULT_FAMILY].themes)[0]);
  for (const [family, { tokens, themes }] of Object.entries(families)) {
    for (const t of tokens) {
      if (shared.has(t.path.join("."))) {
        throw new Error(`${family}/family.tokens.json redefines shared token ${t.path.join(".")}. Shared foundations cannot be overridden by a family.`);
      }
    }
    for (const mode of REQUIRED_MODES) {
      if (!themes[mode]) throw new Error(`Family "${family}" has no "${mode}" theme. Every family needs ${REQUIRED_MODES.join(" and ")}.`);
    }
    const names = Object.keys(themes);
    const first = keysOf(themes[names[0]]).join("\n");
    for (const n of names.slice(1)) {
      if (keysOf(themes[n]).join("\n") !== first) {
        throw new Error(`Theme "${family}/${n}" does not define the same tokens as "${family}/${names[0]}". Every theme in a family must define the same semantic tokens.`);
      }
    }
    const own = new Set(keysOf(themes[names[0]]));
    const missing = coreKeys.filter((k) => !own.has(k));
    if (missing.length) {
      throw new Error(`Family "${family}" is missing core roles: ${missing.join(", ")}. Every theme must define at least the ${DEFAULT_FAMILY} roles.`);
    }
  }
}

// Value formatting shared by the CSS and Mermaid outputs.
export function cssValue(token) {
  const { type, value, path: p } = token;
  if (type === "color") {
    if (value.alpha === undefined || value.alpha === 1) return value.hex;
    const [r, g, b] = value.components.map((c) => Math.round(c * 255));
    return `rgb(${r} ${g} ${b} / ${value.alpha})`;
  }
  if (type === "dimension") return `${value.value}${value.unit}`;
  if (type === "fontFamily") {
    const list = Array.isArray(value) ? value : [value];
    return list.map((f) => (/^[a-z-]+$/.test(f) ? f : `"${f}"`)).join(", ");
  }
  if (p.includes("letter-spacing")) return `${value}em`;
  if (p.includes("rotate")) return `${value}deg`;
  return String(value);
}

export const varName = (token) => `--mep-${token.path.join("-")}`;
export const get = (list, dotted) => {
  const t = list.find((x) => x.path.join(".") === dotted);
  if (!t) throw new Error(`Token not found: ${dotted}`);
  return t;
};
