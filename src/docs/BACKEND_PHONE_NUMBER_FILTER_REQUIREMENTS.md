# الزامات بک‌اند — فیلتر و ارسال اعلان بر اساس شماره موبایل

این سند تغییرات موردنیاز در **بک‌اند** را برای پشتیبانی از **شماره موبایل** به‌جای شناسه کاربر (userId) در پنل ادمین شرح می‌دهد. فرانت در حال حاضر بر اساس شماره موبایل کار می‌کند؛ در صورت عدم پشتیبانی بک‌اند، این endpointها باید به‌روزرسانی شوند.

---

## ۱. ارسال اعلان (Notification/CreateNotification)

**مسیر:** `POST api/Notification/CreateNotification`

**وضعیت فعلی:** فرانت اکنون `phoneNumber` یا `phoneNumbers` ارسال می‌کند به‌جای `userId`/`userIds`.

**بدنه (JSON) — تغییرات پیشنهادی:**

| فیلد | نوع | الزامی | توضیح |
|------|-----|--------|--------|
| `phoneNumber` | string | شرطی | شماره موبایل یک کاربر (مثال: 09123456789) |
| `phoneNumbers` | string[] | شرطی | آرایه شماره موبایل چند کاربر |
| `userId` | number | شرطی | (اختیاری) برای سازگاری با قبل |
| `userIds` | number[] | شرطی | (اختیاری) برای سازگاری با قبل |
| `title` | string | بله | عنوان اعلان |
| `message` | string | بله | متن اعلان |
| `type` | string/number | خیر | نوع اعلان |
| `actionUrl` | string | خیر | لینک اقدام |
| `actionText` | string | خیر | متن دکمه |

**قانون:** حداقل یکی از `phoneNumber`، `phoneNumbers`، `userId` یا `userIds` باید ارسال شود.

**منطق پیشنهادی در بک‌اند:**
- اگر `phoneNumber` ارسال شد: کاربر را با `User.PhoneNumber == phoneNumber` پیدا کنید و اعلان را برای او ایجاد کنید.
- اگر `phoneNumbers` ارسال شد: برای هر شماره معتبر، کاربر مربوط را پیدا کرده و اعلان ایجاد کنید.
- شماره موبایل می‌تواند با یا بدون پیش‌شماره ۰ (مثلاً 09123456789 یا 9123456789) باشد؛ نرمال‌سازی در بک‌اند انجام شود.

---

## ۲. بیمه ارسال (AdminShippingInsurance)

**مسیر:** `GET api/admin/AdminShippingInsurance`

**Query پارامترهای پیشنهادی:**

| پارامتر | نوع | توضیح |
|---------|-----|--------|
| `orderId` | number | فیلتر بر اساس شناسه سفارش |
| `userId` | number | (اختیاری) فیلتر بر اساس شناسه کاربر |
| `phoneNumber` | string | **جدید** — فیلتر بر اساس شماره موبایل کاربر |
| `status` | number | فیلتر بر اساس وضعیت |

**منطق:** اگر `phoneNumber` ارسال شد، ابتدا کاربر با این شماره را پیدا کنید و سپس رکوردهای بیمهٔ آن کاربر را برگردانید (معادل فیلتر با `userId`).

---

## ۳. سرویس ارز (CurrencyService/GetPaginated)

**مسیر:** `GET api/CurrencyService/GetPaginated`

**Query پارامترهای پیشنهادی:**

| پارامتر | نوع | توضیح |
|---------|-----|--------|
| `pageNumber` | number | شماره صفحه |
| `pageSize` | number | اندازه صفحه |
| `status` | number | فیلتر وضعیت |
| `serviceType` | number | فیلتر نوع سرویس |
| `userId` | number | (اختیاری) فیلتر بر اساس شناسه کاربر |
| `phoneNumber` | string | **جدید** — فیلتر بر اساس شماره موبایل کاربر |
| `searchTerm` | string | جستجو |

**منطق:** اگر `phoneNumber` ارسال شد، کاربر را با این شماره پیدا کرده و درخواست‌های سرویس ارز آن کاربر را فیلتر کنید.

---

## ۴. سپر کیفیت (AdminQualityShield)

**مسیر:** `GET api/admin/AdminQualityShield`

**Query پارامترهای پیشنهادی:**

| پارامتر | نوع | توضیح |
|---------|-----|--------|
| `orderId` | number | فیلتر بر اساس شناسه سفارش |
| `userId` | number | (اختیاری) فیلتر بر اساس شناسه کاربر |
| `phoneNumber` | string | **جدید** — فیلتر بر اساس شماره موبایل کاربر |
| `status` | number | فیلتر وضعیت |

**منطق:** مشابه بیمه ارسال — در صورت ارسال `phoneNumber`، کاربر را پیدا کرده و سرویس‌های سپر کیفیت او را برگردانید.

---

## ۵. تیکت‌ها (AdminTicket/GetPaginated)

**مسیر:** `GET api/AdminTicket/GetPaginated`

**Query پارامترهای پیشنهادی:**

| پارامتر | نوع | توضیح |
|---------|-----|--------|
| `pageNumber` | number | شماره صفحه |
| `pageSize` | number | اندازه صفحه |
| `status` | number | فیلتر وضعیت |
| `priority` | number | فیلتر اولویت |
| `categoryId` | number | فیلتر دسته‌بندی |
| `userId` | number | (اختیاری) فیلتر بر اساس شناسه کاربر |
| `phoneNumber` | string | **جدید** — فیلتر بر اساس شماره موبایل کاربر |
| `searchTerm` | string | جستجو |
| ... | | سایر پارامترهای موجود |

**منطق:** اگر `phoneNumber` ارسال شد، تیکت‌های کاربری که شماره موبایلش با این مقدار مطابقت دارد را برگردانید.

---

## ۶. کاربران (Users/GetUsersWithFilters)

**مسیر:** `GET api/Users/GetUsersWithFilters`

**وضعیت:** فرانت از `searchTerm` برای جستجو استفاده می‌کند. placeholder اکنون «جستجو نام، ایمیل یا شماره موبایل» است.

**پیشنهاد:** اطمینان حاصل کنید که `searchTerm` در جستجو، علاوه بر نام و ایمیل، **شماره موبایل** را نیز پوشش می‌دهد. در صورت عدم پشتیبانی، یک پارامتر جداگانه `phoneNumber` اضافه شود.

---

## خلاصه

| Endpoint | پارامتر جدید/تغییر | اقدام بک‌اند |
|----------|---------------------|--------------|
| `Notification/CreateNotification` | `phoneNumber`, `phoneNumbers` | پذیرش و تبدیل به userId برای ایجاد اعلان |
| `admin/AdminShippingInsurance` | `phoneNumber` (query) | فیلتر بر اساس شماره موبایل کاربر |
| `CurrencyService/GetPaginated` | `phoneNumber` (query) | فیلتر بر اساس شماره موبایل کاربر |
| `admin/AdminQualityShield` | `phoneNumber` (query) | فیلتر بر اساس شماره موبایل کاربر |
| `AdminTicket/GetPaginated` | `phoneNumber` (query) | فیلتر بر اساس شماره موبایل کاربر |
| `Users/GetUsersWithFilters` | `searchTerm` شامل شماره | اطمینان از جستجو در PhoneNumber |

---

**تاریخ:** ۱۴۰۴/۱۲/۱۷
