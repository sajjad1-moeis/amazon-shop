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
  title: "میکرولس | خرید مطمئن از آمازون",
  description:
    "میکرولس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" suppressHydrationWarning className={iranSans.variable}>
      <body dir="rtl" className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <main className="overflow-hidden  dark:bg-dark-bg">{children}</main>
            <Toaster dir="rtl" position="top-right" richColors className={iranSans.variable} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
