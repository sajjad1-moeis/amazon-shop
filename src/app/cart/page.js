"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCartCount } from "@/contexts/CartCountContext";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import IndexLayout from "@/layout/IndexLayout";
import InvoiceCart from "@/template/Cart/InvoiceCart";
import ProductList from "@/template/Cart/ProductList";
import GuestCartList from "@/template/Cart/GuestCartList";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CartPage() {
  const { user } = useAuth();
  const { refreshCartCount } = useCartCount();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async (options = {}) => {
    const { silent = false } = options;
    if (!user?.id) return;
    try {
      if (!silent) setLoading(true);
      const data = await shoppingCartService.getCart(user.id);
      setCart(data);
      refreshCartCount();
    } catch (error) {
      if (!silent) {
        setCart(null);
        toast.error(error?.message ?? "خطا در دریافت سبد خرید");
      }
      console.error("Error fetching cart:", error);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [user?.id, refreshCartCount]);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, [user?.id, fetchCart]);

  const isGuest = !user?.id;

  return (
    <IndexLayout>
      <div className="bg-[#FAFAFA] dark:bg-dark-bg p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:container h-full gap-8">
          <div className="lg:col-span-2 xl:col-span-3">
            <div
              className="flex-between text-gray-700 dark:text-dark-title py-1.5 px-3 w-fit rounded"
              style={{
                background:
                  "linear-gradient(90deg, rgba(137, 149, 214, 0) 0%, rgba(137, 149, 214, 0.3) 100%)",
              }}
            >
              <img src="/image/emarat.png" className="w-5 ml-2" alt="" />
              خرید از فروشگاه امازون امارات
            </div>
            {isGuest ? (
              <GuestCartList />
            ) : (
              <ProductList
                cartItems={cart?.items ?? []}
                loading={loading}
                userId={user?.id}
                onRefresh={() => fetchCart({ silent: true })}
              />
            )}
          </div>
          {isGuest ? (
            <div className="sticky top-0 h-max">
              <div className="bg-white dark:bg-dark-box rounded-xl shadow-md p-5 pb-4">
                <h2 className="text-gray-800 text-xl font-bold dark:text-dark-title text-right mb-4">
                  صورت حساب
                </h2>
                <p className="text-sm text-gray-600 dark:text-dark-text text-right mb-4">
                  برای مشاهده جمع نهایی و پرداخت، وارد حساب کاربری شوید.
                </p>
                <Button
                  onClick={() => openAuthModal("/steps-cart")}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                >
                  ورود و ادامه پرداخت
                </Button>
              </div>
            </div>
          ) : (
            <InvoiceCart
              cart={cart}
              loading={loading}
              userId={user?.id}
              onRefreshCart={() => fetchCart({ silent: true })}
            />
          )}
        </div>
      </div>
    </IndexLayout>
  );
}
