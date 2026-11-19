# The nine breaks -- SCS3.5

| # | Break | Cannot happen because ... (line) | Found -- patched at (line, commit) |
|---|---|---|---|
| 1 | The header row counted | Both loops start at index 1 (`for (var r = 1; ...)` on line 17 and `for (var i = 1; ...)` on line 38), skipping row 0 headings. | Not found (safe) |
| 2 | The wrong tab | Explicit tab names `'LIST'` (line 6), `'RECORD'` (line 7), `'Settings'` (line 8), and `'Reorder'` (line 50) are used instead of `getActiveSheet()`. | Not found (safe) |
| 3 | The number read as text | Line 23 converts `Number(rawQty)` and line 24 checks `isNaN(qty) || rawQty === ''`, logging to `problems` and skipping with `continue` (line 26). | Not found (safe) |
| 4 | The boundary | Line 45 uses `<=` (`currentStock <= reorderLevel`), so an item whose stock equals its reorder level triggers a reorder alert. | Not found (safe) |
| 5 | The overwrite | Line 54 calls `reorderSheet.clear()` only on the `'Reorder'` output tab and never writes to `LIST`, `RECORD`, `DASHBOARD`, or `Settings`. | Not found (safe) |
| 6 | The invented piece | `@OnlyCurrentDoc` (line 1) restricts spreadsheet scope; only `SpreadsheetApp` and `MailApp` are called, with no external URLs or libraries. | Not found (safe) |
| 7 | The silent assumption | Missing stock defaults explicitly to `0` (`stock[listItem] || 0` on line 44) and invalid quantities are reported in `problems` (lines 25, 65-67). | Not found (safe) |
| 8 | The trigger that runs too often | Configured a single Time-based Day timer trigger on `remindReorder` (morning window) rather than an `onEdit` trigger. | Not found (safe) |
| 9 | The confident wrong answer | Hand-calculated expected low-stock counts in `test-log.md` before running and verified each row on the `Reorder` tab. | Not found (safe) |
