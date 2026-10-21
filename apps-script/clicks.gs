// Клики по карточкам — Google Apps Script Web App.
// Принимает события с сайта (см. EVENTS ниже) и добавляет строку в таблицу.
// Если SPREADSHEET_ID пустой, при первом событии скрипт сам создаёт таблицу
// «Клики по карточкам — МК» в вашем Google Drive и запоминает её.
// Деплой: Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Клики';

const COLUMNS = [
  ['timestamp', 'Отметка времени'],
  ['event', 'event'],
  ['product', 'product'],
  ['source', 'source'],
  ['visitor_id', 'visitor_id'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_content', 'utm_content'],
  ['utm_term', 'utm_term'],
  ['landing_url', 'landing_url'],
  ['referrer', 'referrer'],
  ['page_url', 'page_url'],
];
// visit — заход; quiz_pick — тап по проблеме на первом экране; card_open — открыл карточку;
// form_start — начал заполнять форму; form_invalid — нажал «отправить» с ошибками;
// lead — заявка ушла в таблицу; lead_error — заявка не ушла; cta_click — ушёл на тест/сайт; whatsapp_click — нажал WhatsApp; instagram_click — перешёл в Instagram.
const EVENTS = ['visit', 'quiz_pick', 'card_open', 'form_start', 'form_invalid', 'lead', 'lead_error', 'cta_click', 'whatsapp_click', 'instagram_click', 'video_play'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const data = parse_(e);
    if (EVENTS.indexOf(data.event) === -1) throw new Error('unknown event');

    const sheet = getSheet_();
    const headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => String(h).trim()) : [];
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

// Открытие URL в браузере: проверка деплоя, ничего не записывает.
function doGet() {
  return json_({ ok: true, service: 'clicks' });
}

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = SPREADSHEET_ID || props.getProperty('SPREADSHEET_ID');
  if (!id) {
    const created = SpreadsheetApp.create('Клики по карточкам — МК');
    created.getSheets()[0].setName(SHEET_NAME);
    id = created.getId();
    props.setProperty('SPREADSHEET_ID', id);
  }
  const ss = SpreadsheetApp.openById(id);
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function parse_(e) {
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (err) {}
  }
  return (e && e.parameter) || {};
}

function safe_(value) {
  const text = String(value == null ? '' : value).slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
