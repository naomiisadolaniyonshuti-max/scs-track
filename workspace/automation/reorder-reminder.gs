/** @OnlyCurrentDoc */
// AI-assisted, directed by naomiisadola
// Reorder reminder: reads LIST and RECORD, writes low-stock items to Reorder, and emails Settings B1.
function checkStock() { // main function run by the daily trigger or manually from the editor
  var book = SpreadsheetApp.getActiveSpreadsheet(); // get the active copy of the spreadsheet
  var listsSheet = book.getSheetByName('LIST'); // get the LIST tab containing item reorder levels
  var recordsSheet = book.getSheetByName('RECORD'); // get the RECORD tab containing stock movements
  var settingsSheet = book.getSheetByName('Settings'); // get the Settings tab containing the owner email

  var items = listsSheet.getDataRange().getValues(); // read all rows from LIST (row 0 is headings)
  var records = recordsSheet.getDataRange().getValues(); // read all rows from RECORD (row 0 is headings)
  var ownerEmail = String(settingsSheet.getRange('B1').getValue()).trim(); // read recipient email from Settings B1

  var stock = {}; // object to track current stock count per item name
  var problems = []; // array to collect rows with invalid text quantities

  for (var r = 1; r < records.length; r++) { // loop through RECORD starting at row 1 to skip headings
    var item = String(records[r][1]).trim(); // read item name from column B and trim extra spaces
    var way = String(records[r][2]).trim().toLowerCase(); // read IN/OUT direction from column C in lowercase
    var rawQty = records[r][3]; // read quantity from column D
    if (item === '') continue; // skip blank rows safely

    var qty = Number(rawQty); // convert the quantity to a number
    if (isNaN(qty) || rawQty === '') { // check if quantity is text (like "4 pcs") or empty
      problems.push('Row ' + (r + 1) + ': invalid quantity "' + rawQty + '" for ' + item); // record uncounted row
      continue; // skip adding this invalid row to stock
    }

    if (!stock[item]) stock[item] = 0; // initialize item stock to 0 if not seen yet
    if (way === 'in') { // check if the movement is incoming stock
      stock[item] += qty; // add quantity to current stock
    } else if (way === 'out') { // check if the movement is outgoing stock
      stock[item] -= qty; // subtract quantity from current stock
    }
  }

  var lowItems = []; // array to store items at or below their reorder level
  for (var i = 1; i < items.length; i++) { // loop through LIST starting at row 1 to skip headings
    var listItem = String(items[i][0]).trim(); // read item name from column A and trim spaces
    var unit = 'units'; // default unit label since LIST has ITEMS, PRICES, and REORDER AT
    var reorderLevel = Number(items[i][2]); // read reorder level from column C (REORDER AT) as a number
    if (listItem === '') continue; // skip blank rows in LIST

    var currentStock = stock[listItem] || 0; // look up calculated stock, defaulting to 0 if none recorded
    if (currentStock <= reorderLevel) { // check if current stock is at or below the reorder level
      lowItems.push([listItem, unit, currentStock, reorderLevel]); // add low-stock item row to output list
    }
  }

  var reorderSheet = book.getSheetByName('Reorder'); // look for an existing Reorder output tab
  if (!reorderSheet) { // check if the Reorder tab does not exist yet
    reorderSheet = book.insertSheet('Reorder'); // create the Reorder tab if missing
  }
  reorderSheet.clear(); // clear old output on the Reorder tab without touching any other tab
  reorderSheet.appendRow(['Item', 'Unit', 'Current Stock', 'Reorder Level']); // write output table headings

  for (var j = 0; j < lowItems.length; j++) { // loop through all low-stock items found
    reorderSheet.appendRow(lowItems[j]); // write each low-stock item row to the Reorder tab
  }

  if (lowItems.length > 0 && ownerEmail !== '') { // check if there are low items and an address in Settings B1
    var lines = lowItems.map(function(row) { // format each low-stock item into a readable line
      return row[0] + ': ' + row[2] + ' ' + row[1] + ' left (reorder level: ' + row[3] + ')'; // build summary string
    });
    if (problems.length > 0) { // check if any rows had invalid quantities
      lines.push('\nSkipped rows:\n' + problems.join('\n')); // append skipped row warnings to the email
    }
    MailApp.sendEmail(ownerEmail, 'Reorder reminder', lines.join('\n')); // send one summary email to Settings B1
  }
}
