import React from "react";
import Header from "../components/module/Header";
import Footer from "../components/module/Footer";
import BottomNavigation from "@/components/module/BottomNavigation";

function IndexLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <BottomNavigation />
    </div>
  );
}

export default IndexLayout;
