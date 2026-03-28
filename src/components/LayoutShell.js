"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/module/Header";
import Footer from "@/components/module/Footer";
import BottomNavigation from "@/components/module/BottomNavigation";
import { CartCountProvider } from "@/contexts/CartCountContext";

/**
 * برای مسیرهای عمومی (غیر از داشبورد و ادمین) هدر، فوتر و نوار پایین را نمایش می‌دهد
 * تا ساختار قالب سایت یکپارچه بماند حتی اگر صفحهٔ فرزند IndexLayout استفاده نکرده باشد.
 */
export default function LayoutShell({ children }) {
  const pathname = usePathname() ?? "";
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  /** صفحهٔ خدمات ارزی قالب مخصوص (ServicesHeader) دارد؛ هدر/فوتر اصلی سایت تکراری می‌شود */
  const isCurrencyServicesPublic = pathname === "/currency-services" || pathname.startsWith("/currency-services/");

  if (isDashboard || isAdmin || isCurrencyServicesPublic) {
    return <>{children}</>;
  }

  return (
    <CartCountProvider>
      <div>
        <Header />
        {children}
        <Footer />
        <BottomNavigation />
      </div>
    </CartCountProvider>
  );
}
