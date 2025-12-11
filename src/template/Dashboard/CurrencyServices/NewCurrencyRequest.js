"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Global, CardPos, MoneyRecive, Gift, DollarCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const serviceTypes = [
  { id: "payment", label: "پرداخت ارزی", icon: Global },
  { id: "credit", label: "صدور کردیت کارت", icon: CardPos },
  { id: "paypal", label: "پی پال", icon: CardPos },
  { id: "swift", label: "سوئیفت", icon: MoneyRecive },
  { id: "gift", label: "گیفت کارت", icon: Gift },
  { id: "other", label: "خدمات دیگر", icon: DollarCircle },
];

const currencies = [
  { code: "USD", name: "دلار آمریکا", flag: "🇺🇸", rate: 114350 },
  { code: "EUR", name: "یورو", flag: "🇪🇺", rate: 125000 },
  { code: "GBP", name: "پوند", flag: "🇬🇧", rate: 145000 },
  { code: "AED", name: "درهم", flag: "🇦🇪", rate: 31200 },
];

const services = [
  { id: "service1", label: "خدمت ۱" },
  { id: "service2", label: "خدمت ۲" },
  { id: "service3", label: "خدمت ۳" },
];

export default function NewCurrencyRequest() {
  const [selectedServiceType, setSelectedServiceType] = useState("payment");
  const [selectedService, setSelectedService] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("");

  const currentCurrency = currencies.find((c) => c.code === selectedCurrency);
  const totalAmount = amount ? (parseFloat(amount) * (currentCurrency?.rate || 0)).toLocaleString("fa-IR") : "۰";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !amount) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      return;
    }
    toast.success("درخواست با موفقیت ثبت شد");
  };

  return (
    <>
      <PageHeader
        title="ثبت درخواست ارزی جدید"
        description="اطلاعات مورد نیاز را وارد کنید تا درخواست شما بررسی و پردازش شود"
      />

      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">فرم ثبت سفارش</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type Selector */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {serviceTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedServiceType(type.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all",
                      selectedServiceType === type.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    )}
                  >
                    <Icon size={20} variant={selectedServiceType === type.id ? "Bold" : "Outline"} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="service" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              خدمات
            </Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger id="service" className="w-full" dir="rtl">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Section */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">مبلغ</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Currency Rate Display & Selector */}
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {currentCurrency?.rate.toLocaleString("fa-IR")} تومان : ۱ {selectedCurrency}
                  </p>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="w-full" dir="rtl">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span>{currentCurrency?.flag}</span>
                          <span>{selectedCurrency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="مبلغ را وارد کنید"
                  className="w-full"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              توضیحات
            </Label>
            <Textarea
              id="description"
              placeholder="اگر توضیحاتی نیاز هست وارد کنید..."
              rows={4}
              className="w-full resize-none"
              dir="rtl"
            />
          </div>

          {/* Payable Amount */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">مبلغ قابل پرداخت</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {totalAmount} تومان
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white h-12 text-base font-medium"
          >
            پرداخت
          </Button>
        </form>
      </div>
    </>
  );
}
