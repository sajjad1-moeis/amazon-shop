# الزامات و مشخصات API پنل ادمین برای تیم سرور

این سند برای تکمیل و رفع باگ‌های سمت سرور تهیه شده است. هر بخش شامل **مسیر API، متد، پارامترهای دقیق (Query/Body)** و **مشکل فعلی (در صورت وجود)** است.

**پایه API:** همان `API_BASE_URL` (مثلاً `https://api.example.com`).  
**احراز هویت:** همه درخواست‌های ادمین با هدر `Authorization: Bearer {accessToken}` ارسال می‌شوند.  
**پاسخ استاندارد (JSON):**  
`{ "statusCode": number, "success": boolean, "message": string | null, "data": T }`

---

## ۱. برند محصول (ProductBrand)

### وضعیت فعلی
- فرانت از `ProductBrand/GetAll` استفاده می‌کند و فیلتر/صفحه‌بندی را سمت کلاینت انجام می‌دهد.
- برای پنل ادمین به **دریافت صفحه‌بندی‌شده و فیلترشده** و **ساخت/ویرایش برند** با پارامترهای مشخص نیاز است.

### APIهای مورد نیاز

| متد | مسیر | Query | Body | توضیح |
|-----|------|--------|------|--------|
| GET | `ProductBrand/GetPaginated` | `pageNumber` (عدد)، `pageSize` (عدد)، `searchTerm?` (رشته)، `isActive?` (boolean) | — | لیست برندها با صفحه‌بندی و جستجو روی نام/slug. پاسخ: `{ data: { brands: [], totalCount, totalPages } }` |
| GET | `ProductBrand/GetById` | `id` | — | جزئیات یک برند. پاسخ: `{ data: { id, name, slug, isActive, ... } }` |
| POST | `ProductBrand/Create` | — | `{ name: string, slug?: string, isActive?: boolean }` | ایجاد برند. slug در صورت عدم ارسال از name تولید شود. |
| PUT | `ProductBrand/Update` | `id` | `{ name?: string, slug?: string, isActive?: boolean }` | به‌روزرسانی برند. |
| DELETE | `ProductBrand/Delete` | `id` | — | حذف (سخت یا نرم طبق منطق شما). |

**مدل هر آیتم برند در لیست:** `id`, `name`, `slug`, `isActive`, `createdAt` (اختیاری).

---

## ۲. گزارش محصولات و فروش (Report – Products & Sales)

### وضعیت فعلی
- صفحات گزارش ادمین (`/admin/reports/products`, `/admin/reports/financial`, ...) به داده واقعی از API نیاز دارند.
- سرویس فرانت: `Report/GetSalesReport`, `Report/GetProductsReport`, `Report/GetFinancialReport`, `Report/GetShippingReport`, `Report/GetInventoryReport`.

### APIهای مورد نیاز

| متد | مسیر | Query | پاسخ موردانتظار (data) |
|-----|------|--------|-------------------------|
| GET | `Report/GetSalesReport` | `startDate?` (ISO یا YYYY-MM-DD)، `endDate?`، `groupBy?` (مثلاً day, month, year) | `{ totalSales?, totalOrders?, items?: [{ date, sales, orderCount }] }` |
| GET | `Report/GetProductsReport` | `startDate?`, `endDate?`, `categoryId?` | `{ totalProducts?, soldCount?, topSellingProducts?: [{ productId, name, soldQuantity, revenue }], outOfStockCount? }` — گزارش کامل دیتای محصولات فروش رفته و غیره |
| GET | `Report/GetFinancialReport` | `startDate?`, `endDate?` | `{ totalRevenue?, totalCosts?, netProfit? }` |
| GET | `Report/GetUsersReport` | `startDate?`, `endDate?` | `{ totalUsers?, activeUsers?, newUsersThisMonth? }` |
| GET | `Report/GetShippingReport` | `startDate?`, `endDate?` | `{ totalShipments?, successfulShipments?, inTransit? }` — گزارش کامل ارسال |
| GET | `Report/GetInventoryReport` | — | `{ totalStock?, lowStockCount?, outOfStockCount?, items?: [] }` — انبار و کالاهای موجود |

