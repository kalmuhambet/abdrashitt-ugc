/* ================= НАСТРОЙКИ — меняйте только этот блок ================= */
const CONFIG = {
  // Номер WhatsApp команды, только цифры, например '77011234567'. Пусто — кнопки WhatsApp скрыты.
  whatsapp: '',
  // ID пикселя TikTok (TikTok Ads Manager → Assets → Events → Web). Пусто — пиксель не грузится.
  tiktokPixelId: '',
  // Ссылка на бесплатный 1-й урок «Энергии» (YouTube, доступ по ссылке). Задана — после заявки сразу показываем кнопку «Сабақты көру».
  energyLessonUrl: 'https://youtu.be/I4kjhDvsA-A',
};
const endpoints = {
  energy: 'https://script.google.com/macros/s/AKfycbxBMpsXwEZg74yXOZgLfNIoB2OI40r6DbNommcmupP0ZFUqVVMkARNBOrwSkjDu3EgQVA/exec',
  analysis: 'https://script.google.com/macros/s/AKfycbwfSMO_tzUrqTWyIIEQqlVvBjI4NCADNWqMugLl55xTSNVw72Xx-KXwFwpycbeSsA1n/exec',
  program: 'https://script.google.com/macros/s/AKfycbyu6g-4K0j_pmKvakx5g1qmTGKwEghweBXLwl8wWLtQ7uPA_afecewQl9BtFrMkOlnt1w/exec',
};
// Web App URL скрипта apps-script/clicks.gs (визиты, открытия карточек, начало формы, заявки)
const trackEndpoint = 'https://script.google.com/macros/s/AKfycbxAWiVChx1nrkQELebkYuHqmu-fITBFDJE_l7DmWi9wFQj3XFsqok4E7pc-qiVqtEBG2Q/exec';
/* ======================================================================== */

