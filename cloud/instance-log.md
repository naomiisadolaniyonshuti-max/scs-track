# Instance Log — SCS2b.3

## Step 0: Launch Sheet
- Region: ap-southeast-2 (Sydney)
- Instance name: scs-cloud-[naomiisadola]
- Instance type: t2.micro (or t3.micro)

## Lab Steps (Did, Expected, Saw)
- Launched EC2 instance -> Expected instance to start and get a public IPv4 address -> Saw instance state change to Running with an assigned public IPv4 address.
- Stopped and started instance -> IP before stop: [ IP after start: [new IP] -> Saw that stopping and starting an EC2 instance assigns a new public IPv4 address unless an Elastic IP is attached.
- Checked ports & started web server on port 8000 -> Expected connection refused before opening inbound rule -> Saw browser/curl time out or refuse connection until port 8000 / HTTP inbound rule was added to the Security Group, after which the page loaded.
- Partner knock before and after HTTP rule -> Expected blocked before rule, reachable after -> Saw partner blocked when rule was closed and able to reach the page once HTTP was allowed.
- Checked instance type & tested termination -> Expected type change only while stopped and termination blocked by protection -> Saw termination refused (safety rule working).

## Fault Card
- Guess before reveal: Wall (Security Group firewall blocking the port)
- Checked in order: 1. Confirmed EC2 instance state was Running; 2. Checked that the web server was listening on port 8000; 3. Checked Security Group inbound rules.
- What told me: The instance was running and the web service was active locally, but external traffic was blocked until the Security Group inbound rule allowed the port.
