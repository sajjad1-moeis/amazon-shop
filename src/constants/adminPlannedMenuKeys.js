/**
 * کلیدهای رزروشده برای آیتم‌های منوی ادمین — فاز ۱ نقشه راه.
 * هنگام افزودن آیتم جدید در `adminSidebarData.js` از همین مقدارها استفاده کنید
 * تا با بک‌اند Security/Permission (در صورت اتصال بعدی) هم‌نام بمانند.
 * فاز ۲ (سفارشات): کلید parent همان `order` موجود در sidebar است؛ کلید جدید لازم نیست.
 *
 * @see docs/admin-developer-handbook.md
 */
export const ADMIN_PLANNED_MENU_KEYS = Object.freeze({
  /** فاز ۶ — مدیریت جستجو */
  searchManagement: "search-management",

  /** فاز ۷ — سورس‌ها و اسکرپ (متمایز از scraper-data فعلی در صورت تفکیک منو) */
  sourcesScraper: "sources-scraper",

  /** فاز ۷ / تکمیل پروکسی */
  proxyManagement: "proxy-management",

  /** فاز ۸ — Job / Queue / Sync */
  jobsSync: "jobs-sync",

  /** فاز ۹ — مرکز ترجمه */
  translationCenter: "translation-center",

  /** فاز ۹ — کنترل کیفیت محصول */
  productQa: "product-qa",

  /** فاز ۱۰ — API و یکپارچه‌سازی */
  integrationCenter: "integration-center",

  /** فاز ۱۰ — SEO و لندینگ */
  seoLanding: "seo-landing",

  /** فاز ۱۰ — بنر، اسلایدر، بلاک صفحه */
  contentBlocks: "content-blocks",

  /** فاز ۱۰ — Audit / فعالیت ادمین‌ها */
  auditLog: "audit-log",

  /** فاز ۱۰ — هاب قیمت‌گذاری (متمایز از setting در صورت منوی جدا) */
  pricingHub: "pricing-hub",

  /** فاز ۱۰ — لاگ تفکیک‌شده (زیرمجموعه امنیت یا منوی جدا) */
  logsExtended: "logs-extended",
});
