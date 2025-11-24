import React from "react";
import ProductRowCard from "./ProductRowCard";
import ProductCard from "@/components/ProductCard";

export default function ProductList({ viewMode }) {
  const products = [1, 2, 3, 4];

  return (
    <div>
      {viewMode === "list" ? (
        <div className="w-full space-y-4 bg-white ">
          {products.map((item) => (
            <ProductRowCard key={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard key={item} />
          ))}
        </div>
      )}
    </div>
  );
}
