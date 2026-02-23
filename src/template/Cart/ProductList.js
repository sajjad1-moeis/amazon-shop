"use client";

import React from "react";
import CartItem from "./CartItem";

export default function ProductList({ cartItems = [], loading, userId, onRefresh }) {
  if (loading) {
    return (
      <div className="mt-4">
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      </div>
    );
  }
  if (!cartItems.length) {
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
          <CartItem
            key={item.id}
            item={item}
            userId={userId}
            onUpdate={onRefresh}
          />
        ))}
      </div>
    </div>
  );
}
