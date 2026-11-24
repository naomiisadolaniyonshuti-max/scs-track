# Stock tools

For the shop (the reference business: the hardware and welding shop).  Written with an AI assistant
last month from one prompt; the prompt was not kept.  Nobody has read it line by line.

Works on any Node.  No packages to install.

1. Download the stock tab as CSV (File, Download, Comma-separated values) and save it here as
   stock-export.csv.
2. `node reorder.js stock-export.csv` prints the reorder list: every item at or below its reorder
   level, grouped by supplier, ready to paste into WhatsApp.
3. `node send-sms.js stock-export.csv` sends the same list to the owner's phone by SMS.
   Add `--dry-run` to see the address it would call without sending.

Tests: `node --test reorder.test.js` (all pass).
