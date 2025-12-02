import React from "react";
import { cn } from "@/lib/utils";

export default function InstallmentTypeSelector({ selectedType, setSelectedType }) {
  const installmentTypes = [
    { id: "20percent", title: "خرید ۲ قسطی - پیش پرداخت ۲۰٪ (۱۷ سود)" },
    { id: "30percent", title: "خرید ۲ قسطی - پیش پرداخت ۳۰٪ (۱۲ سود)" },
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 space-y-3 p-3 rounded-2xl">
      <h3 className=" text-gray-700 mb-2 md:text-xl">انتخاب نوع اقساط :</h3>
      {installmentTypes.map((type) => {
        const isSelected = selectedType === type.id;
        return (
          <div
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className="flex items-center gap-1 md:gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-all shrink-0",
                isSelected ? "border-primary-500" : "border-gray-300"
              )}
            >
              {isSelected && <div className="w-2 h-2 rounded-full bg-primary-500"></div>}
            </div>
            <span className={cn("text-sm ", isSelected ? "text-primary-500 font-medium" : "text-gray-600")}>
              {type.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
