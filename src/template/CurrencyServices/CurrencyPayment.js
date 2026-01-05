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

const formSchema = z.object({
  service: z.string().min(1, { message: "لطفاً سرویس را انتخاب کنید." }),
  currency: z.string().min(1, { message: "لطفاً ارز را انتخاب کنید." }),
  amount: z.string().min(1, { message: "لطفاً مبلغ را وارد کنید." }),
  description: z.string().optional(),
});

const currencies = [
  { value: "usd", label: "USD", flag: "🇺🇸" },
  { value: "eur", label: "EUR", flag: "🇪🇺" },
  { value: "gbp", label: "GBP", flag: "🇬🇧" },
];

const services = [
  { value: "paypal", label: "PayPal" },
  { value: "amazon", label: "Amazon Pay" },
  { value: "wallet", label: "Wallet" },
  { value: "swift", label: "SWIFT" },
];

export default function CurrencyPaymentForm({ removeDesc }) {
  const [amount, setAmount] = useState("");
  const exchangeRate = 114350; // نرخ ارز

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      currency: "usd",
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
    return "۰";
  };

  const selectedCurrencyData = currencies.find((c) => c.value === form.watch("currency")) || currencies[0];

  return (
    <div className="w-full  rounded-2xl  px-4 pb-4" dir="rtl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Top Row: Services and Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services Select */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-gray-900 dark:text-white mb-2 block">خدمات</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-[51px] bg-gray-50 dark:bg-dark-field border-2 border-gray-200 dark:border-dark-stroke rounded-xl text-right">
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Section */}
            <div>
              <div className="flex-between mb-2">
                <label className="text-base text-gray-900 dark:text-white block">مبلغ</label>
                <div>
                  <div className="inline-flex items-center bg-[#B3B3FF3D] text-primary-400 dark:text-dark-title dark:border-dark-stroke px-3 py-1 rounded-lg text-xs font-medium">
                    {exchangeRate.toLocaleString("fa-IR")} تومان : USD
                  </div>
                </div>
              </div>
              {/* Exchange Rate Badge - Above Currency Select */}
              <div className="relative border-2 bg-gray-50 dark:bg-dark-field dark:border-dark-stroke border-gray-200 rounded-xl text-right">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="مبلغ را وارد کنید"
                          className="h-12 border-none rounded-xl w-3/4 p-0 px-2 bg-transparent placeholder:text-sm"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setAmount(e.target.value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="absolute top-0 left-0">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                            <SelectTrigger className="h-12  border-none outline-none  bg-transparent  border-2 border-gray-200 dark:border-gray-700 rounded-xl text-right">
                              <SelectValue>
                                <div className="flex items-center gap-2 justify-end">
                                  <span>{selectedCurrencyData.flag}</span>
                                  <span>{selectedCurrencyData.label}</span>
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                  <div className="flex items-center gap-2">
                                    <span>{currency.flag}</span>
                                    <span>{currency.label}</span>
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
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {removeDesc || (
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-gray-900 dark:text-white mb-2 block">توضیحات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اگر توضیحاتی نیاز هست وارد کنید...."
                      className="min-h-[120px] border-2 bg-gray-50 border-gray-200 placeholder:text-sm dark:bg-dark-field dark:border-dark-stroke rounded-xl text-right resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Payment Summary and Button */}
          <div className="flex-between gap-2">
            <span className="text-gray-600 dark:text-dark-text font-medium max-md:text-sm">مبلغ قابل پرداخت:</span>
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-dark-titre">
              {calculateTotal()} تومان
            </span>
          </div>
          <Button
            type="submit"
            className="w-full  bg-yellow-400 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 px-8 py-2 md:py-6 md:text-lg rounded-xl"
          >
            پرداخت
          </Button>
        </form>
      </Form>
    </div>
  );
}
