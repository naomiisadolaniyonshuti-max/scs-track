# Method Note -- SCS3.5

1. I started from a written one-page spec and a test copy of KIOSK BACK OFFICE with made-up rows so the client's real sheet was never touched.
2. Before running the AI-generated Apps Script, I read every line and mapped variables, loops, conditions, and external calls in `reading-log.md`.
3. Storing the recipient email in `Settings!B1` and adding `@OnlyCurrentDoc` kept personal data out of the public repository and limited permissions to the active workbook.
4. Testing an intentional text quantity (`4 pcs`) confirmed that `isNaN` validation prevents silent zero-counting and reports skipped rows to the owner.
5. Hand-calculating expected low-stock items before execution caught function-naming alignment (`remindReorder`) and verified the `Reorder` tab output.
6. What I might be wrong about, and how I would find out: I have not seen every row or edge formatting in the owner's real live `RECORD` tab (such as trailing spaces in `IN/OUT` or unexpected unit text), and I would find out by reviewing `Skipped rows:` warnings on the owner's first live morning run.
