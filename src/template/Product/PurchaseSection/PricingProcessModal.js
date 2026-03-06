"use client";

import Link from "next/link";
import { Headphone } from "iconsax-reactjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PRICING_BASIS_ITEMS = [
  "قیمت روز کالا در فروشگاه مبدا (Amazon و سایر مارکتها)",
  "نرخ ارز روز در زمان ثبت سفارش",
  "هزینه های حمل بین المللی و داخلی",
  "هزینه های عملیاتی و خدمات میکرولس",
];

const IMPORTANT_NOTES = [
  {
    text: "قیمت ها وابسته به ",
    highlight: "نرخ ارز",
    highlightHref: "/currency-rates",
    suffix: " و قیمت مبدا هستند و ممکن است به روزرسانی شوند.",
  },
  { text: "تخفیف ها معمولاً روی بخش خدمات اعمال می شوند.", plain: true },
  { text: "جزئیات کامل هر سفارش در بخش «", highlight: "جزئیات قیمت", suffix: "» قابل مشاهده است." },
];

export default function PricingProcessModal({ trigger, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[420px] w-[calc(100%-32px)] sm:max-w-[480px] dark:bg-dark-box dark:border-dark-stroke bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-xl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            فرایند قیمت گذاری محصولات
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-5 text-right mt-3 sm:mt-4">
          {/* Intro */}
          <p className="text-[13px] sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            قیمت هر کالا در میکرولس به صورت شفاف و بر اساس عوامل مشخص محاسبه می شود تا بدانید هزینه دقیقاً بابت چه
            مواردی است.
          </p>

          {/* مبنای محاسبه قیمت */}
          <div>
            <h4 className="text-[13px] sm:text-sm font-bold text-gray-800 dark:text-dark-titre mb-2">مبنای محاسبه قیمت</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-[13px] sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {PRICING_BASIS_ITEMS.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          {/* درصد خدمات */}
          <div>
            <h4 className="text-[13px] sm:text-sm font-bold text-gray-800 dark:text-dark-titre mb-2">درصد خدمات</h4>
            <p className="text-[13px] sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              برای پوشش هزینه های پردازش، پشتیبانی و حمل درصدی به قیمت افزوده می شود که بسته به ارزش، وزن و شرایط
              کالا متفاوت است.
            </p>
          </div>

          {/* نکات مهم */}
          <div>
            <h4 className="text-[13px] sm:text-sm font-bold text-gray-800 dark:text-dark-titre mb-2">نکات مهم</h4>
            <ul className="space-y-1.5 text-[13px] sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {IMPORTANT_NOTES.map((note, i) => (
                <li key={i} className="flex flex-wrap items-baseline">
                  {note.plain ? (
                    note.text
                  ) : (
                    <>
                      {note.text}
                      {note.highlight && note.highlightHref ? (
                        <Link
                          href={note.highlightHref}
                          onClick={() => onOpenChange?.(false)}
                          className="text-primary-600 dark:text-primary-400 font-medium mx-0.5 hover:underline"
                        >
                          {note.highlight}
                        </Link>
                      ) : note.highlight ? (
                        <span className="text-primary-600 dark:text-primary-400 font-medium mx-0.5">{note.highlight}</span>
                      ) : null}
                      {note.suffix}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-2 space-y-3">
            <p className="text-[13px] sm:text-sm text-gray-600 dark:text-gray-300">
              در صورت وجود هرگونه سؤال درباره قیمت گذاری، تیم پشتیبانی آماده پاسخگویی است.
            </p>
            <Link
              href="/contact-us"
              onClick={() => onOpenChange?.(false)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
            >
              <Headphone size={20} className="flex-shrink-0" />
              ارتباط با پشتیبانی
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
