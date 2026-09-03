# Onboarding Note — Kente Retail Order Service

Context: the previous ops-adjacent engineer left with no handover notes.
A release was blocked because nobody could confirm the state of the repo
or the sandbox server. `problem-repo` (the sibling folder) preserves
exactly what was inherited; this repo shows what "fixed, and fixed the
right way" looks like on top of it.

## The DevOps Lifecycle, in Plain Language

DevOps is a continuous loop, not a one-time handoff: Plan → Code → Build →
Test → Release → Deploy → Operate → Monitor, then back to Plan. Every
stage feeds the next, and monitoring feeds back into planning. The point
of the loop is that no single person has to hold the whole system in
their head — process and tooling carry that knowledge instead. This
incident happened because the loop broke down exactly at the handoff
point: nothing was documented between "Operate" and the next person's
"Plan."

## CALMS

- **Culture** — shared ownership over one person's tribal knowledge. One
  engineer being the only person who understood the repo and server is a
  culture failure, not bad luck.
- **Automation** — repeatable checks (branch protection, secret scanning,
  health checks) reduce reliance on anyone remembering a manual step.
- **Lean** — small, frequent changes are easier to hand over and easier to
  undo than the large, long-lived branches found here.
- **Measurement** — you can only tell something is wrong (or fixed) if
  you're tracking metrics. See DORA metrics below.
- **Sharing** — documentation, runbooks, and this note are how knowledge
  survives someone's sudden departure.

## How This Incident Shows Up in DORA Metrics

- **Change failure rate** — the repo had committed conflict markers and a
  leaked secret. Deployed as-is, that's very likely a failed or
  rolled-back release.
- **Mean time to restore (MTTR)** — with no handover notes, most of the
  recovery time went to figuring out what state the system was even in,
  before any real fix could start.
- **Deployment frequency** — took a direct hit too: the release was
  blocked outright, not just slowed down.

Treat a missing or incomplete handover as a DORA-metric risk, not just an
inconvenience — it degrades the same numbers leadership already tracks.

See `docs/BRANCHING.md` for the branching-strategy recommendation.
