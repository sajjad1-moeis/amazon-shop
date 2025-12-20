import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "سوالات متداول | میکروالس",
  description:
    "پاسخ به سوالات متداول درباره خرید از آمازون، ارسال کالا، پرداخت، بازگشت کالا و خدمات میکروالس. همه سوالات شما در اینجا پاسخ داده می‌شود.",
  keywords: ["سوالات متداول", "FAQ", "راهنما", "پاسخ سوالات", "میکروالس"],
  url: "/faqs",
});

export default function FaqsLayout({ children }) {
  return children;
}

