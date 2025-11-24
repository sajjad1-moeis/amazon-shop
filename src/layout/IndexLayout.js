import React from "react";
import Header from "../components/module/Header";
import Footer from "../components/module/Footer";

function IndexLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default IndexLayout;
