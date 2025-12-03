import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthToggle from "./AuthToggle";
import { fieldClassName } from "./AuthModal.";
import { Google } from "iconsax-reactjs";

export default function LoginView({ phone, password, onChangePhone, onChangePassword, onGoSignup, onGoReset }) {
  return (
    <SectionContainer title="ورود به حساب کاربری">
      <AuthToggle active="login" onSignup={onGoSignup} onLogin={() => {}} />

      <form className=" text-xs">
        <LabeledField label="شماره موبایل">
          <Input
            dir="ltr"
            inputMode="tel"
            placeholder="0912xxxxxxx"
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
            className={fieldClassName}
          />
        </LabeledField>

        <LabeledField className={"mt-4"} label="رمز عبور">
          <Input
            dir="ltr"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            className={fieldClassName}
          />
        </LabeledField>
        <div className="flex mt-3 text-gray-400 text-sm gap-1">
          رمز عبور خود را فراموش کرده‌اید؟
          <button type="button" onClick={onGoReset} className=" text-amber-500">
            بازیابی رمز عبور
          </button>
        </div>

        <Button className="mt-10 mb-3 h-10 w-full hover:bg-primary-400 rounded-lg text-sm bg-primary-700 text-white">
          ورود به حساب
        </Button>

        <Button
          variant="outline"
          className="h-10 w-full rounded-lg text-xs border-primary-500 border-2 text-primary-500"
        >
          <Google />
          ورود با گوگل
        </Button>
      </form>
    </SectionContainer>
  );
}
