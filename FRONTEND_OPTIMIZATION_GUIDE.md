# 📋 راهنمای کامل بهینه‌سازی و اصلاحات فرانت‌اند میکروالس

> این داکیومنت شامل تمام مواردی است که باید در پروژه فرانت‌اند اصلاح و بهینه شوند.
> اولویت‌بندی: 🔴 بحرانی | 🟠 مهم | 🟡 متوسط | 🟢 پیشنهادی

---

## 🔴 بخش 1: مشکلات بحرانی (Critical Issues)

### 1.1 صفحه Error Handler

**مسیر:** `src/app/error.js`

**مشکل:** صفحه Error فقط یک متن ساده دارد و هیچ قابلیت کاربردی ندارد.

**اقدامات لازم:**
- باید یک صفحه کامل با طراحی مناسب اضافه شود
- دکمه "تلاش مجدد" که تابع reset را فراخوانی کند
- دکمه "بازگشت به صفحه اصلی" که به `/` هدایت کند
- پیام خطای کاربرپسند به فارسی
- طراحی responsive و پشتیبانی از dark mode
- استفاده از کامپوننت‌های موجود مثل Button و Layout

---

### 1.2 BottomNavigation - Navigation واقعی

**مسیر:** `src/components/module/BottomNavigation.js`

**مشکلات:**
1. در خط 47 هنوز `ofsset` نوشته شده که باید `left` باشد
2. دکمه‌ها فقط state را تغییر می‌دهند و navigation واقعی ندارند
3. active state بر اساس pathname صفحه نیست

**اقدامات لازم:**
- استفاده از `Link` از Next.js به جای `button`
- استفاده از `usePathname` برای تشخیص صفحه فعال
- اصلاح نام متغیر `ofsset` به `left`
- اضافه کردن `useEffect` برای sync کردن active state با pathname
- حذف onClick handler و استفاده از navigation خودکار Next.js

---

### 1.3 Dark Mode با next-themes

**مسیر:** `src/components/SwitchButton.js`

**مشکل:** از `localStorage` مستقیم استفاده شده که در SSR خطا می‌دهد و hydration mismatch ایجاد می‌کند.

**اقدامات لازم:**
- استفاده از `ThemeProvider` از `next-themes` در layout
- استفاده از `useTheme` hook به جای localStorage مستقیم
- اضافه کردن `suppressHydrationWarning` به تگ html
- مدیریت state با `mounted` برای جلوگیری از hydration mismatch
- پشتیبانی از system preference (auto mode)

---

### 1.4 صفحه 404 - استفاده از Image Component

**مسیر:** `src/app/not-found.js`

**مشکل:** از تگ `<img>` استفاده شده که بهینه‌سازی Next.js ندارد.

**اقدامات لازم:**
- تبدیل `<img>` به `Image` از `next/image`
- اضافه کردن width و height مناسب
- اصلاح alt text به یک متن معنادار
- استفاده از priority برای تصویر 404 (چون در صفحه خطا است)

---

## 🟠 بخش 2: مشکلات مهم (Important Issues)

### 2.1 Metadata برای SEO - صفحات استاتیک

**صفحات بدون metadata:**
- `src/app/products/page.js`
- `src/app/blogs/page.js`
- `src/app/contact-us/page.js`
- `src/app/cart/page.js`
- `src/app/faqs/page.js`
- `src/app/categories/page.js`
- `src/app/guide/page.js`
- `src/app/gift-cart/page.js`
- `src/app/currency-services/page.js`
- `src/app/steps-cart/page.js`
- `src/app/review/page.js`
- `src/app/site-map/page.js`
- `src/app/terms-conditions/page.js`
- و سایر صفحات

**اقدامات لازم:**
- اضافه کردن `export const metadata` به هر صفحه
- تعریف title مناسب برای هر صفحه
- تعریف description مناسب (حدود 150-160 کاراکتر)
- اضافه کردن keywords مرتبط
- استفاده از Open Graph tags (og:title, og:description, og:image)
- اضافه کردن Twitter Card tags

---

### 2.2 generateMetadata برای صفحات داینامیک

**صفحات داینامیک:**
- `src/app/blog/[blogId]/page.js`
- `src/app/product/[productId]/page.js`

