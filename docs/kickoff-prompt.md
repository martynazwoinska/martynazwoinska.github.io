I am starting a long-running project for my personal website:

> Historical bootstrap prompt: always consult `PROJECT_STATUS.md` for current priorities and verified implementation state before using this checklist.

Repository: `martynazwoinska/martynazwoinska.github.io`

The local repository contains:

- `AGENTS.md`
- `PROJECT_STATUS.md`
- `.agents/skills/personal-website-maintainer/SKILL.md`
- the approved stylised Cabinet of Curiosities image at
  `cabinet-of-curiosities/assets/cabinet-of-curiosities.png`
- the untouched real cabinet photograph at
  `cabinet-of-curiosities/assets/cabinet-original-photo.jpg`

Act as the project coordinator across ordinary Chat, Codex work, and Codex CLI implementation.

Start by:

1. Opening the repository folder and reading `AGENTS.md` and `PROJECT_STATUS.md`.
2. Running a read-only repository audit:
   - `git status`
   - current branch
   - five latest commits
   - current `index.html` Beyond Research markup and CSS
   - whether temporary deployment workflows remain under `.github/workflows/`
   - whether `cabinet-of-curiosities/index.html` exists
   - whether both the approved stylised cabinet image and the original real photograph exist at their required paths
3. Comparing the repository’s actual state with `PROJECT_STATUS.md`.
4. Reporting:
   - what is already implemented;
   - what remains incomplete;
   - any unrelated uncommitted changes;
   - the smallest safe next implementation step.
5. Do not edit, commit, push, reset, stash, or delete anything during this first audit.

After the audit, help me coordinate design decisions in Chat and use Codex or Codex CLI for implementation. Keep a clear distinction between proposed, approved, implemented, tested, and deployed work.
