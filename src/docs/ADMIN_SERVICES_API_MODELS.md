# الگو و مدل سرویس‌های پنل ادمین (API Contract)

این سند برای هر سرویسی که در پنل ادمین استفاده می‌شود (یا باید استفاده شود)، **مسیر، متد، پارامترها و شکل پاسخ** را به‌صورت واضح تعریف می‌کند تا فرانت و بک‌اند یکسان کار کنند. همهٔ درخواست‌ها با هدر `Authorization: Bearer {accessToken}` ارسال می‌شوند مگر خلاف آن ذکر شده باشد.

**پایهٔ API:** `API_BASE_URL` (مثلاً `https://micrls.com/api` یا از `NEXT_PUBLIC_API_URL`).

**پاسخ استاندارد (JSON):**  
`{ "statusCode": number, "success": boolean, "message": string | null, "data": T }`  
در فرانت معمولاً از `response.data` یا `unwrapApiData(response)` استفاده می‌شود.

---

## ۱. کاربران (Users) — `userService`

| متد | مسیر | Query | Body | پاسخ موردانتظار (data یا محتوای لیست) |
|-----|------|--------|------|----------------------------------------|
| GET | `Users/GetUsersWithFilters` | `pageNumber`, `pageSize`, `searchTerm?`, `roleName?`, `isActive?`, `isBanned?`, `createdFrom?`, `createdTo?`, `sortBy?`, `sortDescending?` | — | `{ users: UserItem[], totalCount?: number, totalPages?: number }` — هر آیتم: `id`, `fullName`/`name`, `email`, `phoneNumber`, `roleName`/`role`, `isActive`, `createdAt` و موارد موردنیاز جدول |
| GET | `Users/GetUserDetailForAdmin?id={id}` | `id` | — | شیء جزئیات کاربر برای فرم ویرایش و نمایش (نام، ایمیل، تلفن، نقش، وضعیت، کیف پول و…) |
| PUT | `Users/AdminUpdateUser?id={id}` | `id` | `{ fullName?, email?, phoneNumber?, roleName?, isActive?, ... }` | استاندارد؛ فرانت بعد از موفقیت همان صفحه را refetch می‌کند |
| POST | `Users/AdminChangePassword?id={id}` | `id` | `{ newPassword, confirmPassword? }` | استاندارد؛ فرانت فقط موفقیت/خطا را چک می‌کند |

---

## ۲. نقش‌ها (Role) — `roleService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Role/GetRolesWithFilters` | `pageNumber`, `pageSize`, `searchTerm?`, `isActive?`, `createdFrom?`, `createdTo?`, `sortBy?`, `sortDescending?` | — | `{ roles: RoleItem[], totalCount?, totalPages? }` — هر نقش: `id`, `name`, `description`, `isActive`, `createdAt` |
| GET | `Role/GetRoleDetailForAdmin?id={id}` | `id` | — | شیء کامل نقش (برای صفحه جزئیات و فرم ویرایش) |
| POST | `Role/CreateRole` | — | `{ name: string, description: string }` | استاندارد؛ فرانت لیست را دوباره می‌گیرد |
| PUT | `Role/UpdateRole?id={id}` | `id` | `{ name?, description?, isActive? }` | استاندارد |
| DELETE | `Role/DeleteRole?id={id}` | `id` | — | استاندارد |

---

## ۳. سفارش (Order) — `orderService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Order/GetAllOrders` | — | — | آرایهٔ سفارش‌ها (یا داخل `data`) — هر آیتم: `id`, `orderNumber`, `customerName`/`userFullName`, `itemsCount`/`itemCount`, `totalAmount`, `status`, `paymentStatus`, `createdAt` |
| GET | `Order/GetOrdersByStatus?status={status}` | `status` (عدد) | — | همان ساختار لیست |
| GET | `Order/GetOrderById?orderId={id}` | `orderId` | — | شیء جزئیات سفارش (برای صفحه جزئیات ادمین در صورت وجود) |

**نکته:** صفحه لیست ادمین از `getPaginated` استفاده می‌کند که داخلیاً `getAllOrders` یا `getOrdersByStatus` را صدا می‌زند و برمی‌گرداند:  
`{ success: true, data: { orders: [], totalPages } }`.

---

## ۴. محصول (Product) — `productService` و `adminProductService`

