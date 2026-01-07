"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoCircle } from "iconsax-reactjs";

export default function PriceDetailsModal({ product, finalPrice, basePrice, selectedColor, selectedDelivery }) {
  const [open, setOpen] = useState(false);
  const productWeight = product?.weight || 420;
  const exchangeRate = 13200;

  // محاسبه قیمت‌ها به AED
  const amazonPriceAED = basePrice / exchangeRate;
  const shippingCostAED = productWeight * 0.43;
  const customsCostAED = amazonPriceAED * 0.023;
  const serviceCostAED = amazonPriceAED * 0.10;
  const finalPriceAED = amazonPriceAED + shippingCostAED + customsCostAED + serviceCostAED;

  const priceDetails = [
    {
      title: "قیمت از Amazon",
      amount: parseFloat(amazonPriceAED).toLocaleString("fa-IR", { minimumFractionDigits: 2 }),
      description: "قیمت خرید کالا",
    },
    {
      title: "نرخ ارز",
      amount: exchangeRate.toLocaleString("fa-IR"),
      description: "نرخ روز محاسبه",
    },
    {
      title: "هزینه حمل",
      amount: parseFloat(shippingCostAED).toLocaleString("fa-IR", { minimumFractionDigits: 2 }),
      description: "بر اساس وزن کالا",
    },
    {
      title: "هزینه گمرک",
      amount: parseFloat(customsCostAED).toLocaleString("fa-IR", { minimumFractionDigits: 2 }),
      description: "درصد ثابت",
    },
    {
      title: "هزینه خدمات Microless",
      amount: parseFloat(serviceCostAED).toLocaleString("fa-IR", { minimumFractionDigits: 2 }),
      description: "خرید، پیگیری، پشتیبانی",
    },
  ];

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
          {/* وزن کالا */}
          <div className="flex-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">وزن کالا:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">
              {product?.weight ? `${product.weight} گرم` : "۴۲۰ گرم"}
            </span>
          </div>

          {/* نوار اطلاع‌رسانی */}
          <div className="bg-primary-50 dark:bg-dark-field border border-primary-200 dark:border-dark-stroke rounded-lg p-3">
            <p className="text-xs text-primary-700 dark:text-dark-text text-right">
              هزینه حمل بر اساس وزن کالا محاسبه می‌شود
            </p>
          </div>

          {/* جدول جزئیات قیمت */}
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
                {priceDetails.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors bg-white dark:bg-dark-box"
                  >
                    <td className="text-sm text-gray-900 dark:text-dark-titre text-right p-3">{item.title}</td>
                    <td className="text-sm font-medium text-gray-900 dark:text-dark-titre text-right p-3">
                      AED {item.amount}
                    </td>
                    <td className="text-xs text-gray-500 dark:text-dark-text text-right p-3">{item.description}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-dark-field">
                  <td className="text-sm font-bold text-gray-900 dark:text-dark-titre text-right p-3">قیمت نهایی</td>
                  <td className="text-sm font-bold text-primary-700 dark:text-dark-title text-right p-3">
                    AED {parseFloat(finalPriceAED).toLocaleString("fa-IR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="text-xs text-gray-500 dark:text-dark-text text-right p-3">مبلغ پرداختی</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* توضیح پایین */}
          <div className="bg-gray-50 dark:bg-dark-field rounded-lg p-4 border border-gray-200 dark:border-dark-stroke">
            <p className="text-xs text-gray-600 dark:text-dark-text leading-relaxed text-right">
              Microless یک سرویس خرید و لجستیک بین المللی است. نه فروشنده کالا. قیمت نهایی شامل خدمات خرید،
              بررسی، حمل و پشتیبانی می‌باشد
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

