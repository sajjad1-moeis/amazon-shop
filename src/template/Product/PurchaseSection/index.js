"use client";

import { useState } from "react";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";
import DeliveryTypeSection from "./DeliveryTypeSection";
import PriceDisplaySection from "./PriceDisplaySection";
import ActionButtonsSection from "./ActionButtonsSection";
import SidebarActions from "./SidebarActions";
import { calculateProductPrice, getBasePrice } from "@/utils/productHelpers";

export default function PurchaseSection({
  selectedDelivery,
  setSelectedDelivery,
  selectedColor,
  productId,
  product,
  quantity = 1,
}) {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const finalPrice = calculateProductPrice(product, selectedColor, selectedDelivery);
  const basePrice = getBasePrice(product);

  const addToCart = async () => {
    try {
      setLoading(true);
      await shoppingCartService.addItem({ productId, quantity, color: selectedColor, delivery: selectedDelivery });
      toast.success("به سبد خرید اضافه شد");
    } catch {
      toast.error("خطا در افزودن به سبد خرید");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
  };

  return (
    <div className="space-y-3">
      {/* Delivery type */}
      <div className="space-y-4 bg-white dark:bg-dark-box dark:border-dark-stroke border border-gray-200 rounded-xl overflow-hidden">
        <DeliveryTypeSection selectedDelivery={selectedDelivery} setSelectedDelivery={setSelectedDelivery} />

        {/* Price + seller + actions */}
        <div className="p-2.5 mt-10">
          <PriceDisplaySection
            product={product}
            finalPrice={finalPrice}
            basePrice={basePrice}
            selectedColor={selectedColor}
            selectedDelivery={selectedDelivery}
          />

          <ActionButtonsSection
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            loading={loading}
          />
        </div>
      </div>

      <SidebarActions />
    </div>
  );
}

