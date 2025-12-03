"use client";

import { Button } from "@/components/ui/button";
import { CallCalling, Location, Sms, Whatsapp } from "iconsax-reactjs";
import Image from "next/image";

export default function ContactSection() {
  return (
    <div className="w-full mt-14 md:mt-20 container">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-700 dark:text-dark-titre max-md:dark:text-dark-title">
        راه های ارتباطی
      </h2>
      <div className="flex flex-col-reverse lg:grid grid-cols-1 sm:grid-cols-2 items-center lg:grid-cols-4 gap-2 bg-primary-600 dark:bg-[#B3B3FF33] text-white  p-6 rounded-xl dark:text-dark-titre mx-auto lg:w-3/4">
        {/* Address */}
        <div className="lg:border-l border-white/20 px-4">
          <div className="flex items-center gap-2 text-primary-200 dark:text-dark-title">
            <Location />
            <p className="text-xl">آدرس دفتر</p>
          </div>
          <p className="font-medium leading-7 mt-3  text-gray-50 dark:text-dark-titre">
            هرمزگان، بندرعباس، الهیه جنوبی، بلوار امام حسین، خیابان گلشید، پلاک ۱.۰، مجتمع نیرو-مانی، طبقه چهارم{" "}
          </p>
        </div>

        {/* Phone */}
        <div className="flex flex-col justify-center gap-1 max-lg:border-b max-lg:pb-5 lg:border-l border-white/20 px-4 h-full  max-lg:w-full">
          <div className="flex items-center gap-2 text-primary-200 dark:text-dark-title">
            <CallCalling />
            <p className="text-xl da">تلفن</p>
          </div>
          <p className="font-medium">۰۹۱۶۱۵۸۷۱۶۴</p>
        </div>

        {/* Email */}
        <div className="flex flex-col justify-center gap-1 max-lg:border-b max-lg:pb-5 lg:border-l border-white/20 px-4  h-full max-lg:w-full">
          <div className="flex items-center gap-2 text-primary-200 dark:text-dark-title">
            <Sms />
            <p className="text-xl da">ایمیل</p>
          </div>
          <p className="font-medium">info@microless.ir</p>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col justify-center gap-1 px-4 max-lg:w-full max-lg:border-b max-lg:pb-5 border-white/20">
          <p className="text-sm opacity-80"></p>
          <div className="flex items-center gap-2 text-primary-200 dark:text-dark-title">
            <Whatsapp />
            <p className="text-xl da">پشتیبانی واتساپ</p>
          </div>
          <p className="font-medium">+98 913 437 5878</p>
        </div>
      </div>
      {/* Description */}
      <p className="text-gray-600 dark:text-dark-text text-sm mt-4 leading-7 text-center">
        ساعات کاری دفتر میکرولس از <span className="text-primary-500 dark:text-dark-title">شنبه</span> تا{" "}
        <span className="text-primary-500 dark:text-dark-title">چهارشنبه</span>، ساعت
        <span className="text-primary-500 dark:text-dark-title"> ۹ صبح</span> تا{" "}
        <span className="text-primary-500 dark:text-dark-title">۶ عصر</span> است. در روزهای پنجشنبه از ساعت
        <span className="text-primary-500 dark:text-dark-title"> ۹ صبح</span> تا{" "}
        <span className="text-primary-500 dark:text-dark-title">۲ بعدازظهر</span> و در روزهای جمعه و تعطیلات{" "}
        <p>رسمی دفتر تعطیل می‌باشد.</p>
      </p>
      {/* Map + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-20 h-max">
        {/* MAP */}
        <div className="bg-white dark:bg-transparent h-max">
          <h3 className="text-lg lg:text-2xl font-bold mb-2 text-right text-gray-700 dark:text-dark-titre">
            ارسال پیام برای تیم میکرولس
          </h3>
          <p className="text-gray-400 dark:text-dark-text mb-6  text-right max-lg:text-sm">
            برای هرگونه سوال، پیشنهاد یا درخواست پشتیبانی می‌توانید از طریق فرم زیر یا اطلاعات تماس درج‌شده با ما در
            ارتباط باشید.
          </p>

          <form className="flex flex-col gap-5">
            {/* Two Inputs in Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="flex flex-col text-right">
                <label className=" mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 text-sm outline-none dark:bg-dark-field dark:border-dark-stroke"
                  placeholder="نام خود را وارد کنید"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col text-right">
                <label className=" mb-2">آدرس ایمیل</label>
                <input
                  type="email"
                  className="border rounded-md px-3 py-2 text-sm outline-none dark:bg-dark-field dark:border-dark-stroke"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col text-right">
              <label className=" mb-2">متن پیام</label>
              <textarea
                className="border rounded-md px-3 py-2 text-sm h-32 outline-none dark:bg-dark-field dark:border-dark-stroke"
                placeholder="متن پیام خود را وارد کنید"
              ></textarea>
            </div>

            {/* Submit button */}
            <Button
              size="lg"
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 w-1/2 text-primary-800 max-lg:w-full"
            >
              ارسال پیام
            </Button>
          </form>
        </div>
        <div className="relative aspect-square h-2/3 w-full rounded-xl">
          <Image
            src="/image/Contact-Us/location.png"
            alt={`محصول بازدید شده شماره `}
            fill
            className="object-cover  rounded-xl"
          />
        </div>

        {/* FORM */}
      </div>
    </div>
  );
}
