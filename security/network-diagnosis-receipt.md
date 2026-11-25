# AI diagnosis receipt -- SCS4.1

One prompt, before the hands touch the kit, inside the five moves.  Nothing private in it: no router password,
no client's name, no public address, no screenshot.  The hands follow the ladder, not the tool.

Tool (and tier): Browser assistant (standard session)
Date: 2026-11-25
The fault it was for (Fault 1, 2 or 3 in the log): Fault 1
The prompt, word for word: How do IP address, MAC address, default gateway, and DNS line up with net-look and trainer check #20?
Its order of checks (one line): Check link and adapter numbers first, then gateway reachability, then external/DNS resolution, and verify against the router device list.
Where it matched the ladder: Started with local numbers and gateway reachability before reading higher rungs.
The rung it skipped or invented: none -- it matched
What my hands did instead, and why: Ran net-look in Ubuntu first to read both Windows and Ubuntu-SCS blocks and found Rung 3 (10.10.51.1) failed before Rung 4.
Label: AI-assisted diagnosis, checked against the ladder
