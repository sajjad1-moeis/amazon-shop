import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "بلاگ | میکروالس",
  description:
    "مقالات و راهنمای خرید از آمازون، نکات خرید آنلاین، بررسی محصولات و آخرین اخبار و اطلاعات در مورد خرید از فروشگاه‌های بین‌المللی.",
  keywords: ["بلاگ", "مقاله", "راهنمای خرید", "آمازون", "خرید آنلاین", "بررسی محصولات"],
  url: "/blogs",
});

export default function BlogsLayout({ children }) {
  return children;
}

