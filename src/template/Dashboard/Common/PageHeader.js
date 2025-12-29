"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function PageHeader({ title, description, actionButton, children }) {
  return (
    <div className="dark:bg-dark-box mb-4 border-b-2 border-gray-200 dark:border-dark-stroke pb-4 flex justify-between ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-primary-700 dark:text-dark-title mb-2">{title}</h1>
          {description && (
            <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-dark-text">{description}</p>
          )}
        </div>
        {actionButton && <div className="flex-shrink-0">{actionButton}</div>}
      </div>

      {children}
    </div>
  );
}
