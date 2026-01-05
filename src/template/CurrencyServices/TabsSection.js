import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import LinerBg from "@/components/LinerBg";
import { tabsCurrency } from "@/data";

function Page() {
  const activeClasses =
    "w-full data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-white/10 data-[state=active]:border-b-2 border-primary-500 dark:border-dark-title " +
    "data-[state=active]:text-primary-600 data-[state=active]:dark:text-dark-title text-gray-500 px-4 py-3 rounded-none transition";

  return (
    <div className="">
      <div className="relative max-md:bg-[url(/image/CurrencyServices/CurrencyServicesBg.png)] bg-cover max-md:py-20">
        <LinerBg />

        <div className="md:absolute md:size-max md:inset-0 m-auto z-50 md:-translate-y-full  text-white text-center">
          <h1 className="text-primary-50 text-xl md:text-3xl lg:text-5xl">خدمات ارزی سریع و مطمئن</h1>
          <p className="text-white/60 text-xs md:text-lg lg:text-xl mt-1 md:mt-3 w-1/2 lg:w-2/3 mx-auto">
            پرداخت ارزی، شارژ حساب، خرید کالا، پرداخت آمازون و تسویه بین‌المللی با کمترین کارمزد از طریق سیستم امن ما.
          </p>
        </div>
        <img
          src="/image/CurrencyServices/CurrencyServicesBg.png"
          className="max-h-[801px] max-md:hidden w-full"
          alt=""
        />
      </div>
      <div className="max-md:p-4">
        <div className="mb-20 max-w-5xl mx-auto -mt-[10%] md:-mt-[20%]  relative rounded-xl">
          <Tabs
            dir="rtl"
            defaultValue="forex"
            className="container p-0 w-full rounded-xl dark:bg-dark-box  bg-white overflow-hidden shadow"
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
