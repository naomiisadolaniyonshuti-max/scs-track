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
