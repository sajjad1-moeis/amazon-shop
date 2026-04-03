# راهنمای توسعهٔ پنل ادمین (فاز ۱)

سند مرجع برای فازهای بعدی نقشه راه. **قراردادها را قبل از افزودن API یا صفحهٔ جدید بخوانید.**

---

## ۱. کلاینت API و احراز هویت

| مورد | مسیر / توضیح |
|------|----------------|
| کلاینت پایه | `src/services/api/client.js` — `ky` با `prefixUrl: NEXT_PUBLIC_API_URL` |
| درخواست با توکن | `getAuthenticatedClient()` — هدر `Authorization: Bearer <token>`؛ بدون توکن `throw` |
| کلاینت عمومی | `getPublicClient()` — بدون Bearer |
| اسکرپر پایتون | `getScraperClient()` — جدا از API اصلی؛ فقط جایی که الان استفاده شده |

**رفتار خطای توکن:** در `401`/`403` (روی کلاینت احراز‌شده) یا پیام حاوی token/expired در بدنه، `removeToken`، رویداد `auth:sessionExpired`، ریدایرکت به `/`. توجه: برخی `403`ها ممکن است مربوط به **محدودیت نقش** باشند؛ در آن صورت همین هندلر فعلی ممکن است کاربر را خارج کند — در صورت نیاز بعداً روی بک‌اند/فرانت تفکیک شود.

---

## ۲. قرارداد پاسخ API (بک‌اند اصلی)

الگوی استاندارد (مرحله ۳ پروژه):

```json
{
  "statusCode": 200,
  "success": true,
  "message": "",
  "data": { }
}
```

- در خطا: `success: false`، `message` توضیح قابل نمایش به ادمین.
- در موفقیت: payload در `data` (یا در برخی مسیرهای قدیمی ممکن است کل بدنه متفاوت باشد — همیشه با `unwrapApiData` یکسان‌سازی کنید).

### `unwrapApiData(body)`

- مسیر: `src/services/api/client.js`
- اگر `body.success === false` → `throw new Error(body.message)` (و در صورت تشخیص انقضای توکن، همان جریان خروج).
- در غیر این صورت → اگر ویژگی `data` در بدنه وجود داشته باشد همان برگردانده می‌شود، وگرنه **کل `body`** (برای پاسخ‌های قدیمی بدون فیلد `data`).

**الگوی فراخوانی در سرویس:**

```js
const res = await getAuthenticatedClient().get("admin/analytics/summary").json();
const data = unwrapApiData(res);
```

---

## ۳. دو الگوی مسیر API

### الف) مستقیم به بک‌اند (اکثر سرویس‌های ادمین)

- `prefixUrl` = `NEXT_PUBLIC_API_URL` (مثلاً `https://micrls.com/api`).
- رشتهٔ مسیر **نسبی** بدون `/` اول: `"admin/analytics/summary"`، `"Security/GetPermissions"`.
- سرویس‌ها در `src/services/admin/`، `src/services/security/` و غیره.

### ب) پراکسی Next.js (BFF) — نمونه موجود

- مسیر اپ: `src/app/api/admin/scraper-proxy/...`
- برای سرویس‌هایی که نباید توکن یا URL پایتون در مرورگر لو برود یا CORS دارد.
- فرانت با `fetch("/api/admin/scraper-proxy/...")` یا helper اختصاصی صدا می‌زند.

**قانون فازها:** اندپوینت **جدید ادمین** را در بک‌اند با پیشوند واضح `admin/` (یا قرارداد تیم بک‌اند) تعریف کنید؛ فقط در صورت نیاز فنی، Route Handler در `app/api/admin/` اضافه شود.

---

## ۴. نام‌گذاری اندپوینت‌های جدید ادمین (پیشنهاد)

| نوع | الگو | مثال |
|-----|------|------|
| تجمیعی داشبورد | `GET admin/dashboard/...` | `admin/dashboard/summary?startDate=&endDate=` |
| CRUD یک ماژول | `GET/POST/PUT/DELETE admin/{module}/...` | `admin/search-rules/synonyms` |
| عملیات خطرناک | `POST` + بدنه صریح + idempotency key در صورت تکرار | `POST admin/jobs/retry/{jobId}` (فاز ۸) |

- **camelCase** در query (مثل `startDate`) اگر بک‌اند ASP.NET همان را انتظار دارد؛ در غیر این صورت با بک‌اند هماهنگ شود.
- **همیشه** احراز هویت ادمین در سمت سرور برای همین مسیرها.

---

## ۵. ساختار فرانت ادمین

| ناحیه | مسیر نمونه |
|-------|------------|
| صفحات | `src/app/admin/**/page.js` |
| قالب‌ها | `src/template/Admin/**` |
| هدر/کارت مشترک | `src/components/admin/**` |
| منو | `src/data/adminSidebarData.js` |
| لایهٔ داده | `src/services/**` — یک سرویس به ازای دامین (مثل `adminAnalyticsService.js`) |

الگوی UI: `AdminPageHeader`, `AdminSectionCard`, `FilterSection` با `isAdmin`, `Spinner`, `sonner` برای toast.

---

