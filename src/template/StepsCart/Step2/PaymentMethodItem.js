import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import InstallmentTypeSelector from "./InstallmentTypeSelector";

export default function PaymentMethodItem({
  method,
  isSelected,
  onSelect,
  selectedInstallmentType,
  setSelectedInstallmentType,
}) {
  const Icon = method.icon;
  const isInstallment = method.id === "installment";

  return (
    <div className="space-y-3">
      <div
        onClick={() => onSelect(method.id)}
        className={cn(
          "border-2 max-lg:h-full max-md:!h-max rounded-xl p-3 md:p-4 cursor-pointer transition-all",
          isSelected
            ? "bg-primary-50 dark:bg-[#8893BF3D]  border-primary-300"
            : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
        )}
      >
        <div className="flex items-start gap-2 md:gap-4">
          {/* Radio Button */}
          <div className="flex items-center pt-1 shrink-0">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
                isSelected ? "border-primary-500 dark:border-primary-400" : "border-gray-300"
              )}
            >
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>}
            </div>
          </div>

          {/* Icon */}
          <div className={`shrink-0 ${isSelected ? "bg-primary-400" : "bg-gray-500"}  text-white p-1 rounded-md`}>
            <Icon size={18} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 max-md:text-sm">
              <h3
                className={`font-semibold ${
                  isSelected ? "text-primary-500 dark:text-dark-title" : "dark:text-dark-titre text-gray-900"
                } `}
              >
                {method.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600 max-md:text-xs dark:text-dark-text">{method.subtitle}</p>
              {method.hasInfo && (
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="اطلاعات بیشتر"
                >
                  <Info className="size-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Installment selector */}
      {isInstallment && isSelected && (
        <InstallmentTypeSelector selectedType={selectedInstallmentType} setSelectedType={setSelectedInstallmentType} />
      )}
    </div>
  );
}
