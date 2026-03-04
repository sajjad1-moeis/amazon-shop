"use client";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import FavoriteCard from "@/template/Dashboard/Favorites/FavoriteCard";
import FavoritesFilter from "@/template/Dashboard/Favorites/FavoritesFilter";
import AddFavoriteModal from "@/template/Dashboard/Favorites/AddFavoriteModal";
import { Add } from "iconsax-reactjs";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userWishlistService } from "@/services/userWishlist/userWishlistService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Link from "next/link";

function mapWishlistToProduct(item) {
  const createdAtRaw =
    item.createdAt ??
    item.creationDate ??
    item.addedAt ??
    item.createdOn ??
    item.insertDate;
  const createdAt = createdAtRaw ? new Date(createdAtRaw).getTime() : null;

  const isActive =
    item.trackingStatus != null
      ? String(item.trackingStatus).toLowerCase() === "active"
      : item.isActive != null
        ? Boolean(item.isActive)
        : true;

  return {
    id: item.id,
    productId: item.productId,
    title: item.productName ?? "-",
    image: item.productImageUrl ?? "/image/Home/product.png",
    currentPrice: item.productPrice != null ? String(item.productPrice) : "-",
    lowestPrice: item.productPrice != null ? String(item.productPrice) : "-",
    highestPrice: item.productPrice != null ? String(item.productPrice) : "-",
    brand: item.brand ?? item.brandName ?? item.sellerBrand ?? "",
    trackingStatus: isActive ? "active" : "inactive",
    createdAt,
  };
}

export default function FavoritesPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "",
    trackingStatus: "",
    brand: "",
    searchQuery: "",
  });
  const [isAddFavoriteModalOpen, setIsAddFavoriteModalOpen] = useState(false);

  const fetchWishlist = () => {
    if (userId == null) return;
    setLoading(true);
    userWishlistService
      .getWishlist(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  const handleRemove = async (productId) => {
    if (userId == null) return;
    try {
      await userWishlistService.delete(userId, productId);
      setItems((prev) => prev.filter((i) => String(i.productId) !== String(productId)));
      toast.success("از لیست آرزو حذف شد");
    } catch (e) {
      toast.error(e?.message ?? "خطا در حذف");
    }
  };

  const handleAddFavorite = async (data) => {
    if (userId == null) return;
    try {
      await userWishlistService.addToWishlist(userId, data);
      fetchWishlist();
      setIsAddFavoriteModalOpen(false);
      toast.success("به لیست آرزو اضافه شد");
    } catch (e) {
      toast.error(e?.message ?? "خطا در افزودن");
    }
  };

  const products = useMemo(
    () => items.map(mapWishlistToProduct),
    [items],
  );

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (filters.searchQuery) {
      const q = filters.searchQuery.trim().toLowerCase();
      if (q) {
        list = list.filter(
          (p) =>
            p.title &&
            String(p.title).toLowerCase().includes(q),
        );
      }
    }

    if (filters.brand) {
      const b = String(filters.brand).toLowerCase();
      list = list.filter(
        (p) =>
          p.brand &&
          String(p.brand).toLowerCase().includes(b),
      );
    }

    if (filters.trackingStatus) {
      list = list.filter(
        (p) => p.trackingStatus === filters.trackingStatus,
      );
    }

    if (filters.sortBy === "newest") {
      list = list.slice().sort((a, b) => {
        if (a.createdAt == null && b.createdAt == null) return 0;
        if (a.createdAt == null) return 1;
        if (b.createdAt == null) return -1;
        return b.createdAt - a.createdAt;
      });
    } else if (filters.sortBy === "oldest") {
      list = list.slice().sort((a, b) => {
        if (a.createdAt == null && b.createdAt == null) return 0;
        if (a.createdAt == null) return 1;
        if (b.createdAt == null) return -1;
        return a.createdAt - b.createdAt;
      });
    }

    return list;
  }, [products, filters]);

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده علاقه‌مندی‌ها وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader
        actionButton={
          <Button
            onClick={() => setIsAddFavoriteModalOpen(true)}
            className="bg-yellow-500 w-full hover:bg-yellow-600 text-primary-800 md:hidden"
          >
            افزودن علاقه‌مندی جدید
            <Add size={24} />
          </Button>
        }
        title="علاقه مندی ها"
        description="لیست محصولاتی که ذخیره کرده اید."
      >
          <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 max-md:text-xs max-xl:text-sm">
          <div className="flex xl:flex-row flex-col gap-3 lg:gap-4">
            <p className="text-gray-500 dark:text-dark-text">
              تعداد محصولات: <span className="text-yellow-600">{items.length}</span>
            </p>
          </div>
          <Button
            onClick={() => setIsAddFavoriteModalOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 max-md:hidden"
          >
            افزودن علاقه‌مندی جدید
            <Add size={24} />
          </Button>
        </div>
      </PageHeader>

      <div>
        {/* Filter Section */}
        <FavoritesFilter filters={filters} onFiltersChange={handleFilterChange} />

        {/* Products List */}
        {loading ? (
          <div className="flex justify-center py-12 mt-6">
            <Spinner size="lg" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="mt-6 py-12 text-center text-gray-500 dark:text-dark-text">
            {items.length === 0
              ? "هنوز محصولی به لیست علاقه‌مندی‌ها اضافه نکرده‌اید."
              : "محصولی با این فیلترها پیدا نشد. لطفاً فیلترها را تغییر دهید."}
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {filteredProducts.map((product) => (
              <FavoriteCard
                key={product.id ?? product.productId}
                product={product}
                onRemove={product.productId ? () => handleRemove(product.productId) : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Favorite Modal */}
      <AddFavoriteModal
        open={isAddFavoriteModalOpen}
        onOpenChange={setIsAddFavoriteModalOpen}
        onSubmit={handleAddFavorite}
      />
    </DashboardLayout>
  );
}
