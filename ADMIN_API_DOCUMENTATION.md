# داکیومنت APIهای پنل ادمین

این فایل لیست **همهٔ endpointهایی** است که فرانتِ پنل ادمین فراخوانی می‌کند.  
اگر روی سرور پیام **API Not Found** یا **404** می‌گیرید، یعنی آن مسیر روی بک‌اند پیاده‌سازی نشده است.  
با این داک می‌توانید به تیم سرور بدهید تا فقط endpointهای لازم را اضافه کنند.

**پایهٔ آدرس API:** از متغیر محیطی `NEXT_PUBLIC_API_URL` خوانده می‌شود (مثال: `https://micrls.com/api`).  
همهٔ مسیرهای زیر **نسبت به این base** هستند و با **Bearer Token** احراز هویت می‌شوند (به‌جز جایی که نوشته شده Public).

---

## ۱. داشبورد ادمین (`/admin`)

| متد | مسیر | توضیح | پاسخ مورد انتظار |
|-----|------|--------|------------------|
| GET | `admin/analytics/summary` | خلاصه آمار (جستجو، کلیک، خرید، نرخ تبدیل و...) | `data`: { totalSearches, totalClicks, totalPurchases, overallConversionRate, overallClickRate, uniqueSearchTerms, noResultSearches } |
| GET | `admin/analytics/user-stats` | آمار کاربران | `data`: { totalUsers, activeUsers } |
| GET | `admin/analytics/popular-search-terms?limit=10` | جستجوهای پرتکرار | `data`: آرایه { searchTerm, count, clickRate } |
| GET | `admin/analytics/no-result-searches?limit=10` | جستجوهای بدون نتیجه | `data`: آرایه { searchTerm, count } |
| GET | `admin/analytics/top-selling-products?limit=10` | محصولات پرفروش | `data`: آرایه { asin, title, viewCount, searchCount, purchaseCount } |

**سایر (اختیاری برای داشبورد):**
- GET `admin/analytics/popular-search-terms/by-date-range?startDate=&endDate=&limit=`
- GET `admin/analytics/search-trends?startDate=&endDate=`
- GET `admin/analytics/conversion-rate`

---

## ۲. نرخ ارز و دلار (`/admin/currency-rates`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `DollarRate/current` | نرخ فعلی دلار (Public) |
| POST | `DollarRate/set` | تنظیم نرخ دستی — body: { isManual, manualRate } |
| POST | `DollarRate/update` | به‌روزرسانی نرخ — body: { rate } |
| POST | `DollarRate/update-all` | بروزرسانی همه از منبع خارجی |
| GET | `CurrencyRate/latest` | آخرین نرخ همه ارزها (Public) |
| POST | `CurrencyRate/update` | بروز نرخ یک ارز — body: { currency, rate } |

---

## ۳. درخواست‌های سرویس ارز (`/admin/currency-services`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `CurrencyService/GetPaginated?pageNumber=&pageSize=&status=&serviceType=&userId=&searchTerm=` | لیست با صفحه‌بندی |
| POST | `CurrencyService/{requestId}/status` | تغییر وضعیت درخواست — body: { status, processNotes?, rejectionReason?, completionNotes?, referenceNumber? } |

---

## ۴. بیمه ارسال (`/admin/insurance`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `admin/AdminShippingInsurance?orderId=&userId=&status=` | لیست بیمه‌ها با فیلتر |
| PUT | `admin/AdminShippingInsurance/claims/{claimId}/process?adminUserId=` | پردازش ادعا — body: { status, approvedAmount?, adminNote?, rejectionReason? } |

---

## ۵. سپر کیفیت (`/admin/quality-shield`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `admin/AdminQualityShield?orderId=&userId=&status=` | لیست سرویس‌های سپر کیفیت |
| POST | `admin/AdminQualityShield/{serviceId}/start-inspection` | شروع بررسی — body: { inspectorName } |
| POST | `admin/AdminQualityShield/{serviceId}/complete-inspection` | تکمیل بررسی — body: { result, inspectionNotes?, photoPath?, videoPath? } (result: 1=قبول، 2=رد، 3=مشروط) |
| POST | `admin/AdminQualityShield/{serviceId}/upload` | آپلود مسیر عکس/ویدیو (form) |

---

## ۶. محصولات ادمین (اضافه با لینک، bulk import)

