"use client";

import { products } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import PurchaseCard from "@/template/Dashboard/Purchases/PurchaseCard";
import PurchasesFilter from "@/template/Dashboard/Purchases/PurchasesFilter";
import { useFilterParams } from "@/hooks/useFilterParams";

export default function Page() {
  const { filters, updateFilter } = useFilterParams({
    sortBy: "",
    dateFilter: "",
    searchQuery: "",
  });

  const handleFilterChange = (name, value) => {
    updateFilter(name, value);
  };

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader
        className={"flex justify-between"}
        title="خریدهای من"
        description="لیست کامل محصولاتی که خریداری کرده اید."
      >
        <p className="text-gray-500">
          تعداد کل : <span className="text-yellow-600">8</span>
        </p>
      </PageHeader>

      {/* Bottom Section: Filter and Products */}
      <PurchasesFilter filters={filters} onFiltersChange={handleFilterChange} />

      <div className=" mt-8">
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-6">
          {products.map((product) => (
            <PurchaseCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
