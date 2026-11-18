# SCS3.2 Method Note -- Sharing, Security, Backups, and Offboarding (2026-11-18)

1. Pre-click change logging forced me to verify the exact console path, target Organizational Unit, and rollback step before altering any live security or sharing control.
2. Enforcing 2-Step Verification and mobile screen-lock rules at the practice OU level protected staff accounts without breaking access for other OUs in the shared domain.
3. Moving operational files into a Shared Drive solved single-user file ownership risk, while testing four distinct restore paths revealed that admin Drive restores strip original folder paths and link-sharing permissions.
4. Separating offboarding into immediate suspension, cookie reset, ownership transfer, and offline archival prevented both unauthorized post-departure access and accidental data loss.
5. Reviewing an AI-drafted policy against the actual Admin console edition caught unsupported enterprise features (like Vault legal holds) and invented legal retention numbers before the owner saw them.
6. What I might be wrong about in this client's data, and how I would find out: I assumed all business-critical records live in Google Drive and only the listed staff hold external shares, so I could be missing files stored locally on workshop PCs or personal Gmail accounts—I would find out by checking the Drive external-sharing audit log for the past 30 days and interviewing each department lead on where they save daily receipts.
