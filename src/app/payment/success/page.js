import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeaderSection from "@/template/StepsCart/Step1/HeaderSection";
import { Import, TickCircle } from "iconsax-reactjs";

const numberFormatter = new Intl.NumberFormat("fa-IR");

export default function PaymentSuccess() {
  const paymentData = {
    amount: 3450000,
    transactionCode: "9876543210",
    orderNumber: "584732",
    paymentMethod: "درگاه بانکی",
    paymentDate: "۱۴۰۳/۱۰/۱۲",
  };

  return (
    <>
      <HeaderSection />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-box py-12 px-4" dir="rtl">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="p-4 size-max mx-auto bg-green-500/15 rounded-full flex items-center justify-center">
              <TickCircle size={56} className=" text-green-500 " variant="Bold" />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 mt-5 dark:text-dark-titre">
              پرداخت با موفقیت انجام شد
            </h1>
            <p className="text-gray-600 text-sm max-md:text-xs dark:text-dark-text">
              سفارش شما با موفقیت ثبت شد و در حال پردازش است.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white dark:bg-dark-field rounded-2xl shadow-sm p-4 md:p-8 space-y-6 mt-12 box-payment">
            {/* Introductory Text */}
            <p className="text-gray-500 dark:text-dark-text leading-relaxed text-center text-sm max-md:text-xs">
              پرداخت شما با موفقیت ثبت گردید. اطلاعات تراکنش و جزئیات سفارش در ادامه قابل مشاهده است. می‌توانید وضعیت
              سفارش خود را در بخش «تاریخچه سفارش‌ها» نیز دنبال کنید.
            </p>

            {/* Payment Amount */}
            <div className="space-y-4 pt-4 border-t dark:border-dark-stroke border-gray-200 text-center ">
              <label className="text-xs md:text-sm text-gray-500 dark:text-dark-text">مبلغ پرداختی</label>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-dark-titre">
                {numberFormatter.format(paymentData.amount)} تومان
              </p>
            </div>

            {/* Transaction Details Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <label className="text-xs md:text-sm text-gray-500 dark:text-dark-text">کد تراکنش</label>
                <p className="text-sm md:text-base text-gray-900 dark:text-dark-titre">{paymentData.transactionCode}</p>
              </div>
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <label className="text-xs md:text-sm text-gray-500 dark:text-dark-text">شماره سفارش</label>
                <p className="text-sm md:text-base text-gray-900 dark:text-dark-titre">{paymentData.orderNumber}</p>
              </div>
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <label className="text-xs md:text-sm text-gray-500 dark:text-dark-text">روش پرداخت</label>
                <p className="text-sm md:text-base text-gray-900 dark:text-dark-titre">{paymentData.paymentMethod}</p>
              </div>
              <div className="space-y-1 bg-gray-100 dark:bg-white/10 p-2 rounded-md">
                <label className="text-xs md:text-sm text-gray-500 dark:text-dark-text">تاریخ پرداخت</label>
                <p className="text-sm md:text-base text-gray-900 dark:text-dark-titre">{paymentData.paymentDate}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3  border-gray-200">
              <Button className="flex-1 bg-amber-400 text-gray-900 hover:bg-amber-500">
                <Package className=" !size-5" />
                مشاهده در پنل
              </Button>
              <Button
                variant="ghost"
                className="flex-1 dark:bg-dark-stroke bg-gray-100 dark:text-dark-titre text-gray-700 hover:bg-gray-200"
              >
                <Import className=" !size-5" />
                دریافت فاکتور خرید
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