### productService (ادمین)

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Product/GetPaginated` | `pageNumber`, `pageSize`, `categoryId?`, `brandId?`, `status?`, `searchTerm?`, `minPrice?`, `maxPrice?`, `sortBy?`, `sortDescending?` | — | `{ products: ProductItem[], totalCount?, totalPages?, pageNumber?, pageSize? }` |
| GET | `Product/GetById?id={id}` | `id` | — | شیء محصول برای فرم ویرایش |
| POST | `Product/Create` | — | شیء ایجاد محصول (نام، دسته، برند، قیمت، موجودی، وضعیت و…) | استاندارد |
| PUT | `Product/Update?id={id}` | `id` | همان فیلدهای قابل ویرایش | استاندارد |
| DELETE | `Product/SoftDelete?id={id}` | `id` | — | استاندارد |

### adminProductService

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| POST | `admin/products/add-by-link` | — | `AddProductByLinkRequest`: `amazonUrl?`, `productData` (شامل `asin`/`Asin`), `isFullStored?`, `categoryId?`, `subCategoryId?` | استاندارد؛ فرانت از `unwrapApiData` استفاده می‌کند |
| POST | `admin/products/bulk-import` | — | `BulkImportRequest`: `searchTerms: string[]`, `categoryId?`, `subCategoryId?`, `isFullStored?`, `maxProductsPerSearch?`, `delayBetweenSearches?` | `data.jobId` برای پیگیری وضعیت |
| GET | `admin/products/bulk-import/{jobId}/status` | — | — | `data`: `{ state, createdAt?, ... }` |
| POST | `admin/products/seed-test-data?count={n}` | `count` (۱–۵۰) | — | `data.createdCount` (بدون توکن در سورس فعلی) |

---

## ۵. دسته و برند محصول — `productCategoryService`, `productBrandService`

| سرویس | متد | مسیر | Query/Body | پاسخ موردانتظار |
|--------|-----|------|------------|------------------|
| productCategoryService | GET | `ProductCategory/GetAll` | — | آرایهٔ دسته‌ها: `id`, `name`, ... |
| productCategoryService | DELETE | `ProductCategory/SoftDelete?id={id}` | `id` | استاندارد |
| productBrandService | GET | `ProductBrand/GetAll` | — | آرایهٔ برندها: `id`, `name`, `slug`, `isActive`, `createdAt` |
| productBrandService | GET | `ProductBrand/GetActive` | — | فقط برندهای فعال برای فیلترها/کمبوباکس‌ها |
| productBrandService | GET | `ProductBrand/GetById?id={id}` | `id` | یک برند برای فرم ویرایش |
| productBrandService | POST | `ProductBrand/Create` | `{ name, slug, isActive }` | ایجاد برند جدید |
| productBrandService | PUT | `ProductBrand/Update?id={id}` | `id`, `{ name?, slug?, isActive? }` | ویرایش برند؛ فقط فیلدهای موجود آپدیت می‌شوند؛ `UpdatedAt` هم ست می‌شود |
| productBrandService | DELETE | `ProductBrand/Delete?id={id}` | `id` | حذف نرم برند |

---

## ۶. گزارش فروش (Report) — `reportService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Report/GetSalesReport` | `startDate?`, `endDate?`, `groupBy?` | — | `data`: `{ totalSales?, totalOrders?, ... }` — فرانت از `totalSales`, `totalOrders` برای گزارش فروش استفاده می‌کند |
| GET | `Report/GetUsersReport` | `startDate?`, `endDate?` | — | برای صفحه گزارش کاربران — پیشنهاد مدل: `{ totalUsers?, activeUsers?, newUsersThisMonth? }` |
| GET | `Report/GetProductsReport` | `startDate?`, `endDate?`, `categoryId?` | — | برای صفحه گزارش محصولات — پیشنهاد: `{ totalProducts?, soldCount?, topSellingCount? }` |
| GET | `Report/GetFinancialReport` | `startDate?`, `endDate?` | — | برای صفحه گزارش مالی — پیشنهاد: `{ totalRevenue?, totalCosts?, netProfit? }` |

**توجه:** صفحات `/admin/reports/users`, `/admin/reports/products`, `/admin/reports/financial` الان اعداد ثابت دارند؛ با پیاده‌سازی همین اندپوینت‌ها و برگرداندن مدل بالا می‌توان فرانت را متصل کرد.

---

## ۷. امنیت (Security) — `securityService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Security/GetLogs` | `pageNumber`, `pageSize`, `level?`, `startDate?`, `endDate?` | — | `data`: `{ logs: LogItem[], totalPages? }` — هر لاگ: `id`, `level`, `message`, `timestamp`, ... |
| GET | `Security/GetPermissions` | — | — | لیست/درخت دسترسی‌ها (صفحه دسترسی‌ها هنوز بدون اتصال است) |
| GET | `Security/GetAdmins` | `pageNumber`, `pageSize`, `searchTerm?` | — | `data`: `{ admins: AdminItem[], totalCount?, totalPages? }` — هر ادمین: `id`, `name`, `email`, `role`, `isActive`, `profileImage?` (URL کامل یا `\"\"`) — **صفحه ادمین‌ها الان با این اندپوینت متصل شده و برای آواتار از `profileImage` استفاده می‌کند.** |
| POST | `Security/CreateAdmin` | — | `{ name, email, password?, roleId? }` | استاندارد |
| PUT | `Security/UpdateAdmin?id={id}` | `id` | فیلدهای قابل ویرایش | استاندارد |
| DELETE | `Security/DeleteAdmin?id={id}` | `id` | — | استاندارد |

