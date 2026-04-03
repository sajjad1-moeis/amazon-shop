"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function isExternalHref(href) {
  if (!href || typeof href !== "string") return true;
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("blob:")
  );
}

export default function UserInfoCard({ icon: Icon, label, value, isLink = false, href, target, rel, status }) {
  const getStatusBadge = () => {
    if (status === "success") {
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-xs">{value}</Badge>;
    }
    if (status === "warning") {
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 text-xs">{value}</Badge>;
    }
    return null;
  };

  const content = (
    <div className="rounded-xl border border-gray-600/80 bg-gray-800/30 p-3 sm:p-4 text-right transition-colors hover:border-gray-500/60" dir="rtl">
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-gray-400 justify-end flex-row-reverse">
        <Icon size={16} className="shrink-0 sm:w-[18px] sm:h-[18px]" />
        <span className="text-[11px] sm:text-xs font-medium">{label}</span>
      </div>
      <div className="flex justify-end">
        {status ? (
          getStatusBadge()
        ) : (
          <p
            className={`text-white font-medium break-all text-xs sm:text-sm ${isLink ? "hover:text-primary-400 transition-colors" : ""}`}
            title={typeof value === "string" ? value : undefined}
          >
            {value || "-"}
          </p>
        )}
      </div>
    </div>
  );

  if (isLink && href) {
    if (isExternalHref(href)) {
      return (
        <a href={href} target={target} rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)} className="block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
