# Tool feedback

Running notes on tools, SDKs and specs: what was confusing, missing or good. Newest first.

## 2026-10-26: rename and repo setup

- **PowerShell + npm:** PowerShell drops `--` when it calls `npm.ps1`, so `npm run x -- --dry-run` hands `--dry-run` to npm instead of the script, and the script runs for real. Fix: npm scripts that carry their own flags (`github:plan`, `github:setup`), so nobody types `--`.
- **Process gap, not a tool bug:** the first setup ran `git init` and committed, but never connected the folder to GitHub, so the first push failed. The setup script now owns that step (ADR 0008).
- **Claude desktop link:** files under `.github/` are protected and cannot be written remotely. Workaround: write to `_github/` and rename locally.
- **GitHub CLI, good:** `gh api --input` takes the same ruleset JSON that the GitHub UI imports and exports, so rulesets work as code with no translation.
- **GitHub API gap:** the social preview image has no API; it stays manual.

## 2026-10-26: v0.1.0 scaffolding

- **Claude cloud workspace, npm:** the registry refused package installs (403), so Style Dictionary could not be installed or tested there. This pushed the build toward zero dependencies (ADR 0003), which turned out to be a good fit anyway.
- **Claude desktop link, Windows:** no shell on the linked computer, only reading and writing files in folders granted per session. Fine for scaffolding; git commands stay manual.
- **DTCG 2025.10:** dimensions allow only `px` and `rem`, so `em` letter-spacing has no proper type. The format module has no theming standard, so one file per theme is a convention.
- **DTCG 2025.10, good:** the color object (`colorSpace`, `components`, `hex`) is unambiguous, and `$type` inheritance from groups keeps files short.
- **Mermaid on GitHub:** a diagram cannot follow the reader's light or dark mode, and text outside shapes cannot reach 4.5:1 on both. Fills behind all text solve flowcharts; sequence diagrams remain a gap.
- **Mermaid CLI:** useful for checking a theme locally on white and dark backgrounds before pushing (`mmdc -b "#0d1117"`).
- **JavaScript key order:** objects list integer-like keys first, so a token named `050` sorted after `1000`. The build now sorts numeric keys by value.
