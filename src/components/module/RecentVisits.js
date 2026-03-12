"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

function LoginLink({ children, className }) {
  return (
    <Link href="/login" className={className}>
      {children}
    </Link>
  );
}
import { userRecentViewService } from "@/services/userRecentView/userRecentViewService";
import { unwrapApiData } from "@/services/api/client";

const FOOTER_RECENT_LIMIT = 6;

function mapItemToProduct(item) {
  return {
    id: item.id ?? item.productId,
    productId: item.productId,
    title: item.productName ?? "محصول",
    image: item.productImageUrl ?? "/image/Home/product.png",
  };
}

export default function RecentVisits() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId == null) {
      setItems([]);
      return;
    }
    setLoading(true);
    userRecentViewService
      .getRecentViews(userId, FOOTER_RECENT_LIMIT)
      .then((res) => {
        const data = unwrapApiData(res);
        setItems(Array.isArray(data) ? data.map(mapItemToProduct) : []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [userId]);

  if (user == null) {
    return (
      <div>
        <p className="text-right text-gray-600 dark:text-gray-400 text-sm md:text-base">
          برای مشاهده بازدیدهای اخیر{" "}
          <LoginLink className="text-primary-500 dark:text-primary-400 hover:underline font-medium">
            وارد
          </LoginLink>{" "}
          شوید.
        </p>
        <div className="h-px bg-gray-200 dark:bg-gray-700 mt-6 mb-6" />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h3 className="md:text-2xl font-semibold text-right mb-6 text-gray-700 dark:text-white">بازدید های اخیر شما</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative aspect-square bg-gray-100 dark:bg-dark-field rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse"
            />
          ))}
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <h3 className="md:text-2xl font-semibold text-right mb-6 text-gray-700 dark:text-white">بازدید های اخیر شما</h3>
        <p className="text-right text-gray-500 dark:text-gray-400 text-sm mb-6">هنوز محصولی بازدید نکرده‌اید.</p>
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="md:text-2xl font-semibold text-right mb-6 text-gray-700 dark:text-white">بازدید های اخیر شما</h3>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6 mb-6">
        {items.map((item) => (
          <Link
            key={item.id ?? item.productId ?? item.title}
            href={item.productId ? `/product/${item.productId}` : "/products"}
            className="relative aspect-square bg-white rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-colors block"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 640px) 33vw, 20vw"
            />
          </Link>
        ))}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />
    </div>
  );
}
