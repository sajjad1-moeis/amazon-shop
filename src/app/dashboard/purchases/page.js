"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import PurchaseCard from "@/template/Dashboard/Purchases/PurchaseCard";
import PurchasesFilter from "@/template/Dashboard/Purchases/PurchasesFilter";
import { userPurchaseService } from "@/services/userPurchase/userPurchaseService";
import { useAuth } from "@/contexts/AuthContext";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function PurchasesPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "",
    dateFilter: "",
    searchQuery: "",
  });

  useEffect(() => {
    if (userId == null) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const params = {
      userId,
      pageNumber: 1,
      pageSize: 50,
      sortBy: filters.sortBy || undefined,
      searchQuery: filters.searchQuery?.trim() || undefined,
    };
    if (filters.dateFilter) {
      const now = new Date();
      let from = null;
      if (filters.dateFilter === "week") {
        from = new Date(now);
        from.setDate(from.getDate() - 7);
      } else if (filters.dateFilter === "month") {
        from = new Date(now);
        from.setMonth(from.getMonth() - 1);
      } else if (filters.dateFilter === "year") {
        from = new Date(now);
        from.setFullYear(from.getFullYear() - 1);
      }
      if (from) {
        params.dateFrom = from.toISOString();
      }
    }
    userPurchaseService
      .getUserPurchasesPaginated(params)
      .then((data) => {
        const items = data?.items ?? data ?? [];
        setProducts(Array.isArray(items) ? items : []);
      })
      .catch((err) => {
        toast.error(err?.message ?? "خطا در دریافت خریدها");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [userId, filters.sortBy, filters.dateFilter, filters.searchQuery]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value === "all" ? "" : value }));
  };

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده خریدها وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        className="flex justify-between"
        title="خریدهای من"
        description="لیست کامل محصولاتی که خریداری کرده اید."
      >
        <p className="text-gray-500">
          تعداد کل : <span className="text-yellow-600">{products.length}</span>
        </p>
      </PageHeader>

      <PurchasesFilter filters={filters} onFiltersChange={handleFilterChange} />

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-gray-500 dark:text-dark-text">
            هنوز خریدی ثبت نکرده‌اید.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
            {products.map((product) => (
              <PurchaseCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
