"use client";

import React from "react";

/**
 * کامپوننت برای نمایش فیلترها در Drawer موبایل
 * هر فیلتر در یک باکس جداگانه
 */
export default function FilterDrawerContent({ filterSelects }) {
  const getFilterLabel = (filterElement) => {
    return filterElement?.props?.placeholder || "فیلتر";
  };

  return (
    <div className="space-y-4 p-4 w-full">
      {filterSelects.map((filter, index) => {
        // Clone کردن فیلتر با prop isInDrawer
        const clonedFilter = React.cloneElement(filter, {
          ...filter.props,
          isInDrawer: true,
        });

        return <div className="!w-full">{clonedFilter}</div>;
      })}
    </div>
  );
}
