import { deliveryInfo } from "@/data";
import StepBox from "./StepBox";
import TitreCard from "@/components/TitreCard";

export const customsSteps = [
  {
    id: 1,
    title: "ورود و ثبت کالا در گمرک",
    desc: "پس از ورود مرسوله به ایران، کالا در سیستم گمرک ثبت شده و برای بررسی اولیه آماده می‌شود.",
  },
  {
    id: 2,
    title: "بررسی مدارک و ارزش‌گذاری",
    desc: "فاکتور کالا، نوع محصول و مشخصات آن توسط کارشناسان بررسی و ارزش گمرکی آن تعیین می‌شود. این مرحله مبنای محاسبه هزینه‌هاست.",
  },
  {
    id: 3,
    title: "محاسبه عوارض و مالیات",
    desc: "بر اساس ارزش کالا و گروه کالایی، عوارض، سود بازرگانی و مالیات ارزش افزوده محاسبه و اعمال می‌شود.",
  },
  {
    id: 4,
    title: "ترخیص و تحویل به حمل داخلی",
    desc: "پس از پرداخت عوارض و تأیید نهایی، کالا ترخیص شده و برای ارسال داخلی به شرکت حمل تحویل داده می‌شود.",
  },
];

function DeliveryItem({ item }) {
  return (
    <div className="space-y-3 mt-8">
      <h3 className="text-base md:text-lg text-gray-700 dark:text-dark-titre">
        {item.id}) {item.title}
      </h3>
      <ul className="space-y-2 text-gray-600 list-disc list-inside mt-3 max-md:text-sm dark:text-dark-text">
        <p>{item.description}</p>
      </ul>
      {item.bottomLinks?.length && (
        <div className="max-md:space-y-2 md:flex-between text-blue-700 dark:text-primary-300 text-sm font-medium mt-6">
          {item.bottomLinks.map((link, index) => (
            <li key={index} className="hover:underline cursor-pointer">
              {link}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomsShippingServices() {
  return (
    <div className="w-full p-3 text-right max-md:text-sm" dir="rtl">
      <p className="text-gray-600 leading-relaxed dark:text-dark-titre">
        در این بخش مهم‌ترین اطلاعاتی که لازم است درباره قوانین گمرکی بدانید را خلاصه کرده‌ایم تا بدون پیچیدگی با فرآیند
        آشنا شوید.
      </p>

      <TitreCard className={"mt-12"} title={"مراحل کامل فرآیند گمرکی"} />

      <div className="space-y-6 mt-8">
        {customsSteps.map((step) => (
          <StepBox key={step.id} {...step} />
        ))}
      </div>

      <div className="space-y-10 mt-8 md:mt-12 pt-12 border-t-2 border-gray-200 dark:border-dark-field">
        <TitreCard title="حمل و نقل" />

        {deliveryInfo.map((item, index) => (
          <DeliveryItem key={item.id || index} item={item} />
        ))}
      </div>

      {/* هزینه تحویل */}
      <div className="space-y-6 mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 dark:border-dark-field border-gray-200">
        <TitreCard title="هزینه تحویل چقدر است؟" />

        <p className="text-gray-600 leading-7 dark:text-dark-text">
          پس از افزودن کالای مورد نظر به سبد خرید می توانید هزینه نهایی سفارش خود را مشاهده کنید. اگر سفارش شما حاوی یک
          کالای بزرگ باشد، ممکن است هزینه های ارسال بیشتری دریافت شود در این صورت اگر هزینه ای ارسال بیشتری لحاظ شود به
          شما اطلاع خواهیم دادپس از افزودن کالای مورد نظر به سبد خرید می توانید هزینه نهایی سفارش خود را مشاهده کنید.
          اگر سفارش شما حاوی یک کالای بزرگ باشد، ممکن است هزینه های ارسال بیشتری دریافت شود در این صورت اگر هزینه ای
          ارسال بیشتری لحاظ شود به شما اطلاع خواهیم داد
        </p>
      </div>

      <div className="space-y-6 mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 dark:border-dark-field border-gray-200">
        <TitreCard title="در دسترس بودن کالا" />

        <p className="text-gray-600 leading-7 dark:text-dark-text">
          موجودی کالاهای موجود در این وب سایت فقط برای اطلاع شما است. در حالی که ما تلاش می کنیم تا اطلاعات موجودی در
          انبار را تا حد امکان دقیق و به موقع نگه داریم، اطلاعات موجود ممکن است قدیمی شود و ممکن است بین زمانی که کالا
          را به سبد خرید خود اضافه می کنید و زمان پردازش سفارش شما تغییر کند. در موارد نادر، ممکن است کالا موجود نباشد،
          یا تعداد واحدهایی که سفارش داده‌اید در دسترس نباشد در این صورت ما در مورد بهترین راه با شما در ارتباط خواهیم
          بود.
        </p>
      </div>

      <div className="mt-8 md:mt-12 pt-12 border-t-2 dark:border-dark-field border-gray-200">
        {/* <SectionHeader title="گمرک" /> */}

        <TitreCard title={"گمرک"} />

        <p className="text-gray-600 leading-7 mt-6 dark:text-dark-text">
          از آنجایی که برخی از اقلام از انبار ما در خارج از کشور ارسال می‌شوند، ما این حق را برای خود محفوظ می‌داریم که
          محصول سفارش داده شده در صورتی که از نظر اخلاقی ، مذهبی ، امنیتی با مقررات کشوری که محصول در آن تحویل می‌شود
          مغایرت داشته باشد سفارش شما لغو کنیم. در این صورت به شما اطلاع داده می شود و هزینه ای از شما دریافت نمی شود.
        </p>

        <p className="text-gray-600 leading-7 dark:text-dark-text">
          به خصوص به دلیل تغییر قوانین و سیاست گمرک ها ممکن است کالایی در گمرک ممنوعنیت ورود به کشور مقصد را داشته باشد
          سفارش شما لغو و در صورتی که کالا به انبار ما در مبدا برگشت بخورد هزینه از شما دریافت نمی گردد.
        </p>
      </div>
    </div>
  );
}
