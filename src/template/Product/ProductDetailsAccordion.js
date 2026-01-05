"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bag2, CardPos, Shield, Truck } from "iconsax-reactjs";

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
    icon: Bag2,
    title: "خرید مستقیم از آمازون",
  },
  {
    icon: Shield,
    title: "تضمین اصالت و کیفیت",
  },
  {
    icon: Truck,
    title: "ارسال مطمئن به ایران",
  },
  {
    icon: CardPos,
    title: "پرداخت امن ریالی",
  },
];

export default function AccordionDemo() {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>درباره محصول</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-[#484B4F] dark:text-dark-text">
              ساعت Invicta Reserve 0361 ترکیبی از قدرت، ظرافت و عملکرد دقیق است. با موتور کرونوگراف سوئیسی و طراحی مقاوم
              در برابر فشار آب، انتخابی مناسب برای مردانی است که کیفیت و جزئیات برایشان اهمیت دارد. قاب استیل ضخیم، بند
              محکم و صفحه چندلایه با عقربه‌های براق، جلوه‌ای لوکس و حرفه‌ای ایجاد می‌کند. این مدل بخشی از سری Reserve
              است — مجموعه‌ای که Invicta برای عاشقان دقت و دوام طراحی کرده است.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>مشخصات فنی</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="grid grid-cols-1 gap-0">
              {technicalSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between gap-4 py-3 border-b dark:border-dark-stroke border-gray-100 last:border-b-0"
                >
                  <span className="text-sm font-medium dark:text-caption text-gray-600 text-right flex-1">
                    {spec.label}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-dark-titre flex-1">{spec.value}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="text-center mt-6">
        <div className="flex-center gap-3">
          <div className="border-b w-full dark:border-dark-stroke border-gray-200" />
          <button className="text-primary-600 flex-none dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors">
            {"نمایش کمتر"}
          </button>
          <div className="border-b w-full dark:border-dark-stroke border-gray-200" />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 border dark:bg-dark-box dark:border-dark-stroke border-gray-200 p-2 rounded-xl">
        {serviceGuarantees.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="flex max-md:gap-2 md:flex-col items-center text-right md:text-center">
              <div className="p-1.5 rounded-lg bg-gray-200 dark:bg-dark-field flex items-center justify-center mb-3">
                <Icon className="size-5 md:size-7 text-gray-500 dark:text-gray-300" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-caption">{service.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
