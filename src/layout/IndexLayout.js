import React from "react";
import Header from "../components/module/Header";
import Footer from "../components/module/Footer";
import BottomNavigation from "@/components/module/BottomNavigation";
import { CartCountProvider } from "@/contexts/CartCountContext";

function IndexLayout({ children }) {
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

export default IndexLayout;
