"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "iconsax-reactjs";
import PriceLockCard from "./PriceLockCard";
import HistoryFilter from "./HistoryFilter";
import HistoryTable from "./HistoryTable";
import NewPriceLockModal from "./NewPriceLockModal";

const initialLocks = [
  {
    id: 1,
    productName: "Apple AirPods Pro (2nd Generation)",
    productImage: "/image/Home/product.png",
    status: "active",
    lockedPrice: "۲۷,۴۵۰,۰۰۰",
    downPayment: "۳,۵۰۰,۰۰۰",
    timeRemaining: "۵ ساعت و ۲۱ دقیقه",
    countdown: "۰۲:۲۴:۱۲",
  },
  {
    id: 2,
    productName: "Apple AirPods Pro (2nd Generation)",
    productImage: "/image/Home/product.png",
    status: "active",
    lockedPrice: "۲۷,۴۵۰,۰۰۰",
    downPayment: "۳,۵۰۰,۰۰۰",
    timeRemaining: "۵ ساعت و ۲۱ دقیقه",
    countdown: "۰۲:۲۴:۱۲",
  },
];

const historyLocks = [
  {
    id: 1,
    productName: "کنترلر پلی استیشن ۵ -...",
    productImage: "/image/Home/product.png",
    lockedPrice: "۱۲,۳۵۰,۰۰۰",
    creationDate: "۱۴۰۳/۱۰/۲۱",
    endDate: "۱۴۰۳/۱۰/۲۱",
    status: "active",
  },
  {
    id: 2,
    productName: "کنترلر پلی استیشن ۵ -...",
    productImage: "/image/Home/product.png",
    lockedPrice: "۱۲,۳۵۰,۰۰۰",
    creationDate: "۱۴۰۳/۱۰/۲۱",
    endDate: "۱۴۰۳/۱۰/۲۱",
    status: "inactive",
  },
];

export default function PriceLockList() {
  const [activeTab, setActiveTab] = useState("active");
  const [isNewLockModalOpen, setIsNewLockModalOpen] = useState(false);
  const [historyFilters, setHistoryFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
  });

  const handleNewLock = () => {
    setIsNewLockModalOpen(true);
  };

  const handleSubmitNewLock = (data) => {
    // Handle new price lock submission
    console.log("New price lock data:", data);
    // Add to initialLocks or call API
  };

  return (
    <div dir="rtl">
      {/* Header Section */}
      <PageHeader
        title="قفل قیمت"
        description="قیمت برخی محصولات را برای مدت محدود ثابت نگه دارید"
      >
        <Button
          onClick={handleNewLock}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-dark-title font-medium gap-2"
        >
          <Lock size={20} />
          قفل قیمت جدید
        </Button>
      </PageHeader>

      {/* Tabs Section */}
      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl" className="w-full rounded-xl overflow-hidden">
          <TabsList className="bg-white dark:bg-dark-box dark:bg-dark-box shadow w-full justify-between overflow-auto flex-none lg:overflow-hidden h-full rounded-xl p-0 flex flex-nowrap lg:grid grid-cols-3">
            <TabsTrigger
              value="rules"
              className="data-[state=active]:bg-primary-50 data-[state=active]:border-b-2 dark:data-[state=active]:border-dark-title border-primary-500 !w-full data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title dark:data-[state=active]:bg-white dark:bg-dark-box/10 dark:text-dark-text text-gray-500 dark:text-dark-text px-5 py-3 rounded-none transition"
            >
              قوانین و راهنما
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-primary-50 data-[state=active]:border-b-2 dark:data-[state=active]:border-dark-title border-primary-500 !w-full data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title dark:data-[state=active]:bg-white dark:bg-dark-box/10 dark:text-dark-text text-gray-500 dark:text-dark-text px-5 py-3 rounded-none transition"
            >
              تاریخچه
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-primary-50 data-[state=active]:border-b-2 dark:data-[state=active]:border-dark-title border-primary-500 !w-full data-[state=active]:text-primary-600 dark:data-[state=active]:text-dark-title dark:data-[state=active]:bg-white dark:bg-dark-box/10 dark:text-dark-text text-gray-500 dark:text-dark-text px-5 py-3 rounded-none transition"
            >
              قفل های فعال
            </TabsTrigger>
          </TabsList>

          {/* Active Locks Tab */}
          <TabsContent value="active" className="mt-6 space-y-4">
            {initialLocks.length === 0 ? (
              <div className="bg-white dark:bg-dark-box dark:bg-dark-box rounded-2xl shadow-sm p-8 text-center">
                <p className="text-gray-500 dark:text-dark-text dark:text-dark-text">هیچ قفل قیمت فعالی وجود ندارد</p>
              </div>
            ) : (
              initialLocks.map((lock) => (
                <PriceLockCard
                  key={lock.id}
                  lock={lock}
                  onCancelLock={(id) => {
                    // Handle cancel lock
                    console.log("Cancel lock:", id);
                  }}
                />
              ))
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6 space-y-4">
            <div className="bg-white dark:bg-dark-box dark:bg-dark-box rounded-2xl shadow-sm p-3">
              {/* Header with Title and Count */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-lg text-gray-900 dark:text-dark-title dark:text-dark-title">لیست اعلانها</h2>
                <div className="text-sm text-gray-700 dark:text-dark-text">
                  تعداد کل : <span className="font-semibold text-yellow-600 dark:text-yellow-400">{historyLocks.length} عدد</span>
                </div>
              </div>

              {/* Filters */}
              <HistoryFilter filters={historyFilters} onFiltersChange={setHistoryFilters} />

              {/* Table */}
              <div className="mt-6">
                <HistoryTable locks={historyLocks} />
              </div>
            </div>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="mt-6 space-y-4">
            <div className="bg-white dark:bg-dark-box dark:bg-dark-box rounded-2xl shadow-sm p-6">
              <div className="space-y-6">
                {/* What is Price Lock? */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">قفل قیمت چیست؟</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    قفل قیمت به شما اجازه میدهد قیمت یک محصول را برای مدت محدود ثابت نگه دارید و از نوسانات قیمت در امان بمانید.
                  </p>
                </div>

                {/* Terms of Use */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">شرایط استفاده</h3>
                  <ul className="space-y-1.5 text-sm text-gray-600 dark:text-dark-text list-disc list-inside pr-4">
                    <li>فقط کاربران طلایی</li>
                    <li>حداکثر قفل همزمان: ۳ محصول</li>
                    <li>مدت قفل: حداکثر ۲۴ ساعت</li>
                  </ul>
                </div>

                {/* Lock Fee */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">هزینه قفل</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    برای فعال سازی قفل قیمت، مبلغی به عنوان پیش پرداخت دریافت میشود که در صورت خرید نهایی از مبلغ کل کسر خواهد شد.
                  </p>
                </div>

                {/* Non-Lockable Products */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-dark-title dark:text-dark-title mb-2">محصولات غیر قابل قفل</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
                    برخی محصولات پرنوسان یا محدود امکان قفل قیمت ندارند.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Price Lock Modal */}
      <NewPriceLockModal
        open={isNewLockModalOpen}
        onOpenChange={setIsNewLockModalOpen}
        onSubmit={handleSubmitNewLock}
      />
    </div>
  );
}

