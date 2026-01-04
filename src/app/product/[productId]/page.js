"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import IndexLayout from "@/layout/IndexLayout";
import GallerySection from "@/template/Product/GallerySection";
import ProductInfoSection from "@/template/Product/ProductInfoSection";
import PurchaseSection from "@/template/Product/PurchaseSection";
import ProductDetailsAccordion from "@/template/Product/ProductDetailsAccordion";
import ProductReviewsSection from "@/template/Product/ProductReviewsSection";
import RelatedSlider from "@/template/Product/RelatedSlider";
import AccessoriesSlider from "@/template/Product/AccessoriesSlider";
import { mockProduct } from "@/data";

export default function ProductDetailPage({ params }) {
  const productId = params?.productId;

  const [product] = useState(mockProduct);
  const [loading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("navy"); // سرمه ای
  const [selectedDelivery, setSelectedDelivery] = useState("express");
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <IndexLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </IndexLayout>
    );
  }

  if (!product) {
    return (
      <IndexLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">محصول یافت نشد</p>
            <Link href="/products">
              <Button>بازگشت به لیست محصولات</Button>
            </Link>
          </div>
        </div>
      </IndexLayout>
    );
  }

  const productImages =
    product.images && product.images.length > 0 ? product.images : [product.mainImage].filter(Boolean);
  const colors = product.colors || [];

  return (
    <IndexLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                خانه
              </Link>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
              {product.parentCategoryName && (
                <>
                  <Link
                    href={`/categories?category=${product.categoryId}`}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {product.parentCategoryName}
                  </Link>
                  <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </>
              )}
              {product.categoryName && (
                <>
                  <Link
                    href={`/categories?category=${product.categoryId}`}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {product.categoryName}
                  </Link>
                  <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </>
              )}
              <span className="text-gray-900 dark:text-white font-medium">{product.name || product.title}</span>
            </nav>
          </div>
        </div>

        <div className="container px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Right Side: Product Images */}
            <div className="col-span-12 lg:col-span-4 order-1 lg:order-1">
              <div className="sticky top-4">
                <GallerySection
                  productImages={productImages}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              </div>
            </div>

            {/* Center: Product Information */}
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-2 space-y-6">
              <ProductInfoSection
                product={product}
                colors={colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <ProductDetailsAccordion />
            </div>

            {/* Left Sidebar: Pricing and Purchase */}
            <div className="col-span-12 lg:col-span-3 order-3 lg:order-3">
              <PurchaseSection
                selectedDelivery={selectedDelivery}
                setSelectedDelivery={setSelectedDelivery}
                productId={productId}
                product={product}
              />
            </div>
          </div>

          {/* Product Details Accordion */}

          {/* Product Reviews Section */}
          <div class="grid grid-cols-5">
            <div class="md:col-span-4">
              <ProductReviewsSection />

              {/* Related Products Slider */}
              <RelatedSlider />

              {/* Accessories Slider */}
              <AccessoriesSlider />
            </div>
            <div class="asda">sdads</div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
