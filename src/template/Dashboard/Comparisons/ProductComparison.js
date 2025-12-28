"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";
import { toast } from "sonner";
import ProductComparisonColumn from "./ProductComparisonColumn";
import ComparisonTable from "./ComparisonTable";
import FeatureHighlightCards from "./FeatureHighlightCards";
import AddProductColumn from "./AddProductColumn";

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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-title mb-2">مقایسه محصولات - کنترلر پلی استیشن</h1>
          <p className="text-gray-600 dark:text-dark-text">دسته بندی : {category}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSaveComparison}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium"
          >
            ذخیره مقایسه
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteComparison}
            className="gap-2"
            disabled={products.length === 0}
          >
            <Trash size={18} />
            حذف
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductComparisonColumn
            key={product.id}
            product={product}
            onRemove={() => handleRemoveProduct(product.id)}
          />
        ))}

        {/* Add Product Column */}
        {products.length < 3 && <AddProductColumn onAdd={handleAddProduct} />}
      </div>

      {/* Comparison Table */}
      {products.length > 0 && <ComparisonTable products={products} features={comparisonFeatures} />}

      {/* Feature Highlights */}
      {products.length > 0 && <FeatureHighlightCards products={products} />}
    </div>
  );
}

