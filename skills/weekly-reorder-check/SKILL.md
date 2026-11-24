---
name: weekly-reorder-check
description: Use when generating and verifying the weekly low-stock reorder list from stock-export.csv before sending to suppliers.
---

# Weekly Reorder Check

Use when: Preparing the weekly supplier reorder summary from a downloaded `stock-export.csv` copy.

## Steps
1. Verify `stock-export.csv` is present in `workspace/stock-tools` and has no empty stock cells.
2. Run `cd workspace/stock-tools && node --test reorder.test.js` to confirm all unit tests pass.
3. Run `node workspace/stock-tools/reorder.js workspace/stock-tools/stock-export.csv` and inspect every supplier group.
4. Confirm `SMS_API_KEY` is set in the environment and run `node workspace/stock-tools/send-sms.js workspace/stock-tools/stock-export.csv --dry-run` before any live send.

## How I know it worked
- Done when all unit tests pass, every low-stock item appears once under its supplier, and `--dry-run` prints the gateway URL without exposing hardcoded keys in code.

Ran: 2026-11-24 — 6 of 6 tests passed and dry-run verified cleanly.
