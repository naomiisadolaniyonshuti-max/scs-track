# Reading log -- SCS3.5

Script: workspace/automation/reorder-reminder.gs
Read to the last line before the first run: yes
Label: AI-assisted, directed by naomiisadola

| Line no. | The line, first words | In my own words | Which word |
|---|---|---|---|
| 4 | function remindReorder() { | Defines the main function that runs manually or from the daily morning trigger. | trigger |
| 5 | var book = SpreadsheetApp.getActiveSpreadsheet(); | Gets the active copy of the spreadsheet that owns this bound script. | variable |
| 6 | var listsSheet = book.getSheetByName('LIST'); | Opens the LIST tab holding item names and reorder thresholds. | variable |
| 7 | var recordsSheet = book.getSheetByName('RECORD'); | Opens the RECORD tab holding all IN and OUT stock movements. | variable |
| 8 | var settingsSheet = book.getSheetByName('Settings'); | Opens the Settings tab where the owner's email is stored in B1. | variable |
| 10 | var items = listsSheet.getDataRange().getValues(); | Reads every row and column of the LIST tab into a 2D array. | sequence |
| 11 | var records = recordsSheet.getDataRange().getValues(); | Reads every row and column of the RECORD tab into a 2D array. | sequence |
| 12 | var ownerEmail = String(settingsSheet.getRange('B1').getValue()).trim(); | Reads the recipient email address from Settings B1 and trims extra spaces. | variable |
| 14 | var stock = {}; | Creates an empty object to store running stock totals keyed by item name. | variable |
| 15 | var problems = []; | Creates an empty array to record any rows with invalid text quantities. | variable |
| 17 | for (var r = 1; r < records.length; r++) { | Loops through RECORD starting at index 1 so the header row (row 0) is skipped. | loop |
| 18-21 | var item = String(records[r][1]).trim(); ... if (item === '') continue; | Reads item name, IN/OUT direction, and raw quantity for the row, skipping blank rows. | sequence |
| 23-27 | var qty = Number(rawQty); if (isNaN(qty) || rawQty === '') { ... continue; } | Converts quantity to a number; if text or blank, records the error and skips the row. | condition |
| 29 | if (!stock[item]) stock[item] = 0; | Starts the item's stock count at 0 the first time it appears in RECORD. | condition |
| 30-34 | if (way === 'in') { stock[item] += qty; } else if (way === 'out') { stock[item] -= qty; } | Adds quantity for IN movements and subtracts quantity for OUT movements. | condition |
| 37 | var lowItems = []; | Creates an empty array to hold rows for items at or below their reorder level. | variable |
| 38 | for (var i = 1; i < items.length; i++) { | Loops through LIST starting at index 1 so the header row is skipped. | loop |
| 39-42 | var listItem = String(items[i][0]).trim(); ... if (listItem === '') continue; | Reads item name and numeric reorder level from LIST, skipping blank rows. | sequence |
| 44-47 | var currentStock = stock[listItem] || 0; if (currentStock <= reorderLevel) { ... } | Looks up stock (defaulting to 0 if unrecorded) and appends items at or below reorder level. | condition |
| 50-53 | var reorderSheet = book.getSheetByName('Reorder'); if (!reorderSheet) { ... } | Finds the Reorder tab or creates it if it does not exist yet. | condition |
| 54-55 | reorderSheet.clear(); reorderSheet.appendRow(['Item', 'Unit', 'Current Stock', 'Reorder Level']); | Clears only the Reorder tab and writes the four output column headings. | sequence |
| 57-59 | for (var j = 0; j < lowItems.length; j++) { reorderSheet.appendRow(lowItems[j]); } | Loops through lowItems and writes each low-stock item row onto the Reorder tab. | loop |
| 61 | if (lowItems.length > 0 && ownerEmail !== '') { | Checks that at least one item needs reordering and Settings B1 is not blank. | condition |
| 62-67 | var lines = lowItems.map(...); if (problems.length > 0) { ... } | Formats each low-stock item into a readable line and appends any skipped-row warnings. | sequence |
| 68 | MailApp.sendEmail(ownerEmail, 'Reorder reminder', lines.join('\n')); | Sends one summary email to the owner address in Settings B1. | sequence |
