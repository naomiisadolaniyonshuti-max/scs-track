// Tests for reorder.js.  Run: node --test reorder.test.js
const test = require("node:test");
const assert = require("node:assert");
const { parseCsv, reorderList, groupBySupplier, tidyName, formatMessage } = require("./reorder.js");

const SAMPLE = "Item,Supplier,In stock,Reorder at,Unit\n" +
  "Cement 50 kg,Building wholesaler,5,20,bags\n" +
  "Iron sheets gauge 30,Steel supplier,45,30,sheets\n";

test("parses the export", () => {
  const rows = parseCsv(SAMPLE);
  assert.strictEqual(rows.length, 2);
  assert.strictEqual(rows[0].Item, "Cement 50 kg");
  assert.strictEqual(rows[1]["Reorder at"], "30");
});

test("lists items below their reorder level", () => {
  const list = reorderList(parseCsv(SAMPLE));
  assert.deepStrictEqual(list.map((r) => r.Item), ["Cement 50 kg"]);
});

test("groups the list by supplier", () => {
  const groups = groupBySupplier(reorderList(parseCsv(SAMPLE)));
  assert.deepStrictEqual(Object.keys(groups), ["Building wholesaler"]);
});

test("tidies lower-case names", () => {
  assert.strictEqual(tidyName("grinding discs"), "Grinding Discs");
  assert.strictEqual(tidyName("Cement 50 kg"), "Cement 50 kg");
});

test("formats the message", () => {
  const msg = formatMessage(groupBySupplier(reorderList(parseCsv(SAMPLE))));
  assert.match(msg, /Building wholesaler:/);
  assert.match(msg, /Cement 50 kg: 5 left/);
});

test("preserves lowercase letter after apostrophe in tidyName", () => {
  assert.strictEqual(tidyName("ng'ombe salt lick"), "Ng'ombe Salt Lick");
});
