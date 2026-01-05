import IntroductionCard from "@/components/IntroductionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IndexLayout from "@/layout/IndexLayout";
import React from "react";

function Page() {
  const tabs = [
    { value: "a4", label: "قوانین کل سایت", content: "قوانین کل سایت…" },
    { value: "a3", label: "قوانین سپر کیفیت", content: "قوانین سپر کیفیت…" },
    { value: "a2", label: "سیاست مرجوعی و عودت", content: "سیاست مرجوعی و عودت…" },
    { value: "a1", label: "محصولاتی که قابل برگشت نیستند", content: "محصولات غیر قابل برگشت…" },
  ];

  const activeClasses =
    "data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-white/10 data-[state=active]:border-b-2 border-primary-500 dark:border-dark-title " +
    "data-[state=active]:text-primary-600 data-[state=active]:dark:text-dark-title text-gray-500 px-4 py-2 rounded-none transition";

  return (
    <IndexLayout>
      <IntroductionCard title="قوانین و مقررات" items={[{ label: "قوانین و مقررات" }]} />

      <div className="mb-20">
        <Tabs dir="rtl" defaultValue="a4" className="container mt-10 w-full rounded-xl overflow-hidden">
          <TabsList className="bg-white h-full shadow dark:border-b-2 dark:border-white/10 w-full justify-start overflow-auto rounded-t-xl rounded-b-none p-0 dark:bg-white/10">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className={activeClasses}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="pt-5 dark:m-0 dark:bg-white/10">
              <div className="pt-0 p-4">
                <p className="text-gray-600 mb-2  dark:text-dark-text">
                  به وب‌سایت میکرولس خوش آمدید. استفاده از خدمات و محتوای این وب‌سایت به منزله‌ی پذیرش کامل قوانین و
                  مقررات زیر است. لطفاً پیش از ثبت سفارش یا استفاده از خدمات، این موارد را با دقت مطالعه کنید.
                </p>
                {tab.content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </IndexLayout>
  );
}

export default Page;
