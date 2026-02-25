"use client";

import FiltersSection from "@/components/module/FiltersSection";

const dynamicFiltersFromData = (categories = [], brands = []) => [
  {
    id: "categoryId",
    label: "دسته‌بندی",
    options: [{ id: "", label: "همه" }, ...categories.map((c) => ({ id: c.name ?? c, label: c.name ?? c }))],
  },
  {
    id: "brandId",
    label: "برند",
    options: [{ id: "", label: "همه" }, ...brands.map((b) => ({ id: b.name ?? b, label: b.name ?? b }))],
  },
];

export default function ProductsFilters({ categories = [], brands = [], filters = {}, onFilterChange, onClearAll }) {
  const dynamicFilters = dynamicFiltersFromData(categories, brands);
  return (
    <FiltersSection
      dynamicFilters={dynamicFilters}
      isInventory
      filters={filters}
      onFilterChange={onFilterChange}
      onClearAll={onClearAll}
    />
  );
}
