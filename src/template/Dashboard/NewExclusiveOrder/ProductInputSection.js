"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { filterInputStyles } from "@/utils/filterStyles";
import { cn } from "@/lib/utils";

export default function ProductInputSection({ productLink, onProductLinkChange, onSearch }) {
  return (
    <div>
      <div className="space-y-4">
        <Label htmlFor="product-link" className="text-sm font-medium text-gray-700 dark:text-dark-text">
          محصول
        </Label>
        <div className="flex gap-2">
          <Input
            id="product-link"
            type="text"
            placeholder="لینک کامل آمازون یا ASIN را وارد کنید"
            value={productLink}
            onChange={(e) => onProductLinkChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className={cn("flex-1 bg-gray-50 border border-gray-200", filterInputStyles)}
            dir="rtl"
          />
          <Button
            type="button"
            onClick={onSearch}
            className="bg-primary-600 hover:bg-primary-700 dark:bg-dark-primary dark:hover:bg-primary-600 text-white"
          >
            جستجو
          </Button>
        </div>
      </div>
    </div>
  );
}
