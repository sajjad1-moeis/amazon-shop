import { Toaster } from "sonner";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "میکروالس | خرید مطمئن از آمازون",
  description:
    "میکروالس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body dir="rtl">
        <AuthProvider>
          <main className="overflow-hidden max-md:pb-20 dark:bg-dark-bg">{children}</main>
        </AuthProvider>
      </body>
      <Toaster position="top-right" dir="rtl" />
    </html>
  );
}
