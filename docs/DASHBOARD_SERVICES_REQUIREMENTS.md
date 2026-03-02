# نیازمندی‌های سرویس داشبورد — فهرست کامل برای پیاده‌سازی

این سند تمام بخش‌های داشبورد را که نیاز به اتصال سرویس/API دارند، با دقت و حساسیت بالا فهرست می‌کند. برای هر بخش: مسیر، وضعیت فعلی، سرویس مورد نیاز و اقدامات لازم مشخص شده است.

---

## نمادها

| نماد | معنی |
|------|------|
| ✅ | سرویس متصل است |
| ⚠️ | سرویس وجود دارد ولی اتصال ناقص است |
| ❌ | نیاز به سرویس/اتصال جدید |

---

## ۱. صفحه اصلی داشبورد (`/dashboard`)

| کامپوننت | وضعیت | سرویس | توضیحات |
|----------|--------|-------|---------|
| OverviewCards | ✅ | `userDashboardService.getSummary()` | متصل |
| RecentOrders | ✅ | `userDashboardService.getRecentOrders(5)` | متصل |
| SupportTickets | ✅ | `userDashboardService.getRecentTickets(5)` | متصل |
| CurrencyRates | ✅ | `userDashboardService.getCurrencyRates()` | متصل |

**اقدام:** هیچ — همه متصل هستند.

---

## ۲. آدرس‌های من (`/dashboard/account/addresses`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `mockAddresses` از `@/data` |
| سرویس موجود | ✅ | `userAddressService` |

**اقدامات لازم:**

1. **صفحه:** `src/app/dashboard/account/addresses/page.js`
   - حذف `import { mockAddresses } from "@/data"`
   - استفاده از `userAddressService.getAddresses(userId)` در `useEffect`
   - جایگزینی `useAddresses(mockAddresses)` با منطق مبتنی بر API:
     - `addAddress` → `userAddressService.createAddress(userId, body)`
     - `updateAddress` → `userAddressService.updateAddress(userId, id, body)`
     - `deleteAddress` → `userAddressService.deleteAddress(userId, id)`
     - `setDefaultAddress` → `userAddressService.setDefaultAddress(userId, addressId)`

2. **کامپوننت:** `src/template/Dashboard/Addresses/AddressesList.js`
   - حذف `mockAddresses` از import ها

3. **کامپوننت:** `src/template/Dashboard/OrderDetail/DeliveryAddressCard.js`
   - حذف `mockAddresses` و استفاده از آدرس‌های برگشتی از API سفارش یا `userAddressService.getDefaultAddress(userId)`

**APIهای مورد نیاز:** `UserAddress/GetUserAddresses`, `CreateAddress`, `update/{id}`, `delete/{id}`, `SetDefaultAddress`

---

## ۳. پروفایل کاربری (`/dashboard/account/profile`)

### ۳.۱ BasicInfoCard

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `initialData` ثابت داخل کامپوننت |
| فیلدها | نام، تلفن، ایمیل، کد ملی، آواتار، وضعیت احراز، تاریخ عضویت |

**اقدامات:** ایجاد/استفاده از `userService` یا `profileService`:
- `GET` پروفایل کاربر جاری (مثلاً `Users/GetProfile` یا `Users/GetUserById`)
- `POST` ویرایش پروفایل (مثلاً `Users/UpdateUser` یا `Users/UpdateProfile`)
- `Users/UploadProfileImage` برای آواتار

**فایل:** `src/template/Dashboard/Profile/BasicInfo/BasicInfoCard.js`

---

### ۳.۲ SecurityCard

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `securityData` ثابت |
| فیلدها | رمز عبور، تأیید دو مرحله‌ای، دستگاه‌های متصل، آخرین تغییر رمز |

**اقدامات:**
- API برای دریافت وضعیت امنیت کاربر
- API برای تغییر رمز عبور
- API برای فعال/غیرفعال کردن 2FA
- ConnectedDevicesModal: `initialDevices` ثابت → نیاز به API لیست دستگاه‌های متصل و حذف دستگاه