**اقدامات لازم:**
- اضافه کردن تابع `generateMetadata` که async باشد
- دریافت داده‌های blog/product از API
- ساخت metadata داینامیک بر اساس داده‌های واقعی
- fallback metadata در صورت خطا
- استفاده از slug برای URL های SEO-friendly
- اضافه کردن canonical URL

---

### 2.3 حذف Console.log ها

**مشکل:** حدود 100 مورد console.log و console.error در کد وجود دارد.

**اقدامات لازم:**
- جستجوی تمام console.log ها در پروژه
- حذف console.log های debug
- نگه داشتن console.error ها اما wrap کردن در یک logger
- ایجاد یک utility برای logging (مثلاً logger.js)
- استفاده از environment variable برای کنترل log level
- در production فقط error ها را log کنید

---

### 2.4 بهینه‌سازی next.config.mjs

**مشکل:** فقط `reactCompiler: true` دارد.

**اقدامات لازم:**
- اضافه کردن image optimization config
- تعریف formats برای AVIF و WebP
- تعریف deviceSizes و imageSizes
- فعال کردن compression
- حذف poweredByHeader برای امنیت
- اضافه کردن headers برای security
- تنظیمات برای static export (اگر نیاز باشد)

---

### 2.5 فونت با next/font

**مسیر:** `src/styles/globals.css`

**مشکل:** از `@font-face` استفاده شده که بهینه‌سازی Next.js ندارد.

**اقدامات لازم:**
- استفاده از `localFont` از `next/font/local`
- تعریف فونت در `layout.js`
- اضافه کردن variable برای CSS variable
- حذف `@font-face` از globals.css
- حذف `font-family: iranSans` از `*` selector
- استفاده از `font-sans` class در tailwind config
- اضافه کردن `display: swap` برای جلوگیری از FOIT

---

## ⚡ بخش 3: بهینه‌سازی سرعت و عملکرد

### 3.1 Lazy Loading تصاویر

**اقدامات لازم:**
- همه Image ها باید `loading="lazy"` داشته باشند (به صورت پیش‌فرض)
- تصاویر hero و بالای صفحه باید `priority` داشته باشند
- تصاویر در اسلایدرها باید lazy load شوند
- تصاویر در viewport اول باید `priority` داشته باشند
- استفاده از `placeholder="blur"` برای تصاویر بزرگ
- اضافه کردن blurDataURL برای placeholder

**جای‌هایی که باید بررسی شود:**
- Header logo (priority)
- Hero images (priority)
- Product images در لیست (lazy)
- Blog images (lazy)
- Category images (lazy)
- Banner images در اسلایدر (lazy)

---

### 3.2 Dynamic Imports برای کامپوننت‌های سنگین

**کامپوننت‌هایی که باید lazy load شوند:**
- `AuthModal` - فقط وقتی نیاز است
- `ProductPurchaseForm` - فرم‌های پیچیده
- `Swiper` components - کتابخانه‌های خارجی
- `BlogEditor` (اگر وجود دارد)
- `Admin` components (اگر client-side هستند)
- `Charts` یا visualization libraries

**اقدامات لازم:**
- استفاده از `next/dynamic` با `ssr: false` برای کامپوننت‌های client-only
- اضافه کردن loading component برای زمان بارگذاری
- استفاده از `loading` prop برای نمایش skeleton

---

### 3.3 Image Optimization

**اقدامات لازم:**
- همه Image ها باید width و height مشخص داشته باشند
- استفاده از `sizes` prop برای responsive images
- استفاده از `placeholder="blur"` برای تصاویر بزرگ
- تبدیل تصاویر به فرمت WebP/AVIF در next.config
- استفاده از `quality` prop برای کنترل کیفیت
- بهینه‌سازی تصاویر قبل از آپلود (compression)

**بررسی موارد:**
- Product images - width/height مشخص
- Blog images - sizes برای responsive
- Banner images - priority و blur placeholder
- Icon images - استفاده از SVG به جای PNG

---

### 3.4 Code Splitting و Bundle Analysis

**اقدامات لازم:**
- نصب `@next/bundle-analyzer`
- اجرای analysis برای شناسایی bundle های بزرگ
- جدا کردن vendor chunks
- استفاده از dynamic imports برای کتابخانه‌های بزرگ
- بررسی duplicate dependencies
- استفاده از tree shaking برای حذف کدهای استفاده نشده

