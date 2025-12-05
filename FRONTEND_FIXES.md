# 📋 لیست اصلاحات فرانت‌اند میکروالس

> این داکیومنت شامل مواردی است که باید در پروژه فرانت‌اند اصلاح شوند.
> اولویت‌بندی: 🔴 بحرانی | 🟠 مهم | 🟡 متوسط | 🟢 پیشنهادی

---

## 🔴 اصلاحات بحرانی (Critical)

### 1. اصلاح نام فایل اشتباه

**مسیر:** `src/template/Auth/AuthModal..js`

**مشکل:** نام فایل دارای دو نقطه است که باعث خطا می‌شود.

**اقدام:** نام فایل را به `AuthModal.js` تغییر دهید و import ها را اصلاح کنید:

```bash
# تغییر نام فایل
AuthModal..js → AuthModal.js
```

سپس در فایل `src/components/BtnShowLoginModal.js`:
```javascript
// قبل
import { AuthModal } from "@/template/Auth/AuthModal.";

// بعد
import { AuthModal } from "@/template/Auth/AuthModal";
```

---

### 2. حذف console.log از Production

**مسیر:** `src/components/BtnShowLoginModal.js`

**قبل:**
```javascript
onClick={() => setOpen(!open) + console.log("asd")}
```

**بعد:**
```javascript
onClick={() => setOpen(true)}
```

---

### 3. اصلاح صفحه Error

**مسیر:** `src/app/error.js`

**قبل:**
```javascript
"use client";

import React from "react";

function Error() {
  return <p>error</p>;
}

export default Error;
```

**بعد:**
```javascript
"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">خطا!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          مشکلی پیش آمده است
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          متأسفانه در پردازش درخواست شما خطایی رخ داده است.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            تلاش مجدد
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            بازگشت به خانه
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

### 4. اصلاح غلط املایی در BottomNavigation

**مسیر:** `src/components/module/BottomNavigation.js`

**قبل:**
```javascript
const [offset, setOffset] = useState({ ofsset: 0, width: 0 });
```

**بعد:**
```javascript
const [offset, setOffset] = useState({ left: 0, width: 0 });
```

همچنین همه جاهایی که از `ofsset` استفاده شده را به `left` تغییر دهید:
```javascript
setOffset({ left: rect.left, width: rect.width });
// ...
style={{ left: offset.left + "px", width: offset.width }}
```

---

### 5. اضافه کردن Navigation واقعی به BottomNavigation

**مسیر:** `src/components/module/BottomNavigation.js`

**قبل:**
```javascript
<button
  key={item.id}
  onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({ ofsset: rect.left, width: rect.width });
    setActiveId(item.id);
  }}
  // ...
>
```

**بعد:**
```javascript
import Link from "next/link";
import { usePathname } from "next/navigation";

// در داخل کامپوننت:
const pathname = usePathname();

// تغییر activeId بر اساس pathname
useEffect(() => {
  const currentItem = navigationItems.find(item => item.href === pathname);
  if (currentItem) {
    setActiveId(currentItem.id);
  }
}, [pathname]);

// تغییر button به Link:
<Link
  href={item.href}
  key={item.id}
  ref={(el) => (itemRefs.current[item.id] = el)}
  className={cn(
    "relative flex flex-col items-center justify-center gap-1.5 flex-1 py-2 transition-all duration-300 z-10",
    isActive && "text-blue-600"
  )}
>
  {/* محتوای قبلی */}
