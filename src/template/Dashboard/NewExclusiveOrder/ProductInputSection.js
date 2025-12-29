"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProductInputSection({ productLink, onProductLinkChange, onSearch }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
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
            className="flex-1"
            dir="rtl"
          />
          <Button type="button" onClick={onSearch} className="bg-blue-600 hover:bg-blue-700 text-white">
            جستجو
          </Button>
        </div>
      </div>
    </div>
  );
}

