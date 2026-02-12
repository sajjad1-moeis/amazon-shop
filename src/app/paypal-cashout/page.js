"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HeadphonesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, { message: "لطفاً نام کامل خود را وارد کنید." }),
  mobile: z
    .string()
    .min(1, { message: "لطفاً شماره موبایل خود را وارد کنید." })
    .regex(/^09\d{9}$/, { message: "شماره موبایل باید با 09 شروع شود و 11 رقم باشد." }),
});

export default function PayPalCashoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", values);
      toast.success("درخواست شما با موفقیت ثبت شد");
      form.reset();
    } catch (error) {
      toast.error("خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-[url(/image/paypal/paypal-cashout-bg.jpg)] flex flex-col"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/image/logo.png" alt="میکرولس" width={120} height={40} className="h-8 md:h-10 w-auto" />
          </Link>
          <Link
            href="/contact-us"
            className="flex items-center gap-2 text-primary-200 hover:text-white border-primary-200 border p-2 rounded-lg transition-colors"
          >
            <HeadphonesIcon className="h-5 w-5" />
            <span className=" text-xs md:text-sm font-medium">تماس با پشتیبانی</span>
          </Link>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 pb-12">
        <div className="w-full max-w-2xl relative">
          {/* Hand Image - Overlapping form */}
          <div className="flex justify-center ">
            <Image
              src="/image/paypal/hand.png"
              alt="PayPal Cashout"
              width={300}
              height={200}
              className="w-2/3 h-auto max-w-full object-contain"
              priority
            />
          </div>

          {/* Form Container */}
          <div className="bg-white/15 relative  -mt-10 md:-mt-16 dark:bg-dark-box/95 backdrop-blur-md rounded-2xl p-4 md:p-8 shadow-xl  z-50">
            <h2 className="text-2xl md:text-3xl  text-white mb-3 text-center">درخواست نقد کردن</h2>
            <p className=" md:text-sm text-xs text-dark-titre dark:text-gray-400 text-center mb-8">
              موجودی PayPal خود را در کوتاه‌ترین زمان به ریال دریافت کنید. تسویه امن و نرخ شفاف
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-white">نام</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="نام کامل خود را وارد کنید"
                          className="h-12 bg-[#F9FAFB29] dark:bg-dark-field border-2 border-[#E5E7EB52] placeholder:text-gray-300 placeholder:max-md:text-xs dark:border-dark-stroke rounded-xl text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-white">شماره موبایل</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="مثلاً ۰۹۱۳۰۰۰..."
                          className="h-12 bg-[#F9FAFB29] dark:bg-dark-field border-2 border-[#E5E7EB52] placeholder:text-gray-300 placeholder:max-md:text-xs dark:border-dark-stroke rounded-xl text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 text-base md:text-lg rounded-xl"
                >
                  {isSubmitting ? "در حال ثبت..." : "ثبت درخواست"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
