# Patch Card -- SCS3.6

One real bug from the audit.  The fix, not a rewrite.  The spec and the test come before the prompt.

The bug, in one sentence: `reorderList` in `workspace/stock-tools/reorder.js` uses `<` instead of `<=`, omitting items whose stock equals their reorder level.
Which check found it (auth, edge case, wrong version, invented library): edge case
The spec for the fix, one thing: Change `<` to `<=` in `reorderList` so items with `In stock` equal to `Reorder at` are included in the returned array.
The test that shows the bug (input -> expected): `grinding discs 115 mm,Gas and welding supplier,20,20,pieces` -> `reorderList` returns `[{ Item: "grinding discs 115 mm", ... }]` instead of `[]`.
The prompt, word for word: In workspace/stock-tools/reorder.js, change reorderList so items with In stock less than or equal to Reorder at are included (<= instead of <). Do not change any other function or file.

## The Diff, Read Whole

Every line the patch changed.  A line the spec did not ask for is marked BEYOND in the second column.

| Line | What the patch changed | In the spec? | My adjustment |
|---|---|---|---|
| 23 | Added `console.error("DEBUG reorderList");` | BEYOND | Removed the unrequested `console.error` line by hand |
| 24 | Changed `<` to `<=` in `parseInt(r["In stock"], 10) <= parseInt(r["Reorder at"], 10)` | Yes | Kept as written |

Tests before the patch: 5 pass, 1 fail (`includes items at exact reorder level` failed with `[] !== ['grinding discs 115 mm']`)
Tests after the patch: 6 pass, 0 fail (with extra stderr debug output)
Tests after my adjustment: 6 pass, 0 fail (clean stdout/stderr)
Commits on scs3.6-patch (the test, the patch, the adjustment): 3 commits (`test: include items at exact reorder level`, `patch: use <= in reorderList...`, `adjust: remove unrequested debug log...`)

## Receipt

1. Label: AI-assisted, directed by naomiisadola
2. Tool and tier: Claude / Gemini API (Paid Tier 1)
3. Spec and prompt: above, word for word
4. Tests or checks: `node --test workspace/stock-tools/reorder.test.js` -> 6 of 6 tests pass
5. Rights line: Reference shop code written for Learning Lions SCS3.6 lab; verified clean for internal lab use
6. Cost: 3.51 KSh (estimate: 4,000 tokens in, 1,000 tokens out)