const products = {
  energy: {
    kicker: '01 / КУРС · 1-САБАҚ ТЕГІН', name: 'Энергия курсы', image: 'assets/card-01.jpg',
    title: 'Энергияңызды қалпына келтіріп, фокус пен тәртіпті күшейтіңіз',
    lead: 'Бұл курс күнделікті энергияны дұрыс басқаруға, зейінді бір жерге жинауға және тұрақты әрекет етуге көмектеседі.',
    section: 'Кімге арналған',
    items: ['Энергиясы тез таусылатындарға', 'Фокус сақтау қиын адамдарға', 'Тәртіпті қалыптастырғысы келетіндерге', 'Көп жоспарлап, бірақ әрекетке көшу қиын адамдарға'],
    extra: 'Курста энергия, фокус, өзін-өзі басқару, тәртіп, орта және күнделікті әдеттер тақырыптары қарастырылады. Бірінші сабақты тегін көріп, курс сізге сай ма — соны өзіңіз шешесіз.',
    form: 'energy',
    chips: ['Энергия тез таусылады', 'Фокус шашыраңқы', 'Кейінге қалдырамын', 'Тәртіп жоқ', 'Ұдайы шаршаймын'],
  },
  analysis: {
    kicker: '02 / ЖЕКЕ ЖҰМЫС', name: 'Жеке талдау', image: 'assets/card-02.jpg',
    title: 'Қазір қай жерде тұрғаныңызды және әрі қарай не істеу керегін түсініңіз',
    lead: 'Жеке талдау — Абдрашитпен шамамен 2 сағаттық жеке жұмыс. Алдымен Браверман тестінен өтесіз, кейін нәтижесі мен қазіргі жағдайыңыз бірге талданады.',
    section: 'Талдаудан кейін сіз',
    items: ['Қазіргі жағдайыңызды жақсырақ түсінесіз', 'Негізгі проблемаларыңызды көресіз', 'Алға жылжуға не кедергі екенін анықтайсыз', 'Қай бағытта қозғалу керегін түсініп, келесі қадамдарға бағыт аласыз'],
    form: 'analysis',
    prices: [['Онлайн', '150 000 ₸'], ['Офлайн', '200 000 ₸']],
    chips: ['Бағытымды таппай жүрмін', 'Бір орында тұрып қалдым', 'Мотивация жоқ', 'Өзімді жақсырақ түсінгім келеді'],
  },
  attention: {
    kicker: '03 / ТЕСТ', name: 'Зейін тесті', image: 'assets/card-04.jpg',
    title: 'Зейініңіз бен фокусыңыздың қазіргі жағдайын анықтаңыз',
    lead: 'Қысқа тест арқылы зейін мен фокусқа байланысты өз жағдайыңызды бағалай аласыз.',
    section: 'Тесттен кейін',
    items: ['Шамамен 15 сұраққа жауап бересіз', 'Өз нәтижеңізді көресіз', 'Зейінге не әсер етуі мүмкін екенін жақсырақ түсінесіз', 'Нәтижеге байланысты қысқа видео-сабақтарға қол жеткізесіз'],
    cta: 'Тесттен өту', url: 'https://aqlquiz.kz/zeiyn',
  },
  braverman: {
    kicker: '04 / ТЕСТ', name: 'Браверман тесті', image: 'assets/card-05.jpg',
    title: 'Миыңыздың қалай жұмыс істейтінін жақсырақ түсініңіз',
    lead: 'Браверман тесті адамның жеке ерекшеліктерін және ми жұмысын түсінуге арналған.',
    section: 'Нәтижесінде сіз',
    items: ['Шамамен 200 сұраққа жауап беріп, нәтиже аласыз', 'Ерекшеліктеріңіз бен күшті жақтарыңызды түсінесіз', 'Назар аударуға болатын бағыттарды көресіз', 'Нәтижеден кейін видео-түсіндірме аласыз'],
    cta: 'Тесттен өту', url: 'https://braverman.kz',
  },
  magnesium: {
    kicker: '05 / ӨНІМ', name: 'Nurelum Magnesium', image: 'assets/card-06.jpg',
    title: 'Nurelum Magnesium 3X',
    lead: 'Бисглицинат, малат және цитрат формалары қамтылған.',
    section: 'Өнім сайтынан көріңіз',
    items: ['Құрамы мен қолдану тәсілі', 'Кімге арналғаны', 'Бағасы және сатып алу туралы ақпарат'],
    cta: 'Толық ақпарат', url: 'https://nurelum.vercel.app',
    video: 'YtI7M9tWXeQ', videoLabel: 'Магний туралы видео',
  },
  // Скрыт со страницы, открывается только прямой ссылкой: …/?p=program или …/#program
  program: {
    kicker: 'БАҒДАРЛАМА', name: 'Браверман бағдарламасы', image: 'assets/card-03.jpg', hidden: true,
    title: 'Браверман тест – оқуға арналған анкета',
    lead: 'Анкетаны толтырғаннан кейін сізбен біздің команда байланысып, оқу туралы толық ақпарат береді және бұл бағдарлама сізге сәйкес келе ме, соны анықтайды. Анкетаны толтыру шамамен 3 минут уақыт алады.',
    form: 'program',
  },
};

