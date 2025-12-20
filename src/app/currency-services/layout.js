import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "خدمات ارزی | میکروالس",
  description:
    "خدمات ارزی میکروالس: تبدیل ارز، واریز به کیف پول‌های بین‌المللی، خرید از فروشگاه‌های خارجی با ارزهای مختلف. ساده، سریع و مطمئن.",
  keywords: ["خدمات ارزی", "تبدیل ارز", "کیف پول", "ارز خارجی", "پرداخت بین‌المللی"],
  url: "/currency-services",
});

export default function CurrencyServicesLayout({ children }) {
  return children;
}

