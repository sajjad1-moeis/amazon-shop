# چک‌لیست نیازمندی کارفرما — منو + داشبورد (۱۷ ویجت)

مرجع: `AmazonShop_Api_Manually/dataKarfarma_amazon/add-to-menu (1).pdf` و `dashboard-widget.pdf`.

**راهنمای وضعیت**

| برچسب | معنی |
|--------|------|
| **هر دو** | UI فرانت پیاده است و API/سرویس بک‌اند پوشش می‌دهد (یا برای ویجتِ فقط-کلاینت، رفتار کامل در فرانت). |
| **فرانت** | صفحه/منو/ویجت در `amazon-shop` هست؛ داده یا اندپوینت اختصاصی بک محدود یا نامرتبط. |
| **بک** | اندپوینت یا منطق در `AmazonShop_Api_Manually` هست؛ ممکن است UI هنوز همهٔ قابلیت را مصرف نکند. |
| **ناقص** | بخشی از خواستهٔ PDF هنوز پر نشده یا فقط با fallback/تقریب پوشش داده می‌شود. |

---

## الف) منو (`add-to-menu`)

| # | مورد PDF (خلاصه) | مسیر / یادداشت فرانت | API / بک‌اند اصلی | وضعیت | یادداشت |
|---|-------------------|------------------------|-------------------|--------|---------|
| A1 | سفارشات — زیرمنو عملیاتی | `/admin/orders` + فیلتر `?status=` | لیست/فیلتر سفارش موجود است | **هر دو** | زیرمنو: ۱،۳،۴،۵،۶؛ **وضعیت ۲ (پرداخت‌شده)** به‌صورت آیتم جدا در منو نیست (قابل افزودن). |
| A2 | مدیریت جستجو (هاب + گزارش‌ها + …) | `/admin/search/*` | `GET api/admin/search-management/*` | **هر دو** | مترادف، ریدایرکت، لندینگ، بلک/وایت، گزارش کم‌کلیک/بدون خرید. |
| A2b | سرچ بدون نتیجه / کم‌کلیک / بدون خرید | `/admin/search/reports?tab=…` | `no-result-searches`, `reports/low-click-searches`, `reports/no-purchase-searches` | **هر دو** | تب‌ها و اسکرول در فرانت؛ بدون‌نتیجه بازه‌دار: `GET admin/analytics/no-result-searches/by-date-range`. |
| A3 | مدیریت سورس | `/admin/sources` | `AdminScraperSourcesController` | **هر دو** | |
| A4 | مدیریت پروکسی (جدا از ویجت) | `/admin/scraper-proxy` | پروکسی اسکرپر + مسیر Next ادمین | **هر دو** | جزئیات PDF (لیست Ban، نرخ موفقیت هر پروکسی) بستگی به سرویس پروکسی دارد؛ ممکن است **ناقص** نسبت به سند. |
| A5 | Job / Queue / Sync | `/admin/jobs` | `AdminJobsController` | **هر دو** | |
| A6 | مرکز ترجمه | `/admin/catalog/translation`, `brand-glossary` | کاتالوگ ادمین | **هر دو** | |
| A7 | کیفیت محصول QA | `/admin/catalog/qa` | `AdminProductCatalogController` (QA) | **هر دو** | |
| A8 | مانیتورینگ و لاگ‌ها | `/admin/security/logs`, `operational-logs` | لاگ امنیت + عملیات | **ناقص** | PDF چند نوع لاگ جدا (API, payment, webhook, …) خواسته؛ الان **تمرکز روی لاگ سیستم + عملیاتی** است نه تفکیک کامل همهٔ کانال‌ها. |
| A9 | نقش و دسترسی | `/admin/roles`, `security/permissions`, `security/admins` | `RoleController`, `SecurityController` | **هر دو** | |
| A10 | Audit / Activity | `/admin/security/audit` | بسته به پیاده‌سازی Audit | **هر دو** | تأیید دقیق فیلدهای «قبل/بعد» با بک‌اند در زمان UAT. |
| A11 | API / یکپارچه‌سازی | `/admin/integration` | `AdminOperationsController` / Integration | **هر دو** | |
| A12 | SEO / لندینگ | `/admin/seo`, بخش جستجو (لندینگ) | `AdminSeoController` + search-management | **هر دو** | |
| A13 | بنر / اسلایدر / بلوک | `/admin/content/banners` | `BannerController` ادمین | **هر دو** | |

---

## ب) داشبورد — ۱۷ ویجت (`dashboard-widget`)

