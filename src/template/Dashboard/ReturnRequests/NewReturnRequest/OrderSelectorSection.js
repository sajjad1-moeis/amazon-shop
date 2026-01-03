"use client";

import React, { useState } from "react";
import OrderFilters from "../OrderFilters";
import OrderProductSelector from "../OrderProductSelector";
import ReturnRequestsFilter from "../ReturnRequestsFilter";

export default function OrderSelectorSection({ orders, selectedItem, onSelect }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      <p>انتخاب سفارش</p>
      <div class="dark:text-dark-title text-primary-700 dark:bg-dark-blue bg-primary-50 w-max text-sm p-2 rounded-lg mb-8 mt-4">
        فقط محصولاتی را می‌توانید مرجوع کنید که شرایط مرجوعی را داشته باشند
      </div>

      <OrderProductSelector orders={filteredOrders} selectedItem={selectedItem} onSelect={onSelect} />
    </div>
  );
}