---

## ۳. دانلود فاکتور سفارش (Invoice Download)

### مشکل فعلی
- هنگام دانلود فاکتور با `orderId` یا `invoiceId` خطای **"invoice not found"** برگردانده می‌شود.

### API مورد نیاز

| متد | مسیر | Query | پاسخ |
|-----|------|--------|------|
| GET | `Invoice/Download` | **یکی از دو پارامتر الزامی:** `orderId` (عدد) یا `invoiceId` (عدد) | **موفق:** فایل (PDF یا JSON) با هدر `Content-Disposition: attachment; filename="..."`. **ناموفق:** JSON با `success: false` و `message` (مثلاً "فاکتور یافت نشد") — نه خطای ۵۰۰. |

**توصیه:** اگر برای سفارشی فاکتور صادر نشده، پیام واضح برگردانده شود (مثلاً "فاکتور برای این سفارش یافت نشد") و در دیتابیس در صورت نیاز رکورد Invoice برای Order ساخته یا لینک شود.

---

## ۴. نظرات محصولات و نظرات وبلاگ (Reviews & Blog Comments)

### ۴.۱ نظرات محصول (Review / ProductReview)

فرانت ادمین از `Review/GetPaginated` با فیلتر استفاده می‌کند.

| متد | مسیر | Query | Body | پاسخ |
|-----|------|--------|------|------|
| GET | `Review/GetPaginated` | `pageNumber`, `pageSize`, `status?` (۱=در انتظار، ۲=تأیید، ۳=رد)، `productId?`, `searchTerm?` | — | `{ data: { reviews: [], totalPages?, totalCount? } }`. هر آیتم: `id`, `productId`, `userId`, `userName`, `rating`, `comment`/`content`, `status`, `createdAt` |
| GET | `Review/GetById` | `id` | — | یک نظر برای جزئیات |
| POST | `Review/Approve` | `id` | — | تأیید نظر |
| POST | `Review/Reject` | `id` | `{ reason?: string }` | رد نظر |
| DELETE | `Review/Delete` | `id` | — | حذف (در صورت نیاز) |

اگر در بک‌اند شما مسیر `ProductReview` جدا است، همان پارامترها برای `ProductReview/GetPaginated` و بقیه اعمال شود.

### ۴.۲ نظرات وبلاگ (BlogComment)

فرانت ادمین از `BlogComment/GetByStatus` استفاده می‌کند و صفحه‌بندی را سمت کلاینت انجام می‌دهد. برای عملکرد بهتر بهتر است **GetPaginated با فیلتر** از سمت سرور ارائه شود.

| متد | مسیر | Query | Body | پاسخ |
|-----|------|--------|------|------|
| GET | `BlogComment/GetPaginated` | `pageNumber`, `pageSize`, `status?` (۱=در انتظار، ۲=تأیید، ۳=رد، ۴=...)، `blogId?`, `searchTerm?` | — | `{ data: { comments: [], totalPages?, totalCount? } }`. هر آیتم: `id`, `blogId`, `blogTitle?`, `authorName`, `content`, `status`, `createdAt` |
| GET | `BlogComment/GetByStatus` | `status` | — | آرایه نظرات (فعلی فرانت از این استفاده می‌کند) |
| GET | `BlogComment/GetById` | `id` | — | یک نظر |
| POST | `BlogComment/Approve` | `id` (در Query یا Body) | — | تأیید |
| POST | `BlogComment/Reject` | `id` | — | رد |
| POST | `BlogComment/delete/{id}` | — | — | حذف نرم |

---

## ۵. روش‌های ارسال و مناطق ارسال (Shipping)

### APIهای فعلی فرانت

