"use client";

import React from "react";
import SearchBarTopTable from "./SearchBarTopTable";

export default function PageHeaderWithSearch({
  title,
  searchPlaceholder,
  onSearchChange,
  inputContainerClass = "flex",
  children,
}) {
  return (
    <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
      <h1 className="text-xl text-gray-100">{title}</h1>
      <SearchBarTopTable
        placeholder={searchPlaceholder}
        onInput={onSearchChange}
        inputContainerClass={inputContainerClass}
      >
        {children}
      </SearchBarTopTable>
    </div>
  );
}

