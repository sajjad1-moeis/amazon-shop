"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp, Pencil, Truck, ShoppingBag, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const productDescription = `ساعت Invicta Reserve 0361 ترکیبی از قدرت، ظرافت و عملکرد دقیق است. این ساعت با موتور کرونوگراف سوئیسی و مقاومت در برابر آب، برای مردانی طراحی شده که به کیفیت و جزئیات اهمیت می‌دهند. قاب ضخیم استیل و بند محکم، همراه با صفحه چند لایه و عقربه‌های براق، ظاهری لوکس و حرفه‌ای ایجاد می‌کند. این ساعت بخشی از سری Reserve است که توسط Invicta برای علاقه‌مندان به دقت و دوام طراحی شده است.`;

const technicalSpecs = [
  { label: "کشور سازنده", value: "سوئیس" },
  { label: "جنس بدنه", value: "استیل ضدزنگ" },
  { label: "نوع موتور", value: "کوارتز کرونوگراف" },
  { label: "مقاومت در برابر آب", value: "تا عمق ۲۰۰ متر" },
  { label: "جنس بند", value: "استیل برس خورده" },
  { label: "شیشه", value: "مینرال مقاوم در برابر خط و خش" },
  { label: "قطر قاب", value: "۵۲ میلی متر" },
  { label: "رنگ بند و قاب", value: "نقره‌ای" },
];

const serviceGuarantees = [
  {
    icon: Pencil,
    title: "پرداخت امن ریالی",
  },
  {
    icon: Truck,
    title: "ارسال مطمئن به ایران",
  },
  {
    icon: ShoppingBag,
    title: "خرید مستقیم از آمازون",
  },
  {
    icon: Shield,
    title: "تضمین اصالت و کیفیت",
  },
];

export default function ProductDetailsAccordion() {
  const [accordionValue, setAccordionValue] = useState(["about", "specs"]);
  const [innerAccordionValues, setInnerAccordionValues] = useState({
    about: ["about-detail"],
    specs: ["specs-detail"],
  });
  const prevAccordionValueRef = useRef(["about", "specs"]);

  // محاسبه اینکه آیا همه آکوردین‌های والد باز هستند
  const isAllExpanded = accordionValue.length === 2;

  // وقتی والد بسته می‌شود، آکوردین‌های داخلی هم بسته می‌شوند
  useEffect(() => {
    if (!accordionValue.includes("about")) {
      setInnerAccordionValues((prev) => ({ ...prev, about: [] }));
    }
    if (!accordionValue.includes("specs")) {
      setInnerAccordionValues((prev) => ({ ...prev, specs: [] }));
    }

    // وقتی والد باز می‌شود، آکوردین‌های داخلی هم باز می‌شوند
    if (accordionValue.includes("about") && !prevAccordionValueRef.current.includes("about")) {
      setInnerAccordionValues((prev) => ({ ...prev, about: ["about-detail"] }));
    }
    if (accordionValue.includes("specs") && !prevAccordionValueRef.current.includes("specs")) {
      setInnerAccordionValues((prev) => ({ ...prev, specs: ["specs-detail"] }));
    }

    prevAccordionValueRef.current = accordionValue;
  }, [accordionValue]);

  const handleToggleExpand = () => {
    if (isAllExpanded) {
      // همه باز هستند، پس همه را ببند
      setAccordionValue([]);
      setInnerAccordionValues({ about: [], specs: [] });
    } else {
      // همه بسته هستند، پس همه را باز کن
      setAccordionValue(["about", "specs"]);
      setInnerAccordionValues({ about: ["about-detail"], specs: ["specs-detail"] });
    }
  };

  const handleAccordionChange = (value) => {
    setAccordionValue(value);
  };

  const handleInnerAccordionChange = (parentKey, value) => {
    setInnerAccordionValues((prev) => ({
      ...prev,
      [parentKey]: value,
    }));
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <Accordion
          type="multiple"
          value={accordionValue}
          onValueChange={handleAccordionChange}
          className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          {/* About Product Accordion */}
          <AccordionItem value="about" className="border-b border-gray-200 dark:border-gray-700">
            <AccordionTrigger className="px-6 py-4 hover:no-underline justify-start [&>div]:hidden group">
              <div className="flex items-center gap-2 flex-row-reverse w-full">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">درباره محصول</span>
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {/* Inner Accordion for About Product */}
              <Accordion
                type="multiple"
                value={innerAccordionValues.about}
                onValueChange={(value) => handleInnerAccordionChange("about", value)}
                className="w-full"
              >
                <AccordionItem value="about-detail" className="border-0">
                  <AccordionTrigger className="py-2 hover:no-underline justify-start [&>div]:hidden group">
                    <div className="flex items-center gap-2 flex-row-reverse w-full">
                      <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pt-2">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-right">
                      {productDescription}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>

          {/* Technical Specifications Accordion */}
          <AccordionItem value="specs" className="border-b-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline justify-start [&>div]:hidden group">
              <div className="flex items-center gap-2 flex-row-reverse w-full">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">مشخصات فنی</span>
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {/* Inner Accordion for Technical Specs */}
              <Accordion
                type="multiple"
                value={innerAccordionValues.specs}
                onValueChange={(value) => handleInnerAccordionChange("specs", value)}
                className="w-full"
              >
                <AccordionItem value="specs-detail" className="border-0">
                  <AccordionTrigger className="py-2 hover:no-underline justify-start [&>div]:hidden group">
                    <div className="flex items-center gap-2 flex-row-reverse w-full">
                      <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {technicalSpecs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 text-right">
                            {spec.label}
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white text-right md:text-left">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Show Less/More Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleToggleExpand}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
          >
            {isAllExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
          </button>
        </div>

        {/* Service Guarantees Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceGuarantees.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{service.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
