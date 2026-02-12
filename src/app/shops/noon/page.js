import ProductPurchaseForm from "@/components/module/ProductPurchaseForm";
import ShopsLayout from "@/layout/ShopsLayout";
import DirectPurchase from "@/template/NoonShop/DirectPurchase";
import ShoppingTraining from "@/template/NoonShop/ShoppingTraining";
import React from "react";

function Page() {
  return (
    <ShopsLayout
      direct={<DirectPurchase />}
      searchLogo={"/image/Shops/noonStore.svg"}
      title={"نون امارت"}
      src="/image/Shops/noonShop.png"
      imgClassName={"max-md:max-h-44"}
    >
      <div>
        <ProductPurchaseForm />
        <ShoppingTraining />
      </div>
    </ShopsLayout>
  );
}

export default Page;