| متد | مسیر | Query/Body | پاسخ |
|-----|------|------------|------|
| GET | `Shipping/GetMethods` | — | آرایه روش‌های ارسال: `id`, `name`, `description`, `price`, `isActive`, ... |
| GET | `Shipping/GetMethodById` | `id` | یک روش ارسال |
| POST | `Shipping/CreateMethod` | — | Body: `{ name, description?, price?, isActive?, ... }` |
| PUT | `Shipping/UpdateMethod` | `id` | Body: همان فیلدهای قابل ویرایش |
| DELETE | `Shipping/DeleteMethod` | `id` | — |
| GET | `Shipping/GetZones` | — | آرایه مناطق: `id`, `name`, `description`, `priceModifier?`, ... |
| GET | `Shipping/GetZoneById` | `id` | یک منطقه |
| POST | `Shipping/CreateZone` | — | Body: `{ name, description?, ... }` |
| PUT | `Shipping/UpdateZone` | `id` | Body: همان فیلدها |
| DELETE | `Shipping/DeleteZone` | `id` | — |

**گزارش ارسال:** مطابق بخش ۲، `Report/GetShippingReport` با `startDate`, `endDate` و پاسخ کامل (تعداد ارسال‌ها، موفق، در راه و ...).

---

## ۶. پرداخت‌ها (Payment) به‌همراه فیلتر کامل

### وضعیت فعلی
- فرانت از `Payment/GetPaginated` با پارامترهای زیر استفاده می‌کند. اطمینان از پشتیبانی سرور از همه فیلترها لازم است.

| متد | مسیر | Query | پاسخ |
|-----|------|--------|------|
| GET | `Payment/GetPaginated` | `pageNumber`, `pageSize`, `status?` (۱=success، ۲=failed، ۳=pending، یا "refund" برای استرداد)، `method?`, `searchTerm?`, `startDate?`, `endDate?` | `{ data: { payments: [], totalPages? } }`. هر آیتم: `id`, `orderId`, `userId`, `amount`, `status`, `method`, `createdAt`, و در صورت استرداد: `refundAmount`, `refundStatus` |
| GET | `Payment/GetById` | `id` | جزئیات یک تراکنش |
| POST | `Payment/Refund` | `id` | Body: `{ amount?, reason? }` |

---

## ۷. انبار و کالاهای موجود (Inventory)

| متد | مسیر | Query | Body | پاسخ |
|-----|------|--------|------|------|
| GET | `Inventory/GetPaginated` | `pageNumber`, `pageSize`, `status?`, `searchTerm?` | — | `{ data: { inventory: [] یا items: [], totalCount?, totalPages? } }`. هر آیتم: `productId`, `productName?`, `currentStock`, `minStock?`, `reserved?`, `status?` |
| GET | `Inventory/GetByProductId` | `productId` | — | موجودی یک محصول |
| POST | `Inventory/StockIn` | — | `{ productId, quantity, reason?, ... }` | ورود به انبار |
| POST | `Inventory/StockOut` | — | `{ productId, quantity, reason?, ... }` | خروج از انبار |
| POST | `Inventory/UpdateStock` | `productId`, `quantity` | — | به‌روزرسانی مستقیم موجودی |

همچنین `Report/GetInventoryReport` برای خلاصه انبار (بخش ۲).

---

## ۸. اعلان‌ها (Notification): دریافت، ساخت، ارسال

| متد | مسیر | Query | Body | پاسخ |
|-----|------|--------|------|------|
| GET | `Notification/GetNotifications` | `userId`, `pageNumber`, `pageSize`, `onlyUnread` (boolean) | — | `{ data: { notifications: [], totalPages? } }`. هر آیتم: `id`, `title`, `message`, `content?`, `body?`, `isRead`, `createdAt`, `type?` |
| GET | `Notification/GetNotification` | `notificationId`, `userId` | — | یک اعلان |
| POST | `Notification/MarkAsRead` | `notificationId`, `userId` | — | علامت خوانده شده |
| POST | `Notification/MarkAllAsRead` | `userId` | اختیاری: `{ notificationIds?: [] }` | همه را خوانده شده |
| POST | `Notification/CreateNotification` | — | **CreateNotificationDto:** `{ userId?: number, userIds?: number[], title: string, message: string, type?: string, actionUrl?: string, actionText?: string }` — حداقل `title` و `message`. در صورت ارسال `userIds` اعلان برای چند کاربر ساخته شود. | استاندارد؛ برگرداندن `data.id` یا لیست ساخته‌شده |
| POST | **ارسال اعلان (در صورت نیاز)** | — | اگر اندپوینت جدا برای «ارسال» (مثلاً ایمیل/پوش) دارید: `{ notificationId }` یا همان payload ساخت — مشخص شود تا فرانت متصل شود. | — |
| POST | `Notification/delete/{id}` | `userId` | — | حذف یک اعلان |
| POST | `Notification/DeleteAll` | — | — | حذف همه (معمولاً با userId در Query) |
| GET | `Notification/GetUnreadCount` | `userId` | — | عدد |

