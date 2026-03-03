/**
 * تنظیمات تصاویر صفحه اول — طبق فیگما
 * برای جایگزینی تصاویر طبق فیگما به‌روز شده، مسیرهای زیر را عوض کنید.
 * فایل‌های جدید را در public/image/Home/ قرار دهید.
 */
export const HOMEPAGE_IMAGES = {
  /** بنر اصلی هیرو (بخش آمازون) */
  heroBanner: "/image/Home/amazonBg.jpg",

  /** بنرهای گرید ۴تایی (۱ تا ۴) — هر آیتم: src و href (لینک مقصد) */
  banners: [
    { src: "/image/Home/banner1.png", href: "/products" },
    { src: "/image/Home/banner2.png", href: "/products" },
    { src: "/image/Home/banner3.png", href: "/products" },
    { src: "/image/Home/banner4.png", href: "/products" },
  ],
};
