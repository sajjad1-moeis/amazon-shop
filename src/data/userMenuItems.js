/**
 * آیتم‌های منوی کاربر در هدر — داینامیک برای تغییر/اضافه بدون دست زدن به کامپوننت
 */
import {
  Element4,
  BitcoinConvert,
  Heart,
  Bag,
  Box,
  Headphone,
  Profile,
  Location,
  Lock,
  Diamonds,
  ShieldSecurity,
} from "iconsax-reactjs";

export const USER_MENU_ITEMS = [
  { label: "ورود به داشبورد", href: "/dashboard", icon: Element4 },
  { label: "خدمات ارزی", href: "/dashboard/currency-services", icon: BitcoinConvert },
  { label: "علاقه‌مندی‌ها", href: "/dashboard/favorites", icon: Heart },
  { label: "خریدهای من", href: "/dashboard/purchases", icon: Bag },
  { label: "سفارش‌های من", href: "/dashboard/orders", icon: Box },
  { label: "تیکت و پشتیبانی", href: "/dashboard/support", icon: Headphone },
  { label: "پروفایل کاربری", href: "/dashboard/account/profile", icon: Profile },
  { label: "آدرس‌های من", href: "/dashboard/account/addresses", icon: Location },
  { label: "قفل قیمت", href: "/dashboard/price-lock", icon: Lock },
  { label: "خرید اختصاصی از آمازون", href: "/dashboard/exclusive-amazon", icon: Diamonds },
];

export const ADMIN_MENU_ITEM = {
  label: "پنل ادمین",
  href: "/admin",
  icon: ShieldSecurity,
};
