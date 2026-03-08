# فقط APIهای وصل‌نشده — برای تکمیل پنل ادمین

**مهم:** بیشتر APIهای پنل ادمین **وصل هستند و درست کار می‌کنند**.  
این داک فقط **همان endpointهایی** را لیست می‌کند که الان روی سرور **نیستند** یا خطای **Not Found / 404** می‌دهند.  

**درخواست از تیم سرور:**  
- **فقط** این لیست را پیاده‌سازی کنید.  
- **بقیهٔ APIها را تغییر ندهید** تا چیزی که الان درست کار می‌کند خراب نشود.

---

پایهٔ آدرس: `NEXT_PUBLIC_API_URL` (مثلاً `https://micrls.com/api`).  
همهٔ درخواست‌ها با **Bearer Token** (احراز هویت ادمین).

---

## ۱. داشبورد ادمین (`/admin` — صفحهٔ اول پنل)

این‌ها برای باکس‌های خلاصه آمار و لیست‌های داشبورد استفاده می‌شوند. اگر نباشند، داشبورد خالی یا خطا می‌دهد.

| متد | مسیر کامل | بدنه / کوئری | پاسخ مورد انتظار (data) |
|-----|-----------|--------------|--------------------------|
| GET | `admin/analytics/summary` | — | `{ totalSearches, totalClicks, totalPurchases, overallConversionRate, overallClickRate, uniqueSearchTerms, noResultSearches }` |
| GET | `admin/analytics/user-stats` | — | `{ totalUsers, activeUsers }` |
| GET | `admin/analytics/popular-search-terms?limit=10` | Query: `limit` (عدد) | آرایه: `[{ searchTerm, count, clickRate }]` |
| GET | `admin/analytics/no-result-searches?limit=10` | Query: `limit` | آرایه: `[{ searchTerm, count }]` |
| GET | `admin/analytics/top-selling-products?limit=10` | Query: `limit` | آرایه: `[{ asin, title, viewCount, searchCount, purchaseCount }]` |

---

## ۲. بیمه ارسال (`/admin/insurance`)

| متد | مسیر کامل | بدنه / کوئری | توضیح |
|-----|-----------|--------------|--------|
| GET | `admin/AdminShippingInsurance` | Query: `orderId`, `userId`, `status` (اختیاری) | لیست بیمه‌ها با فیلتر |
| PUT | `admin/AdminShippingInsurance/claims/{claimId}/process?adminUserId=` | Body: `{ status, approvedAmount?, adminNote?, rejectionReason? }` | پردازش ادعای خسارت |

---

## ۳. سپر کیفیت (`/admin/quality-shield`)

| متد | مسیر کامل | بدنه / کوئری | توضیح |
|-----|-----------|--------------|--------|
| GET | `admin/AdminQualityShield` | Query: `orderId`, `userId`, `status` (اختیاری) | لیست سرویس‌های سپر کیفیت |
| POST | `admin/AdminQualityShield/{serviceId}/start-inspection` | Body: `{ inspectorName }` | شروع بررسی |
| POST | `admin/AdminQualityShield/{serviceId}/complete-inspection` | Body: `{ result, inspectionNotes?, photoPath?, videoPath? }` — `result`: 1=قبول، 2=رد، 3=مشروط | تکمیل بررسی |
| POST | `admin/AdminQualityShield/{serviceId}/upload` | Form: `photoPath`, `videoPath` | آپلود مسیر فایل (در صورت نیاز) |

---

## ۴. محصولات ادمین — اضافه با لینک و ورود گروهی

| متد | مسیر کامل | بدنه / کوئری | توضیح |
|-----|-----------|--------------|--------|
| POST | `admin/products/add-by-link` | Body: مطابق AddProductByLinkRequest | افزودن محصول با لینک |
| POST | `admin/products/bulk-import` | Body: BulkImportRequest | ورود گروهی محصولات |
| GET | `admin/products/bulk-import/{jobId}/status` | — | وضعیت job ورود گروهی |

---

## ۵. تنظیمات قیمت‌گذاری (`/admin/settings/pricing`)

| متد | مسیر کامل | توضیح |
|-----|-----------|--------|
| GET | `admin/pricing/settings` | دریافت تنظیمات قیمت‌گذاری |
| PUT | `admin/pricing/settings` | بروز تنظیمات — body: مطابق داک بک‌اند |
| GET | `admin/pricing/price-rules` | لیست قوانین قیمت |
| POST | `admin/pricing/price-rules` | ایجاد قانون قیمت |
| PUT | `admin/pricing/price-rules/{id}` | بروز قانون |
| DELETE | `admin/pricing/price-rules/{id}` | حذف قانون |
| GET | `admin/pricing/weight-rules` | لیست قوانین وزن |
| POST | `admin/pricing/weight-rules` | ایجاد |
| PUT | `admin/pricing/weight-rules/{id}` | بروز |
| DELETE | `admin/pricing/weight-rules/{id}` | حذف |
| GET | `admin/pricing/category-overrides` | لیست override دسته |
| POST | `admin/pricing/category-overrides` | ایجاد |
| PUT | `admin/pricing/category-overrides/{id}` | بروز |
| DELETE | `admin/pricing/category-overrides/{id}` | حذف |

---

## ۶. گزارشات (`/admin/reports/*`)

