"use client";

import React from "react";

export default function ContactInfoCard({ icon: Icon, label, value, isLink = false, href }) {
  const content = isLink ? (
    <a href={href} className="text-blue-400 hover:text-blue-300 text-lg font-medium break-all transition-colors">
      {value || "-"}
    </a>
  ) : (
    <p className="text-white text-lg font-medium">{value || "-"}</p>
  );

  return (
    <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        {Icon && <Icon size={20} />}
        <span className="text-sm">{label}</span>
      </div>
      {content}
    </div>
  );
}




