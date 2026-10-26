# 0008. Repo settings as code

- Status: accepted
- Date: 2026-10-26

## Context

Setting up the first repo by hand took a long checklist of clicks, and a step was missed (the folder was never connected to GitHub). Clicked settings leave no record of what was chosen or why, and have to be repeated for every new repo.

## Decision

- Keep repo settings in the repo: `.github/repo-settings.json` (sent as is to the GitHub REST API) and `.github/rulesets/*.json` (GitHub's ruleset format).
- Apply them with `scripts/setup-github.mjs`, which uses the GitHub CLI, has a dry run, and is safe to re-run.
- The script has no dependencies and no link to the rest of the repo, so it can be copied to other repos.

## Consequences

- Setting up a repo is one reviewed command, and settings changes go through pull requests like everything else.
- Needs the GitHub CLI installed and signed in.
- Settings changed by hand in the GitHub UI are overwritten on the next run. Change the JSON instead.
- Not everything has an API: the social preview stays manual.
- Tested against a simulated `gh` and a local git remote, not yet against GitHub. The first real run is the test.
