# Kente Retail — Order Service

Minimal HTTP service backing Kente Retail's order pipeline (sandbox copy for training).

This repo is the "fixed the right way" half of a before/after teaching
pair — see the sibling `problem-repo` for the state this was handed over
in, and `docs/` for the full writeup.

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
