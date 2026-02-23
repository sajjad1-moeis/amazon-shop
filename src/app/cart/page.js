"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCartCount } from "@/contexts/CartCountContext";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import IndexLayout from "@/layout/IndexLayout";
import InvoiceCart from "@/template/Cart/InvoiceCart";
import ProductList from "@/template/Cart/ProductList";
import { toast } from "sonner";

export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  const { refreshCartCount } = useCartCount();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await shoppingCartService.getCart(user.id);
      setCart(data);
      refreshCartCount();
    } catch (error) {
      setCart(null);
      toast.error(error?.message ?? "خطا در دریافت سبد خرید");
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, refreshCartCount]);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, [user?.id, fetchCart]);

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
            <ProductList
              cartItems={cart?.items ?? []}
              loading={loading}
              userId={user?.id}
              onRefresh={fetchCart}
            />
          </div>
          <InvoiceCart
            cart={cart}
            loading={loading}
            userId={user?.id}
            onRefreshCart={fetchCart}
          />
        </div>
      </div>
    </IndexLayout>
  );
}
