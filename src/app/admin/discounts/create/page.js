"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DiscountForm from "@/template/Admin/discounts/create/DiscountForm";
import { discountService } from "@/services/discount/discountService";

export default function CreateDiscountPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await discountService.createDiscountCode(formData);

      if (response?.success) {
        toast.success("کوپن تخفیف با موفقیت ایجاد شد");
        router.push("/admin/discounts/list");
      } else {
        toast.error(response?.message || "خطا در ایجاد کوپن تخفیف");
      }
    } catch (error) {
      console.error("Error creating discount code:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در ایجاد کوپن تخفیف";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">ایجاد کوپن تخفیف جدید</h1>
        <p className="text-sm text-gray-500 mt-1">اطلاعات کوپن تخفیف جدید را وارد کنید</p>
      </header>

      <DiscountForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