---

## ۸. تخفیف (DiscountCode) — `discountService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `DiscountCode/GetDiscountCodesPaginated` | `pageNumber`, `pageSize`, `status?`, `searchTerm?` | — | `data`: `{ discounts: DiscountItem[], totalPages? }` |
| POST | `DiscountCode/CreateDiscountCode` | — | شیء کوپن (کد، نوع، مقدار، حداقل خرید، تاریخ شروع/پایان، محدودیت استفاده و…) | استاندارد |

**تخفیف ویژه (Special):** صفحه `/admin/discounts/special` الان موک دارد. در صورت وجود اندپوینت جدا (مثلاً `DiscountCode/GetSpecialPaginated` یا همان لیست با فیلتر نوع)، مدل هر آیتم می‌تواند مشابه موک باشد: `id`, `code`, `type`, `value`, `minPurchase`, `maxDiscount`, `usageLimit`, `used`, `status`, `startDate`, `endDate`.

---

## ۹. ارسال (Shipping) — `shippingService`

| متد | مسیر | Query/Body | پاسخ موردانتظار |
|-----|------|------------|------------------|
| GET | `Shipping/GetMethods` | — | `data`: آرایهٔ روش‌های ارسال |
| GET | `Shipping/GetZones` | — | `data`: آرایهٔ مناطق |

**گزارش ارسال:** صفحه `/admin/shipping/reports` اعداد ثابت دارد. پیشنهاد اندپوینت:  
`GET Report/GetShippingReport` یا مشابه با پاسخ: `{ totalShipments?, successfulShipments?, inTransit? }`.

---

## ۱۰. موجودی انبار (Inventory) — `inventoryService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Inventory/GetPaginated` | `pageNumber`, `pageSize`, `status?`, `searchTerm?` | — | `data`: `{ items: InventoryItem[], totalCount?, totalPages? }` |
| POST | `Inventory/StockIn` | — | `{ productId?, quantity?, reason?, ... }` | استاندارد — برای صفحه ورود کالا |
| POST | `Inventory/StockOut` | — | `{ productId?, quantity?, reason?, ... }` | استاندارد — برای صفحه خروج کالا |

**گزارش موجودی:** صفحه `/admin/inventory/reports` اعداد ثابت دارد. پیشنهاد:  
`GET Report/GetInventoryReport` با پاسخ: `{ totalStock?, lowStockCount?, outOfStockCount? }`.

---

## ۱۱. تنظیمات (Settings) — `settingsService`

| متد | مسیر | Body | پاسخ موردانتظار |
|-----|------|------|------------------|
| GET | `Settings/GetGeneral` | — | `data`: `{ siteName?, siteDescription?, siteUrl?, adminEmail?, phoneNumber?, address? }` |
| PUT | `Settings/UpdateGeneral` | همان فیلدها | استاندارد |
| GET | `Settings/GetPayment` | — | شیء تنظیمات درگاه |
| PUT | `Settings/UpdatePayment` | همان فیلدها | استاندارد |
| GET | `Settings/GetShipping` | — | شیء تنظیمات ارسال |
| PUT | `Settings/UpdateShipping` | همان فیلدها | استاندارد |
| GET | `Settings/GetEmail` | — | `data`: `{ smtpHost?, smtpPort?, smtpUser?, fromEmail?, fromName? }` |
| PUT | `Settings/UpdateEmail` | همان فیلدها | استاندارد |

