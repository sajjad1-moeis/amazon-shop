import React from "react";
import CurrencyPaymentForm from "../CurrencyServices/CurrencyPayment";
import { Button } from "@/components/ui/button";
import LinerBg from "@/components/LinerBg";

function HeroSection() {
  return (
    <div className="">
      <div className="relative bg-[url(/image/GiftCart/giftCartBg.jpg)] bg-cover  max-md:py-20">
        <LinerBg />
        <img src="/image/GiftCart/giftCartBg.jpg" className=" max-md:hidden w-full" alt="" />
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