این مسیرها برای صفحات گزارش فروش، کاربران، محصولات، مالی، ارسال و موجودی استفاده می‌شوند.

| متد | مسیر کامل | کوئری | توضیح |
|-----|-----------|--------|--------|
| GET | `Report/GetSalesReport` | `startDate`, `endDate`, `groupBy` (اختیاری) | گزارش فروش |
| GET | `Report/GetUsersReport` | `startDate`, `endDate` | گزارش کاربران |
| GET | `Report/GetProductsReport` | `startDate`, `endDate`, `categoryId` (اختیاری) | گزارش محصولات |
| GET | `Report/GetFinancialReport` | `startDate`, `endDate` | گزارش مالی |
| GET | `Report/GetShippingReport` | `startDate`, `endDate` | گزارش ارسال |
| GET | `Report/GetInventoryReport` | — | گزارش موجودی |

---

## ۷. نرخ ارز و دلار (در صورت نبودن روی سرور)

اگر الان `DollarRate` یا `CurrencyRate` یا `CurrencyService` را ندارید، این‌ها را اضافه کنید:

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `DollarRate/current` | نرخ فعلی دلار (می‌تواند Public باشد) |
| POST | `DollarRate/set` | Body: `{ isManual, manualRate }` |
| POST | `DollarRate/update` | Body: `{ rate }` |
| POST | `DollarRate/update-all` | بروزرسانی از منبع خارجی |
| GET | `CurrencyRate/latest` | آخرین نرخ همه ارزها |
| POST | `CurrencyRate/update` | Body: `{ currency, rate }` |
| GET | `CurrencyService/GetPaginated?pageNumber=&pageSize=&status=&serviceType=&userId=&searchTerm=` | لیست درخواست‌های سرویس ارز |
| POST | `CurrencyService/{requestId}/status` | Body: `{ status, processNotes?, rejectionReason?, completionNotes?, referenceNumber? }` |

---

## ۸. تیکت ادمین (در صورت نبودن `AdminTicket`)

اگر فقط `Ticket` دارید و `AdminTicket` جدا ندارید، این endpointها را برای پنل ادمین اضافه کنید:

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `AdminTicket/GetPaginated?pageNumber=&pageSize=&status=&priority=&categoryId=&searchTerm=&...` | لیست با فیلتر |
| POST | `AdminTicket/Search` | Body: فیلترها |
| GET | `AdminTicket/GetById?id=` | جزئیات تیکت |
| GET | `AdminTicket/GetTicketWithMessages?ticketId=` | تیکت + پیام‌ها |
| GET | `AdminTicket/{ticketId}/GetMessages` | لیست پیام‌ها |
| POST | `AdminTicket/{ticketId}/AddMessage` | Body: `{ message, isInternal?, attachmentUrl? }` |
| POST | `AdminTicket/{ticketId}/ChangeStatus?status=&notes=` | تغییر وضعیت |
| POST | `AdminTicket/{ticketId}/Assign` | Body: `{ assignedToUserId }` |
| PUT | `AdminTicket/Update?id=` | بروز تیکت |
| POST | `AdminTicket/CloseTicket?id=&reason=` | بستن |
| POST | `AdminTicket/ReopenTicket?id=` | باز کردن مجدد |
| GET | `AdminTicket/GetStatistics` | آمار تیکت‌ها |

---

## ۹. امنیت و لاگ (در صورت نبودن ماژول Security)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Security/GetLogs?pageNumber=&pageSize=&level=&startDate=&endDate=` | لاگ‌های سیستم |
| GET | `Security/GetAdmins?pageNumber=&pageSize=&searchTerm=` | لیست ادمین‌ها |
| POST | `Security/CreateAdmin` | ایجاد ادمین |
| PUT | `Security/UpdateAdmin?id=` | بروز ادمین |
| DELETE | `Security/DeleteAdmin?id=` | حذف ادمین |
| GET | `Security/GetPermissions` | لیست دسترسیها |

---

## ۱۰. تنظیمات عمومی/پرداخت/ارسال/ایمیل (در صورت نبودن ماژول Settings)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Settings/GetGeneral` | تنظیمات عمومی |
| PUT | `Settings/UpdateGeneral` | بروز |
| GET | `Settings/GetPayment` | تنظیمات پرداخت |
| PUT | `Settings/UpdatePayment` | بروز |
| GET | `Settings/GetShipping` | تنظیمات ارسال |
| PUT | `Settings/UpdateShipping` | بروز |
| GET | `Settings/GetEmail` | تنظیمات ایمیل |
| PUT | `Settings/UpdateEmail` | بروز |

---

## جمع‌بندی برای تیم سرور

- **این فایل فقط endpointهای وصل‌نشده را لیست کرده است.**  
- **هر API دیگری که فرانت صدا می‌زند (مثل Order، Payment، Review، User، Inventory، ContactUs، Role، ReturnRequest، DiscountCode و ...) الان وصل است؛ آن‌ها را عوض نکنید.**  
- با پیاده‌سازی **فقط** موارد بالا، پنل ادمین بدون خطای Not Found تکمیل می‌شود.

اگر روی سرور یکی از این مسیرها از قبل وجود دارد، نیازی به تغییر آن نیست؛ فقط مسیرهایی که ۴۰۴ می‌دهند را اضافه کنید.
