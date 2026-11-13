# Rent Card — Mama J Kiosk

## Client & Site Need
- **Client:** Mama J Kiosk
- **What the site does:** Static product catalog, price list, and WhatsApp order contact for local customers.

## Hosting Options (No-Server Row First)
| Option | Size / Spec | Cost (USD) | Cost (KES @ ~130) | Rate Card, Page & Date Read |
| :--- | :--- | :--- | :--- | :--- |
| **1. No-server (Static Hosting — GitHub Pages / Cloudflare Pages)** | Static HTML/CSS/JS, 1 GB storage, 100 GB bandwidth | $0.00 / mo ($0.00 / hr) | KES 0 / mo (KES 0 / hr) | GitHub Pages / Cloudflare Pages Pricing (`pages.cloudflare.com`), read 13 Nov 2026 |
| **2. Shared Hosting ("A Stall" — Truehost / Kenya Web Experts Starter)** | Shared CPU/RAM, 10–30 GB SSD, ~100,000 inodes | ~$2.30 / mo (~$0.0032 / hr) | KES 300 / mo (KES 0.41 / hr) | Truehost Kenya Shared Hosting (`truehost.co.ke/cloud-web-hosting/`), read 13 Nov 2026 |
| **3. Small Cloud VM — Lab Size 1 (AWS EC2 `t3.micro`, Sydney `ap-southeast-2`)** | 2 vCPU (burstable), 1 GB RAM, 8 GB EBS | $9.64 / mo ($0.0132 / hr) | KES 1,253 / mo (KES 1.72 / hr) | AWS EC2 On-Demand Pricing (`aws.amazon.com/ec2/pricing/on-demand/`), read 13 Nov 2026 |
| **4. Small VPS — Linode / Akamai Nanode 1 GB** | 1 vCPU, 1 GB RAM, 25 GB SSD | $5.00 / mo ($0.0075 / hr) | KES 650 / mo (KES 0.98 / hr) | Linode Pricing (`linode.com/pricing/`), read 13 Nov 2026 |
| **5. Larger Cloud VM — Lab Size 2 (AWS EC2 `t3.small`, Sydney `ap-southeast-2`)** | 2 vCPU, 2 GB RAM, 8 GB EBS | $19.27 / mo ($0.0264 / hr) | KES 2,505 / mo (KES 3.43 / hr) | AWS EC2 On-Demand Pricing (`aws.amazon.com/ec2/pricing/on-demand/`), read 13 Nov 2026 |

## Right-Size Line
- **Recommended choice:** Option 1 (No-server static hosting at $0 / KES 0) or Option 2 (Shared hosting stall at ~$2.30 / KES 300/mo).
- **Why not bigger (`t3.small` at $19.27 / KES 2,505/mo):** Mama J Kiosk has no backend database or heavy compute; paying for extra RAM and vCPUs wastes money every month and adds server maintenance.
- **Why not smaller than `t3.micro` if a server were required:** Anything smaller than 1 vCPU / 1 GB RAM cannot run a full Linux OS and web stack reliably without running out of memory.

## Currency & Rate Card Source
- Exchange rate used: **1 USD = 130 KES** (checked 13 Nov 2026).
- All cloud and hosting rates verified directly on the provider pricing pages on **13 Nov 2026**.

## Lab Two Sizes Check
- **Lab Size 1 (`t3.micro`):** 2 vCPU, 1 GB RAM — $0.0132/hr ($9.64/mo | KES 1,253/mo).
- **Lab Size 2 (`t3.small`):** 2 vCPU, 2 GB RAM — $0.0264/hr ($19.27/mo | KES 2,505/mo).

## Owner & Maintenance Note
- **Who minds it:** No server OS to patch on static/shared hosting; client only updates product prices and photos.

## AI Receipt
- AI receipt: Gemini, 2026-11-13, helped structure the 7 headings and 5-row layout; every price, spec, and exchange rate was verified against the live provider pricing pages on 13 Nov 2026.
