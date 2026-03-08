"use client";

import React from "react";

/**
 * هدر یکدست برای صفحات پنل ادمین — عنوان + توضیح + اختیاری: فیلترها (children)
 * استفاده: <AdminPageHeader title="..." subtitle="...">{فیلترها}</AdminPageHeader>
 */
export default function AdminPageHeader({ title, subtitle, icon: Icon, accentLine = true, children }) {
  return (
    <div className="relative rounded-2xl border border-gray-600/80 bg-gradient-to-b from-gray-700/40 to-gray-800/20 px-5 py-4 md:px-6 md:py-5 overflow-hidden">
      {accentLine && (
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500/70 to-transparent rounded-r-full" />
      )}
      <div className="relative flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-gray-600/50 shrink-0">
            <Icon size={22} className="text-amber-400" />
          </div>
        )}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="relative mt-4 pt-4 border-t border-gray-600/80">{children}</div>}
    </div>
  );
}
