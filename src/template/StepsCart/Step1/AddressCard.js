"use client";
import { cn } from "@/lib/utils";
import { Edit2, Location, Trash } from "iconsax-reactjs";

export default function AddressCard({ address, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "border-2 rounded-xl p-2 md:p-5 flex items-start gap-4 cursor-pointer transition-all",
        isSelected
          ? "bg-primary-50 dark:bg-white/10 dark:border-dark-stroke border-primary-300"
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      {/* Radio Button */}
      <div className="flex items-center pt-1 shrink-0">
        <div className="relative">
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
              isSelected ? "border-primary-600 dark:border-primary-400" : "border-gray-300"
            )}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-700 dark:bg-primary-400"></div>}
          </div>
        </div>
      </div>

      {/* Address Content */}
      <div className="w-full">
        <div className="flex-1 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Location variant="Bold" className="size-5 text-gray-700 dark:text-dark-titre" />
              <span className="font-semibold text-gray-900 dark:text-dark-titre max-md:text-sm">{address.name}</span>
            </div>
            <div className="flex items-start gap-2 text-sm max-md:hidden">
              <span className="text-gray-500 flex-none dark:text-[#7B7F86]">آدرس :</span>
              <span className="text-gray-900 line-clamp-2 overflow-hidden dark:text-dark-titre">{address.address}</span>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button onClick={onEdit} className=" hover:bg-blue-50 rounded transition-colors" aria-label="ویرایش آدرس">
              <Edit2 className=" text-blue-500 dark:text-primary-400" />
            </button>
            <button onClick={onDelete} className=" hover:bg-red-50 rounded transition-colors" aria-label="حذف آدرس">
              <Trash className=" text-red-500" />
            </button>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm max-md:text-xs md:hidden mt-3">
          <span className="text-gray-500 flex-none dark:text-dark-titre">آدرس :</span>
          <span className="text-gray-900 line-clamp-2 overflow-hidden dark:text-dark-text">{address.address}</span>
        </div>
      </div>
    </div>
  );
}