---

## ۹. نرخ دلار (DollarRate) — رفع ارور ۵۰۰ و حالت اتوماتیک/دستی

### مشکل فعلی
- **POST `DollarRate/update`** با Body مثلاً `{ rate: number }` ارور **۵۰۰** برمی‌گرداند.
- نیاز به **فعال کردن حالت اتوماتیک و دستی** نرخ دلار است.

### APIهای مورد نیاز

| متد | مسیر | Query | Body | توضیح |
|-----|------|--------|------|--------|
| GET | `DollarRate/current` | — | — | `{ data: { rate: number, isManual?: boolean, manualRate?: number, lastUpdated?: string } }` |
| POST | `DollarRate/set` | — | `{ isManual: boolean, manualRate?: number }` | وقتی `isManual: true` است، `manualRate` برای نمایش/استفاده نرخ دستی استفاده شود. وقتی `isManual: false`، نرخ از منبع خارجی (API) خوانده شود. **نباید ۵۰۰ برگرداند.** |
| POST | `DollarRate/update` | — | `{ rate: number }` | به‌روزرسانی دستی نرخ (مثلاً وقتی حالت دستی فعال است). **سرور باید این را بدون ارور ۵۰۰ پردازش کند** — اعتبارسنجی مقدار و ذخیره در دیتابیس. |
| POST | `DollarRate/update-all` | — | — | به‌روزرسانی همه نرخ‌ها از API خارجی (در صورت وجود). |
| GET | `DollarRate/source` | — | — | وضعیت منبع نرخ (دستی/اتوماتیک). |
| POST | `DollarRate/set-source` | — | `{ useManual?: boolean }` یا مشابه | تنظیم منبع. |

**اقدام پیشنهادی سرور:** چک کردن ورودی‌های Body (مثلاً `rate` عدد معتبر باشد)، هندل کردن استثناها و برگرداندن پاسخ استاندارد با `success: false` و `message` به‌جای ۵۰۰.

---

## ۱۰. درخواست ارتباط با ما (ContactUs) — به‌روزرسانی وضعیت خوانده شده در دیتابیس

### مشکل فعلی
- وقتی وضعیت درخواست ارتباط را به **خوانده شده** تغییر می‌دهیم، **در دیتابیس تغییر اعمال نمی‌شود**.

### API مورد نیاز

| متد | مسیر | Query | Body | توضیح |
|-----|------|--------|------|--------|
| POST | `ContactUs/mark-read/{id}` | — | — | **الزاماً** فیلد `isRead = true` (و در صورت وجود `readAt` با زمان فعلی) برای رکورد با شناسه `id` در دیتابیس به‌روزرسانی شود. مسیر فرانت: `POST ContactUs/mark-read/${id}` (بدون Body). پاسخ استاندارد با `success: true` بعد از commit. |

**توصیه:** در بک‌اند بعد از دریافت درخواست، یک UPDATE روی جدول ContactUs با `id` انجام و سپس پاسخ موفق برگردانده شود.

---

## ۱۱. آپلود تصویر وبلاگ بعد از ساخت/ویرایش

### جریان فرانت
1. بعد از **ساخت** یا **ویرایش** بلاگ، در صورت انتخاب فایل تصویر، فرانت جداگانه **آپلود تصویر شاخص** را صدا می‌زند.
2. درخواست: **POST** با **FormData** (multipart/form-data): فیلد `file` = فایل تصویر، و در Query یا FormData مقدار `blogId`.

### API مورد نیاز

