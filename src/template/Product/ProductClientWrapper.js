"use client";

import React, { useState } from "react";
import GallerySection from "@/template/Product/GallerySection";
import PurchaseSection from "@/template/Product/PurchaseSection";
import { getProductImages } from "@/utils/productHelpers";

/**
 * Client Component برای بخش‌های تعاملی محصول
 * اطلاعات حیاتی (h1, قیمت, توضیحات) در Server Component رندر می‌شوند
 */
export default function ProductClientWrapper({ 
  product, 
  productId, 
  mainImage,
  productImages: serverProductImages,
  renderGalleryOnly = false,
  renderPurchaseOnly = false
}) {
  const [selectedColor, setSelectedColor] = useState("navy");
  const [selectedDelivery, setSelectedDelivery] = useState("express");
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = serverProductImages || getProductImages(product);

  if (renderGalleryOnly) {
    return (
      <div className="sticky top-4">
        <GallerySection
          productImages={productImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          mainImage={mainImage}
        />
      </div>
    );
  }

  if (renderPurchaseOnly) {
    return (
      <PurchaseSection
        selectedDelivery={selectedDelivery}
        setSelectedDelivery={setSelectedDelivery}
        selectedColor={selectedColor}
        productId={productId}
        product={product}
      />
    );
  }

  return null;
}

