import FaqCard from "@/components/FaqCard";
import IntroductionCard from "@/components/IntroductionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqs, faqTabs } from "@/data";
import IndexLayout from "@/layout/IndexLayout";
import React from "react";

function Page() {
  const activeClasses =
    "data-[state=active]:bg-primary-50 data-[state=active]:border-b-2 dark:border-dark-title border-primary-500 !w-full" +
    "data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title dark:data-[state=active]:bg-white/10 dark:text-dark-text text-gray-500 px-5 py-3 rounded-none transition";

  return (
    <IndexLayout>
      <IntroductionCard title="سوالات متداول" items={[{ label: "سوالات متداول" }]} />

      <div className="pt-10 pb-20 bg-gray-50 dark:bg-dark-bg">
        <Tabs dir="rtl" defaultValue="amazon" className="container w-full rounded-xl overflow-hidden ">
          <TabsList className="bg-white dark:bg-dark-field  shadow w-full justify-between overflow-auto flex-none lg:overflow-hidden h-full rounded-xl p-0 flex flex-nowrap lg:grid grid-cols-6 ">
            {faqTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className={activeClasses}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* محتوا برای هر تب */}
          {faqTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6 space-y-4">
              {tab.faqs.map((faq, i) => (
                <FaqCard key={i} {...faq} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </IndexLayout>
  );
}

export default Page;
