import TitleCard from "@/components/TitleCard";
import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className=" bg-[#FAFAFA]">
      <div className="grid grid-cols-3 container pt-14 items-center">
        <div className="md:col-span-2">
          <TitleCard titleClassName="text-3xl" title={"پلی مطمئن میان شما و دنیای خرید جهانی"} />
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
        <div className="relative aspect-square">
          <Image
            src="/image/About-Us/amazon-box.png"
            alt={`عکس باکس آمازون`}
            fill
            className="object-cover rounded-md"
            priority={1}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
