# Reading Log — reorder-reminder.gs

## 1. Which lines touch the sheet?
- **Lines 5–12:** Open the active spreadsheet and read data ranges from `LIST`, `RECORD`, and `Settings` cell `B1`.
- **Lines 50–59:** Look up or create the `Reorder` tab, clear only that tab, append the header row, and write the low-stock rows. No other tabs (`LIST`, `RECORD`, `DASHBOARD`, `Settings`) are modified.

## 2. Which lines talk to the outside world?
- **Line 68:** `MailApp.sendEmail(ownerEmail, 'Reorder reminder', lines.join('\n'));` sends one summary email to the address stored in `Settings` `B1` (`naomi.isadola@learninglions.org`) when at least one item is at or below its reorder level. No email address is hardcoded in the script.

## 3. What happens if RECORD has "4 pcs" instead of 4?
- **Lines 22–26:** `Number("4 pcs")` evaluates to `NaN`, so `isNaN(qty)` triggers, records the skipped row in `problems`, and uses `continue` so it is never added to or subtracted from `stock` silently as `0`.
- **Lines 65–67:** Any skipped rows collected in `problems` are appended to the summary email under `Skipped rows:` so the owner sees the bad entry.
