"use client";

import React from "react";
import { Edit2, Trash, Location } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  showBottomBorder = true,
  removeHandler,
}) {
  return (
    <div
      dir="rtl"
      className={`bg-gray-50 dark:bg-dark-field p-3 border border-gray-100 rounded-xl overflow-hidden ${
        showBottomBorder ? "border-b border-gray-200 dark:border-dark-stroke" : ""
      }`}
    >
      {/* MAIN INFO */}
      <div className="flex-between">
        <h4 className="text-primary-500 font-medium dark:text-dark-title">{address.name}</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-dark-text">شماره تماس:</span>
          <span className="text-sm text-gray-700 dark:text-dark-titre ">{address.mobile || address.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-dark-text">استان/شهر:</span>
          <span className="text-sm text-gray-700 dark:text-dark-titre ">
            {address.province && address.city
              ? `${address.province} / ${address.city}`
              : address.city || address.province}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-dark-text">کدپستی:</span>
          <span className="text-sm text-gray-700 dark:text-dark-titre ">{address.postalCode}</span>
        </div>
        {removeHandler ||
          (address.isDefault && (
            <button
              className="text-xs font-medium px-3 py-1 rounded-md border border-primary-400 text-[#1E429F] dark:text-dark-title bg-primary-100 dark:bg-dark-blue"
              disabled
            >
              آدرس پیش فرض
            </button>
          ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-dark-stroke">
        {/* ACTIONS - سمت چپ */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-dark-text">آدرس :</span>
          <span className="text-gray-800 dark:text-dark-titre">{address.address}</span>
        </div>
        {removeHandler || (
          <div className="flex items-center gap-3 min-w-[56px]">
            {/* SET DEFAULT BUTTON - فقط اگر پیش‌فرض نیست */}
            {removeHandler ||
              (!address.isDefault && (
                <div>
                  <Button
                    variant="gray"
                    onClick={() => onSetDefault(address.id)}
                    className="text-sm text-primary-600 bg-gray-200 dark:bg-dark-stroke dark:text-primary-300 px-3 py-1 rounded-md"
                  >
                    انتخاب به عنوان پیش‌فرض
                  </Button>
                </div>
              ))}

            <button
              onClick={() => onEdit(address.id)}
              className="p-1 rounded-md hover:bg-primary-50 "
              aria-label="ویرایش"
              title="ویرایش"
            >
              <Edit2 size={20} className="text-primary-500 dark:text-dark-title" />
            </button>
            <button
              onClick={() => onDelete(address.id)}
              className="p-1 rounded-md hover:bg-red-50"
              aria-label="حذف"
              title="حذف"
            >
              <Trash size={20} className="text-red-500 dark:text-red-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
