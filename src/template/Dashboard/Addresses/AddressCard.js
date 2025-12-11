"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash, Location } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 relative",
        address.isDefault && "ring-2 ring-primary-500"
      )}
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Default Badge */}
      {address.isDefault && (
        <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
          پیش‌فرض
        </div>
      )}

      {/* Address Title */}
      <div className="flex items-center gap-2 mb-4">
        <Location size={20} className="text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{address.title}</h3>
      </div>

      {/* Address Details */}
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">نام گیرنده:</span> {address.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">شماره تماس:</span> {address.phone}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">آدرس:</span> {address.address}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">کد پستی:</span> {address.postalCode}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        {!address.isDefault && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetDefault(address.id)}
            className="flex-1 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
          >
            تنظیم به عنوان پیش‌فرض
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => onEdit(address)} className="gap-2">
          <Edit2 size={16} />
          ویرایش
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(address.id)}
          className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
}
