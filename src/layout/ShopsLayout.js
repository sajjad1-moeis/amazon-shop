import FAQSection from "@/components/module/FAQSection";
import PurchasingSteps from "@/components/module/PurchasingSteps";
import TicketRequest from "@/components/module/TicketRequest";
import SearchBoxShop from "@/components/SearchBoxShop";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import IndexLayout from "@/layout/IndexLayout";
import { cn } from "@/lib/utils";
import { Home } from "iconsax-reactjs";
import Image from "next/image";

export default function ShopsLayout({
  children,
  src,
  title,
  direct,
  isWhite,
  removeStepBuyComp,
  imgClassName,
  searchLogo,
}) {
  return (
    <IndexLayout>
      <div className="bg-[#FBFBFB] dark:bg-dark-bg">
        <div className={cn("relative w-full", imgClassName)}>
          {" "}
          <div className="absolute bottom-0 w-full h-2/4 dark:hidden liner-shop-bg-white z-[50]" />
          <div className="absolute bottom-0 w-full h-2/4 hidden dark:block liner-shop-bg-dark z-[50]" />
          <div className="absolute top-5 right-5 z-50 max-md:hidden">
            <Breadcrumb>
              <BreadcrumbList className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/55 backdrop-blur-sm text-white shadow-lg">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white hover:text-white/90 transition-colors">
                    <div className="flex items-center gap-2">
                      <Home size={20} variant="Bold" />
                      خانه
                    </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="rotate-180 text-white/70 [&>svg]:text-white/70" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-white">خرید از {title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <Image src={src} alt={"محصول بازدید شده شماره "} fill className="max-lg:object-cover" />{" "} */}
          <Image
            src={src}
            alt="سپر کیفیت میکرولس"
            width={1200}
            height={600}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="max-lg:px-4 relative z-50">
          <SearchBoxShop type={title} isWhite={isWhite} searchLogo={searchLogo} />
        </div>
        <div className=" relative mt-10 lg:mt-28 ">
          <div className="bg-gray-50 dark:bg-dark-bg">
            {direct}
            {removeStepBuyComp || <PurchasingSteps title={`مراحل خرید از ${title}`} />}
            <div className="relative  max-w-4xl w-full mx-auto mt-28 max-md:hidden">
              <img src="/image/optionsSite.png" className="dark:hidden" alt={`محصول بازدید شده شماره `} />
              <img src="/image/optionsSiteDark.png" className="hidden dark:block" alt={`محصول بازدید شده شماره `} />
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
