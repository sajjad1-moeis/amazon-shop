"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "iconsax-reactjs";

export default function PageHeader({ title, description, backHref, backLabel, children }) {
  return (
    <header className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5 mb-3"
        >
          <ArrowRight size={16} />
          {backLabel || "بازگشت"}
        </Link>
      )}
      <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {children}
    </header>
  );
}
