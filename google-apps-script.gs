/**
 * Google Sheet receiver for the website enquiry / booking form.
 *
 * SETUP (one time, ~5 minutes)
 * 1. Create a new Google Sheet (e.g. "Clinic Enquiries").
 * 2. In the sheet: Extensions → Apps Script.
 * 3. Delete the sample code, paste this whole file, click Save.
 * 4. Click Deploy → New deployment → gear icon → "Web app".
 *      Execute as:     Me
 *      Who has access: Anyone
 *    Click Deploy and approve the permissions prompt.
 * 5. Copy the "Web app URL" (ends in /exec) and paste it into
 *    CONFIG.sheetUrl in js/main.js.
 *
 * If you edit this script later: Deploy → Manage deployments → edit (pencil)
 * → Version: "New version" → Deploy. The URL stays the same.
 */

const SHEET_NAME = "Enquiries";
const HEADERS = ["Timestamp", "Type", "Name", "Phone", "Email", "Treatment", "Preferred Date", "Preferred Time", "Message"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const p = e.parameter;
    // Leading apostrophe stops Sheets treating "+91..." as a formula/number
    const clean = (v) => {
      v = String(v || "").slice(0, 1000);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };

    sheet.appendRow([
      new Date(),
      clean(p.type),
      clean(p.name),
      clean(p.phone),
      clean(p.email),
      clean(p.service),
      clean(p.date),
      clean(p.time),
      clean(p.message),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
