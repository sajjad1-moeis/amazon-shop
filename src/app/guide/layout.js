import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "راهنمای خدمات | میکرولس",
  description:
    "راهنمای کامل استفاده از خدمات میکرولس: نحوه خرید، ارسال، پرداخت، بازگشت کالا و استفاده از خدمات ارزی. همه چیز را اینجا یاد بگیرید.",
  keywords: ["راهنما", "راهنمای خرید", "خدمات میکرولس", "آموزش خرید", "راهنمای ارسال"],
  url: "/guide",
});

export default function GuideLayout({ children }) {
  return children;
}

