"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCartCount } from "@/contexts/CartCountContext";
import { AuthModal } from "@/template/Auth/AuthModal";
import DeliveryTypeSection from "./DeliveryTypeSection";
import PriceDisplaySection from "./PriceDisplaySection";
import ActionButtonsSection from "./ActionButtonsSection";
import SidebarActions from "./SidebarActions";
import { calculateProductPrice, getDisplayPriceToman } from "@/utils/productHelpers";
import { productService } from "@/services/product/productService";

const MAX_SAFE_INT32 = 2147483647;
const MAX_QUANTITY = 999;

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
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const { refreshCartCount } = useCartCount();

  const finalPrice = calculateProductPrice(product, selectedColor, selectedDelivery);
  const basePrice = getDisplayPriceToman(product);

  const rawId = product?.id ?? product?.productId ?? productId;
  const cartProductId = typeof rawId === "number" ? rawId : Number(rawId);
  const hasValidProductId =
    Number.isFinite(cartProductId) &&
    cartProductId > 0 &&
    cartProductId <= MAX_SAFE_INT32 &&
    cartProductId === Math.floor(cartProductId);
  const canAddToCart = hasValidProductId;

  // Load server-side price breakdown for this product when we have a valid numeric id.
  useEffect(() => {
    const idSource = product?.id ?? productId;
    const numericId = Number(idSource);
    if (
      !Number.isFinite(numericId) ||
      numericId <= 0 ||
      numericId > MAX_SAFE_INT32 ||
      numericId !== Math.floor(numericId)
    ) {
      setPriceBreakdown(null);
      return;
    }

    let cancelled = false;

    productService
      .getPriceBreakdown(numericId)
      .then((response) => {
        if (cancelled) return;
        const dto = response?.data ?? response;
        if (!dto || response?.success === false) {
          setPriceBreakdown(null);
          return;
        }
        setPriceBreakdown(dto);
      })
      .catch(() => {
        if (!cancelled) setPriceBreakdown(null);
      });

    return () => {
      cancelled = true;
    };
  }, [product?.id, productId]);

  const addToCart = async () => {
    if (!hasValidProductId) {
      toast.error("اطلاعات محصول نامعتبر است. صفحه را رفرش کنید.");
      return;
    }
    if (!user?.id) {
      setAuthModalOpen(true);
      return;
    }
    const qty = Math.min(
      MAX_QUANTITY,
      Math.max(1, Math.floor(Number(quantity) || 1))
    );
    try {
      setLoading(true);
      await shoppingCartService.addToCart(user.id, {
        productId: Math.floor(cartProductId),
        quantity: qty,
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
            priceBreakdown={priceBreakdown}
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

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} redirectTo={pathname} />
    </div>
  );
}

