export const amazonSteps = [
  {
    id: 1,
    title: "پیدا کردن محصول در آمازون امارات",
    desc: `وارد <a href="https://amazon.ae" class="text-[#9D7600] font-medium hover:underline">amazon.ae</a> شوید، 
           محصول موردنظرتان را جستجو کنید و لینک صفحه آن را کپی کنید.`,
  },
  {
    id: 2,
    title: "وارد کردن لینک در سایت میکروسل",
    desc: `لینک محصول را در بخش 
           <a href="/request-amazon-uae" class="text-[#9D7600] font-medium hover:underline">درخواست خرید از آمازون امارات</a>
           قرار دهید تا سیستم اطلاعات کالا را دریافت کند.`,
  },
  {
    id: 3,
    title: "دریافت قیمت نهایی و شفاف",
    desc: "میکروسل قیمت نهایی کالا، هزینه ارسال داخل امارات، ارسال بین‌المللی، گمرک و مالیات را محاسبه و نمایش می‌دهد.",
  },
  {
    id: 4,
    title: "تایید و ثبت سفارش",
    desc: "در صورت تأیید هزینه نهایی، سفارش را ثبت کنید تا تیم میکروسل عملیات خرید را آغاز کند.",
  },
];

export default function AmazonShoppingGuide() {
  return (
    <div className="space-y-2 max-md:text-sm">
      <p className="text-gray-600 ">
        خرید از آمازون برای بسیاری از کاربران ایرانی یکی از بهترین روش‌ها برای دسترسی به محصولات اصلی و متنوع جهانی است.
        با این حال، به دلیل محدودیت‌های پرداخت بین‌المللی، قوانین گمرکی و پیچیدگی‌های ارسال، انجام این خرید به‌صورت
        مستقیم همیشه آسان نیست.
      </p>
      <p className="text-gray-600 ">
        میکرولس این امکان را فراهم کرده که بدون نیاز به کارت اعتباری خارجی و بدون درگیری با مسائل حمل‌ونقل، بتوانید هر
        محصولی را از فروشگاه‌های آمازون آمریکا و امارات خریداری کنید.
      </p>
      <p className="text-gray-600 ">
        {" "}
        در این راهنما تمام مراحل خرید، نکات مهم قبل از ثبت سفارش، روش انتخاب محصول مناسب، و هشدارهای ضروری را به‌صورت
        شفاف و کامل توضیح داده‌ایم تا بتوانید با اطمینان و آگاهی خرید خود را انجام دهید.
      </p>

      <div className=" mt-12 pt-12 ">
        <div className="flex items-center gap-3 ">
          <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-600">آموزش کامل خرید از آمازون از طریق میکرولس</h2>
        </div>
        <p className="text-gray-600 leading-7 mt-6">
          خرید از آمازون با استفاده از خدمات میکرولس بسیار ساده است. ابتدا لینک محصول مورد نظر را در سایت آمازون پیدا
          می‌کنید و آن را در بخش «درخواست خرید» یا «محاسبه‌گر قیمت» میکرولس وارد می‌کنید. سیستم به‌صورت خودکار قیمت
          کالا، هزینه حمل تا انبار امارات، هزینه ارسال بین‌المللی، گمرک و مالیات را برای شما محاسبه می‌کند.
        </p>
        <p className="text-gray-600 leading-7">
          پس از مشاهده قیمت نهایی و تایید آن، سفارش شما ثبت می‌شود و تیم میکرولس کالا را از آمازون خریداری می‌کند. سپس
          محصول به انبار امارات منتقل شده، پردازش و بسته‌بندی می‌شود و برای ارسال به ایران آماده خواهد شد. بعد از ورود
          کالا به کشور، مراحل گمرک انجام شده و پس از ترخیص، سفارش از طریق پست داخلی برای شما ارسال می‌شود.
        </p>
        <p className="text-gray-600 leading-7">
          با این روش، بدون داشتن کارت اعتباری بین‌المللی یا نگرانی بابت پیچیدگی‌های ارسال، می‌توانید هر کالایی را از
          آمازون خریداری کنید.
        </p>
      </div>

      <div className="!mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 border-gray-200">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
            <h2 className="text-xl md:text-2xl font-bold text-primary-600">روند واقعی ثبت مرجوعی</h2>
          </div>

          <div class="space-y-6">
            {amazonSteps.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="w-8 h-8 flex-none bg-[#9D7600] text-white rounded-full flex items-center justify-center text-sm">
                  {item.id}
                </div>
                <div>
                  <p className="font-semibold text-gray-600 text-base md:text-lg">{item.title}</p>
                  <p dangerouslySetInnerHTML={{ __html: item.desc }} className="text-gray-500 text-sm mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="!mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 border-gray-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-600">
            نکات بسیار مهمی که قبل از خرید از آمازون باید بدانید
          </h2>
        </div>
        <div className="space-y-3 mt-8">
          <h3 className="text-base md:text-lg text-gray-700">پیش از ثبت سفارش بهتر است به چند نکته کلیدی توجه کنید:</h3>
          <ul className="space-y-2 text-gray-600 list-disc list-inside mt-3 max-md:text-sm">
            <li>برخی کالاها در آمازون غیرقابل‌مرجوع هستند و در صورت عدم مشکل فنی، امکان بازگشت ندارند.</li>
            <li>
              هزینه نهایی خرید شامل قیمت محصول، هزینه ارسال امارات، ارسال بین‌المللی، گمرک و مالیات است و این هزینه‌ها
              برای کالاهای الکترونیکی و ارزشمند ممکن است بیشتر باشد.
            </li>
            <li>
              زمان ارسال بسته به نوع کالا و مسیر حمل متفاوت است و خریدهای بین‌المللی معمولاً بین ۲۰ تا ۳۰ روز زمان
              می‌برند.{" "}
            </li>
            <li>
              قبل از ثبت خرید، مشخصات کالا، توضیحات فروشنده، کشور ارسال‌کننده، و شرایط گارانتی را با دقت بررسی کنید تا
              پس از دریافت دچار مشکل نشوید. با رعایت این نکات، احتمال بروز خطا یا خرید اشتباه به حداقل می‌رسد.
            </li>
          </ul>
        </div>
      </div>
      <div className="!mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 border-gray-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-600">
            چطور در آمازون بهترین محصول را انتخاب کنیم؟
          </h2>
        </div>
        <div className="space-y-3 mt-8">
          <h3 className="text-base md:text-lg text-gray-700">
            برای انتخاب محصول مناسب در آمازون باید چند معیار مهم را در نظر بگیرید.
          </h3>
          <ul className="space-y-2 text-gray-600 list-disc list-inside mt-3 max-md:text-sm">
            <li>
              بخش Reviews و Ratings را بررسی کنید. <span className="text-primary-500">امتیاز بالاتر از ۴</span> و تعداد
              نظر زیاد نشانه خوبی است.
            </li>
            <li>
              به فروشنده توجه کنید. خرید از Amazon، Amazon Warehouse یا فروشندگان با امتیاز بالا معمولاً مطمئن‌تر است.
            </li>
            <li>بخش مشخصات فنی و جزئیات محصول را کامل مطالعه کنید تا مطمئن شوید محصول مطابق نیاز شماست.</li>
            <li>عکس‌های واقعی خریداران را مشاهده کنید؛ این تصاویر بسیار قابل‌اعتمادتر از عکس‌های رسمی محصول هستند.</li>
            <li>
              در نهایت قیمت را با چند فروشنده مختلف مقایسه کنید و محصولی را انتخاب کنید که هم کیفیت مناسب و هم قیمت
              منطقی دارد.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