**فایل‌ها:** `SecurityCard.js`, `EditSecurityModal.js`, `ConnectedDevicesModal.js`

---

### ۳.۳ FinancialInfoCard

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `financialData` ثابت (شبا، کارت بانکی) |

**اقدامات:** API برای دریافت و ذخیره اطلاعات مالی کاربر (شبا، کارت بانکی) — با احتیاط امنیتی بالا.

**فایل:** `src/template/Dashboard/Profile/Financial/FinancialInfoCard.js`

---

### ۳.۴ NotificationSettingsCard

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `notificationData` ثابت |

**اقدامات:** API برای دریافت و ذخیره تنظیمات نوتیفیکیشن (نوع اعلان، روش دریافت، اتصال تلگرام).

**فایل:** `src/template/Dashboard/Profile/Notification/NotificationSettingsCard.js`

---

## ۴. نظرات من (`/dashboard/account/comments`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `initialComments` از `@/data` |
| سرویس موجود | ✅ | `productReviewService.getByUserId(userId)` |

**اقدامات:**
- در `src/app/dashboard/account/comments/page.js`:
  - حذف `initialComments`
  - در `useEffect` فراخوانی `productReviewService.getByUserId(userId)` و ست کردن `comments`
  - اعمال فیلترها (`sortBy`, `status`) روی داده‌ها یا در API در صورت وجود

**فایل:** `src/app/dashboard/account/comments/page.js`

---

## ۵. مرکز پیام (`/dashboard/account/messages`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `initialMessages` از `@/data` |
| سرویس | ❌ | سرویس پیام در پروژه وجود ندارد |

**اقدامات:**
- تعریف یا پیاده‌سازی سرویس پیام (مثلاً `messageService` یا `userMessageService`)
- API برای لیست پیام‌های کاربر با فیلترها
- اعمال فیلترها: `sortBy`, `messageType`, `searchQuery`, `dateRange`

**فایل:** `src/app/dashboard/account/messages/page.js`

---

## ۶. دعوت دوستان (`/dashboard/account/invite`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `invitedFriends`, `referralCode`, `referralLink` ثابت |
| سرویس | ❌ | سرویس referral/invite وجود ندارد |

**اقدامات:**
- ایجاد سرویس referral (مثلاً `referralService` یا `inviteService`)
- API برای لیست دوستان دعوت‌شده
- API برای دریافت کد و لینک دعوت کاربر
- API برای اشتراک‌گذاری (در صورت نیاز)

**فایل:** `src/app/dashboard/account/invite/page.js`

---

## ۷. خدمات ارزی (`/dashboard/currency-services`)

### ۷.۱ لیست درخواست‌ها

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `initialRequests` از `@/data` |
| سرویس موجود | ✅ | `currencyService.getPaginated` |

**اقدامات:**
- در `src/app/dashboard/currency-services/page.js`:
  - حذف `initialRequests`
  - فراخوانی `currencyService.getPaginated({ userId, pageNumber, pageSize, status, serviceType, searchTerm })` با `userId` کاربر جاری
  - اعمال فیلترها: `dateRange`, `status`, `serviceType`, `searchQuery`

**فایل:** `src/app/dashboard/currency-services/page.js`

---

### ۷.۲ احراز هویت (IdentityVerification)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `verificationData` ثابت (موبایل، کد ملی) |

**اقدامات:** API برای وضعیت احراز هویت کاربر و دکمه «تکمیل احراز هویت».

**فایل:** `src/template/Dashboard/CurrencyServices/IdentityVerification.js`

---

### ۷.۳ ثبت درخواست جدید (`/dashboard/currency-services/new-request`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| فرم | `CurrencyPaymentForm` | `onSubmit` فقط `console.log` |
| سرویس موجود | ✅ | `currencyService.create` |

