"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export default function UserStatsCard({ icon: Icon, label, value, variant, badgeClassName }) {
  const getVariantClass = () => {
    if (badgeClassName) return badgeClassName;
    switch (variant) {
      case "success":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "danger":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      default:
        return "bg-primary-500/20 text-primary-400 border-primary-500/40";
    }
  };

  return (
    <div className="rounded-xl border border-gray-600/80 bg-gray-800/30 p-3 sm:p-4 text-right transition-colors hover:border-gray-500/60" dir="rtl">
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-gray-400 justify-end flex-row-reverse">
        <Icon size={16} className="shrink-0 sm:w-[18px] sm:h-[18px]" />
        <span className="text-[11px] sm:text-xs font-medium">{label}</span>
      </div>
      <div className="flex justify-end">
        {badgeClassName || variant ? (
          <Badge variant="outline" className={`${getVariantClass()} text-[11px] sm:text-xs font-medium`}>
            {value}
          </Badge>
        ) : (
          <p className="text-white font-medium text-xs sm:text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}
