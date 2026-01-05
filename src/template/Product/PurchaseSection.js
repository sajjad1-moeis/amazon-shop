"use client";

import { Button } from "@/components/ui/button";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, ArrowLeft2, InfoCircle, Sms, Truck, TruckFast } from "iconsax-reactjs";

export default function PurchaseSection({ selectedDelivery, setSelectedDelivery, productId, product, quantity = 1 }) {
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    try {
      setLoading(true);
      await shoppingCartService.addItem({ productId, quantity });
      toast.success("به سبد خرید اضافه شد");
    } catch {
      toast.error("خطا در افزودن به سبد خرید");
    } finally {
      setLoading(false);
    }
  };

  const price = product?.discountPrice || product?.price;
  const discount =
    product?.price && product?.discountPrice
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  return (
    <div className="space-y-3">
      {/* 1️⃣ Delivery type */}
      <div className="space-y-4 bg-white dark:bg-dark-box dark:border-dark-stroke border border-gray-200 rounded-xl overflow-hidden">
        {/* 1️⃣ Delivery type */}
        <div>
          <div className="grid grid-cols-2">
            {/* Standard */}
            <label
              className={`cursor-pointer p-3 transition flex items-center justify-between
      ${selectedDelivery === "standard" ? "bg-gray-100 dark:bg-dark-box " : "bg-white dark:bg-dark-field"}`}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={selectedDelivery === "standard"}
                  onChange={() => setSelectedDelivery("standard")}
                  className="mt-1 accent-primary-600"
                />
                <div className="text-right">
                  <div className="flex-center gap-2">
                    <div className="bg-gray-600 p-1 rounded-lg">
                      <Truck size={16} className=" text-white" />
                    </div>

                    <div className="text-xs">ارسال عادی</div>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2">۳۰ روز کاری</div>
                </div>
              </div>
            </label>

            {/* Express */}
            <label
              className={`cursor-pointer p-3 transition flex items-center justify-between
      ${selectedDelivery === "express" ? "bg-gray-100 dark:bg-dark-box " : "bg-white dark:bg-dark-field"}`}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={selectedDelivery === "express"}
                  onChange={() => setSelectedDelivery("express")}
                  className="mt-1 accent-green-600"
                />
                <div className="text-right">
                  <div className="flex-center gap-2">
                    <div className="bg-green-500 p-1 rounded-lg">
                      <TruckFast size={16} className="text-white " />
                    </div>
                    <div className="text-xs">ارسال اکسپرس</div>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2">۲۰ روز کاری</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* 2️⃣ Price + seller + actions */}
        <div className="p-2.5 mt-10">
          {/* Price */}
          <div>
            <p className="text-gray-500 text-sm">قیمت :</p>
            <div className="flex-between gap-2">
              <div className="">
                <span className="text-2xl">{Number(price).toLocaleString("fa-IR")}</span>
                <span className="text-sm">تومان</span>
              </div>
              {discount > 0 && <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">{discount}٪</span>}
            </div>

            {discount > 0 && (
              <div className="text-sm text-gray-400 line-through mt-1">
                {Number(product.price).toLocaleString("fa-IR")} تومان
              </div>
            )}

            <button className="text-xs text-primary-300 mt-4 mb-6 flex items-center gap-1">
              <InfoCircle size={16} variant="Bold" />
              جزئیات محاسبه قیمت
            </button>
          </div>

          {/* Seller */}
          <div className="flex-between">
            <p className="text-gray-500 text-sm">قیمت :</p>
            <div className="flex-center gap-1">
              <div className="text-sm text-gray-400">آمازون امارات</div>
              <img src="/image/amazonLogo.png" className="w-10 h-max" />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2 mt-3">
            <Button onClick={addToCart} variant="ghost" className="w-full  bg-yellow-400  text-black rounded-lg">
              افزودن به سبد خرید
            </Button>

            <Button
              variant="ghost"
              className="w-full rounded-lg bg-gray-200 dark:bg-dark-stroke dark:text-dark-titre text-gray-600"
            >
              افزودن به علاقه‌مندی‌ها
            </Button>
          </div>

          <button className="text-[10px] text-gray-400 flex gap-1 mt-4   items-center">
            <InfoCircle size={16} variant="Bold" />
            شامل هزینه حمل و گمرک
          </button>
        </div>
      </div>

      <div className=" flex-between max-md:hidden p-2.5 text-sm dark:bg-dark-box dark:border-dark-stroke bg-white border text-gray-500 dark:text-dark-titre border-gray-200 rounded-xl overflow-hidden">
        <p>فرایند قیمت گذاری محصولات</p>
        <ArrowLeft2 size={18} />
      </div>
      {/* 3️⃣ Service */}
      <div className="max-md:hidden p-2.5 dark:bg-dark-box dark:border-dark-stroke text-sm relative bg-white border text-gray-500 border-gray-200 rounded-xl ">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-yellow-400 text-secondary-700 absolute -rotate-[25deg] top-0 -left-2 text-xs p-2 py-1 rounded-md">
            جدید
          </span>
          <div className="flex gap-2">
            <img src="/image/coins.png" className="w-5 h-max" />

            <span className="text-sm text-primary-700 dark:text-dark-title">خدمات ارزی میکرولس پی</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 my-2 dark:text-caption">پرداخت‌های ارزی شما با ویزا، مسترکارت و پی‌پال</p>

        <Button variant="ghost" className=" text-white px-3  rounded-lg h-8 text-xs bg-primary-700">
          مشاهده
          <ArrowLeft2 />
        </Button>
      </div>
      <button className="text-xs max-md:hidden text-gray-400 flex gap-1 mt-4   items-center">
        <Sms size={18} variant="Bold" />
        گزارش مشکل
      </button>
    </div>
  );
}
