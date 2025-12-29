"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "iconsax-reactjs";

export default function SecondPaymentCard({ remainingAmount, onPay }) {
  return (
    <div className="bg-gradient-to-bl from-[#606EC0] to-[#8995D6] rounded-2xl shadow-md p-4">
      <h3 className="text-lg text-white mb-2">پرداخت مرحله دوم</h3>
      <div className="mb-8 bg-white dark:bg-dark-box/15 py-2 rounded-lg text-center">
        <p className="text-white text-lg">ت {remainingAmount.toLocaleString("fa-IR")} </p>
        <p className="text-gray-50 text-xs mt-3">مبلغ باقی مانده: </p>
      </div>
      <Button
        onClick={onPay}
        className="w-full bg-gray-200 dark:bg-dark-field text-gray-700 dark:text-dark-text rounded-lg hover:bg-white dark:bg-dark-box/90 font-medium text-lg py-5 gap-2"
      >
        پرداخت {remainingAmount.toLocaleString("fa-IR")} تومان
      </Button>
      <p className="text-white/50 text-sm mt-4 leading-relaxed">
        لطفاً پس از <span className="text-white font-bold">مشاهده عکس/ویدیو</span> ، پرداخت مرحله دوم را انجام دهید. پس
        از پرداخت مرحله دوم، سفارش شما ارسال میشود.
      </p>
    </div>
  );
}
