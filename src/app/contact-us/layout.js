import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "تماس با ما | میکرولس",
  description:
    "تماس با پشتیبانی میکرولس. راه‌های ارتباطی، آدرس، شماره تماس و فرم تماس برای دریافت راهنمایی و پاسخ به سوالات شما.",
  keywords: ["تماس با ما", "پشتیبانی", "راهنمایی", "میکرولس", "تماس"],
  url: "/contact-us",
});

export default function ContactUsLayout({ children }) {
  return children;
}

