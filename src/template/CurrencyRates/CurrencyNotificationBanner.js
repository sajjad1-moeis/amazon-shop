"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function CurrencyNotificationBanner() {
  const handleActivateNotifications = () => {
    // TODO: پیاده‌سازی فعال‌سازی اعلان تلگرام
    console.log("فعال‌سازی اعلان تلگرام");
  };

  return (
    <div className="relative w-full bg-[url(/image/currency-last-bg.png)] bg-bottom bg-cover rounded-2xl overflow-hidden mt-8 md:mt-12">
      {/* Overlay: Linear Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(4, 18, 54, 0) -93.89%, #041236 100%)",
        }}
      />
      {/* محتوا */}
      <div className="relative z-10 w-full h-full min-h-[200px] md:min-h-[250px] flex items-center  p-6 md:p-8 lg:p-12">
        <div className="relative z-10 text-right space-y-4 md:space-y-6 max-w-2xl">
          {/* عنوان اصلی */}
          <h2 className="text-xl md:text-2xl lg:text-3xl  text-gray-50">از تغییرات نرخ ارز جا نمانید</h2>

          {/* زیرنویس */}
          <p className="text-sm md:text-base  text-gray-50 leading-relaxed">
            عضو شوید و روزانه نرخ درهم را در تلگرام یا پیامک دریافت کنید.
          </p>

          {/* دکمه */}
          <div className="pt-2">
            <Button
              onClick={handleActivateNotifications}
              className="bg-yellow-400 max-md:w-full hover:bg-yellow-500 text-black font-medium rounded-lg px-6 md:px-8 py-2 md:py-3 text-sm md:text-base dark:bg-yellow-500 dark:hover:bg-yellow-600"
            >
              فعال سازی اعلان تلگرام
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
