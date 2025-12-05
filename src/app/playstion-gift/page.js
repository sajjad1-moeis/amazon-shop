import IndexLayout from "@/layout/IndexLayout";
import HeroSection from "@/template/PlaystionGift/HeroSection";
import PlayStationGiftCardForm from "@/template/PlaystionGift/PlayStationGiftCardForm";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <div class="bg-gray-50 dark:bg-dark-bg   pb-20">
        <HeroSection />
        <div class="max-md:px-4">
          <div
            className="rounded-2xl border border-gray-200  bg-white dark:bg-dark-box shadow-sm container
            dark:border-[#7B7F86] py-4 px-6 mt-20 lg:mt-36 max-md:text-sm dark:text-dark-text text-gray-600 "
          >
            <p className="pb-4 mb-4 border-b border-gray-200 dark:border-dark-stroke">
              گیفت کارت پلی‌استیشن بهترین و سریع‌ترین روش برای شارژ حساب PSN و دسترسی کامل به فروشگاه پلی‌استیشن است. با
              استفاده از گیفت کارت، می‌توانید به راحتی بازی‌های جدید را خریداری کنید، آیتم‌های داخل بازی تهیه کنید،
              اشتراک PS Plus را فعال کنید و به انواع پیشنهادهای ویژه و تخفیف‌های فروشگاه پلی‌استیشن دسترسی داشته باشید —
              بدون نیاز به کارت بانکی بین‌المللی یا حساب ارزی.
            </p>
            <p>
              تمام گیفت کارت‌های پلی‌استیشن ارائه‌شده در این صفحه کاملاً معتبر، اورجینال و قابل فعال‌سازی در لحظه هستند.
              پس از خرید، کد گیفت کارت فوراً برای شما نمایش داده می‌شود و می‌توانید آن را در بخش Redeem Code کنسول PS5،
              PS4 یا حساب PSN خود وارد کنید. با این روش، فرایند خرید بسیار ساده، ایمن و سریع می‌شود.
            </p>

            <p className="pb-4 mb-4 border-b border-gray-200 dark:border-dark-stroke mt-4">
              برای سهولت بیشتر، یک محاسبه‌گر دقیق قیمت در بالای همین صفحه قرار داده شده تا بتوانید مبلغ گیفت کارت
              موردنظر را انتخاب کرده و قیمت نهایی ریالی آن را مشاهده کنید. این ویژگی باعث می‌شود پیش از پرداخت، تصمیم
              آگاهانه‌تری بگیرید و مناسب‌ترین گزینه را انتخاب کنید.{" "}
            </p>

            <p>
              گیفت کارت پلی‌استیشن علاوه‌بر شارژ حساب، برای خرید DLC، بسته‌های افزونه، تم‌ها، موسیقی‌ها و همینطور
              اشتراک‌های PS Plus و PS Now نیز مورد استفاده قرار می‌گیرد. این کارت‌ها هیچ‌گونه ریسک امنیتی ندارند و از
              آنجایی که نیازی به اتصال کارت بانکی نیست، اطلاعات حساب شما کاملاً امن باقی می‌ماند.
            </p>
            <p>
              اگر برای انتخاب مقدار گیفت کارت مناسب یا تفاوت بین منطقه‌های مختلف (Region) نیاز به راهنمایی دارید، تیم
              پشتیبانی ما در تمامی مراحل خرید همراه شماست. هدف ما ارائه یک تجربه مطمئن، ساده و سریع است تا بتوانید بدون
              دغدغه از امکانات دنیای پلی‌استیشن لذت ببرید.
            </p>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}

export default Page;
