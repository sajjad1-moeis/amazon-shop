"use client";

import { Add } from "iconsax-reactjs";

export default function FAQSection() {
  const faqs = [
    {
      id: "item-1",
      question: "چرا نمی توان مستقیم از آمازون خرید کرد؟",
      answer:
        "آمازون آمریکا به علت تحریم ها به ایرانیها خدماتی عرضه نمیکند و کالایی را برایشان ارسال نمی کند لذا امکان خرید مستقیم از آمازون برای مردم ایران میسر نیست.",
    },
    {
      id: "item-2",
      question: "خرید چه کالاهایی از آمازون مقدور هست",
      answer:
        "در حال حاضر بیش از ۳۰ میلیون محصول در آمازون امارات به فروش میرسد که از بین کالاها محصولات آرایشی و بهداشتی مانند عطر ریش تراش اتو مو لوازم آرایشی برندهای محبوب لوازم خانگی مانند جارو برقی های رباتیک لوازم آشپزخانه مانیتورهای بالای ۳۰ اینچ پوشاک ورزشی لوازم جانبی کامپیوتر لپ تاپ و محصولات گیمینگ جز کالاهایی هستند که خرید آنها از آمازون دبی به صرفه است. کالاهایی که غیر مجاز باشد مانند اسلحه انواع مخمر مشروبات الکلی لوازم قمار و ... که در قوانین جمهوری اسلامی ایران قابل خریداری نیست.",
    },
    {
      id: "item-3",
      question: "آیا امکان مرجوع کردن کالا وجود دارد؟",
      answer:
        "میکرولس سلامت فیزیکی کالا و همچنین تشابه آن با کالای سفارشی در آمازون را تضمین میکند اگر کالای شما سلامت فیزیکی نداشت و یا مشابه کالای سفارشی نباشد میتوانید به ما اطلاع بدهید تا بصورت قطعی برایتان پیگیری کنیم تا کالا را مرجوع نمایید. همچنین کیفیت کلی سازنده محصول وابسته به برند و شرکت آن است و فروشگاه میکرولس مسئول آن نمی باشد.",
    },
  ];

  return (
    <div className="container mt-28" dir="rtl">
      <div className="mb-8">
        <h2 className="text-3xl  text-primary-700 mb-2 text-right flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-400 rounded"></div>
          سوالات متداول
        </h2>
      </div>

      <div type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            value={faq.id}
            className="bg-white rounded-xl  p-4"
            style={{ boxShadow: "0px 1px 5px -1px #0000001F" }}
          >
            <div className="text-right hover:no-underline  flex items-center gap-2">
              <div class="size-8 bg-primary-300 text-white flex-center rounded-full">
                <Add />
              </div>
              <span className=" text-gray-700 flex-1 text-right">{faq.question}</span>
            </div>
            <div className="text-right pt-4 mt-4 text-gray-600 leading-7 border-t border-gray-200">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
