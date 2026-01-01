"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function PageHeader({ title, description, actionButton, children }) {
  return (
    <div class="mb-4 border-b-2 border-gray-200 dark:border-dark-box pb-4">
      <div className=" flex justify-between ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-700 dark:text-dark-title mb-2">{title}</h1>
            {description && (
              <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-dark-text">{description}</p>
            )}
          </div>
        </div>

        {children}
      </div>
      {actionButton && <div className="w-full max-md:mt-4 ">{actionButton}</div>}
    </div>
  );
}
