# Assumptions Log

## Scoping: what "handover-ready" means here

The brief said "sort this out" / "tell me what's actually wrong" without
defining depth. Scoped handover-ready to mean: (1) main is clean — no
committed conflict markers, no secret in history, and a documented
branching convention; (2) server matches the supplied baseline policy,
with evidence, not just description, that the seeded network issue is
fixed. TLS, log rotation, and backup policy were treated as explicitly
out of scope per the baseline policy.

## Clarifying questions for the CTO in a real engagement

- Is there a rollback plan if the corrected release still fails, or is
  this the only shot?
- The leaked webhook secret — does it need rotating with the payment
  provider regardless of purging it from git history, in case it was
  already exposed externally (a fork, CI logs, etc.)?
- Who owns on-call and server access until the next hire starts?
- Is Git Flow vs. trunk-based a call the CTO wants to weigh in on, or is
  engineering expected to just decide and document it?

## Other gaps found — fixed, or explicitly not

- **No branch protection / PR requirement on `main`.** Addressed by
  recommending Git Flow with protected `main`/`develop` in
  `docs/BRANCHING.md`; actually enabling the GitHub rule is a follow-up
  once repo admin access is confirmed with the CTO.
- **No pre-commit secret scanning.** Not implemented in this pass —
  proposed instead as the value-add item, so it's a visible next
  investment rather than something silently assumed to already exist.
- **Server-side findings (permissions, users/groups, hostname, the
  seeded network fault)** are tracked as a separate audit deliverable,
  not duplicated here, to keep this note to its intended one page.
- **This repo vs. `problem-repo`.** Deliberately kept as two repos
  (rather than one repo where the mess is fixed forward) so the "before"
  state stays inspectable as a reference, and this repo's history shows
  exactly which commits fixed which problem — useful for the defense
  walkthrough and for anyone learning from this later.
