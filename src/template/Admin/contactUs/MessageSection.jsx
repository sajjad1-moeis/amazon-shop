"use client";

import React from "react";
import { ArrowRight } from "iconsax-reactjs";

export default function MessageSection({ message }) {
  return (
    <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <ArrowRight size={20} />
        متن پیام
      </h2>
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <p className="text-gray-300 whitespace-pre-wrap leading-7">{message || "-"}</p>
      </div>
    </div>
  );
}

