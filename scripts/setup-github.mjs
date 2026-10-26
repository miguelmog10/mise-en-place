// Creates the GitHub repo from this folder and applies its settings, in one command.
// Safe to run again: it creates what is missing and updates what exists.
//
//   npm run github:plan    show every step, change nothing (--dry-run)
//   npm run github:setup   do it, and tag v<package.json version> (--tag)
//   node scripts/setup-github.mjs [--dry-run] [--tag]   same, without npm
//
// The npm scripts carry their flags so you never pass "--" yourself: PowerShell
// drops "--", which would turn a dry run into a real one.
//
// Needs: git, Node 20+, and the GitHub CLI signed in (gh auth login).
// Reads .github/repo-settings.json and .github/rulesets/*.json. See dev/repo-setup.md.
// No dependencies, no link to the rest of this repo: copy it to reuse it.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Standalone on purpose: copy this file plus .github/ into another repo to reuse it.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Stop with a plain message, not a stack trace.
process.on("uncaughtException", (e) => {
  console.error(`\nStopped: ${e.message}`);
  process.exit(1);
});

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const TAG = args.has("--tag");

const config = JSON.parse(fs.readFileSync(path.join(ROOT, ".github", "repo-settings.json"), "utf8"));
const repo = `${config.owner}/${config.name}`;

// --- helpers ---------------------------------------------------------------
const show = (cmd, cmdArgs, body) =>
  console.log(`  $ ${cmd} ${cmdArgs.map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(" ")}${body ? `  <<< ${JSON.stringify(body)}` : ""}`);

// Read-only commands always run (even in a dry run), so the plan reflects reality.
function read(cmd, cmdArgs) {
  const r = spawnSync(cmd, cmdArgs, { cwd: ROOT, encoding: "utf8", shell: false });
  if (r.error) throw new Error(`Could not run ${cmd}: ${r.error.message}`);
  return { ok: r.status === 0, out: (r.stdout || "").trim(), err: (r.stderr || "").trim() };
}

// Commands that change something: printed in a dry run, executed otherwise.
function change(cmd, cmdArgs, body) {
  show(cmd, cmdArgs, body);
  if (DRY) return "";
  const r = spawnSync(cmd, cmdArgs, {
    cwd: ROOT, encoding: "utf8", shell: false,
    input: body ? JSON.stringify(body) : undefined,
  });
  if (r.status !== 0) {
    throw new Error(`Failed: ${cmd} ${cmdArgs.join(" ")}\n${(r.stderr || r.stdout || "").trim()}`);
  }
  return (r.stdout || "").trim();
}

const api = (method, endpoint, body) =>
  change("gh", ["api", "--method", method, endpoint, ...(body ? ["--input", "-"] : []), "--silent"], body);

const step = (title) => console.log(`\n${title}`);

// --- 0. preflight ------------------------------------------------------------
step(`Setting up ${repo}${DRY ? " (dry run: nothing will change)" : ""}`);

if (!read("gh", ["--version"]).ok) throw new Error("GitHub CLI not found. Install it (winget install GitHub.cli), then run gh auth login.");
if (!read("gh", ["auth", "status"]).ok) throw new Error("GitHub CLI is not signed in. Run gh auth login.");
if (!read("git", ["rev-parse", "--is-inside-work-tree"]).ok) throw new Error("This folder is not a git repository yet. Run git init -b main and make a first commit.");
if (!read("git", ["rev-parse", "HEAD"]).ok) throw new Error("No commits yet. Commit your files first.");
const branch = read("git", ["branch", "--show-current"]).out;
if (branch !== "main") throw new Error(`Run this from main (you are on ${branch || "a detached HEAD"}).`);
if (read("git", ["status", "--porcelain"]).out) throw new Error("You have uncommitted changes. Commit or stash them first.");
console.log("  ok: gh signed in, on main, working tree clean");

// --- 1. create and push ------------------------------------------------------
step("1. Repository");
const exists = read("gh", ["repo", "view", repo, "--json", "name"]).ok;
if (exists) {
  console.log(`  exists: https://github.com/${repo} (not pushing; use pull requests from here on)`);
  const remote = read("git", ["remote", "get-url", "origin"]);
  if (!remote.ok) change("git", ["remote", "add", "origin", `https://github.com/${repo}.git`]);
} else {
  if (read("git", ["remote", "get-url", "origin"]).ok) {
    throw new Error("A remote named origin already exists but the repo does not. Check git remote -v, then git remote remove origin.");
  }
  change("gh", [
    "repo", "create", repo, `--${config.visibility}`,
    "--source", ".", "--remote", "origin", "--push",
    "--description", config.repository.description,
  ]);
}

// --- 2. settings ---------------------------------------------------------------
step("2. Settings: description, features, merge options");
api("PATCH", `repos/${repo}`, config.repository);

step("3. Topics");
api("PUT", `repos/${repo}/topics`, { names: config.topics });

step("4. Security");
const sec = config.security;
if (sec.vulnerability_alerts) api("PUT", `repos/${repo}/vulnerability-alerts`);
if (sec.automated_security_fixes) api("PUT", `repos/${repo}/automated-security-fixes`);
if (sec.private_vulnerability_reporting) api("PUT", `repos/${repo}/private-vulnerability-reporting`);

step("5. Actions permissions");
api("PUT", `repos/${repo}/actions/permissions/workflow`, config.actions);

// --- 3. tag: before rulesets, while a mistake can still be fixed -----------------
if (TAG) {
  const pkgFile = path.join(ROOT, "package.json");
  if (!fs.existsSync(pkgFile)) throw new Error("--tag reads the version from package.json, and there is none here. Tag by hand instead.");
  const { version } = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
  step(`6. Tag v${version}`);
  const tag = `v${version}`;
  if (read("git", ["rev-parse", "-q", "--verify", `refs/tags/${tag}`]).ok) {
    console.log(`  exists locally: ${tag}`);
  } else {
    change("git", ["tag", "-a", tag, "-m", tag]);
  }
  change("git", ["push", "origin", tag]);
}

// --- 4. rulesets -----------------------------------------------------------------
step(`${TAG ? 7 : 6}. Rulesets`);
const dir = path.join(ROOT, ".github", "rulesets");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
const existing = exists || !DRY
  ? JSON.parse(read("gh", ["api", `repos/${repo}/rulesets`]).out || "[]")
  : [];
for (const file of files) {
  const ruleset = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  const match = existing.find((r) => r.name === ruleset.name);
  if (match) api("PUT", `repos/${repo}/rulesets/${match.id}`, ruleset);
  else api("POST", `repos/${repo}/rulesets`, ruleset);
}

// --- done --------------------------------------------------------------------------
step(DRY ? "Dry run finished. Run again without --dry-run to apply." : `Done: https://github.com/${repo}`);
console.log(`Still manual: social preview image (Settings > General), and a look at the first verify run in the Actions tab.`);
