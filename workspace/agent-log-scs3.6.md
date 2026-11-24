# Agent Log -- SCS3.6 (that evening)

Fill it as it runs, not after.  Commit this log on main; the agent's changes stay on the branch.

The job, in one sentence (folder, task, stopping point): In workspace/stock-tools, make tidyName leave ng'ombe as Ng'ombe, add a test, run the tests, list what you changed and stop.
Scope (the one folder it may touch): workspace/stock-tools
Branch: scs3.6-agent
The rules file it read first: AGENTS.md
Tool and tier: Claude / Gemini API (Paid Tier 1)
Run (live, or the trainer's recorded run): live

| Step | What it proposed | Accepted or rejected, and why | What it touched |
|---|---|---|---|
| 1 | Read `AGENTS.md` and `workspace/stock-tools/reorder.js` to inspect `tidyName` | Accepted — read-only inspection within scope | `workspace/stock-tools/reorder.js` |
| 2 | Update `tidyName` regex from `/\b\w/g` to `/(^|\s)\w/g` so `ng'ombe` becomes `Ng'ombe` | Accepted — directly matches the job spec inside `workspace/stock-tools` | `workspace/stock-tools/reorder.js` |
| 3 | Edit `README.md` at repo root to document `tidyName` behavior | Rejected — `README.md` at repo root is outside the named scope `workspace/stock-tools` | None (rejected before write) |
| 4 | Add unit test for `ng'ombe salt lick` in `workspace/stock-tools/reorder.test.js` | Accepted — required by job spec and inside `workspace/stock-tools` | `workspace/stock-tools/reorder.test.js` |
| 5 | Run `node --test workspace/stock-tools/reorder.test.js` and stop | Accepted — verified all 7 tests pass | None |

Outside the scope? no
Tests after the run: 7 pass, 0 fail (`node --test workspace/stock-tools/reorder.test.js`)
Result (merged with --no-ff, or closed): merged with --no-ff
Cost of the run: 12.09 KSh
