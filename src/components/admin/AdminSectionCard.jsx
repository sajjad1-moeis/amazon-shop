"use client";

import React from "react";

/**
 * کارت یکدست برای بخش‌های پنل ادمین — مینیمال و حرفه‌ای
 */
export default function AdminSectionCard({ title, icon: Icon, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-700/60 bg-gray-800/40 overflow-hidden ${className}`}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-2 border-b border-gray-700/60 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
          {Icon && (
            <div className="shrink-0 rounded-xl bg-gray-700/50 p-1.5 sm:p-2">
              <Icon size={18} className="text-emerald-400/90" />
            </div>
          )}
          {title && (
            <h2 className="text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">{title}</h2>
          )}
        </div>
      )}
      <div className="p-3 md:p-6">{children}</div>
    </div>
  );
}