**اقدامات:**
- در `CurrencyPaymentForm`:
  - اتصال `onSubmit` به `currencyService.create(data)`
  - ارسال و ارزها به صورت داینامیک از API (مثلاً `currencyRateService` یا `currencyService`)
- ارزها و سرویس‌ها در حال حاضر ثابت هستند: `currencies`, `services` — باید از API بیایند.

**فایل:** `src/template/CurrencyServices/CurrencyPayment.js`

---

## ۸. درخواست‌های مرجوعی (`/dashboard/return-requests`)

### ۸.۱ لیست مرجوعی‌ها

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `initialReturns`, `activeReturn` از `@/data` |
| سرویس موجود | ✅ | `returnRequestService.getMyReturnRequests(userId)` |

**اقدامات:**
- در `src/app/dashboard/return-requests/page.js`:
  - حذف `initialReturns` و `activeReturn`
  - فراخوانی `returnRequestService.getMyReturnRequests(userId)` در `useEffect`
  - نگاشت وضعیت‌ها به `ReturnRequestStatus`
  - `handleCancelReturn` → `returnRequestService` (در صورت وجود endpoint لغو)

**فایل:** `src/app/dashboard/return-requests/page.js`

---

### ۸.۲ ثبت مرجوعی جدید (`/dashboard/return-requests/new`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `mockOrders` از `@/data` برای انتخاب سفارش |
| سرویس موجود | ✅ | `returnRequestService.create`, `orderService.getUserOrders` |

**اقدامات:**
- در `NewReturnRequest`:
  - جایگزینی `mockOrders` با `orderService.getUserOrders(userId)` برای انتخاب سفارش
  - اتصال فرم به `returnRequestService.create(data, files)` با آپلود فایل

**فایل:** `src/template/Dashboard/ReturnRequests/NewReturnRequest/index.js`

---

## ۹. قفل قیمت (`/dashboard/price-lock`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `ACTIVE_LOCKS`, `HISTORY_LOCKS` ثابت |
| سرویس | ⚠️ | `priceAlertService` وجود دارد — بررسی سازگاری با قفل قیمت |

**اقدامات:**
- بررسی وجود API قفل قیمت (Price Lock) در بک‌اند
- در صورت وجود: ایجاد سرویس و اتصال لیست قفل‌های فعال و تاریخچه
- `handleSubmitNewLock` → API ثبت قفل جدید
- `handleCancelLock` → API لغو قفل
- `NewPriceLockModal`: mock محصول — استفاده از `productService.search` یا `searchAmazon`

**فایل‌ها:** `src/app/dashboard/price-lock/page.js`, `NewPriceLockModal.js`

---

## ۱۰. خرید اختصاصی از آمازون (`/dashboard/exclusive-amazon`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `INITIAL_ORDERS` ثابت |
| InfoCardsSection | ❌ | `INFO_CARDS` ثابت (وضعیت حساب، سقف سفارش، ...) |

**اقدامات:**
- API برای لیست سفارش‌های اختصاصی کاربر
- API برای کارت‌های اطلاعاتی (وضعیت VIP، سقف سفارش، ...)
- صفحه جدید سفارش: `/dashboard/exclusive-amazon/new-order` — نیاز به API ثبت سفارش اختصاصی

**فایل‌ها:** `src/app/dashboard/exclusive-amazon/page.js`, `InfoCardsSection.js`, `new-order/page.js`

---

## ۱۱. خریدهای من (`/dashboard/purchases`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `products` از `@/data` |
| سرویس | ❌ | سرویس خرید/پرداخت‌شده وجود ندارد |

**اقدامات:**
- API برای لیست محصولات خریداری‌شده کاربر (مثلاً از سفارش‌ها یا جدول خرید)
- اعمال فیلترها: `sortBy`, `dateFilter`, `searchQuery`

