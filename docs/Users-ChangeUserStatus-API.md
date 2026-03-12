# API تغییر وضعیت کاربر (ChangeUserStatus)

## آدرس و متد
- **متد:** `POST`
- **آدرس:** `Users/ChangeUserStatus`

## پارامترها

| پارامتر   | محل ارسال | نوع   | الزامی | توضیح                          |
|-----------|------------|--------|--------|---------------------------------|
| `id`      | Query      | number | بله   | شناسه کاربری که وضعیتش عوض می‌شود |
| `isActive`| Query      | boolean| بله   | `true` = فعال، `false` = غیرفعال   |

بک‌اند الان هر دو حالت زیر را پشتیبانی می‌کند:

1. **ارسال با Query (همان روش فعلی فرانت):**  
   `POST Users/ChangeUserStatus?id=123&isActive=true`  
   در این حالت **حتماً** مقدار `isActive` را در URL به‌صورت `true` یا `false` بفرستید تا وضعیت درست اعمال شود.

2. **ارسال با Body (پیشنهادی برای یکپارچگی با بقیه APIها):**  
   `POST Users/ChangeUserStatus?id=123`  
   با بدنهٔ JSON:  
   `{ "isActive": true }` یا `{ "isActive": false }`  
   در این روش هم `id` در query و هم `isActive` در body ارسال می‌شود.

## نکته مهم برای فرانت

اگر از روش Query استفاده می‌کنید، مقدار `isActive` را **حتماً** به‌صورت رشتهٔ `"true"` یا `"false"` در URL قرار دهید، نه عدد یا رشتهٔ خالی. مثال درست:

```js
// درست
client.post(`Users/ChangeUserStatus?id=${id}&isActive=${isActive}`)

// مطمئن شوید isActive مقدار boolean دارد (true/false) تا در URL به "true"/"false" تبدیل شود
changeUserStatus(userId, true)   // فعال
changeUserStatus(userId, false)  // غیرفعال
```

اگر به‌جای آن از Body استفاده کنید، کافی است در درخواست POST بدنهٔ JSON بفرستید:

```js
client.post(`Users/ChangeUserStatus?id=${id}`, { json: { isActive } })
```

## پاسخ موفق
- **۲۰۰:** `{ "success": true, "message": "کاربر فعال شد" }` یا `"کاربر غیرفعال شد"`

## خطاها
- **۴۰۴:** کاربر با این `id` یافت نشد.
- **۵۰۰:** خطای سرور.

با رعایت یکی از دو روش بالا (Query با `isActive` صحیح یا Body با `isActive`)، بخش تغییر وضعیت کاربر درست کار می‌کند.
