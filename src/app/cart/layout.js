import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "سبد خرید | میکروالس",
  description: "مشاهده و مدیریت سبد خرید خود. محصولات انتخاب شده را بررسی کنید و سفارش خود را نهایی کنید.",
  keywords: ["سبد خرید", "خرید", "سفارش", "میکروالس"],
  url: "/cart",
});

export default function CartLayout({ children }) {
  return children;
}

