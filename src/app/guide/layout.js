import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "راهنمای خدمات | میکروالس",
  description:
    "راهنمای کامل استفاده از خدمات میکروالس: نحوه خرید، ارسال، پرداخت، بازگشت کالا و استفاده از خدمات ارزی. همه چیز را اینجا یاد بگیرید.",
  keywords: ["راهنما", "راهنمای خرید", "خدمات میکروالس", "آموزش خرید", "راهنمای ارسال"],
  url: "/guide",
});

export default function GuideLayout({ children }) {
  return children;
}

