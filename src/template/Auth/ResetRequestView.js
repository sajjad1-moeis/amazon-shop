import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetRequestView({ phone, onChangePhone, onBack, onNext }) {
  return (
    <SectionContainer title="بازیابی رمز عبور" description="شماره موبایل خود را وارد کنید تا کد ارسال شود.">
      <button onClick={onBack} className="mb-1 text-[11px] text-muted-foreground">
        &larr; بازگشت
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
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
            className="h-10 rounded-lg bg-background text-right placeholder:text-xs"
          />
        </LabeledField>

        <Button className="mt-3 h-10 w-full rounded-lg text-sm">ارسال کد تایید</Button>
      </form>
    </SectionContainer>
  );
}
