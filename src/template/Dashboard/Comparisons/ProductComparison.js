"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Add, Trash } from "iconsax-reactjs";
import { toast } from "sonner";
import ProductComparisonColumn from "./ProductComparisonColumn";
import ComparisonTable from "./ComparisonTable";
import FeatureHighlightCards from "./FeatureHighlightCards";
import AddProductColumn from "./AddProductColumn";
import PageHeader from "../Common/PageHeader";

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
  const category = "لوازم جانبی کنسول";

  const handleRemoveProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast.success("محصول از مقایسه حذف شد");
  };

  const handleSaveComparison = () => {
    toast.success("مقایسه با موفقیت ذخیره شد");
  };

  const handleDeleteComparison = () => {
    if (confirm("آیا از حذف این مقایسه اطمینان دارید؟")) {
      setProducts([]);
      toast.success("مقایسه حذف شد");
    }
  };

  const handleAddProduct = () => {
    toast.info("در حال انتقال به انتخاب محصول...");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="مقایسه محصولات - کنترلر پلی استیشن"
        description={
          <p className="text-gray-600 dark:text-dark-text">
            دسته بندی :{" "}
            <span className="px-2 py-1  dark:bg-dark-blue dark:text-primary-300 bg-primary-100 text-primary-800 rounded-md text-sm">
              {category}
            </span>
          </p>
        }
      >
        <div class="flex-center gap-2">
          <Button
            variant="destructive"
            onClick={handleDeleteComparison}
            className="gap-2 bg-gray-200 text-red-600 dark:text-red-400 hover:text-white dark:bg-dark-field"
            disabled={products.length === 0}
          >
            حذف
          </Button>
          <Button
            variant="ghost"
            onClick={handleSaveComparison}
            className="bg-yellow-500 text-primary-800  font-medium"
          >
            ذخیره مقایسه
          </Button>
        </div>
      </PageHeader>

      {/* Products Grid */}
      <div class="flex gap-6">
        <div class="max-w-48">
          <AddProductColumn onAdd={handleAddProduct} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {products.map((product) => (
            <ProductComparisonColumn
              key={product.id}
              product={product}
              onRemove={() => handleRemoveProduct(product.id)}
            />
          ))}

          {/* Add Product Column */}
        </div>
      </div>

      {/* Comparison Table */}
      {products.length > 0 && <ComparisonTable products={products} features={comparisonFeatures} />}

      {/* Feature Highlights */}
      {products.length > 0 && <FeatureHighlightCards products={products} />}
    </div>
  );
}
