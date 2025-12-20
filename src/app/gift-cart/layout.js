import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "کارت هدیه | میکروالس",
  description:
    "خرید کارت هدیه پلی‌استیشن، استیم، اپل و سایر برندهای معتبر از میکروالس. کارت‌های هدیه معتبر با بهترین قیمت و ارسال فوری.",
  keywords: ["کارت هدیه", "گیفت کارت", "پلی‌استیشن", "استیم", "اپل", "خرید گیفت کارت"],
  url: "/gift-cart",
});

export default function GiftCartLayout({ children }) {
  return children;
}

