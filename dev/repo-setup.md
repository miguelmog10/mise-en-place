# Repo setup

How a local folder becomes a protected public GitHub repo, in one command. Written for this repo, meant to be reused for the next ones.

## What you need once per computer

1. **git** and **Node 20+**.
2. **GitHub CLI:** `winget install GitHub.cli`, then open a new terminal.
3. **Sign in:** `gh auth login` (GitHub.com, HTTPS, sign in with a browser). Check with `gh auth status`.

## From folder to GitHub

```powershell
cd D:\git\miguelmog10\mise-en-place
git init -b main
git add -A
git commit -m "feat: scaffold mise-en-place v0.1.0" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"

npm run github:plan                 # read the plan, changes nothing
npm run github:setup                # do it, and tag v0.1.0
```

The dry run changes nothing. It prints every command and every settings payload, so you can check them before anything happens.

## What the script does

`scripts/setup-github.mjs`, in order:

| Step | What | Source |
|---|---|---|
| 0 | Stops unless `gh` is signed in, you are on `main` and everything is committed | |
| 1 | Creates the repo, adds `origin`, pushes `main`. Skipped if the repo exists | `.github/repo-settings.json` (`owner`, `name`, `visibility`) |
| 2 | Description, features (issues on; wiki, projects, discussions off), squash-only merges, delete branches after merge | `repository` block |
| 3 | Topics | `topics` |
| 4 | Dependabot alerts and security fixes, private vulnerability reporting | `security` |
| 5 | Actions can only read the repo, and cannot approve pull requests | `actions` |
| 6 | `github:setup` only (`--tag`): tags `v<package.json version>` and pushes it | `package.json` |
| 7 | Creates or updates each ruleset | `.github/rulesets/*.json` |

Each block in `repo-settings.json` is sent to the GitHub REST API as is, so the field names are the API's. Rulesets use the same JSON as GitHub's own ruleset export and import.

It is safe to run again: an existing repo is not pushed to, settings are re-applied, and rulesets are updated by name instead of duplicated. Change a setting in the JSON, commit it through a pull request, and run the script again.

## After the script

- **Actions tab:** wait for the first `verify` run to go green. The `main` ruleset requires it, so pull requests cannot merge until it has run once.
- **Mermaid:** open the README in light and dark mode and check the diagrams.
- **Social preview:** upload by hand (Settings > General). The API cannot set it.
- From now on, every change goes through a branch and a pull request.

## Reuse it in another repo

1. Copy `scripts/setup-github.mjs`, `.github/repo-settings.json`, `.github/rulesets/` and `.github/workflows/`.
2. Edit `repo-settings.json` (name, description, topics) and the workflow.
3. Make sure the job name in the workflow matches the required check in `rulesets/main.json` (here: `verify`).
4. Run it as above. No `package.json`? Run `node scripts/setup-github.mjs --dry-run`, then `node scripts/setup-github.mjs`, and tag by hand.

When it has worked on two or three repos, move it to a template repo (Later list).

## Start over

To redo it from scratch: delete the repo on GitHub (Settings > General > Danger zone), delete the local `.git` folder, then follow "From folder to GitHub" again.
