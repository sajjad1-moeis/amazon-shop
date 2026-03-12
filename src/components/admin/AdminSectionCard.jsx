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
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700/60">
          {Icon && (
            <div className="p-2 rounded-xl bg-gray-700/50 shrink-0">
              <Icon size={18} className="text-emerald-400/90" />
            </div>
          )}
          {title && (
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h2>
          )}
        </div>
      )}
      <div className="p-3 md:p-6">{children}</div>
    </div>
  );
}
