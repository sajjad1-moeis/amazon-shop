import React from "react";
import IndexLayout from "@/layout/IndexLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DiscountShape } from "iconsax-reactjs";

export const metadata = {
  title: "تخفیف‌های آمازون | اوتلت میکرولس",
  description: "محصولات تخفیف‌دار آمازون امارات و آمریکا با ارسال به ایران.",
};

export default function OutletPage() {
  return (
    <IndexLayout>
      <div className="min-h-[60vh] container px-4 py-12 flex flex-col items-center justify-center text-center">
        <DiscountShape size={64} className="text-primary-500 dark:text-primary-400 mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">تخفیف‌های آمازون</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          محصولات با تخفیف آمازون امارات و آمریکا را با ارسال مطمئن به ایران از میکرولس بخرید.
        </p>
        <Link href="/products?discount=true">
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">
            مشاهده محصولات تخفیف‌دار
          </Button>
        </Link>
      </div>
    </IndexLayout>
  );
}
