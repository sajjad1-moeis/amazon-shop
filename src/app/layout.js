import { Toaster } from "sonner";
import "../styles/globals.css";

export const metadata = {
  title: "میکروالس | خرید مطمئن از آمازون",
  description:
    "میکروالس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body dir="rtl">{children}</body>
      <Toaster position="top-right" dir="rtl" />
    </html>
  );
}
