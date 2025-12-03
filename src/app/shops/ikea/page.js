import ProductPurchaseForm from "@/components/module/ProductPurchaseForm";
import DirectPurchase from "@/template/IkeaShop/DirectPurchase";
import ShoppingTraining from "@/template/IkeaShop/ShoppingTraining";
import React from "react";
import ShopsLayout from "@/layout/ShopsLayout";

function Page() {
  return (
    <ShopsLayout
      title={"ایکیا"}
      direct={
        <>
          <DirectPurchase />
        </>
      }
      src="/image/Shops/ikeaShop.png"
    >
      <ProductPurchaseForm />

      <ShoppingTraining />
    </ShopsLayout>
    // <IndexLayout>
    //   <div className="bg-[#FBFBFB] ">
    //     <div className="relative aspect-square max-h-[480px] w-full">
    //       <Image alt={`محصول بازدید شده شماره `} fill className="object-cover" />
    //     </div>
    //     <SearchBoxShop />
    //     <div className=" relative mt-28">
    //       <div className="bg-gray-50">
    //         <DirectPurchase />
    //         <PurchasingSteps title="مراحل خرید از ایکیا" />
    //         <div className="relative  max-w-4xl w-full mx-auto mt-28">
    //           <img src="/image/optionsSite.png" alt={`محصول بازدید شده شماره `} />
    //         </div>
    //         <ProductPurchaseForm />
    //         <ShoppingTraining />
    //         <FAQSection />
    //         <TicketRequest />
    //       </div>
    //     </div>
    //   </div>
    // </IndexLayout>
  );
}

export default Page;