**فایل:** `src/app/dashboard/purchases/page.js`

---

## ۱۲. کیف پول (`/dashboard/wallet`)

### ۱۲.۱ لیست و وضعیت

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ✅ | `userWalletService.getWalletWithTransactions(userId)` |

**اقدام:** هیچ — متصل است.

---

### ۱۲.۲ شارژ کیف پول (RechargeModal)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `handleSubmit` فقط `onClose()` بدون API |
| سرویس موجود | ✅ | `userWalletService.requestChargeWallet(userId, { amount, description })` |

**اقدامات:**
- در `RechargeModal`:
  - فراخوانی `userWalletService.requestChargeWallet(userId, { amount, description })`
  - هدایت کاربر به `data.paymentUrl` برای پرداخت
  - callback پس از پرداخت از طریق `api/Payment/verify-wallet`

**فایل:** `src/template/Dashboard/Wallet/RechargeModal.js`

---

### ۱۲.۳ برداشت از کیف پول (WithdrawModal)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `shabaNumbers` ثابت، `handleSubmit` بدون API |
| سرویس | ❌ | endpoint برداشت در `userWalletService` وجود ندارد |

**اقدامات:**
- تعریف API درخواست برداشت (مثلاً `UserWallet/RequestWithdraw`)
- لیست شباهای کاربر از `userAddressService` یا API جداگانه‌ی اطلاعات بانکی
- اتصال فرم به API درخواست برداشت

**فایل:** `src/template/Dashboard/Wallet/WithdrawModal.js`

---

## ۱۳. سفارش‌ها (`/dashboard/orders`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ✅ | `orderService.getUserOrders(userId)` |

**اقدام:** هیچ — متصل است.

**نکته:** `handleDownloadInvoice` و `handleSecondPayment` فعلاً فقط toast هستند — در صورت نیاز به API باید پیاده‌سازی شوند.

---

## ۱۴. فاکتورها (`/dashboard/invoices`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ✅ | `invoiceService.getUserInvoices`, `getUserInvoicesByStatus` |

**اقدام:** هیچ — متصل است.

---

## ۱۵. پشتیبانی (`/dashboard/support`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| لیست تیکت‌ها | ✅ | `ticketService.getPaginated` |
| ایجاد تیکت | ✅ | `ticketService.create` |
| حذف تیکت | ✅ | `ticketService.softDelete` |
| دسته‌بندی‌ها | ✅ | `ticketCategoryService.getActive` |

**اقدام:** هیچ — متصل است.

---

## ۱۶. جزئیات تیکت (`/dashboard/support/[ticketId]`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ✅ | `ticketService.getTicketWithMessages` |
| ارسال پیام | ✅ | `ticketService.addMessage` |

**اقدام:** هیچ — متصل است.

---

## ۱۷. علاقه‌مندی‌ها (`/dashboard/favorites`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ✅ | `userWishlistService.getWishlist` |
| حذف | ✅ | `userWishlistService.delete` |
| افزودن | ✅ | `userWishlistService.addToWishlist` |

**اقدام:** هیچ — متصل است.

---

## ۱۸. بازدیدهای اخیر (`/dashboard/recent-views`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ✅ | `userRecentViewService.getRecentViews` |
| حذف | ✅ | `userRecentViewService.delete` |
| حذف همه | ✅ | `userRecentViewService.clear` |

**اقدام:** هیچ — متصل است.

---

## ۱۹. مقایسه محصولات (`/dashboard/compare`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ✅ | `compareService.data` |
| حذف محصول | ✅ | `compareService.remove` |
| حذف مقایسه | ✅ | `compareService.clear` |

**اقدام:** هیچ — متصل است.

---

## ۲۰. مقایسه‌های ذخیره شده (`/dashboard/comparisons`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| منبع داده | ❌ | `initialComparisons` از `@/data` |
| سرویس موجود | ⚠️ | `compareService.list` — ساختار خروجی باید با UI سازگار شود |

