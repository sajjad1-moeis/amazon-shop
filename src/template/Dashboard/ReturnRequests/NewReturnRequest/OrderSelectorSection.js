"use client";

import React, { useState } from "react";
import OrderFilters from "../OrderFilters";
import OrderProductSelector from "../OrderProductSelector";
import ReturnRequestsFilter from "../ReturnRequestsFilter";

export default function OrderSelectorSection({ orders, selectedItem, onSelect }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      <OrderProductSelector orders={filteredOrders} selectedItem={selectedItem} onSelect={onSelect} />
    </div>
  );
}
