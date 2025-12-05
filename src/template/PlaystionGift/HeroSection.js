import React from "react";
import CurrencyPaymentForm from "../CurrencyServices/CurrencyPayment";
import { Button } from "@/components/ui/button";
import PlayStationGiftCardForm from "./PlayStationGiftCardForm";
import LinerBg from "@/components/LinerBg";

function HeroSection() {
  return (
    <div class="">
      <div class="relative bg-[url(/image/GiftCart/playstionGiftBg.png)] bg-cover py-14">
        <LinerBg />
        <div class="grid lg:grid-cols-2 items-center container gap-10 xl:gap-40 relative">
          <div class="">
            <h1 className="text-primary-50 text-xl md:text-3xl lg:text-4xl max-md:w-4/6 max-md:text-center max-md:mx-auto">
              گیفت کارت پلی‌استیشن با تحویل لحظه‌ای
            </h1>
            <p className="text-white/60 max-md:hidden text-xs md:text-lg lg:text-xl mt-1 md:mt-3 max-md:w-1/2 xl:w-2/3 ">
              شارژ حساب PSN، خرید بازی، تهیه اشتراک PS Plus و استفاده از تمام امکانات فروشگاه پلی‌استیشن با گیفت
              کارت‌های معتبر و اصل.
            </p>
          </div>
          <div class="max-lg:w-3/4 max-md:!w-full mx-auto">
            <PlayStationGiftCardForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
