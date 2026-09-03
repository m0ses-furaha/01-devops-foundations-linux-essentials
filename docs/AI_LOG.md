# AI Use Log

Per the lab brief: AI use is permitted and must be logged, not hidden.
This log covers what AI assistance (Claude, via Cowork) was used for on
this handover, what was accepted, what was changed, and why.

## What AI was used for

- Drafting the seeded pre-handover scenario in `problem-repo` (the
  conflicted merge, the leaked webhook secret, the stray branches) to
  reproduce the situation described in the brief, since the local
  starter repo did not already contain it.
- Drafting the fix commits in this repo: resolving the conflict, moving
  the webhook secret to an environment variable, purging it from git
  history with filter/gc tooling, and deleting stale branches.
- Drafting `docs/BRANCHING.md`, `docs/ONBOARDING.md`, this log, the
  `.env.example`/README updates, and the standalone onboarding +
  branching-recommendation PDF.

## What was accepted vs. changed

- Accepted the Git Flow recommendation as proposed, on the reasoning that
  the actual failure mode here (unreviewed, long-lived, inconsistently
  named branches) is what Git Flow's explicit branch roles are meant to
  prevent — verified against the real branch list produced during
  cleanup rather than taken on faith.
- Verified the conflict resolution by running `node -c src/index.js`
  before committing, rather than trusting the diff alone.
- Verified the secret was actually gone by scanning every object in the
  git object store (`git cat-file --batch-all-objects`), including
  unreachable ones, before and after `git gc --prune=now` — caught that
  the secret was still present in a dangling blob immediately after the
  amend, which a reachability-only check would have missed.

## What was rejected / would need follow-up before trusting blindly

- Pre-commit secret scanning and branch-protection rules were proposed but
  not actually turned on in GitHub — needs real repo admin access, which
  AI assistance can't grant. Flagged in the assumptions log rather than
  assumed done.
- Rotating the payment webhook secret with the actual provider (in case
  the leaked key was ever exposed outside this repo) was raised as an
  open question for the CTO, not resolved — a business/security decision
  outside repo scope.

## Note on realism

`problem-repo` and this repo are a teaching pair, not a real incident —
built to demonstrate what the described mess looks like and what fixing
it properly looks like, for the purposes of this lab. The secret in
`problem-repo` is a fabricated placeholder string, never a real
credential.
