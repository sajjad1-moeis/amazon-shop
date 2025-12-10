"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function PageHeader({ title, description, actionButton }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
          {description && <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{description}</p>}
        </div>
        {actionButton && <div>{actionButton}</div>}
      </div>
    </div>
  );
}

