"use client";

import { ArrowLeft2, Sms } from "iconsax-reactjs";
import { toast } from "sonner";
import CurrencyServiceCard from "./CurrencyServiceCard";
import Link from "next/link";

export default function SidebarActions() {
  return (
    <>
      <button
        onClick={() => toast.info("فرایند قیمت گذاری محصولات")}
        className="w-full flex-between max-md:hidden p-2.5 text-sm dark:bg-dark-box dark:border-dark-stroke bg-white border text-gray-500 dark:text-dark-titre border-gray-200 rounded-xl overflow-hidden"
      >
        <p>فرایند قیمت گذاری محصولات</p>
        <ArrowLeft2 size={18} />
      </button>

      <CurrencyServiceCard />

      <Link href={"/contact-us"} className="text-xs max-md:hidden text-gray-400 flex gap-1 mt-4 items-center">
        <Sms size={18} variant="Bold" />
        گزارش مشکل
      </Link>
    </>
  );
}

