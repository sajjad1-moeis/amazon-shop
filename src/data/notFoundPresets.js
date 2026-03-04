/**
 * پیش‌تنظیمات متن و دکمه‌ها برای NotFoundView — محصول، وبلاگ، و پیش‌فرض
 * با اضافه کردن preset جدید می‌توانی همه‌جا از همین ویو استفاده کنی.
 */

export const NOT_FOUND_PRESETS = {
  product: {
    title: "محصول مورد نظر پیدا نشد",
    description:
      "میتوانید محصول مشابه را جستجو کنید یا درخواست بررسی برای ما ارسال کنید.",
    primaryButton: { label: "رفتن به صفحه اصلی", href: "/" },
    secondaryButton: { label: "ارتباط با پشتیبانی", href: "/contact-us" },
  },
  /** صفحه لیست محصولات — وقتی جستجو/فیلتر نتیجه‌ای نداشت */
  products: {
    title: "محصولی یافت نشد",
    description: "عبارت جستجو را تغییر دهید یا بعداً تلاش کنید.",
    primaryButton: { label: "رفتن به صفحه اصلی", href: "/" },
    secondaryButton: { label: "ارتباط با پشتیبانی", href: "/contact-us" },
  },
  blog: {
    title: "مطلب مورد نظر پیدا نشد",
    description:
      "میتوانید از بخش وبلاگ مطلب دیگری بخوانید یا با پشتیبانی در ارتباط باشید.",
    primaryButton: { label: "رفتن به صفحه اصلی", href: "/" },
    secondaryButton: { label: "ارتباط با پشتیبانی", href: "/contact-us" },
  },
  default: {
    title: "صفحه مورد نظر یافت نشد",
    description: "آدرس را بررسی کنید یا به صفحه اصلی برگردید.",
    primaryButton: { label: "رفتن به صفحه اصلی", href: "/" },
    secondaryButton: { label: "ارتباط با پشتیبانی", href: "/contact-us" },
  },
};

/** @param {"product"|"products"|"blog"|"default"} key */
export function getNotFoundPreset(key) {
  return NOT_FOUND_PRESETS[key] ?? NOT_FOUND_PRESETS.default;
}
