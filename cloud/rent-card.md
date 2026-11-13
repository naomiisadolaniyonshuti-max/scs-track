# Rent Card — Local Retail Kiosk

## The need
A small static brochure and product price-list website with WhatsApp contact for a local retail kiosk in Kakuma (business described, not named).
Estimated fifty visitors a day (assumed 50 visitors a day based on daily walk-in and WhatsApp price enquiries, and said so).
Maximum monthly budget: 1,500 KES (shillings) a month.

## Measured
Measured at 12:15 on 2026-11-13 on AWS EC2 `t3.micro` (from `SCS2b.3` lab):
- `nproc`: 2 vCPUs
- `free -m`: 362 MiB free of 914 MiB total RAM
- `uptime`: load average 0.02, 0.03, 0.00 (CPU average ~1.5% across measured hours)
- `df -h`: 6.1 GiB free of 7.6 GiB root disk
- `uname -m`: x86_64 (Intel/AMD architecture; moving to `t4g` arm64 would require ARM-compiled packages/binaries)

## What to rent for what
| Option | What it is for | Why / Owner impact |
| :--- | :--- | :--- |
| **No server (S3)** | Static HTML/CSS/JS pages only, no backend login | Cheapest option for a brochure/price list |
| **t3.micro / t4g.micro** | Small dynamic site or light web app | Matches our measured lab baseline (2 vCPU, 1 GiB RAM) |
| **Lightsail** | Simple VPS with one fixed monthly price | Easy for a small business owner to read one flat bill |
| **m-class / GPU (`m5.large` / `g4dn.xlarge`)** | Never for a small client — heavy compute or ML | Costs ~9x–39x more than `t3.micro` (over 11,388–48,000 KES/mo) for idle hardware (aws.amazon.com/ec2/pricing/on-demand/, read 2026-11-13) |
| **scs-server VM** | Learning and local staging on the laptop | Free locally before deploying to live cloud |

## My choice
Lightsail 1 GB plan (or `t3.micro` if staying on EC2; `No server (S3)` if purely static pages).

## Why not bigger, why not smaller
- **Why not bigger:** `free -m` at 12:15 showed 362 MiB free out of 914 MiB and `uptime` load was 0.02, so a `t3.small` (2 GiB RAM) would sit mostly idle while doubling the monthly cost.
- **Why not smaller:** A `t3.nano` has only 512 MiB RAM, which is too tight to comfortably run Ubuntu, Nginx, and TLS/updates without memory pressure during traffic spikes.

## Prices
- AWS S3 static hosting (first 5 GB storage + light traffic, `ap-southeast-2`): USD 0.50 a month (`aws.amazon.com/s3/pricing/`, read 2026-11-13)
- AWS EC2 `t3.micro` on-demand (`ap-southeast-2`): USD 0.0132 an hour / USD 9.64 a month (`aws.amazon.com/ec2/pricing/on-demand/`, read 2026-11-13)
- AWS EC2 `t3.small` on-demand (`ap-southeast-2`): USD 0.0264 an hour / USD 19.27 a month (`aws.amazon.com/ec2/pricing/on-demand/`, read 2026-11-13)
- AWS EC2 `m5.large` on-demand (`ap-southeast-2`): USD 0.1200 an hour / USD 87.60 a month — ~9.1x `t3.micro`, or ~11,388 KES/mo vs 1,253 KES/mo (`aws.amazon.com/ec2/pricing/on-demand/`, read 2026-11-13)
- AWS Lightsail 1 GB Linux plan (`ap-southeast-2`): USD 5.00 a month (`lightsail.aws.amazon.com/ls/pricing/`, read 2026-11-13)
- Rate: 1 USD = 130 KES, from Central Bank of Kenya indicative rate page, read 2026-11-13

## Lightsail or EC2 for this client
Lightsail for this client, because the owner gets one predictable fixed monthly bill in USD/KES with disk and data transfer bundled rather than metered hourly EC2 charges.
