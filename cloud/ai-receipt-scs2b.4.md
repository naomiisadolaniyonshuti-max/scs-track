# AI Comparison Receipt — SCS2b.4

- **Spec given to the AI tool:** Static 4-page product catalog and WhatsApp contact site for a local retail kiosk in Kakuma, assumed 50 visitors/day, budget max 1,500 KES/month.
- **Ask:** Recommend three cloud hosting options with monthly USD and KES prices and explain why not bigger or smaller.
- **Option 1 checked:** AWS S3 static hosting — AI suggested ~$1/mo; checked on `aws.amazon.com/s3/pricing/` (2026-11-13) and corrected to ~USD 0.50/mo (~65 KES/mo at 1 USD = 130 KES).
- **Option 2 checked:** AWS Lightsail 1 GB plan — AI said $3.50/mo; checked on `lightsail.aws.amazon.com/ls/pricing/` (2026-11-13) and corrected to USD 5.00/mo (650 KES/mo, well inside the 1,500 KES budget).
- **Option 3 checked:** AWS EC2 `t3.micro` on-demand (`ap-southeast-2`) — checked on `aws.amazon.com/ec2/pricing/on-demand/` (2026-11-13) at USD 0.0132/hr (~USD 9.64/mo or 1,253 KES/mo, excluding extra EBS/IP charges).
- **Decision:** Choose Lightsail 1 GB (USD 5.00 / 650 KES/mo) if a full Linux VPS is needed, or S3 static hosting (~65 KES/mo) for pure static pages, because both stay well under 1,500 KES/mo with predictable billing.
