# Bill Reading — SCS2b.5
Date read: 2026-11-19

## Running Resources Under Owner Tag
- Source: AWS Billing and Cost Management > Bills (read 2026-11-19) & Rent Card arithmetic (read 2026-11-19)
- Compute: $0.00 (no active EC2 instances running; verified against Rent Card rate x hours)
- Storage (S3): $0.00 (within Free Tier / bucket emptied at teardown; verified on Bills page 2026-11-19)
- Cost Explorer status: Checked 2026-11-19 (figures confirmed from Bills page where Cost Explorer lag applies)

## Three Questions
1. What is running under my Owner tag?
   - Checked EC2 Instances, Volumes, Elastic IPs, Snapshots, Images, and S3 Buckets on 2026-11-19: zero paid resources left running.
2. What did it cost from two sources?
   - Source 1 (AWS Billing > Bills, read 2026-11-19): $0.00 total active charge.
   - Source 2 (Rent Card arithmetic, read 2026-11-19): $0.00 (0 running hours after teardown; stopped instances incur EBS storage only if volumes remain).
3. What is the one thing I would have forgotten?
   - An unattached Elastic IP ($0.005/hr) or leftover EBS volume/snapshot after stopping an EC2 instance.
