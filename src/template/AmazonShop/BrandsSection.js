"use client";

import { brands } from "@/data";

export default function BrandsSection() {
  return (
    <div className="container px-4 mt-28" dir="rtl">
      <p className="text-center text-gray-700 dark:text-[#7B7F86] mb-10 leading-7">
        در پایین میتوانید لیست سایت ها دیگر کشور امارات که میتوانید از آن کالای مورد نظرتان را خرید کنید لیست شده است.
        برای مشاهده سایت های دیگر کلیک کنید
      </p>

      <div className="grid grid-cols-2 xl:grid-cols-5  gap-4 lg:gap-8">
        {brands.map((brand, idx) => (
          <div
            style={{ boxShadow: "0px 1px 48px 0px #0000000F" }}
            key={brand.id}
            className={`
              bg-white dark:bg-dark-box dark:border-dark-stroke rounded-xl p-3 md:p-4 border border-gray-100
              hover:shadow-md transition-all flex flex-col h-full
              ${idx % 2 == 1 ? "lg:mt-10" : ""}
            `}
          >
            {/* جای لوگو */}
            <div className="h-14 md:mb-6 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-titre">{brand.logo}</h3>
            </div>

            <p className="bg-gray-50 text-sm max-md:text-xs dark:text-dark-text dark:bg-white/10 leading-7 md:text-justify p-2.5 rounded-lg ">
              وب‌سایت Microless یکی از فروشگاه‌های معتبر در زمینه‌ی لوازم الکترونیکی، کامپیوتر، لپ‌تاپ، لوازم جانبی و
              تجهیزات گیمینگ است. این سایت علاوه بر ارائه‌ی برندهای بین‌المللی، در بخش‌های گرافیکی، صوتی، ویدئویی و
              اسمارت‌دیواس نیز فعا
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
