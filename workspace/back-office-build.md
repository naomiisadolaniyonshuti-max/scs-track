# SCS3.4 Build Notes — Retail Kiosk Back Office

## 1. Overkill Verdict
Google Sheets is the right fit for this retail kiosk rather than a full database or custom app, because the owner tracks daily stock movements across fewer than 50 items and needs mobile access on a smartphone without recurring software fees.

## 2. Validation Rules and Garbage Tests
Every entry column on `Records` has a data validation rule set to **Reject input**:
- **Date (`Records!A:A`):** Valid date required; typing `"yesterday"` or `"abc"` was rejected with an error popup.
- **Item (`Records!B:B`):** Dropdown from `Lists!A2:A`; typing an unlisted item `"Soda"` was rejected.
- **Direction (`Records!C:C`):** Dropdown `"IN, OUT"`; typing `"SOLD"` was rejected.
- **Quantity (`Records!D:D`):** Number greater than 0; typing `-5` or `"ten"` was rejected.

## 3. Protection and Owner's Minute
The `Dashboard` sheet and all formula ranges on `Records` are protected so only the builder can edit formulas, while the owner is shared as an Editor on the entry columns (`Records!A2:E`) and `Lists`. During the owner's minute test signed in as a non-owner editor, typing over a Dashboard total was blocked, while appending a new stock row succeeded.

## 4. AI Receipts
- **Tool:** ChatGPT / Gemini (column headings only shared: `DATE, ITEM, DIRECTION, QUANTITY, PRICE, AMOUNT` and `ITEM, UNIT PRICE, REORDER LEVEL`).
- **Prompt 1:** Asked for a `SUMIFS` formula across whole columns on `Records` to total `"IN"` and `"OUT"` quantities per item on `Dashboard`.
- **Prompt 2:** Asked for an `IF` formula comparing current stock balance against `Reorder Level` to return `"REORDER"` or `"OK"`.
- **Verification:** Tested every formula against hand-calculated rows in `hand-check-log.md` before locking the sheet.

## 5. Break the Books
- **Test 1 (Overwrite vs. Ledger Correction):** Tested changing an earlier quantity directly vs. adding a reversing correction row; confirmed the ledger rule requires appending a new adjustment row so version history preserves the audit trail.
- **Test 2 (Blank / Future Date or Missing Price):** Tested leaving a price blank on `Lists`, which caused stock valuation to under-report until the missing unit price was filled and validated as a positive number.
