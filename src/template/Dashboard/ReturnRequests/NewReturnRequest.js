"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import OrderSelector from "./OrderSelector";
import OrderItemsList from "./OrderItemsList";
import ReturnReasonForm from "./ReturnReasonForm";
import FileUploadSection from "./FileUploadSection";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MessageText } from "iconsax-reactjs";
import Link from "next/link";

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

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setSelectedProductId(null);
  };

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedOrder) {
      toast.error("لطفاً یک سفارش انتخاب کنید");
      return;
    }

    if (!selectedProductId) {
      toast.error("لطفاً یک کالا برای مرجوعی انتخاب کنید");
      return;
    }

    if (!formData.packagingStatus || !formData.returnReason) {
      toast.error("لطفاً علت مرجوعی را تکمیل کنید");
      return;
    }

    if (!formData.termsAccepted) {
      toast.error("لطفاً شرایط مرجوعی را تایید کنید");
      return;
    }

    toast.success("درخواست مرجوعی با موفقیت ثبت شد");
    router.push("/dashboard/return-requests");
  };

  return (
    <>
      <PageHeader
        title="ثبت درخواست مرجوعی جدید"
        description="برای ثبت درخواست مرجوعی سفارش خود اطلاعات زیر را تکمیل کنید"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Selector */}
        <OrderSelector
          selectedOrder={selectedOrder}
          onOrderSelect={handleOrderSelect}
        />

        {/* Order Items List */}
        {selectedOrder && (
          <OrderItemsList
            order={selectedOrder}
            selectedProductId={selectedProductId}
            onProductSelect={handleProductSelect}
          />
        )}

        {/* Return Reason Form */}
        {selectedProductId && (
          <ReturnReasonForm
            formData={formData}
            onFormChange={handleFormChange}
          />
        )}

        {/* File Upload Section */}
        {selectedProductId && (
          <FileUploadSection
            images={formData.images}
            invoice={formData.invoice}
            onImagesChange={(images) => handleFormChange("images", images)}
            onInvoiceChange={(invoice) => handleFormChange("invoice", invoice)}
          />
        )}

        {/* Terms and Submit Section */}
        {selectedProductId && (
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
            style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
          >
            <div className="space-y-4">
              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleFormChange("termsAccepted", checked)}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer leading-relaxed"
                >
                  اطلاعات وارد شده صحیح است و شرایط مرجوعی را مطالعه کرده ام.
                </Label>
              </div>

              {/* Urgent Review Link */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">نیاز به بررسی فوری دارید ؟</span>
                <Link href="/dashboard/support">
                  <Button
                    type="button"
                    variant="link"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto gap-2"
                  >
                    <MessageText size={16} />
                    گفت و گو با پشتیبان
                  </Button>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/return-requests")}
                  className="flex-1"
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  ثبت درخواست مرجوعی
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

