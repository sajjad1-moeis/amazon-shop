"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ReturnReasonForm from "../ReturnReasonForm";
import FileUploadSection from "../FileUploadSection";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import OrderSelectorSection from "./OrderSelectorSection";
import TermsAndSupportSection from "./TermsAndSupportSection";
import BottomActions from "./BottomActions";
import ReturnRequestsFilter from "../ReturnRequestsFilter";
import { orderService } from "@/services/order/orderService";
import { returnRequestService } from "@/services/returnRequest/returnRequestService";
import { useAuth } from "@/contexts/AuthContext";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

function mapOrderForSelector(apiOrder) {
  const items = apiOrder.items ?? apiOrder.orderItems ?? apiOrder.products ?? [];
  return {
    id: apiOrder.id ?? apiOrder.orderId,
    orderNumber: apiOrder.orderNumber ?? apiOrder.id,
    items: items.map((item, idx) => ({
      id: item.id ?? item.orderItemId ?? item.productId ?? idx,
      productId: item.productId ?? item.id,
      productName: item.productName ?? item.title ?? item.name ?? "محصول",
      quantity: item.quantity ?? item.count ?? 1,
    })),
  };
}

export default function NewReturnRequest() {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    packagingStatus: "",
    returnReason: "",
    description: "",
    images: [],
    invoice: null,
    termsAccepted: false,
  });

  useEffect(() => {
    if (userId == null) {
      setOrdersLoading(false);
      return;
    }
    orderService
      .getUserOrders(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        const list = Array.isArray(data?.orders) ? data.orders : Array.isArray(data) ? data : [];
        setOrders(list.map(mapOrderForSelector).filter((o) => o.items?.length > 0));
      })
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [userId]);

  const handleItemSelect = ({ orderId, productId }) => {
    const order = orders.find((o) => o.id === orderId || String(o.id) === String(orderId));
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
      setSubmitting(true);
      const files = [...(formData.images ?? []), formData.invoice].filter(Boolean);
      await returnRequestService.create(
        {
          userId,
          orderId: selectedOrder.id,
          orderItemId: selectedProductId,
          description: [formData.returnReason, formData.description].filter(Boolean).join(" — ") || "مرجوعی",
        },
        files
      );
      toast.success("درخواست مرجوعی با موفقیت ثبت شد");
      router.push("/dashboard/return-requests");
    } catch (error) {
      toast.error(error?.message ?? "خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    category: "",
    searchQuery: "",
  });

  const handleFiltersChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value === "all" ? "" : value }));
  };

  if (userId == null) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای ثبت درخواست مرجوعی وارد شوید.</div>
    );
  }

  return (
    <div dir="rtl">
      <PageHeader
        title="ثبت درخواست مرجوعی جدید"
        description="برای ثبت درخواست مرجوعی سفارش خود اطلاعات زیر را تکمیل کنید"
      />

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Main Card */}
        <div>
          {/* Order Selector */}
          <ReturnRequestsFilter filters={filters} onFiltersChange={handleFiltersChange} placeholder="جستجو در سفارش‌ها..." />

          {ordersLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <OrderSelectorSection orders={orders} selectedItem={selectedItem} onSelect={handleItemSelect} />
          )}

          {/* Reason & Files Sections */}
          {selectedProductId && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <TermsAndSupportSection
              termsAccepted={formData.termsAccepted}
              onTermsChange={(checked) => handleFormChange("termsAccepted", checked)}
            />
          )}
        </div>

        {/* Bottom Sticky Actions */}
        {selectedProductId && <BottomActions disabled={submitting} />}
      </form>
    </div>
  );
}
