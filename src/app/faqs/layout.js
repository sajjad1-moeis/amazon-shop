import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "سوالات متداول | میکرولس",
  description:
    "پاسخ به سوالات متداول درباره خرید از آمازون، ارسال کالا، پرداخت، بازگشت کالا و خدمات میکرولس. همه سوالات شما در اینجا پاسخ داده می‌شود.",
  keywords: ["سوالات متداول", "FAQ", "راهنما", "پاسخ سوالات", "میکرولس"],
  url: "/faqs",
});

export default function FaqsLayout({ children }) {
  return children;
}

