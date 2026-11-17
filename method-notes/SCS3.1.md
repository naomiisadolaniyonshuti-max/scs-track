# Method note -- SCS3.1

## 1. What I set out to do

I set out to create a new starter account, organize staff into groups and organizational units, test least-privilege delegated admin access, and safely roll back the temporary role while logging every action before clicking.

## 2. What I did, in order

First, I initialized the workspace repository and recorded each planned action in the admin change log with the laptop timestamp before making changes in the Google Admin console. Next, I created the new starter user, set up the team group, created the Front Desk organizational unit, tested the delegated role limits, rolled back the role, and exported both the users and admin audit log CSVs to the evidence folder.

## 3. What went wrong, and how I fixed it

The Windows installer script did not run directly in PowerShell on my machine, so I located the scripts folder via WSL in Ubuntu, stripped Windows carriage returns, and copied the tools directly into `/usr/local/bin/` with executable permissions.

## 4. How long it took, against the plan

The setup and console configuration took approximately 45 minutes, matching the planned SGL/Lab session schedule.

## 5. One lesson for the next person

Always write the change log row and verify the exact organizational unit path before clicking in the Admin console, and never save CSV exports containing user email addresses inside the public Git repository.

## 6. What I might be wrong about, and how I would find out

I might have assumed that disabling a service on a parent organizational unit automatically blocks it for all sub-units even when inheritance is overridden; I can verify this by checking the Service Status inheritance badge on the child OU in the Admin console.
