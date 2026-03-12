"use client";

import { Bag2, CardPos, Shield, Truck } from "iconsax-reactjs";
import { getDisplayBrand } from "@/utils/productHelpers";

const serviceGuarantees = [
  { icon: Bag2, title: "خرید مستقیم از آمازون" },
  { icon: Shield, title: "تضمین اصالت و کیفیت" },
  { icon: Truck, title: "ارسال مطمئن به ایران" },
  { icon: CardPos, title: "پرداخت امن ریالی" },
];

export function buildSpecsFromProduct(product) {
  if (!product) return [];
  const seen = new Set();
  const out = [];

  function pushRow(label, value) {
    const L = (label ?? "").trim();
    const V = String(value ?? "").trim();
    if (!L && !V) return;
    const key = L.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label: L, value: V });
  }

  // ۱) آرایهٔ attributes (خروجی API اسکرپر / دیتابیس)
  const attrs = Array.isArray(product.attributes) ? product.attributes : [];
  for (const a of attrs) {
    pushRow(
      a.name_fa ?? a.nameFa ?? a.name ?? a.label,
      a.value_fa ?? a.valueFa ?? a.value ?? ""
    );
  }

  // ۲) technical_specs به‌صورت آبجکت (برخی APIها)
  const tech = product.technical_specs;
  if (tech && typeof tech === "object" && !Array.isArray(tech)) {
    for (const [k, v] of Object.entries(tech)) {
      if (k && v != null && String(v).trim()) pushRow(k, v);
    }
  }

  // ۳) additional_attributes: آرایه یا آبجکت
  const extra = product.additional_attributes;
  if (Array.isArray(extra)) {
    for (const a of extra) {
      pushRow(
        a.name_fa ?? a.nameFa ?? a.name ?? a.label ?? a.key,
        a.value_fa ?? a.valueFa ?? a.value ?? ""
      );
    }
  } else if (extra && typeof extra === "object") {
    for (const [k, v] of Object.entries(extra)) {
      if (k && v != null && String(v).trim()) pushRow(k, v);
    }
  }

  if (out.length > 0) return out;

  // فال‌بک: برند، دسته، وزن، وضعیت
  const displayBrand = getDisplayBrand(product);
  if (displayBrand) out.push({ label: "برند", value: displayBrand });
  if (product.category || product.categoryName) out.push({ label: "دسته‌بندی", value: product.category || product.categoryName });
  if (product.weight_kg) out.push({ label: "وزن", value: `${product.weight_kg} کیلوگرم` });
  if (product.availability) out.push({ label: "وضعیت", value: product.availability });
  return out;
}

export default function ProductDetailsAccordion({ product }) {
  const technicalSpecs = buildSpecsFromProduct(product);
  const hasSpecs = technicalSpecs.length > 0;

  return (
    <div>
      {hasSpecs && (
        <div className="rounded-xl border border-gray-200 dark:border-dark-stroke bg-gray-50/80 dark:bg-dark-field/60 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-dark-stroke px-4 py-2">
            <span className="text-xs font-medium text-gray-500 dark:text-caption">جدول مشخصات</span>
          </div>
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
