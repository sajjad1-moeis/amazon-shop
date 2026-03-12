"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { TicketDiscount, ArrowRight } from "iconsax-reactjs";
import DiscountForm from "@/template/Admin/discounts/create/DiscountForm";
import { discountService } from "@/services/discount/discountService";
import { AdminPageHeader } from "@/components/admin";
import { Spinner } from "@/components/ui/spinner";

function mapApiToFormData(api) {
  if (!api) return null;
  const startDate = api.startDate
    ? (api.startDate.includes("T") ? api.startDate.slice(0, 10) : api.startDate)
    : "";
  const endDate = api.endDate
    ? (api.endDate.includes("T") ? api.endDate.slice(0, 10) : api.endDate)
    : "";
  return {
    code: api.code ?? "",
    type: (api.discountType ?? api.type) === 2 ? "fixed" : "percentage",
    value: String(api.discountValue ?? api.value ?? ""),
    minPurchase: api.minPurchaseAmount != null ? String(api.minPurchaseAmount) : api.minPurchase != null ? String(api.minPurchase) : "",
    maxDiscount: api.maxDiscountAmount != null ? String(api.maxDiscountAmount) : api.maxDiscount != null ? String(api.maxDiscount) : "",
    usageLimit: api.usageLimit != null ? String(api.usageLimit) : "",
    startDate,
    endDate,
  };
}

export default function EditDiscountPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchDiscount = async () => {
      try {
        setFetching(true);
        const response = await discountService.getDiscountCodeById(id);
        const data = response?.data ?? response;
        if (data) {
          setInitialData(mapApiToFormData(data));
        } else {
          toast.error("کوپن تخفیف یافت نشد");
        }
      } catch (error) {
        toast.error(error?.message || "خطا در دریافت اطلاعات کوپن");
        console.error("Error fetching discount:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchDiscount();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const typeValue = formData.type === "percentage" ? 1 : 2;
      const payload = {
        code: formData.code.trim().toUpperCase(),
        type: typeValue,
        value: parseFloat(formData.value),
        startDate: new Date(formData.startDate + "T00:00:00").toISOString(),
        endDate: new Date(formData.endDate + "T23:59:59").toISOString(),
      };
      if (formData.minPurchase?.trim()) payload.minPurchase = parseFloat(formData.minPurchase);
      if (formData.maxDiscount?.trim()) payload.maxDiscount = parseFloat(formData.maxDiscount);
      if (formData.usageLimit?.trim()) payload.usageLimit = parseInt(formData.usageLimit, 10);

      const response = await discountService.updateDiscountCode(id, payload);

      if (response?.success !== false) {
        toast.success("کوپن تخفیف با موفقیت به‌روزرسانی شد");
        router.push("/admin/discounts/list");
      } else {
        toast.error(response?.message || "خطا در به‌روزرسانی کوپن");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در به‌روزرسانی کوپن تخفیف";
      toast.error(errorMessage);
      console.error("Error updating discount:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
        <AdminPageHeader title="ویرایش کوپن تخفیف" subtitle="در حال بارگذاری..." icon={TicketDiscount} />
        <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3 rounded-2xl border border-gray-700/60 bg-gray-800/40">
          <Spinner size="lg" />
          <span>در حال بارگذاری اطلاعات کوپن...</span>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
        <AdminPageHeader title="ویرایش کوپن تخفیف" subtitle="کوپن یافت نشد" icon={TicketDiscount} />
        <div className="p-8 text-center text-gray-400">کوپن تخفیف یافت نشد.</div>
        <Link
          href="/admin/discounts/list"
          className="text-sm text-gray-500 hover:text-gray-300 inline-flex items-center gap-1.5"
        >
          <ArrowRight size={16} />
          بازگشت به لیست
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
      <AdminPageHeader
        title="ویرایش کوپن تخفیف"
        subtitle="تغییر اطلاعات کد تخفیف"
        icon={TicketDiscount}
        actions={
          <Link
            href="/admin/discounts/list"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowRight size={16} />
            <span className="max-md:hidden">بازگشت به لیست</span>
          </Link>
        }
      />

      <DiscountForm
        onSubmit={handleSubmit}
        loading={loading}
        initialData={initialData}
        isEdit
        submitLabel="ذخیره تغییرات"
      />
    </div>
  );
}
