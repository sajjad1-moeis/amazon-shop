/**
 * تنظیمات تصاویر صفحه اول — طبق فیگما
 * برای جایگزینی تصاویر طبق فیگما به‌روز شده، مسیرهای زیر را عوض کنید.
 * فایل‌های جدید را در public/image/Home/ قرار دهید.
 * بنرهای زیر (banners): مربوط به قسمت تخفیفات/دسته‌بندی — عکس‌های طراحی‌شدهٔ دسته‌بندی را اینجا قرار دهید.
 */
export const HOMEPAGE_IMAGES = {
  /** بنر اصلی هیرو (بخش آمازون) */
  heroBanner: "/image/Home/amazonBg.jpg",

  /** بنرهای گرید ۴تایی — تخفیفات/دسته‌بندی (۱ تا ۴). هر آیتم: src و href (لینک مقصد). برای جایگزینی عکس‌های جدید فقط src/href را عوض کنید. */
  banners: [
    { src: "/image/Home/banner1.png", href: "/products" },
    { src: "/image/Home/banner2.png", href: "/products" },
    { src: "/image/Home/banner3.png", href: "/products" },
    { src: "/image/Home/banner4.png", href: "/products" },
  ],
};