| متد | مسیر | توضیح |
|-----|------|--------|
| POST | `admin/products/add-by-link` | افزودن محصول با لینک — body: مطابق AddProductByLinkRequest |
| POST | `admin/products/bulk-import` | ورود گروهی — body: BulkImportRequest |
| GET | `admin/products/bulk-import/{jobId}/status` | وضعیت job ورود گروهی |
| POST | `admin/products/seed-test-data?count=` | داده تست (ممکن است Public باشد) |

---

## ۷. سفارشات

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Order/GetAllOrders` | همه سفارشات |
| GET | `Order/GetOrdersByStatus?status=` | با فیلتر وضعیت |
| GET | `Order/GetOrderById?orderId=` | جزئیات یک سفارش |
| POST | `Order/update-status/{orderId}` | تغییر وضعیت — body: { status, adminNotes? } |
| POST | `Order/update-payment/{orderId}` | بروز پرداخت |
| POST | `Order/update-shipping/{orderId}` | بروز ارسال / کد رهگیری |
| POST | `Order/mark-delivered/{orderId}` | ثبت تحویل |
| POST | `Order/CancelOrder?orderId=` | لغو — body: { cancellationReason, adminNotes? } |
| POST | `Order/RefundOrder?orderId=` | استرداد |

---

## ۸. پرداخت‌ها (`/admin/payments`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Payment/GetPaginated?pageNumber=&pageSize=&status=&method=&searchTerm=&startDate=&endDate=` | لیست با فیلتر |
| GET | `Payment/GetById?id=` | جزئیات یک پرداخت |
| POST | `Payment/Refund?id=` | بازگشت وجه — body: { amount, reason } |

---

## ۹. نظرات (`/admin/reviews`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Review/GetPaginated?pageNumber=&pageSize=&status=&productId=&searchTerm=` | لیست نظرات با فیلتر |
| GET | `Review/GetById?id=` | جزئیات یک نظر |
| POST | `Review/Approve?id=` | تایید نظر |
| POST | `Review/Reject?id=` | رد — body: { reason } |
| DELETE | `Review/Delete?id=` | حذف نظر |

---

## ۱۰. انبار و موجودی (`/admin/inventory`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Inventory/GetPaginated?pageNumber=&pageSize=&status=&searchTerm=` | لیست موجودی با صفحه‌بندی |
| GET | `Inventory/GetByProductId?productId=` | موجودی یک محصول |
| POST | `Inventory/StockIn` | ورود کالا — body: مطابق API |
| POST | `Inventory/StockOut` | خروج کالا |
| POST | `Inventory/UpdateStock?productId=&quantity=` | بروز مقدار موجودی |

---

## ۱۱. کاربران (`/admin/users`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Users/GetAllUsers` | همه کاربران |
| GET | `Users/GetUserDetailForAdmin?id=` | جزئیات کاربر برای ادمین |
| PUT | `Users/AdminUpdateUser?id=` | بروز کاربر توسط ادمین |
| POST | `Users/AdminChangePassword?id=` | تغییر رمز توسط ادمین |
| POST | `Users/ChangeUserStatus?id=&isActive=` | فعال/غیرفعال |
| POST | `Users/ChargeUserWallet?id=` | شارژ کیف پول — body: walletData |
| POST | `Users/DeductUserWallet?id=` | برداشت از کیف پول |

---

## ۱۲. تیکت‌ها و پشتیبانی (`/admin/tickets`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `AdminTicket/GetPaginated?pageNumber=&pageSize=&status=&priority=&categoryId=&...` | لیست با فیلتر |
| POST | `AdminTicket/Search` | جستجوی پیشرفته — body: filters |
| GET | `AdminTicket/GetById?id=` | جزئیات تیکت |
| GET | `AdminTicket/GetTicketWithMessages?ticketId=` | تیکت به‌همراه پیام‌ها |
| GET | `AdminTicket/{ticketId}/GetMessages` | پیام‌های تیکت |
| POST | `AdminTicket/{ticketId}/AddMessage` | افزودن پیام — body: { message, isInternal?, attachmentUrl? } |
| POST | `AdminTicket/{ticketId}/ChangeStatus?status=&notes=` | تغییر وضعیت |
| POST | `AdminTicket/{ticketId}/ChangePriority?priority=` | تغییر اولویت |
| POST | `AdminTicket/{ticketId}/Assign` | اختصاص به کاربر — body: { assignedToUserId } |
| PUT | `AdminTicket/Update?id=` | بروز تیکت |
| POST | `AdminTicket/CloseTicket?id=&reason=` | بستن تیکت |
| POST | `AdminTicket/ReopenTicket?id=` | باز کردن مجدد |
| GET | `AdminTicket/GetStatistics` | آمار تیکت‌ها |

