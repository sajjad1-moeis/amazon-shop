"use client";

import React from "react";
import { cn } from "@/lib/utils";

const formatNum = (n) => (n == null || Number.isNaN(n) ? "—" : Number(n).toLocaleString("fa-IR"));

export default function ReportStatCard({ icon: Icon, label, value, suffix = "", accent = "text-white", iconBg = "bg-gray-600/50" }) {
  return (
    <div className="rounded-2xl border border-gray-600/80 bg-gradient-to-b from-gray-700/40 to-gray-800/20 p-5 hover:border-gray-500/50 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-gray-400 text-sm mb-1.5">{label}</p>
          <p className={cn("text-xl md:text-2xl font-bold tabular-nums truncate", accent)}>
            {typeof value === "number" ? formatNum(value) : value}
            {suffix && <span className="text-sm font-normal text-gray-400 ms-1">{suffix}</span>}
          </p>
        </div>
        <div className={cn("p-2.5 rounded-xl shrink-0", iconBg)}>
          <Icon size={24} className={accent} />
        </div>
      </div>
    </div>
  );
}
