"use client";

import React from "react";

const RULES_SECTIONS = [
  {
    title: "این سرویس برای چه کسانی است؟",
    content: (
      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
        خرید اختصاصی از آمازون یک سرویس ویژه برای کاربران منتخب (VIP / خریداران معتمد) است. این سرویس امکان سفارش
        کالاهایی که در سایت عمومی نمایش داده نمی‌شوند یا فقط از طریق لینک مستقیم یا ASIN قابل دسترسی هستند را فراهم
        می‌کند.
      </p>
    ),
  },
  {
    title: "",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-dark-field rounded-xl p-3">
          <h4 className="text-gray-700 mb-3 dark:text-dark-titre">نحوه ثبت سفارش</h4>

          <ul className=" text-gray-600 dark:text-dark-text leading-relaxed mb-2 list-disc ps-5 space-y-2 text-sm">
            <li>ثبت سفارش فقط از طریق وارد کردن لینک مستقیم محصول در Amazon.ae یا ASIN امکان‌پذیر است.</li>
            <li>
              جستجو در بین محصولات آمازون برای همه کاربران فعال نیست و فقط در صورت داشتن دسترسی ویژه نمایش داده می‌شود.
            </li>
            <li>هر سفارش پس از ثبت، قبل از خرید نهایی توسط تیم بررسی می‌شود.</li>
          </ul>
        </div>
        <div className="bg-gray-100 rounded-xl p-3 dark:bg-dark-field">
          <h4 className="text-gray-700 mb-3 dark:text-dark-titre">فرآیند بررسی و خرید</h4>
          <ul className=" text-gray-600 dark:text-dark-text leading-relaxed mb-2 list-disc ps-5 space-y-2 text-sm">
            <li>پس از ثبت سفارش، وضعیت آن در حالت «در انتظار بررسی» قرار می‌گیرد.</li>
            <li>سفارش‌ها به‌صورت دستی توسط ادمین بررسی می‌شوند.</li>
            <li>در صورت نیاز، ممکن است از شما درخواست اصلاح لینک، تأیید ریسک گمرکی یا تغییر فروشنده شود.</li>
            <li>خرید نهایی فقط پس از تأیید ادمین انجام می‌شود.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-xl p-3 dark:bg-dark-field">
          <h4 className="text-gray-700 mb-3 dark:text-dark-titre">قیمت گذاری و پرداخت</h4>

          <ul className=" text-gray-600 dark:text-dark-text leading-relaxed mb-2 list-disc ps-5 space-y-2 text-sm">
            <li>ثبت سفارش فقط از طریق وارد کردن لینک مستقیم محصول در Amazon.ae یا ASIN امکان‌پذیر است.</li>
            <li>
              جستجو در بین محصولات آمازون برای همه کاربران فعال نیست و فقط در صورت داشتن دسترسی ویژه نمایش داده می‌شود.
            </li>
            <li>هر سفارش پس از ثبت، قبل از خرید نهایی توسط تیم بررسی می‌شود.</li>
          </ul>
        </div>
        <div className="bg-gray-100 rounded-xl p-3 dark:bg-dark-field">
          <h4 className="text-gray-700 mb-3 dark:text-dark-titre">حمل، گمرک و محدودیت ها</h4>
          <ul className=" text-gray-600 dark:text-dark-text leading-relaxed mb-2 list-disc ps-5 space-y-2 text-sm">
            <li>ثبت سفارش فقط از طریق وارد کردن لینک مستقیم محصول در Amazon.ae یا ASIN امکان‌پذیر است.</li>
            <li>
              جستجو در بین محصولات آمازون برای همه کاربران فعال نیست و فقط در صورت داشتن دسترسی ویژه نمایش داده می‌شود.
            </li>
            <li>هر سفارش پس از ثبت، قبل از خرید نهایی توسط تیم بررسی می‌شود.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "سقف سفارش و محدودیت کاربر",
    content: (
      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
        برای هر کاربر، حداکثر مبلغ سفارش و تعداد سفارش در بازه زمانی مشخصی تعیین می‌شود. این محدودیت‌ها بر اساس سطح
        دسترسی کاربر است و توسط ادمین قابل تنظیم است. در صورت تجاوز از محدودیت‌ها، امکان ثبت سفارش جدید وجود ندارد.
        دسترسی به این سرویس ممکن است محدود به زمان باشد و پس از انقضای اعتبار، خرید اختصاصی غیرفعال می‌شود.
      </p>
    ),
  },
  {
    title: "نمایش و محرمانگی سفارش ها",
    content: (
      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
        سفارش‌های ثبت شده در بخش خرید اختصاصی فقط در پنل کاربر و ادمین قابل مشاهده است و در هیچ بخش عمومی سایت نمایش
        داده نمی‌شود. این سفارش‌ها در نتایج جستجوی محصولات، فید محصولات یا از طریق API عمومی سیستم نمایش داده نمی‌شوند و
        با محرمانگی کامل پردازش می‌شوند.
      </p>
    ),
  },
  {
    title: "وضعیت و پیگیری سفارش",
    content: (
      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
        هر سفارش دارای وضعیت مشخصی است که فرآیند بررسی و خرید را نشان می‌دهد. تغییرات وضعیت سفارش به صورت شفاف در پنل
        کاربر نمایش داده می‌شود و کاربر می‌تواند وضعیت فعلی سفارش خود را در هر مرحله مشاهده و پیگیری کند.
      </p>
    ),
  },
  {
    title: "رد یا لغو سفارش",
    content: (
      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
        در صورت عدم تطابق سفارش ثبت شده با قوانین محدودیت یا شرایط فنی، ممکن است سفارش رد شود و دلیل آن به صورت شفاف به
        کاربر اطلاع داده می‌شود. امکان لغو سفارش قبل از خرید نهایی از آمازون وجود دارد. پس از خرید، لغو سفارش با بازگشت
        وجه تابع شرایط فروشنده و قوانین گمرکی خواهد بود.
      </p>
    ),
  },
  {
    title: "مسئولیت ها و شفافیت",
    content: (
      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
        کاربر مسئول صحت لینک و ASIN وارد شده است و هرگونه مغایرت ناشی از اطلاعات نادرست ممکن است باعث تأخیر یا رد سفارش
        شود. تمام مراحل بررسی، تأیید و خرید سفارش به صورت دقیق ثبت و نگهداری می‌شود و اطلاعات ثبت شده مرجع نهایی محسوب
        می‌شود.
      </p>
    ),
  },
  {
    title: "تغییرات و شرایط استفاده",
    content: (
      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
        خرید اختصاصی یک سرویس ویژه است که ممکن است در هر زمان بر اساس سیاست‌های سیستم و شرایط عملیاتی تغییر کند یا به
        صورت موقت یا دائمی غیرفعال شود. استفاده از این سرویس به معنای پذیرش کامل شرایط و قوانین اعلام شده است.
      </p>
    ),
  },
];

export default function RulesTab() {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
      <div className="space-y-6">
        {RULES_SECTIONS.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg  text-gray-700 dark:text-dark-titre mb-2">{section.title}</h3>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
