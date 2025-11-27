import BrandsSection from "@/template/AmazonShop/BrandsSection";
import DirectPurchase from "@/template/AmazonShop/DirectPurchase";
import ShoppingTraining from "@/template/AmazonShop/ShoppingTraining";
import React from "react";
import ShopsLayout from "@/layout/ShopsLayout";

function Page() {
  return (
    <ShopsLayout direct={<DirectPurchase />} removeStepBuyComp src={"/image/Amazon-Shop/buyEmarat.png"}>
      <div class="bg-[#FBFBFB] ">
        <div class="bg-gray-50">
          <ShoppingTraining />
          <BrandsSection />
        </div>
      </div>
    </ShopsLayout>
  );
}

export default Page;
