"use client";

import { Button } from "@/components/ui/button";
import { Gift, Receipt, Receipt2 } from "iconsax-reactjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

function InvoiceCart() {
  const [cartTotal, setCartTotal] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const fetchCartData = async () => {
    if (authLoading) return;
    
    if (!user?.id) return;

    try {
      const [total, count] = await Promise.all([
        shoppingCartService.getCartTotal(user.id),
        shoppingCartService.getCartCount(user.id),
      ]);
      setCartTotal(total);
      setCartCount(count);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [user?.id, authLoading]);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("لطفا کد تخفیف را وارد کنید");
      return;
    }

    try {
      setLoading(true);
      const result = await shoppingCartService.applyDiscountCode(discountCode);
      toast.success("کد تخفیف با موفقیت اعمال شد");
      fetchCartData();
      setDiscountCode("");
    } catch (error) {
      toast.error(error.message || "خطا در اعمال کد تخفیف");
      console.error("Error applying discount:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price || 0);
  };
  return (
    <div className=" sticky top-0 h-max">
      <div className="bg-white dark:bg-dark-box rounded-xl shadow-md p-3 py-4 h-max">
        <p className="text-gray-800 text-xl font-bold dark:text-dark-title">صورت حساب</p>
        <div className="mt-6">
          <div className="flex-between">
            <p className="dark:text-dark-titre">ریز قیمت</p>
            <div className="bg-primary-50 text-primary-500  p-1 rounded text-sm">
              {cartCount} ایتم
            </div>
          </div>
          <div className="mt-4 text-neutral-800 dark:text-dark-text space-y-2.5">
            <div className="flex-between pb-2.5 border-b border-gray-200 dark:border-dark-field">
              <p className="text-sm text-gray-500 ">جمع مبلغ کالاها</p>
              <p>{formatPrice(cartTotal?.subtotal)} تومان</p>
            </div>
            <div className="flex-between pb-2.5 border-b border-gray-200 dark:border-dark-field">
              <p className="text-sm text-gray-500 ">هزینه حمل و گمرک</p>
              <p>{formatPrice(cartTotal?.shipping)} تومان</p>
            </div>
            {cartTotal?.discount > 0 && (
              <div className="flex-between">
                <p className="text-sm text-gray-500 ">تخفیف</p>
                <p className="text-green-600 dark:text-green-500">
                  {formatPrice(cartTotal?.discount)} تومان
                </p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="flex-between text-lg font-bold pb-2.5 border-t border-gray-200 dark:border-dark-field pt-2.5">
              <p className="dark:text-dark-titre">جمع کل</p>
              <p>{formatPrice(cartTotal?.total)} تومان</p>
            </div>
          </div>
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
          <button className="flex items-center  gap-2 mt-2 hover:bg-gray-50 p-3 transition-all rounded-lg">
            <Receipt2 className="text-gray-500 " size={20} />
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
