"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import RecentViewCard from "@/template/Dashboard/RecentViews/RecentViewCard";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";
import RecentViewFilter from "@/template/Dashboard/RecentViews/RecentViewFilter";
import DashboardLayout from "@/layout/DashboardLayout";
import ProductSuggestions from "@/template/Dashboard/RecentViews/ProductSuggestions";
import { useAuth } from "@/contexts/AuthContext";
import { userRecentViewService } from "@/services/userRecentView/userRecentViewService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

function mapItemToProduct(item) {
  const viewedAtDate = item.viewedAt ? new Date(item.viewedAt) : null;
  const category = item.categoryName ?? item.category ?? "";
  const priceValue =
    typeof item.productPrice === "number"
      ? item.productPrice
      : item.productPrice != null
        ? Number(item.productPrice)
        : null;
  return {
    id: item.id ?? item.productId,
    productId: item.productId,
    title: item.productName ?? "-",
    price: item.productPrice != null ? String(item.productPrice) : "-",
    priceValue: Number.isFinite(priceValue) ? priceValue : null,
    image: item.productImageUrl ?? "/image/Home/product.png",
    lastViewed: viewedAtDate ? viewedAtDate.toLocaleDateString("fa-IR") : "-",
    viewedAt: viewedAtDate,
    viewCount: 1,
    inStock: true,
    category,
  };
}

export default function RecentViewsList() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "",
    dateRange: "",
    category: "",
    searchQuery: "",
  });

  const fetchViews = () => {
    if (userId == null) return;
    setLoading(true);
    userRecentViewService
      .getRecentViews(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        setProducts(Array.isArray(data) ? data.map(mapItemToProduct) : []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchViews();
  }, [userId]);

  const handleDelete = async (productId) => {
    if (userId == null) return;
    try {
      await userRecentViewService.delete(userId, productId);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(productId) && String(p.productId) !== String(productId)));
      toast.success("حذف شد");
    } catch (e) {
      toast.error(e?.message ?? "خطا در حذف");
    }
  };

  const handleClearAll = async () => {
    if (userId == null) return;
    try {
      await userRecentViewService.clear(userId);
      setProducts([]);
      toast.success("همه بازدیدها حذف شدند");
    } catch (e) {
      toast.error(e?.message ?? "خطا");
    }
  };

  const RecentBtn = () => (
    <Button
      variant="ghost"
      onClick={handleClearAll}
      disabled={products.length === 0}
      className="max-md:w-full bg-gray-200 dark:bg-dark-field text-red-600 dark:text-red-400"
    >
      <Trash />
      حذف همه بازدید‌ها
    </Button>
  );

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده بازدیدهای اخیر وارد شوید.</div>
      </DashboardLayout>
    );
  }

  const filteredProducts = React.useMemo(() => {
    let list = [...products];

    // جستجو بر اساس نام محصول
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter((p) => (p.title || "").toLowerCase().includes(q));
    }

    // فیلتر دسته‌بندی
    if (filters.category) {
      list = list.filter((p) => p.category === filters.category);
    }

    // فیلتر بازه زمانی
    if (filters.dateRange) {
      const now = new Date();
      let from = null;
      if (filters.dateRange === "today") {
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (filters.dateRange === "week") {
        from = new Date(now);
        from.setDate(from.getDate() - 7);
      } else if (filters.dateRange === "month") {
        from = new Date(now);
        from.setMonth(from.getMonth() - 1);
      } else if (filters.dateRange === "year") {
        from = new Date(now);
        from.setFullYear(from.getFullYear() - 1);
      }
      if (from) {
        list = list.filter((p) => !p.viewedAt || p.viewedAt >= from);
      }
    }

    // مرتب‌سازی
    if (filters.sortBy === "newest") {
      list.sort((a, b) => {
        const av = a.viewedAt ? a.viewedAt.getTime() : 0;
        const bv = b.viewedAt ? b.viewedAt.getTime() : 0;
        return bv - av;
      });
    } else if (filters.sortBy === "oldest") {
      list.sort((a, b) => {
        const av = a.viewedAt ? a.viewedAt.getTime() : 0;
        const bv = b.viewedAt ? b.viewedAt.getTime() : 0;
        return av - bv;
      });
    }

    return list;
  }, [products, filters]);

  return (
    <DashboardLayout>
      {/* Top Section: Header with Count */}

      <PageHeader
        actionButton={
          <div className="md:hidden">
            <RecentBtn />
          </div>
        }
        title="بازدیدهای اخیر"
        description="محصولاتی که اخیراً مشاهده کرده‌اید"
      >
        <div className="max-md:hidden">
          <RecentBtn />
        </div>
      </PageHeader>

      <RecentViewFilter filters={filters} onFiltersChange={setFilters} />

      {/* Product List Header */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 my-4 sm:my-6 md:my-8">
        <h2 className="text-base sm:text-lg md:text-xl text-primary-700 dark:text-dark-title">لیست محصولات</h2>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-dark-text">
          تعداد بازدیدها: <span className="font-semibold text-yellow-600">{filteredProducts.length}</span>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div
          className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-6 sm:p-8 text-center mb-4 sm:mb-6"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ بازدید اخیری وجود ندارد</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {filteredProducts.map((product) => (
            <RecentViewCard
              key={product.id}
              product={product}
              onDelete={product.productId ? () => handleDelete(product.productId) : undefined}
            />
          ))}
        </div>
      )}

      {/* Similar Products Section */}
      <ProductSuggestions />
    </DashboardLayout>
  );
}
