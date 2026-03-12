"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InfoCircle } from "iconsax-reactjs";
import { formatPriceToman } from "@/utils/productHelpers";

export default function PriceDetailsModal({
  product,
  finalPrice,
  basePrice,
  priceBreakdown,
  selectedColor,
  selectedDelivery,
}) {
  const [open, setOpen] = useState(false);

  const breakdown = priceBreakdown?.breakdown ?? null;
  const showBreakdownOnSite = priceBreakdown?.showBreakdownOnSite ?? true;
  const footerText =
    priceBreakdown?.footerText ??
    "Microless یک سرویس خرید و لجستیک بین المللی است. نه فروشنده کالا. قیمت نهایی شامل خدمات خرید، بررسی، حمل و پشتیبانی می‌باشد";

  const hasServerBreakdown = Boolean(breakdown) && showBreakdownOnSite;

  const safeNumber = (val) => {
    const n = typeof val === "number" ? val : Number(val ?? 0);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };

  const rows = hasServerBreakdown
    ? [
        {
          title: "قیمت کالا",
          amount: safeNumber(breakdown.baseProductPriceToman),
          description: "قیمت پایه محصول به تومان پس از تبدیل از درهم",
        },
        {
          title: "هزینه حمل",
          amount: safeNumber(breakdown.transportCost),
          description: "حمل بین‌المللی و داخلی بر اساس وزن و دسته‌بندی",
        },
        {
          title: "هزینه گمرک",
          amount: safeNumber(breakdown.customsCost),
          description: "حقوق و عوارض گمرکی",
        },
        {
          title: "هزینه خدمات Microless",
          amount: safeNumber(breakdown.microlessServiceFee),
          description: "خرید، پیگیری، کنترل کیفیت و پشتیبانی",
        },
      ]
    : [];

  const finalRowAmount = hasServerBreakdown
    ? safeNumber(breakdown.finalPrice)
    : safeNumber(finalPrice);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-xs text-primary-300 mt-4 mb-6 flex items-center gap-1">
          <InfoCircle size={16} variant="Bold" />
          جزئیات محاسبه قیمت
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl dark:bg-dark-box dark:border-dark-stroke">
        <DialogHeader>
          <DialogTitle className="text-right dark:text-dark-titre">شفاف سازی قیمت</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {hasServerBreakdown ? (
            <>
              {/* جدول جزئیات قیمت از بک‌اند */}
              <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-field border-b border-gray-200 dark:border-dark-stroke">
                      <th className="text-xs font-medium text-gray-700 dark:text-dark-text text-right p-3">عنوان</th>
                      <th className="text-xs font-medium text-gray-700 dark:text-dark-text text-right p-3">مبلغ</th>
                      <th className="text-xs font-medium text-gray-700 dark:text-dark-text text-right p-3">توضیح</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors bg-white dark:bg-dark-box"
                      >
                        <td className="text-sm text-gray-900 dark:text-dark-titre text-right p-3">{item.title}</td>
                        <td className="text-sm font-medium text-gray-900 dark:text-dark-titre text-right p-3">
                          {formatPriceToman(item.amount)}
                        </td>
                        <td className="text-xs text-gray-500 dark:text-dark-text text-right p-3">{item.description}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 dark:bg-dark-field">
                      <td className="text-sm font-bold text-gray-900 dark:text-dark-titre text-right p-3">
                        قیمت نهایی
                      </td>
                      <td className="text-sm font-bold text-primary-700 dark:text-dark-title text-right p-3">
                        {formatPriceToman(finalRowAmount)}
                      </td>
                      <td className="text-xs text-gray-500 dark:text-dark-text text-right p-3">مبلغ پرداختی</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="bg-primary-50 dark:bg-dark-field border border-primary-200 dark:border-dark-stroke rounded-lg p-3">
              <p className="text-xs text-primary-700 dark:text-dark-text text-right">
                قیمت این محصول بر اساس نرخ روز درهم، هزینه حمل، گمرک و خدمات Microless به تومان محاسبه شده است. در حال حاضر
                جزئیات خط به خط برای این محصول در دسترس نیست.
              </p>
            </div>
          )}

          {/* توضیح پایین */}
          <div className="bg-gray-50 dark:bg-dark-field rounded-lg p-4 border border-gray-200 dark:border-dark-stroke">
            <p className="text-xs text-gray-600 dark:text-dark-text leading-relaxed text-right">{footerText}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
