import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cancelOrderAccordion } from "@/data";
import { InfoCircle } from "iconsax-reactjs";
import StepBox from "./StepBox";
import TitreCard from "@/components/TitreCard";

export default function ShippingReturnPolicy() {
  const steps = [
    { id: 1, title: "ثبت درخواست از پنل کاربری", desc: "ثبت درخواست از پنل کاربری" },
    {
      id: 2,
      title: "بررسی توسط تیم مرجوعی",
      desc: "تیم در طی ۲۴ تا ۴۸ ساعت درخواست را بررسی و نتیجه را اعلام می‌کند.",
    },
    { id: 3, title: "ارسال کالا به آدرس اعلام‌شده", desc: "پس از تایید، مشتری اقدام به ارسال کالا می‌نماید." },
    { id: 4, title: "بررسی کیفیت و نتیجه نهایی", desc: "کالا بررسی شده و نتیجه به مشتری اعلام می‌شود." },
  ];

  return (
    <div className="max-md:text-sm">
      {/* Introductory Paragraph */}
      <p className="text-gray-600 leading-relaxed dark:text-dark-text">
        ما میدانیم که ممکن است گاهی لازم باشد محصولی را به ما بازگردانید. در این صفحه قوانین بازگشت، نحوه بررسی کالا و
        شرایط لغو سفارش را به صورت شفاف ارائه کرده ایم.
      </p>

      {/* Warning Box */}
      <div className="bg-gray-100 border dark:bg-dark-field dark:border-none border-gray-200 rounded-lg p-2 mt-4">
        <p className=" text-gray-700 dark:text-dark-text">
          قبل از ثبت درخواست بازگشت، لطفاً تمامی شرایط زیر را مطالعه فرمایید. میکرولس این حق را برای خود محفوظ می دارد
          که درخواست بازگشت، بازپرداخت یا تعویض را در صورت{" "}
          <span className="text-yellow-600 max-md:underline md:text-primary-600 dark:text-dark-titre">
            عدم تطابق با شرایط قانونی رد کند.
          </span>
        </p>
      </div>

      {/* Main Title */}
      {/* <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-primary-400  rounded-l"></div>
        <h2 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-dark-titre"></h2>
      </div> */}
      <TitreCard title={"شرایط کامل بازگشت کالا"} className="mt-12" />

      {/* Section 1 */}
      <div className="space-y-3 mt-8">
        <h3 className="text-base md:text-lg text-gray-700 dark:text-dark-titre">۱) چه کالاهایی قابل بازگشت هستند؟</h3>
        <ul className="space-y-2 text-gray-600 list-disc list-inside mt-3 max-md:text-sm dark:text-dark-text">
          <li>کالاهای دارای مشکل فنی، ایراد ساخت یا مغایرت با کالای سفارش داده شده.</li>
          <li>کالاهایی که میکرولس به اشتباه ارسال کرده باشد.</li>
          <li>کالاهایی که در صفحه محصول قابل مرجوع بودن آنها مشخص شده باشد.</li>
        </ul>
      </div>

      {/* Section 2 */}
      <div className="space-y-3 mt-8">
        <h3 className="text-base md:text-lg text-gray-700 dark:text-dark-titre">۲) چه کالاهایی قابل بازگشت نیستند؟</h3>
        <p className="text-gray-600 dark:text-dark-text">طبق قوانین مرجع واقعی:</p>
        <ul className="space-y-2 text-gray-600 list-disc list-inside mt-3 max-md:text-sm dark:text-dark-text">
          <li>لوازم آرایشی، پوشاک، کتاب، DVD و مواد مصرفی</li>
          <li>مانیتورهایی که کمتر از ۴ پیکسل سوخته دارند</li>
          <li>کالاهای استفاده شده یا بازشده</li>
          <li>کالاهایی با پلمپ باز، جعبه پاره، برچسب جدا شده یا بسته بندی غیر اصل</li>
          <li>محصولات بین المللی مثل Amazon US که return ندارند (فقط ۲۴ ساعت اول امکان لغو دارند)</li>
        </ul>
      </div>

      <div className="space-y-10 mt-8 md:mt-12 pt-12 border-t-2 border-gray-200 dark:border-dark-field">
        <div>
          <TitreCard title={"روند واقعی ثبت مرجوعی"} />

          <div className="space-y-6">
            {steps.map((step) => (
              <StepBox {...step} />
            ))}
          </div>
        </div>
      </div>

      {/* ----- لغو سفارش ----- */}
      <div className="mt-8 md:mt-12 pt-12 border-t-2 dark:border-dark-field">
        <TitreCard title={"لغو سفارش"} />

        <Accordion type="single" collapsible className="w-full space-y-3">
          {cancelOrderAccordion.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="bg-gray-50 dark:bg-dark-field dark:border-dark-stroke dark:text-dark-titre p-3 rounded-lg border-primary-200 border"
            >
              <AccordionTrigger className="p-0">{item.title}</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm leading-6 mt-3 dark:text-dark-text">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* ----- بازپرداخت ----- */}
      <div className="mt-8 md:mt-12 pt-12 border-t-2 dark:border-dark-field">
        <TitreCard title={"بازپرداخت"} />

        <p className="text-gray-600 text-sm dark:text-dark-text">
          بازپرداخت‌ها طی ۲ تا ۷ روز کاری پس از تایید کامل انجام می‌شود.
        </p>
        <p className="text-gray-600 mt-2 text-sm dark:text-dark-text">
          استرداد فقط از طریق روش اصلی پرداخت یا به صورت اعتبار فروشگاهی انجام می‌پذیرد.
        </p>
      </div>

      {/* هشدار نهایی */}
      <div className="text-sm text-primary-600 dark:text-dark-title dark:bg-primary-600 bg-primary-50 p-3 rounded-lg mt-4 flex items-center gap-2">
        <InfoCircle variant="Bold" className="flex-none" />
        در صورت رد مرجوعی به دلیل بازشدن، استفاده یا نقص بسته‌بندی، کالا بدون بازپرداخت به خریدار بازگردانده می‌شود.
      </div>
      <p className="text-yellow-600 mt-4">
        اینجا را کلیک کنید تا ببینید کدام محصولات تحت هیچ شرایطی قابل بازگشت نیستند.
      </p>
    </div>
  );
}
