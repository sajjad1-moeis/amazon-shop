"use client";

import React from "react";
import { Headphone, Flash, TickSquare, Element3 } from "iconsax-reactjs";

const features = [
  {
    id: 1,
    icon: Flash,
    title: "تحویل لحظه‌ای",
    description: "تحویل سریع کد بعد از پرداخت",
  },
  {
    id: 2,
    icon: TickSquare,
    title: "قیمت شفاف",
    description: "بدون هزینه مخفی یا کارمزد اضافه",
  },
  {
    id: 3,
    icon: Element3,
    title: "تنوع کامل برندها",
    description: "بیش از ده‌ها نوع گیفت کارت مختلف",
  },
  {
    id: 4,
    icon: Headphone,
    title: "پشتیبانی واقعی",
    description: "پاسخگویی کامل قبل و بعد از خرید",
  },
];

export default function WhyGiftCardSection() {
  return (
    <section className="w-full md:py-12 lg:py-16 xl:py-20" dir="rtl">
      <div className="">
        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 dark:text-dark-titre mb-8 md:mb-10">
          چرا گیفت کارت را از ما بخرید؟
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5 lg:gap-6 mb-10">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col items-start justify-between rounded-xl md:rounded-2xl
                  bg-primary-600 border-primary-400
                  dark:bg-[#535364] dark:border-dark-title
                  text-primary-50 dark:text-dark-title
                  px-4 py-5 md:px-5 md:py-6 border`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <Icon size={38} variant="Bold" />
                </div>
                <div className="space-y-1 text-right w-full">
                  <h3 className="text-base md:text-lg mb-3 ">{item.title}</h3>
                  <p className="text-xs md:text-sm text-primary-200 dark:text-primary-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Description Card */}
        <div
          className="rounded-2xl border border-gray-200 bg-white shadow-sm
            dark:border-dark-stroke dark:bg-dark-box py-4 px-4 md:px-6 mt-20 md:mt-36 text-gray-600 max-md:text-sm dark:text-dark-text"
        >
          <p className="pb-4 mb-4 border-b border-gray-200 dark:border-dark-stroke">
            خرید گیفت کارت یکی از سریع‌ترین و مطمئن‌ترین روش‌ها برای دسترسی به خدمات دیجیتال، محتوای سرگرمی و امکانات
            ویژه در پلتفرم‌های مختلف است. شما با استفاده از گیفت کارت، بدون نیاز به کارت بانکی بین‌المللی یا حساب ارزی،
            می‌توانید حساب خود را در سرویس‌های محبوب شارژ کرده و از تمامی امکانات آن‌ها استفاده کنید. گیفت کارت‌ها به
            دلیل امنیت بالا، سرعت فعال‌سازی و پشتیبانی گسترده از سرویس‌های جهانی، به یکی از محبوب‌ترین روش‌های پرداخت
            دیجیتال تبدیل شده‌اند.
          </p>
          <p>
            در این صفحه، امکان خرید انواع گیفت کارت‌های معتبر جهانی وجود دارد؛ شامل گیفت کارت‌های{" "}
            <span className="text-yellow-600">
              اسپاتیفای، پلی‌استیشن، استیم، ایکس‌باکس، آمازون، اپل، گوگل پلی، نتفلیکس و dozens of other international
              brands.
            </span>{" "}
            تمام گیفت کارت‌ها از منابع معتبر تهیه شده و به‌صورت آنی پس از پرداخت در اختیار شما قرار می‌گیرند. فعال‌سازی
            آن‌ها بسیار ساده است و کافیست کد دریافت‌شده را در بخش Redeem یا Top-Up سرویس موردنظر وارد کنید.
          </p>

          <p className="pb-4 mb-4 border-b border-gray-200 dark:border-dark-stroke mt-4">
            ما تلاش کرده‌ایم تجربه‌ای روان، ساده و حرفه‌ای برای شما فراهم کنیم؛ از انتخاب برند گرفته تا پرداخت و تحویل
            فوری. اگر در مورد انتخاب بهترین مبلغ، فعال‌سازی گیفت کارت یا مشکلات احتمالی سوالی دارید، تیم پشتیبانی ما
            آماده است تا شما را راهنمایی کند. هدف ما ارائه یک تجربه خرید سریع، ایمن و قابل اعتماد است تا شما بدون نگرانی
            از سرویس‌های موردعلاقه‌تان لذت ببرید.
          </p>

          <p>
            در نهایت، مهم نیست از چه برندی استفاده می‌کنید — گیفت کارت اسپاتیفای برای گوش دادن به موسیقی، گیفت کارت
            پلی‌استیشن برای خرید بازی، گیفت کارت آمازون برای خرید جهانی، یا گیفت کارت استیم برای گیمرها — تمامی این
            کارت‌ها با تحویل لحظه‌ای، قیمت دقیق و پشتیبانی کامل در این صفحه قابل تهیه هستند.
          </p>
          <p>
            گیفت کارت‌ها بهترین انتخاب برای شارژ حساب، خرید اشتراک، انجام پرداخت‌های بین‌المللی، خرید بازی، موسیقی،
            فیلم، اپلیکیشن‌، کتاب الکترونیکی و هر نوع محتوای دیجیتال هستند. همچنین گزینه‌ای عالی برای هدیه دادن محسوب
            می‌شوند؛ زیرا شما می‌توانید با مبلغ دلخواه یک هدیه دیجیتال قابل استفاده در سراسر دنیا را تقدیم کنید.
          </p>
        </div>
      </div>
    </section>
  );
}
