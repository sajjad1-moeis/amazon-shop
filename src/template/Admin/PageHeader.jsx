"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SearchNormal1 } from "iconsax-reactjs";

export default function PageHeader({
  title,
  buttonText,
  buttonIcon,
  buttonHref,
  onButtonClick,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  buttonClassName = "bg-blue-600 hover:bg-blue-700",
}) {
  const ButtonComponent = buttonHref ? (
    <Link href={buttonHref}>
      <Button className={buttonClassName}>
        {buttonIcon} {buttonText}
      </Button>
    </Link>
  ) : buttonText ? (
    <Button className={buttonClassName} onClick={onButtonClick}>
      {buttonIcon} {buttonText}
    </Button>
  ) : null;

  return (
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4 mb-5">
      <h1 className="text-xl text-gray-100">{title}</h1>
      <div className="flex items-center gap-3">
        {ButtonComponent}
        {searchPlaceholder && (
          <div className="relative bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg h-[43px]">
            <input
              value={searchValue || ""}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              type="text"
              placeholder={searchPlaceholder}
              className="max-md:w-full bg-transparent lg:max-w-40 text-white h-full placeholder-gray-400 pr-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            />
            <button type="submit" className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400 p-2">
              <SearchNormal1 size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

