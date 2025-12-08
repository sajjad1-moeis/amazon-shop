import "../styles/globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "میکروالس | خرید مطمئن از آمازون",
  description:
    "میکروالس پلتفرم مطمئن خرید از آمازون آمریکا و امارات با ارسال سریع به ایران، پشتیبانی واقعی و تضمین اصالت کالا.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body dir="rtl">
        <Providers>
          <main className="overflow-hidden max-md:pb-20 dark:bg-dark-bg">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
