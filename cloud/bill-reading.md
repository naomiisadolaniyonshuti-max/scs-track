# Bill Reading — SCS2b.5
Date read: 2026-11-19

## What is running under my Owner tag?
- Checked EC2 Instances, Volumes, Elastic IPs, Snapshots, Images, and S3 Buckets on 2026-11-19: zero paid resources left running under Owner tag.
- Unfiltered check on 2026-11-19: no unowned resources touched.

## What is it costing?
- Source 1 — AWS Billing and Cost Management > Bills (read 2026-11-19): $0.00 total active charge (compute $0.00, storage $0.00, data transfer $0.00).
- Source 2 — Rent Card arithmetic (read 2026-11-19): $0.00 (0 running hours after teardown; micro instance rate x 0 hours = $0.00).
- Source 3 — AWS Cost Explorer (figures for 2026-11-18): $0.00 (Cost Explorer data lags by up to a day, so figures shown are for 2026-11-18).
- Free Tier reference: https://aws.amazon.com/free/ (read 2026-11-19; console Free Tier page also checked 2026-11-19).

## What did I forget?
- Checked all resource lists on 2026-11-19: nothing left running; noted that an unattached Elastic IP ($0.005/hr) or leftover EBS volume/snapshot after stopping an instance would be the easiest item to forget.
