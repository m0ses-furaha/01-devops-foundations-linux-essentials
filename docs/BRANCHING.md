# Branching Convention

Adopted after the September 2026 handover, where a tangled branch history,
an unresolved merge, and a leaked secret blocked a release. See
`docs/ONBOARDING.md` for the full incident writeup, and the sibling
`problem-repo` for exactly what the departed engineer left behind.

## Model: Git Flow

- `main` — always deployable. Protected: no direct pushes, PR + review required.
- `develop` — integration branch for the next release. Protected the same way.
- `feature/<short-name>` — one feature, one branch, cut from `develop`.
  Merge back via PR, then delete the branch. Do not let these outlive the
  feature.
- `hotfix/<short-name>` — cut from `main` for urgent production fixes,
  merged back into both `main` and `develop`, then deleted.

## Rules that exist specifically because of what went wrong here

1. **No branch is committed with unresolved conflict markers.** If a merge
   conflicts, resolve it before committing — never commit
   `<<<<<<<` / `=======` / `>>>>>>>` as "done."
2. **No secret is ever hardcoded in a commit.** Use environment variables
   (see `config/webhook.js`, `.env.example`). If one slips in anyway, it
   must be purged from history (`git filter-repo`/BFG + `git gc
   --prune=now`), not just removed in a follow-up commit — a follow-up
   commit leaves the secret readable in history forever.
3. **Branches get deleted once merged.** A branch with no open PR and no
   unique commits ahead of `main`/`develop` is stale — delete it. Don't let
   `wip-*`, `test-*`, or numbered `bugfix2`-style branches accumulate.
4. **PR review is required before merging into `main` or `develop`** —
   this is what would have caught the conflict markers and the secret
   before they ever reached `main`.
