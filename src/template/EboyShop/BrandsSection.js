"use client";

import { brands } from "@/data";

export default function BrandsSection() {
  return (
    <div className="container px-4 py-12" dir="rtl">
      <p className="text-center text-gray-700 mb-10 leading-7">
        در پایین میتوانید لیست سایت ها دیگر کشور امارات که میتوانید از آن کالای مورد نظرتان را خرید کنید لیست شده است.
        برای مشاهده سایت های دیگر کلیک کنید
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-8">
        {brands.map((brand, idx) => (
          <div
            style={{ boxShadow: "0px 1px 48px 0px #0000000F" }}
            key={brand.id}
            className={`
              bg-white rounded-xl p-4 border border-gray-100
              hover:shadow-md transition-all flex flex-col h-full
              ${idx % 2 == 1 ? "mt-10" : ""}
            `}
          >
            {/* جای لوگو */}
            <div className="h-14 mb-6 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-gray-900">{brand.logo}</h3>
            </div>

            <p className="bg-gray-50 text-sm leading-7 text-justify p-2.5 rounded-lg ">
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
