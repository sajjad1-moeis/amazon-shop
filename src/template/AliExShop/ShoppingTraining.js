import React from "react";

function ShoppingTraining() {
  return (
    <div className="container  my-28">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-primary-700 mb-2 text-right flex items-center gap-3 dark:text-dark-title">
          <div className="w-1 h-8 bg-primary-400 dark:bg-dark-title rounded"></div>
          آموزش خرید از سایت علی اکسپرس
        </h2>
      </div>
      <div className="max-md:text-sm text-lg text-gray-600 dark:text-dark-text">
        <p>1. ثبت نام در سایت</p>
        <p>2. انتخاب محصول و اضافه کردن به سبد خرید</p>
        <p>3. تأیید محصول و آدرس ارسال</p>
        <p>4. انتخاب نحوه ارسال پستی</p>
      </div>
      <div className="mt-14">
        <p className="text-gray-700 text-xl md:text-2xl lg:text-3xl dark:text-dark-titre">آموزش ویدیویی</p>
        <div className="bg-[#FF6F00] h-60 md:h-[556px] flex-center rounded-xl text-white mt-4">عکس</div>
      </div>
    </div>
  );
}

export default ShoppingTraining;
