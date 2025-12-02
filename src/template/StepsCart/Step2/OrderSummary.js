import React from "react";

export default function OrderSummary({ orderPrice, discount }) {
  const formatPrice = (price) => new Intl.NumberFormat("fa-IR").format(price);

  return (
    <div className="space-y-4 border border-gray-200 p-4 rounded-xl">
      <h2 className="text-xl text-gray-700 mb-4">خلاصه سفارش</h2>

      <div className="rounded-lg pt-5 md:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">قیمت کالاها</span>
          <span className="text-gray-900 font-medium">{formatPrice(orderPrice)} تومان</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
          <span className="text-gray-700">تخفیف</span>
          <span className="text-green-600 font-medium">{formatPrice(discount)} تومان</span>
        </div>
      </div>
    </div>
  );
}
