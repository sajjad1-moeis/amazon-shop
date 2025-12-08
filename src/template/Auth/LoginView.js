"use client";

import { useState } from "react";
import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthToggle from "./AuthToggle";
import { fieldClassName } from "./AuthModal";
import { Google } from "iconsax-reactjs";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginView({ onGoSignup, onGoReset, onSuccess }) {
  const { login, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(phone, password);
    if (result.success) {
      onSuccess?.();
    }
  };

  return (
    <SectionContainer title="ورود به حساب کاربری">
      <AuthToggle active="login" onSignup={onGoSignup} onLogin={() => {}} />

      <form onSubmit={handleSubmit} className=" text-xs">
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

        <LabeledField className={"mt-4"} label="رمز عبور">
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
        <div className="flex mt-3 text-gray-400 text-sm gap-1">
          رمز عبور خود را فراموش کرده‌اید؟
          <button type="button" onClick={onGoReset} className=" text-amber-500">
            بازیابی رمز عبور
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-10 mb-3 h-10 w-full dark:bg-dark-primary hover:bg-primary-400 rounded-lg text-sm bg-primary-700 text-white disabled:opacity-50"
        >
          {loading ? "در حال ورود..." : "ورود به حساب"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="h-10 w-full rounded-lg text-xs border-primary-500 border-2 text-primary-500 dark:border-dark-primary dark:text-dark-primary"
        >
          <Google />
          ورود با گوگل
        </Button>
      </form>
    </SectionContainer>
  );
}
