import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthToggle from "./AuthToggle";
import { fieldClassName } from "./AuthModal.";

export default function SignupView({
  phone,
  password,
  passwordRepeat,
  onChangePhone,
  onChangePassword,
  onChangePasswordRepeat,
  onGoLogin,
  onSubmitSignup,
}) {
  return (
    <SectionContainer title="ثبت نام">
      <AuthToggle active="signup" onSignup={() => {}} onLogin={onGoLogin} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSignup();
        }}
        className="space-y-4 text-xs"
      >
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

        <div className="grid md:grid-cols-2 gap-4">
          <LabeledField label="رمز عبور">
            <Input
              dir="ltr"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
              className={fieldClassName}
            />
          </LabeledField>

          <LabeledField label="تکرار رمز عبور">
            <Input
              dir="ltr"
              type="password"
              placeholder="••••••••"
              value={passwordRepeat}
              onChange={(e) => onChangePasswordRepeat(e.target.value)}
              className={fieldClassName}
            />
          </LabeledField>
        </div>

        <label className="flex items-center gap-2 text-[11px]">
          <input type="checkbox" className="size-3 accent-primary" defaultChecked />
          <span>با قوانین سایت موافقم</span>
        </label>

        <Button className="mt-3 h-10 w-full hover:bg-primary-400 rounded-lg text-sm bg-primary-700 ">
          ارسال کد تایید
        </Button>
      </form>
    </SectionContainer>
  );
}
