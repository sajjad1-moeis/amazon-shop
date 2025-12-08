"use client";

import { useState } from "react";
import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthToggle from "./AuthToggle";
import { fieldClassName } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function SignupView({ onGoLogin, onSuccess }) {
  const { sendRegistrationOtp, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی شماره تلفن: باید با 09 شروع شود و 11 رقم باشد
    const phoneRegex = /^09\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
      toast.error("شماره موبایل باید با 09 شروع شود و 11 رقم باشد");
      return;
    }

    // اعتبارسنجی نام
    if (!firstName || firstName.trim().length === 0) {
      toast.error("لطفاً نام خود را وارد کنید");
      return;
    }

    if (firstName.trim().length > 50) {
      toast.error("نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد");
      return;
    }

    // اعتبارسنجی نام خانوادگی
    if (!lastName || lastName.trim().length === 0) {
      toast.error("لطفاً نام خانوادگی خود را وارد کنید");
      return;
    }

    if (lastName.trim().length > 50) {
      toast.error("نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد");
      return;
    }

    // اعتبارسنجی رمز عبور
    if (!password || password.trim().length === 0) {
      toast.error("لطفاً رمز عبور را وارد کنید");
      return;
    }

    if (!passwordRepeat || passwordRepeat.trim().length === 0) {
      toast.error("لطفاً تکرار رمز عبور را وارد کنید");
      return;
    }

    if (password !== passwordRepeat) {
      toast.error("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    if (password.length < 6 || password.length > 50) {
      toast.error("رمز عبور باید بین ۶ تا ۵۰ کاراکتر باشد");
      return;
    }

    // بررسی اینکه رمز عبور شامل حداقل یک حرف و یک عدد باشد
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("رمز عبور باید شامل حداقل یک حرف و یک عدد باشد");
      return;
    }

    const result = await sendRegistrationOtp({
      phoneNumber: phone,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password,
      confirmPassword: passwordRepeat,
    });
    if (result.success) {
      localStorage.setItem("signup_phone", phone);
      onSuccess?.();
    }
  };

  return (
    <SectionContainer title="ثبت نام">
      <AuthToggle active="signup" onSignup={() => {}} onLogin={onGoLogin} />

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <LabeledField label="شماره موبایل">
          <Input
            dir="ltr"
            inputMode="tel"
            placeholder="0912xxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            className={fieldClassName}
            required
          />
        </LabeledField>

        <div className="grid md:grid-cols-2 gap-4">
          <LabeledField label="نام">
            <Input
              dir="rtl"
              placeholder="نام خود را وارد کنید"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={fieldClassName}
              required
              maxLength={50}
            />
          </LabeledField>

          <LabeledField label="نام خانوادگی">
            <Input
              dir="rtl"
              placeholder="نام خانوادگی خود را وارد کنید"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={fieldClassName}
              required
              maxLength={50}
            />
          </LabeledField>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <LabeledField label="رمز عبور">
            <Input
              dir="ltr"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClassName}
              required
            />
          </LabeledField>

          <LabeledField label="تکرار رمز عبور">
            <Input
              dir="ltr"
              type="password"
              placeholder="••••••••"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className={fieldClassName}
              required
            />
          </LabeledField>
        </div>

        <label className="flex items-center gap-2 text-[11px]">
          <input type="checkbox" className="size-3 accent-primary" defaultChecked required />
          <span>با قوانین سایت موافقم</span>
        </label>

        <Button
          type="submit"
          disabled={loading}
          className="mt-3 h-10 w-full dark:bg-dark-primary dark:text-white hover:bg-primary-400 rounded-lg text-sm bg-primary-700 disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ارسال کد تایید"}
        </Button>
      </form>
    </SectionContainer>
  );
}
