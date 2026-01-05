"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductComparisonColumn from "@/template/Dashboard/Comparisons/ProductComparisonColumn";
import ComparisonTable from "@/template/Dashboard/Comparisons/ComparisonTable";
import FeatureHighlightCards from "@/template/Dashboard/Comparisons/FeatureHighlightCards";
import AddProductColumn from "@/template/Dashboard/Comparisons/AddProductColumn";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import DashboardLayout from "@/layout/DashboardLayout";

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

  const ActionBtns = () => (
    <div className="flex-center gap-2 sm:gap-2 w-full sm:w-auto">
      <Button
        variant="destructive"
        onClick={handleDeleteComparison}
        className="gap-1 max-md:w-full sm:gap-2 bg-gray-200 text-red-600 dark:text-red-400 hover:text-white dark:bg-dark-field text-xs sm:text-sm w-full sm:w-auto"
        disabled={products.length === 0}
      >
        حذف
      </Button>
      <Button
        variant="ghost"
        onClick={handleSaveComparison}
        className="bg-yellow-500 max-md:w-full text-primary-800 font-medium text-xs sm:text-sm w-full sm:w-auto"
      >
        ذخیره مقایسه
      </Button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:gap-6">
        <PageHeader
          title="مقایسه محصولات - کنترلر پلی استیشن"
          description={
            <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">
              دسته بندی :{" "}
              <span className="px-2 py-1 dark:bg-dark-blue dark:text-primary-300 bg-primary-100 text-primary-800 rounded-md text-xs sm:text-sm">
                {category}
              </span>
            </p>
          }
          actionButton={
            <div className="md:hidden">
              <ActionBtns />
            </div>
          }
        >
          <div className="max-md:hidden">
            <ActionBtns />
          </div>
        </PageHeader>

        {/* Products Grid */}
        <div className="flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
          <div className="w-full md:max-w-48">
            <AddProductColumn onAdd={handleAddProduct} />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1">
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
    </DashboardLayout>
  );
}
