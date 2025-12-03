import React from "react";
import Image from "next/image";
import { ArrowUp, Bag2, CardPos, Instagram, Send2, Shield, Truck, Whatsapp, Youtube } from "iconsax-reactjs";
import RecentVisits from "./RecentVisits";
import Link from "next/link";
import { Button } from "../ui/button";

const links = [
  { title: "درباره ما", href: "/about-us" },
  { title: "ارتباط با ما", href: "/contact-us" },
  { title: "تخفیف ویژه", href: "#" },
  { title: "قوانین مرجوع کردن کالا", href: "#" },
  { title: "حریم خصوصی", href: "#" },
  { title: "پرسش‌ و پاسخ متداول", href: "#" },
  { title: "راهنمای سفارش", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="w-full bg-white dark:bg-[#101010] text-gray-700 dark:text-white border-t border-neutral-100 dark:border-gray-800"
      dir="rtl"
    >
      <div className="container">
        {/* --- Recent Visits --- */}
        <section className="pt-8">
          <RecentVisits />

          {/* --- Feature Icons row --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 py-6 gap-y-4">
            <FeatureItem icon={<CardPos size={22} />} title="پرداخت امن ریالی" />
            <FeatureItem icon={<Bag2 size={22} />} title="خرید مستقیم از آمازون" />
            <FeatureItem icon={<Truck size={22} />} title="ارسال مطمئن به ایران" />
            <FeatureItem icon={<Shield size={22} />} title="تضمین اصالت و کیفیت" />
            <div className="flex items-center justify-end gap-3 max-lg:hidden">
              <button
                className="flex items-center gap-2 bg-white dark:bg-transparent border border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-300 px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="بازگشت به بالای صفحه"
                // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="text-sm">رفتن به بالا</span>
                <ArrowUp size={18} />
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

          {/* --- Newsletter & Contact --- */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4">
            <div className="flex flex-col md:flex-row max-md:items-start max-md:w-full md:items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <span className="text-sm">تلفن تماس :</span>
                <a
                  href="tel:02191017163"
                  className="text-primary-500 dark:text-[#B1B1FF] font-medium hover:text-primary-600 dark:hover:text-blue-300"
                >
                  ۰۲۱ ۹۱۰ ۱۷۱۶۳ <span className="text-gray-400 dark:text-gray-500">|</span> ۰۹۹۴۱۲۳۵۷۲۹
                </a>
              </div>
              <div className="flex items-center gap-2">
                <div className="leading-4">
                  <div>شنبه تا چهارشنبه ۸:۳۰ تا ۱۷ و پنجشنبه ۸:۳۰ تا ۱۲</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">ایمیل :</span>
                <a
                  href="mailto:info@microless.ir"
                  className="text-primary-500 dark:text-[#B1B1FF] font-medium hover:text-primary-600 dark:hover:text-blue-300"
                >
                  info@microless.ir
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm px-3 py-2 rounded-lg text-gray-400 dark:text-gray-300">خبرنامه</label>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-dark-field border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="bg-transparent placeholder-gray-400 dark:placeholder-[#BEBEBE99] text-right px-3 focus:outline-none w-max text-gray-700 dark:text-white"
                />
                <Button className="bg-gray-300 dark:bg-[#383E46] text-gray-600 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600">
                  ارسال
                </Button>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex max-md:justify-between gap-3 mb-6 p-3 rounded-xl bg-gray-100 dark:bg-[#37373799] dark:border-dark-box border border-gray-200 dark:border-[]">
            <SocialCircle icon={<Youtube />} bg="bg-red-500 hover:bg-red-600" />
            <SocialCircle icon={<Whatsapp />} bg="bg-green-500 hover:bg-green-600" />
            <SocialCircle icon={<Instagram />} bg="bg-pink-400 hover:bg-pink-500" />
            <SocialCircle icon={<Send2 />} bg="bg-sky-500 hover:bg-sky-600" />
          </div>

          <div className="h-px bg-gray-200 dark:bg-dark-box mb-8" />

          {/* About & Badges */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <h4 className="text-2xl font-semibold text-right text-primary-700 dark:text-[#B1B1FF]">درباره</h4>
              <Image alt="logo img" src="/image/logo-blue.png" width={106} height={30} />
            </div>
            <p className="text-right text-neutral-400 dark:text-gray-400 font-thin leading-7 mt-4">
              میکروالس یک پلتفرم مطمئن برای خرید از آمازون آمریکا و امارات است. ما با شفاف‌ترین هزینه‌ها، پشتیبانی واقعی
              و خدماتی مثل بررسی کیفیت، بیمه ارسال و ارسال اکسپرس تجربه‌ای راحت و مطمئن از خرید بین‌المللی برای شما
              فراهم می‌کنیم.
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between max-md:flex-col gap-8">
            {/* Side Features */}
            <aside className="col-span-1">
              <h5 className="text-xl font-semibold text-right mb-3 text-gray-900 dark:text-white">
                با میکروالس می‌توانید
              </h5>
              <ul className="text-right leading-8 text-neutral-400 dark:text-gray-400 list-disc mt-2 mr-4">
                <li>خرید مستقیم از آمازون با ضمانت اصالت کالا</li>
                <li>محاسبه شفاف و دقیق هزینه‌ها پیش از پرداخت</li>
                <li>پشتیبانی فارسی‌زبان در تمامی مراحل خرید</li>
                <li>امکان انتخاب ارسال عادی یا اکسپرس</li>
                <li>خدمات بسته‌بندی و بیمه مسئولیت</li>
              </ul>
            </aside>

            <div className="flex gap-2 md:gap-4 mt-6 flex-wrap justify-center md:justify-end">
              {[1, 2, 3, 4].map((b) => (
                <div
                  key={b}
                  className="w-20 h-20 rounded-lg border border-neutral-300 dark:border-gray-700 bg-white dark:bg-transparent flex items-center justify-center shadow-sm"
                >
                  <Image src={`/image/enamd.png`} alt="نشان تأیید کیفیت و اصالت" width={64} height={64} />
                </div>
              ))}
            </div>
          </div>

          <div className="h-0.5 bg-gray-200 dark:bg-dark-box mt-5" />

          {/* Bottom Links */}
          <div className="py-6 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-600 dark:text-[#B8BECC]">
            <div className="flex gap-y-4 md:gap-0.5 flex-wrap justify-center lg:justify-start w-full">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:underline bg-white dark:bg-transparent px-4 border-l dark:border-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="text-center mt-4 lg:mt-0">
              <p className="text-xs text-neutral-300 dark:text-gray-500">
                تمامی حقوق این وب‌سایت متعلق به میکروالس می‌باشد.
              </p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

/* --- Feature Icon Item --- */
function FeatureItem({ icon, title }) {
  return (
    <div className="flex items-center gap-3 md:p-3">
      <div className="w-10 h-10 rounded-xl bg-gray-400 dark:bg-[#626771] flex items-center justify-center border border-gray-300 dark:border-gray-600 text-white">
        {icon}
      </div>
      <div className="text-right text-xs md:text-sm text-gray-700 dark:text-gray-300">{title}</div>
    </div>
  );
}

/* --- Social Icon Circle --- */
export function SocialCircle({ icon, bg }) {
  return (
    <button className={`${bg} w-10 h-10 rounded-full flex items-center justify-center shadow transition-colors`}>
      <div className="text-white">{icon}</div>
    </button>
  );
}
