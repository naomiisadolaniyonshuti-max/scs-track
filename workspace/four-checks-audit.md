# Four-Checks Audit

Run all four on every AI-built piece before a client sees it.  Write what you found, not what you hoped.
'Clean' is allowed only with the evidence beside it: the command you ran and what it printed, or the
page you read and the date you read it.  One section per piece; add a new piece at the bottom each time.

## Piece 1: the stock tool (workspace/stock-tools)

### Auth
Looked for: Hardcoded API keys, tokens, or credentials committed in the code.
Found: Hardcoded gateway API key `LLDEMO-SMS-5c1e9a07d2b84f63` on line 9 of `workspace/stock-tools/send-sms.js` and printed in plaintext in the URL query string.
Evidence: Ran `node workspace/stock-tools/send-sms.js workspace/stock-tools/stock-export.csv --dry-run` -> printed `Would call: http://sms-gateway.example.invalid/send?key=LLDEMO-SMS-5c1e9a07d2b84f63&to=OWNER-PHONE-NOT-SET&text=...`

### Edge cases
Ugly inputs, written before trying them:
1. Item at exact reorder level (`In stock` == `Reorder at`, e.g. `grinding discs 115 mm`, 20 left, reorder at 20).
2. Blank `In stock` cell (`Cement 50 kg`, `""`).
3. Quoted CSV field containing a comma (`"Nails, 3 inch"`).
4. Item name with apostrophe (`ng'ombe salt lick`).
Found:
1. `reorder.js` uses strict `<` instead of `<=`, silently dropping items right at their reorder level (`grinding discs 115 mm` is omitted even though README says "at or below").
2. Blank `In stock` parses as `NaN` (`NaN < 20` is `false`), so `Cement 50 kg` is silently dropped.
3. Naive `line.split(",")` splits `"Nails, 3 inch"` into two columns, shifting `In stock` to `"Hardware wholesaler"` (`NaN`) and dropping `"Nails, 3 inch"`.
4. `tidyName("ng'ombe salt lick")` capitalizes the letter after the apostrophe (`\b\w`), producing `Ng'Ombe Salt Lick`.
Evidence: Ran `node workspace/stock-tools/reorder.js workspace/stock-tools/stock-export.csv` -> output omitted `Cement 50 kg`, `"Nails, 3 inch"`, and `grinding discs 115 mm`, and printed `- Ng'Ombe Salt Lick: 2 left`.

### Wrong versions
Looked for: Node.js APIs requiring a newer runtime than installed or deprecated/experimental features.
Found: `reorder.js` line 28 uses `Object.groupBy()`, which was introduced in Node v21.0.0 (`v21.0+`) and throws `TypeError: Object.groupBy is not a function` on Node v18 or v20 LTS; additionally `send-sms.js` uses `http://` instead of `https://`.
Evidence: Ran `node --version` -> printed `v22.22.1` (works on this machine because `v22.22.1 >= v21.0`, though incompatible with Node v20 LTS).

### Invented libraries
Looked for: Non-existent module imports or invented functions in `require(...)`.
Found: Line 5 of `workspace/stock-tools/send-sms.js` imports `const { fetchWithRetry } = require("node:http");` — `fetchWithRetry` does not exist in Node's built-in `node:http` module (`undefined`), so any live run without `--dry-run` crashes with `TypeError: fetchWithRetry is not a function`.
Evidence: Ran `node -e 'console.log(typeof require("node:http").fetchWithRetry)'` -> printed `undefined`.

The one to fix first, and why: Remove the hardcoded `SMS_API_KEY` from `send-sms.js` (Auth) because committing a live API key to a public repository exposes the SMS gateway account to unauthorized use and charges immediately.

## Piece 2: my own SCS3.5 script

### Auth
Looked for: Hardcoded email addresses, API keys, webhooks, or overly broad OAuth scopes in `~/scs/evidence/scs3.5/reorder-reminder.gs`.
Found: Clean — no hardcoded emails, keys, or secrets; uses `/** @OnlyCurrentDoc */` to restrict authorization to the active spreadsheet and reads the owner email dynamically from `Settings!B1`.
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 1–12 -> `/** @OnlyCurrentDoc */` on line 1 and `var ownerEmail = String(settingsSheet.getRange('B1').getValue()).trim();` on line 12.

### Edge cases
Ugly inputs, written before trying them:
1. Text or blank quantity in `Records` (e.g., `"4 pcs"` or `""`).
2. Item with zero stock movements recorded in `Records`.
3. Blank rows in `Lists` or `Records`.
4. Invalid/non-numeric `Reorder at` value in `Lists` column E.
Found: Blank rows and invalid text quantities (`isNaN(qty) || rawQty === ''`) are caught and logged into `problems`, and `currentStock <= reorderLevel` properly includes items at the reorder level; however, if `Lists` column E (`reorderLevel`) is blank, `Number('')` becomes `0`, and `String(undefined)` on an empty cell becomes `'undefined'` if not guarded before `rawQty === ''`.
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 23–27 -> `if (isNaN(qty) || rawQty === '') { problems.push(...); continue; }` and line 45 -> `if (currentStock <= reorderLevel)`.

### Wrong versions
Looked for: Deprecated Google Apps Script services or incompatible JavaScript syntax.
Found: Clean — uses standard V8-compatible ES5/ES6 syntax (`var`, `.map()`) and current Google Apps Script APIs (`SpreadsheetApp.getActiveSpreadsheet()`, `getSheetByName()`, `MailApp.sendEmail()`), which are supported in the current Apps Script V8 runtime (ES2020+).
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 5–64 -> uses only active `SpreadsheetApp` and `MailApp` methods with no deprecated `UiApp` or `DocsList` calls.

### Invented libraries
Looked for: Non-existent Apps Script global objects, methods, or third-party libraries.
Found: Clean — uses only genuine built-in Google Apps Script global services (`SpreadsheetApp`, `MailApp`) and standard JavaScript `Number`/`String`/`isNaN`.
Evidence: Inspected `cat ~/scs/evidence/scs3.5/reorder-reminder.gs` lines 1–66 -> every external call is a documented method on `SpreadsheetApp` (`getDataRange`, `getValues`, `insertSheet`, `clear`, `appendRow`) or `MailApp` (`sendEmail`).

What I will do about what I found (a fix on the sheet copy, SCS3.5's test log, or 'clean'): Record the `Number(items[i][4])` blank-cell edge case in SCS3.5's test log so `Lists` column E is validated before comparing `currentStock <= reorderLevel`.
