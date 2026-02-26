"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { getGuestCartCount } from "@/lib/guestCart";

function getCartItemCount(data) {
  if (!data) return 0;
  if (Array.isArray(data.items) && data.items.length >= 0) return data.items.length;
  return data.totalItems ?? 0;
}

const CartCountContext = createContext({ cartCount: 0, refreshCartCount: () => {} });

export function useCartCount() {
  const ctx = useContext(CartCountContext);
  return ctx;
}

export function CartCountProvider({ children }) {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = useCallback(() => {
    if (!user?.id) {
      setCartCount(getGuestCartCount());
      return;
    }
    shoppingCartService
      .getCart(user.id)
      .then((data) => setCartCount(getCartItemCount(data)))
      .catch(() => setCartCount(0));
  }, [user?.id]);

  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return (
    <CartCountContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}
