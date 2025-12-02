import TitleCard from "@/components/TitleCard";
import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className=" bg-[#FAFAFA]">
      <div className="flex flex-col-reverse md:grid  md:grid-cols-3 container pt-14 md:items-center">
        <div className="md:col-span-2">
          <TitleCard className={"max-md:hidden"} title={"پلی مطمئن میان شما و دنیای خرید جهانی"} />
          <h1 className=" md:hidden text-2xl mt-6">
            <span className="text-primary-700">پلی مطمئن</span> میان شما و دنیای خرید جهانی
          </h1>
          <div className="mt-6 text-gray-600 space-y-2">
            <p>همه‌چیز از یک سؤال ساده شروع شد:</p>
            <p>چرا خرید از آمازون برای کاربران ایرانی باید این‌قدر سخت و پرابهام باشد؟</p>
            <p>
              از همین سؤال، ایده‌ی میکرولس متولد شد — پلتفرمی که مرزها را از خرید جهانی حذف می‌کند و تجربه‌ای تازه از
            </p>
            <p>سادگی، شفافیت و اعتماد می‌سازد.</p>
            <p>
              ما در میکرولس پلی مطمئن میان خریداران ایرانی و فروشگاه‌های معتبر بین‌المللی ایجاد کردیم تا هر ایرانی
              بتواند با
            </p>
            <p>چند کلیک، از برندهای جهانی خرید کند؛ بدون نگرانی از حمل‌ونقل، گمرک، مالیات یا کالای تقلبی.</p>
            <p>خرید از آمازون دیگر فقط آرزو نیست — با میکرولس، جهانی خرید کنید و محلی تحویل بگیرید.</p>
          </div>
        </div>
        <div className="relative aspect-square max-md:w-3/4 max-md:mx-auto">
          <Image
            src="/image/About-Us/amazon-box.png"
            alt={`عکس باکس آمازون`}
            fill
            className="object-cover rounded-md"
            priority={1}
          />
        </div>
      </div>
      <div className="relative aspect-square max-h-12 md:max-h-20 w-full mt-6">
        <Image src="/image/About-Us/brands.png" alt={`عکس باکس آمازون`} fill className="object-cover " priority={1} />
      </div>
    </div>
  );
}

export default HeroSection;
