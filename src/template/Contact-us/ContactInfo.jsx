"use client";

import React from "react";
import { CallCalling, Location, Sms, Whatsapp } from "iconsax-reactjs";

const CONTACT_INFO = [
  {
    icon: Location,
    title: "آدرس دفتر",
    content: "هرمزگان، بندرعباس، الهیه جنوبی، بلوار امام حسین، خیابان گلشید، پلاک ۱.۰، مجتمع نیرو-مانی، طبقه چهارم",
  },
  {
    icon: CallCalling,
    title: "تلفن",
    content: "۰۹۱۶۱۵۸۷۱۶۴",
  },
  {
    icon: Sms,
    title: "ایمیل",
    content: "info@microless.ir",
  },
  {
    icon: Whatsapp,
    title: "پشتیبانی واتساپ",
    content: "+98 913 437 5878",
  },
];

export default function ContactInfo() {
  return (
    <>
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-700 dark:text-dark-titre max-md:dark:text-dark-title">
        راه های ارتباطی
      </h2>
      <div className="flex flex-col-reverse lg:grid grid-cols-1 sm:grid-cols-2 items-center lg:grid-cols-4 gap-2 bg-primary-600 dark:bg-[#B3B3FF33] text-white p-6 rounded-xl dark:text-dark-titre mx-auto lg:w-3/4">
        {CONTACT_INFO.map((info, index) => {
          const Icon = info.icon;
          const isLast = index === CONTACT_INFO.length - 1;
          return (
            <div
              key={info.title}
              className={`flex flex-col justify-center gap-1 ${
                !isLast ? "max-lg:border-b max-lg:pb-5 lg:border-l border-white/20" : ""
              } px-4 h-full max-lg:w-full`}
            >
              <div className="flex items-center gap-2 text-primary-200 dark:text-dark-title">
                <Icon />
                <p className="text-xl">{info.title}</p>
              </div>
              <p className="font-medium leading-7 mt-3 text-gray-50 dark:text-dark-titre">{info.content}</p>
            </div>
          );
        })}
      </div>
      <p className="text-gray-600 dark:text-dark-text text-sm mt-4 leading-7 text-center">
        ساعات کاری دفتر میکرولس از <span className="text-primary-500 dark:text-dark-title">شنبه</span> تا{" "}
        <span className="text-primary-500 dark:text-dark-title">چهارشنبه</span>، ساعت
        <span className="text-primary-500 dark:text-dark-title"> ۹ صبح</span> تا{" "}
        <span className="text-primary-500 dark:text-dark-title">۶ عصر</span> است. در روزهای پنجشنبه از ساعت
        <span className="text-primary-500 dark:text-dark-title"> ۹ صبح</span> تا{" "}
        <span className="text-primary-500 dark:text-dark-title">۲ بعدازظهر</span> و در روزهای جمعه و تعطیلات{" "}
        <span className="text-primary-500 dark:text-dark-title">رسمی دفتر تعطیل می‌باشد.</span>
      </p>
    </>
  );
}






