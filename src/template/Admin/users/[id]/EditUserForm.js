"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PERSONAL_FIELDS } from "@/data";
import { FORM_STYLES } from "../../formStyles";
import { cn } from "@/lib/utils";

const DEFAULT_VALUES = {
  email: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  profileImage: "",
  isActive: true,
  isEmailVerified: false,
  isPhoneVerified: false,
};

const SWITCH_FIELDS = [
  { name: "isActive", label: "وضعیت فعال" },
  { name: "isEmailVerified", label: "ایمیل تایید شده" },
  { name: "isPhoneVerified", label: "شماره تلفن تایید شده" },
];

export default function EditUserForm({ user, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!user) return;

    reset({
      ...DEFAULT_VALUES,
      ...user,
    });
  }, [user, reset]);

  const submitHandler = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className={cn("p-4", FORM_STYLES.card)}>
        <h2 className="text-xl font-bold text-white mb-6">اطلاعات شخصی</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PERSONAL_FIELDS.map(({ name, label, type = "text", required, maxLength, pattern, placeholder }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name} className="text-gray-300">
                {label}
                {required && <span className="text-red-400"> *</span>}
              </Label>

              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={FORM_STYLES.input}
                {...register(name, {
                  required: required ? "این فیلد الزامی است" : false,
                  maxLength,
                  pattern,
                })}
              />

              {errors[name] && <p className="text-red-400 text-xs">{errors[name].message}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Settings ---------- */}
      <div className={cn("p-4", FORM_STYLES.card)}>
        <h2 className="text-xl font-bold text-white mb-6">تنظیمات</h2>

        <div className="space-y-4">
          {SWITCH_FIELDS.map(({ name, label }) => (
            <div key={name} className="flex items-center justify-between">
              <Label htmlFor={name} className="text-gray-300">
                {label}
              </Label>

              <Switch
                dir="ltr"
                id={name}
                checked={watch(name)}
                onCheckedChange={(checked) => setValue(name, checked)}
                className="data-[state=checked]:bg-primary-500 dark:data-[state=checked]:bg-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Actions ---------- */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-3"
        >
          انصراف
        </Button>

        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
          {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </form>
  );
}
