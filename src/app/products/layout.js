import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "محصولات | میکرولس",
  description:
    "خرید محصولات از آمازون آمریکا و امارات با ارسال سریع به ایران. هزاران محصول اصل و گارانتی شده با بهترین قیمت.",
  keywords: ["محصولات", "آمازون", "خرید", "فروشگاه آنلاین", "محصولات آمریکا", "محصولات امارات"],
  url: "/products",
});

export default function ProductsLayout({ children }) {
  return children;
}

