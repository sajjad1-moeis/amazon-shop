"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fieldClassName } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function SignupVerifyView({ onBack, onSuccess }) {
  const { verifyRegistrationOtp, resendOtp, loading } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  // دریافت شماره تلفن از localStorage یا state قبلی
  useEffect(() => {
    const savedPhone = localStorage.getItem("signup_phone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      toast.error("لطفاً کد تایید ۶ رقمی را وارد کنید");
      return;
    }

    if (!phone) {
      toast.error("شماره موبایل یافت نشد");
      return;
    }
    
    const result = await verifyRegistrationOtp(phone, code);
    if (result.success) {
      localStorage.removeItem("signup_phone");
      onSuccess?.();
      router.push("/dashboard");
    }
  };

  const handleResend = async () => {
    if (!phone) return;
    await resendOtp(phone, "register");
  };

  return (
    <SectionContainer
      title="تایید حساب"
      description={`کد تأییدی به شماره موبایل ${phone || "شما"} ارسال شده است. لطفاً آن را در کادر زیر وارد کنید تا حساب شما فعال شود.`}
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

        <Button
          type="submit"
          disabled={loading || !phone}
          className="mt-3 h-10 w-full rounded-lg text-sm bg-primary-700 text-white dark:bg-dark-primary disabled:opacity-50"
        >
          {loading ? "در حال تایید..." : "تایید و ادامه"}
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
