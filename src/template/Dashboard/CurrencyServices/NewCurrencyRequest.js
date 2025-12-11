"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ServiceTypeSelector from "./ServiceTypeSelector";
import CurrencySelector from "./CurrencySelector";
import AmountInput from "./AmountInput";
import PaymentMethodDropdown from "./PaymentMethodDropdown";
import { toast } from "sonner";

export default function NewCurrencyRequest() {
  const [formData, setFormData] = useState({
    serviceType: "",
    currency: "",
    amount: "",
    paymentMethod: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serviceType || !formData.currency || !formData.amount || !formData.paymentMethod) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    toast.success("درخواست با موفقیت ثبت شد");
  };

  return (
    <>
      <PageHeader
        title="ثبت درخواست جدید"
        description="درخواست خرید یا فروش ارز خود را ثبت کنید"
      />

      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div>
            <Label className="mb-3 block">نوع سرویس *</Label>
            <ServiceTypeSelector
              selectedType={formData.serviceType}
              onSelect={(type) => setFormData((prev) => ({ ...prev, serviceType: type }))}
            />
          </div>

          {/* Currency */}
          <div>
            <Label className="mb-3 block">ارز *</Label>
            <CurrencySelector
              selectedCurrency={formData.currency}
              onSelect={(currency) => setFormData((prev) => ({ ...prev, currency }))}
            />
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount">مبلغ *</Label>
            <AmountInput
              value={formData.amount}
              onChange={(amount) => setFormData((prev) => ({ ...prev, amount }))}
              currency={formData.currency}
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label className="mb-3 block">روش پرداخت *</Label>
            <PaymentMethodDropdown
              selectedMethod={formData.paymentMethod}
              onSelect={(method) => setFormData((prev) => ({ ...prev, paymentMethod: method }))}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline">
              انصراف
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
              ثبت درخواست
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

