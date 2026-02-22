"use client";

import { useState, useEffect } from "react";
import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fieldClassName } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function ResetVerifyView({ onBack, onSuccess }) {
  const { resetPassword, resendOtp, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  useEffect(() => {
    const savedPhone = localStorage.getItem("reset_phone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) {
      toast.error("شماره موبایل یافت نشد");
      return;
    }
    if (!code || code.length !== 6) {
      toast.error("لطفاً کد تأیید ۶ رقمی را وارد کنید");
      return;
    }
    if (!password || password.length < 6 || password.length > 50) {
      toast.error("رمز عبور باید بین ۶ تا ۵۰ کاراکتر باشد");
      return;
    }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("رمز عبور باید شامل حداقل یک حرف و یک عدد باشد");
      return;
    }
    if (password !== passwordRepeat) {
      toast.error("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    const result = await resetPassword({
      phoneNumber: phone,
      otpCode: code,
      newPassword: password,
      confirmPassword: passwordRepeat,
    });
    if (result.success) {
      localStorage.removeItem("reset_phone");
      onSuccess?.();
    }
  };

  const handleResend = async () => {
    if (!phone) return;
    await resendOtp(phone, "forgot");
  };

  return (
    <SectionContainer
      title="بازیابی رمز عبور"
      description={`کد تأییدی به شماره موبایل ${phone || "شما"} ارسال شده است. لطفاً آن را در کادر زیر وارد کنید.`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <LabeledField label="کد تایید">
          <Input
            dir="ltr"
            inputMode="numeric"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={fieldClassName}
            required
            maxLength={6}
          />
        </LabeledField>

        <div className="grid md:grid-cols-2 gap-4">
          <LabeledField label="رمز عبور جدید">
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

        <Button
          type="submit"
          disabled={loading || !phone}
          className="mt-3 h-10 w-full rounded-lg text-sm bg-primary-700 text-white dark:bg-dark-primary disabled:opacity-50"
        >
          {loading ? "در حال تغییر..." : "تایید و تغییر رمز عبور"}
        </Button>
      </form>
      <div className="flex gap-1 text-sm text-gray-400">
        کد را دریافت نکردید؟
        <button type="button" onClick={handleResend} className="mb-1 text-yellow-600 text-muted-foreground">
          ارسال مجدد
        </button>
      </div>
      <div className="flex gap-1 text-sm text-gray-400">
        شماره موبایل را اشتباه وارد کردید ؟
        <button type="button" onClick={onBack} className="mb-1 text-yellow-600 text-muted-foreground">
          ویرایش شماره موبایل
        </button>
      </div>
    </SectionContainer>
  );
}
