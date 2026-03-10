import React from "react";
import ServicesHeader from "@/components/module/ServicesHeader";
import Footer from "@/components/module/Footer";
import BottomNavigation from "@/components/module/BottomNavigation";
import { CartCountProvider } from "@/contexts/CartCountContext";

export default function ServicesLayout({ children }) {
  return (
    <CartCountProvider>
      <div>
        <ServicesHeader />
        {children}
        <Footer />
        <BottomNavigation />
      </div>
    </CartCountProvider>
  );
}
