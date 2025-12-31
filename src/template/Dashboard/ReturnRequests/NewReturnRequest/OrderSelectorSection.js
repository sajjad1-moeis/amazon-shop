"use client";

import React, { useState } from "react";
import OrderFilters from "../OrderFilters";
import OrderProductSelector from "../OrderProductSelector";

export default function OrderSelectorSection({ orders, selectedItem, onSelect }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      <OrderFilters orders={orders} onFiltersChange={setFilteredOrders} />
      <OrderProductSelector orders={filteredOrders} selectedItem={selectedItem} onSelect={onSelect} />
    </div>
  );
}

