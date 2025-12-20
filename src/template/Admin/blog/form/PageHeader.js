"use client";

import React from "react";

export default function PageHeader({ title, description, children }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
      {children}
    </div>
  );
}
