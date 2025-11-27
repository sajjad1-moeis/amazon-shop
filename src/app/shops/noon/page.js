import ProductPurchaseForm from "@/components/module/ProductPurchaseForm";
import ShopsLayout from "@/layout/ShopsLayout";
import DirectPurchase from "@/template/NoonShop/DirectPurchase";
import ShoppingTraining from "@/template/NoonShop/ShoppingTraining";
import React from "react";

function Page() {
  return (
    <ShopsLayout direct={<DirectPurchase />} title={"نون"} src="/image/Shops/noonShop.png">
      <div class="bg-gray-50">
        <ProductPurchaseForm />
        <ShoppingTraining />
      </div>
    </ShopsLayout>
  );
}

export default Page;