**کتابخانه‌هایی که باید بررسی شوند:**
- Swiper - آیا همه modules استفاده می‌شوند؟
- Iconsax - آیا همه آیکون‌ها استفاده می‌شوند؟
- Radix UI - آیا همه components استفاده می‌شوند؟

---

### 3.5 Static Generation و Caching

**اقدامات لازم:**
- استفاده از `generateStaticParams` برای صفحات داینامیک
- استفاده از `revalidate` برای ISR (Incremental Static Regeneration)
- تعریف cache headers برای static assets
- استفاده از `unstable_cache` برای API calls تکراری
- Cache کردن داده‌های استاتیک مثل categories و brands

**صفحاتی که باید static شوند:**
- صفحات blog (اگر ممکن است)
- صفحات category
- صفحات about-us, contact-us
- صفحات guide

---

### 3.6 Font Optimization

**اقدامات لازم:**
- استفاده از `next/font` برای فونت‌ها
- اضافه کردن `display: swap` برای جلوگیری از FOIT
- Preload برای فونت‌های مهم
- استفاده از font-display: swap در CSS
- کاهش تعداد font weights اگر استفاده نمی‌شوند

---

## 👨‍💻 بخش 4: نکات حرفه‌ای

### 4.1 Error Boundaries

**اقدامات لازم:**
- ایجاد یک Error Boundary component
- Wrap کردن بخش‌های مهم با Error Boundary
- Logging errors به یک سرویس (مثلاً Sentry)
- نمایش پیام‌های خطای کاربرپسند
- جلوگیری از crash کل صفحه

**جای‌هایی که نیاز است:**
- Product list
- Blog list
- Cart section
- Form sections

---

### 4.2 Loading States و Skeleton Loaders

**اقدامات لازم:**
- جایگزینی spinner های ساده با Skeleton loaders
- ایجاد Skeleton components برای ProductCard, BlogCard
- استفاده از shimmer effect
- Progressive loading برای لیست‌های طولانی
- نمایش محتوای اولیه (skeleton) قبل از بارگذاری

**جای‌هایی که نیاز است:**
- Product list loading
- Blog list loading
- Cart loading
- Profile loading

---

### 4.3 Performance Monitoring

**اقدامات لازم:**
- اضافه کردن Web Vitals tracking
- استفاده از `next/script` برای analytics
- Lazy load کردن third-party scripts
- اضافه کردن performance marks
- مانیتورینگ Core Web Vitals (LCP, FID, CLS)

**ابزارهای پیشنهادی:**
- Google Analytics 4
- Vercel Analytics
- Sentry Performance

---

### 4.4 Accessibility (a11y)

**اقدامات لازم:**
- بررسی تمام alt text ها
- اضافه کردن `aria-label` برای دکمه‌های بدون متن
- بررسی keyboard navigation
- بررسی contrast ratio برای رنگ‌ها
- اضافه کردن focus indicators
- استفاده از semantic HTML
- اضافه کردن ARIA attributes

**بررسی موارد:**
- تمام دکمه‌ها باید accessible باشند
- فرم‌ها باید label داشته باشند
- Modal ها باید focus trap داشته باشند
- رنگ‌ها باید contrast مناسب داشته باشند

---

### 4.5 Security Best Practices

**اقدامات لازم:**
- Sanitize کردن user inputs
- استفاده از `rel="noopener noreferrer"` برای لینک‌های خارجی
- اضافه کردن Content Security Policy headers
- بررسی XSS vulnerabilities
- استفاده از HTTPS برای API calls
- Validation در client و server

---

### 4.6 API Error Handling مرکزی

**اقدامات لازم:**
- ایجاد یک error handler مرکزی
- Retry logic برای failed requests
- Timeout handling
- نمایش پیام‌های خطای کاربرپسند
- Logging errors برای debugging
- Fallback data در صورت خطا

**جای‌هایی که نیاز است:**
- در `src/services/api/client.js`
- در هر service (productService, blogService, etc.)
- در components که API call می‌کنند

---

### 4.7 SEO Advanced

