/**
 * تنظیمات تصاویر صفحه اول — طبق فیگما
 * فایل‌های جدید را در public/image/Home/ قرار دهید.
 */

/** اسلایدهای هیرو (اسلایدر اول صفحه اصلی) — هر آیتم: src، href، alt. لینک هر اسلاید را می‌توانید اینجا تغییر دهید. */
export const HERO_SLIDES = [
  { src: "/image/Home/slide1.webp", href: "/products", alt: "محصولات" },
  { src: "/image/Home/slide2.webp", href: "/outlet", alt: "تخفیف‌های آمازون" },
  { src: "/image/Home/slide3.webp", href: "/shops/amazon", alt: "خرید از آمازون" },
  { src: "/image/Home/slide4.webp", href: "/gift-cart", alt: "گیفت کارت" },
  { src: "/image/Home/slide5.webp", href: "/currency-services", alt: "خدمات ارزی" },
  { src: "/image/Home/slide6.webp", href: "/guide", alt: "راهنما" },
  { src: "/image/Home/slide7.webp", href: "/contact-us", alt: "ارتباط با ما" },
  { src: "/image/Home/slide8.webp", href: "/about-us", alt: "درباره ما" },
];

export const HOMEPAGE_IMAGES = {
  /** بنر اصلی هیرو (تک‌تصویر — در صورت عدم استفاده از اسلایدر) */
  heroBanner: "/image/Home/amazonBg.jpg",

  /** بنرهای گرید ۴تایی — تخفیفات/دسته‌بندی (۱ تا ۴). هر آیتم: src و href (لینک مقصد). */
  banners: [
    { src: "/image/Home/banner1.png", href: "/products" },
    { src: "/image/Home/banner2.png", href: "/products" },
    { src: "/image/Home/banner3.png", href: "/products" },
    { src: "/image/Home/banner4.png", href: "/products" },
  ],
};