## ۶. کلیدهای منو (`key` در سایدبار)

- هر آیتم در `ADMIN_SIDEBAR_ITEMS` باید `key` یکتا داشته باشد (برای Accordion و در آینده فیلتر permission).
- کلیدهای **فعلی** در جدول زیر؛ با `adminSidebarData.js` باید یکی باشند.

| key | نام منو |
|-----|---------|
| `dashboard` | داشبورد |
| `user` | کاربران |
| `ticket` | تیکت‌ها |
| `contact-us` | ارتباط با ما |
| `blog` | وبلاگ |
| `security` | امنیت |
| `product` | محصولات |
| `order` | سفارشات |
| `return-request` | مرجوعی |
| `insurance-quality` | بیمه و سپر کیفیت |
| `discount` | تخفیف |
| `review` | نظرات |
| `shipping` | ارسال |
| `report` | گزارشات |
| `payment` | پرداخت‌ها |
| `inventory` | انبار |
| `notification` | اعلان‌ها |
| `currency` | ارز |
| `scraper-data` | اسکرپ و داده |
| `setting` | تنظیمات |

### زیرمنوی سفارشات (فاز ۲)

لینک‌های فرزند به **`/admin/orders?status={n}`** می‌روند؛ `n` باید **عدد صحیح ۱…۸** مطابق `OrderStatus` در `orderService.js` باشد. `getPaginated` فقط در این بازه به `GetOrdersByStatus` می‌رود؛ در غیر این صورت (رشتهٔ غیرعددی، `9`، `1.5`، …) **ایمن** به لیست همه سفارشات برمی‌گردد. صفحهٔ واحد `app/admin/orders/page.js` همان پارامتر را می‌خواند. سایدبار با **`hrefMatchesLocation`** و `useSearchParams` (داخل **Suspense**) آیتم فعال را با query هماهنگ می‌کند؛ `useEffect` باز کردن آکاردئون فقط به **`pathname` + `searchKey`** (`searchParams.toString()`) وابسته است تا اجرای اضافی نشود.

کلیدهای **رزروشده برای فازهای بعد** (استفاده هنگام افزودن منو): فایل `src/constants/adminPlannedMenuKeys.js`.

---

## ۷. امنیت و دادهٔ حساس

- هرگز API key / رمز / secret در پاسخ JSON به مرورگر برای لاگ عمومی برنگردد؛ در UI فقط نمایش masked.
- ورودی‌های فرم ادمین: اعتبارسنجی در بک‌اند؛ در فرانت حداقل نوع و محدوده طول.
- لاگ سمت کلاینت: از `console.log` بدنهٔ پاسخ‌های حاوی PII در production پرهیز شود.

---

## ۸. مراجع مرتبط

- نقشهٔ ۱۰ فاز: `docs/admin-panel-10-phase-roadmap.md`
- چک‌لیست رگرسیون: `docs/admin-regression-checklist.md`
- کلیدهای رزرو منو: `src/constants/adminPlannedMenuKeys.js`

---

## ۹. تحقق فاز ۱ (چک داخلی)

- جدول کلیدهای بخش ۶ با `src/data/adminSidebarData.js` یک‌به‌یک مطابقت دارد (۲۱ آیتم).
- مسیرهای `admin-regression-checklist.md` با خروجی `next build` (مسیرهای `/admin/...`) سازگار است.
- فایل `adminPlannedMenuKeys.js` فقط ثابت‌های `Object.freeze` است؛ **بار اضافی روی باندل ندارد** مگر جایی `import` شود.
- `npm run build` در ریشهٔ `amazon-shop` بدون خطا اجرا می‌شود.

---

## ۱۰. تحقق فاز ۲ (چک داخلی)

- زیرمنوی سفارشات و اعداد `status` با `OrderStatus` و `OrdersFilters` هم‌خوان است.
- `getPaginated`: اعتبارسنجی رشتهٔ صحیح عددی در بازه **۱ تا ۸** (هم‌تراز `Pending`…`Failed`).
- سایدبار: به‌روزرسانی آکاردئون بدون حلقهٔ رندر اضافی (`setOpenKey` فقط در صورت تغییر مقدار).
- ریدایرکت مسیرهای قدیمی `/admin/orders/pending` و … به `?status=` عددی (RSC).
- بیلد و لینت پس از اصلاحات بررسی شده است.

---

## ۱۱. تحقق فاز ۳ (بازبینی)

- بارگذاری داشبورد با **`safeUnwrapResponse`** و try دو لایه برای جستجوهای محبوب؛ **یک API ناموفق کل صفحه را از بین نمی‌برد**.
- **`fetchAdminDashboardKpi`** در صورت خطا در فرانت به `null` تبدیل می‌شود تا بقیهٔ بخش‌ها پر شوند.
- پاسخ **`dashboard-kpi`** اگر آرایه باشد نادیده گرفته می‌شود (فقط آبجکت غیرآرایه).
- وابستگی **`useEffect`** روی `start.getTime()` و `end.getTime()` برای پایداری نسبت به مرجع `Date`.
- کلید لیست جستجوهای محبوب از **متن + ایندکس** ساخته می‌شود.