---

## ۱۲. قیمت‌گذاری ادمین (Pricing) — `pricingSettingsApi`

| متد | مسیر | Body | پاسخ موردانتظار |
|-----|------|------|------------------|
| GET | `admin/pricing/settings` | — | `unwrapApiData` → شیء تنظیمات (درصد سود، هزینه حمل، قوانین و…) |
| PUT | `admin/pricing/settings` | شیء به‌روزرسانی | استاندارد |

---

## ۱۳. ارتباط با ما (ContactUs) — `contactService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `ContactUs/GetPaginated` | `pageNumber`, `pageSize`, `isRead?`, `searchTerm?` | — | `data`: `{ contacts: ContactItem[], totalPages?, totalCount? }` |
| GET | `ContactUs/GetById?id={id}` | `id` | — | شیء یک درخواست |
| GET | `ContactUs/GetUnreadCount` | — | — | `data`: عدد (تعداد خوانده‌نشده) |
| POST | `ContactUs/mark-read/{id}` | — | — | استاندارد |

---

## ۱۴. تیکت ادمین (AdminTicket) — `adminTicketService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| POST | `AdminTicket/Search` | — | `{ pageNumber?, pageSize?, status?, priority?, categoryId?, searchTerm?, startDate?, endDate?, sortBy?, sortColumn? }` | `data`: `{ tickets: TicketItem[], totalCount?, totalPages? }` |
| GET | `AdminTicket/{ticketId}/GetMessages` | — | — | `data`: آرایهٔ پیام‌ها — هر پیام: `id`, `message`, `messageType` (۲=ادمین)، `sender`, `createdAt` |
| POST | `AdminTicket/{ticketId}/AddMessage` | — | `{ message, isInternal?, attachmentUrl? }` | استاندارد |
| POST | `AdminTicket/CloseTicket?id={id}` | `id`, `reason?` | — | استاندارد |
| POST | `AdminTicket/ReopenTicket?id={id}` | `id` | — | استاندارد |

---

## ۱۵. دسته‌بندی تیکت (TicketCategory) — `ticketCategoryService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `TicketCategory/GetAll` | — | — | آرایهٔ دسته‌ها: `id`, `name`, `description`, `isActive` |
| POST | `TicketCategory/Create` | — | `{ name, description?, isActive? }` | استاندارد |
| POST | `TicketCategory/update/{id}` | — | `{ name?, description?, isActive? }` | استاندارد |
| POST | `TicketCategory/delete/{id}` | — | — | استاندارد (soft delete) |

---

## ۱۶. بلاگ (Blog, BlogCategory, BlogTag) — `blogService`, `blogCategoryService`, `blogTagService`

| سرویس | متد | مسیر | Query/Body | پاسخ موردانتظار |
|--------|-----|------|------------|------------------|
| blogService | GET | `Blog/GetPaginated` | `pageNumber`, `pageSize`, `status?`, `categoryId?`, `searchTerm?`, ... | `data`: `{ posts?: [], items?: [], totalCount?, totalPages? }` |
| blogService | GET | `Blog/GetById?id={id}` | `id` | شیء پست برای ویرایش |
| blogService | POST | `Blog/Create` | شیء پست | استاندارد |
| blogService | POST | `Blog/update/{id}` | شیء به‌روزرسانی | استاندارد |
| blogService | POST | `Blog/delete/{id}` | — | استاندارد (soft delete) |
| blogCategoryService | GET | `BlogCategory/GetAll` | — | آرایهٔ دسته‌ها |
| blogCategoryService | POST | `BlogCategory/Create` | `{ name, slug?, description? }` | استاندارد |
| blogCategoryService | POST | `BlogCategory/update/{id}` | همان فیلدها | استاندارد |
| blogCategoryService | POST | `BlogCategory/delete/{id}` | — | استاندارد |
| blogTagService | GET | `BlogTag/GetAll` | — | آرایهٔ تگ‌ها |
| blogTagService | POST | `BlogTag/Create` | `{ name, slug? }` | استاندارد |
| blogTagService | POST | `BlogTag/update/{id}` | همان فیلدها | استاندارد |
| blogTagService | POST | `BlogTag/delete/{id}` | — | استاندارد |

