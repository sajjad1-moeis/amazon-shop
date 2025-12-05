import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fieldClassName } from "./AuthModal.";

export default function SignupVerifyView({ phone, code, onChangeCode, onBack }) {
  return (
    <SectionContainer
      title="بازیابی رمز عبور"
      description={`کد تأییدی به شماره موبایل ${phone} ارسال شده است. لطفاً آن را در کادر زیر وارد کنید تا حساب شما فعال شود.`}
    >
      <form className="space-y-4 text-xs">
        <LabeledField label="کد تایید">
          <Input
            dir="ltr"
            inputMode="numeric"
            placeholder="123456"
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            className={fieldClassName}
          />
        </LabeledField>

        <Button
          className="mt-3 h-10 w-full rounded-lg text-sm bg-primary-700 text-white dark:bg-dark-primary"
          variant="ghost"
        >
          تایید و ادامه
        </Button>
      </form>
      <div className="flex gap-1 text-sm text-gray-400">
        شماره موبایل را اشتباه وارد کردید ؟
        <button onClick={onBack} className="mb-1 text-yellow-600 text-muted-foreground">
          ویرایش شماره موبایل
        </button>
      </div>
    </SectionContainer>
  );
}
