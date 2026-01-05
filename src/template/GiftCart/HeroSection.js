import React from "react";
import CurrencyPaymentForm from "../CurrencyServices/CurrencyPayment";
import { Button } from "@/components/ui/button";
import LinerBg from "@/components/LinerBg";

function HeroSection() {
  return (
    <div className="">
      <div className="relative bg-[url(/image/GiftCart/giftCartBg.png)] bg-cover max-md:py-20">
        <LinerBg />

        <div className="md:absolute md:size-max inset-y-0 my-auto z-50  text-white px-10 ">
          <h1 className="text-primary-50 text-xl md:text-3xl lg:text-5xl ">
            گیفت کارت‌های معتبر جهانی با تحویل لحظه‌ای
          </h1>
          <p className="text-white/60 text-xs md:text-lg lg:text-xl w-2/3 mt-1 md:mt-3 max-md:hidden max-md:mx-auto">
            شارژ سریع سرویس‌ها، خرید آسان گیفت کارت‌های استیم، پلی‌استیشن، ایکس‌باکس، اپل، گوگل و ده‌ها برند دیگر — با
            قیمت دقیق و تحویل فوری.
          </p>
          <Button className="mt-4 lg:mt-12 bg-gray-200 text-gray-600 rounded-xl max-md:text-sm">
            مشاهده گیفت کارت ها
          </Button>
        </div>
        <img src="/image/GiftCart/giftCartBg.png" className="max-h-[701px] max-md:hidden w-full" alt="" />
      </div>
      <div className="container  -mt-[5%] md:-mt-[10%] relative">
        <div className="bg-white dark:bg-dark-box max-w-5xl rounded-2xl pt-4 mx-auto">
          <CurrencyPaymentForm removeDesc />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
