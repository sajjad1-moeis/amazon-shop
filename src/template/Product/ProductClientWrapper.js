"use client";

import React, { useState } from "react";
import GallerySection from "@/template/Product/GallerySection";
import ProductInfoSection from "@/template/Product/ProductInfoSection";
import PurchaseSection from "@/template/Product/PurchaseSection";
import ProductDetailsAccordion from "@/template/Product/ProductDetailsAccordion";
import ProductReviewsSection from "@/template/Product/ProductReviewsSection";
import RelatedSlider from "@/template/Product/RelatedSlider";
import AccessoriesSlider from "@/template/Product/AccessoriesSlider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProductImages, calculateProductPrice } from "@/utils/productHelpers";

export default function ProductClientWrapper({ product, productId, mainImage }) {
  const [selectedColor, setSelectedColor] = useState("navy");
  const [selectedDelivery, setSelectedDelivery] = useState("express");
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = getProductImages(product);
  const colors = product?.colors || [];
  const finalPrice = calculateProductPrice(product, selectedColor, selectedDelivery);

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* Right Side: Product Images */}
        <div className="col-span-12 lg:col-span-3 xl:col-span-4 order-1 lg:order-1">
          <div className="sticky top-4">
            <GallerySection
              productImages={productImages}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              mainImage={mainImage}
            />
          </div>
        </div>

        {/* Center: Product Information */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-5 order-2 lg:order-2 space-y-6">
          <ProductInfoSection
            product={product}
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <div className="max-md:hidden">
            <ProductDetailsAccordion />
          </div>
        </div>

        {/* Left Sidebar: Pricing and Purchase */}
        <div className="col-span-12 lg:col-span-3 order-3 lg:order-3">
          <PurchaseSection
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
            productId={productId}
            product={product}
          />
          <div className="md:hidden">
            <ProductDetailsAccordion />
          </div>
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-4">
          <ProductReviewsSection />

          {/* Related Products Slider */}
          <RelatedSlider />

          {/* Accessories Slider */}
          <AccessoriesSlider />
        </div>
        <div className="max-md:hidden p-2 border rounded-lg border-gray-200 dark:bg-dark-box dark:border-dark-stroke bg-white h-max sticky top-10">
          <p>{finalPrice ? `${Number(finalPrice).toLocaleString("fa-IR")} تومان` : "قیمت نامشخص"}</p>
          <Button
            onClick={() => toast.info("افزودن به سبد خرید")}
            variant="ghost"
            className="w-full mt-6 bg-yellow-400 text-black rounded-lg"
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </>
  );
}

