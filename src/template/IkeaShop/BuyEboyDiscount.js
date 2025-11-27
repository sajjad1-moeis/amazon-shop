import Image from "next/image";
import React from "react";

function BuyEboyDiscount() {
  return (
    <div className={"grid grid-cols-3 my-28 items-center container"}>
      <div class="md:col-span-2 p-10">
        <div className="mb-4">
          <h2 className="text-3xl  text-primary-700 mb-2 text-right flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-400 rounded"></div>
            خرید از ایبی در تخفیفات
          </h2>
        </div>
        <div class="text-gray-600 text-justify leading-8 mt-4">
          <p>
            یکی دیگر از ویژگی‌هایی که باعث شده مردم به سمت خرید از فروشگاه‌های خارجی خصوصا ebay روی بیاورد وجود جشنوارها
            و تخفیفات شگفت انگیز می باشد.
          </p>
          <p>
            در این جشنوارها همچون بلک فرایدی مردم محصولات مورد نیاز خود را می توانند با حتی کمتر از نصف قیمت واقعی‌اش
            خریداری کنند.
          </p>
          <p>
            در فروشگاه ایبی بیش از 1.3 میلیارد کالا موجود می‌باشد و همین امر باعث شده تا اگر کالای را نتوانستید در بازار
            داخل پیدا کنید یا کالای مورد نظر شما قیمت بسیار بالایی داشت، شما براحتی بتوانید محصول مورد نظر خود را از یک
            بازار جهانی با قیمتی بسیار بصرفه تر پیدا کنید
          </p>
        </div>
      </div>
      <div>
        <div className="relative aspect-square max-h-[298px] w-full h-full">
          <Image
            src={"/image/Eboy-Shop/buyDiscount.png"}
            alt={`درخواست محصول از تیکت`}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default BuyEboyDiscount;
