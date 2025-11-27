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
      direct={
        <>
          <Categories />
          <DirectPurchase />
          <BannerSection />
        </>
      }
      removeStepBuyComp
      src={"/image/AliEx/aliExShop.png"}
    >
      <div class="bg-[#FBFBFB]">
        <div class="bg-gray-50">
          <ProductPurchaseForm />
          <ShoppingTraining />
        </div>
      </div>
    </ShopsLayout>
  );
}

export default Page;
