# Django School Framework — лендінг

Маркетинговий сайт українською для [Django School Framework](https://github.com/shadowlockck/framewrok-for-school). Це окремий застосунок, а не код самого фреймворку. Вміст сторінки редагується в Payload CMS; публічний сайт — Vite і звичайний JavaScript.

**Публічні адреси:** [лендінг](http://4.165.133.94/landing/) · [документація Django](http://4.165.133.94/). Зараз сайт розміщено на Azure VPS; база CMS — Neon PostgreSQL. HTTPS і публічний доступ до CMS Admin ще не налаштовані. Для редагування використовуйте SSH-тунель із [посібника з розгортання](deploy/README.md).

## Структура

- `cms/` — Payload 3, Next.js, PostgreSQL (Neon у production), адмінка `/admin`, публічні DTO endpoints.
- `frontend/` — Vite, vanilla JS, адаптивний лендінг.

## Локальний запуск

Потрібні Node.js 20.19+ і PostgreSQL 14+ або окрема dev-гілка Neon. **Не використовуйте production БД для локальної розробки.**

```sh
cd cms
cp .env.example .env
# заповніть DATABASE_URL, PAYLOAD_SECRET, SERVER_URL, FRONTEND_ORIGIN
npm ci
npm run migrate
npm run dev
```

У другому терміналі:

```sh
cd frontend
cp .env.example .env
npm ci
npm run dev
```

CMS: `http://localhost:3000/admin`; сайт: `http://127.0.0.1:5173`. Якщо Vite зайняв інший порт, додайте фактичну адресу з його виводу до `FRONTEND_ORIGIN` у `cms/.env` і перезапустіть CMS. При першому запуску створіть редактора через приватний екран Payload у `/admin`. Публічної реєстрації редакторів немає. Після запуску CMS виконайте `cd cms && npm run seed`, щоб створити головну сторінку та глобальні елементи. Повторний запуск не перезаписує вже створений вміст. Зміна тексту або порядку блоків у `/admin` з’явиться на сайті після оновлення (API має кеш до 60 секунд).

`PAYLOAD_SECRET` має бути довгим випадковим рядком. `DATABASE_URL` — сумісний PostgreSQL connection string; для Neon використовуйте SSL-параметри з панелі Neon. У `frontend/.env` дозволений лише публічний `VITE_CMS_URL`; жодних секретів у `VITE_*`.

## Перевірка й міграції

```sh
cd cms && npm run check && npm run build
cd frontend && npm run build
```

Початкова міграція вже закомічена в `cms/src/migrations/`. Автоматичне оновлення схеми у dev вимкнено: перед запуском CMS застосуйте міграції через `npm run migrate`. Після змін схеми створіть міграцію командою `cd cms && npm run migrate:create -- назва`, перевірте та закомітьте файл у `src/migrations/`. До production деплою застосуйте всі закомічені міграції: `cd cms && npm run migrate`. Для застосування міграцій потрібна доступна БД. Детальніше — у [документації Payload](https://payloadcms.com/docs/database/migrations).

## Публічний API

`GET /api/common` повертає лише публічні поля глобальних елементів:

```json
{"header":{"brand":"Django School Framework","tagline":"Основа для сайту школи","navigation":[{"label":"Можливості","url":"/#mozhlyvosti"}],"button":{"label":"Почати роботу","url":"https://pypi.org/project/django-school-framework/"}},"footer":{"description":"Відкритий Django-фреймворк","links":[],"socialLinks":[],"contactEmail":""},"site":{"name":"Django School Framework","title":"Django School Framework — основа для сайту школи","description":"Опис","language":"uk"}}
```

`GET /api/page?path=/` повертає `{ "meta": { "title": "…", "description": "…", "path": "/" }, "blocks": [{ "type": "hero", "title": "…", "subtitle": "…", "actions": [] }] }`. Підтримуються `hero`, `features`, `steps`, `faq`, `cta`. Некоректний шлях → 400; відсутня або чернеткова сторінка → 404. У відповіді немає Payload IDs, стану чернетки чи редакторських полів. `path` містить лише латинські малі літери, цифри, дефіси та одинарні слеші. CORS дозволяє лише адреси з `FRONTEND_ORIGIN` (кілька адрес через кому), без wildcard.

На фронтенді адреси посилань перевіряються; URL із CMS не вставляються як HTML. Початкові SEO-теги для головної сторінки є в `frontend/index.html`; для повноцінного індексування додаткових CMS-сторінок потрібен окремий prerender або SSR.

## Поточне розгортання: Azure VPS + Neon

Фронтенд збирається для шляху `/landing/`, а Nginx віддає статику поряд із документацією на `/`. Payload працює на `127.0.0.1:3000`; публічно проксуються лише API `/api/common` і `/api/page`. Команди збірки, шляхи на сервері та SSH-тунель наведені в [deploy/README.md](deploy/README.md). Змінні з `cms/.env` зберігаються лише на сервері, поза Git.

## Альтернативне розгортання: Vercel + Neon

1. Створіть **два Vercel-проєкти** з цього Git-репозиторію. Для CMS Root Directory `cms`, Framework Preset Next.js. Для сайту Root Directory `frontend`, Framework Preset Vite, Output Directory `dist`.
2. Створіть Neon PostgreSQL і окрему гілку для dev. У CMS Production Environment Variables додайте `DATABASE_URL`, `PAYLOAD_SECRET`, `SERVER_URL` (публічний HTTPS-домен CMS), `FRONTEND_ORIGIN` (точний HTTPS-домен сайту). Для frontend — `VITE_CMS_URL` (той самий CMS-домен). Для preview використовуйте окремі точні origins або preview-конфігурацію.
3. Застосуйте закомічену початкову міграцію до production Neon через `npm run migrate` з production `DATABASE_URL` у захищеному середовищі **перед** production-збіркою. Для міграцій перевірте в Neon, чи потрібне пряме з’єднання замість pooled URL. Далі один раз виконайте `npm run seed` із доступом до production БД і створіть редактора приватно в `/admin`.
4. Перевірте `/admin`, `/api/common`, `/api/page?path=/`, CORS, головну та внутрішній маршрут. `frontend/vercel.json` спрямовує вкладені маршрути до `index.html`.

Редакторських завантажень файлів у v1 немає. Якщо додасте Payload Media на Vercel, налаштуйте постійне сховище (S3/Vercel Blob), бо локальні файли там непостійні. При перенесенні змініть адреси документації та лендінгу в CMS і фронтенді.
