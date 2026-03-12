# ادغام نسخه فاینال: test + sjd-last-custom

## برنچ‌ها

| برنچ | توضیح |
|------|--------|
| `seyed-source-backup` | بکاپ سورس شما (قبل از ادغام) — در صورت نیاز قابل بازگردانی |
| `final-merged` | نسخه ادغام‌شده حرفه‌ای (test + sjd-last-custom) |

## تداخل‌های حل‌شده

### 1. `AuthContext.jsx`
- **ادغام:** هر دو طرف حفظ شد:
  - ورود با Next-Auth و گوگل، `openAuthModal` / `closeAuthModal`، و گوش دادن به رویداد انقضای توکن از API.
  - مودال Auth از برنچ همکار + اورلی «در حال ورود» هنگام sync گوگل از سورس شما.

### 2. `ProductCard.js`
- بج‌ها و منطق ارسال بین‌المللی (بر اساس `deliveryDays >= 5`) از سورس شما.
- نمایش پرچم + لوگوی آمازون (از sjd) با متغیرهای `sellerCountry`, `currency`, `region`, `flagSrc`.

### 3. `Header.js`
- دکمه «پشتیبانی ۲۴ ساعته» (Crisp) حذف شد چون هوک `useCrispOnClick` در پروژه تعریف نشده بود. ویجت Crisp از طریق `CrispChat` در layout همچنان فعال است.

### 4. `ProductsClient.js`
- سرویس قیمت‌گذاری و اسکرپر حفظ شد: `pricingService`, `isScraperConfigured`، جستجوی آمازون و fallback به جستجوی معمولی.

### 5. `ProductRowCard.js`
- `getProductName(product)` برای عنوان؛ یک `formatPrice` با پسوند ارز (درهم/دلار/تومان)؛ `productSlug` شامل `productId`.

### 6. `PurchaseSection/index.js`
- حالت `priceBreakdown` برای نمایش جزئیات قیمت از بک‌اند حفظ شد؛ مودال Auth از طریق `openAuthModal` در AuthContext.

### 7. `BrandsTable.jsx`
- استفاده از `onEdit?.(brand.id)` و `onDelete?.(brand.id)` برای جلوگیری از خطا وقتی callback تعریف نشده.

### 8. `package-lock.json`
- نسخه از سورس شما (HEAD) استفاده و با `npm install --package-lock-only` یکپارچه شد.

## کانفیگ‌ها

- **`.env.local`**: در git commit نشده (در `.gitignore`). برای محیط لوکال خودتان مقادیر را تنظیم کنید و آن را به ریموت push نکنید.
- **متغیرهای مهم:**  
  `NEXT_PUBLIC_*` برای API، Crisp، و در صورت نیاز `NEXT_PUBLIC_MOCK_GOOGLE_LOGIN` برای تست ورود گوگل بدون بک‌اند.

## بعد از ادغام

1. یکبار `npm install` در روت پروژه اجرا شود.
2. در صورت نیاز، مقادیر `.env.local` و env سرور را با نسخه فاینال هماهنگ کنید.
3. برای دیپلوی نهایی می‌توانید از برنچ `final-merged` استفاده کنید یا آن را به `master` / برنچ ریلز merge کنید.
