"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FORM_STYLES } from "../../formStyles";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    code: z.string().min(1, "کد کوپن الزامی است").max(50, "کد کوپن نمی‌تواند بیشتر از 50 کاراکتر باشد"),
    type: z.enum(["percentage", "fixed"], { required_error: "نوع تخفیف الزامی است" }),
    value: z
      .string()
      .min(1, "مقدار تخفیف الزامی است")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      }, "مقدار تخفیف باید عدد مثبت باشد"),
    minPurchase: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          const num = parseFloat(val);
          return !isNaN(num) && num >= 0;
        },
        { message: "حداقل خرید باید عدد مثبت باشد" }
      ),
    maxDiscount: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          const num = parseFloat(val);
          return !isNaN(num) && num >= 0;
        },
        { message: "حداکثر تخفیف باید عدد مثبت باشد" }
      ),
    usageLimit: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          const num = parseInt(val, 10);
          return !isNaN(num) && num > 0;
        },
        { message: "محدودیت استفاده باید عدد صحیح مثبت باشد" }
      ),
    startDate: z.string().min(1, "تاریخ شروع الزامی است"),
    endDate: z.string().min(1, "تاریخ پایان الزامی است"),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    { message: "تاریخ پایان باید بعد از تاریخ شروع باشد", path: ["endDate"] }
  );

const DISCOUNT_TYPE_OPTIONS = [
  { value: "percentage", label: "درصدی (%)" },
  { value: "fixed", label: "مقدار ثابت (تومان)" },
];

export default function DiscountForm({ onSubmit, loading = false }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      type: "percentage",
      value: "",
      minPurchase: "",
      maxDiscount: "",
      usageLimit: "",
      startDate: "",
      endDate: "",
    },
  });

  const discountType = form.watch("type");

  const submitHandler = async (data) => {
    try {
      // تبدیل رشته‌ها به عدد
      const formData = {
        code: data.code.trim().toUpperCase(),
        type: data.type === "percentage" ? 0 : 1, // 0 = percentage, 1 = fixed
        value: parseFloat(data.value),
        minPurchase: data.minPurchase ? parseFloat(data.minPurchase) : null,
        maxDiscount: data.maxDiscount ? parseFloat(data.maxDiscount) : null,
        usageLimit: data.usageLimit ? parseInt(data.usageLimit, 10) : null,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      await onSubmit(formData);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <Card className={FORM_STYLES.card}>
      <CardHeader>
        <CardTitle className={FORM_STYLES.cardTitle}>اطلاعات کوپن تخفیف</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6" dir="rtl">
            {/* کد کوپن */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={FORM_STYLES.label}>
                    کد کوپن <span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="WELCOME20" className={FORM_STYLES.input} dir="ltr" maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* نوع تخفیف و مقدار */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_STYLES.label}>
                      نوع تخفیف <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={FORM_STYLES.selectTrigger}>
                          <SelectValue placeholder="انتخاب نوع تخفیف" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={FORM_STYLES.selectContent}>
                        {DISCOUNT_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value} className={FORM_STYLES.selectItem}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_STYLES.label}>
                      مقدار تخفیف <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder={discountType === "percentage" ? "20" : "50000"}
                        className={FORM_STYLES.input}
                        min="0"
                        step={discountType === "percentage" ? "1" : "1000"}
                        dir="ltr"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* حداقل خرید و حداکثر تخفیف */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minPurchase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_STYLES.label}>حداقل خرید (تومان)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="100000"
                        className={FORM_STYLES.input}
                        min="0"
                        step="1000"
                        dir="ltr"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_STYLES.label}>حداکثر تخفیف (تومان)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="500000"
                        className={FORM_STYLES.input}
                        min="0"
                        step="1000"
                        dir="ltr"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* محدودیت استفاده */}
            <FormField
              control={form.control}
              name="usageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={FORM_STYLES.label}>محدودیت استفاده (تعداد)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="100"
                      className={FORM_STYLES.input}
                      min="1"
                      step="1"
                      dir="ltr"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* تاریخ شروع و پایان */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_STYLES.label}>
                      تاریخ شروع <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className={FORM_STYLES.input} dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={FORM_STYLES.label}>
                      تاریخ پایان <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className={FORM_STYLES.input} dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* دکمه‌های عملیات */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 min-w-32">
                {loading ? "در حال ذخیره..." : "ایجاد کوپن"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}












