# Four-Checks Audit

Run all four on every AI-built piece before a client sees it.  Write what you found, not what you hoped.
'Clean' is allowed only with the evidence beside it: the command you ran and what it printed, or the
page you read and the date you read it.  One section per piece; add a new piece at the bottom each time.

## Piece 1: the stock tool (workspace/stock-tools)

### Auth
Looked for: Hardcoded API keys, tokens, or credentials committed in the code.
Found: Hardcoded gateway API key `LLDEMO-SMS-5c1e...` on line 9 of `workspace/stock-tools/send-sms.js` and printed in plaintext in the URL query string.
Evidence: Ran `node workspace/stock-tools/send-sms.js workspace/stock-tools/stock-export.csv --dry-run` -> printed `Would call: http://sms-gateway.example.invalid/send?key=LLDEMO-SMS-5c1e...&to=OWNER-PHONE-NOT-SET&text=...`

### Edge cases
Ugly inputs, written before trying them: Item at exact reorder level (`grinding discs 115 mm`, 20 left, reorder at 20), blank `In stock` cell (`Cement 50 kg`), quoted CSV field with comma (`"Nails, 3 inch"`), and apostrophe (`ng'ombe salt lick`).
Found: `reorder.js` uses `<` instead of `<=` (dropping items at exact reorder level), blank `In stock` parses as `NaN` and is dropped, naive `split(",")` breaks quoted CSV fields with commas, and `tidyName` capitalizes after apostrophes (`Ng'Ombe`).
Evidence: Ran `node workspace/stock-tools/reorder.js workspace/stock-tools/stock-export.csv` -> omitted `Cement 50 kg`, `"Nails, 3 inch"`, and `grinding discs 115 mm`, and printed `- Ng'Ombe Salt Lick: 2 left`.

### Wrong versions
Looked for: Node.js APIs requiring a newer runtime than installed or deprecated/experimental features.
Found: `reorder.js` line 28 uses `Object.groupBy()`, which requires Node `v21.0+` and fails on Node v18/v20 LTS, and `send-sms.js` uses `http://` instead of `https://`.
Evidence: Ran `node --version` -> printed `v22.22.1` (works on this machine because `v22.22.1 >= v21.0`, though incompatible with Node v20 LTS).

### Invented libraries
Looked for: Non-existent module imports or invented functions in `require(...)`.
Found: Line 5 of `workspace/stock-tools/send-sms.js` imports `const { fetchWithRetry } = require("node:http");` — `fetchWithRetry` does not exist in Node's built-in `node:http` module (`undefined`), crashing any live run without `--dry-run`.
Evidence: Ran `node -e 'console.log(typeof require("node:http").fetchWithRetry)'` -> printed `undefined`.

The one to fix first, and why: Remove the hardcoded `SMS_API_KEY` from `send-sms.js` (Auth) because committing a live API key to a public repository exposes the SMS gateway account to unauthorized use and charges immediately.

## Piece 2: my own SCS3.5 script

### Auth
Looked for: Hardcoded email addresses, API keys, webhooks, or overly broad OAuth scopes in `~/scs/evidence/scs3.5/reorder-reminder.gs`.
Found: Clean — no hardcoded emails, keys, or secrets; uses `/** @OnlyCurrentDoc */` to restrict authorization to the active spreadsheet and reads the owner email dynamically from `Settings!B1`.
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 1–12 -> `/** @OnlyCurrentDoc */` on line 1 and `var ownerEmail = String(settingsSheet.getRange('B1').getValue()).trim();` on line 12.

### Edge cases
Ugly inputs, written before trying them: Text or blank quantity in `Records` (`"4 pcs"` or `""`), item with zero movements, blank rows in `Lists` or `Records`, and blank `Reorder at` in `Lists` column E.
Found: Blank rows and invalid text quantities (`isNaN(qty) || rawQty === ''`) are caught and logged into `problems`, and `currentStock <= reorderLevel` includes items at the reorder level; however, a blank cell in `Lists` column E converts via `Number('')` to `0` if not guarded first.
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 23–27 -> `if (isNaN(qty) || rawQty === '') { problems.push(...); continue; }` and line 45 -> `if (currentStock <= reorderLevel)`.

### Wrong versions
Looked for: Deprecated Google Apps Script services or incompatible JavaScript syntax.
Found: Clean — uses standard V8-compatible ES5/ES6 syntax (`var`, `.map()`) and current Google Apps Script APIs (`SpreadsheetApp.getActiveSpreadsheet()`, `getSheetByName()`, `MailApp.sendEmail()`), supported in the Apps Script V8 runtime (`v8.0+`).
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 5–64 -> uses only active `SpreadsheetApp` and `MailApp` methods with no deprecated `UiApp` or `DocsList` calls.

### Invented libraries
Looked for: Non-existent Apps Script global objects, methods, or third-party libraries.
Found: Clean — uses only genuine built-in Google Apps Script global services (`SpreadsheetApp`, `MailApp`) and standard JavaScript `Number`/`String`/`isNaN`.
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 1–66 -> every external call is a documented method on `SpreadsheetApp` (`getDataRange`, `getValues`, `insertSheet`, `clear`, `appendRow`) or `MailApp` (`sendEmail`).

What I will do about what I found (a fix on the sheet copy, SCS3.5's test log, or 'clean'): Record the `Number(items[i][4])` blank-cell edge case in SCS3.5's test log so `Lists` column E is validated before comparing `currentStock <= reorderLevel`.
