# This repo is frozen at the "problem" state

Do not fix anything here — this folder exists only as the before-state
reference for the Kente Retail handover lab. It is exactly what was
inherited from the departed engineer:

- `main` has a merge commit (`dd9107d`) with live `<<<<<<<` conflict
  markers still committed in `src/index.js` — it never even parsed.
- `feature/webhook-secrets` has a hardcoded payment webhook key
  committed in `config/webhook.js`, never merged, never rotated.
- A `.env` file was committed directly to `main` with a database
  password, AWS access keys, and a JWT signing secret — never
  gitignored, sitting in git history in plain text.
- `wip-cleanup`, `bugfix2`, `test-branch-do-not-use` are stray branches
  left pointing at the same merge commit — nobody cleaned them up.

The fix for every one of these is in the sibling `best-practices-repo`,
with commit messages explaining what was wrong and why each fix was
made that way. See its `docs/` folder for the full writeup.

This is a fabricated teaching scenario for a DevOps lab, not a real
incident — every "secret" above is a placeholder string (several are
literally suffixed FAKE / DONOTUSE), never a live credential.
