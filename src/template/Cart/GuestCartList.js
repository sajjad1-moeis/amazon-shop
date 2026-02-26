"use client";

import React from "react";
import Image from "next/image";
import { getGuestCart, removeGuestCartItem, updateGuestCartItemQuantity } from "@/lib/guestCart";
import { useCartCount } from "@/contexts/CartCountContext";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function GuestCartList() {
  const { refreshCartCount } = useCartCount();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setItems(getGuestCart());
  }, []);

  const handleRemove = (productId) => {
    removeGuestCartItem(productId);
    setItems(getGuestCart());
    refreshCartCount();
  };

  const handleQuantityChange = (productId, delta) => {
    const list = getGuestCart();
    const idx = list.findIndex((i) => Number(i.productId) === Number(productId));
    if (idx < 0) return;
    const newQty = Math.max(1, (list[idx].quantity || 1) + delta);
    updateGuestCartItemQuantity(productId, newQty);
    setItems(getGuestCart());
    refreshCartCount();
  };

  if (items.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-center text-gray-500">سبد خرید شما خالی است</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {items.map((it) => (
        <div
          key={it.productId}
          className="flex gap-4 p-4 bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke"
        >
          <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-field flex-shrink-0">
            {it.imageUrl ? (
              <Image
                src={it.imageUrl}
                alt={it.title || ""}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                تصویر
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-sm font-medium text-gray-800 dark:text-dark-titre line-clamp-2">
              {it.title || `محصول #${it.productId}`}
            </p>
            <div className="flex items-center justify-between gap-2 mt-2">
              <div className="flex items-center gap-1 border border-gray-200 dark:border-dark-stroke rounded-lg">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(it.productId, -1)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-field rounded-r"
                  aria-label="کم"
                >
                  <MinusIcon size={16} />
                </button>
                <span className="px-2 text-sm min-w-[24px] text-center">{it.quantity || 1}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(it.productId, 1)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-field rounded-l"
                  aria-label="زیاد"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleRemove(it.productId)}
              >
                <Trash size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
