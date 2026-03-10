"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight2 } from "iconsax-reactjs";

export default function ReportPageHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="space-y-4">
      <Link
        href="/admin/reports"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowRight2 size={18} />
        <span>بازگشت به گزارشات</span>
      </Link>
      <div className="relative rounded-2xl border border-gray-600/80 bg-gradient-to-br from-gray-700/60 via-gray-800/40 to-gray-900/30 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-4">
          {Icon && (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/20">
              <Icon size={28} className="text-amber-400" />
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-0.5">{title}</h1>
            {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