</Link>
```

---

## 🟠 اصلاحات مهم (Important)

### 6. افزودن Metadata به تمام صفحات

هر صفحه باید metadata مناسب داشته باشد. نمونه:

**مسیر:** `src/app/products/page.js`
```javascript
export const metadata = {
  title: "محصولات | میکروالس",
  description: "مشاهده و خرید محصولات اصل از آمازون آمریکا و امارات با تضمین اصالت و ارسال سریع به ایران",
  keywords: ["خرید از آمازون", "محصولات آمازون", "خرید آنلاین"],
};
```

**مسیر:** `src/app/blogs/page.js`
```javascript
export const metadata = {
  title: "وبلاگ | میکروالس",
  description: "آخرین مقالات و راهنماهای خرید از آمازون و فروشگاه‌های بین‌المللی",
  keywords: ["وبلاگ", "راهنمای خرید", "آموزش خرید از آمازون"],
};
```

**مسیر:** `src/app/contact-us/page.js`
```javascript
export const metadata = {
  title: "تماس با ما | میکروالس",
  description: "راه‌های ارتباط با تیم پشتیبانی میکروالس - تلفن، ایمیل و فرم تماس",
  keywords: ["تماس با ما", "پشتیبانی", "ارتباط با میکروالس"],
};
```

**مسیر:** `src/app/cart/page.js`
```javascript
export const metadata = {
  title: "سبد خرید | میکروالس",
  description: "مشاهده و مدیریت سبد خرید شما",
};
```

**مسیر:** `src/app/faqs/page.js`
```javascript
export const metadata = {
  title: "سوالات متداول | میکروالس",
  description: "پاسخ به سوالات رایج درباره خرید از آمازون، ارسال، گمرک و پرداخت",
  keywords: ["سوالات متداول", "FAQ", "راهنما"],
};
```

**مسیر:** `src/app/gift-cart/page.js`
```javascript
export const metadata = {
  title: "گیفت کارت | میکروالس",
  description: "خرید گیفت کارت آمازون، پلی‌استیشن و سایر پلتفرم‌ها",
};
```

**مسیر:** `src/app/categories/page.js`
```javascript
export const metadata = {
  title: "دسته‌بندی‌ها | میکروالس",
  description: "مشاهده تمام دسته‌بندی‌های محصولات قابل خرید از آمازون",
};
```

**مسیر:** `src/app/guide/page.js`
```javascript
export const metadata = {
  title: "راهنما | میکروالس",
  description: "راهنمای کامل خرید از آمازون و نحوه ثبت سفارش",
};
```

---

### 7. افزودن generateMetadata برای صفحات داینامیک

**مسیر:** `src/app/blog/[blogId]/page.js`

```javascript
// افزودن این تابع قبل از کامپوننت اصلی
export async function generateMetadata({ params }) {
  const { blogId } = params;
  
  // فعلاً از داده‌های استاتیک استفاده کنید
  // بعداً می‌توانید از API بخوانید
  return {
    title: `مقاله شماره ${blogId} | وبلاگ میکروالس`,
    description: "راهنمای کامل خرید از آمازون و نکات مهم",
  };
}

export default function Blog({ params }) {
  // ...
}
```

**مسیر:** `src/app/product/[productId]/page.js`

```javascript
export async function generateMetadata({ params }) {
  const { productId } = params;
  
  return {
    title: `محصول شماره ${productId} | میکروالس`,
    description: "مشخصات و قیمت محصول با تضمین اصالت",
  };
}
```

---

### 8. اصلاح استفاده از img به جای Image

**مسیر:** `src/components/module/Header.js` (خط ۴۷-۵۲)

**قبل:**
```javascript
<img
  alt="logo img"
  src="/image/logo.png"
  className="w-full lg:h-12 h-9 md:min-w-36 lg:min-w-[170px]"
/>
```

**بعد:**
```javascript
<Image
  alt="لوگو میکروالس"
  src="/image/logo.png"
  width={170}
  height={48}
  className="w-full lg:h-12 h-9 md:min-w-36 lg:min-w-[170px]"
  priority
/>
```

**مسیر:** `src/app/not-found.js` (خط ۲۶)

**قبل:**
```javascript
<img src="/image/404.png" alt={`محصول بازدید شده شماره `} className="max-h-screen w-full" />
```

**بعد:**
```javascript
<Image 
  src="/image/404.png" 
  alt="صفحه پیدا نشد" 
  width={1920} 
  height={1080} 
  className="max-h-screen w-full object-cover" 
/>
```

---

### 9. اصلاح Alt Text های تصاویر

تمام `alt` های زیر را پیدا و اصلاح کنید:

| فایل | قبل | بعد |
|------|-----|-----|
| `ProductCard.js` | `محصول بازدید شده شماره ` | `تصویر محصول` |
| `blogs/page.js` | `محصول بازدید شده شماره ` | `بنر وبلاگ` |
| `BlogCard.js` | `عکس بلاگ` | ✅ خوب است |

**نمونه اصلاح در ProductCard.js:**
```javascript
<Image 
  src="/image/Home/product.png" 
  alt="تصویر محصول" 
  fill 
  className="object-cover rounded-md" 
/>
```

---

### 10. افزودن key به map ها

**مسیر:** `src/app/blogs/page.js` (خط ۳۵-۳۸)

**قبل:**
```javascript
{[...Array(6)].map((blog) => (
  <BlogCard />
))}
```

**بعد:**
```javascript
{[...Array(6)].map((_, index) => (
  <BlogCard key={index} />
))}
```

---

## 🟡 اصلاحات متوسط (Medium)

### 11. اصلاح لینک‌های placeholder

**مسیر:** `src/components/module/Footer.js`

لینک‌هایی که `href="#"` دارند را به مسیر صحیح تغییر دهید یا موقتاً غیرفعال کنید:

```javascript
const links = [
  { title: "درباره ما", href: "/about-us" },
  { title: "ارتباط با ما", href: "/contact-us" },
  { title: "تخفیف ویژه", href: "/discounts", disabled: true },
  { title: "قوانین مرجوع کردن کالا", href: "/return-policy", disabled: true },
  { title: "حریم خصوصی", href: "/privacy", disabled: true },
  { title: "پرسش‌ و پاسخ متداول", href: "/faqs" },
  { title: "راهنمای سفارش", href: "/guide" },
];

