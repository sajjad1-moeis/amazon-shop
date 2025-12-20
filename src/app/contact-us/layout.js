import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "تماس با ما | میکروالس",
  description:
    "تماس با پشتیبانی میکروالس. راه‌های ارتباطی، آدرس، شماره تماس و فرم تماس برای دریافت راهنمایی و پاسخ به سوالات شما.",
  keywords: ["تماس با ما", "پشتیبانی", "راهنمایی", "میکروالس", "تماس"],
  url: "/contact-us",
});

export default function ContactUsLayout({ children }) {
  return children;
}

