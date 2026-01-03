"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductComparisonColumn from "@/template/Dashboard/Comparisons/ProductComparisonColumn";
import ComparisonTable from "@/template/Dashboard/Comparisons/ComparisonTable";
import FeatureHighlightCards from "@/template/Dashboard/Comparisons/FeatureHighlightCards";
import AddProductColumn from "@/template/Dashboard/Comparisons/AddProductColumn";
import AddFavoriteModal from "@/template/Dashboard/Favorites/AddFavoriteModal";

import IndexLayout from "@/layout/IndexLayout";

const mockProducts = [
  {
    id: "p1",
    title: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری Reserve کرونوگراف",
    image: "/image/Home/product.png",
    retailer: "Amazon",
    rating: 4.7,
    reviewsCount: 275,
    price: "۱۲,۴۵۰,۰۰۰",
    features: {
      brand: "Sony",
      model: "PS5 Standard",
      diskDrive: true,
      outputResolution: "4K",
      frameRate: "تا ۱۲۰fps",
      weight: "۴.۵kg",
    },
  },
  {
    id: "p2",
    title: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری Reserve کرونوگراف",
    image: "/image/Home/product.png",
    retailer: "Amazon",
    rating: 4.7,
    reviewsCount: 275,
    price: "۱۲,۴۵۰,۰۰۰",
    features: {
      brand: "Sony",
      model: "PS5 Digital",
      diskDrive: false,
      outputResolution: "4K",
      frameRate: "تا ۱۲۰fps",
      weight: "۳.۹kg",
    },
  },
];

const comparisonFeatures = [
  { key: "brand", label: "برند" },
  { key: "model", label: "مدل" },
  { key: "diskDrive", label: "درایو دیسک" },
  { key: "outputResolution", label: "وضوح خروجی" },
  { key: "frameRate", label: "نرخ فریم" },
  { key: "weight", label: "وزن" },
];

export default function ProductComparison() {
  const [products, setProducts] = useState(mockProducts);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);

  const handleRemoveProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast.success("محصول از مقایسه حذف شد");
  };

  const handleAddProduct = () => {
    toast.info("در حال انتقال به انتخاب محصول...");
  };

  const handleSaveComparison = () => {
    setIsFavoriteModalOpen(true);
  };

  return (
    <IndexLayout>
      <div className="flex flex-col gap-4 sm:gap-6  pb-20">
        <div class=" py-4  border-b-2 border-gray-200 dark:border-dark-stroke mb-8">
          <div class="container flex-between">
            <p className="text-gray-500 dark:text-dark-text  max-md:text-sm">
              مقایسه محصولات <span className="text-yellow-600">2 محصول</span>
            </p>
            <Button
              variant="ghost"
              className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 font-medium text-xs sm:text-sm w-auto"
            >
              ذخیره مقایسه
            </Button>
          </div>
        </div>
        <div class="container">
          {/* Products Grid */}
          <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-6 mb-6">
            <div className="w-full md:max-w-48">
              <AddProductColumn onAdd={handleSaveComparison} />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 flex-1">
              {products.map((product) => (
                <ProductComparisonColumn
                  key={product.id}
                  product={product}
                  onRemove={() => handleRemoveProduct(product.id)}
                />
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {products.length > 0 && <ComparisonTable products={products} features={comparisonFeatures} />}

          {/* Feature Highlights */}
          {products.length > 0 && <FeatureHighlightCards products={products} />}
        </div>
      </div>

      {/* Add Favorite Modal */}
      <AddFavoriteModal open={isFavoriteModalOpen} onOpenChange={setIsFavoriteModalOpen} />
    </IndexLayout>
  );
}
