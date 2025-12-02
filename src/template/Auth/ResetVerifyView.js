import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetVerifyView({ phone, code, password, onChangeCode, onChangePassword, onBack }) {
  return (
    <SectionContainer title="بازیابی رمز عبور" description={`کد تایید به ${phone || "شماره شما"} ارسال شد.`}>
      <button onClick={onBack} className="mb-1 text-[11px] text-muted-foreground">
        &larr; ویرایش شماره
      </button>

      <form className="space-y-4 text-xs">
        <LabeledField label="کد تایید">
          <Input
            dir="ltr"
            inputMode="numeric"
            placeholder="123456"
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            className="h-10 rounded-lg bg-background text-right placeholder:text-xs tracking-[0.3em]"
          />
        </LabeledField>

        <LabeledField label="رمز عبور جدید">
          <Input
            dir="ltr"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            className="h-10 rounded-lg bg-background text-right placeholder:text-xs"
          />
        </LabeledField>

        <Button className="mt-3 h-10 w-full rounded-lg text-sm">تایید و ادامه</Button>
      </form>
    </SectionContainer>
  );
}
