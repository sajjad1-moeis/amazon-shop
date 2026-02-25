"use client";

import { ArrowLeft2, Sms } from "iconsax-reactjs";
import CurrencyServiceCard from "./CurrencyServiceCard";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SidebarActions() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="w-full flex-between max-md:hidden p-2.5 text-sm dark:bg-dark-box dark:border-dark-stroke bg-white border text-gray-500 dark:text-dark-titre border-gray-200 rounded-xl overflow-hidden"
          >
            <p>فرایند قیمت گذاری محصولات</p>
            <ArrowLeft2 size={18} />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md dark:bg-dark-box dark:border-dark-stroke">
          <DialogHeader>
            <DialogTitle className="text-right dark:text-white">
              فرایند قیمت‌گذاری محصولات
            </DialogTitle>
          </DialogHeader>
          <p className="text-right text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            قیمت نهایی محصولات بر اساس نرخ ارز، هزینه حمل، گمرک و درصد خدمات میکرولس محاسبه می‌شود. می‌توانید قبل از
            ثبت سفارش، مبلغ تقریبی را در همین صفحه مشاهده کنید. برای تنظیمات دقیق قیمت‌گذاری به پنل ادمین مراجعه
            کنید.
          </p>
          <Link
            href="/guide?section=amazon-guide"
            onClick={() => setOpen(false)}
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline block text-right"
          >
            راهنمای خرید از آمازون
          </Link>
        </DialogContent>
      </Dialog>

      <CurrencyServiceCard />

      <Link href={"/contact-us"} className="text-xs max-md:hidden text-gray-400 flex gap-1 mt-4 items-center">
        <Sms size={18} variant="Bold" />
        گزارش مشکل
      </Link>
    </>
  );
}











































