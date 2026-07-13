# Migration archive, 2026-07-13

This branch preserves local material that was not available from the published
`main` branch when work was moved from a temporary computer.

## Contents

- `stale-main-working-copy/`: the 13 locally modified tracked files from the
  older `main` checkout. These are preserved for reference and must not replace
  the current website without review.
- `local-only/`: unique untracked source scripts, masks, candidate composites,
  and previews from the repository work area that were not present on
  `origin/main`.
- `workspace-work/`: additional project experiments stored beside the checkout.

## Deliberately excluded

- browser profiles, cookies, login databases, caches, and session state;
- server output and error logs;
- files already present on the published `main` branch;
- Git internals and locally downloaded command-line tools.

The production `main` branch was not changed by creating this archive.
