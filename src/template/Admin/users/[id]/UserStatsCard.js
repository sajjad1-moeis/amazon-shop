"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export default function UserStatsCard({ icon: Icon, label, value, variant, badgeClassName }) {
  const getVariantClass = () => {
    if (badgeClassName) return badgeClassName;
    switch (variant) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "danger":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </div>
      {badgeClassName || variant ? (
        <Badge variant="outline" className={getVariantClass()}>
          {value}
        </Badge>
      ) : (
        <p className="text-white text-lg font-medium">{value}</p>
      )}
    </div>
  );
}
