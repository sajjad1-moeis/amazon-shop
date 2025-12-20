import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import localFont from "next/font/local";
import "../styles/globals.css";
import { Toaster } from "sonner";

const iranSans = localFont({
  src: "../assets/fonts/IRANSansWeb(FaNum)_Medium.ttf",
  variable: "--font-iran-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const metadata = {
  title: "میکروالس | خرید مطمئن از آمازون",
  description:
    "میکروالس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" suppressHydrationWarning className={iranSans.variable}>
      <body dir="rtl" className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <main className="overflow-hidden max-md:pb-20 dark:bg-dark-bg">{children}</main>
            <Toaster dir="rtl" position="top-right" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
