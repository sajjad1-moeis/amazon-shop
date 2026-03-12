import React from "react";
import { CartCountProvider } from "@/contexts/CartCountContext";

/**
 * قالب اصلی صفحات عمومی: فقط CartCountProvider.
 * هدر، فوتر و نوار پایین از LayoutShell در روت لایوت می‌آیند تا همیشه نمایش داده شوند.
 */
function IndexLayout({ children }) {
  return <CartCountProvider>{children}</CartCountProvider>;
}

export default IndexLayout;
