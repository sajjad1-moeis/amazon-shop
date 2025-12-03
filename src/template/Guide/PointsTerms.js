import { Bag2 } from "iconsax-reactjs";

export default function PointsTerms() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
        <h2 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-dark-titre">روش‌های دریافت امتیاز</h2>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((item) => (
          <div className="p-2 md:p-4 rounded-xl border-2 border-primary-500 dark:border-dark-title">
            <Bag2 size={36} className="text-primary-500 dark:text-primary-400" variant="Bold" />
            <p className="my-3 max-md:text-sm dark:text-dark-titre">خرید از آمازون</p>
            <p className="text-gray-500 text-sm max-md:text-xs dark:text-dark-text">
              با هر خرید از آمازون امارات مقدار مشخصی امتیاز نسبت به مبلغ پرداختی دریافت می‌کنید.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 border-gray-200 dark:border-dark-field">
        <div className="flex items-center gap-3 ">
          <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-dark-titre">
            چطور از امتیازها استفاده کنیم؟
          </h2>
        </div>
        <div class="text-gray-600 dark:text-dark-text  mt-6">
          <p className="leading-7">امتیازات جمع‌آوری‌شده می‌تواند برای کاهش قیمت برخی سفارش‌ها استفاده شود.</p>
          <p className="leading-7">
            در زمان ثبت سفارش جدید، اگر امتیاز کافی در حساب شما وجود داشته باشد، سیستم گزینه «استفاده از امتیاز» را
            نمایش می‌دهد و مبلغ متناسب با امتیاز شما از قیمت نهایی کسر خواهد شد.
          </p>
          <p className="leading-7">
            توجه داشته باشید که امکان استفاده از امتیاز برای کالاهای غیرقابل تخفیف یا برخی محصولات خاص وجود ندارد.
          </p>
        </div>
      </div>
      <div className=" mt-8 mb-4 text-gray-800 text-lg  dark:text-dark-titre">محدودیت‌ها :</div>
      <div className="grid md:grid-cols-3 gap-4">
        {[...Array(3)].map((item) => (
          <div className="p-3 md:p-4 rounded-xl bg-gray-100 dark:bg-dark-field">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-2.5 bg-primary-400 rounded-full"></div>
              <p className=" text-gray-800 dark:text-dark-titre">خرید از آمازون</p>
            </div>
            <p className="text-gray-500 text-sm dark:text-dark-text">
              در هر سفارش فقط بخشی از مبلغ را می‌توان با امتیاز پرداخت کرد
            </p>
          </div>
        ))}
      </div>

      <div className="!mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 border-gray-200 dark:border-dark-field ">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-dark-titre">
            قوانین استفاده از امتیازات
          </h2>
        </div>
        <div className="space-y-3 mt-8">
          <h3 className="text-base md:text-lg text-gray-700  dark:text-dark-titre">
            مطابق دستورالعمل‌های رسمی میکرولس :
          </h3>
          <ul className="space-y-2 text-gray-600 list-disc list-inside mt-3 max-md:text-sm dark:text-dark-text">
            <li>امتیازات تاریخ انقضا دارند و پس از پایان اعتبار، قابل استفاده نیستند.</li>
            <li>میزان امتیاز قابل دریافت در هر خرید بسته به نوع کالا متفاوت است.</li>
            <li>امتیازات تنها برای سفارش‌های ثبت‌شده در سایت قابل استفاده هستند.</li>
            <li>در صورت تخلف یا سوءاستفاده، امتیازات بدون اطلاع قبلی حذف می‌شود.</li>
            <li>امتیاز مربوط به کالاهای مرجوعی پس از بررسی کیفیت حذف یا اصلاح خواهد شد.</li>
            <li>امکان تبدیل امتیاز به وجه نقد وجود ندارد.</li>
            <li>در خریدهای بین‌المللی ممکن است محدودیت‌هایی برای مصرف امتیاز اعمال شود.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
