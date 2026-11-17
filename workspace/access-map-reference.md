# Access map -- the reference shop (an invented business) -- SCS3.1

Who should have which access, and why? One row per person, or per identical job.
Groups are people; units are settings; every person is in one unit and many groups.
Why: the three questions in one line -- what the job needs, what goes wrong with more, who decided.
This map is of an invented business and may be committed. Your client's map never comes here:
it lives in the client folder (Clients, in your Windows SCS folder).

| Person (job)                               | What the job needs                               | OU                     | Groups                                    | Admin role            | Why (one line)                                                                                                         |
| ------------------------------------------ | ------------------------------------------------ | ---------------------- | ----------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| The owner                                  | Full business oversight and account recovery     | /Shop                  | all-staff@shop.test, management@shop.test | Super Admin           | The owner needs full control of business accounts, giving super-admin to others risks total lockout, the owner decided |
| The accountant (a sandbox user, ticket 4)  | Email, finance sheets, and staff password resets | /Shop/Staff            | all-staff@shop.test, finance@shop.test    | Password Reset Admin  | The job needs password reset ability for staff, full admin exposes system settings, the owner decided                  |
| The shop manager                           | Team scheduling, mail, and shop operations       | /Shop/Staff            | all-staff@shop.test, management@shop.test | none                  | The job needs team mail and schedules, admin rights risk accidental changes, the owner decided                         |
| Counter staff (four)                       | Daily sales mail and shift roster                | /Shop/Staff/Front Desk | all-staff@shop.test, counter@shop.test    | none                  | The job needs shift mail only, chat and admin access distract and expose books, the shop manager decided               |
| The new starter (a sandbox user, ticket 1) | Counter mail and shift calendar                  | /Shop/Staff/Front Desk | all-staff@shop.test, counter@shop.test    | none                  | The job needs basic counter mail, extra access risks customer and finance records, the shop manager decided            |
| Welders (three)                            | Workshop safety notices and job sheets           | /Shop/Workshop         | all-staff@shop.test, workshop@shop.test   | none                  | The job needs workshop notices only, office files and admin tools are unnecessary, the shop manager decided            |
| Drivers (two)                              | Delivery schedules and route updates             | /Shop/Logistics        | all-staff@shop.test, drivers@shop.test    | none                  | The job needs delivery mail only, wider access exposes internal pricing, the shop manager decided                      |
| Me (the admin)                             | Day-to-day user and group setup                  | /Shop/IT               | all-staff@shop.test                       | User Management Admin | The job needs user and group administration, super-admin is reserved for the owner alone, the owner decided            |

## The partner's cold read

Partner: Dessai. One person with more than the job needs, or "none" and why: none — every role holds only the minimum access required for their job.
