"use client";

import React from "react";

/**
 * کارت یکدست برای بخش‌های پنل ادمین — هدر با آیکن + محتوا
 */
export default function AdminSectionCard({ title, icon: Icon, children, className = "" }) {
  return (
    <div
      className={`bg-gray-700/30 rounded-xl border border-gray-600 overflow-hidden ${className}`}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-600 bg-gray-800/30">
          {Icon && (
            <div className="p-2 rounded-lg bg-gray-600/50 shrink-0">
              <Icon size={20} className="text-amber-400" />
            </div>
          )}
          {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