| # | ویجت PDF | فرانت (`amazon-shop`) | بک‌اند (`api/admin/analytics` یا دیگر) | وضعیت | یادداشت |
|---|------------|------------------------|----------------------------------------|--------|---------|
| 1 | فیلتر بازه (امروز، ۷/۳۰ روز، ماه، دلخواه) + حفظ در URL | `AdminDashboardPage` — `range`, `from`, `to` | — | **فرانت** | بدون اندپوینت جدا؛ تاریخ به‌صورت ISO به APIهای دیگر پاس داده می‌شود. |
| 2 | آخرین بروزرسانی + دکمه Refresh | همان صفحه + `reloadNonce` | — | **فرانت** | زمان «sync بک‌گراند» اگر API جدا ندهد، همان «آخرین بارگذاری صفحه» است. |
| 3 | فروش کل (تومان) + دلتا نسبت به بازه قبل | KPI + `formatToman` + `toFiniteAmount` | `GET admin/analytics/dashboard-kpi`؛ fallback `Report/GetSalesReport` | **هر دو** | واحد = واحد ذخیره سفارش؛ نمایش «تومان» در UI. |
| 4 | تعداد سفارشات جدید (بازه) + دلتا | KPI | همان `dashboard-kpi` (سفارش‌های **پرداخت‌شده در بازه** بر اساس `PaidAt`) | **ناقص** | اگر کارفرما «همهٔ ثبت‌شده با `CreatedAt`» بخواهد، باید فیلد/تعریف جدا در API مشخص شود. |
| 5 | سفارشات در انتظار + لینک فیلتر | KPI + لینک `/admin/orders?status=1` | `dashboard-kpi` — شمارش وضعیت‌های **۱،۲،۳** | **هر دو** | با اصلاح اخیر بک هم‌خوان با PDF و fallback فرانت. |
| 6 | کاربران جدید (بازه) + دلتا | KPI | `dashboard-kpi` (`CreatedAt` کاربر) | **هر دو** | |
| 7 | نرخ تبدیل + دلتا | KPI + یادداشت فرمول | `dashboard-kpi` (خرید/جستجو در بازه) + `ConversionRateChangePercent` | **ناقص** | PDF: «Session / جستجو»؛ بک فعلی: **خرید پس از جستجو / کل جستجو** در `UserSearchHistories`. |
| 8 | هشدارهای فوری | `AdminDashboardPhase4` + ادغام KPI | تیکت باز (`AdminTicket`)، هشدار پروکسی (Next/status) | **ناقص** | همهٔ موارد PDF (sync ارز، job ناموفق، محصول خطادار، …) **یک API تجمیعی هشدار** ندارند؛ بخشی لینک‌دار و بخشی به‌صورت دستی/جداست. |
| 9 | نمودار روند فروش (+ تعداد سفارش) | `AdminDashboardPhase4` — Bar دو سری | `GET admin/analytics/sales-trend`؛ fallback گزارش | **هر دو** | تعویض Line/Bar per PDF اختیاری؛ Bar با sales+orders پیاده است. |
| 10 | توزیع وضعیت سفارش + کلیک به لیست | Pie + لینک‌های وضعیت | `GET admin/analytics/order-status-distribution`؛ fallback شمارش لحظه‌ای | **ناقص** | در fallback، **بازه زمانی** برای توزیع اعمال نمی‌شود (یادداشت در UI). |
| 11 | جستجوهای بدون نتیجه | بخش داشبورد + لینک گزارش | `no-result-searches` + **`by-date-range`** | **هر دو** | |
| 12 | پرجستجوها | داشبورد + لینک | `popular-search-terms` + `by-date-range` | **هر دو** | PDF: کلیک/خرید per query — اگر API ردیف‌ها را بدهد در جدول گزارش قابل نمایش است؛ کارت داشبورد خلاصه است. |
| 13 | سلامت سیستم | `AdminDashboardPhase5` | `GET admin/analytics/system-health` | **هر دو** | در نبود/خطا: fallback ترکیبی (پروکسی، API، ارز، …). |
| 14 | وضعیت پروکسی/اسکرپر | کارت + لینک | وضعیت از مسیر Next + health scraper در `system-health` | **ناقص** | PDF: تعداد Ban، میانگین زمان پاسخ، … — به **قرارداد سرویس پروکسی** وابسته است. |
| 15 | سفارشات مهم اخیر | جدول فاز ۵ | `orderService.getRecentOrders` (API سفارش) | **فرانت** + **بک** | اندپوینت اختصاصی «dashboard recent orders» نیست؛ از لیست سفارش استفاده می‌شود. |
| 16 | تیکت‌های مهم اخیر | جدول فاز ۵ | `AdminTicket` paginated | **فرانت** + **بک** | فیلتر «فقط high priority» ممکن است با پارامتر API محدود شود — در صورت نیاز UAT. |
| 17 | Quick Actions | دکمه‌های فاز ۵ + لینک‌ها | صفحات مقصد (محصول، jobs، …) | **هر دو** | «سفارش دستی» اگر در PDF بود: بررسی وجود مسیر create order ادمین — در لیست فعلی ممکن است **ناقص** باشد. |

---

## ج) جمع‌بندی سریع

- **پوشش قوی:** KPI اصلی، روند فروش، توزیع وضعیت (با API)، سلامت سیستم، جستجو (پرتکرار/بدون نتیجه بازه‌دار)، منوی اصلی PDF، گزارش‌های جستجو، سورس/جاب/پروکسی/یکپارچه‌سازی/سئو/بنر.
- **نیاز به تصمیم محصول/قرارداد:** تعریف دقیق «سفارش جدید» (CreatedAt vs PaidAt)، فرمول نرخ تبدیل (session vs جستجو)، تکمیل پنل هشدار تجمیعی، جزئیات پروکسی سطح PDF.
- **UAT پیشنهادی:** یک بار روی محیط staging با داده واقعی؛ تطبیق مبالغ KPI با `Report/GetSalesReport` و `dashboard-kpi` برای همان بازه.

آخرین به‌روزرسانی چک‌لیست: ۲۰۲۶-۰۴-۱۳ (هم‌تراز با برنچ‌های اخیر فرانت/بک این ریپو).
