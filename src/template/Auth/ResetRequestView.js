import SectionContainer from "./SectionContainer";
import LabeledField from "./LabeledField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "iconsax-reactjs";
import { fieldClassName } from "./AuthModal.";

export default function ResetRequestView({ phone, onChangePhone, onBack, onNext }) {
  return (
    <SectionContainer title="بازیابی رمز عبور">
      <div class="flex justify-between mb-1 gap-6">
        <p className="text-gray-400 text-sm ">
          برای بازیابی رمز عبور خود، شماره موبایل ثبت‌شده را وارد کنید. کد تأیید برای شما ارسال خواهد شد.
        </p>
        <button onClick={onBack} className=" text-[11px] h-max text-muted-foreground">
          <ArrowLeft />
        </button>
      </div>

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
            className={fieldClassName}
          />
        </LabeledField>

        <Button className="mt-3 h-10 w-full rounded-lg text-sm bg-primary-700 dark:bg-dark-primary text-white">
          ارسال کد تایید
        </Button>
      </form>
    </SectionContainer>
  );
}
