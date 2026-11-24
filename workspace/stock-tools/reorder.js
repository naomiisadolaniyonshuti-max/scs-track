// reorder.js -- reorder helper for the shop's stock sheet.
// Reads the stock tab downloaded as CSV and prints what to reorder, grouped by supplier,
// ready to paste into WhatsApp.
//
// Usage: node reorder.js stock-export.csv
const fs = require("fs");

// Turn the CSV text into one object per row, keyed by the header names.
function parseCsv(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(",");
    const row = {};
    headers.forEach((h, i) => {
      row[h] = (cells[i] || "").trim();
    });
    return row;
  });
}

// Items at or below their reorder level.
function reorderList(rows) {
  return rows.filter((r) => parseInt(r["In stock"], 10) < parseInt(r["Reorder at"], 10));
}

// One list per supplier, so each supplier gets one message.
function groupBySupplier(list) {
  return Object.groupBy(list, (r) => r.Supplier);
}

// The counter staff type item names in lower case on the phone -- tidy them for the message.
function tidyName(name) {
  if (name === name.toLowerCase()) {
    return name.replace(/(^|\s)\w/g, (c) => c.toUpperCase());
  }
  return name;
}

function formatMessage(groups) {
  const out = ["Reorder list"];
  for (const supplier of Object.keys(groups)) {
    out.push("");
    out.push(supplier + ":");
    for (const r of groups[supplier]) {
      out.push("- " + tidyName(r.Item) + ": " + r["In stock"] + " left (reorder at " + r["Reorder at"] + " " + r.Unit + ")");
    }
  }
  return out.join("\n");
}

if (require.main === module) {
  const file = process.argv[2] || "stock-export.csv";
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  console.log(formatMessage(groupBySupplier(reorderList(rows))));
}

module.exports = { parseCsv, reorderList, groupBySupplier, tidyName, formatMessage };
