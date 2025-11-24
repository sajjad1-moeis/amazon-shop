"use client";
import { cn } from "@/lib/utils";
import { Edit2, Location, Trash } from "iconsax-reactjs";

export default function AddressCard({ address, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "border-2 rounded-lg p-5 flex items-start gap-4 cursor-pointer transition-all",
        isSelected ? "bg-blue-50/50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      {/* Radio Button */}
      <div className="flex items-center pt-1 shrink-0">
        <div className="relative">
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-all",
              isSelected ? "border-primary-600" : "border-gray-300"
            )}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-700"></div>}
          </div>
        </div>
      </div>

      {/* Address Content */}
      <div className="flex-1 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Location className="size-5 text-gray-700" />
            <span className="font-semibold text-gray-900">{address.name}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-500">آدرس :</span>
            <span className="text-gray-900">{address.address}</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onEdit}
            className="p-1.5 hover:bg-blue-50 rounded transition-colors"
            aria-label="ویرایش آدرس"
          >
            <Edit2 className=" text-blue-500" />
          </button>
          <button onClick={onDelete} className="p-1.5 hover:bg-red-50 rounded transition-colors" aria-label="حذف آدرس">
            <Trash className=" text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
