"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DiscountShape, DocumentText, DocumentUpload, Tag } from "iconsax-reactjs";

const formSchema = z.object({
  details: z.string().min(1, { message: "لطفاً جزئیات را انتخاب کنید." }),
  amount: z.string().min(1, { message: "لطفاً مبلغ را وارد کنید." }),
  description: z.string().optional(),
});

const countries = [
  { value: "usa", label: "آمریکا", flag: "🇺🇸" },
  { value: "uk", label: "انگلستان", flag: "🇬🇧" },
  { value: "canada", label: "کانادا", flag: "🇨🇦" },
];

export default function PlayStationGiftCardForm() {
  const [amount, setAmount] = useState("");
  const exchangeRate = 114350;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "usa",
      amount: "",
      description: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const calculateTotal = () => {
    if (amount && !isNaN(parseFloat(amount))) {
      return (parseFloat(amount) * exchangeRate).toLocaleString("fa-IR");
    }
    // مقدار پیش‌فرض طبق عکس
    return "۱۲,۴۵۰,۰۰۰";
  };

  const selectedCountry = countries.find((c) => c.value === form.watch("details")) || countries[0];

  return (
    <div className="flex items-start justify-center">
      <div className="w-full bg-white dark:bg-dark-box rounded-2xl shadow-xl p-4">
        {/* Exchange Rate Badge */}
        <div className="mb-2 flex-between">
          <p className="text-gray-800 dark:text-dark-titre">جزئیات</p>
          <div className="inline-flex items-center bg-[#B3B3FF3D] text-primary-400 max-md:text-xs dark:text-dark-title p-1 rounded text-sm font-medium">
            {exchangeRate.toLocaleString("fa-IR")} تومان = ۱ USD
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Details Select */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-dark-field  border-2 border-gray-200 dark:border-dark-stroke rounded-xl text-right">
                        <SelectValue>
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-lg">{selectedCountry.flag}</span>
                            <span>{selectedCountry.label}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            <div className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Input */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-dark-titre mb-2 block">
                    مبلغ
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="مبلغ را وارد کنید"
                      className="h-12 bg-gray-50 dark:bg-dark-field  border-2 border-gray-200 dark:border-dark-stroke rounded-xl text-right"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setAmount(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Textarea */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900 dark:text-dark-titre mb-2 block">
                    توضیحات
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اگر توضیحاتی نیاز هست وارد کنید....."
                      className="min-h-[120px] bg-gray-50 dark:bg-dark-field border-2 border-gray-200 dark:border-dark-stroke rounded-xl text-right resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload Link */}
            <button
              type="button"
              className="flex max-md:flex-col md:items-center gap-1 md:gap-2 max-md:text-sm text-gray-700 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            >
              <div className="flex items-center justify-start gap-1">
                <DocumentUpload variant="Bold" className="text-primary-400 dark:text-dark-title" size={18} />
                <span className="dark:text-dark-titre">افزودن فایل</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">(فایلهای مجاز ZIP, JPG, PNG تا ۱۰ مگابایت)</p>
            </button>

            {/* Discount Code Link */}
            <button
              type="button"
              className="flex items-center gap-2  text-gray-700 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            >
              <DiscountShape variant="Bold" className="text-primary-400 dark:text-dark-title" size={18} />
              <span className="dark:text-dark-titre">افزودن کد تخفیف</span>
            </button>

            {/* Total Payable Amount */}
            <div className="flex items-center justify-between pt-4 dark:border-dark-stroke">
              <span className="text-base font-medium text-gray-500 dark:text-gray-400">مبلغ قابل پرداخت</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                {calculateTotal()} تومان
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-yellow-400 text-primary-800 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600  px-8 py-2 rounded-xl"
            >
              خرید گیفت کارت پلی استیشن
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
