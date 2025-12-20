"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import DiscountForm from "@/template/Admin/discounts/create/DiscountForm";
import { discountService } from "@/services/discount/discountService";
import { FORM_STYLES } from "@/template/Admin/formStyles";

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">ایجاد کوپن تخفیف جدید</h1>
          <p className="text-gray-400">اطلاعات کوپن تخفیف جدید را وارد کنید</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/discounts/list")}
          className={FORM_STYLES.button}
        >
          <ArrowRight size={18} className="ml-2" />
          بازگشت به لیست
        </Button>
      </div>

      {/* Form */}
      <DiscountForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
