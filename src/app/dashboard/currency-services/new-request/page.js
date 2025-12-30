"use client";

import { useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import CurrencyPaymentForm from "@/template/CurrencyServices/CurrencyPayment";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ServiceTypeButtons from "@/template/Dashboard/CurrencyServices/ServiceTypeButtons";

export default function NewCurrencyRequestPage() {
  const [selectedServiceType, setSelectedServiceType] = useState("payment");

  return (
    <DashboardLayout>
      <div dir="rtl">
        <PageHeader
          title="ثبت درخواست ارزی جدید"
          description="اطلاعات مورد نیاز را وارد کنید تا درخواست شما بررسی و پردازش شود"
        />

        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box  mt-8">
          <h3 className="text-lg md:text-xl  text-gray-900 p-4  dark:text-white mb-6">فرم ثبت سفارش</h3>

          {/* Service Type Buttons */}

          <div className="mb-6 p-4">
            <ServiceTypeButtons selectedType={selectedServiceType} onTypeChange={setSelectedServiceType} />
          </div>

          <CurrencyPaymentForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
