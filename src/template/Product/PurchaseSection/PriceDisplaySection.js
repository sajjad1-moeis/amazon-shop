"use client";

import PriceDetailsModal from "./PriceDetailsModal";

export default function PriceDisplaySection({
  product,
  finalPrice,
  basePrice,
  selectedColor,
  selectedDelivery,
}) {
  const numPrice = Number(finalPrice);
  const hasPrice = Number.isFinite(numPrice) && numPrice >= 0;
  const isAed = product?.currency === "AED" || product?.currency_symbol === "AED";
  const suffix = isAed ? " درهم" : " تومان";
  const displayPrice = hasPrice ? numPrice.toLocaleString("fa-IR") + suffix : "قیمت نامشخص";

  return (
    <div className="space-y-2">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">قیمت</p>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">{displayPrice}</p>
      </div>
      {product?.amazonShopName || product?.seller ? (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>فروشگاه:</span>
          <span>{product?.amazonShopName || product?.seller || "آمازون امارات"}</span>
        </div>
      ) : null}
      <PriceDetailsModal
        product={product}
        finalPrice={finalPrice}
        basePrice={basePrice}
        selectedColor={selectedColor}
        selectedDelivery={selectedDelivery}
      />
    </div>
  );
}
