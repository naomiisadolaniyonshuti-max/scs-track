# Break Log — remindReorder()

- **Intentional break tested:** Added a row in `RECORD` with a text quantity (`4 pcs` instead of a numeric quantity `4`).
- **Expected vs. actual behavior:** `Number("4 pcs")` returned `NaN`, caught by `isNaN(qty)`. The script did not crash and did not silently treat `"4 pcs"` as `0`; it skipped the invalid row, recorded the row number in `problems`, and appended a `Skipped rows:` warning to the owner's email.
- **Cleanup:** Removed the test row from `RECORD` and re-ran `remindReorder()` to restore clean stock numbers on `Reorder`.
