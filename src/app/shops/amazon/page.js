import BrandsSection from "@/template/AmazonShop/BrandsSection";
import DirectPurchase from "@/template/AmazonShop/DirectPurchase";
import ShoppingTraining from "@/template/AmazonShop/ShoppingTraining";
import React from "react";
import ShopsLayout from "@/layout/ShopsLayout";

function Page() {
  return (
    <ShopsLayout
      direct={<DirectPurchase />}
      imgClassName={"max-md:max-h-44"}
      removeStepBuyComp
      title={"آمازون"}
      src={"/image/Amazon-Shop/buyEmarat.jpg"}
    >
      <div>
        <div>
          <ShoppingTraining />
          <BrandsSection />
        </div>
      </div>
    </ShopsLayout>
  );
}

export default Page;
