# Dashboard API Audit (User Dashboard)

این سند یک لیست از **صفحات/مودال‌های داشبورد کاربر** و **سرویس‌ها/اندپوینت‌هایی** است که فراخوانی می‌کنند؛ برای ریشه‌یابی خطاهایی مثل `API notfound`.

> مبنا: کدهای `src/app/dashboard/**` و `src/template/Dashboard/**` و سرویس‌های `src/services/**`.

---

## نکتهٔ مهم: آدرس پایهٔ API

آدرس پایه از `NEXT_PUBLIC_API_URL` خوانده می‌شود؛ اگر ست نشده باشد پیش‌فرض `https://micrls.com/api` است:

- فایل: `src/services/api/client.js`
- متغیر: `API_BASE_URL`

اگر در لوکال `API notfound` می‌بینید، اول مطمئن شوید `.env.local` مقدار درست دارد (مثلاً `http://localhost:<port>/api` یا هر چی بک‌اند شماست).

---

## صفحات داشبورد (`src/app/dashboard`)

### `/dashboard/account/invite`
- **سرویس‌ها**: `referralService`
- **متدها**:
  - `referralService.getMyReferralInfo()`
  - `referralService.getInvitedFriends({ pageNumber, pageSize })`

### `/dashboard/account/messages`
- **سرویس‌ها**: `userMessageService`
- **متدها**:
  - `userMessageService.getMessages(params)`

### `/dashboard/account/addresses`
- **سرویس‌ها**: `userAddressService`
- **متدها**:
  - `getAddresses(userId)`
  - `createAddress(userId, body)`
  - `updateAddress(userId, addressId, body)`
  - `deleteAddress(userId, addressId)`
  - `setDefaultAddress(userId, addressId)`

### `/dashboard/account/profile`
- **سرویس‌ها**: `userService`, `userBankAccountService`
- **متدها**:
  - `userService.getProfile()`
  - `userService.getVerificationStatus()`
  - `userBankAccountService.getList()`

### `/dashboard/account/comments`
- **سرویس‌ها**: `productReviewService`
- **متدها**:
  - (در این صفحه با `unwrapApiData` کار می‌کند؛ برای جزئیات متدها فایل صفحه را ببینید)

### `/dashboard/purchases`
- **سرویس‌ها**: `userPurchaseService`
- **متدها**:
  - (با `unwrapApiData` کار می‌کند؛ متدها داخل فایل صفحه)

### `/dashboard/invoices`
- **سرویس‌ها**: `invoiceService`
- **متدها**:
  - `getUserInvoices(userId)`
  - `getUserInvoicesByStatus(userId, status)`

### `/dashboard/invoices/[invoiceId]`
- **سرویس‌ها**: `invoiceService`
- **متدها**:
  - `downloadInvoice({ invoiceId })`

### `/dashboard/orders`
- **سرویس‌ها**: `orderService`, `invoiceService`
- **متدها**:
  - `invoiceService.downloadInvoice({ orderId })` (دانلود فاکتور برای سفارش)
  - (بقیه فراخوانی‌ها داخل فایل صفحه)

### `/dashboard/orders/[orderId]`
- **سرویس‌ها**: `orderService`, `invoiceService`
- **متدها**:
  - `invoiceService.downloadInvoice({ orderId })`
  - `orderService.cancelOrder(orderId, { cancellationReason })`

### `/dashboard/support`
- **سرویس‌ها**: `ticketService`
- **متدها**:
  - `ticketService.getPaginated(params)`
  - `ticketService.create(payload)`
  - `ticketService.softDelete(ticketId)`

### `/dashboard/support/[ticketId]`
- **سرویس‌ها**: `ticketService`
- **متدها**:
  - `ticketService.getTicketWithMessages(ticketId)`
  - `ticketService.addMessage(payload)`

### `/dashboard/favorites`
- **سرویس‌ها**: `userWishlistService`
- **متدها**:
  - `userWishlistService.addToWishlist(userId, data)`
  - `userWishlistService.delete(userId, productId)`

### `/dashboard/recent-views`
- **سرویس‌ها**: `userRecentViewService`
- **متدها**:
  - `userRecentViewService.delete(userId, productId)`
  - `userRecentViewService.clear(userId)`

