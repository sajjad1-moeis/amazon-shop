"use client";

import React, { useState } from "react";
import Timeline from "@/components/TimeLine";
import DeliveryAddressDemo from "@/template/StepsCart/Step1/Adresses";
import HeaderSection from "@/template/StepsCart/Step1/HeaderSection";
import { Location, Receipt2 } from "iconsax-reactjs";
import PaymentCheckout from "@/template/StepsCart/Step2/PaymentCheckout";
import { toast } from "sonner";

const steps = [
  { id: 1, label: "سبد خرید", Icon: Location },
  { id: 2, label: "اطلاعات ارسال", Icon: Location },
  { id: 3, label: "تکمیل سفارش", Icon: Receipt2 },
];

function Page() {
  const [currentStep, setCurrentStep] = useState(2);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleConfirm = (data) => {
    toast.success(`روش پرداخت انتخاب شده: ${data.paymentMethod}\nمبلغ کل: ${data.totalPrice} تومان`, {
      richColors: true,
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <HeaderSection />
      <div className="bg-[#F9F9F9] dark:bg-dark-box min-h-screen  pb-10">
        <div className="flex flex-col p-8 lg:container">
          <h1 className="text-2xl font-bold text-right">پرداخت سفارش آمازون امارات</h1>
          <p className="text-primary-500 my-4 dark:text-primary-300">{steps[currentStep - 1].label}</p>

          <Timeline steps={steps} currentStep={currentStep} />
        </div>

        {/* نمایش فرم متناسب با step */}
        <div className="w-full max-lg:px-5 lg:container mt-32">
          {currentStep === 2 && <DeliveryAddressDemo onNext={nextStep} />}
          {currentStep === 3 && (
            <PaymentCheckout orderPrice={12450000} discount={150000} onConfirm={handleConfirm} onBack={prevStep} />
          )}
        </div>
        {/* برای step 1 و 3 می‌تونی کامپوننت‌های مختلف اضافه کنی */}
      </div>
    </div>
  );
}

export default Page;
