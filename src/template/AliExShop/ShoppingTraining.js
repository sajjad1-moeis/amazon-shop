import React from "react";

function ShoppingTraining() {
  return (
    <div className="container  my-28">
      <div className="mb-8">
        <h2 className="text-3xl  text-primary-700 mb-2 text-right flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-400 rounded"></div>
          آموزش خرید از سایت علی اکسپرس
        </h2>
      </div>
      <p className="text-lg text-gray-600">1. ثبت نام در سایت</p>
      <p className="text-lg text-gray-600">2. انتخاب محصول و اضافه کردن به سبد خرید</p>
      <p className="text-lg text-gray-600">3. تأیید محصول و آدرس ارسال</p>
      <p className="text-lg text-gray-600">4. انتخاب نحوه ارسال پستی</p>

      <div class="mt-14">
        <p className="text-gray-700 text-3xl">آموزش ویدیویی</p>
        <div class="bg-[#FF6F00] h-[556px] flex-center rounded-xl text-white mt-4">عکس</div>
      </div>
    </div>
  );
}

export default ShoppingTraining;
