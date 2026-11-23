# SCS3.4 Build Notes — Retail Kiosk Back Office

## Overkill Test
| Question | Client Answer |
|---|---|
| 1. Does the business already have working software that handles this? | No, stock is currently tracked on paper notebooks and loose receipts. |
| 2. How many people enter data at the same time? | One owner (and occasionally one shop attendant) entering daily stock movements, so row-level concurrency is not needed. |
| 3. How many rows per month does the operation generate? | Roughly 80 to 150 stock entries per month—well under Google Sheets' limits. |
| 4. Does it need customer logins, payments, or automated external APIs? | No, only internal stock tracking, valuation, and reorder alerts on the owner's phone. |
| 5. Can the owner maintain it with a 1-page guide and protected formulas? | Yes, the owner only types in the 5 entry columns on `Records` and reads `Dashboard`. |

Verdict: Sheets. Pattern: inventory. Because: The retail kiosk tracks fewer than 150 stock movements a month from a single counter and needs zero-cost mobile visibility without database overhead.

## Validation
| Column | Rule | The Garbage I Typed | Refused? |
|---|---|---|---|
| `Records!A2:A` (`DATE`) | Is valid date (Reject input) | `yesterday` and `32/13/2026` | Yes — rejected with invalid date error |
| `Records!B2:B` (`ITEM`) | Dropdown from `Lists!A2:A` (Reject input) | `Unlisted Soda` | Yes — rejected because item is not in `Lists` |
| `Records!C2:C` (`DIRECTION`) | Dropdown `IN, OUT` (Reject input) | `SOLD` | Yes — rejected because value must be `IN` or `OUT` |
| `Records!D2:D` (`QUANTITY`) | Number greater than 0 (Reject input) | `-5` and `ten` | Yes — rejected because quantity must be > 0 |
| `Records!E2:E` (`PRICE`) | Number greater than 0 (Reject input) | `0` and `free` | Yes — rejected because price must be > 0 |

## Protection
| Range | Who Can Edit | Warning or Restriction | Entry Columns Still Open? |
|---|---|---|---|
| `Dashboard!A1:Z100` | Builder only | Restrict who can edit this range | Yes — `Records!A2:E` remains open for owner entry |
| `Records!F2:F` (`AMOUNT` formula) | Builder only | Restrict who can edit this range | Yes — owner can still add new rows in `Records!A2:E` |
| `Lists!A1:D50` | Builder and Owner | Warning when editing this range | Yes — owner can update unit prices and reorder levels |

## AI Receipts
| The Ask (Column Headings Only) | The Formula | What I Changed | The Hand Check (Log Row) |
|---|---|---|---|
| ChatGPT — asked for total `IN` units per item across `DATE, ITEM, DIRECTION, QUANTITY, PRICE, AMOUNT` | `=SUMIFS(Records!D:D, Records!B:B, A5, Records!C:C, "IN")` | Replaced single-row test cell `A2` with `A5` and used whole-column ranges `D:D` and `B:B` so future rows count | Row 1 (`Total Stock In`): Sugar `Records` `IN` rows = `20`, sheet = `20` (agreed) |
| ChatGPT — asked for net stock balance (`IN` minus `OUT`) across `DATE, ITEM, DIRECTION, QUANTITY` | `=SUMIFS(Records!D:D, Records!B:B, A5, Records!C:C, "IN") - SUMIFS(Records!D:D, Records!B:B, A5, Records!C:C, "OUT")` | Renamed tab reference from `RECORD!` to `Records!` so cross-sheet lookup resolved cleanly | Row 3 (`Current Stock Balance`): Milk `IN 24 - OUT 10` = `14`, sheet = `14` (agreed) |
| Gemini — asked for reorder flag comparing current stock against `ITEM, UNIT PRICE, REORDER LEVEL` | `=IF(F5<=C5, "REORDER", "OK")` | Standardized flag text to uppercase `"REORDER"` and `"OK"` to match `Dashboard` conditional formatting | Row 5 (`Reorder Status`): Sugar balance `6` <= reorder threshold -> `REORDER`, sheet = `REORDER` (agreed) |

## Break the books
| Attack (Drill Card) | What I Said Would Happen | What Happened | Held or the Fix |
|---|---|---|---|
| 1. Typing text (`"abc"`) into `QUANTITY` | Validation rule would block non-numeric text | Google Sheets rejected the input immediately | Held — Reject input rule blocked bad text |
| 2. Entering an unlisted item (`"Soda"`) in `ITEM` | Dropdown rule from `Lists!A2:A` would block it | Initially accepted before rule was added; after adding dropdown with Reject input, it blocked `"Soda"` | Fixed — added `Lists!A2:A` dropdown rule on `Records!B2:B` |
| 3. Typing a negative quantity (`-10`) in `QUANTITY` | Greater-than-0 rule would refuse negative numbers | Rejected with validation error | Held — prevented fake negative stock entries |
| 4. Overwriting an old row instead of adding a correction row | Direct edit would hide the mistake from the ledger | Version history showed the overwrite; practiced appending a reversing `OUT`/`IN` row instead | Held — documented ledger rule in owner's card |
| 5. Typing over a `Dashboard` total as a non-owner editor | Protected range would block edits on `Dashboard` | Sheets blocked the edit and displayed the protected range notice | Held — `Dashboard` protection prevented formula overwrite |
| 6. Adding a new row at the bottom (row 22+) | Whole-column `SUMIFS` formulas would include it automatically | `Dashboard` totals updated immediately without changing formula ranges | Held — whole-column ranges (`D:D`, `B:B`) included new rows |
| 7. Leaving `REORDER LEVEL` or `UNIT PRICE` blank on `Lists` | Blank reorder level could falsely trigger `"OK"` or zero valuation | Blank threshold evaluated as `0`, hiding a reorder alert until filled | Fixed — added >0 validation on `Lists` prices and reorder thresholds |
