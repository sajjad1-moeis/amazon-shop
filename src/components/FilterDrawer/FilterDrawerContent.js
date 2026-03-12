"use client";

import React from "react";

/**
 * کامپوننت برای نمایش فیلترها در Drawer موبایل
 * اختیاری: searchInput برای پنل ادمین موبایل (جستجو + فیلترها توی یک دراور)
 */
export default function FilterDrawerContent({ filterSelects, searchInput }) {
  return (
    <div className="flex flex-col gap-3 p-4 w-full">
      {searchInput && <div className="w-full">{searchInput}</div>}
      {filterSelects.map((filter, index) => {
        const clonedFilter = React.cloneElement(filter, {
          ...filter.props,
          isInDrawer: true,
        });

        return <div key={index}>{clonedFilter}</div>;
      })}
    </div>
  );
}
