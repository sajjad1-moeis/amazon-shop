import Image from "next/image";
import React from "react";

function TicketRequest() {
  return (
    <div className="grid lg:grid-cols-3 mt-28 items-center  bg-white max-lg:bg-[#3F51B5]">
      <div>
        <div className="relative aspect-square max-h-[401px] w-full h-full max-lg:hidden">
          <Image src="/image/ticketRequest.png" alt={`درخواست محصول از تیکت`} fill className="object-cover" />
        </div>
      </div>
      <div class="lg:col-span-2 p-4 lg:p-10">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl  text-primary-50 lg:text-primary-700 mb-2 text-right flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-400 rounded max-lg:hidden"></div>
            درخواست محصول از طریق تیکت پشتیبانی
          </h2>
        </div>
        <div class="text-[#DBDEEFBF] lg:text-gray-600 text-justify leading-8 max-lg:text-[14px]">
          <p>
            برای سفارش کالای درخواستی خود در این روش می توانید از طریق{" "}
            <span className="text-yellow-600 font-bold">تیکت پشتیبانی</span> اقدام کنید برای ارسال تیکت پشتیبانی ابتدا
            می بایست در سایت ثبت نام کنید و از طریق تیکت پشتیبانی ، کالای مورد درخواست خود را به واحد سفارشات {">"} و
            نوع تیکت را (ثبت سفارش کالای ناموجود در سایت) انتخاب و سپس  ارسال کنید.همکاران ما محصول شما را برسی خواهند
            کرد و در صورت امکان در سریعترین زمان ممکن نتیجه را خدمت شما اعلام خواهند کرد.
          </p>
          <p>
            نکته:خرید های خارج از سایتهای امازون امریکا و امارات و نون امارات + ایبی را میتوانید از طریق تیکت اعلام کنید
            و سایت هایی که در بالا اشاره شد را میتوانید بدون تیکت و مستقیما بواسطه موتور جستجوکه  برای هر چهار سایت در
            نظر گرفته شده است را طبق این <span className="text-yellow-600 font-bold">آموزش</span> انجام دهید
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicketRequest;
