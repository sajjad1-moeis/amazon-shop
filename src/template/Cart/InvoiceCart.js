"use client";

import { Button } from "@/components/ui/button";
import { Gift, Receipt2, Trash } from "iconsax-reactjs";
import Link from "next/link";
import React, { useState } from "react";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { discountCodeService } from "@/services/discountCode/discountCodeService";
import { toast } from "sonner";

function InvoiceCart({ cart, loading, userId, onRefreshCart }) {
  const [discountCode, setDiscountCode] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const cartCount = Array.isArray(cart?.items) ? cart.items.length : (cart?.totalItems ?? 0);
  const hasAppliedCode = Boolean(cart?.discountCode);
  const totalDiscountAmount = (cart?.totalDiscount ?? 0) + (cart?.discountCodeAmount ?? 0);

  const handleApplyDiscount = async () => {
    const code = discountCode.trim();
    if (!code) {
      toast.error("لطفا کد تخفیف را وارد کنید");
      return;
    }
    if (!userId) return;
    try {
      setActionLoading(true);
      await discountCodeService.applyDiscountCodeToCart(userId, code);
      toast.success("کد تخفیف با موفقیت اعمال شد");
      setDiscountCode("");
      onRefreshCart?.();
    } catch (error) {
      toast.error(error?.message ?? "خطا در اعمال کد تخفیف");
      console.error("Error applying discount:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveDiscount = async () => {
    if (!userId) return;
    try {
      setActionLoading(true);
      await shoppingCartService.removeDiscountCode(userId);
      toast.success("کد تخفیف حذف شد");
      onRefreshCart?.();
    } catch (error) {
      toast.error(error?.message ?? "خطا در حذف کد تخفیف");
      console.error("Error removing discount:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price || 0);
  };

  return (
    <div className="sticky top-0 h-max">
      <div className="bg-white dark:bg-dark-box rounded-xl shadow-md p-5 pb-4 h-max">
        {/* عنوان صورت حساب */}
        <h2 className="text-gray-800 text-xl font-bold dark:text-dark-title text-right mb-6">صورت حساب</h2>

        {/* ریز قیمت + ایتم */}
        <div className="flex justify-between items-center gap-3 pb-2.5 border-b border-gray-200 dark:border-dark-field">
          <p className="text-sm text-gray-600 dark:text-dark-text">ریز قیمت</p>
          <span className="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 text-sm px-2.5 py-1 rounded-full">
            {cartCount} ایتم
          </span>
        </div>

        {/* جمع مبلغ کالاها */}
        <div className="flex justify-between items-center gap-3 py-2.5 border-b border-gray-200 dark:border-dark-field">
          <p className="text-sm text-gray-500 dark:text-dark-text">جمع مبلغ کالاها</p>
          <p className="text-gray-800 dark:text-dark-title">{formatPrice(cart?.subTotal)} تومان</p>
        </div>

        {/* هزینه حمل و گمرک */}
        <div className="flex justify-between items-center gap-3 py-2.5 border-b border-gray-200 dark:border-dark-field">
          <p className="text-sm text-gray-500 dark:text-dark-text">هزینه حمل و گمرک</p>
          <p className="text-gray-800 dark:text-dark-title">{formatPrice(cart?.totalShippingCost ?? 0)} تومان</p>
        </div>

        {/* تخفیف (سبز) */}
        <div className="flex justify-between items-center gap-3 py-2.5">
          <p className="text-sm text-gray-500 dark:text-dark-text">تخفیف</p>
          <p className="text-green-600 dark:text-green-500 font-medium">{formatPrice(totalDiscountAmount)} تومان</p>
        </div>

        {/* بخش کد تخفیف */}
        {hasAppliedCode ? (
          <div className="mt-4 flex items-center justify-between gap-2 bg-green-50 dark:bg-dark-field border border-green-200 dark:border-dark-stroke rounded-lg p-2">
            <span className="text-sm text-green-700 dark:text-green-400">
              کد اعمال‌شده: <strong>{cart.discountCode}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={handleRemoveDiscount}
              disabled={actionLoading}
            >
              <Trash size={18} className="ml-1" />
              حذف کد
            </Button>
          </div>
        ) : (
          <div className="flex-between mt-4 bg-gray-50 dark:bg-dark-field border dark:border-dark-stroke border-gray-200 rounded-lg ps-2">
            <div className="flex items-center gap-2  max-w-[70%]">
              <Gift className="text-gray-500  flex-none" size={20} />
              <input
                className="bg-transparent placeholder:text-sm placeholder:text-gray-400 outline-none w-full"
                placeholder="کد تخفیف را وارد کنید"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleApplyDiscount()}
              />
            </div>
            <Button
              variant="ghost"
              className="my-0 py-0 text-primary-500 dark:text-dark-title"
              onClick={handleApplyDiscount}
              disabled={loading}
            >
              اعمال کد
            </Button>
          </div>
        )}

        {/* لینک دانلود پیش فاکتور */}
        <a
          href="#"
          className="flex items-center justify-end gap-2 mt-4 py-2 text-blue-500 dark:text-info-500 hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          <Receipt2 size={20} className="flex-shrink-0" />
          <span>دانلود پیش فاکتور</span>
        </a>

        <Link href="/steps-cart" className="block mt-6">
          <Button variant="ghost" className="bg-yellow-400 hover:bg-yellow-500 mt-2 w-full text-primary-800">
            تایید و ادامه
          </Button>
        </Link>
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