---

## ۱۳. ارتباط با ما (`/admin/contact-us`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `ContactUs/GetPaginated?pageNumber=&pageSize=&isRead=&searchTerm=` | لیست با فیلتر |
| GET | `ContactUs/GetById?id=` | جزئیات یک درخواست |
| POST | `ContactUs/mark-read/{id}` | علامت خوانده‌شده |

---

## ۱۴. وبلاگ و نظرات وبلاگ

| متد | مسیر | توضیح |
|-----|------|--------|
| (استفاده از BlogComment و Blog و...) | `BlogComment/GetByStatus?status=` ، `BlogComment/Approve?id=` ، `BlogComment/Reject?id=` و غیره | مطابق سرویس blogCommentService و blogService |

---

## ۱۵. نقش‌ها و امنیت (`/admin/roles` و `/admin/security`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Role/GetRolesWithFilters?pageNumber=&pageSize=&searchTerm=&isActive=&...` | لیست نقش‌ها |
| GET | `Role/GetRoleDetailForAdmin?id=` | جزئیات نقش |
| GET | `Role/GetAllRoles` | همه نقش‌ها |
| POST | `Role/CreateRole` | ایجاد نقش |
| PUT | `Role/UpdateRole?id=` | بروز نقش |
| DELETE | `Role/DeleteRole?id=` | حذف نقش |
| GET | `Security/GetLogs?pageNumber=&pageSize=&level=&startDate=&endDate=` | لاگ‌های امنیتی |
| GET | `Security/GetAdmins?pageNumber=&pageSize=&searchTerm=` | لیست ادمین‌ها |
| POST | `Security/CreateAdmin` | ایجاد ادمین |
| PUT | `Security/UpdateAdmin?id=` | بروز ادمین |
| DELETE | `Security/DeleteAdmin?id=` | حذف ادمین |

---

## ۱۶. درخواست‌های مرجوعی (`/admin/return-requests`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `ReturnRequest/GetAll?pageNumber=&pageSize=&status=&userId=&orderId=` | لیست با فیلتر |
| GET | `ReturnRequest/GetById?id=` | جزئیات |
| POST | `ReturnRequest/Approve?returnRequestId=` | تایید — body: { adminNotes?, finalRefundAmount } |
| POST | `ReturnRequest/Reject?returnRequestId=` | رد — body: { reason? } |

---

## ۱۷. تخفیف و کوپن (`/admin/discounts`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `DiscountCode/GetDiscountCodesPaginated?pageNumber=&pageSize=&status=&searchTerm=` | لیست (در discountService از GetDiscountCodesPaginated استفاده شده؛ در discountCodeService مسیر مشابه با نام متفاوت ممکن است باشد) |
| GET | `DiscountCode/GetDiscountCodeById/{id}` | جزئیات (discountService) |
| POST | `DiscountCode/CreateDiscountCode` | ایجاد کوپن |
| PUT | `DiscountCode/UpdateDiscountCode/{id}` | بروز کوپن (discountService) |

*توجه: در کد هم discountService و هم discountCodeService استفاده شده؛ مسیرهای واقعی را از همان سرویسی که در آن صفحه استفاده می‌شود بگیرید.*

---

## ۱۸. گزارشات (`/admin/reports/*`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Report/GetSalesReport?startDate=&endDate=&groupBy=` | گزارش فروش |
| GET | `Report/GetUsersReport?startDate=&endDate=` | گزارش کاربران |
| GET | `Report/GetProductsReport?startDate=&endDate=&categoryId=` | گزارش محصولات |
| GET | `Report/GetFinancialReport?startDate=&endDate=` | گزارش مالی |
| GET | `Report/GetShippingReport?startDate=&endDate=` | گزارش ارسال |
| GET | `Report/GetInventoryReport` | گزارش موجودی |

---

## ۱۹. محدودیت نرخ (Rate Limit) (`/admin/reports/rate-limits`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `RateLimit/GetPaginated?pageNumber=&pageSize=&...` | لیست |
| POST | `RateLimit/Reset?id=` | ریست کردن |

---

## ۲۰. اعلان‌ها (`/admin/notifications`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Notification/GetNotifications?userId=&pageNumber=&pageSize=&onlyUnread=` | لیست اعلان‌ها |
| POST | `Notification/CreateNotification` | ایجاد اعلان (ادمین) |
| POST | `Notification/DeleteAll` | حذف همه اعلان‌ها |

---

