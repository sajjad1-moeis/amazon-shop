"use client";

import { useState } from "react";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCartCount } from "@/contexts/CartCountContext";
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
  const { user } = useAuth();
  const { refreshCartCount } = useCartCount();

  const finalPrice = calculateProductPrice(product, selectedColor, selectedDelivery);
  const basePrice = getBasePrice(product);

  const cartProductId = Number(product?.id ?? productId);
  const canAddToCart = !!(user?.id && Number.isFinite(cartProductId) && cartProductId > 0);

  const addToCart = async () => {
    if (!user?.id) {
      toast.error("برای افزودن به سبد خرید وارد شوید");
      return;
    }
    if (!Number.isFinite(cartProductId) || cartProductId <= 0) {
      toast.error("اطلاعات محصول نامعتبر است. صفحه را رفرش کنید.");
      return;
    }
    try {
      setLoading(true);
      await shoppingCartService.addToCart(user.id, {
        productId: cartProductId,
        quantity: Number(quantity) || 1,
        hasQualityShield: false,
      });
      refreshCartCount();
      toast.success("به سبد خرید اضافه شد");
    } catch (error) {
      toast.error(error?.message ?? "خطا در افزودن به سبد خرید");
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
            addToCartDisabled={!canAddToCart}
          />
        </div>
      </div>

      <SidebarActions />
    </div>
  );
}

