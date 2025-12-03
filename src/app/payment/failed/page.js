import { Button } from "@/components/ui/button";
import HeaderSection from "@/template/StepsCart/Step1/HeaderSection";
import { CloseCircle, Headphone, Repeat } from "iconsax-reactjs";

export default function PaymentSuccess() {
  return (
    <>
      <HeaderSection />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-box py-12 px-4" dir="rtl">
        <div className="max-w-2xl mx-auto ">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="p-4 size-max mx-auto bg-red-500/15 rounded-full flex items-center justify-center">
              <CloseCircle size={56} className=" text-red-500" variant="Bold" />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl  font-bold text-gray-900 dark:text-dark-titre mb-2 mt-5">
              {" "}
              پرداخت ناموفق بود
            </h1>
            <p className="text-gray-600 text-sm max-md:text-xs dark:text-dark-text">
              در پردازش تراکنش مشکلی پیش آمده و پرداخت شما نهایی نشده است.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white dark:bg-dark-field rounded-2xl shadow-sm p-4 md:p-8 space-y-6 mt-12 box-payment">
            {/* Introductory Text */}
            <p className="text-gray-500 dark:text-dark-text p-2 rounded-lg leading-relaxed text-center text-xs md:text-sm border border-red-500/25 bg-red-500/10">
              پرداخت شما تکمیل نشد. تراکنش با خطا مواجه شده و مبلغی از حساب شما کسر نشده است. می‌توانید دوباره برای
              پرداخت تلاش کنید یا از کارت دیگری استفاده کنید.
            </p>

            {/* Payment Amount */}
            <div className="space-y-4 pt-4 border-t dark:border-white/10 border-gray-200 text-center">
              <p className=" font-bold text-gray-900 dark:text-dark-titre">دلایل احتمالی عدم موفقیت</p>
            </div>

            {/* Transaction Details Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 bg-[#F98080] rounded-full"></div>
                  <label className="text-gray-700 max-md:text-sm mb-1 dark:text-dark-titre">موجودی ناکافی</label>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text">
                  موجودی کافی در کارت بانکی وجود نداشت
                </p>
              </div>
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 bg-[#F98080] rounded-full"></div>
                  <label className="text-gray-700 max-md:text-sm mb-1 dark:text-dark-titre">مشکل درگاه پرداخت</label>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text">
                  درگاه بانکی هنگام پرداخت دچار مشکل شده است
                </p>
              </div>
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <div className="size-2.5 bg-[#F98080] rounded-full"></div>

                <label className="text-gray-700 max-md:text-sm mb-1 dark:text-dark-titre">مشکل ارتباطی</label>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text">
                  ارتباط با بانک به‌طور موقت قطع شده است
                </p>
              </div>
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <div className="size-2.5 bg-[#F98080] rounded-full"></div>

                <label className="text-gray-700 max-md:text-sm mb-1 dark:text-dark-titre">اتمام زمان</label>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text">
                  زمان انجام تراکنش به پایان رسیده است
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3  border-gray-200">
              <Button className="flex-1 bg-amber-400 text-gray-900 hover:bg-amber-500">
                <Repeat className=" !size-5" />
                پرداخت مجدد
              </Button>
              <Button
                variant="ghost"
                className="flex-1 dark:bg-dark-stroke dark:text-dark-titre bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <Headphone className=" !size-5" />
                ارتباط با پشتیبانی
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
