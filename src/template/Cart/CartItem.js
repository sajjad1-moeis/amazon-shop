"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldTick, Trash, TruckFast } from "iconsax-reactjs";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";

function CartItem({ item, userId, onUpdate }) {
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = item?.quantity ?? 1;
    setQuantity(q);
  }, [item?.quantity]);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    if (!userId) return;
    const prevQuantity = quantity;
    setQuantity(newQuantity);
    try {
      await shoppingCartService.updateCartItem(userId, item.id, {
        quantity: newQuantity,
        hasQualityShield: item.hasQualityShield ?? false,
      });
      onUpdate?.();
    } catch (error) {
      setQuantity(prevQuantity);
      toast.error(error?.message ?? "خطا در به‌روزرسانی تعداد");
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      await shoppingCartService.removeItem(userId, item.id);
      toast.success("محصول از سبد خرید حذف شد");
      onUpdate?.();
    } catch (error) {
      toast.error(error?.message ?? "خطا در حذف محصول");
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const product = item?.product ?? {};
  const title = item?.productTitle ?? product?.name ?? "محصول";
  const imageUrl = item?.productMainImageUrl ?? product?.image ?? "/image/Home/product.png";
  const price = item?.price ?? 0;
  const discountPrice = item?.discountPrice ?? 0;
  const denominator = price + discountPrice;
  const discount =
    item?.discount ??
    (discountPrice > 0 && denominator > 0 ? Math.round((discountPrice / denominator) * 100) : 0);
  const originalPrice = discount > 0 && denominator > 0 ? price + discountPrice : price;
  const isUae = product?.currency === "AED" || product?.amazonShopName === "امارات" || item?.shop === "uae";

  const badgeBase = "inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-xs font-medium";
  const quantityBtnBase = "size-9 flex items-center justify-center rounded-lg shrink-0";

  return (
    <Card className="rounded-xl border overflow-hidden border-gray-200 dark:bg-dark-box dark:border-dark-field shadow-sm hover:shadow-md transition p-0">
      <CardContent className="p-0">
        {/* موبایل: تصویر بالا، بعد جزئیات، بعد قیمت و تعداد */}
        <div className="flex flex-col md:hidden">
          <div className="relative aspect-square w-full bg-gray-100 dark:bg-dark-field">
            <Image src={imageUrl} alt={title} fill className="object-contain p-2" />
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-start gap-2">
              <h2 className="font-bold text-base text-neutral-800 dark:text-dark-titre leading-snug line-clamp-2">
                {title}
              </h2>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 text-red-500 dark:text-red-400 text-sm shrink-0"
                aria-label="حذف"
              >
                <Trash size={18} />
                <span>حذف</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/image/amazonLogo.png" alt="آمازون" width={56} height={22} className="object-contain" />
              <Image
                src={isUae ? "/image/Products/emarat.png" : "/image/Products/usa.png"}
                alt=""
                width={22}
                height={22}
                className="rounded-full object-cover"
              />
            </div>
            {item?.variant && (
              <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-dark-titre">
                <span className="size-4 rounded-full bg-[#E2BB30] shrink-0" />
                <span>{item.variant}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <span
                className={`${badgeBase} bg-gray-100 dark:bg-dark-field border-gray-200 dark:border-dark-stroke text-gray-600 dark:text-dark-titre`}
              >
                <TruckFast size={16} className="text-green-600 shrink-0" />
                ۲۰ روز کاری
              </span>
              {item?.hasQualityShield && (
                <span
                  className={`${badgeBase} bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400`}
                >
                  <ShieldTick size={16} variant="Bold" className="shrink-0" />
                  دارای سپر کیفیت
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button
                variant="ghost"
                className={`${quantityBtnBase} bg-gray-200 dark:bg-dark-field text-gray-700 dark:text-dark-titre hover:bg-gray-300 dark:hover:bg-dark-stroke`}
                onClick={handleDecrease}
                disabled={quantity <= 1}
                aria-label="کم کردن"
              >
                <MinusIcon className="size-4" />
              </Button>
              <span className="min-w-[2rem] text-center text-sm font-medium text-neutral-800 dark:text-dark-titre">
                {quantity}
              </span>
              <Button
                variant="ghost"
                className={`${quantityBtnBase} bg-primary-600 dark:bg-primary-700 text-white hover:bg-primary-700 dark:hover:bg-primary-600`}
                onClick={handleIncrease}
                aria-label="افزودن"
              >
                <PlusIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="px-4 pb-4 pt-3 border-t border-gray-200 dark:border-dark-stroke space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              {discount > 0 && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-lg">{discount}٪</span>
              )}
              <p className="text-lg font-bold text-neutral-800 dark:text-dark-titre">
                {formatPrice(item?.totalPrice ?? price * quantity)} تومان
              </p>
            </div>
            {discount > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(originalPrice)} تومان
              </p>
            )}
          </div>
        </div>

        {/* دسکتاپ: همان ساختار قبلی */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          <div className="relative aspect-square max-h-56 w-full">
            <Image src={imageUrl} alt={title} fill className="object-cover rounded-md" />
          </div>
          <div className="col-span-2 lg:col-span-3 p-3">
            <div className="flex flex-col gap-3 border-b pb-4 mb-4 border-gray-200 dark:border-dark-stroke">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg text-neutral-800 dark:text-dark-titre">{title}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Image src="/image/amazonLogo.png" alt="آمازون" width={60} height={30} />
                    <Image
                      src={isUae ? "/image/Products/emarat.png" : "/image/Products/usa.png"}
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-red-600 text-sm cursor-pointer"
                  onClick={handleRemove}
                  aria-label="حذف"
                >
                  <Trash size={24} />
                  <span>حذف</span>
                </button>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                {item?.variant && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-dark-titre text-sm">
                    <span className="size-4 rounded-full bg-[#E2BB30]" />
                    {item.variant}
                  </div>
                )}
                <div className="flex gap-2">
                  {item?.hasQualityShield && (
                    <span
                      className={`${badgeBase} bg-primary-50 dark:bg-dark-field border-primary-200 dark:border-dark-stroke text-primary-600 dark:text-primary-400`}
                    >
                      <ShieldTick size={20} variant="Bold" />
                      دارای سپر کیفیت
                    </span>
                  )}
                  <span
                    className={`${badgeBase} bg-gray-100 dark:bg-dark-field border-gray-200 dark:border-dark-stroke text-gray-600 dark:text-dark-titre`}
                  >
                    <TruckFast size={18} className="text-green-600" />
                    ۲۰ روز کاری
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end mt-4 gap-6">
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500 text-sm">قیمت واحد:</p>
                    <p>{formatPrice(price)} تومان</p>
                    {discount > 0 && (
                      <span className="bg-primary-400 px-2 py-1 rounded-lg text-xs text-white">{discount}%</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-500 text-sm">جمع این ردیف:</p>
                    <p className="font-medium">{formatPrice(item?.totalPrice ?? price * quantity)} تومان</p>
                  </div>
                  {discount > 0 && (
                    <p className="text-gray-400 text-sm line-through mt-1">
                      {formatPrice(originalPrice)} تومان (قیمت واحد قبل تخفیف)
                    </p>
                  )}
                </div>
                <ButtonGroup aria-label="تعداد" className="h-fit">
                  <Button
                    variant="ghost"
                    className="bg-primary-700 dark:bg-dark-primary size-8 text-white !rounded-lg"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon />
                  </Button>
                  <Button size="icon" variant="link" className="size-8" disabled>
                    {quantity}
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-primary-700 dark:bg-dark-primary size-8 text-white !rounded-lg"
                    onClick={handleIncrease}
                  >
                    <PlusIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
