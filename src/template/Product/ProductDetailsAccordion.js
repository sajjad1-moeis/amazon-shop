"use client";

import { useState, useRef, useEffect } from "react";
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
  const title = (product.title || product.name || "").trim();
  const attrs = product.attributes;
  if (Array.isArray(attrs) && attrs.length > 0) {
    return attrs
      .map((a) => ({ label: a.name || a.label || "", value: (a.value || "").trim() }))
      .filter((s) => s.label || s.value)
      .filter((s) => {
        if (!title || s.value.length < 20) return true;
        if (s.value === title) return false;
        if (s.label && /title|نام محصول|عنوان/i.test(s.label)) return false;
        // Only filter if the value is essentially a repeat of the title (not just containing it)
        if (s.value.length <= title.length + 30 && (s.value.includes(title) || title.includes(s.value))) return false;
        return true;
      });
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
  const hasDescription = Boolean(description && description.trim());
  const hasSpecs = technicalSpecs.length > 0;
  const items = [];
  if (hasDescription) items.push("item-1");
  if (hasDescription || hasSpecs) items.push("item-2");

  const [openItems, setOpenItems] = useState(items);
  const prevItemsLenRef = useRef(0);

  // وقتی جزئیات بعداً لود می‌شوند (مثلاً از API اسکرپر)، آیتم‌های آکاردئون باز شوند
  useEffect(() => {
    if (items.length > 0 && prevItemsLenRef.current === 0) setOpenItems([...items]);
    prevItemsLenRef.current = items.length;
  }, [items.length]);

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
        {hasDescription && (
          <AccordionItem value="item-1">
            <AccordionTrigger>درباره محصول</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-[#484B4F] dark:text-dark-text whitespace-pre-line text-right leading-relaxed">
                {description}
              </p>
            </AccordionContent>
          </AccordionItem>
        )}
        {(hasDescription || hasSpecs) && (
          <AccordionItem value="item-2">
            <AccordionTrigger>مشخصات فنی</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance pb-2">
              {hasDescription && (
                <div className={hasSpecs ? "mb-4" : ""}>
                  {hasSpecs && (
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-titre mb-2 text-right">
                      توضیحات محصول
                    </h4>
                  )}
                  <p className="text-[#484B4F] dark:text-dark-text whitespace-pre-line text-right leading-relaxed text-sm">
                    {description}
                  </p>
                </div>
              )}
              {hasSpecs && (
                <div className="rounded-xl border border-gray-200 dark:border-dark-stroke bg-gray-50/80 dark:bg-dark-field/60 overflow-hidden">
                  {hasDescription && (
                    <div className="border-b border-gray-200 dark:border-dark-stroke px-4 py-2">
                      <span className="text-xs font-medium text-gray-500 dark:text-caption">جدول مشخصات</span>
                    </div>
                  )}
                  <div className="divide-y divide-gray-200 dark:divide-dark-stroke">
                    {technicalSpecs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center justify-between gap-4 px-4 py-3"
                      >
                        <span className="text-sm font-medium dark:text-caption text-gray-600 text-right flex-1 min-w-0">
                          {spec.label}
                        </span>
                        <span className="text-sm text-gray-900 dark:text-dark-titre flex-1 text-left min-w-0 break-words">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