---

## ۱۷. نظرات (Review) — `reviewService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Review/GetPaginated` | `pageNumber`, `pageSize`, `status?`, `productId?`, `searchTerm?` | — | `data`: `{ reviews: ReviewItem[], totalCount?, totalPages? }` |
| POST | `Review/Approve?id={id}` | `id` | — | استاندارد |
| POST | `Review/Reject?id={id}` | `id` | `{ reason? }` | استاندارد |

---

## ۱۸. اعلان (Notification) — `notificationService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Notification/GetNotifications` | `userId`, `pageNumber`, `pageSize`, `onlyUnread` | — | `data`: `{ notifications?: [], totalPages? }` — هر آیتم: `id`, `title`, `message`, `isRead`, `createdAt` |
| POST | `Notification/MarkAsRead` | `notificationId`, `userId` | — | استاندارد |

---

## ۱۹. درخواست مرجوعی (ReturnRequest) — `returnRequestService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `ReturnRequest/GetAll` | `pageNumber`, `pageSize`, `status?`, `userId?`, `orderId?` | — | `data`: آرایه یا `{ returnRequests?: [], totalCount?, totalPages? }` — هر آیتم: `id`, `returnNumber`, `orderNumber`, `customerName`/`userFullName`, `status`, ... |
| GET | `ReturnRequest/GetByStatus?status={status}` | `status` | — | همان ساختار لیست |
| POST | `ReturnRequest/Approve?returnRequestId={id}` | `returnRequestId` | `{ finalRefundAmount, adminNotes? }` | استاندارد |
| POST | `ReturnRequest/Reject?returnRequestId={id}` | `returnRequestId` | `{ rejectionReason }` | استاندارد |
| POST | `ReturnRequest/ProcessRefund` | — | `{ returnRequestId }` | استاندارد |

---

## ۲۰. بیمه ارسال ادمین (AdminShippingInsurance) — `adminShippingInsuranceService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `admin/AdminShippingInsurance` | `orderId?`, `userId?`, `status?` | — | `data`: آرایه — هر آیتم: `id`, `orderId`/`orderNumber`, `userId`, `coverageAmount`, `insuranceFee`, `status`/`statusName`, `purchasedAt`, `hasActiveClaim?`, `claimCount?` |
| PUT | `admin/AdminShippingInsurance/claims/{claimId}/process` | `adminUserId` (الزامی) | `ProcessClaimDto`: `{ status, approvedAmount?, adminNote?, rejectionReason? }` — وضعیت: ۱–۵ (مثلاً در انتظار، تأیید، رد، پرداخت شده) | استاندارد |

---

## ۲۱. سپر کیفیت ادمین (AdminQualityShield) — `adminQualityShieldService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `admin/AdminQualityShield` | `orderId?`, `userId?`, `status?` | — | `data`: آرایهٔ سرویس‌های سپر کیفیت |
| POST | `admin/AdminQualityShield/{serviceId}/start-inspection` | — | `{ inspectorName? }` | استاندارد |
| POST | `admin/AdminQualityShield/{serviceId}/complete-inspection` | — | `{ result: 1|2|3, inspectionNotes?, photoPath?, videoPath? }` — result: 1 Pass, 2 Fail, 3 Conditional | استاندارد |

---

## ۲۲. سرویس ارز (CurrencyService) — `currencyService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `CurrencyService/GetPaginated` | `pageNumber`, `pageSize`, `status?`, `serviceType?`, `userId?`, `searchTerm?` | — | `data`: `{ requests: RequestItem[], totalPages? }` — هر درخواست: `id`, `referenceNumber`, `serviceTypeName`, `status`, `processNotes?`, `rejectionReason?`, `completionNotes?` |
| POST | `CurrencyService/{requestId}/status` | — | `{ status, processNotes?, rejectionReason?, completionNotes?, referenceNumber? }` — status عدد (۱–۷ طبق مودال) | استاندارد |

---

## ۲۳. نرخ ارز (DollarRate, CurrencyRate) — `dollarRateService`, `currencyRateService`

