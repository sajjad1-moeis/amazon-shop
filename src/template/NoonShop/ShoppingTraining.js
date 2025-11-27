import React from "react";

function ShoppingTraining() {
  return (
    <div className="container mt-28">
      <div className="mb-8">
        <h2 className="text-3xl  text-primary-700 mb-2 text-right flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-400 rounded"></div>
          آموزش خرید از سایت نون
        </h2>
      </div>

      <p className="text-lg text-gray-600">
        خرید از نون مانند هر فروشگاه آنلاین دیگر بسیار ساده است، با این تفاوت که خرید از این فروشگاه بین المللی برای
        کاربران ایرانی بسیار دشوار است.
      </p>

      <p className="text-lg text-gray-600">
        برای خرید از این سایت شما می توانید از سایت های واسطه خرید از نون استفاده کرده و سفارش خرید خود را به آن ها
        بدهید.
      </p>
      <p className="text-lg text-gray-600">
        {" "}
        <span className="text-gray-800 font-bold">گروه میکرولس</span> گزینه مناسبی برای خرید از noon می‌باشد. کافیست
        خریدار، لینک کالا یا نام محصولی که در سایت نون پیدا کرده است را در باکس بالا کپی نماید و محصول خود را به سبد
        خرید اضافه کند تمام مراحل خرید از جمله محاسبه قیمت، حمل و نقل و پرداخت به صورت انلاین محاسبه میشود و میوانید به
        راحتی محصولتان را خریداری کنید.
      </p>
      <div class="mt-14">
        <p className="text-gray-700 text-3xl">آموزش ویدیویی</p>
        <div class="bg-[#FF6F00] h-[556px] flex-center rounded-xl text-white mt-4">عکس</div>
      </div>
    </div>
  );
}

export default ShoppingTraining;
