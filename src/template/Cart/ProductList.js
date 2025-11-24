import React from "react";
import CartItem from "./CartItem";

export default function ProductList() {
  const products = [1, 2, 3, 4];

  return (
    <div className="mt-4">
      <div className="w-full space-y-4 ">
        {products.map((item) => (
          <CartItem key={item} />
        ))}
      </div>
    </div>
  );
}
