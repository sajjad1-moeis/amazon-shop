# چک‌لیست رگرسیون پنل ادمین

بعد از هر فاز (یا هر PR بزرگ ادمین)، با کاربر ادمین وارد شوید و حداقل این مسیرها را باز کنید. انتظار: **بارگذاری بدون خطای JS**، داده یا empty state معقول، منو درست.

علامت بزنید `[x]` پس از تست.

## هسته

- [ ] `/admin` — داشبورد (KPI از `admin/analytics/dashboard-kpi`، نمودارها، هشدارها، بلوک سلامت از `system-health` در صورت موفقیت API)
- [ ] `/admin` — دکمه «بروزرسانی»: نمودارها، هشدارها و بلوک فاز ۵ بدون خطا تازه شوند
- [ ] `/admin?range=7d` — داشبورد با بازه ۷ روز
- [ ] `/admin?range=custom&from=2026-01-01&to=2026-01-31` — بازه دلخواه
- [ ] `/admin/users` — کاربران
- [ ] `/admin/orders` — سفارشات (همه)
- [ ] `/admin/orders?status=1` — در انتظار پرداخت
- [ ] `/admin/orders?status=2` — پرداخت شده
- [ ] `/admin/orders?status=3` — در حال پردازش
- [ ] `/admin/orders?status=4` — ارسال شده
- [ ] `/admin/orders?status=5` — تکمیل شده
- [ ] `/admin/orders?status=6` — لغو شده
- [ ] `/admin/orders/pending` — ریدایرکت به `?status=1`
- [ ] `/admin/orders/processing` — ریدایرکت به `?status=3`
- [ ] `/admin/orders/shipped` — ریدایرکت به `?status=4`
- [ ] `/admin/orders/delivered` — ریدایرکت به `?status=5`
- [ ] `/admin/orders/cancelled` — ریدایرکت به `?status=6`
- [ ] `/admin/tickets` — تیکت‌ها

## محصول و انبار

- [ ] `/admin/products/list`
- [ ] `/admin/products/create`
- [ ] `/admin/products/categories`
- [ ] `/admin/products/brands`
- [ ] `/admin/inventory`

## کاتالوگ — ترجمه، QA، واژه‌نامه

- [ ] `/admin/catalog/translation` — صف ترجمه؛ پیشنهاد واژه‌نامه؛ دکمه «اعمال پیشنهاد» یک‌کلیک در صورت وجود پیشنهاد
- [ ] `/admin/catalog/brand-glossary` — CRUD اصطلاحات برند
- [ ] `/admin/catalog/qa` — صف QA

## مالی و تخفیف

- [ ] `/admin/payments`
- [ ] `/admin/discounts/list`
- [ ] `/admin/currency-rates`
- [ ] `/admin/currency-services` — میانبر فاز ۵ از داشبورد

## محتوا و ارتباط

- [ ] `/admin/blog/list`
- [ ] `/admin/contact-us`
- [ ] `/admin/content/banners` — لیست، ایجاد بنر (آپلود)، ویرایش متادیتا و تعویض اختیاری تصویر (`POST Banner/UploadImage?id=`)

## امنیت و عملیات

- [ ] `/admin/roles`
- [ ] `/admin/security/admins`
- [ ] `/admin/security/permissions`
- [ ] `/admin/security/logs`
- [ ] `/admin/security/audit`
- [ ] `/admin/security/operational-logs`
- [ ] `/admin/security/operational-logs?category=webhook.inbound` — فیلتر از query

## یکپارچه‌سازی و سئو (فاز عملیات ادمین)

- [ ] `/admin/integration` — ذخیره تنظیمات؛ نمایش URL وب‌هوک ورودی؛ لینک به لاگ callback
- [ ] `/admin/seo` — ویرایش سئوی دسته/برند (طبق API)
- [ ] `/admin/pricing` — هاب قیمت‌گذاری

## مدیریت جستجو (فاز ۶)

- [ ] `/admin/search` — هاب
- [ ] `/admin/search/reports` — کم‌کلیک / بدون خرید
- [ ] `/admin/search/synonyms`
- [ ] `/admin/search/redirects`
- [ ] `/admin/search/category-landings`
- [ ] `/admin/search/blacklist`
- [ ] `/admin/search/whitelist`

## گزارش‌ها

- [ ] `/admin/reports`
- [ ] `/admin/reports/sales`

## Job و سورس‌ها

- [ ] `/admin/sources` — سورس‌های داده؛ فیلد LastSyncAt پس از job قیمت یا `update-prices`
- [ ] `/admin/jobs` — overview، retry روی failed، **لغو** روی enqueued و processing
- [ ] `/admin/scraper-proxy`

## سایر

- [ ] `/admin/shipping/methods`
- [ ] `/admin/reviews`
- [ ] `/admin/notifications`
- [ ] `/admin/settings/general`

---

**یادداشت:** وب‌هوک ورودی: `POST {API}/webhooks/integration/inbound` با هدر `X-Webhook-Secret` برابر راز ذخیره‌شده در تنظیمات یکپارچه‌سازی.  
**سئوی عمومی:** `Product/GetById` فیلدهای `seoTitle`، `metaDescription`، `isNoIndex` را از سئوی دسته/برند پر می‌کند.
