import FAQSection from "@/components/module/FAQSection";
import PurchasingSteps from "@/components/module/PurchasingSteps";
import TicketRequest from "@/components/module/TicketRequest";
import SearchBoxShop from "@/components/SearchBoxShop";
import IndexLayout from "@/layout/IndexLayout";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ShopsLayout({ children, src, title, direct, removeStepBuyComp, imgClassName }) {
  return (
    <IndexLayout>
      <div class="bg-[#FBFBFB] ">
        <div className={cn("relative aspect-square max-h-52 md:max-h-[350px] lg:max-h-[480px] w-full", imgClassName)}>
          <Image src={src} alt={`محصول بازدید شده شماره `} fill className="object-cover" />
        </div>
        <div class="max-lg:px-4">
          <SearchBoxShop />
        </div>
        <div className=" relative mt-10 lg:mt-28">
          <div class="bg-gray-50">
            {direct}
            {removeStepBuyComp || <PurchasingSteps title={`مراحل خرید از ${title}`} />}
            <div className="relative  max-w-4xl w-full mx-auto mt-28 max-md:hidden">
              <img src="/image/optionsSite.png" alt={`محصول بازدید شده شماره `} />
            </div>
            <div className="relative  max-w-4xl w-full mx-auto mt-14 md:hidden">
              <img src="/image/optionsSiteMd.png" alt={`محصول بازدید شده شماره `} />
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
