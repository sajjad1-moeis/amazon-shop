import ProductPurchaseForm from "@/components/module/ProductPurchaseForm";
import BuyEboyDiscount from "@/template/EboyShop/BuyEboyDiscount";
import DirectPurchase from "@/template/EboyShop/DirectPurchase";
import React from "react";
import ShopsLayout from "@/layout/ShopsLayout";
import ShoppingTraining from "@/template/EboyShop/ShoppingTraining";

function Page() {
  return (
    <ShopsLayout title={"ایبی"} direct={<DirectPurchase />} src="/image/Shops/eboyShop.png">
      <div class="bg-gray-50">
        <ProductPurchaseForm />
        <BuyEboyDiscount />
        <ShoppingTraining />
      </div>
    </ShopsLayout>
  );
}

export default Page;
