"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Add, ArrowUp, Shop, Diamonds } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import ExclusiveAmazonFilter from "./ExclusiveAmazonFilter";
import ExclusiveAmazonTable from "./ExclusiveAmazonTable";

const infoCards = [
  {
    id: 1,
    title: "سقف هر سفارش",
    value: "حداکثر ۵,۰۰۰ دلار",
    icon: ArrowUp,
  },
  {
    id: 2,
    title: "فروشنده مجاز",
    value: "فقط Amazon Official Seller",
    icon: Shop,
  },
  {
    id: 3,
    title: "وضعیت حساب",
    value: "دسترسی (VIP)",
    icon: Diamonds,
  },
];

const initialOrders = [
  {
    id: 1,
    orderNumber: "۱۱۲",
    asin: "کنترلر پلی استیشن ۵ - سفید",
    finalAmount: "۱۴,۰۰۰,۰۰۰",
    status: "pending",
    statusText: "در انتظار بررسی",
    lastUpdate: "۱۴۰۳/۱۰/۲۱",
  },
  {
    id: 2,
    orderNumber: "۱۱۱",
    asin: "کنترلر پلی استیشن ۵ - سفید",
    finalAmount: "۱۴,۰۰۰,۰۰۰",
    status: "pending",
    statusText: "در انتظار بررسی",
    lastUpdate: "۱۴۰۳/۱۰/۲۱",
  },
];

