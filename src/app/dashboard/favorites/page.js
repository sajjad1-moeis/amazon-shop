"use client";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import FavoriteCard from "@/template/Dashboard/Favorites/FavoriteCard";
import FavoritesFilter from "@/template/Dashboard/Favorites/FavoritesFilter";
import AddFavoriteModal from "@/template/Dashboard/Favorites/AddFavoriteModal";
import { Add } from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userWishlistService } from "@/services/userWishlist/userWishlistService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Link from "next/link";

function mapWishlistToProduct(item) {
  return {
    id: item.id,
    productId: item.productId,
    title: item.productName ?? "-",
    image: item.productImageUrl ?? "/image/Home/product.png",
    currentPrice: item.productPrice != null ? String(item.productPrice) : "-",
    lowestPrice: item.productPrice != null ? String(item.productPrice) : "-",
    highestPrice: item.productPrice != null ? String(item.productPrice) : "-",
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

  const products = items.map(mapWishlistToProduct);

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
        ) : (
        <div className="space-y-4 mt-6">
          {products.map((product) => (
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
