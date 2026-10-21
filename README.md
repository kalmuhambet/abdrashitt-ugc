# Что поменялось и как запустить

## Перед деплоем (5 минут)
1. **app.js, блок CONFIG** — впишите номер WhatsApp команды (`whatsapp: '77011234567'`). Пока пусто — кнопки WhatsApp скрыты.
2. **app.js, `energyLessonUrl`** — уже вписан (https://youtu.be/I4kjhDvsA-A). После заявки урок показывается прямо на странице.
3. **Если запускаете рекламу в TikTok** — впишите `tiktokPixelId`. Сайт сам отправит события ViewContent / SubmitForm / Contact.
4. **apps-script/clicks.gs** — скопируйте новую версию в Apps Script → Deploy → Manage deployments → ✏️ → New version → Deploy (URL тот же). Без этого новые события (form_start, lead и т.д.) скрипт будет отклонять.
5. Попросите носителя языка вычитать новые тексты на казахском (первый экран, кнопки, чипсы в форме).

Таблицы заявок (energy / zheke-taldau / braverman-bagdarlamasy) трогать не нужно — поля формы те же.

## Ссылки
- Для каждого фан-аккаунта своя ссылка: `https://master-class-qr.vercel.app/?utm_source=tiktok&utm_content=<аккаунт>`
- Сразу открыть нужную карточку: `?p=energy`, `?p=analysis`, `?p=attention`, `?p=braverman`, `?p=magnesium`
- Анкета Браверман-программы (скрыта со страницы): `?p=program`
- Можно комбинировать: `?p=energy&utm_source=tiktok&utm_content=fan01`

## События в таблице «Клики»
visit → quiz_pick → card_open → form_start → form_invalid / lead / lead_error, плюс cta_click (ушёл на тест/сайт) и whatsapp_click.
Колонка `source` показывает, откуда открыли карточку: hero_pick, card, sticky, steps, deeplink, after_lead.

## Короткие ссылки с метками (файл vercel.json)
- TikTok, ссылка в профиле: `https://master-class-qr.vercel.app/t/abinsite` → utm_source=tiktok, utm_medium=bio, utm_content=abinsite
- TikTok + сразу нужная карточка: `/t/abinsite/magnesium` (energy, analysis, attention, braverman, magnesium)
- Конкретное видео: `/v/abinsite/dofamin` → utm_medium=video, utm_term=dofamin
- Instagram: `/ig/abdrashitt`
- YouTube, описание видео: `/yt/<название-видео>` или `/yt/<название-видео>/energy`
- Если человек пришёл по ссылке вообще без меток, сайт сам определяет источник по встроенному браузеру (TikTok, Instagram, Facebook, Telegram, WhatsApp) и пишет utm_medium=inapp_auto.
