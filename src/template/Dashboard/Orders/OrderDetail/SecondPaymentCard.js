"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "iconsax-reactjs";

export default function SecondPaymentCard({ remainingAmount, onPay }) {
  return (
    <div
      className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-xl font-bold text-white mb-2">پرداخت مرحله دوم</h3>
      <div className="mb-4">
        <span className="text-white/90 text-sm">مبلغ باقی مانده: </span>
        <span className="text-white text-lg font-bold">{remainingAmount.toLocaleString("fa-IR")} ت</span>
      </div>
      <Button
        onClick={onPay}
        className="w-full bg-white text-purple-600 hover:bg-white/90 font-medium text-lg py-6 gap-2"
      >
        <Wallet size={20} />
        پرداخت {remainingAmount.toLocaleString("fa-IR")} تومان
      </Button>
      <p className="text-white/80 text-xs mt-4 leading-relaxed">
        لطفاً پس از مشاهده عکس/ویدیو، پرداخت مرحله دوم را انجام دهید. پس از پرداخت مرحله دوم، سفارش شما ارسال
        میشود.
      </p>
    </div>
  );
}

