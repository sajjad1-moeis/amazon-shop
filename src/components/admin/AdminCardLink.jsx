"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft2 } from "iconsax-reactjs";

/**
 * کارت لینک‌دار برای صفحه تنظیمات و منوهای مشابه — یکدست با بقیه پنل
 */
export default function AdminCardLink({ href, title, description, icon: Icon }) {
  return (
    <Link href={href}>
      <div className="group flex items-center gap-4 p-5 rounded-xl border border-gray-600 bg-gray-700/30 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200">
        {Icon && (
          <div className="p-3 rounded-xl bg-gray-600/50 group-hover:bg-gray-600 shrink-0">
            <Icon size={24} className="text-amber-400" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-semibold group-hover:text-amber-400/90 transition-colors">
            {title}
          </h3>
          {description && <p className="text-gray-400 text-sm mt-0.5">{description}</p>}
        </div>
        <ArrowLeft2 size={20} className="text-gray-500 group-hover:text-amber-400/80 shrink-0 transition-transform group-hover:-translate-x-0.5" />
      </div>
    </Link>
  );
}
