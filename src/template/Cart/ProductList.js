"use client";

import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function ProductList() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  const fetchCart = async () => {
    if (authLoading) return;
    
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cart = await shoppingCartService.getCart(user.id);
      setCartItems(cart.items || []);
    } catch (error) {
      toast.error("خطا در دریافت سبد خرید");
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user?.id, authLoading]);

  const handleItemUpdate = () => {
    fetchCart();
  };

  if (loading) {
    return (
      <div className="mt-4">
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-center text-gray-500">سبد خرید شما خالی است</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="w-full space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onUpdate={handleItemUpdate} />
        ))}
      </div>
    </div>
  );
}
