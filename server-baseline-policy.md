# Kente Retail — Server Configuration Baseline Policy

Audit the sandbox server against this policy. Document every deviation you find, whether
you fixed it, and why (or why not) in your Assumptions Log.

## 1. Deployment directory

- Path: `/opt/kente-retail/app`
- Owner: `deploy` user, `deploy` group
- Permissions: `750` on the directory and everything under it (owner: read/write/execute,
  group: read/execute, others: no access)
- Rationale: only the deploy user and members of its group should be able to modify
  release artifacts; no world access.

## 2. Users & groups

- A `deploy` user must exist (home directory `/home/deploy`, shell `/bin/bash`).
- An `ops` group must exist, with `deploy` as a member (add other on-call engineers as
  needed — not required for this pass).
- No shared/generic account (e.g. `admin`, `test`, `ec2-user` outside its default use)
  should own or have unnecessary access to the deployment directory.

## 3. Hostname

- Convention: `kente-<role>-<env>`, e.g. `kente-app-prod01`, `kente-app-staging01`.
- The server must not be left at a default/placeholder hostname (`localhost`,
  `ip-xxx-xxx-xxx-xxx`, the AMI's factory default, etc).

## 4. Network / connectivity

- The application must be reachable on its expected port from the class network.
- Any firewall or security-group rule currently blocking expected traffic must be
  identified and corrected, with evidence (e.g. a successful connection test) that it
  now works — not just a description of what you changed.

## 5. Out of scope for this pass

TLS/certificate configuration, log rotation, and backup policy are not assessed in this
lab. If you notice a gap in one of these, note it in your Assumptions Log — you are not
required to fix it.
