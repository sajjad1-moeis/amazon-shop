"use client";

import PriceDetailsModal from "./PriceDetailsModal";

export default function PriceDisplaySection({ product, finalPrice, basePrice, selectedColor, selectedDelivery }) {
  const discount =
    product?.price && product?.discountPrice
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  return (
    <>
      {/* Price */}
      <div>
        <p className="text-gray-500 text-sm">قیمت :</p>
        <div className="flex-between gap-2">
          <div className="">
            <span className="text-2xl">{Number(finalPrice).toLocaleString("fa-IR")}</span>
            <span className="text-sm">تومان</span>
          </div>
          {discount > 0 && <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">{discount}٪</span>}
        </div>

        {discount > 0 && (
          <div className="text-sm text-gray-400 line-through mt-1">
            {Number(product.price).toLocaleString("fa-IR")} تومان
          </div>
        )}

        <PriceDetailsModal
          product={product}
          finalPrice={finalPrice}
          basePrice={basePrice}
          selectedColor={selectedColor}
          selectedDelivery={selectedDelivery}
        />
      </div>

      {/* Seller */}
      <div className="flex-between mt-6">
        <p className="text-gray-500 text-sm">فروشگاه :</p>
        <div className="flex-center gap-1">
          <div className="text-sm text-gray-400">آمازون امارات</div>
          <img src="/image/amazonLogo.png" className="w-10 h-max" alt="Amazon Logo" />
        </div>
      </div>
    </>
  );
}