| متد | مسیر | Query | Body | پاسخ |
|-----|------|--------|------|------|
| POST | `Blog/UploadFeaturedImage` | `blogId` (الزامی) | **Content-Type: multipart/form-data.** فیلد `file`: فایل تصویر (مثلاً image/jpeg, image/png). اختیاری: همان `blogId` در form. | استاندارد؛ بعد از آپلود، URL تصویر در رکورد بلاگ به‌روز شود و در پاسخ `data.featuredImageUrl` یا مشابه برگردانده شود. |

فرانت فعلی:  
`formData.append("file", file);` و `formData.append("blogId", blogId);` و درخواست به `Blog/UploadFeaturedImage?blogId=${blogId}` با `body: formData` (بدون هدر Content-Type تا مرورگر خودش بگذارد).

---

## ۱۲. ویرایش وبلاگ (Blog/update) — رفع ارور ۵۰۰

### مشکل فعلی
- **POST `Blog/update/{id}`** با Body شیء به‌روزرسانی ارور **۵۰۰** برمی‌گرداند.

### Body ارسالی از فرانت (transformFormDataToBlogData)

فرانت این فیلدها را در Body می‌فرستد (همه اختیاری به‌جز مواردی که سرور الزامی می‌داند):

```json
{
  "title": "string",
  "content": "string (HTML)",
  "shortDescription": "string",
  "slug": "string | undefined",
  "authorId": "number | undefined",
  "categoryId": "number | undefined",
  "status": 1,
  "isFeatured": false,
  "allowComments": true,
  "metaTitle": "string | undefined",
  "metaDescription": "string | undefined",
  "metaKeywords": "string | undefined",
  "scheduledPublishAt": "ISO date string | undefined",
  "tagIds": [1, 2, 3]
}
```

### API مورد نیاز

| متد | مسیر | Query | Body | توضیح |
|-----|------|--------|------|--------|
| POST | `Blog/update/{id}` | — | شیء بالا | سرور باید این فیلدها را بپذیرد و فقط فیلدهای ارسال‌شده را به‌روز کند. **علت ۵۰۰ را بررسی کنید** (اعتبارسنجی سخت‌گیرانه، فیلد نامعتبر، نوع داده، یا exception بدون handle). پاسخ استاندارد با `success: true` و `data` به‌روزرسانی‌شده. |

**اقدام پیشنهادی:** لاگ کردن Body ورودی و استثنا در بک‌اند، و در صورت نیاز تطبیق نام فیلدها (camelCase) با DTO.

---

## خلاصه اقدامات پیشنهادی برای سرور

| موضوع | اقدام |
|--------|--------|
| برند | پیاده‌سازی `GetPaginated` + فیلتر؛ Create/Update با پارامترهای بالا. |
| گزارش | تکمیل گزارش محصولات/فروش/مالی/ارسال/موجودی با Query و مدل پاسخ بالا. |
| فاکتور | رفع «invoice not found» برای `Invoice/Download` با `orderId` یا `invoiceId`. |
| نظرات | `Review/GetPaginated` و `BlogComment/GetPaginated` با فیلتر؛ مدل پاسخ یکسان. |
| ارسال | روش‌ها و مناطق مطابق جدول؛ گزارش ارسال. |
| پرداخت | `Payment/GetPaginated` با تمام فیلترها و پاسخ یکسان. |
| انبار | `Inventory/GetPaginated` و گزارش موجودی. |
| اعلان | Create با پارامترهای بالا؛ در صورت وجود Send. |
| DollarRate | رفع ۵۰۰ برای `update` و `set`؛ پشتیبانی حالت دستی/اتوماتیک. |
| ContactUs | به‌روزرسانی واقعی `isRead` در دیتابیس در `mark-read/{id}`. |
| وبلاگ | آپلود تصویر بعد از ساخت؛ رفع ۵۰۰ برای `Blog/update/{id}` با Body بالا. |

---

*این سند بر اساس کد فرانت و استفاده واقعی از APIها تهیه شده است. در صورت تفاوت قرارداد فعلی سرور، هماهنگی با فرانت لازم است.*
