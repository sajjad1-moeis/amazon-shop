import SearchBoxShop from "@/components/SearchBoxShop";
import IndexLayout from "@/layout/IndexLayout";
import BrandsSection from "@/template/AmazonShop/BrandsSection";
import DirectPurchase from "@/template/AmazonShop/DirectPurchase";
import FAQSection from "@/template/AmazonShop/FAQSection";
import ShoppingTraining from "@/template/AmazonShop/ShoppingTraining";
import TicketRequest from "@/template/AmazonShop/TicketRequest";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <div class="bg-[#FBFBFB] ">
        <div className="relative aspect-square max-h-[480px] w-full">
          <Image src="/image/Amazon-Shop/buyEmarat.png" alt={`محصول بازدید شده شماره `} fill className="object-cover" />
        </div>
        <SearchBoxShop />
        <div className=" relative mt-28">
          <div class="bg-gray-50">
            <DirectPurchase />
            <div className="relative  max-w-4xl w-full mx-auto my-28">
              <img src="/image/optionsSite.png" alt={`محصول بازدید شده شماره `} />
            </div>
            <ShoppingTraining />
            <BrandsSection />
            <FAQSection />
            <TicketRequest />
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}

export default Page;
