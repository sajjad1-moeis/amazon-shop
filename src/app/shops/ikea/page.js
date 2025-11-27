import FAQSection from "@/components/module/FAQSection";
import ProductPurchaseForm from "@/components/module/ProductPurchaseForm";
import PurchasingSteps from "@/components/module/PurchasingSteps";
import TicketRequest from "@/components/module/TicketRequest";
import SearchBoxShop from "@/components/SearchBoxShop";
import IndexLayout from "@/layout/IndexLayout";
import DirectPurchase from "@/template/IkeaShop/DirectPurchase";
import ShoppingTraining from "@/template/EboyShop/ShoppingTraining";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <div class="bg-[#FBFBFB] ">
        <div className="relative aspect-square max-h-[480px] w-full">
          <Image src="/image/Shops/ikeaShop.png" alt={`محصول بازدید شده شماره `} fill className="object-cover" />
        </div>
        <SearchBoxShop />
        <div className=" relative mt-28">
          <div class="bg-gray-50">
            <DirectPurchase />
            <PurchasingSteps title="مراحل خرید از ایکیا" />
            <div className="relative  max-w-4xl w-full mx-auto mt-28">
              <img src="/image/optionsSite.png" alt={`محصول بازدید شده شماره `} />
            </div>
            <ProductPurchaseForm />
            <ShoppingTraining />
            <FAQSection />
            <TicketRequest />
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}

export default Page;
