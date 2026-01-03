"use client";

import React from "react";
import { TickCircle, CloseCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import ViewAllTable from "@/components/ViewAllTable";

export default function ComparisonTable({ products, features }) {
  const getFeatureValue = (product, featureKey) => {
    return product.features?.[featureKey];
  };

  const renderFeatureValue = (value) => {
    if (typeof value === "boolean") {
      return (
        <td className={cn("py-4 px-6 ", value ? "bg-green-50 dark:bg-[#0E9F6E14]" : "bg-red-50 dark:bg-red-400/5")}>
          <div className="flex items-center gap-2 ">
            {value ? (
              <>
                <TickCircle size={20} className="text-green-600" variant="Bold" />
                <span className="text-sm text-gray-900 dark:text-dark-titre">دارد</span>
              </>
            ) : (
              <>
                <CloseCircle size={20} className="text-red-600" variant="Bold" />
                <span className="text-sm text-gray-900 dark:text-dark-titre">ندارد</span>
              </>
            )}
          </div>
        </td>
      );
    }
    return (
      <td className={cn("bg-gray-50  py-4 px-6 dark:bg-dark-box")}>
        <span className="text-sm text-gray-900 dark:text-dark-titre ">{value || "-"}</span>
      </td>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-box rounded-2xl border border-gray-200 dark:border-dark-stroke overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="dark:bg-dark-stroke">
              <tr className="border-b border-gray-200 dark:border-dark-stroke">
                <th className="text-right py-4 px-6 bg-white dark:bg-dark-bg/50 text-sm font-semibold text-gray-900 dark:text-dark-titre"></th>
                {products.map((product, index) => (
                  <th
                    key={product.id}
                    className={cn(
                      "text-center py-4 px-6 whitespace-nowrap bg-white dark:bg-dark-bg/50 text-sm font-semibold text-gray-900 dark:text-dark-titre",
                      index === 0 && " border-gray-200 dark:border-dark-stroke"
                    )}
                  >
                    {product.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIndex) => (
                <tr
                  key={feature.key}
                  className={cn(
                    "border-b border-gray-200 dark:border-dark-stroke",
                    featureIndex === features.length - 1 && "border-b-0"
                  )}
                >
                  <td className="text-right py-4 px-6 bg-gray-50 dark:bg-dark-bg/50 text-sm font-medium text-gray-700 dark:text-dark-text">
                    {feature.label}
                  </td>
                  {products.map((product, productIndex) => (
                    <>{renderFeatureValue(getFeatureValue(product, feature.key))}</>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ViewAllTable className={"lg:hidden"} />
    </>
  );
}
