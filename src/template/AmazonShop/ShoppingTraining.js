import React from "react";

function ShoppingTraining() {
  return (
    <div className="container">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl dark:text-dark-title text-primary-700 mb-2 text-right flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-400 dark:bg-dark-title rounded"></div>
          آموزش خرید از سایت آمازون امارات
        </h2>
      </div>
      <p className="text-[14px] leading-6 md:text-lg text-gray-600 dark:text-dark-text">
        ابتدا لینک محصول خود را از سایت‌های زیر کپی کرده و با کلیک بر روی دکمه جستجوگر، قیمت نهایی آن را مشاهده و با
        کلیک بر روی دکمه افزودن به سبد خرید، آن را به سبد خرید خود اضافه و پس از بررسی روی دکمه تکمیل سفارش، آن را نهایی
        و خرید کنید. اطلاعات بیشتر 
      </p>
      <div className="mt-14">
        <p className="text-gray-700 text-xl md:text-2xl lg:text-3xl dark:text-dark-titre">آموزش ویدیویی</p>
        <div className="bg-[#FF6F00] h-60 md:h-[556px] flex-center rounded-xl text-white mt-4">عکس</div>
      </div>
    </div>
  );
}

export default ShoppingTraining;
