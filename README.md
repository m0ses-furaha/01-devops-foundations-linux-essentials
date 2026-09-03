# Lab 01 — DevOps Foundations & Linux Essentials

Submission for the Kente Retail handover exercise.

An ops-adjacent engineer left with no handover notes, and a release was blocked because
nobody could confirm the state of either the application repository or the sandbox
server. The task was to work out what was actually wrong, fix it properly, and leave
behind enough documentation that the next person doesn't inherit the same problem.

This repository holds the whole submission: the inherited "before" state, the corrected
"after" state, and the written analysis.

## Layout

| Path | What it is |
| --- | --- |
| [`problem-repo/`](problem-repo/) | The inherited state, frozen. Nothing is fixed here — it exists so the original defects stay inspectable. |
| [`best-practices-repo/`](best-practices-repo/) | The same service, fixed properly, plus the written deliverables in [`docs/`](best-practices-repo/docs/). |
| [`server-baseline-policy.md`](server-baseline-policy.md) | The configuration policy supplied with the brief, to audit the sandbox server against. |
| [`Kente-Retail-Handover-Onboarding.pdf`](Kente-Retail-Handover-Onboarding.pdf) | Standalone onboarding note and branching recommendation. |

Keeping the before and after as two separate trees — rather than one repo where the mess
is fixed forward — was deliberate: it keeps the original state readable while letting the
fix history show exactly which commit addressed which defect.

## What was inherited

Four distinct problems, all documented in
[`problem-repo/README-INCIDENT-STATE.md`](problem-repo/README-INCIDENT-STATE.md):

| Problem | Evidence | How it was fixed |
| --- | --- | --- |
| Merge commit `dd9107d` was committed with live `<<<<<<<` conflict markers in `src/index.js` — the file never even parsed | `node --check` fails on `problem-repo/src/index.js` | Conflict resolved properly and verified with `node --check` before committing, not by eyeballing the diff |
| A payment webhook key hardcoded in `config/webhook.js` on an unmerged branch | `problem-repo`, `feature/webhook-secrets` | Moved to an environment variable that fails closed when unset (`best-practices-repo/config/webhook.js`) |
| A `.env` committed straight to `main` with a DB password, AWS keys, and a JWT signing secret | `problem-repo/.env`, in history from commit `5bee25e` | Purged from history rather than deleted in a follow-up commit; variable names moved to `.env.example` and `.env` gitignored |
| Stray branches (`wip-cleanup`, `bugfix2`, `test-branch-do-not-use`) left pointing at the same merge commit | `problem-repo` branch list | Deleted, with a branching convention documented to stop them accumulating again |

Every "secret" above is a fabricated placeholder — several are literally suffixed `FAKE`
or `DONOTUSE`. This is a teaching scenario, not a real incident, and no live credential
was ever involved.

## Why the secret was purged rather than removed

Deleting a secret in a follow-up commit leaves it readable in history forever — anyone
can still check out the earlier commit. So it was rewritten out of history entirely, and
the removal was verified by scanning every object in the object store
(`git cat-file --batch-all-objects`), including unreachable ones, after
`git gc --prune=now`. That check mattered: the secret was still sitting in a dangling
blob immediately after the rewrite, which a reachability-only scan would have missed.

You can confirm the result yourself — this returns nothing:

```bash
for c in $(git rev-list fb2238a); do git grep -lE "AKIA|SuperSecretProd" $c; done
```

while the same scan over `problem-repo`'s lineage still finds the `.env`, because that
side is meant to stay broken:

```bash
for c in $(git rev-list acb838c); do git grep -lE "AKIA|SuperSecretProd" $c; done
```

## Written deliverables

All under [`best-practices-repo/docs/`](best-practices-repo/docs/):

- [`ONBOARDING.md`](best-practices-repo/docs/ONBOARDING.md) — the DevOps lifecycle in plain language, CALMS, and how this incident shows up in DORA metrics.
- [`BRANCHING.md`](best-practices-repo/docs/BRANCHING.md) — Git Flow recommendation, with rules traced back to the specific things that went wrong here.
- [`ASSUMPTIONS_LOG.md`](best-practices-repo/docs/ASSUMPTIONS_LOG.md) — how "handover-ready" was scoped, open questions for the CTO, and gaps found but deliberately not fixed.
- [`AI_LOG.md`](best-practices-repo/docs/AI_LOG.md) — AI assistance used, what was accepted, what was independently verified, and what was rejected. The brief permits AI use provided it's logged rather than hidden.
- [`DAY2_INCIDENT.md`](best-practices-repo/docs/DAY2_INCIDENT.md) — template, to be filled in during the live walkthrough.

## What is not done

The brief also required a sandbox VM or EC2 instance to be provisioned and audited
against [`server-baseline-policy.md`](server-baseline-policy.md): directory ownership and
`750` permissions on `/opt/kente-retail/app`, the `deploy` user and `ops` group, the
hostname convention, and a network-fault diagnosis with evidence that connectivity was
restored.

**That work is genuinely missing from this submission.** This was treated as a
repository-cleanup exercise, and the server side was not recognised as a separate required
deliverable until review. It is stated here rather than left to surface on its own, and
none of the documents claim server work that didn't happen.

Remaining work: stand up the sandbox VM, run the audit, and add the evidence —
permissions output, `id deploy`, `hostnamectl`, and a successful connectivity test — as
`docs/SERVER_AUDIT.md`.

## Commit history

Both subdirectories were merged in with `git subtree`, so the original commits survive
intact rather than being flattened into a single import. `git log` shows all three
authors — the founding engineer, the departed engineer, and the handover work — which is
what makes the defence walkthrough possible.

One consequence worth knowing when reading history: `git subtree add` doesn't rewrite the
merged history, so commits from before each merge point refer to root-level paths
(`src/index.js`), not the prefixed paths they occupy today
(`best-practices-repo/src/index.js`). Path-filtered history queries need to account for
that.

Full mirrors of both original repositories, including the stray branches that were not
carried into `main`, are retained outside this repository.

## Running the service

```bash
cd best-practices-repo
npm install
cp .env.example .env   # fill in real values; .env is gitignored
npm start
```

Serves on port 8080 by default (override with `PORT`).

- `GET /health` — liveness check
- `GET /api/orders` — list orders (stubbed)
