# API برند محصولات (ProductBrand)

پایه آدرس: `{BASE_URL}/api/ProductBrand`  
مثال: `https://your-api.com/api/ProductBrand`

همهٔ اندپوینت‌ها نیاز به احراز هویت با نقش **Admin** دارند.

---

## ۱. دریافت همهٔ برندها (GetAll)

- **متد:** `GET`
- **آدرس:** `api/ProductBrand/GetAll`
- **پارامتر اختیاری (Query):** `isActive` (boolean) — در صورت ارسال، فقط برندهای فعال یا غیرفعال برگردانده می‌شوند.

**نمونه درخواست:**
```http
GET /api/ProductBrand/GetAll
GET /api/ProductBrand/GetAll?isActive=true
```

**نمونه پاسخ (موفق):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "سامسونگ",
      "slug": "samsung",
      "isActive": true,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "message": "Operation successful"
}
```

---

## ۲. دریافت برندهای فعال (GetActive)

- **متد:** `GET`
- **آدرس:** `api/ProductBrand/GetActive`

**نمونه درخواست:**
```http
GET /api/ProductBrand/GetActive
```

**نمونه پاسخ:** همان ساختار `GetAll` با `data` فقط شامل برندهای فعال.

---

## ۳. دریافت صفحه‌بندی‌شده (GetPaginated)

- **متد:** `GET`
- **آدرس:** `api/ProductBrand/GetPaginated`
- **پارامترهای Query:**

| پارامتر     | نوع   | پیش‌فرض | توضیح        |
|-------------|--------|---------|---------------|
| pageNumber  | number | 1       | شماره صفحه   |
| pageSize    | number | 20      | تعداد در هر صفحه (حداکثر 100) |
| searchTerm  | string | —       | جستجو در نام/اسلاگ |
| isActive    | boolean| —       | فیلتر وضعیت فعال |

**نمونه درخواست:**
```http
GET /api/ProductBrand/GetPaginated?pageNumber=1&pageSize=20
GET /api/ProductBrand/GetPaginated?pageNumber=1&pageSize=10&searchTerm=سامسونگ&isActive=true
```

**نمونه پاسخ:**
```json
{
  "success": true,
  "data": {
    "brands": [ { "id": 1, "name": "سامسونگ", "slug": "samsung", "isActive": true, "createdAt": "..." } ],
    "totalCount": 1,
    "totalPages": 1
  },
  "message": "Operation successful"
}
```

---

## ۴. دریافت یک برند با شناسه (GetById)

- **متد:** `GET`
- **آدرس:** `api/ProductBrand/GetById`
- **پارامتر Query:** `id` (number) — الزامی.

**نمونه درخواست:**
```http
GET /api/ProductBrand/GetById?id=1
```

**نمونه پاسخ:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "سامسونگ",
    "slug": "samsung",
    "isActive": true,
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-03-10T12:00:00Z"
  },
  "message": "Operation successful"
}
```

---

## ۵. ایجاد برند (Create)

- **متد:** `POST`
- **آدرس:** `api/ProductBrand/Create`
- **Body:** JSON

| فیلد     | نوع   | الزامی | توضیح                          |
|----------|--------|--------|---------------------------------|
| name     | string | بله   | نام برند (۱ تا ۲۰۰ کاراکتر)    |
| slug     | string | خیر   | اسلاگ یکتا (حداکثر ۳۰۰ کاراکتر). در صورت خالی از نام ساخته می‌شود. |
| isActive | boolean| خیر   | پیش‌فرض: `true`                |

**نمونه ورودی:**
```json
{
  "name": "ال جی",
  "slug": "lg",
  "isActive": true
}
```

**نمونه درخواست (curl):**
```bash
curl -X POST "https://your-api.com/api/ProductBrand/Create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"ال جی","slug":"lg","isActive":true}'
```

**نمونه پاسخ (۲۰۱):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "ال جی",
    "slug": "lg",
    "isActive": true,
    "createdAt": "2025-03-12T10:00:00Z",
    "updatedAt": null
  },
  "message": "Operation successful"
}
```

---

## ۶. ویرایش برند (Update)

- **متد:** `PUT`
- **آدرس:** `api/ProductBrand/Update?id={id}`
- **پارامتر Query:** `id` (number) — شناسه برند.
- **Body:** JSON — همهٔ فیلدها اختیاری؛ فقط فیلدهای ارسالی به‌روزرسانی می‌شوند.

| فیلد     | نوع    | الزامی | توضیح                          |
|----------|---------|--------|---------------------------------|
| name     | string  | خیر   | نام برند (۱ تا ۲۰۰ کاراکتر)    |
| slug     | string  | خیر   | اسلاگ یکتا (حداکثر ۳۰۰ کاراکتر) |
| isActive | boolean | خیر   | وضعیت فعال/غیرفعال             |

**نمونه ورودی (ویرایش نام و وضعیت):**
```json
{
  "name": "سامسونگ الکترونیک",
  "slug": "samsung-electronics",
  "isActive": true
}
```

**نمونه درخواست (curl):**
```bash
curl -X PUT "https://your-api.com/api/ProductBrand/Update?id=1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"سامسونگ الکترونیک","slug":"samsung-electronics","isActive":true}'
```

**نمونه پاسخ (۲۰۰):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "سامسونگ الکترونیک",
    "slug": "samsung-electronics",
    "isActive": true,
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-03-12T11:30:00Z"
  },
  "message": "Operation successful"
}
```

تغییرات پس از این درخواست در دیتابیس ذخیره می‌شوند.

---

## ۷. حذف نرم برند (Delete)

- **متد:** `DELETE`
- **آدرس:** `api/ProductBrand/Delete?id={id}`
- **پارامتر Query:** `id` (number).

**نمونه درخواست:**
```http
DELETE /api/ProductBrand/Delete?id=1
```

**نمونه پاسخ:**
```json
{
  "success": true,
  "message": "Operation successful"
}
```

---

## خلاصه آدرس‌ها برای تست

| عملیات   | متد   | آدرس کامل (نمونه) |
|----------|--------|---------------------|
| لیست همه | GET    | `GET /api/ProductBrand/GetAll` |
| لیست فعال | GET   | `GET /api/ProductBrand/GetActive` |
| صفحه‌بندی | GET   | `GET /api/ProductBrand/GetPaginated?pageNumber=1&pageSize=20` |
| یک برند  | GET    | `GET /api/ProductBrand/GetById?id=1` |
| ایجاد    | POST   | `POST /api/ProductBrand/Create` با body بالا |
| ویرایش   | PUT    | `PUT /api/ProductBrand/Update?id=1` با body بالا |
| حذف      | DELETE | `DELETE /api/ProductBrand/Delete?id=1` |

برای تست ویرایش: ابتدا با `GetById` یک برند بگیرید، سپس با `Update` همان `id` را در query و فیلدهای جدید را در body بفرستید و بعد با `GetById` یا مستقیم در دیتابیس تأیید کنید که رکورد به‌روز شده است.
