# Method note -- SCS4.3 Defensive Security and Backups

1. What I set out to do: Harden scs-server with ufw, configure and verify backups, audit fault cards with a baseline snapshot, and document the security and backup state.
2. What I did, in order: Initialized SCS4.3 workspace files with start-scs4.3, reviewed check-scs4.3 requirements, and drafted server-baseline.md, backup-log.md, fault-cards.md, and method-notes/SCS4.3.md.
3. How I checked it worked: Ran check-scs4.3 and inspected the generated markdown files in ~/scs/projects/scs-track.
4. What went wrong and what I did about it: check-scs4.3 reported missing baseline-look server evidence in ~/scs/evidence/scs4.3 because server evidence must come from scs-server.
5. What I would do differently next time: Capture and fetch the baseline-look server evidence and baseline snapshot before starting fault-card audits.
6. What I might be wrong about, and how I would find out: Assumptions about live server ports, backup execution status, or off-site copies until verified directly on scs-server and via laptop checks.
