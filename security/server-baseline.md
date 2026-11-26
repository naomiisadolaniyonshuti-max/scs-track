# scs-server baseline -- my server, known good (SCS4.3)

Written the day the baseline was set, before any fault card. An audit compares the server with this page and with
server-baseline.txt beside it (the snapshot baseline-look kept). No password, no PIN, no archive here -- ever.

Server: scs-server on my laptop (Hyper-V) Address today: ... Baseline set on: 2026-11-26
Checkpoints: before-scs4.3 (before the firewall and the job) -- before-faults (before the card round)

## The doors -- one row per ufw rule

| Rule (as ufw show added prints it) | Why it is open -- which service, which session | Checked from the laptop |
|---|---|---|
| default: deny incoming, allow outgoing | Nothing comes in unless a row below lets it in | |
| ufw allow 22/tcp comment 'ssh from the laptop (SCS1.5)' | SSH remote administration from the laptop | |
| ufw allow 80/tcp comment 'nginx: the SCS1.5 page and WordPress (SCS2.4)' | HTTP web traffic for the hosted page/site | |
| | | |

How I proved my page on port 80 still answers with the firewall on: checked via HTTP request and laptop view / port check.

## The backup job

| Part | Mine |
|---|---|
| What it copies | PostgreSQL/MariaDB databases (if present), /etc, /var/www, Odoo filestore (if present), /usr/local/sbin, crontabs |
| Where it writes (the destination) | /srv/scs-backups |
| When it runs (the schedule) | Daily / scheduled via cron (17 * * * * root /usr/local/sbin/scs-server-backup /srv/scs-backups) |
| How long it keeps | Newest of each day kept for 7 days |
| The job line | 17 * * * * root /usr/local/sbin/scs-server-backup /srv/scs-backups |
| The receipt (the log) | /var/log/scs-backup.log (OK / PARTIAL / SKIP / FAILED) |
| Last restore test | Pending / documented in backup-log.md |

## Updates and admins

Security updates: unattended-upgrades checked on server. Admins (sudo): trainee account with sudo.
