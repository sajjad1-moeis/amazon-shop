"use client";

import React from "react";
import { Edit2, Trash, Location } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";

/**
 * AddressCard
 * - dir="rtl" برای نمایش سمت راست -> چپ (مثل عکس)
 * - actions (edit/delete) در سمت چپ
 * - اگر isDefault باشد: badge بالا سمت چپ و حذف دکمه "انتخاب به عنوان پیش‌فرض"
 */
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
      className={`bg-gray-50 p-3 border border-gray-100 rounded-xl overflow-hidden ${
        showBottomBorder ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* MAIN INFO */}
        <div className="flex-1 space-y-2">
          <h4 className="text-primary-500 font-medium">{address.name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">شماره تماس:</span>
            <span className="text-sm text-gray-700">{address.mobile || address.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">استان/شهر:</span>
            <span className="text-sm text-gray-700">
              {address.province && address.city
                ? `${address.province} / ${address.city}`
                : address.city || address.province}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">کدپستی:</span>
            <span className="text-sm text-gray-700">{address.postalCode}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          {removeHandler ||
            (address.isDefault && (
              <button
                className="text-xs font-medium px-3 py-1 rounded-md border border-primary-400 text-[#1E429F] bg-primary-100"
                disabled
              >
                آدرس پیش فرض
              </button>
            ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
        {/* ACTIONS - سمت چپ */}
        <div className="flex items-center gap-2">
          <Location size={16} className="text-gray-400" />
          <span className="text-gray-600">{address.address}</span>
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
                    className="text-sm text-primary-600 bg-gray-200 px-3 py-1 rounded-md"
                  >
                    انتخاب به عنوان پیش‌فرض
                  </Button>
                </div>
              ))}
            <button
              onClick={() => onDelete(address.id)}
              className="p-1 rounded-md hover:bg-red-50"
              aria-label="حذف"
              title="حذف"
            >
              <Trash size={20} className="text-red-500" />
            </button>

            <button
              onClick={() => onEdit(address.id)}
              className="p-1 rounded-md hover:bg-gray-50"
              aria-label="ویرایش"
              title="ویرایش"
            >
              <Edit2 size={20} className="text-[#3D63F2]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
