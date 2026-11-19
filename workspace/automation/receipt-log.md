# Receipt Log — SCS3.5 Automate the Sheet

- **Files delivered:** `reorder-reminder.gs`, `reading-log.md`, `test-log.md`, `breaks.md`, `receipt-log.md`
- **Security & privacy check:** Recipient email lives only in `Settings!B1` on the spreadsheet, never hardcoded in `reorder-reminder.gs` or committed to Git.
- **Authorization scope:** `@OnlyCurrentDoc` limits spreadsheet access to the active workbook only.
