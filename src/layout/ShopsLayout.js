import FAQSection from "@/components/module/FAQSection";
import PurchasingSteps from "@/components/module/PurchasingSteps";
import TicketRequest from "@/components/module/TicketRequest";
import SearchBoxShop from "@/components/SearchBoxShop";
import IndexLayout from "@/layout/IndexLayout";
import Image from "next/image";

export default function ShopsLayout({ children, src, title, direct, removeStepBuyComp }) {
  return (
    <IndexLayout>
      <div class="bg-[#FBFBFB] ">
        <div className="relative aspect-square max-h-[480px] w-full">
          <Image src={src} alt={`محصول بازدید شده شماره `} fill className="object-cover" />
        </div>
        <SearchBoxShop />
        <div className=" relative mt-28">
          <div class="bg-gray-50">
            {direct}
            {removeStepBuyComp || <PurchasingSteps title={`مراحل خرید از ${title}`} />}
            <div className="relative  max-w-4xl w-full mx-auto mt-28">
              <img src="/image/optionsSite.png" alt={`محصول بازدید شده شماره `} />
            </div>
            {children}
            <FAQSection />
            <TicketRequest />
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
