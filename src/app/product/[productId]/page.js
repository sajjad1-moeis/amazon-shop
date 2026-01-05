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
import BreadCrump from "@/template/Product/BreadCrump";
import { Button } from "@/components/ui/button";

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
      <div className="min-h-screen bg-gray-50 dark:bg-transparent" dir="rtl">
        {/* Breadcrumb Navigation */}

        <BreadCrump
          items={[{ label: "کالای دیجیتال", href: "/" }, { label: "ساعت هوشمند", href: "/" }, { label: product.title }]}
        />

        <div className="xl:container px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Right Side: Product Images */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-4 order-1 lg:order-1">
              <div className="sticky top-4">
                <GallerySection
                  productImages={productImages}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
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

          {/* Product Details Accordion */}

          {/* Product Reviews Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-4">
              <ProductReviewsSection />

              {/* Related Products Slider */}
              <RelatedSlider />

              {/* Accessories Slider */}
              <AccessoriesSlider />
            </div>
            <div className="asda max-md:hidden p-2 border rounded-lg border-gray-200 dark:bg-dark-box dark:border-dark-stroke bg-white h-max sticky top-10">
              <p>۱۲,۴۵۰,۰۰۰ تومان</p>
              <Button variant="ghost" className="w-full mt-6 bg-yellow-400  text-black rounded-lg">
                افزودن به سبد خرید
              </Button>
            </div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
