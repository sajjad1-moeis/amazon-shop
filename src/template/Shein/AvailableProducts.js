import Image from "next/image";
import React from "react";

function AvailableProducts() {
  return (
    <div
      className={
        "flex flex-col max-lg:gap-8 lg:grid lg:grid-cols-3 mt-14  lg:mt-28 lg:items-center container p-4 lg:p-10"
      }
    >
      <div className="lg:col-span-2">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl dark:text-dark-title text-primary-700 mb-2 text-right flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-400 dark:bg-dark-title rounded"></div>
            کالاهای موجود در سایت شین امارات
          </h2>
        </div>
        <div className="text-gray-600 text-justify leading-8 mt-4 max-lg:text-sm dark:text-dark-text">
          <p>
            شین یکی از محبوب‌ترین فروشگاه‌های پوشاک محسوب می‌شود. در این مجموعه لباس‌های کودکان، اکسسوری‌های خاص، کفش،
            کیف و همینطور بسیاری از اقلام مد عرضه می‌شود. شین در عرضه لباس‌های زنانه و مردانه بیشترین مانور را می‌دهد.
            با ورود به سایت شی این دسته بندی مختلفی از محصولات پیش روی شما قرار می‌گیرد. به این ترتیب می‌توانید وارد
            دسته مورد نظر خود شوید و بهترین انتخاب را داشته باشید. از یاد نبرید که شما فقط تا قسمت پیش از پرداخت هزینه
            می‌توانید پیش بروید. زمانی که به درگاه پرداخت وصل شدید از شما کارت اعتباری مخصوصی خواسته می‌شود که در نهایت
            می‌بایست از شرکت‌های واسطه برای پرداخت و خرید استفاده کنید. میکرولس صفر تا صد پروسه خرید از شین امارات را در
            اختیار شما قرار می‌دهد.
          </p>
        </div>
      </div>
      <div>
        <div className="relative aspect-square max-h-[298px] w-full h-full">
          <Image
            src={"/image/Shein/banner2.png"}
            alt={`درخواست محصول از تیکت`}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default AvailableProducts;
