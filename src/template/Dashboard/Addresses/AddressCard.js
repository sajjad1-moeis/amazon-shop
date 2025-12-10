"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  const isDefault = address.isDefault || false;

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 border-2 transition-all",
        isDefault
          ? "bg-gray-50 dark:bg-gray-700/50 border-primary-300 dark:border-primary-500"
          : "border-gray-200 dark:border-gray-700"
      )}
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Address Info */}
        <div className="flex-1">
          {/* Default Badge */}
          {isDefault && (
            <div className="mb-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-primary-100 text-primary-700 border-primary-300 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-500"
                disabled
              >
                آدرس پیش فرض
              </Button>
            </div>
          )}

          {/* Name */}
          <div className="mb-2">
            <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{address.name}</p>
          </div>

          {/* Contact Number */}
          <div className="mb-2">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              شماره تماس: <span className="font-medium text-gray-900 dark:text-white">{address.mobile}</span>
            </p>
          </div>

          {/* Province / City */}
          <div className="mb-2">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              استان / شهر:{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {address.province} / {address.city}
              </span>
            </p>
          </div>

          {/* Postal Code */}
          <div className="mb-2">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              کد پستی: <span className="font-medium text-gray-900 dark:text-white">{address.postalCode}</span>
            </p>
          </div>

          {/* Full Address */}
          <div className="mb-4">
            <p className="text-sm md:text-base text-gray-900 dark:text-white">{address.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 md:flex-col md:items-end">
          {/* Edit and Delete Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              aria-label="ویرایش آدرس"
            >
              <Edit2 size={20} className="text-blue-500 dark:text-blue-400" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              aria-label="حذف آدرس"
            >
              <Trash size={20} className="text-red-500 dark:text-red-400" />
            </button>
          </div>

          {/* Set Default Button */}
          {!isDefault && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSetDefault}
              className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 text-xs md:text-sm"
            >
              انتخاب به عنوان پیش فرض
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