/* ---------- атрибуция и трекинг (как раньше + поле source) ---------- */
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
// Визит с UTM перезаписывает сохранённую атрибуцию; визит без UTM — сохраняет прежнюю.
// Считается один раз за загрузку страницы: дальнейшие #якоря не портят landing_url.
let _attr = null;
function inAppSource() {
  const ua = navigator.userAgent || '', ref = document.referrer || '';
  if (/musical_ly|TikTok|Bytedance|trill/i.test(ua) || /tiktok\.com/.test(ref)) return 'tiktok';
  if (/Instagram/i.test(ua) || /instagram\.com/.test(ref)) return 'instagram';
  if (/FBAN|FBAV|FB_IAB/i.test(ua) || /facebook\.com/.test(ref)) return 'facebook';
  if (/Telegram/i.test(ua) || /t\.me|telegram/.test(ref)) return 'telegram';
  if (/youtube\.com|youtu\.be/.test(ref)) return 'youtube';
  if (/WhatsApp/i.test(ua) || /whatsapp/.test(ref)) return 'whatsapp';
  return '';
}
function attribution() {
  if (_attr) return _attr;
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem('mk-attribution') || 'null'); } catch {}
  const p = new URLSearchParams(location.search);
  if (!saved || utmKeys.some(k => p.get(k))) {
    saved = {};
    utmKeys.forEach(k => { if (p.get(k)) saved[k] = p.get(k).slice(0, 200); });
    // Ссылка без меток: источник угадываем по встроенному браузеру приложения (TikTok, Instagram и т.д.)
    if (!saved.utm_source) { const app = inAppSource(); if (app) { saved.utm_source = app; saved.utm_medium = 'inapp_auto'; } }
    saved.landing_url = location.href;
    saved.referrer = document.referrer || '';
    try { localStorage.setItem('mk-attribution', JSON.stringify(saved)); } catch {}
  }
  return (_attr = saved);
}
attribution();
function visitorId() {
  try {
    let v = localStorage.getItem('mk-vid');
    if (!v) { v = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2); localStorage.setItem('mk-vid', v); }
    return v;
  } catch { return ''; }
}
// Fire-and-forget: text/plain — простой запрос без preflight, sendBeacon переживает уход со страницы.
function track(event, product = '', source = '') {
  pixel(event, product);
  if (!trackEndpoint) return;
  const a = attribution();
  const body = { event, product, source, visitor_id: visitorId(), page_url: location.href, landing_url: a.landing_url || '', referrer: a.referrer || '' };
  utmKeys.forEach(k => body[k] = a[k] || '');
  const data = JSON.stringify(body);
  try {
    if (!(navigator.sendBeacon && navigator.sendBeacon(trackEndpoint, new Blob([data], { type: 'text/plain;charset=utf-8' }))))
      fetch(trackEndpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: data, keepalive: true }).catch(() => {});
  } catch {}
}

/* ---------- TikTok Pixel (грузится только если задан CONFIG.tiktokPixelId) ---------- */
if (CONFIG.tiktokPixelId) {
  !function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent']; ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e }; ttq.load = function (e, n) { var r = 'https://analytics.tiktok.com/i18n/pixel/events.js'; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = r, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; n = d.createElement('script'); n.type = 'text/javascript', n.async = !0, n.src = r + '?sdkid=' + e + '&lib=' + t; e = d.getElementsByTagName('script')[0]; e.parentNode.insertBefore(n, e) }; ttq.load(CONFIG.tiktokPixelId); ttq.page(); }(window, document, 'ttq');
}
function pixel(event, product) {
  if (!window.ttq || !CONFIG.tiktokPixelId) return;
  const map = { card_open: 'ViewContent', form_start: 'ClickButton', lead: 'SubmitForm', whatsapp_click: 'Contact', cta_click: 'ClickButton' };
  if (map[event]) try { ttq.track(map[event], { content_id: product, content_name: products[product]?.name || product }); } catch {}
}

try { if (!sessionStorage.getItem('mk-visit')) { sessionStorage.setItem('mk-visit', '1'); track('visit'); } } catch { track('visit'); }

