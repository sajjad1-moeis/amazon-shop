import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldTick, Star1, TickSquare, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import React from "react";

function ProductRowCard() {
  return (
    <Card className="rounded-xl border overflow-hidden border-gray-200 dark:border-dark-field  dark:bg-dark-box shadow-sm hover:shadow-md transition p-0">
      <CardContent className="p-0 grid grid-cols-4 gap-4 ">
        <div className="relative aspect-square max-h-64 w-full">
          <Image
            src="/image/Home/product.png"
            alt={`محصول بازدید شده شماره `}
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* LEFT SECTION (INFO) */}
        <div className="md:col-span-3 p-3">
          <div className="flex flex-col gap-3 border-b pb-4 mb-4 border-gray-200 ">
            {/* TITLE */}
            <h2 className="font-bold text-lg  text-neutral-800 dark:text-dark-titre">
              ساعت مچی مردانه Invicta مدل 0361 سری Reserve کرونوگراف
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm dark:text-[#7B7F86]">
              ساعت مچی مردانه Invicta مدل 3641 از سری Reserve. ترکیبی از قدرت، دقت، و طراحی خاص.
            </p>

            <div className="flex-between mt-3">
              <div className="flex-between text-gray-400 text-sm gap-2">
                <Timer1 size={16} variant="Bold" />
                <p>دارای قابلیت زمان‌سنج دقیق</p>
              </div>
              <div className="flex-between text-gray-400 text-sm gap-2">
                <ShieldTick size={16} variant="Bold" />
                <p>دوام و مقاومت بالا</p>
              </div>
              <div className="flex-between text-gray-400 text-sm gap-2">
                <TickSquare size={16} variant="Bold" />
                <p>شیشه ضد خش</p>
              </div>
            </div>
          </div>
          <div>
            {/* PRICE + DISCOUNT */}
            <div className="flex-between">
              <div className="flex-between gap-2">
                🟩
                <Image src="/image/amazonLogo.png" alt={`عکس آمازون`} width={60} height={30} />
              </div>
              <div className="flex-between gap-2">
                <Star1 size={18} variant="Bold" className="text-warning-500" />
                <p className="text-gray-500">4.7 </p>
                <p className="text-sm text-gray-400">(235)</p>
              </div>
            </div>
            <div className="flex-between mt-4 gap-6">
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <p>۱۲,۴۵۰,۰۰۰ تومان</p>
                  <div className="bg-primary-400 p-1.5 px-2 rounded-lg text-xs text-white">19%</div>
                </div>
                <div className="flex-between gap-2 mt-2">
                  <p className="text-gray-400 text-sm">۱۲,۴۵۰,۰۰۰ تومان</p>
                  <p className="text-gray-400 text-xs">شامل هزینه حمل و گمرک</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-primary-700 dark:bg-dark-primary text-white rounded-lg py-6"
                size="lg"
              >
                مشاهده جزئیات
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductRowCard;
