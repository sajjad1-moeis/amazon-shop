"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductComparisonColumn from "@/template/Dashboard/Comparisons/ProductComparisonColumn";
import ComparisonTable from "@/template/Dashboard/Comparisons/ComparisonTable";
import FeatureHighlightCards from "@/template/Dashboard/Comparisons/FeatureHighlightCards";
import AddProductColumn from "@/template/Dashboard/Comparisons/AddProductColumn";
import AddFavoriteModal from "@/template/Dashboard/Favorites/AddFavoriteModal";
import Link from "next/link";
import IndexLayout from "@/layout/IndexLayout";
import { useAuth } from "@/contexts/AuthContext";
import { compareService } from "@/services/compare/compareService";
import { unwrapApiData } from "@/services/api/client";
import { buildComparisonFeatures } from "@/utils/compareUtils";
import { Spinner } from "@/components/ui/spinner";

export default function ProductComparison() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);

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

  const comparisonFeatures = buildComparisonFeatures(products);

  const handleRemoveProduct = async (productId) => {
    try {
      await compareService.remove({ productId, userId: userId ?? undefined });
      setProducts((prev) =>
        prev.filter((p) => p.id !== productId && String(p.productId) !== String(productId))
      );
      toast.success("محصول از مقایسه حذف شد");
    } catch (e) {
      toast.error(e?.message ?? "خطا در حذف");
    }
  };

  const handleSaveComparison = () => {
    setIsFavoriteModalOpen(true);
  };

  return (
    <IndexLayout>
      <div className="flex flex-col gap-4 sm:gap-6 pb-20">
        <div className="py-4 border-b-2 border-gray-200 dark:border-dark-stroke mb-8">
          <div className="container flex-between">
            <p className="text-gray-500 dark:text-dark-text max-md:text-sm">
              مقایسه محصولات{" "}
              <span className="text-yellow-600">{products.length} محصول</span>
            </p>
            <Button
              variant="ghost"
              onClick={handleSaveComparison}
              disabled={products.length === 0}
              className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 font-medium text-xs sm:text-sm w-auto"
            >
              ذخیره مقایسه
            </Button>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-6 mb-6">
            <div className="w-full md:max-w-48">
              <AddProductColumn href="/products" />
            </div>
            {loading ? (
              <div className="flex-1 flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : products.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <p className="text-gray-500 dark:text-dark-text mb-4">هنوز محصولی برای مقایسه اضافه نشده است.</p>
                <Button asChild variant="default" className="bg-primary-600 hover:bg-primary-700">
                  <Link href="/products">مشاهده محصولات</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 flex-1">
                {products.map((product) => (
                  <ProductComparisonColumn
                    key={product.id ?? product.productId}
                    product={product}
                    onRemove={() =>
                      handleRemoveProduct(product.id ?? product.productId)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {!loading && products.length > 0 && (
            <>
              <ComparisonTable products={products} features={comparisonFeatures} />
              <FeatureHighlightCards products={products} />
            </>
          )}
        </div>
      </div>

      <AddFavoriteModal open={isFavoriteModalOpen} onOpenChange={setIsFavoriteModalOpen} />
    </IndexLayout>
  );
}