export default function ExclusiveAmazonList() {
  const [activeTab, setActiveTab] = useState("orders");
  const [filters, setFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
  });

  const handleNewOrder = () => {
    window.location.href = "/dashboard/exclusive-amazon/new-order";
  };

  return (
    <div dir="rtl">
      {/* Header Section */}
      <PageHeader title="خرید اختصاصی از آمازون" description="دسترسی ویژه برای سفارش کالاهای خاص و غیر عمومی">
        <Button onClick={handleNewOrder} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-dark-title font-medium gap-2">
          <Add size={20} />
          ثبت سفارش جدید
        </Button>
      </PageHeader>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-6 mb-6">
        {infoCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white dark:bg-dark-box dark:bg-dark-box gap-3 flex items-center rounded-2xl shadow-md p-3 md:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-lg bg-primary-700")}>
                  <Icon size={32} className={cn("text-primary-50")} variant="Bold" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-primary-700 dark:text-dark-title mb-1">{card.value}</p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text dark:text-dark-text mt-1">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs Section */}
      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl" className="w-full rounded-xl overflow-hidden">
          <TabsList className="bg-white dark:bg-dark-box dark:bg-dark-box shadow w-full justify-between overflow-auto flex-none lg:overflow-hidden h-full rounded-xl p-0 flex flex-nowrap lg:grid grid-cols-2">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-primary-50 data-[state=active]:border-b-2 dark:data-[state=active]:border-dark-title border-primary-500 !w-full data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title dark:data-[state=active]:bg-white dark:bg-dark-box/10 dark:text-dark-text text-gray-500 dark:text-dark-text px-5 py-3 rounded-none transition"
            >
              سفارش های اختصاصی من
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="data-[state=active]:bg-primary-50 data-[state=active]:border-b-2 dark:data-[state=active]:border-dark-title border-primary-500 !w-full data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title dark:data-[state=active]:bg-white dark:bg-dark-box/10 dark:text-dark-text text-gray-500 dark:text-dark-text px-5 py-3 rounded-none transition"
            >
              قوانین و راهنما
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6 space-y-4">
            <div className="bg-white dark:bg-dark-box dark:bg-dark-box rounded-2xl shadow-sm p-3">
              {/* Header with Title and Count */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-lg text-gray-900 dark:text-dark-title dark:text-dark-title">لیست سفارشها</h2>
                <div className="text-sm text-gray-700 dark:text-dark-text">
                  تعداد کل :{" "}
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">{initialOrders.length} عدد</span>
                </div>
              </div>

              {/* Filters */}
              <ExclusiveAmazonFilter filters={filters} onFiltersChange={setFilters} />

              {/* Table */}
              <div className="mt-6">
                <ExclusiveAmazonTable orders={initialOrders} />
              </div>
            </div>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="mt-6 space-y-4">
            <div className="bg-white dark:bg-dark-box dark:bg-dark-box rounded-2xl shadow-sm p-6">
              <div className="space-y-6">
                {/* Who is this service for? */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                    این سرویس برای چه کسانی است؟
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    خرید اختصاصی از آمازون یک سرویس ویژه برای کاربران منتخب (VIP / خریداران معتمد) است. این سرویس
                    امکان سفارش کالاهایی که در سایت عمومی نمایش داده نمی‌شوند یا فقط از طریق لینک مستقیم یا ASIN
                    قابل دسترسی هستند را فراهم می‌کند.
                  </p>
                </div>

                {/* How to place an order */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-4">نحوه ثبت سفارش</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed mb-2">
                        ثبت سفارش فقط از طریق وارد کردن لینک مستقیم محصول در Amazon.ae با ASIN امکان‌پذیر است. جستجوی
                        محصولات آمازون برای همه کاربران فعال نیست و نیاز به دسترسی ویژه دارد. هر سفارش قبل از خرید
                        نهایی توسط تیم بررسی می‌شود.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                        فرآیند بررسی و خرید
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                        پس از ثبت سفارش، وضعیت آن "در انتظار بررسی" می‌شود. سفارش‌ها به صورت دستی توسط ادمین بررسی
                        می‌شوند. ممکن است از شما خواسته شود لینک را اصلاح کنید، ریسک گمرکی را تأیید کنید یا در صورت
                        نیاز فروشنده را تغییر دهید. خرید نهایی فقط پس از تأیید ادمین انجام می‌شود.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing and Payment */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-4">قیمت گذاری و پرداخت</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed mb-2">
                        قیمت نمایش داده شده در زمان ثبت سفارش یک برآورد است. مبلغ نهایی پس از بررسی موجودی، هزینه
                        حمل، گمرک و قیمت واقعی خرید تعیین می‌شود. امکان پرداخت دو مرحله‌ای وجود دارد: پرداخت اولیه
                        برای ثبت سفارش و پرداخت نهایی پس از خرید کالا از آمازون. در صورت تغییر مبلغ نهایی قبل از
                        پرداخت دوم، به شما اطلاع داده می‌شود.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                        حمل، گمرک و محدودیت ها
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                        برخی از کالاها (مثل کالاهای دارای باتری، الکترونیک خاص یا کالاهای حساس) ممکن است مورد بررسی
                        گمرکی قرار گیرند. هزینه‌های گمرک و ترخیص تضمین شده است اما ممکن است تغییر کند. سفارش کالاهای
                        در دسته‌بندی‌های ممنوعه امکان‌پذیر نیست یا نیاز به تأیید ویژه دارد. برای برخی حساب‌ها، خرید فقط
                        از فروشندگان رسمی آمازون مجاز است.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Limit and User Restrictions */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                    سقف سفارش و محدودیت کاربر
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    برای هر کاربر، حداکثر مبلغ سفارش و تعداد سفارش در بازه زمانی مشخصی تعیین می‌شود. این محدودیت‌ها
                    بر اساس سطح دسترسی کاربر است و توسط ادمین قابل تنظیم است. در صورت تجاوز از محدودیت‌ها، امکان ثبت
                    سفارش جدید وجود ندارد. دسترسی به این سرویس ممکن است محدود به زمان باشد و پس از انقضای اعتبار، خرید
                    اختصاصی غیرفعال می‌شود.
                  </p>
                </div>

                {/* Order Display and Confidentiality */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                    نمایش و محرمانگی سفارش ها
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    سفارش‌های ثبت شده در بخش خرید اختصاصی فقط در پنل کاربر و ادمین قابل مشاهده است و در هیچ بخش عمومی
                    سایت نمایش داده نمی‌شود. این سفارش‌ها در نتایج جستجوی محصولات، فید محصولات یا از طریق API عمومی
                    سیستم نمایش داده نمی‌شوند و با محرمانگی کامل پردازش می‌شوند.
                  </p>
                </div>

                {/* Order Status and Tracking */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                    وضعیت و پیگیری سفارش
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    هر سفارش دارای وضعیت مشخصی است که فرآیند بررسی و خرید را نشان می‌دهد. تغییرات وضعیت سفارش به
                    صورت شفاف در پنل کاربر نمایش داده می‌شود و کاربر می‌تواند وضعیت فعلی سفارش خود را در هر مرحله
                    مشاهده و پیگیری کند.
                  </p>
                </div>

                {/* Order Rejection or Cancellation */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">رد یا لغو سفارش</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    در صورت عدم تطابق سفارش ثبت شده با قوانین محدودیت یا شرایط فنی، ممکن است سفارش رد شود و دلیل آن
                    به صورت شفاف به کاربر اطلاع داده می‌شود. امکان لغو سفارش قبل از خرید نهایی از آمازون وجود دارد.
                    پس از خرید، لغو سفارش با بازگشت وجه تابع شرایط فروشنده و قوانین گمرکی خواهد بود.
                  </p>
                </div>

                {/* Responsibilities and Transparency */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                    مسئولیت ها و شفافیت
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    کاربر مسئول صحت لینک و ASIN وارد شده است و هرگونه مغایرت ناشی از اطلاعات نادرست ممکن است باعث
                    تأخیر یا رد سفارش شود. تمام مراحل بررسی، تأیید و خرید سفارش به صورت دقیق ثبت و نگهداری می‌شود و
                    اطلاعات ثبت شده مرجع نهایی محسوب می‌شود.
                  </p>
                </div>

                {/* Changes and Terms of Use */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">
                    تغییرات و شرایط استفاده
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    خرید اختصاصی یک سرویس ویژه است که ممکن است در هر زمان بر اساس سیاست‌های سیستم و شرایط عملیاتی
                    تغییر کند یا به صورت موقت یا دائمی غیرفعال شود. استفاده از این سرویس به معنای پذیرش کامل شرایط و
                    قوانین اعلام شده است.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
