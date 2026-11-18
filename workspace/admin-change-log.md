# Admin change log -- SCS3.1

Date: 2026-11-17
Sandbox admin sign-in: naomiisadola@<sandbox-domain>
My unit: /Trainees/naomiisadola
Naming convention: first.last

One row per admin action, written BEFORE the click. A ticket may take several rows; add them as you go.
Logged at: the time on the laptop clock when you wrote the row.
Console path: where you expect to click, with ">" between the steps; correct it after if the console differs.
Audit log: filled in SGL/Lab -- the time the console's audit log shows for this change, or "gap:" and why.
Never write a password here. The first password is handed over by voice.

| #   | Ticket           | Logged at | What I am about to change (console path)                                      | Who or what it affects                                                       | Why (the three questions, one line)                                                                           | How I checked it                                                                | Audit log |
| --- | ---------------- | --------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------- |
| 1   | 1 New starter    | 10:50     | Admin console > Directory > Users > Add new user                              | amina.okello, new Front Desk starter                                         | The job needs counter email and calendar, extra access risks financial records, the owner decided             | Verified user appears active in users list and signed in via private window     | 10:52     |
| 2   | 2 Groups         | 10:55     | Admin console > Directory > Groups > Create group                             | counter@<sandbox-domain>, counter staff                                      | Staff need one shared address for shift rotas, wider access exposes management mail, the shop manager decided | Verified group page lists all counter members                                   | 10:57     |
| 3   | 3 Units          | 11:00     | Admin console > Directory > Organizational units > Create organizational unit | Front Desk under /Trainees/naomiisadola/Staff                                | Chat must be turned off for counter staff only while other staff keep it, the owner decided                   | Verified Front Desk OU appears in tree and moved new starter into it            | 11:02     |
| 4   | 4 Delegated role | 11:05     | Admin console > Account > Admin roles > Assign users                          | Accountant user in /Trainees/naomiisadola/Staff, Password Reset Admin        | The job needs password resets for staff only, full admin risks billing and data deletion, the owner decided   | Signed in as accountant and tested three actions to confirm role limits         | 11:07     |
| 5   | 5 Rollback       | 11:10     | Admin console > Account > Admin roles > Unassign users                        | Accountant user in /Trainees/naomiisadola/Staff, remove Password Reset Admin | The role test is complete and elevated privileges are no longer needed, the trainer decided                   | Confirmed Password Reset Admin role is removed from the accountant user profile | 11:12     |

## Gaps

none

## Audit match

Rows matched: 5 of 5. Gaps explained: 0.

## SCS3.2 -- sharing, security, backups, offboarding (2026-11-18)

Practice OU only.  Every row written before the click; the check column filled after it.

| # | Time | What I am about to change (console path) | Who or what it affects | Why, in one line | How I checked it | Undo |
|---|---|---|---|---|---|---|
| 1 | 10:45 | Admin console > Apps > Google Workspace > Drive and Docs > Sharing settings | Practice OU (`/Trainees/naomiisadola/Staff`) | Restrict sharing outside the organization to warn-only and disable public link sharing to prevent data leaks | Checked Drive sharing settings banner and tested external share in second browser profile | Set external sharing back to Allowed for practice OU |
| 2 | 10:48 | Admin console > Apps > Google Workspace > Drive and Docs > Manage shared drives > Create | Practice Shared Drive (`Workshop-Shared`) | Create a central team-owned drive so business files stay with the company when staff leave | Verified `Workshop-Shared` appears in Manage shared drives and added practice members | Delete `Workshop-Shared` in Manage shared drives |
| 3 | 10:51 | Admin console > Apps > Google Workspace > Drive and Docs > Manage shared drives > Settings | Practice Shared Drive (`Workshop-Shared`) | Prevent non-managers from sharing files outside the Shared Drive or downloading/copying restricted sheets | Checked Shared Drive settings panel shows external sharing and commenter download disabled | Re-enable default Shared Drive member permissions |
| 4 | 10:54 | Admin console > Security > Authentication > 2-step verification | Practice OU (`/Trainees/naomiisadola/Staff`) | Enforce 2-Step Verification for all practice OU users to block password-only account takeovers | Verified 2-Step Verification enforcement shows On for practice OU and enrolled practice user | Turn off 2-Step Verification enforcement for practice OU |
| 5 | 10:58 | Admin console > Security > Access and data control > Login challenges / Backup codes | Practice user (`amina.okello`) | Generate offline backup verification codes on paper so the user is not locked out if phone is lost | Verified backup codes generated on screen, written on paper, and no digital copy saved | Regenerate or revoke unused backup codes |
| 6 | 11:02 | Admin console > Devices > Mobile and endpoints > Settings > Universal > General > Password requirements | Practice OU (`/Trainees/naomiisadola/Staff`) | Require a device screen lock on endpoints accessing Workspace data to protect lost or stolen devices | Verified mobile password/screen-lock requirement shows Enabled for practice OU | Set mobile password requirement back to Not configured |
| 7 | 11:06 | Admin console > Directory > Users > `amina.okello` > Suspend user | Practice leaver (`amina.okello`) | Immediately block sign-in for departing staff member while preserving mailbox and Drive files for handover | Verified user status badge shows Suspended and sign-in attempt in second profile is refused | Click Reactivate user on `amina.okello` profile |
| 8 | 11:09 | Admin console > Directory > Users > `amina.okello` > Security > Reset sign-in cookies | Practice leaver (`amina.okello`) | Invalidate active browser and mobile sessions so the leaver cannot continue accessing cached sessions | Verified Security section confirms sign-in cookies reset and active session terminated | No undo needed; user signs in fresh upon reactivation |
| 9 | 11:12 | Admin console > Apps > Google Workspace > Drive and Docs > Transfer ownership | From `amina.okello` to `accountant` | Transfer all Drive files owned by the departing user to the Finance/Manager user before license removal | Checked Drive audit log events and confirmed `accountant` now owns the transferred files | Transfer ownership back from `accountant` to `amina.okello` |
| 10 | 11:16 | Admin console > Directory > Users > `amina.okello` > Reactivate user | Practice user (`amina.okello`) | Restore the practice user account after offboarding and restore drills so the sandbox OU is left whole | Verified user status returned to Active and signed in via second profile | Suspend user again if needed |
| 11 | 11:20 | Admin console > Apps > Google Workspace > Drive and Docs > Transfer ownership | From `accountant` back to `amina.okello` | Return transferred practice files back to `amina.okello` at end of lab to reset the practice OU cleanly | Verified original file ownership restored in Drive and exported final Users CSV | Transfer ownership back to `accountant` |