| سرویس | متد | مسیر | Query/Body | پاسخ موردانتظار |
|--------|-----|------|------------|------------------|
| dollarRateService | GET | `DollarRate/current` | — | `data`: `{ rate, isManualRate?, lastUpdated? }` |
| dollarRateService | POST | `DollarRate/set` | `{ isManual: true, manualRate: number }` | استاندارد |
| dollarRateService | POST | `DollarRate/update` | `{ rate: number }` | استاندارد |
| dollarRateService | POST | `DollarRate/update-all` | — | استاندارد |
| currencyRateService | GET | `CurrencyRate/latest` | — | `data`: `{ rates?: Array<{ currency, currencyName?, rate, updatedAt? }> }` |
| currencyRateService | POST | `CurrencyRate/update` | `{ currency: string, rate: number }` | استاندارد |

---

## ۲۴. پرداخت (Payment) — `paymentService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `Payment/GetPaginated` | `pageNumber`, `pageSize`, `status?`, `method?`, `searchTerm?`, `startDate?`, `endDate?` | — | `data`: `{ payments: PaymentItem[], totalPages? }` — برای refunds فرانت فیلتر `status: "refund"` و از `payments` با `refundAmount`, `refundStatus` استفاده می‌کند |

---

## ۲۵. Rate Limit — `rateLimitService`

| متد | مسیر | Query | Body | پاسخ موردانتظار |
|-----|------|--------|------|------------------|
| GET | `RateLimit/GetPaginated` | `pageNumber`, `pageSize`, `searchTerm?`, `userId?` | — | `data`: `{ rateLimits: RateLimitItem[], totalPages? }` |
| POST | `RateLimit/Reset?id={id}` | `id` | — | استاندارد |

---

## ۲۶. آنالیتیکس ادمین — `adminAnalyticsService`

| متد | مسیر | Query | پاسخ موردانتظار |
|-----|------|--------|------------------|
| GET | `admin/analytics/summary` | — | `data`: خلاصه داشبورد (آمار کلی) |
| GET | `admin/analytics/user-stats` | — | `data`: آمار کاربران |
| GET | `admin/analytics/popular-search-terms` | `limit?` | `data`: آرایهٔ عبارت‌های پرجستجو |
| GET | `admin/analytics/no-result-searches` | `limit?` | `data`: آرایهٔ جستجوهای بدون نتیجه |
| GET | `admin/analytics/top-selling-products` | `limit?` | `data`: آرایهٔ محصولات پرفروش |

---

## خلاصه صفحات بدون اتصال و مدل پیشنهادی

| صفحه | اندپوینت پیشنهادی | مدل پاسخ پیشنهادی |
|------|-------------------|-------------------|
| `/admin/security/admins` | استفاده از `Security/GetAdmins` موجود | `data.admins[]`: `{ id, name, email, role, isActive }` |
| `/admin/security/permissions` | `Security/GetPermissions` + در صورت نیاز `Security/UpdatePermission` | درخت/لیست دسترسی‌ها |
| `/admin/discounts/special` | `DiscountCode/GetSpecialPaginated` یا فیلتر نوع در همان GetDiscountCodesPaginated | همان مدل موک فعلی (کد، نوع، مقدار، حداقل خرید، استفاده، وضعیت، تاریخ) |
| `/admin/reports/users` | `Report/GetUsersReport` | `data`: `{ totalUsers, activeUsers, newUsersThisMonth }` |
| `/admin/reports/financial` | `Report/GetFinancialReport` | `data`: `{ totalRevenue, totalCosts, netProfit }` |
| `/admin/reports/products` | `Report/GetProductsReport` | `data`: `{ totalProducts, soldCount, topSellingCount }` |
| `/admin/shipping/reports` | `Report/GetShippingReport` یا مشابه | `data`: `{ totalShipments, successfulShipments, inTransit }` |
| `/admin/inventory/stock-in` | `Inventory/StockIn` (موجود) | فقط اتصال فرم به همین اندپوینت با body مناسب |
| `/admin/inventory/stock-out` | `Inventory/StockOut` (موجود) | فقط اتصال فرم |
| `/admin/inventory/reports` | `Report/GetInventoryReport` | `data`: `{ totalStock, lowStockCount, outOfStockCount }` |
| `/admin/products/reports` | همان `Report/GetProductsReport` یا تفکیک | `data`: `{ totalProducts, activeCount, outOfStockCount }` |

---

*این سند الگو و مدل سرویس‌های پنل ادمین را برای اتصال یکسان فرانت و بک‌اند تعریف می‌کند. در صورت تغییر API، به‌روزرسانی این فایل و سند `ADMIN_PAGES_CONNECTION_STATUS.md` توصیه می‌شود.*
