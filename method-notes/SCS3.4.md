# Method Note -- SCS3.4

1. I started with the Overkill Test on the kiosk client (one to two people entering ~150 rows/month, no external integrations, owner-maintained) and confirmed Google Sheets with the Inventory pattern was right-sized.
2. I structured `KIOSK_BACK_OFFICE-v2.xlsx` into three clean tabs (`LIST`, `RECORD`, `DASHBOARD`): items, prices, and reorder levels typed once on `LIST`; append-only events on `RECORD`; and formula-only KPIs on `DASHBOARD`.
3. Each sale row on `RECORD` stores its own unit `PRICE` and `AMOUNT` (`=D*E`) so future price updates on `LIST` never rewrite historical monthly revenue.
4. I verified every dashboard KPI (`SALES THIS MONTH = 5125`, `UNITS SOLD = 59`, `UNITS IN STOCK = 30`, `ITEMS TO REORDER = 2` for Bread and Milk, `ITEMS OUT OF STOCK = 0`) by hand-calculating the `RECORD` ledger rows.
5. I protected `LIST` and `DASHBOARD` (leaving only `RECORD` data entry cells open) and wrote a plain-language one-page owner card covering daily entry, correcting mistakes with an append row, and monthly backup.
6. What I might be wrong about, and how I would find out: If the kiosk owner adds a new item on `LIST` (such as `Cooking oil` currently marked `GAP`) without setting a numeric price or if a cashier types an item name not on `LIST`, `DASHBOARD` counts could miss that item; I would find out during the first week's review by checking `RECORD` against data-validation warnings and the owner's cash book.
