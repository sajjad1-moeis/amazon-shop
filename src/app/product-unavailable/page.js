import React from "react";
import IndexLayout from "@/layout/IndexLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Box1 } from "iconsax-reactjs";

export const metadata = {
  title: "کالای ناموجود | میکرولس",
  description: "این کالا در حال حاضر موجود نیست. می‌توانید محصولات مشابه را ببینید.",
};

export default function ProductUnavailablePage() {
  return (
    <IndexLayout>
      <div className="min-h-[60vh] container px-4 py-12 flex flex-col items-center justify-center text-center">
        <Box1 size={64} className="text-gray-400 dark:text-gray-500 mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">کالای ناموجود</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          متأسفانه این محصول در حال حاضر در دسترس نیست. می‌توانید از لیست محصولات، کالای مشابه انتخاب کنید یا
          بعداً مجدداً بررسی کنید.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/products">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">مشاهده محصولات</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">بازگشت به صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    </IndexLayout>
  );
}
