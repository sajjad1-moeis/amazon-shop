"use client";

import { useState } from "react";
import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "iconsax-reactjs";
import { fieldClassName } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function ResetRequestView({ onBack, onSuccess }) {
  const { sendForgotPasswordOtp, loading } = useAuth();
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // اعتبارسنجی شماره تلفن: باید با 09 شروع شود و 11 رقم باشد
    const phoneRegex = /^09\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
      toast.error("شماره موبایل باید با 09 شروع شود و 11 رقم باشد");
      return;
    }

    const result = await sendForgotPasswordOtp(phone);
    if (result.success) {
      localStorage.setItem("reset_phone", phone);
      onSuccess?.();
    }
  };

  return (
    <SectionContainer title="بازیابی رمز عبور">
      <div className="flex justify-between mb-1 gap-6">
        <p className="text-gray-400 text-sm ">
          برای بازیابی رمز عبور خود، شماره موبایل ثبت‌شده را وارد کنید. کد تأیید برای شما ارسال خواهد شد.
        </p>
        <button type="button" onClick={onBack} className=" text-[11px] h-max text-muted-foreground">
          <ArrowLeft />
        </button>
      </div>

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

        <Button
          type="submit"
          disabled={loading}
          className="mt-3 h-10 w-full rounded-lg text-sm bg-primary-700 dark:bg-dark-primary text-white disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ارسال کد تایید"}
        </Button>
      </form>
    </SectionContainer>
  );
}
