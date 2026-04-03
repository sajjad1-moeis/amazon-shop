"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FORM_STYLES } from "../../formStyles";
import { cn } from "@/lib/utils";
import { resolveApiMediaUrl } from "@/services/api/client";

/** فیلدهای ویرایش ادمین — بدون الگوی سخت ۰۹۱؛ بک‌اند [Phone] اعتبارسنجی می‌کند */
const ADMIN_USER_FIELDS = [
  { name: "firstName", label: "نام", required: false, maxLength: 50 },
  { name: "lastName", label: "نام خانوادگی", required: false, maxLength: 50 },
  { name: "email", label: "ایمیل", type: "email", required: false },
  {
    name: "phoneNumber",
    label: "شماره تماس",
    required: false,
    maxLength: 20,
  },
];

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

function isPlaceholderEmail(v) {
  const e = (v ?? "").toString().trim().toLowerCase();
  return !!e && e.endsWith("@placeholder.local");
}

function normalizeOptional(v) {
  const s = (v ?? "").toString().trim();
  if (!s) return null;
  if (isPlaceholderEmail(s)) return null;
  return s;
}

function buildAdminUpdatePayload(data) {
  return {
    email: normalizeOptional(data.email),
    phoneNumber: normalizeOptional(data.phoneNumber),
    firstName: normalizeOptional(data.firstName),
    lastName: normalizeOptional(data.lastName),
    profileImage: (data.profileImage ?? "").toString().trim() || null,
    isActive: Boolean(data.isActive),
    isEmailVerified: Boolean(data.isEmailVerified),
    isPhoneVerified: Boolean(data.isPhoneVerified),
  };
}

export default function EditUserForm({ user, onSubmit, onCancel }) {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);

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

  const formDefaults = useMemo(() => {
    if (!user) return DEFAULT_VALUES;

    const emailRaw = user.email ?? user.Email ?? "";
    const phoneRaw = user.phoneNumber ?? user.PhoneNumber ?? "";

    return {
      ...DEFAULT_VALUES,
      email: isPlaceholderEmail(emailRaw) ? "" : emailRaw,
      phoneNumber: phoneRaw,
      firstName: isPlaceholderEmail(user.firstName ?? user.FirstName ?? "") ? "" : (user.firstName ?? user.FirstName ?? ""),
      lastName: isPlaceholderEmail(user.lastName ?? user.LastName ?? "") ? "" : (user.lastName ?? user.LastName ?? ""),
      profileImage: user.profileImage ?? user.ProfileImage ?? "",
      isActive: Boolean(user.isActive ?? user.IsActive ?? true),
      isEmailVerified: Boolean(user.isEmailVerified ?? user.IsEmailVerified ?? false),
      isPhoneVerified: Boolean(user.isPhoneVerified ?? user.IsPhoneVerified ?? false),
    };
  }, [user]);

  useEffect(() => {
    reset(formDefaults);
    setProfileImageFile(null);
    setRemoveCurrentImage(false);
  }, [formDefaults, reset]);

  const submitHandler = async (data) => {
    await onSubmit({
      userData: buildAdminUpdatePayload(data),
      profileImageFile,
      removeProfileImage: removeCurrentImage && !profileImageFile,
    });
  };

  const currentProfileImage = user?.profileImage ?? user?.ProfileImage ?? "";
  const currentProfileImageUrl = currentProfileImage ? resolveApiMediaUrl(currentProfileImage) : "";
  const selectedPreviewUrl = useMemo(
    () => (profileImageFile ? URL.createObjectURL(profileImageFile) : ""),
    [profileImageFile]
  );
  useEffect(() => {
    return () => {
      if (selectedPreviewUrl) URL.revokeObjectURL(selectedPreviewUrl);
    };
  }, [selectedPreviewUrl]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className={cn("p-4", FORM_STYLES.card)}>
        <h2 className="text-xl font-bold text-white mb-6">اطلاعات شخصی</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADMIN_USER_FIELDS.map(({ name, label, type = "text", required, maxLength, placeholder }) => (
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
                  // فیلدهای اختیاری هستند: اگر خالی باشند، اعتبارسنجی هم رد نمی‌شود
                  validate: (val) => {
                    if (!val) return true;
                    if (typeof val === "string" && val.toString().trim() === "") return true;
                    return true;
                  },
                })}
              />

              {errors[name] && <p className="text-red-400 text-xs">{errors[name].message}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className={cn("p-4 space-y-4", FORM_STYLES.card)}>
        <h2 className="text-xl font-bold text-white">تصویر پروفایل</h2>

        {(selectedPreviewUrl || (currentProfileImageUrl && !removeCurrentImage)) && (
          <div className="rounded-xl border border-gray-700 bg-gray-900/40 p-3">
            <p className="text-xs text-gray-400 mb-2">{selectedPreviewUrl ? "پیش‌نمایش تصویر جدید" : "تصویر فعلی"}</p>
            <img
              src={selectedPreviewUrl || currentProfileImageUrl}
              alt="profile-preview"
              className="w-24 h-24 rounded-lg object-cover border border-gray-600"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="profileImageFile" className="text-gray-300">
            آپلود تصویر جدید
          </Label>
          <Input
            id="profileImageFile"
            type="file"
            accept="image/*"
            className={FORM_STYLES.input}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setProfileImageFile(file);
              if (file) setRemoveCurrentImage(false);
            }}
          />
          <p className="text-xs text-gray-500">
            با انتخاب تصویر جدید، تصویر قبلی به‌صورت خودکار جایگزین و از سرور حذف می‌شود.
          </p>
        </div>

        {currentProfileImageUrl && !profileImageFile && (
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={removeCurrentImage}
              onChange={(e) => setRemoveCurrentImage(e.target.checked)}
            />
            حذف تصویر فعلی
          </label>
        )}
      </div>

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
