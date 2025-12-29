"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import ProductInputSection from "./ProductInputSection";
import ProductCard from "./ProductCard";
import PriceCalculationDetails from "./PriceCalculationDetails";
import ShippingMethodSection from "./ShippingMethodSection";
import PaymentMethodSection from "./PaymentMethodSection";

// Mock product data - در واقع باید از API بیاید
const MOCK_PRODUCT = {
  id: 1,
  name: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
  brand: "SONY",
  image: "/image/Home/product.png",
  available: true,
  seller: "Amazon.ae",
  weight: "۴۲۰ g",
  currentPrice: "AED ۹۴۹.۰۰",
  amazonPrice: "۱,۲۹۹ AED",
  shippingCost: "۱,۲۹۹ AED",
  customsFee: "۱,۲۰۰,۰۰۰",
  serviceFee: "۱,۲۰۰,۰۰۰",
  estimatedTotal: "۱,۴۴۴,۰۰۰",
};

export default function NewExclusiveOrder() {
  const router = useRouter();
  const [productLink, setProductLink] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("normal");
  const [paymentMethod, setPaymentMethod] = useState("two-stage");

  const handleProductSearch = () => {
    if (productLink.trim()) {
      // در واقع باید API call شود
      setSelectedProduct(MOCK_PRODUCT);
    }
  };

  const handleSubmit = () => {
    if (!selectedProduct) {
      alert("لطفاً محصول را وارد کنید");
      return;
    }
    // Handle order submission
    console.log("Order submitted:", {
      product: selectedProduct,
      shippingMethod,
      paymentMethod,
    });
    // Redirect to orders list
    router.push("/dashboard/exclusive-amazon");
  };

  return (
    <div dir="rtl">
      <PageHeader
        title="ثبت سفارش جدید"
        description="برای ثبت سفارش خرید اختصاصی از آمازون اطلاعات زیر را وارد کنید"
      />

      <div className="mt-6 space-y-6">
        <ProductInputSection
          productLink={productLink}
          onProductLinkChange={setProductLink}
          onSearch={handleProductSearch}
        />

        {selectedProduct && (
          <>
            <ProductCard product={selectedProduct} />
            <PriceCalculationDetails product={selectedProduct} />
            <ShippingMethodSection
              selectedMethod={shippingMethod}
              onMethodChange={setShippingMethod}
            />
            <PaymentMethodSection
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-dark-title font-medium px-8 py-3 rounded-lg"
              >
                ثبت سفارش اختصاصی
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

