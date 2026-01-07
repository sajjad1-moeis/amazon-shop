"use client";

import React from "react";

/**
 * کامپوننت برای نمایش فیلترها در Drawer موبایل
 * هر فیلتر در یک باکس جداگانه با گزینه‌هایش زیرش
 */
export default function FilterDrawerContent({ filterSelects }) {
  return (
    <div className="flex flex-col gap-3 p-4 w-full">
      {filterSelects.map((filter, index) => {
        const clonedFilter = React.cloneElement(filter, {
          ...filter.props,
          isInDrawer: true,
        });

        return <div>{clonedFilter}</div>;
      })}
    </div>
  );
}
