// Браверман бағдарламасы — Google Apps Script Web App.
// Принимает POST с сайта (JSON в теле запроса) и добавляет строку в таблицу.
// Деплой: Deploy → Manage deployments → ✏️ → Version: New version → Deploy (URL остаётся прежним).
const SPREADSHEET_ID = '1Ucb-1EyFYOMi-ubgQ58fO2CQH18LrOHgoYlM33vS9Wc';
const SHEET_GID = 476042853;

// [ключ в данных сайта, заголовок столбца в первой строке]. Недостающие столбцы добавляются справа.
const COLUMNS = [
  ['timestamp', 'Отметка времени'],
  ['name', 'Аты-жөніңіз кім?'],
  ['phone', 'Телефон номеріңіз (Ватсап)'],
  ['instagram', 'Instagram парақшаңыз'],
  ['occupation', 'Қазір немен айналысасыз?'],
  ['income', 'Табысыңыз қанша?'],
  ['request', 'Қандай запросыңыз бар?'],
  ['readiness', 'Қазір оқуға қаншалықты қызығушылық танытып отырсыз?'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_content', 'utm_content'],
  ['utm_term', 'utm_term'],
  ['landing_url', 'landing_url'],
  ['referrer', 'referrer'],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const data = parse_(e);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets().find(s => s.getSheetId() === SHEET_GID);
    if (!sheet) throw new Error('Sheet with gid ' + SHEET_GID + ' not found');

    const lastCol = sheet.getLastColumn();
    const headers = lastCol ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim()) : [];
    COLUMNS.forEach(([, header]) => {
      if (headers.indexOf(header) === -1) {
        headers.push(header);
        sheet.getRange(1, headers.length).setValue(header);
      }
    });

    const row = new Array(headers.length).fill('');
    COLUMNS.forEach(([key, header]) => {
      row[headers.indexOf(header)] = key === 'timestamp' ? new Date() : safe_(data[key]);
    });
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Открытие URL в браузере: проверка, что деплой живой. Ничего не записывает.
function doGet() {
  return json_({ ok: true, service: 'braverman-bagdarlamasy' });
}

function parse_(e) {
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (err) {}
  }
  return (e && e.parameter) || {};
}

// Текст, начинающийся с = + - @, таблица приняла бы за формулу (телефон «+7…» в том числе).
function safe_(value) {
  const text = String(value == null ? '' : value).slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
