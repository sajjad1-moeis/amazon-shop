"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ReturnReasonForm from "./ReturnReasonForm";
import FileUploadSection from "./FileUploadSection";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MessageText } from "iconsax-reactjs";
import Link from "next/link";
import OrderProductSelector from "./OrderProductSelector";
import OrderFilters from "./OrderFilters";
import { mockOrders } from "@/data";

export default function NewReturnRequest() {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    packagingStatus: "",
    returnReason: "",
    description: "",
    images: [],
    invoice: null,
    termsAccepted: false,
  });

  // Handle selection from OrderProductSelector

  const handleItemSelect = ({ orderId, productId }) => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setSelectedProductId(productId);

      setFormData({
        packagingStatus: "",
        returnReason: "",
        description: "",
        images: [],
        invoice: null,
        termsAccepted: false,
      });
    }
  };

  // Prepare selectedItem for OrderProductSelector
  const selectedItem =
    selectedOrder && selectedProductId ? { orderId: selectedOrder.id, productId: selectedProductId } : null;

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if order is selected
    if (!selectedOrder) {
      toast.error("لطفاً یک سفارش انتخاب کنید");
      return;
    }

    // Validation: Check if order has items
    if (!selectedOrder?.items || selectedOrder.items.length === 0) {
      toast.error("این سفارش محصولی ندارد");
      return;
    }

    // Validation: Check if product is selected
    if (!selectedProductId) {
      toast.error("لطفاً یک کالا برای مرجوعی انتخاب کنید");
      return;
    }

    // Validation: Check if selected product exists in order
    const selectedProduct = selectedOrder.items.find((item) => item.id === selectedProductId);
    if (!selectedProduct) {
      toast.error("کالای انتخاب شده در این سفارش یافت نشد");
      return;
    }

    // Validation: Check required fields
    if (!formData.packagingStatus) {
      toast.error("لطفاً وضعیت بسته بندی را انتخاب کنید");
      return;
    }

    if (!formData.returnReason) {
      toast.error("لطفاً علت مرجوعی را انتخاب کنید");
      return;
    }

    // Validation: Check terms acceptance
    if (!formData.termsAccepted) {
      toast.error("لطفاً شرایط مرجوعی را تایید کنید");
      return;
    }

    try {
      // Prepare submission data
      const submissionData = {
        orderId: selectedOrder.id,
        productId: selectedProductId,
        product: selectedProduct,
        packagingStatus: formData.packagingStatus,
        returnReason: formData.returnReason,
        description: formData.description,
        images: formData.images,
        invoice: formData.invoice,
        submittedAt: new Date().toISOString(),
      };

      // TODO: Replace with actual API call
      // await submitReturnRequest(submissionData);

      toast.success("درخواست مرجوعی با موفقیت ثبت شد");

      // Navigate to return requests list after a short delay
      setTimeout(() => {
        router.push("/dashboard/return-requests");
      }, 1000);
    } catch (error) {
      toast.error("خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.");
      console.error("Error submitting return request:", error);
    }
  };

  return (
    <div dir="rtl">
      <PageHeader
        title="ثبت درخواست مرجوعی جدید"
        description="برای ثبت درخواست مرجوعی سفارش خود اطلاعات زیر را تکمیل کنید"
      />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Main Card */}
        <div>
          {/* Order Selector */}
          <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
            <OrderFilters orders={mockOrders} selectedItem={selectedItem} onSelect={handleItemSelect} />
            <OrderProductSelector orders={mockOrders} selectedItem={selectedItem} onSelect={handleItemSelect} />
          </div>

          {/* Reason & Files Sections */}
          {selectedProductId && (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ReturnReasonForm formData={formData} onFormChange={handleFormChange} />
              <FileUploadSection
                images={formData.images}
                invoice={formData.invoice}
                onImagesChange={(images) => handleFormChange("images", images)}
                onInvoiceChange={(invoice) => handleFormChange("invoice", invoice)}
              />
            </div>
          )}

          {/* Terms & Support */}
          {selectedProductId && (
            <div className="mt-4 pt-4 flex-between">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleFormChange("termsAccepted", checked)}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-700 dark:text-dark-text cursor-pointer leading-relaxed"
                >
                  اطلاعات وارد شده صحیح است و <span className="text-yellow-500">شرایط مرجوعی</span> را مطالعه کرده‌ام.
                </Label>
              </div>

              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-gray-600 dark:text-dark-text">نیاز به بررسی فوری دارید ؟</span>
                <Link href="/dashboard/support">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg flex items-center gap-2 text-primary-700 border-primary-700 bg-transparent border-2 hover:bg-primary-50 dark:border-primary-300 dark:text-primary-300 dark:bg-transparent dark:hover:bg-primary-900/20"
                  >
                    <MessageText size={16} />
                    گفت‌وگو با پشتیبان
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sticky Actions */}
        {selectedProductId && (
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/dashboard/return-requests")}
              className="md:w-48 h-11 bg-gray-200 dark:bg-dark-field"
            >
              انصراف
            </Button>
            <Button type="submit" className=" h-11 bg-yellow-500 text-gray-800 hover:bg-yellow-600  text-sm ">
              ثبت درخواست مرجوعی
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
