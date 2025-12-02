"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PaymentMethodItem from "./PaymentMethodItem";
import OrderSummary from "./OrderSummary";
import { paymentMethods } from "@/data";

export default function PaymentCheckout({
  orderPrice = 12450000,
  discount = 150000,
  onConfirm,
  onBack,
  selectedPaymentMethod: initialSelectedMethod = "online",
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(initialSelectedMethod);
  const [selectedInstallmentType, setSelectedInstallmentType] = useState("20percent");

  const totalPrice = orderPrice - discount;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm({
        paymentMethod: selectedPaymentMethod,
        installmentType: selectedPaymentMethod === "installment" ? selectedInstallmentType : null,
        totalPrice,
        orderPrice,
        discount,
      });
    }
  };

  return (
    <div className=" bg-white border border-gray-200 rounded-2xl shadow-sm p-4" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-xl  text-gray-700 mb-4">انتخاب روش پرداخت:</h2>
          <div className="gap-3 grid max-lg:grid-cols-2 max-md:!grid-cols-1">
            {paymentMethods.map((method) => (
              <PaymentMethodItem
                key={method.id}
                method={method}
                isSelected={selectedPaymentMethod === method.id}
                onSelect={setSelectedPaymentMethod}
                selectedInstallmentType={selectedInstallmentType}
                setSelectedInstallmentType={setSelectedInstallmentType}
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:space-y-4">
          <OrderSummary orderPrice={orderPrice} discount={discount} />

          {/* Action Buttons */}
          <div className="md:flex items-center gap-3 p-3 md:pt-4 max-md:fixed bg-white grid grid-cols-2 right-0 bottom-0 w-full">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300 font-medium px-6 py-2.5 rounded-lg"
            >
              بازگشت
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2.5 rounded-lg"
            >
              تأیید و پرداخت
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center pt-2 max-md:mb-10">
            بعد از پرداخت هزینه، سفارش شما قابل پیگیری است و مراحل مختلف اطلاع رسانی خواهند شد.
          </div>
        </div>
      </div>
    </div>
  );
}
