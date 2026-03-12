"use client";

import React from "react";
import { WalletMoney } from "iconsax-reactjs";

const Row = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-600 last:border-0">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="text-gray-200 text-sm font-medium">{value}</span>
  </div>
);

const formatNum = (n) => (n != null ? Number(n).toLocaleString("fa-IR") : "-");

export default function AdminOrderDetailPayment({ paymentInfo = {}, order = {} }) {
  const itemsPrice = paymentInfo?.itemsPrice ?? order?.itemsPrice ?? order?.subtotal ?? order?.subTotal;
  const totalWeight = paymentInfo?.totalWeight ?? order?.totalWeight;
  const shippingCost = paymentInfo?.shippingCostDubai ?? paymentInfo?.shippingCost ?? order?.shippingCost ?? order?.shippingAmount;
  const domesticShipping = paymentInfo?.domesticShipping ?? order?.domesticShippingCost ?? order?.domesticShippingAmount;
  const discount = paymentInfo?.discount ?? order?.discount ?? order?.discountAmount ?? 0;
  const tax = paymentInfo?.tax ?? order?.tax ?? order?.taxAmount ?? 0;
  const finalAmount = paymentInfo?.finalAmount ?? order?.totalAmount ?? order?.finalAmount ?? order?.grandTotal ?? order?.amount;
  const paidAmount = paymentInfo?.paidAmount ?? order?.paidAmount;
  const paidPercentage = paymentInfo?.paidPercentage ?? order?.paidPercentage;
  const remainingAmount = paymentInfo?.remainingAmount ?? order?.remainingAmount ?? order?.secondPaymentAmount;
  const remainingPercentage = paymentInfo?.remainingPercentage ?? (paidPercentage != null ? 100 - paidPercentage : null);

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <WalletMoney size={20} />
        اطلاعات پرداخت
      </h2>
      <div className="space-y-0">
        {itemsPrice != null && <Row label="مبلغ کالاها" value={`${formatNum(itemsPrice)} تومان`} />}
        {totalWeight != null && <Row label="وزن کل" value={`${totalWeight} kg`} />}
        {shippingCost != null && <Row label="هزینه ارسال دبی" value={`${formatNum(shippingCost)} تومان`} />}
        {domesticShipping != null && <Row label="هزینه ارسال داخلی" value={`${formatNum(domesticShipping)} تومان`} />}
        {discount != null && discount > 0 && (
          <Row label="تخفیف" value={`${formatNum(discount)} تومان`} />
        )}
        {tax != null && tax > 0 && <Row label="مالیات / خدمات" value={`${formatNum(tax)} تومان`} />}
        {finalAmount != null && (
          <Row label="مبلغ نهایی" value={`${formatNum(finalAmount)} تومان`} />
        )}
        {paidAmount != null && (
          <Row
            label="مبلغ پرداخت شده"
            value={
              paidPercentage != null
                ? `${paidPercentage}% - ${formatNum(paidAmount)} تومان`
                : `${formatNum(paidAmount)} تومان`
            }
          />
        )}
        {remainingAmount != null && remainingAmount > 0 && (
          <Row
            label="مانده"
            value={
              remainingPercentage != null
                ? `${remainingPercentage}% - ${formatNum(remainingAmount)} تومان`
                : `${formatNum(remainingAmount)} تومان`
            }
          />
        )}
      </div>
      {!itemsPrice && !finalAmount && !paidAmount && (
        <p className="text-gray-400 text-sm py-4">اطلاعات پرداخت موجود نیست</p>
      )}
    </div>
  );
}
