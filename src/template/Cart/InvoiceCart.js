import { Button } from "@/components/ui/button";
import { Gift, Receipt, Receipt2 } from "iconsax-reactjs";
import Link from "next/link";
import React from "react";

function InvoiceCart() {
  return (
    <div className=" sticky top-0 h-max">
      <div className="bg-white rounded-xl shadow-md p-3 py-4 h-max">
        <p className="text-gray-800 text-xl font-bold">صورت حساب</p>
        <div className="mt-6">
          <div className="flex-between">
            <p>ریز قیمت</p>
            <div className="bg-primary-50 text-primary-500  p-1 rounded text-sm">2 ایتم</div>
          </div>
          <div className="mt-4 text-neutral-800 space-y-2.5">
            <div className="flex-between pb-2.5 border-b border-gray-200">
              <p className="text-sm text-gray-500">جمع مبلغ کالاها</p>
              <p>۱۲,۴۵۰,۰۰۰ تومان</p>
            </div>
            <div className="flex-between pb-2.5 border-b border-gray-200">
              <p className="text-sm text-gray-500">هزینه حمل و گمرک</p>
              <p>500,۰۰۰ تومان</p>
            </div>
            <div className="flex-between">
              <p className="text-sm text-gray-500">تخفیف</p>
              <p className="text-green-600">150,۰۰۰ تومان</p>
            </div>
          </div>
          <div className="flex-between mt-4 bg-gray-50 border border-gray-200 rounded-lg ps-2">
            <div className="flex items-center gap-2  max-w-[70%]">
              <Gift className="text-gray-500 flex-none" size={20} />
              <input
                className="bg-transparent placeholder:text-sm placeholder:text-gray-400 outline-none"
                placeholder="کد تخفیف را وارد کنید"
              />
            </div>
            <Button variant="ghost" className="my-0 py-0 text-primary-500">
              اعمال کد
            </Button>
          </div>
          <button className="flex items-center  gap-2 mt-2 hover:bg-gray-50 p-3 transition-all rounded-lg">
            <Receipt2 className="text-gray-500" size={20} />
            <p className="text-info-500">دانلود پیش فاکتور</p>
          </button>
          <Link href={"/steps-cart"}>
            <Button variant="ghost" className="bg-yellow-400 mt-12 w-full text-primary-800">
              تایید و ادامه
            </Button>
          </Link>
        </div>
      </div>

      <div className="from-[#14A574] to-[#049160] bg-gradient-to-r p-3 rounded-xl mt-4">
        <div className="flex-between text-white">
          <p className="text-sm text-green-200">
            امتیاز شما <span className="text-white">240</span>
          </p>
          <p className="rounded-lg bg-white/15 p-1 px-2 text-[#DEF7EC]">150,۰۰۰ تومان</p>
        </div>
        <div className="mt-4 bg-green-200 py-1 w-full text-gray-600 rounded-lg text-center">
          استفاده از امتیازات در این سفارش
        </div>
      </div>
    </div>
  );
}

export default InvoiceCart;
