"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bag2, CardPos, Shield, Truck } from "iconsax-reactjs";
import { getProductDescription } from "@/utils/productHelpers";

const serviceGuarantees = [
  { icon: Bag2, title: "خرید مستقیم از آمازون" },
  { icon: Shield, title: "تضمین اصالت و کیفیت" },
  { icon: Truck, title: "ارسال مطمئن به ایران" },
  { icon: CardPos, title: "پرداخت امن ریالی" },
];

function buildSpecsFromProduct(product) {
  if (!product) return [];
  const attrs = product.attributes;
  if (Array.isArray(attrs) && attrs.length > 0) {
    return attrs.map((a) => ({ label: a.name || a.label || "", value: a.value || "" })).filter((s) => s.label || s.value);
  }
  const manual = [];
  if (product.brand || product.brandName) manual.push({ label: "برند", value: product.brand || product.brandName });
  if (product.category || product.categoryName) manual.push({ label: "دسته‌بندی", value: product.category || product.categoryName });
  if (product.weight_kg) manual.push({ label: "وزن", value: `${product.weight_kg} کیلوگرم` });
  if (product.availability) manual.push({ label: "وضعیت", value: product.availability });
  return manual;
}

export default function ProductDetailsAccordion({ product }) {
  const description = getProductDescription(product);
  const technicalSpecs = buildSpecsFromProduct(product);
  const items = [];
  if (description) items.push("item-1");
  if (technicalSpecs.length > 0) items.push("item-2");

  const [openItems, setOpenItems] = useState(items);

  const handleValueChange = (value) => {
    setOpenItems(value);
  };

  const handleToggleAll = () => {
    if (openItems.length === items.length) setOpenItems([]);
    else setOpenItems([...items]);
  };

  const isAllOpen = items.length > 0 && openItems.length === items.length;

  if (items.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <Accordion type="multiple" className="w-full" value={openItems} onValueChange={handleValueChange}>
        {description && (
          <AccordionItem value="item-1">
            <AccordionTrigger>درباره محصول</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-[#484B4F] dark:text-dark-text whitespace-pre-line text-right">
                {description}
              </p>
            </AccordionContent>
          </AccordionItem>
        )}
        {technicalSpecs.length > 0 && (
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
                    <span className="text-sm text-gray-900 dark:text-dark-titre flex-1 text-left">{spec.value}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
      {items.length > 0 && (
        <div className="text-center mt-6">
          <div className="flex-center gap-3">
            <div className="border-b w-full dark:border-dark-stroke border-gray-200" />
            <button
              onClick={handleToggleAll}
              className="text-primary-600 flex-none dark:text-primary-300 hover:text-primary-700 font-medium text-sm transition-colors"
            >
              {isAllOpen ? "نمایش کمتر" : "نمایش بیشتر"}
            </button>
            <div className="border-b w-full dark:border-dark-stroke border-gray-200" />
          </div>
        </div>
      )}
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
