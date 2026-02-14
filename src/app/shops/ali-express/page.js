import React from "react";
import ShopsLayout from "@/layout/ShopsLayout";
import Categories from "@/template/AliExShop/Categories";
import DirectPurchase from "@/template/AliExShop/DirectPurchase";
import BannerSection from "@/template/AliExShop/BannerSection";
import ProductPurchaseForm from "@/components/module/ProductPurchaseForm";
import ShoppingTraining from "@/template/AliExShop/ShoppingTraining";

function Page() {
  return (
    <ShopsLayout
      title={"علی اکسپرس"}
      searchLogo={"/image/Header/aliEx.png"}
      direct={
        <>
          <Categories />
          <DirectPurchase />
          <BannerSection />
        </>
      }
      removeStepBuyComp
      src={"/image/AliEx/aliExShop.jpg"}
    >
      <div>
        <ProductPurchaseForm />
        <ShoppingTraining />
      </div>
    </ShopsLayout>
  );
}

export default Page;
