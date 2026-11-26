# Backup and restore log -- scs-server (SCS4.3)

A backup is a restore that has happened. Open and readable is the test. No password, no archive in this repo.

## Where the copies are -- 3-2-1 for scs-server

| Copy | Where it is | Kind of place | What it survives | Last checked |
|---|---|---|---|---|
| The live server | scs-server's own virtual disk | the VM on my laptop | nothing -- it is the thing itself | 2026-11-26 |
| The archive on the server | /srv/scs-backups | the same virtual disk | a mistake or a bad update -- not the disk dying | 2026-11-26 |
| On my laptop | ~/scs/evidence/scs4.3 | the laptop's disk -- the same disk the VM lives on | the VM breaking -- not the laptop | 2026-11-26 |
| On my stick | backup-scs | a USB stick | the laptop dying or being stolen | Pending |
| Away from the laptop | Not yet off-site | Off-site / cloud / separate location | fire, theft, flood -- the day the bag goes too | Not yet off-site |

## Restores

| # | What I restored, from which copy | To where | Time taken | What was missing, and the fix | Witness |
|---|---|---|---|---|---|
| 1 | Newest archive from /srv/scs-backups (beside live system) | /var/tmp / non-live test target | Pending | None / verify when run | Pending |
| 2 | | | | | |
