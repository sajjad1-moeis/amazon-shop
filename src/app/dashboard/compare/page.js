"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductComparisonColumn from "@/template/Dashboard/Comparisons/ProductComparisonColumn";
import ComparisonTable from "@/template/Dashboard/Comparisons/ComparisonTable";
import FeatureHighlightCards from "@/template/Dashboard/Comparisons/FeatureHighlightCards";
import AddProductColumn from "@/template/Dashboard/Comparisons/AddProductColumn";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { compareService } from "@/services/compare/compareService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const comparisonFeatures = [
  { key: "brand", label: "برند" },
  { key: "model", label: "مدل" },
  { key: "diskDrive", label: "درایو دیسک" },
  { key: "outputResolution", label: "وضوح خروجی" },
  { key: "frameRate", label: "نرخ فریم" },
  { key: "weight", label: "وزن" },
];

export default function ProductComparison() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const fetchCompare = () => {
    setLoading(true);
    compareService
      .data({ userId: userId ?? undefined })
      .then((res) => {
        const data = unwrapApiData(res);
        const list = data?.products ?? (Array.isArray(data) ? data : []);
        setProducts(Array.isArray(list) ? list : []);
        if (data?.category) setCategory(data.category);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCompare();
  }, [userId]);

  const handleRemoveProduct = async (productId) => {
    try {
      await compareService.remove({ productId, userId: userId ?? undefined });
      setProducts((prev) => prev.filter((p) => p.id !== productId && String(p.productId) !== String(productId)));
      toast.success("محصول از مقایسه حذف شد");
    } catch (e) {
      toast.error(e?.message ?? "خطا در حذف");
    }
  };

  const handleDeleteComparison = async () => {
    if (!confirm("آیا از حذف این مقایسه اطمینان دارید؟")) return;
    try {
      await compareService.clear({ userId: userId ?? undefined });
      setProducts([]);
      toast.success("مقایسه حذف شد");
    } catch (e) {
      toast.error(e?.message ?? "خطا");
    }
  };

  const handleAddProduct = () => {
    toast.info("محصول را از صفحه محصول با دکمه «افزودن به مقایسه» اضافه کنید.");
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
              {category || "—"}
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
          {loading ? (
            <div className="flex-1 flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1">
            {products.map((product) => (
              <ProductComparisonColumn
                key={product.id ?? product.productId}
                product={product}
                onRemove={() => handleRemoveProduct(product.id ?? product.productId)}
              />
            ))}
          </div>
          )}
        </div>

        {/* Comparison Table */}
        {products.length > 0 && <ComparisonTable products={products} features={comparisonFeatures} />}

        {/* Feature Highlights */}
        {products.length > 0 && <FeatureHighlightCards products={products} />}
      </div>
    </DashboardLayout>
  );
}