**اقدامات:**
- فراخوانی `compareService.list({ userId })` در `useEffect`
- نگاشت `data` به `comparisons` مطابق با `ComparisonCard`
- اگر API فقط یک مقایسه فعال برمی‌گرداند، این صفحه ممکن است نیاز به طراحی متفاوت داشته باشد

**فایل:** `src/app/dashboard/comparisons/page.js`

---

## ۲۱. اعلان‌ها (`/dashboard/notifications`)

| مورد | وضعیت | توضیحات |
|------|--------|---------|
| لیست | ✅ | `notificationService.getNotifications` |
| حذف | ✅ | `notificationService.delete` |
| علامت‌گذاری همه | ✅ | `notificationService.markAllAsRead` |
| حذف همه | ⚠️ | `handleDeleteAllConfirm` فقط state را خالی می‌کند، API فراخوانی نمی‌شود |

**اقدامات:**
- بررسی وجود `notificationService.deleteAll` یا مشابه
- در صورت وجود، اتصال `handleDeleteAllConfirm` به آن

**فایل:** `src/template/Dashboard/Notifications/NotificationsList.js`

---

## ۲۲. خلاصه اولویت‌ها

| اولویت | بخش | سختی |
|--------|------|------|
| ۱ | آدرس‌ها — سرویس آماده است | آسان |
| ۲ | نظرات — سرویس آماده است | آسان |
| ۳ | خدمات ارزی — لیست + فرم ثبت | متوسط |
| ۴ | درخواست‌های مرجوعی | متوسط |
| ۵ | شارژ کیف پول | آسان |
| ۶ | پروفایل (اطلاعات اصلی، امنیت، مالی، نوتیفیکیشن) | متوسط |
| ۷ | مرکز پیام — نیاز به سرویس جدید | سخت |
| ۸ | دعوت دوستان — نیاز به سرویس جدید | سخت |
| ۹ | قفل قیمت | متوسط |
| ۱۰ | خرید اختصاصی آمازون | سخت |
| ۱۱ | خریدهای من | متوسط |
| ۱۲ | برداشت کیف پول | متوسط |
| ۱۳ | مقایسه‌های ذخیره شده | آسان |
| ۱۴ | احراز هویت خدمات ارزی | متوسط |

---

## ۲۳. سرویس‌های موجود در پروژه

| سرویس | مسیر | استفاده |
|-------|------|---------|
| userAddressService | `@/services/userAddress/userAddressService` | آدرس‌ها |
| userService | `@/services/user/userService` | پروفایل |
| productReviewService | `@/services/review/productReviewService` | نظرات |
| currencyService | `@/services/currency/currencyService` | خدمات ارزی |
| returnRequestService | `@/services/returnRequest/returnRequestService` | مرجوعی |
| orderService | `@/services/order/orderService` | سفارش‌ها |
| userWalletService | `@/services/userWallet/userWalletService` | کیف پول |
| invoiceService | `@/services/invoice/invoiceService` | فاکتورها |
| ticketService | `@/services/ticket/ticketService` | تیکت |
| ticketCategoryService | `@/services/ticket/ticketCategoryService` | دسته‌بندی تیکت |
| userWishlistService | `@/services/userWishlist/userWishlistService` | علاقه‌مندی‌ها |
| userRecentViewService | `@/services/userRecentView/userRecentViewService` | بازدیدهای اخیر |
| compareService | `@/services/compare/compareService` | مقایسه |
| notificationService | `@/services/notification/notificationService` | اعلان‌ها |
| userDashboardService | `@/services/userDashboard/userDashboardService` | داشبورد اصلی |
| productService | `@/services/product/productService` | محصولات |
| priceAlertService | `@/services/priceAlert/priceAlertService` | هشدار قیمت |

---

**تاریخ تهیه:** ۱۴۰۴/۱۲/۰۷  
**نسخه:** ۱.۰