**اقدامات لازم:**
- اضافه کردن Open Graph tags (og:title, og:description, og:image, og:url)
- اضافه کردن Twitter Card tags
- اضافه کردن Structured Data (JSON-LD)
- ایجاد sitemap.xml
- ایجاد robots.txt
- اضافه کردن canonical URLs
- اضافه کردن alternate language tags (اگر چندزبانه است)

**Structured Data برای:**
- Product pages (Product schema)
- Blog posts (Article schema)
- Organization (Organization schema)
- Breadcrumbs (BreadcrumbList schema)

---

### 4.8 Environment Variables

**اقدامات لازم:**
- استفاده از `.env.local` برای API URLs
- جدا کردن config های development و production
- Validation برای env variables
- استفاده از `NEXT_PUBLIC_` prefix برای client-side variables
- Document کردن env variables در README

**متغیرهای پیشنهادی:**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ANALYTICS_ID`

---

### 4.9 State Management Optimization

**اقدامات لازم:**
- بررسی نیاز به Context API برای state های global
- استفاده از `useMemo` برای محاسبات سنگین
- استفاده از `useCallback` برای functions که به children pass می‌شوند
- جلوگیری از re-render های غیرضروری
- بررسی performance با React DevTools Profiler

**بهینه‌سازی‌های پیشنهادی:**
- Memoize کردن ProductCard, BlogCard
- استفاده از React.memo برای components که زیاد re-render می‌شوند
- Optimize کردن list rendering

---

### 4.10 Type Safety

**اقدامات لازم:**
- در نظر گرفتن مهاجرت به TypeScript (برای آینده)
- یا استفاده از JSDoc برای type hints
- اضافه کردن PropTypes برای components (اگر React است)
- Document کردن prop types

---

## ✅ چک‌لیست نهایی

### 🔴 بحرانی (فوری - قبل از هر چیز)
- [ ] Error page کامل با دکمه‌های کاربردی
- [ ] BottomNavigation با navigation واقعی و اصلاح typo
- [ ] Dark Mode با next-themes (جلوگیری از hydration mismatch)
- [ ] 404 page با Image component

### 🟠 مهم (قبل از لانچ)
- [ ] Metadata برای تمام صفحات استاتیک
- [ ] generateMetadata برای صفحات داینامیک
- [ ] حذف یا wrap کردن console.log ها
- [ ] بهینه‌سازی next.config.mjs
- [ ] فونت با next/font

### ⚡ سرعت و عملکرد
- [ ] Lazy loading برای تصاویر (به جز hero)
- [ ] Dynamic imports برای کامپوننت‌های سنگین
- [ ] Image optimization (width, height, sizes, placeholder)
- [ ] Code splitting و bundle analysis
- [ ] Static generation برای صفحات استاتیک
- [ ] Font optimization با next/font

### 👨‍💻 حرفه‌ای بودن
- [ ] Error Boundaries برای بخش‌های مهم
- [ ] Loading states و Skeleton loaders
- [ ] Performance monitoring (Web Vitals)
- [ ] Accessibility improvements
- [ ] Security best practices
- [ ] API error handling مرکزی
- [ ] SEO advanced (OG tags, Structured Data, Sitemap)
- [ ] Environment variables management
- [ ] State management optimization
- [ ] Type safety (JSDoc یا TypeScript)

---

## 📊 اولویت‌بندی زمانی

### هفته اول (بحرانی)
- Error handling
- Navigation fixes
- Dark mode fix
- 404 page

### هفته دوم (مهم)
- SEO metadata
- Console.log cleanup
- Config optimization
- Font optimization

### هفته سوم (سرعت)
- Image optimization
- Code splitting
- Dynamic imports
- Performance monitoring

### هفته چهارم (حرفه‌ای)
- Accessibility
- Security
- Advanced SEO
- Documentation

---

## 📝 نکات نهایی

1. **تست کردن:** بعد از هر تغییر، حتماً تست کنید که همه چیز کار می‌کند
2. **Performance Testing:** از Lighthouse و Web Vitals استفاده کنید
3. **Mobile Testing:** حتماً روی موبایل تست کنید
4. **Browser Testing:** روی مرورگرهای مختلف تست کنید
5. **Documentation:** تغییرات را document کنید

---

> 📅 تاریخ ایجاد: دی ۱۴۰۴
> 
> ⏱️ زمان تخمینی انجام: 3-4 هفته
> 
> 👤 مسئول: تیم فرانت‌اند

