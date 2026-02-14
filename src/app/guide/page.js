"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import ShippingReturnPolicy from "@/template/Guide/ShippingReturnPolicy";
import IndexLayout from "@/layout/IndexLayout";
import IntroductionCard from "@/components/IntroductionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GUIDE_ITEMS } from "@/data";

function GuidesContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  console.log(sectionParam);
  const defaultSection = GUIDE_ITEMS.find((item) => item.id === sectionParam)?.id || "shipping-return";
  const [activeGuide, setActiveGuide] = useState(defaultSection);

  useEffect(() => {
    if (sectionParam) {
      const foundSection = GUIDE_ITEMS.find((item) => item.id === sectionParam);
      if (foundSection) {
        setActiveGuide(foundSection.id);
      }
    }
  }, [sectionParam]);

  const ActiveComponent = GUIDE_ITEMS.find((item) => item.id === activeGuide)?.component || ShippingReturnPolicy;
  const activeClasses =
    "data-[state=active]:bg-gray-50 data-[state=active]:border-b-2 border-yellow-500 dark:border-[#FFC107] flex-none " +
    "data-[state=active]:!text-yellow-600 dark:data-[state=active]:!text-[#FFC107] dark:data-[state=active]:bg-white/10 text-gray-500 dark:text-dark-text px-5 py-3 rounded-none transition";

  return (
    <>
      <IntroductionCard
        desc="تمام مراحل خرید، ارسال و استفاده از خدمات میکرولس به‌صورت ساده و مرحله‌به‌مرحله"
        title={"راهنمای خدمات سایت"}
      />
      <div className=" bg-gray-50 dark:bg-dark-bg  md:py-8 lg:px-4 ">
        <div className="max-lg:px-4 lg:container">
          <div className=" mx-auto max-lg:hidden ">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <aside className="w-full lg:w-80 shrink-0">
                <div
                  className="bg-white dark:bg-dark-box rounded-2xl p-6 sticky top-8"
                  style={{ boxShadow: "0px 1px 5px -1px #0000001F" }}
                >
                  <h2 className="text-xl  text-gray-900 mb-6 dark:text-dark-title">فهرست راهنماها</h2>
                  <nav className="space-y-2">
                    {GUIDE_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveGuide(item.id)}
                        className={cn(
                          "w-full text-right px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                          activeGuide === item.id
                            ? "bg-gray-100 dark:bg-white/10 text-yellow-600"
                            : "bg-white dark:bg-transparent dark:text-dark-text text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-1 bg-white dark:bg-dark-box dark:border-dark-field rounded-2xl border border-gray-200 shadow-sm py-4 px-6">
                <ActiveComponent />
              </main>
            </div>
          </div>
          <div className="pt-10 pb-20 lg:hidden">
            <Tabs
              dir="rtl"
              value={activeGuide}
              onValueChange={setActiveGuide}
              className=" w-full rounded-xl overflow-hidden shadow rounded-t-xl"
            >
              <TabsList className="bg-white dark:border-b-2 dark:border-white/10 dark:bg-dark-box w-full justify-between  h-full  rounded-b-none p-0 flex flex-nowrap overflow-auto">
                {GUIDE_ITEMS.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className={activeClasses}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* محتوا برای هر تب */}
              {GUIDE_ITEMS.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="p-2 bg-white dark:bg-dark-box space-y-4 mt-0">
                  <tab.component />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default function GuidesPage() {
  return (
    <IndexLayout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>}>
        <GuidesContent />
      </Suspense>
    </IndexLayout>
  );
}
