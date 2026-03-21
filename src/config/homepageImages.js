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

  /** بنرهای گرید ۴تایی — لینک به جستجوی سایت (/products?search=…). چپ→راست: action figure، headphone، Air purifier، keychron */
  banners: [
    { src: "/image/Home/banner1.png", href: "/products?search=action%20figure" },
    { src: "/image/Home/banner2.png", href: "/products?search=headphone" },
    { src: "/image/Home/banner3.png", href: "/products?search=Air%20purifier" },
    { src: "/image/Home/banner4.png", href: "/products?search=keychron" },
  ],
};

/** دسته‌بندی‌های صفحه اصلی — تصاویر در public/image/Home/ (category1.png تا category7.png). هر آیتم: src، label، href (لینک دقیق هر دسته). */
export const HOMEPAGE_CATEGORIES = [
  { src: "/image/Home/category1.png", label: "ورزش و سفر", href: "/products?category=1" },
  { src: "/image/Home/category2.png", label: "کتاب و لوازم تحریر", href: "/products?category=2" },
  { src: "/image/Home/category3.png", label: "الکترونیک", href: "/products?category=3" },
  { src: "/image/Home/category4.png", label: "مد و پوشاک", href: "/products?category=4" },
  { src: "/image/Home/category5.png", label: "خانه و آشپزخانه", href: "/products?category=5" },
  { src: "/image/Home/category6.png", label: "زیبایی و سلامت", href: "/products?category=6" },
  { src: "/image/Home/category7.png", label: "اسباب بازی", href: "/products?category=7" },
];
