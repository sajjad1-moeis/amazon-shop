"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import OrdersTabs from "./OrdersTabs";
import OrdersFilter from "./OrdersFilter";
import OrderCard from "./OrderCard";
import { toast } from "sonner";
import { Box, Truck, Buildings2 } from "iconsax-reactjs";

const initialOrders = [
  {
    id: "1",
    orderNumber: "۸-۴۵۲۱۹",
    orderDate: "۱۴۰۳/۱۰/۱۸",
    itemsCount: 4,
    totalAmount: "۴,۲۸۰,۰۰۰",
    status: "to-iran",
    paymentStatus: "پرداخت کامل",
    needsSecondPayment: false,
    products: [
      {
        id: "p1",
        name: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
        quantity: 1,
        price: 27450000,
        image: "/images/products/ps5.jpg",
      },
      {
        id: "p2",
        name: "m - Advanced ming Console",
        quantity: 1,
        price: 15000000,
        image: null,
      },
    ],
    timeline: {
      currentStepIndex: 2,
      productName: "محصول اول",
      steps: [
        { id: "clearance", label: "ترخیص", Icon: Box },
        { id: "to-iran", label: "ارسال به ایران", Icon: Truck },
        { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
      ],
    },
  },
  {
    id: "2",
    orderNumber: "۷-۴۵۲۱۸",
    orderDate: "۱۴۰۳/۱۰/۱۷",
    itemsCount: 2,
    totalAmount: "۳,۵۰۰,۰۰۰",
    status: "processing",
    paymentStatus: "پرداخت جزئی",
    needsSecondPayment: true,
    products: [
      {
        id: "p3",
        name: "iPhone 15 Pro Max",
        quantity: 1,
        price: 35000000,
        image: null,
      },
    ],
    timeline: {
      currentStepIndex: 1,
      productName: "محصول اول",
      steps: [
        { id: "clearance", label: "ترخیص", Icon: Box },
        { id: "to-iran", label: "ارسال به ایران", Icon: Truck },
        { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
      ],
    },
  },
  {
    id: "3",
    orderNumber: "۶-۴۵۲۱۷",
    orderDate: "۱۴۰۳/۱۰/۱۶",
    itemsCount: 1,
    totalAmount: "۱,۲۰۰,۰۰۰",
    status: "delivered",
    paymentStatus: "پرداخت کامل",
    needsSecondPayment: false,
    products: [
      {
        id: "p4",
        name: "Samsung Galaxy S24 Ultra",
        quantity: 1,
        price: 12000000,
        image: null,
      },
    ],
    timeline: {
      currentStepIndex: 3,
      productName: "محصول اول",
      steps: [
        { id: "clearance", label: "ترخیص", Icon: Box },
        { id: "to-iran", label: "ارسال به ایران", Icon: Truck },
        { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
      ],
    },
  },
];

export default function OrdersList() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
    paymentStatus: "",
  });

  // Ensure all orders have timeline
  const ordersWithTimeline = useMemo(() => {
    return initialOrders.map((order) => {
      if (!order.timeline) {
        return {
          ...order,
          timeline: {
            currentStepIndex: 1,
            productName: "محصول اول",
            steps: [
              { id: "clearance", label: "ترخیص", Icon: Box },
              { id: "to-iran", label: "ارسال به ایران", Icon: Truck },
              { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
            ],
          },
        };
      }
      return order;
    });
  }, []);

  // Filter orders based on active tab and filters
  const filteredOrders = useMemo(() => {
    let result = [...ordersWithTimeline];

    // Filter by active tab
    if (activeTab !== "all") {
      result = result.filter((order) => order.status === activeTab);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.products.some((p) => p.name.toLowerCase().includes(query))
      );
    }

    // Filter by status
    if (filters.status && filters.status !== "all") {
      result = result.filter((order) => order.status === filters.status);
    }

    // Filter by payment status
    if (filters.paymentStatus && filters.paymentStatus !== "all") {
      const paymentMap = {
        full: "پرداخت کامل",
        partial: "پرداخت جزئی",
        pending: "در انتظار پرداخت",
      };
      result = result.filter((order) => order.paymentStatus === paymentMap[filters.paymentStatus]);
    }

    return result;
  }, [activeTab, filters]);

  const handleViewDetails = (orderId) => {
    // Navigate to order details page
    toast.info(`مشاهده جزئیات سفارش ${orderId}`);
  };

  const handleDownloadInvoice = (orderId) => {
    // Download invoice
    toast.success("فاکتور با موفقیت دانلود شد");
  };

  const handleSecondPayment = (orderId) => {
    // Navigate to payment page
    toast.info(`پرداخت مرحله دوم سفارش ${orderId}`);
  };

  return (
    <div dir="rtl">
      {/* Page Header */}
      <PageHeader title="سفارش های من" description="تاریخچه و وضعیت تمام سفارش های شما" />

      {/* Tabs */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <OrdersTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Filters Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <OrdersFilter filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Orders List - Grid 2 Columns */}
      {filteredOrders.length === 0 ? (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-gray-500 dark:text-gray-400">سفارشی یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
              onDownloadInvoice={handleDownloadInvoice}
              onSecondPayment={handleSecondPayment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
