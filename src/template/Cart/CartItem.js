"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldTick, Trash, TruckFast } from "iconsax-reactjs";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getProductName } from "@/utils/productHelpers";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";

const MAX_QUANTITY = 999;
const MAX_SAFE_INT32 = 2147483647;

function CartItem({ item, userId, onUpdate }) {
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = item?.quantity ?? 1;
    setQuantity(Math.min(MAX_QUANTITY, Math.max(1, Number(q) || 1)));
  }, [item?.quantity]);

  const cartItemId =
    typeof item?.id === "number" ? item.id : Number(item?.id);
  const hasValidCartItemId =
    Number.isFinite(cartItemId) &&
    cartItemId > 0 &&
    cartItemId <= MAX_SAFE_INT32 &&
    cartItemId === Math.floor(cartItemId);

  const handleQuantityChange = async (newQuantity) => {
    const qty = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(newQuantity) || 1)));
    if (qty < 1) return;
    if (!userId) return;
    if (!hasValidCartItemId) {
      toast.error("شناسه آیتم سبد نامعتبر است");
      return;
    }
    const prevQuantity = quantity;
    setQuantity(qty);
    try {
      await shoppingCartService.updateCartItem(userId, Math.floor(cartItemId), {
        quantity: qty,
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
    if (!hasValidCartItemId) {
      toast.error("شناسه آیتم سبد نامعتبر است");
      return;
    }
    try {
      setLoading(true);
      await shoppingCartService.removeItem(userId, Math.floor(cartItemId));
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
  const title = item?.productTitle ?? getProductName(product);
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
        {/* موبایل: کارت جمع‌وجور و شیک */}
        <div className="flex flex-col md:hidden">
          {/* تصویر با نسبت متعادل و گوشه‌های گرد */}
          <div className="relative aspect-[4/3] max-h-[220px] w-full bg-gray-50 dark:bg-dark-field/80">
            <Image src={imageUrl} alt={title} fill className="object-contain p-3" sizes="(max-width: 768px) 100vw, 220px" />
            {discount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow">
                {discount}٪
              </span>
            )}
          </div>

          <div className="p-3.5 space-y-2.5">
            {/* ردیف اول: عنوان + حذف */}
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold text-sm text-neutral-800 dark:text-dark-titre leading-snug line-clamp-2 flex-1 min-w-0">
                {title}
              </h2>
              <button
                type="button"
                onClick={handleRemove}
                disabled={loading}
                className="flex items-center gap-1 text-red-500 dark:text-red-400 text-xs shrink-0 py-1 px-1.5 rounded-lg hover:bg-red-500/10 transition-colors active:scale-95"
                aria-label="حذف"
              >
                <Trash size={16} />
                <span>حذف</span>
              </button>
            </div>

            {/* ردیف دوم: برند + پرچم + ارسال در یک خط */}
            <div className="flex items-center gap-2 flex-wrap">
              <Image src="/image/amazonLogo.png" alt="آمازون" width={48} height={18} className="object-contain opacity-90" />
              <Image
                src={isUae ? "/image/Products/emarat.png" : "/image/Products/usa.png"}
                alt=""
                width={18}
                height={18}
                className="rounded-full object-cover border border-gray-200 dark:border-dark-stroke"
              />
              <span className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-dark-titre bg-gray-100 dark:bg-dark-field px-2 py-1 rounded-md">
                <TruckFast size={14} className="text-green-600 shrink-0" />
                ۲۰ روز کاری
              </span>
              {item?.hasQualityShield && (
                <span className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-md border border-primary-200/50 dark:border-primary-800/50">
                  <ShieldTick size={14} variant="Bold" className="shrink-0" />
                  سپر کیفیت
                </span>
              )}
            </div>

            {item?.variant && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-dark-titre">
                <span className="size-3 rounded-full bg-[#E2BB30] shrink-0" />
                <span>{item.variant}</span>
              </div>
            )}

            {/* ردیف آخر: تعداد و قیمت در یک خط */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-dark-stroke">
              <div className="flex items-center gap-1 rounded-xl bg-gray-100 dark:bg-dark-field border border-gray-200 dark:border-dark-stroke overflow-hidden">
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="size-8 flex items-center justify-center text-gray-600 dark:text-dark-titre hover:bg-gray-200 dark:hover:bg-dark-stroke disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  aria-label="کم کردن"
                >
                  <MinusIcon className="size-4" />
                </button>
                <span className="min-w-[28px] text-center text-sm font-semibold text-neutral-800 dark:text-dark-titre">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="size-8 flex items-center justify-center bg-primary-600 dark:bg-primary-600 text-white hover:bg-primary-700 transition-colors active:scale-95"
                  aria-label="افزودن"
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>
              <div className="text-left min-w-0">
                {discount > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(originalPrice)} تومان
                  </p>
                )}
                <p className="text-base font-bold text-neutral-800 dark:text-dark-titre truncate">
                  {formatPrice(item?.totalPrice ?? price * quantity)} تومان
                </p>
              </div>
            </div>
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
