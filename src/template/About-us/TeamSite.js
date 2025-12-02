import TitleCard from "@/components/TitleCard";
import Image from "next/image";
import React from "react";

function TeamSite() {
  return (
    <div className="mt-32 mb-20">
      <div className="container grid lg:grid-cols-3 gap-10 items-center">
        <div className="relative aspect-square  w-full rounded-xl overflow-hidden max-h-[412px]">
          <Image src="/image/About-Us/TeamLogo.png" alt={`محصول بازدید شده شماره `} fill className=" rounded-md " />
        </div>
        <div className="lg:col-span-2">
          <TitleCard title={"تیم میکرولس"} titleClassName={"text-3xl"} />
          <div className="text-gray-600 space-y-2 mt-6">
            <p>
              در میکرولس، ما فقط یک مجموعه از افراد نیستیم؛ ما یک تیم متحد با یک هدف مشترکیم — ساده و مطمئن کردن خرید
              جهانی برای ایرانیان.
            </p>
            <p>
              تیم میکرولس از گروهی از متخصصان باتجربه در حوزه‌های بازرگانی بین‌الملل، لجستیک، فناوری و پشتیبانی تشکیل
              شده که هر روز با دقت، تعهد و عشق به جزئیات، تجربه‌ی خرید شما را بهتر می‌کنند.
            </p>
            <p>
              از لحظه‌ای که سفارشتان ثبت می‌شود تا زمانی که درب منزل تحویل می‌گیرید، پشت صحنه تیمی از انسان‌های واقعی در
              حال نظارت، پیگیری و هماهنگی هستند تا همه‌چیز دقیق، سریع و بی‌نقص پیش برود.
            </p>
            <p>در میکرولس، هر عضو تیم باور دارد که موفقیت ما فقط در گرو یک چیز است:</p>
          </div>
          <p className="mt-3 text-primary-700 text-xl font-bold">رضایت و اعتماد شما.</p>
        </div>
      </div>
    </div>
  );
}

export default TeamSite;