### `/dashboard/compare`
- **سرویس‌ها**: `compareService`
- **متدها**:
  - `compareService.remove({ productId, userId })`
  - `compareService.clear({ userId })`

### `/dashboard/comparisons`
- **سرویس‌ها**: `compareService`
- **متدها**:
  - (با `unwrapApiData` کار می‌کند؛ متدها داخل فایل صفحه)

### `/dashboard/currency-services`
- **سرویس‌ها**: `currencyService`
- **متدها**:
  - (با `unwrapApiData` کار می‌کند؛ متدها داخل فایل صفحه)

### `/dashboard/wallet`
- **سرویس‌ها**: `userWalletService`
- **متدها**:
  - (متدها داخل صفحه و مودال‌ها)

### `/dashboard/price-lock`
- **سرویس‌ها**: `priceAlertService`
- **متدها**:
  - `priceAlertService.getList(userId, true)`
  - `priceAlertService.getList(userId, false)`
  - `priceAlertService.create(userId, body)`
  - `priceAlertService.delete(id, userId)`

### `/dashboard/return-requests`
- **سرویس‌ها**: `returnRequestService`
- **متدها**:
  - `returnRequestService.cancel(returnId)`

### `/dashboard/exclusive-amazon`
- **سرویس‌ها**: `exclusiveAmazonService`
- **متدها**:
  - `exclusiveAmazonService.getMyOrders(userId)` — GET api/ExclusiveOrder/GetMyOrders?userId=
- **اتصالات**: فیلترها (جستجو، بازه زمانی، وضعیت) روی لیست اعمال می‌شوند؛ در صورت 404 یا خطا لیست خالی نمایش داده می‌شود.

---

## مودال‌ها/کامپوننت‌های داشبورد که API می‌زنند (`src/template/Dashboard`)

### `Support/CreateTicketModal.js`
- `ticketCategoryService.getActive()`
- `ticketService.create(ticketData)`
- `ticketService.uploadTicketFile(ticketId, file)`

### `Wallet/RechargeModal.js`
- `userWalletService.requestChargeWallet(userId, body)`

### `Wallet/WithdrawModal.js`
- `userWalletService.requestWithdraw(body)`
- `userBankAccountService.getList()` (لیست حساب‌ها، اگر داخل مودال استفاده شده)

### `PriceLock/NewPriceLockModal.js`
- `productService.search(q)`

### `Notifications/NotificationsList.js`
- `notificationService.delete(notificationId, userId)`
- `notificationService.deleteAll()`
- `notificationService.markAllAsRead(userId)`

### `Profile/BasicInfo/BasicInfoCard.js`
- `userService.updateProfile(body)`

### `Profile/Financial/EditFinancialInfoModal.js`
- `userService.updateFinancialInfo(body)`

### `Profile/Notification/EditNotificationSettingsModal.js`
- `userService.updateNotificationSettings(body)`

### `Profile/Security/ConnectedDevicesModal.js`
- `userService.getConnectedDevices()`
- `userService.logoutDevice(deviceId)`

### `Profile/Security/EditSecurityModal.js`
- `userService.changePassword(body)`

### `RecentViews/RecentViewCard.js`
- `shoppingCartService.addToCart(userId, body)`
- `compareService.add({ productId, userId })`

---

## اندپوینت‌های پرریسک برای `API notfound` (مشکوک)

این‌ها لزوماً غلط نیستند، ولی نسبت به بقیه الگوهای پروژه «متفاوت» هستند و احتمال عدم وجود در بک‌اند بیشتر است:

- **`userBankAccountService`**:
  - `GET bank-accounts`
  - `POST bank-accounts`
  - `POST bank-accounts/{id}/verify`
  - `DELETE bank-accounts/{id}`
  
  بیشتر سرویس‌های دیگر از الگوی `PascalCase/Action` مثل `Users/GetProfile` استفاده می‌کنند؛ این یکی مسیر REST‌مانند دارد و اگر بک‌اند شما چنین روتی نداشته باشد 404 می‌دهد.

---

## برای پیدا کردن دقیق موارد `API notfound` چه اطلاعاتی لازم است؟

اگر از DevTools → Network یک نمونه 404 بدهید (URL کامل + method + response body)، می‌شود دقیق گفت:

- **این URL از کدام سرویس/متد آمده**
- **اسم درست endpoint در بک‌اند چیست**
- و **اصلاح لازم در `src/services/...`**

