1. What I set out to do: Read my AWS bill across two sources with dates, verify budget alerts, and ensure zero paid resources remain running.
2. What I did, in order: Checked AWS Billing and Cost Explorer with page names and dates, recorded the three bill-reading questions, verified teardown rules, and documented the Client Cost Card.
3. What worked: Cross-checking the Bills page against Rent Card arithmetic caught how hourly compute differs from persistent storage charges.
4. What broke or surprised me: Stopping an instance does not stop EBS volume charges, and Cost Explorer lags behind real-time teardown by several hours.
5. What I changed or verified: Documented every figure with its exact source page and date (2026-11-19) and excluded all account IDs from the sheet.
6. One real doubt (Overtime): Any untagged resource or delayed Cost Explorer line item that had not yet settled at read time; I will check Billing and Cost Explorer again on the next working day (2026-11-20).
