import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import LinerBg from "@/components/LinerBg";
import { tabsCurrency } from "@/data";
import Image from "next/image";

function Page() {
  const activeClasses =
    "flex-none md:flex-1 w-fit data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-white/10 data-[state=active]:border-b-2 border-primary-500 dark:border-dark-title " +
    "data-[state=active]:text-primary-600 data-[state=active]:dark:text-dark-title text-gray-500 px-4 py-3 rounded-none transition";

  return (
    <div className="">
      <div className="relative max-md:bg-[url(/image/CurrencyServices/CurrencyServicesBg.jpg)] bg-cover max-md:py-20">
        <LinerBg />

<Image
  src="/image/CurrencyServices/CurrencyServicesBg.jpg"
  alt=""
  width={1920}      // عرض واقعی یا تقریبی تصویر
  height={801}      // ارتفاع واقعی تصویر
  className="w-full h-auto  max-md:hidden"
  priority
/>

      </div>
      <div className="max-md:p-4">
        <div className="mb-20 max-w-5xl mx-auto md:-mt-[18%]  relative rounded-xl">
          <Tabs
            dir="rtl"
            defaultValue="forex"
            className="container !p-0 w-full rounded-xl dark:bg-dark-box  bg-white overflow-hidden shadow"
          >
            <TabsList className="bg-white h-full   dark:border-b-2 dark:border-white/10 w-full justify-between overflow-auto rounded-t-xl rounded-b-none p-0 dark:bg-white/10">
              {tabsCurrency.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className={activeClasses}>
                  <tab.icon className="ml-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabsCurrency.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="pt-5 m-0  dark:bg-white/10 dark:bg-dark-box bg-white"
              >
                <tab.componnet />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Page;
