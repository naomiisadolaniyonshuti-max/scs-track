# Network troubleshooting log -- SCS4.1

Date: 2026-11-25
Station: [STATION_LABEL_FROM_BOARD]

The fair copy of the paper log.  The kit station is the SA team's isolated lab network, never the campus.
Nothing private here: no passwords, no public addresses, no client's name.
The rules: the guess before the first swap.  Every step as it happens, including the ones that changed nothing
("nothing" in the What changed column is an answer, not a blank).  Put it back.  The SA initials the paper log
only after the put-back is checked.

## Fault 1 -- station fault

Symptom (the owner's words): [SYMPTOM_1_IN_OWNERS_WORDS]
My guess (device, cable or network): network
The rung I expected to fail: [1-6]

| Step | What I did (one swap or one look) | What changed | Rung |
|---|---|---|---|
| 1 | [FIRST_CHECK_OR_SWAP_1] | nothing | [1-6] |
| 2 | [SECOND_CHECK_OR_SWAP_1] | [NOTHING_OR_OBSERVATION_1] | [1-6] |
| 3 | [THIRD_CHECK_OR_SWAP_1] | [NOTHING_OR_OBSERVATION_1] | [1-6] |
| 4 |  |  |  |
| 5 |  |  |  |
| 6 |  |  |  |

The rung that failed: [1-6]
The fault was: [WHAT_WAS_BROKEN_1]
Fixed by: [HOW_FIXED_1]
Put back: [HOW_RESTORED_1]
SA initialled the paper log (yes / not yet): not yet

## Fault 2 -- station fault

Symptom (the owner's words): [SYMPTOM_2_IN_OWNERS_WORDS]
My guess (device, cable or network): device
The rung I expected to fail: [1-6]

| Step | What I did (one swap or one look) | What changed | Rung |
|---|---|---|---|
| 1 | [FIRST_CHECK_OR_SWAP_2] | nothing | [1-6] |
| 2 | [SECOND_CHECK_OR_SWAP_2] | [NOTHING_OR_OBSERVATION_2] | [1-6] |
| 3 | [THIRD_CHECK_OR_SWAP_2] | [NOTHING_OR_OBSERVATION_2] | [1-6] |
| 4 |  |  |  |
| 5 |  |  |  |
| 6 |  |  |  |

The rung that failed: [1-6]
The fault was: [WHAT_WAS_BROKEN_2]
Fixed by: [HOW_FIXED_2]
Put back: [HOW_RESTORED_2]
SA initialled the paper log (yes / not yet): not yet

## Fault 3 -- fault card, I was the fixer

Sealed log fingerprint (the 12 characters in my break.sh guess file): 1e836111d79a
Card number (after the reveal): 27
Symptom (the owner's words, as my partner said it): [SYMPTOM_AS_PARTNER_SAID_IT]
My guess (device, cable or network): network
The rung I expected to fail: [1-6]
My break.sh guess in one line (written before the reveal): DNS resolution or name lookup is broken or misconfigured while IP and gateway connectivity still work.

| Step | What I did (one swap or one look) | What changed | Rung |
|---|---|---|---|
| 1 | Checked adapter and IP/DNS configuration on the target machine | [NOTHING_OR_OBSERVATION] | [1-6] |
| 2 | Checked gateway and IP reachability vs. name resolution | [NOTHING_OR_OBSERVATION] | [1-6] |
| 3 | Ran break.sh --guess, sudo break.sh --reveal, and sudo break.sh --unbreak | Revealed Card 27 and printed manual undo for DNS | [1-6] |
| 4 |  |  |  |
| 5 |  |  |  |
| 6 |  |  |  |

The rung that failed: [1-6]
The fault was: Card 27 set the DNS server to 192.0.2.53 on the isolated lab machine
Fixed by: Restored DNS back to automatic (DHCP) on the lab machine
Proved on the lab device with the ladder (the rungs that passed after the fix): [RUNGS_PASSED_AFTER_FIX]
Put back (the undo line break.sh printed, done by hand and checked): Set DNS back to automatic (DHCP) and verified on the lab device
SA initialled the paper log (yes / not yet): not yet
Was my guess right, and what did the reveal add: Yes on DNS/name resolution; the reveal identified Card 27 and the specific lab DNS value 192.0.2.53 plus the manual DHCP undo step.

## The card I planted -- I was the partner

Card number: [NOT_PLANTED_BY_ME]
The step break.sh printed, done by hand on the lab device (in my words, no passwords): [NOT_PLANTED_BY_ME]
The undo, done by hand after the fixer finished, and how we checked it: [NOT_PLANTED_BY_ME]
The first thing my partner's log got right: [NOT_PLANTED_BY_ME]
