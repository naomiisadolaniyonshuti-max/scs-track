# Instance Log — SCS2b.3

## Step 0: Launch Sheet
- Region: <lab region>
- Instance name: scs-cloud-<handle>
- Instance type: <small instance type>

## Lab Steps (Did, Expected, Saw)
- Launched instance -> Expected running state -> Saw instance running
- Stopped and started instance -> IP before stop: <old IP> | IP after start: <new IP>
- Checked ports & port 8000 -> Expected blocked before rule -> Saw refused before HTTP rule, reachable after adding inbound rule

## Fault Card
- Guess before reveal: <Machine or Wall>
- Checked in order: <what you checked>
- What told me: <evidence>
