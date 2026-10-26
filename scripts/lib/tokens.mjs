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

export function load() {
  const primitives = flatten(readJson(path.join(TOKENS, "primitives.tokens.json")));
  const foundations = resolve(flatten(readJson(path.join(TOKENS, "foundations.tokens.json"))));
  const themeDir = path.join(TOKENS, "themes");
  const themes = {};
  for (const file of fs.readdirSync(themeDir).filter((f) => f.endsWith(".tokens.json")).sort()) {
    const name = file.replace(".tokens.json", "");
    const own = flatten(readJson(path.join(themeDir, file)));
    const ownKeys = new Set(own.map((t) => t.path.join(".")));
    themes[name] = resolve([...primitives, ...own]).filter((t) => ownKeys.has(t.path.join(".")));
  }
  validate(primitives, themes);
  return { primitives, foundations, themes };
}

function validate(primitives, themes) {
  for (const t of primitives) {
    if (t.type !== "color") continue;
    const { components, hex } = t.value;
    const fromComponents = "#" + components.map((c) => Math.round(c * 255).toString(16).padStart(2, "0")).join("");
    if (fromComponents !== hex.toLowerCase()) {
      throw new Error(`${t.path.join(".")}: components ${fromComponents} do not match hex ${hex}`);
    }
  }
  const names = Object.keys(themes);
  const keysOf = (n) => themes[n].map((t) => t.path.join(".")).sort().join("\n");
  for (const n of names.slice(1)) {
    if (keysOf(n) !== keysOf(names[0])) {
      throw new Error(`Theme "${n}" does not define the same tokens as "${names[0]}". Every theme must define every semantic token.`);
    }
  }
}

// Value formatting shared by the CSS and Mermaid outputs.
export function cssValue(token) {
  const { type, value, path: p } = token;
  if (type === "color") return value.hex;
  if (type === "dimension") return `${value.value}${value.unit}`;
  if (type === "fontFamily") {
    const list = Array.isArray(value) ? value : [value];
    return list.map((f) => (/^[a-z-]+$/.test(f) ? f : `"${f}"`)).join(", ");
  }
  if (p.includes("letter-spacing")) return `${value}em`;
  return String(value);
}

export const varName = (token) => `--mep-${token.path.join("-")}`;
export const get = (list, dotted) => {
  const t = list.find((x) => x.path.join(".") === dotted);
  if (!t) throw new Error(`Token not found: ${dotted}`);
  return t;
};
