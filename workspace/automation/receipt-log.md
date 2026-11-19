# AI receipt log -- SCS3.5

Label: AI-assisted, directed by naomiisadola
Tool: Gemini in Chrome
Spec initialled on (YYYY-MM-DD): 2026-11-19
First prompt sent on (YYYY-MM-DD HH:MM): 2026-11-19 09:45

## The one prompt, word for word
Write an Apps Script on Google Sheets with a comment on every line for my Copy of KIOSK BACK OFFICE spreadsheet. Read item names and reorder levels from the LIST tab (columns ITEMS, PRICES, REORDER AT) and read stock movements from the RECORD tab (columns DATE, ITEMS, IN/OUT, QUANTITY), skipping header rows and blank rows. If a quantity is text like "4 pcs" instead of a number, skip it and record a warning instead of crashing or treating it as zero. Calculate current stock per item (adding IN and subtracting OUT), find every item whose current stock is less than or equal to its reorder level, clear and write those low-stock items to a tab named Reorder without touching any other tab, and send one summary email to the recipient address stored in Settings cell B1 (never hardcode an email address in the script). Include @OnlyCurrentDoc at the top.

## What came back, and what I changed by hand
The tool returned a 70-line script with @OnlyCurrentDoc, line-by-line comments, NaN validation for text quantities, Reorder tab output, and MailApp notification reading Settings B1. By hand, I renamed the entry function from `checkStock` to `remindReorder` so it matched the saved Apps Script project and daily trigger, and verified every line against the reading log before running.

## Iteration -- only if the draft missed a line of the spec (which line)
None — all lines of the initialled spec were covered in the draft and verified on the Copy of KIOSK BACK OFFICE test run.

## The debug move -- one real error: the message pasted whole, what my trace said first, what the tool said
During setup, opening a second Apps Script tab showed `function myFunction() {}` with unsaved changes while the saved project was in the first tab. My trace showed the second tab was a blank standalone script (`1D4NETWX...`) rather than the bound project (`1wu_rQV4...`). Closing the blank tab and running `remindReorder` in the bound tab completed cleanly in 7 seconds (`Execution completed`).