// در render:
{links.map((item, index) => (
  item.disabled ? (
    <span
      key={index}
      className="text-gray-400 dark:text-gray-600 px-4 border-l dark:border-gray-700 cursor-not-allowed"
    >
      {item.title}
    </span>
  ) : (
    <Link
      key={index}
      href={item.href}
      className="hover:underline bg-white dark:bg-transparent px-4 border-l dark:border-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {item.title}
    </Link>
  )
))}
```

---

### 12. بهینه‌سازی فونت با next/font

**مسیر:** `src/app/layout.js`

```javascript
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "../styles/globals.css";

const iranSans = localFont({
  src: "../../public/fonts/IRANSansWeb(FaNum)_Medium.ttf",
  variable: "--font-iran-sans",
  display: "swap",
});

export const metadata = {
  title: "میکروالس | خرید مطمئن از آمازون",
  description:
    "میکروالس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" className={iranSans.variable}>
      <body dir="rtl" className="font-sans">
        <main className="overflow-hidden max-md:pb-20 dark:bg-dark-bg">
          {children}
        </main>
        <Toaster position="top-right" dir="rtl" />
      </body>
    </html>
  );
}
```

سپس در `tailwind.config.js`:
```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-iran-sans)", "sans-serif"],
    },
    // ...
  },
}
```

و از `globals.css` این خطوط را حذف کنید:
```css
/* حذف شود */
@font-face {
  font-family: iranSans;
  src: url(/fonts/IRANSansWeb\(FaNum\)_Medium.ttf);
}

* {
  font-family: iranSans;
}
```

---

### 13. تکمیل next.config.mjs

**مسیر:** `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // فشرده‌سازی خروجی
  compress: true,

  // بهینه‌سازی برای Production
  poweredByHeader: false,
};

export default nextConfig;
```

---

## 🟢 پیشنهادات (Suggestions)

### 14. نصب و پیکربندی ESLint

```bash
npm install -D eslint eslint-config-next
```

فایل `.eslintrc.json` بسازید:
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
}
```

در `package.json` اسکریپت اضافه کنید:
```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix"
  }
}
```

---

### 15. نصب و پیکربندی Prettier

```bash
npm install -D prettier eslint-config-prettier
```

فایل `.prettierrc` بسازید:
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 120
}
```

در `package.json`:
```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{js,jsx}\""
  }
}
```

---

### 16. تقسیم فایل data.js

فایل `src/data.js` بسیار شلوغ است. پیشنهاد می‌شود به فایل‌های جداگانه تقسیم شود:

```
src/
  data/
    index.js          # re-export همه
    form-fields.js    # ADDRESS_FORM_FIELDS
    payment.js        # paymentMethods, paymentSteps
    reviews.js        # reviews
    brands.js         # brands
    faqs.js           # faqs, faqTabs
    guide.js          # GUIDE_ITEMS, deliveryInfo
    currency.js       # services, benefits, tabsCurrency
```

---

## ✅ چک‌لیست نهایی

- [ ] نام فایل `AuthModal..js` اصلاح شد
- [ ] console.log از `BtnShowLoginModal.js` حذف شد
- [ ] صفحه `error.js` کامل شد
- [ ] غلط املایی `ofsset` اصلاح شد
- [ ] Navigation به `BottomNavigation` اضافه شد
- [ ] Metadata به تمام صفحات اضافه شد
- [ ] `generateMetadata` برای صفحات داینامیک اضافه شد
- [ ] `<img>` ها به `<Image>` تبدیل شدند
- [ ] Alt text های تصاویر اصلاح شدند
- [ ] key به map ها اضافه شد
- [ ] لینک‌های `#` اصلاح شدند
- [ ] فونت با next/font بهینه شد
- [ ] next.config.mjs تکمیل شد
- [ ] ESLint نصب و پیکربندی شد
- [ ] Prettier نصب و پیکربندی شد

---

> 📅 تاریخ ایجاد: دی ۱۴۰۴
> 
> ⏱️ زمان تخمینی انجام: ۴-۶ ساعت