## ۲۱. تنظیمات (`/admin/settings/*`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Settings/GetGeneral` | تنظیمات عمومی |
| PUT | `Settings/UpdateGeneral` | بروز تنظیمات عمومی |
| GET | `Settings/GetPayment` | تنظیمات پرداخت |
| PUT | `Settings/UpdatePayment` | بروز تنظیمات پرداخت |
| GET | `Settings/GetShipping` | تنظیمات ارسال |
| PUT | `Settings/UpdateShipping` | بروز تنظیمات ارسال |
| GET | `Settings/GetEmail` | تنظیمات ایمیل |
| PUT | `Settings/UpdateEmail` | بروز تنظیمات ایمیل |

---

## ۲۲. قیمت‌گذاری ادمین (`/admin/settings/pricing`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `admin/pricing/settings` | تنظیمات قیمت‌گذاری |
| PUT | `admin/pricing/settings` | بروز تنظیمات |
| GET | `admin/pricing/price-rules` | قوانین قیمت |
| POST | `admin/pricing/price-rules` | ایجاد قانون قیمت |
| PUT | `admin/pricing/price-rules/{id}` | بروز |
| DELETE | `admin/pricing/price-rules/{id}` | حذف |
| GET | `admin/pricing/weight-rules` | قوانین وزن |
| POST | `admin/pricing/weight-rules` | ایجاد |
| PUT | `admin/pricing/weight-rules/{id}` | بروز |
| DELETE | `admin/pricing/weight-rules/{id}` | حذف |
| GET | `admin/pricing/category-overrides` | Override دسته |
| POST | `admin/pricing/category-overrides` | ایجاد |
| PUT | `admin/pricing/category-overrides/{id}` | بروز |
| DELETE | `admin/pricing/category-overrides/{id}` | حذف |

---

## ۲۳. ارسال و حمل (`/admin/shipping/*`)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Shipping/GetMethods` | روش‌های ارسال |
| GET | `Shipping/GetMethodById?id=` | جزئیات روش |
| POST | `Shipping/CreateMethod` | ایجاد روش |
| PUT | `Shipping/UpdateMethod?id=` | بروز روش |
| DELETE | `Shipping/DeleteMethod?id=` | حذف روش |
| GET | `Shipping/GetZones` | مناطق ارسال |
| GET | `Shipping/GetZoneById?id=` | جزئیات منطقه |
| POST | `Shipping/CreateZone` | ایجاد منطقه |
| PUT | `Shipping/UpdateZone?id=` | بروز منطقه |
| DELETE | `Shipping/DeleteZone?id=` | حذف منطقه |

---

## ۲۴. فاکتور (برای دانلود از جزئیات سفارش)

| متد | مسیر | توضیح |
|-----|------|--------|
| GET | `Invoice/Download?orderId=` یا `Invoice/Download?invoiceId=` | دانلود فاکتور (پاسخ: فایل با Content-Disposition) |

---

## خلاصه: احتمال «Not Found» بالا

این گروه‌ها معمولاً روی سرورهای قدیمی **پیاده‌سازی نشده** هستند و با روشن بودن فرانت، خطای **API Not Found** می‌دهند:

1. **همهٔ مسیرهای `admin/...`**  
   - `admin/analytics/*` (داشبورد)  
   - `admin/AdminShippingInsurance*` (بیمه)  
   - `admin/AdminQualityShield*` (سپر کیفیت)  
   - `admin/products/*` (اضافه با لینک، bulk import)  
   - `admin/pricing/*` (تنظیمات قیمت‌گذاری)

2. **گزارشات:**  
   - `Report/GetSalesReport` ، `Report/GetUsersReport` ، `Report/GetProductsReport` ، `Report/GetFinancialReport` ، `Report/GetShippingReport` ، `Report/GetInventoryReport`

3. **ارز و سرویس ارز:**  
   - `DollarRate/*` ، `CurrencyRate/*` ، `CurrencyService/*` (در صورت نبود کنترلر مربوطه)

4. **تیکت ادمین:**  
   - `AdminTicket/*` (در صورت تفاوت با Ticket معمولی)

5. **امنیت و لاگ:**  
   - `Security/GetLogs` ، `Security/GetAdmins` و بقیهٔ Security در صورت نبودن ماژول امنیت

6. **تنظیمات:**  
   - `Settings/*` در صورت نبودن ماژول تنظیمات

با این داک می‌توانید دقیقاً به تیم سرور بگویید **کدام مسیرها** باید پیاده شوند تا پنل ادمین بدون خطای «API Not Found» کار کند.
