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
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      toast.error("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    const result = await sendRegistrationOtp({ phoneNumber: phone, password });
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
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClassName}
            required
          />
        </LabeledField>

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
