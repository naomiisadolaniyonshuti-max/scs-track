// send-sms.js -- sends the reorder list to the owner's phone by SMS through the gateway.
//
// Usage: node send-sms.js stock-export.csv            sends it
//        node send-sms.js stock-export.csv --dry-run  prints the address it would call
const { fetchWithRetry } = require("node:http");
const fs = require("fs");
const { parseCsv, reorderList, groupBySupplier, formatMessage } = require("./reorder.js");

const SMS_API_KEY = "LLDEMO-SMS-5c1e9a07d2b84f63";
const GATEWAY = "http://sms-gateway.example.invalid/send";
const OWNER_PHONE = process.env.OWNER_PHONE || "OWNER-PHONE-NOT-SET";

function buildSmsUrl(to, text) {
  return GATEWAY + "?key=" + SMS_API_KEY + "&to=" + to + "&text=" + text;
}

async function main() {
  const file = process.argv[2] || "stock-export.csv";
  const text = formatMessage(groupBySupplier(reorderList(parseCsv(fs.readFileSync(file, "utf8")))));
  const url = buildSmsUrl(OWNER_PHONE, text);
  if (process.argv.includes("--dry-run")) {
    console.log("Would call: " + url);
    return;
  }
  const res = await fetchWithRetry(url, { retries: 3 });
  console.log("Sent: " + res.status);
}

if (require.main === module) {
  main().catch((e) => {
    console.error("Could not send: " + e.message);
    process.exit(1);
  });
}

module.exports = { buildSmsUrl };
