# Test log -- SCS3.5

| Case | Input rows (made up) | Expected (by hand, before the run) | Actual (after the run) | Pass or fail | Patch (line, commit) |
|---|---|---|---|---|---|
| Test 1 | Made-up RECORD IN/OUT rows on Copy of KIOSK BACK OFFICE where Bread, Milk, Rice, and Cooking oil are at or below REORDER AT | Reorder tab created/cleared and populated with those 4 low-stock items; one summary email sent to Settings B1 | Execution completed in 7s; Reorder tab populated with the 4 items and summary email received | Pass | Renamed checkStock to remindReorder (line 4, 4ad14cb) |
| Test 2 | Second manual run with same rows | Reorder tab cleared first so rows are not duplicated; LIST, RECORD, DASHBOARD, and Settings untouched | Reorder tab replaced cleanly with 4 rows; source tabs untouched | Pass | None |
| Edge case | RECORD row with quantity "4 pcs" (text instead of number) | Row skipped without crashing or counting as 0; warning included under Skipped rows in email | Row skipped via isNaN check; warning appended to email and Reorder counts stayed accurate | Pass | None |
| Second edge case (optional, SGL menu) | Item in LIST with zero movement rows in RECORD and reorder level 5 | Defaults currentStock to 0 (0 <= 5) and includes item in Reorder tab | Included in Reorder tab with Current Stock 0 | Pass | None |
| Partner as a careless owner | Blank row in RECORD and extra spaces around item name | Blank row skipped cleanly; trimmed item name matches LIST | Blank row skipped; trimmed name matched LIST | Pass | None |
| Re-run in front of the trainer | Clean Copy of KIOSK BACK OFFICE with test break row removed | Reorder tab reflects clean stock totals and sends one email to Settings B1 | Ready for live trainer demonstration | Pass | None |
