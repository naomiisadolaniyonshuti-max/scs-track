# Method note -- SCS4.1

## 1. What I set out to do
Set up the SCS4.1 workspace and records, install and run net-look to read the laptop's network numbers across both layers, and check the troubleshooting ladder starting from the first failing rung.

## 2. What I did, in order
Ran setup-scs4.1 to create the security and method-note files and evidence folder, copied net-look into ~/.local/bin and ran it on the station network to get receipt net-look-2026-11-25_100422.txt, inspected the SCS4.1 templates, and pushed existing commits to origin/main.

## 3. How I checked it worked
Verified which net-look resolved to ~/.local/bin/net-look, checked the net-look output and saved receipt in ~/scs-checks, and re-ran check-scs4.1 to confirm updated check results.

## 4. What went wrong and what I did about it
setup-scs4.1 initially failed because it was not yet downloaded to Windows Downloads, and net-look initially returned command not found; I downloaded both from the Scripts folder, placed net-look in ~/.local/bin with execute permissions, and ran it again.

## 5. What I would do differently next time
Download the required scripts from the Scripts folder before running copy commands in Ubuntu, and read each template and README carefully before editing files.

## 6. What I might be wrong about, and how I would find out
Net-look reported Rung 3 (gateway 10.10.51.1) as the first failing rung on the laptop's Wi-Fi while Rung 5 resolved a name, so I might be wrong about whether the fault is isolated to this laptop, the Wi-Fi link, or the router itself; I would find out by checking a healthy device next to mine for the same gateway and testing reachability to 10.10.51.1.
