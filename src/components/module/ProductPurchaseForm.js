"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRIMARY, SECONDARY } from "@/data";

const USD = 83000;
const SHIP = 1200;
const FEE = 250000;
const SAMPLE = 12450000;

const format = (v) => v?.toLocaleString("fa-IR");

export default function ProductPurchaseForm() {
  const [showDesc, setShowDesc] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { link: "", priceUSD: "", weightGram: "", description: "" },
    mode: "onTouched",
  });

  const { priceUSD, weightGram } = watch();

  const payable = useMemo(() => {
    const price = parseFloat((priceUSD || "").replace(/,/g, ""));
    const weight = parseFloat((weightGram || "").replace(/,/g, ""));

    if (!price || price <= 0) return SAMPLE;

    const total = price * USD + (weight > 0 ? weight * SHIP : 0) + FEE;
    return Math.round(total);
  }, [priceUSD, weightGram]);

  const onSubmit = (data) => {
    const summary = `لینک: ${data.link}\nقیمت: ${data.priceUSD}\nوزن: ${data.weightGram || "ثبت نشده"}\nتوضیحات: ${
      data.description || "ثبت نشده"
    }\nقیمت: ${format(payable)} تومان`;

    toast.success("درخواست ثبت شد", { description: summary, richColors: true });

    reset({ link: "", priceUSD: "", weightGram: "", description: data.description });
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border bg-white shadow-sm px-6 py-4">
      <p className=" text-gray-700 text-2xl">فرم خرید محصول</p>

      <form className="space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
        {PRIMARY.map((f) => (
          <div key={f.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{f.label}</label>
            <Input placeholder={f.placeholder} className="bg-gray-50 border" {...register(f.name, f.rules)} />
            {errors[f.name] && <p className="text-xs text-red-500">{errors[f.name]?.message}</p>}
          </div>
        ))}

        <div className="grid gap-4 sm:grid-cols-2">
          {SECONDARY.map((f) => (
            <div key={f.name} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{f.label}</label>
              <Input
                inputMode="decimal"
                placeholder={f.placeholder}
                className="bg-gray-50 border"
                {...register(f.name, f.rules)}
              />
              {errors[f.name] && <p className="text-xs text-red-500">{errors[f.name]?.message}</p>}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed bg-gray-50/60 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">توضیحات</p>
              <p className="text-xs text-gray-500 mt-2">در صورت نیاز این بخش را باز کنید.</p>
            </div>

            <button
              type="button"
              onClick={() => setShowDesc((s) => !s)}
              className="flex size-9 items-center justify-center rounded-full border text-gray-500 hover:text-amber-500"
            >
              <Plus className={cn("size-5 transition-transform", showDesc && "rotate-45")} />
            </button>
          </div>

          {showDesc && (
            <textarea
              rows={3}
              placeholder="توضیحات دلخواه"
              className="mt-4 w-full rounded-2xl border bg-white px-4 py-3 text-sm"
              {...register("description")}
            />
          )}
        </div>

        <div className="flex-between mt-12">
          <p className="text-lg text-gray-400">قیمت قابل پرداخت</p>
          <p className="text-xl  text-gray-900">{format(payable)} تومان</p>
        </div>
        <div>
          <Button
            variant="ghost"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-yellow-400 text-primary-800 py-5 text-base"
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
          </Button>
        </div>
      </form>
    </div>
  );
}