/* ---------- WhatsApp ---------- */
function waLink(text) { return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`; }
if (CONFIG.whatsapp) document.querySelectorAll('[data-wa]').forEach(a => {
  a.hidden = false;
  a.href = waLink('Сәлеметсіз бе! Сайттан жазып отырмын, толығырақ білгім келеді.');
});
document.addEventListener('click', e => {
  const a = e.target.closest('[data-wa]');
  if (a) track('whatsapp_click', a.dataset.product || '', a.dataset.source || '');
  const ig = e.target.closest('[data-ig]'); if (ig) track('instagram_click', '', ig.dataset.source || '');
  // Видео: по тапу подменяем превью на встроенный плеер YouTube (до тапа ничего не грузится)
  const v = e.target.closest('[data-video]');
  if (v && !v.querySelector('iframe')) {
    track('video_play', modal.dataset.product || '', v.dataset.video);
    if (window.__NO_EMBED) { window.open('https://youtu.be/' + v.dataset.video, '_blank', 'noopener'); return; }
    v.insertAdjacentHTML('beforeend', `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1&rel=0&playsinline=1" title="${v.getAttribute('aria-label')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`);
  }
});

/* ---------- модалка ---------- */
const modal = document.querySelector('#modal'), panel = document.querySelector('.modal-panel');
let previousFocus = null, pushedState = false, currentSource = '';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function linkWithUtm(url) { const target = new URL(url); const data = attribution(); for (const key of utmKeys) if (data[key]) target.searchParams.set(key, data[key]); return target.href; }

function render(id, presetRequest) {
  const d = products[id];
  modal.querySelector('.modal-match')?.remove();
  const img = document.querySelector('#modal-image'); img.src = d.image; img.alt = d.name;
  document.querySelector('#modal-kicker').textContent = d.kicker;
  document.querySelector('#modal-title').textContent = d.title;
  document.querySelector('#modal-lead').textContent = d.lead;
  let body = '';
  if (d.video) body += `<button type="button" class="modal-video" data-video="${d.video}" aria-label="${d.videoLabel || 'Видео'}"><img src="https://i.ytimg.com/vi/${d.video}/hqdefault.jpg" alt="" onerror="this.onerror=null;this.src='${d.image}'"><span class="play">▶</span><span class="vlabel">${d.videoLabel || 'Видео'}</span></button>`;
  if (d.prices) body += `<div class="modal-prices">${d.prices.map(([f, p]) => `<div><span>${f}</span><b>${p}</b></div>`).join('')}</div>`;
  if (d.section) body += `<div class="modal-section-title">${d.section}</div><ul>${d.items.map(x => `<li>${x}</li>`).join('')}</ul>`;
  if (d.extra) body += `<p class="modal-extra">${d.extra}</p>`;
  document.querySelector('#modal-content').innerHTML = body;
  const action = document.querySelector('#modal-action');
  action.innerHTML = d.form ? formMarkup(id, presetRequest) : `<a class="cta" href="${linkWithUtm(d.url)}" target="_blank" rel="noopener">${d.cta} <span>→</span></a>`;
  // На странице с формой — короткая кнопка-якорь сверху, чтобы форма не терялась под текстом
  const jump = document.querySelector('.modal-jump'); if (jump) jump.remove();
  if (d.form && d.section) document.querySelector('#modal-lead').insertAdjacentHTML('afterend', `<button type="button" class="modal-jump">${d.form === 'energy' ? 'Бірінші сабақ — тегін ↓' : 'Жазылу ↓'}</button>`);
  if (d.form) {
    const f = action.querySelector('form');
    restoreDraft(f);
    if (presetRequest && !(d.chips || []).includes(presetRequest)) presetText(f, presetRequest);
  }
}

function openModal(id, { source = '', request = '', push = true, picked = '' } = {}) {
  if (!products[id]) return;
  previousFocus = document.activeElement;
  currentSource = source;
  render(id, request);
  // После выбора проблемы — сначала ответ «вам подходит вот это», потом описание и форма
  modal.querySelector('.modal-match')?.remove();
  const MATCH = { energy: '<b>Энергия курсы</b> сай келеді. Бірінші сабағы — тегін.', analysis: '<b>Жеке талдау</b> сай келеді — Абдрашитпен жеке жұмыс.' };
  if (picked && MATCH[id]) document.querySelector('#modal-kicker').insertAdjacentHTML('beforebegin', `<div class="modal-match"><small>Сіз таңдадыңыз: «${esc(picked)}»</small><span>Сізге ${MATCH[id]}</span></div>`);
  modal.dataset.product = id;
  track('card_open', id, source);
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  panel.scrollTop = 0;
  // Кнопка «назад» в TikTok-браузере закрывает карточку, а не уводит с сайта
  if (push) { history.pushState({ mk: id }, '', '#' + id); pushedState = true; }
  setTimeout(() => panel.querySelector('.close').focus({ preventScroll: true }), 0);
}
function hideModal() {
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
  if (previousFocus && previousFocus.focus) previousFocus.focus({ preventScroll: true });
}
function closeModal() {
  if (!modal.classList.contains('open')) return;
  if (pushedState) { pushedState = false; history.back(); } // popstate спрячет модалку
  else { hideModal(); history.replaceState(null, '', location.pathname + location.search); }
}
window.addEventListener('popstate', () => { pushedState = false; if (modal.classList.contains('open')) hideModal(); });
modal.querySelectorAll('[data-close]').forEach(x => x.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
modal.addEventListener('click', e => {
  if (e.target.closest('a.cta')) track('cta_click', modal.dataset.product || '', e.target.closest('[data-lesson]') ? 'free_lesson' : currentSource);
  if (e.target.closest('[data-lesson]')) track('video_play', 'energy', 'youtube_link');
  if (e.target.closest('.modal-jump')) { const f = modal.querySelector('form'); f && f.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(() => f && f.querySelector('input')?.focus({ preventScroll: true }), 450); }
});

document.querySelectorAll('[data-product]').forEach(card => card.addEventListener('click', () => openModal(card.dataset.product, { source: card.dataset.source || 'card' })));
document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => {
  if (btn.classList.contains('pick')) track('quiz_pick', btn.dataset.open, btn.dataset.request || '');
  const isPick = btn.classList.contains('pick');
  openModal(btn.dataset.open, { source: btn.dataset.source || (isPick ? 'hero_pick' : 'button'), request: btn.dataset.request || '', picked: isPick ? btn.querySelector('b').textContent : '' });
}));
document.querySelectorAll('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
  track('quiz_pick', 'tests', 'scroll');
  document.getElementById(btn.dataset.scroll).scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

/* ---------- липкая кнопка ---------- */
const sticky = document.querySelector('#sticky'), picker = document.querySelector('.picker');
if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => {
  const show = !en.isIntersecting && en.boundingClientRect.top < 0;
  sticky.classList.toggle('show', show); sticky.setAttribute('aria-hidden', String(!show));
}).observe(picker);

/* ---------- формы ---------- */
const READINESS = ['Дайынмын', 'Толығырақ білгім келеді', 'Қазір маған қажет емес'];
function field(name, label, placeholder = '', type = 'text', extra = '', optional = false) {
  return `<div class="field"><label for="f-${name}">${label}${optional ? ' <span class="opt">(міндетті емес)</span>' : ' *'}</label><input id="f-${name}" name="${name}" type="${type}" placeholder="${placeholder}" ${optional ? '' : 'required'} ${extra}></div>`;
}
const nameField = (label = 'Атыңыз') => field('name', label, 'Мысалы, Айгерім', 'text', 'autocomplete="name" enterkeyhint="next"');
const phoneField = (label = 'Телефон (WhatsApp)') => field('phone', label, '+7 (7__) ___-__-__', 'tel', 'inputmode="tel" autocomplete="tel" enterkeyhint="next" data-phone');
const ageField = (optional = false) => field('age', 'Жасыңыз', 'Мысалы, 27', 'text', 'inputmode="numeric" pattern="[0-9]{2}" maxlength="2" data-age', optional);
function chipsField(chips, preset, optional = false) {
  return `<fieldset class="chips" data-request ${optional ? '' : 'data-required'}><legend>Сізді не мазалайды?${optional ? ' <span class="opt">(міндетті емес)</span>' : ' *'}</legend><div class="chip-row">${chips.map(c => `<label class="chip"><input type="checkbox" value="${esc(c)}" ${c === preset ? 'checked' : ''}><span>${c}</span></label>`).join('')}</div>
  <textarea name="request_text" rows="2" placeholder="Қаласаңыз, өз сөзіңізбен жазыңыз"></textarea></fieldset>`;
}
const readinessField = (optional = false) => `<fieldset class="chips"><legend>Қазір оқуға қаншалықты қызығушылық танытып отырсыз?${optional ? ' <span class="opt">(міндетті емес)</span>' : ' *'}</legend><div class="chip-row">${READINESS.map((r, i) => `<label class="chip"><input type="radio" name="readiness" value="${r}" ${i === 0 && !optional ? 'required' : ''}><span>${r}</span></label>`).join('')}</div></fieldset>`;
const submitRow = label => `<button class="cta" type="submit">${label} <span>→</span></button><p class="form-status" aria-live="polite"></p><p class="privacy">Нөміріңіз тек сізбен байланысу үшін қолданылады.</p></form>`;

function formMarkup(id, preset) {
  const d = products[id];
  // Если пресет не из списка чипсов (пришёл с кнопки «помогите выбрать») — кладём его в текстовое поле
  const chipPreset = d.chips && d.chips.includes(preset) ? preset : '';
  const head = d.form === 'energy'
    ? `<div class="form-head"><b>Бірінші сабақты тегін алыңыз</b><span>Тек атыңыз бен нөміріңіз — 30 секунд</span></div>`
    : `<div class="form-head"><b>Жеке талдауға жазылу</b><span>Команда өзі хабарласып, уақытты келіседі</span></div>`;
  const more = inner => `<details class="more"><summary>Өзіңіз туралы толығырақ <span class="opt">&nbsp;(міндетті емес)</span></summary><div class="more-body">${inner}</div></details>`;
  if (d.form === 'analysis') return `${head}<form class="form-grid" data-form="analysis" data-product="${id}" novalidate>${nameField()}${phoneField()}<fieldset class="chips"><legend>Қай формат ыңғайлы? *</legend><div class="chip-row">${d.prices.map(([f, p], i) => `<label class="chip"><input type="radio" name="format" value="${f}" ${i === 0 ? 'required' : ''}><span>${f} · ${p}</span></label>`).join('')}</div></fieldset>${chipsField(d.chips, chipPreset)}${more(ageField(true))}${submitRow('Жеке талдауға жазылу')}`;
  if (d.form === 'energy') return `${head}<form class="form-grid" data-form="energy" data-product="${id}" novalidate>${nameField()}${phoneField()}${chipsField(d.chips, chipPreset, true)}${more(ageField(true) + readinessField(true))}${submitRow('Бірінші сабақты тегін алу')}`;
  return `<form class="form-grid" data-form="program" data-product="${id}" novalidate>${nameField('Аты-жөніңіз кім?')}${phoneField('Телефон номеріңіз (Ватсап)')}${field('instagram', 'Instagram парақшаңыз', '@username', 'text', 'autocapitalize="off"')}${field('occupation', 'Қазір немен айналысасыз?', '')}<fieldset class="chips"><legend>Табысыңыз қанша? *</legend><div class="chip-row">${['100.000 ₸ дейін', '150.000–300.000 ₸', '300.000–700.000 ₸', '700.000 ₸ жоғары'].map((v, i) => `<label class="chip"><input type="radio" name="income" value="${v}" ${i === 0 ? 'required' : ''}><span>${v}</span></label>`).join('')}</div></fieldset><div class="field"><label for="f-request">Қандай запросыңыз бар? *</label><textarea id="f-request" name="request" required placeholder="Сұранысыңызды жазыңыз"></textarea></div>${readinessField()}${submitRow('Оқуға өтінім қалдыру')}`;
}
function presetText(form, text) { const t = form.querySelector('[name=request_text]'); if (t && text) t.value = text; }

// Маска телефона: +7 (7XX) XXX-XX-XX; «8…» превращается в «+7…»; иностранный номер с «+» — без маски
function formatPhone(raw) {
  let s = raw.trim();
  if (s.startsWith('+') && !s.startsWith('+7')) return '+' + s.slice(1).replace(/[^\d\s()-]/g, '');
  let d = s.replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (d && !d.startsWith('7')) d = '7' + d;
  // поле уже начинается с «+7 (», а человек по привычке набирает 8… или 7… в начале
  if (d.startsWith('78')) d = '7' + d.slice(2);
  if (d.length > 11 && d.startsWith('77')) d = '7' + d.slice(2);
  d = d.slice(0, 11);
  const r = d.slice(1); let out = '+7';
  if (r.length) out += ' (' + r.slice(0, 3);
  if (r.length >= 3) out += ')';
  if (r.length > 3) out += ' ' + r.slice(3, 6);
  if (r.length > 6) out += '-' + r.slice(6, 8);
  if (r.length > 8) out += '-' + r.slice(8, 10);
  return out;
}
function phoneValid(v) { const d = v.replace(/\D/g, ''); return v.trim().startsWith('+') && !v.trim().startsWith('+7') ? d.length >= 10 && d.length <= 15 : d.length === 11; }

modal.addEventListener('focusin', e => {
  const input = e.target.closest('[data-phone]'); if (input && !input.value) input.value = '+7 (';
  const form = e.target.closest('form[data-form]');
  if (form && !form.dataset.started) { form.dataset.started = '1'; track('form_start', form.dataset.product, currentSource); }
});
modal.addEventListener('input', e => {
  const t = e.target;
  if (t.matches('[data-phone]')) { const end = t.selectionStart === t.value.length; t.value = formatPhone(t.value); if (end) t.setSelectionRange(t.value.length, t.value.length); }
  if (t.matches('[data-age]')) t.value = t.value.replace(/\D/g, '').slice(0, 2);
  const form = t.closest('form'); if (form) { saveDraft(form); clearError(t); }
});

// Черновик имени/телефона: если человек закрыл и вернулся — не вводит заново
function saveDraft(form) { try { const n = form.querySelector('[name=name]')?.value || '', p = form.querySelector('[name=phone]')?.value || ''; localStorage.setItem('mk-draft', JSON.stringify({ name: n, phone: p })); } catch {} }
function restoreDraft(form) {
  try { const d = JSON.parse(localStorage.getItem('mk-draft') || 'null'); if (!d) return; if (d.name) form.querySelector('[name=name]').value = d.name; if (d.phone && d.phone.length > 4) form.querySelector('[name=phone]').value = d.phone; } catch {}
}

function setError(el, msg) {
  const box = el.closest('.field, fieldset'); box.classList.add('invalid');
  let m = box.querySelector('.err'); if (!m) { m = document.createElement('div'); m.className = 'err'; box.appendChild(m); }
  m.textContent = msg;
}
function clearError(el) { const box = el.closest('.field, fieldset'); if (box && box.classList.contains('invalid')) { box.classList.remove('invalid'); box.querySelector('.err')?.remove(); } }
function validate(form) {
  form.querySelectorAll('.invalid').forEach(b => { b.classList.remove('invalid'); b.querySelector('.err')?.remove(); });
  const errs = [];
  const need = (sel, msg, ok) => { const el = form.querySelector(sel); if (el && !ok(el)) { setError(el, msg); errs.push(el); } };
  need('[name=name]', 'Атыңызды жазыңыз', el => el.value.trim().length >= 2);
  need('[name=phone]', 'Нөмірді толық жазыңыз: +7 (7XX) XXX-XX-XX', el => phoneValid(el.value));
  need('[name=age]', 'Жасыңызды жазыңыз', el => (!el.required && !el.value) || (+el.value >= 12 && +el.value <= 99));
  need('[name=instagram]', 'Instagram парақшаңызды жазыңыз', el => el.value.trim().length >= 2);
  need('[name=occupation]', 'Немен айналысатыныңызды жазыңыз', el => el.value.trim().length >= 2);
  need('textarea[name=request]', 'Запросыңызды жазыңыз', el => el.value.trim().length >= 2);
  const req = form.querySelector('[data-request]');
  if (req && req.hasAttribute('data-required') && !req.querySelector('input:checked') && !req.querySelector('textarea').value.trim()) { setError(req, 'Кем дегенде бір нұсқаны таңдаңыз немесе жазыңыз'); errs.push(req); }
  ['readiness', 'income', 'format'].forEach(n => { const el = form.querySelector(`[name=${n}][required]`); if (el && !form.querySelector(`[name=${n}]:checked`)) { setError(el, 'Бір нұсқаны таңдаңыз'); errs.push(el); } });
  if (errs.length) { errs[0].closest('.field, fieldset').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  return !errs.length;
}

modal.addEventListener('submit', async e => {
  const form = e.target.closest('form[data-form]'); if (!form) return;
  e.preventDefault();
  if (!validate(form)) { track('form_invalid', form.dataset.product, currentSource); return; }
  const type = form.dataset.form, product = form.dataset.product, button = form.querySelector('button[type=submit]'), status = form.querySelector('.form-status'), label = button.innerHTML;
  button.disabled = true; button.textContent = 'Жіберіліп жатыр…'; status.textContent = '';
  const a = attribution(), payload = { timestamp: new Date().toISOString(), form: type };
  const fd = new FormData(form);
  fd.forEach((v, k) => { if (k !== 'request_text') payload[k] = String(v).trim(); });
  const req = form.querySelector('[data-request]');
  if (req) { // чипсы + свободный текст → одна колонка «Запросыңыз», как и раньше
    const picked = [...req.querySelectorAll('input:checked')].map(i => i.value);
    const text = req.querySelector('textarea').value.trim();
    payload.request = [payload.format ? 'Формат: ' + payload.format : '', picked.join(', '), text].filter(Boolean).join('. ');
  }
  utmKeys.forEach(k => payload[k] = a[k] || '');
  payload.landing_url = a.landing_url || location.href;
  payload.referrer = a.referrer || '';
  try {
    const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 25000);
    let res; try { res = await fetch(endpoints[type], { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), signal: ctl.signal }); } finally { clearTimeout(timer); }
    const result = await res.json();
    if (!result.ok) throw new Error(result.error || 'script error');
    track('lead', product, currentSource);
    try { localStorage.removeItem('mk-draft'); } catch {}
    const first = esc((payload.name || '').split(' ')[0]);
    const wa = CONFIG.whatsapp ? `<a class="cta wa" data-wa data-source="success" data-product="${product}" href="${waLink(`Сәлеметсіз бе! Мен сайттан «${products[product].name}» бойынша өтінім қалдырдым. Атым: ${payload.name}`)}" target="_blank" rel="noopener">WhatsApp-қа қазір жазу <span>→</span></a><p class="privacy">Жылдамырақ жауап алу үшін</p>` : '';
    // Урок сразу на странице: превью-картинка, по тапу встроенный плеер YouTube; ссылка — запасной вариант
    const ytId = (CONFIG.energyLessonUrl.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];
    const lesson = product === 'energy' && CONFIG.energyLessonUrl
      ? (ytId ? `<button type="button" class="modal-video lesson-video" data-video="${ytId}" aria-label="Бірінші сабақ"><img src="https://i.ytimg.com/vi/${ytId}/hqdefault.jpg" alt="" onerror="this.onerror=null;this.src='assets/card-01.jpg'"><span class="play">▶</span><span class="vlabel">Энергия курсы · 1-сабақ</span></button>` : '')
        + `<a class="next-link lesson-link" data-lesson href="${CONFIG.energyLessonUrl}" target="_blank" rel="noopener">YouTube-та ашу →</a>`
      : '';
    const next = product !== 'attention' ? `<button type="button" class="next-link" data-next="attention">Күте тұрып — Зейін тестінен өтіңіз →</button>` : '';
    form.outerHTML = `<div class="success-box"><strong>Өтініміңіз қабылданды!</strong><br>Рақмет${first ? ', ' + first : ''}. ${product === 'energy' ? (CONFIG.energyLessonUrl ? 'Бірінші сабақ төменде — қазір көре аласыз.' : 'Команда жақын уақытта бірінші сабақты жібереді.') : 'Команда жақын уақытта сізбен байланысады.'}</div>${lesson}${wa}${next}`;
    modal.querySelector('.form-head')?.remove();
    modal.querySelector('.modal-jump')?.remove();
    modal.querySelector('.success-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (err) {
    track('lead_error', product, String(err).slice(0, 80));
    button.disabled = false; button.innerHTML = label;
    status.textContent = 'Жіберу кезінде қате болды. Интернет байланысын тексеріп, қайта көріңіз.';
  }
});
modal.addEventListener('click', e => { const n = e.target.closest('[data-next]'); if (n) { history.replaceState({ mk: n.dataset.next }, '', '#' + n.dataset.next); render(n.dataset.next); modal.dataset.product = n.dataset.next; currentSource = 'after_lead'; track('card_open', n.dataset.next, 'after_lead'); panel.scrollTop = 0; } });

// Прямые ссылки: …/?p=energy или …/#energy сразу открывают нужную карточку (для разных видео/реклам)
(() => {
  const id = new URLSearchParams(location.search).get('p') || location.hash.slice(1);
  if (!products[id]) return;
  history.replaceState(null, '', location.pathname + location.search);
  openModal(id, { source: 'deeplink' });
})();
