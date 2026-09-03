# Kente Retail — Order Service

Minimal HTTP service backing Kente Retail's order pipeline (sandbox copy for training).

This repo is the "fixed the right way" half of a before/after teaching
pair — see the sibling `problem-repo` for the state this was handed over
in, and `docs/` for the full writeup.

## Scope of this submission — what's actually done, and what isn't

Being upfront about this rather than letting it surface in review:

**Done — the Git/repo side of the handover:**
- Repo audit and cleanup: resolved the unresolved merge conflict, purged
  the leaked secrets from history (not just fixed forward), cleaned up
  the stray branches, documented a branching convention going forward.
- The onboarding note (DevOps lifecycle / CALMS / DORA), the branching
  recommendation, the assumptions log, and the AI-use log.
- Environment-variable handling for secrets (`.env.example`, `.gitignore`,
  `dotenv`).

**Not done — the Linux server / VM side of the lab:**
The brief also asked for a sandbox VM or EC2 instance to be provisioned
and audited against `server-baseline-policy.md` — directory permissions,
the `deploy` user/`ops` group, hostname convention, and a network-fault
diagnosis with evidence it's fixed. I didn't realize that was a separate,
required part of the deliverable until it came back in review — I
treated this as a repo-cleanup exercise and never stood up a server to
audit. That part is genuinely missing from this submission, not
something quietly skipped; `docs/ASSUMPTIONS_LOG.md` and
`docs/AI_LOG.md` cover the Git side honestly, but neither claims server
work that didn't happen.

Next step on my end: provision the sandbox VM, run the audit against
`server-baseline-policy.md`, and add the evidence (permissions output,
`id deploy`, `hostnamectl`, a successful connectivity test) as its own
section here or a `docs/SERVER_AUDIT.md`.


## Running locally

```bash
npm install
cp .env.example .env   # fill in real values, .env is gitignored
npm start
```

Serves on port 8080 by default (override with `PORT`).

- `GET /health` — liveness check
- `GET /api/orders` — list orders (stubbed)

## Environment variables

See `.env.example` for the full list. Locally, `dotenv` loads `.env`
automatically. In staging/prod, the deploy platform/secrets manager
injects these directly — no `.env` file should ever exist there.

| Variable | Required | Notes |
| --- | --- | --- |
| `PAYMENT_WEBHOOK_SECRET` | Yes | Used by `config/webhook.js` to verify payment webhook signatures. Fails closed (rejects every signature) if unset — never falls back to a hardcoded value. |
| `PORT` | No | Defaults to `8080`. |

**Never commit a real secret.** `problem-repo` shows what happens when
one is — it's since been purged from this repo's history and replaced
with this environment-variable pattern. See `docs/AI_LOG.md` and
`docs/ASSUMPTIONS_LOG.md` for details.

## Branching

See `docs/BRANCHING.md`.

## Deployment

Deployed to `/opt/kente-retail/app` on the application server. See the ops team's
server-baseline-policy for the expected permissions, users, and hostname convention.
