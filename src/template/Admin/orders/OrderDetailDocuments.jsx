"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentText } from "iconsax-reactjs";

export default function AdminOrderDetailDocuments({ documents = [] }) {
  if (!documents?.length) return null;

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <DocumentText size={20} />
        مستندات سفارش
      </h2>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id ?? doc.name}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-600/50 border border-gray-600"
          >
            <div className="flex items-center gap-3">
              <DocumentText size={20} className="text-blue-400 shrink-0" />
              <div>
                <p className="text-gray-200 font-medium">{doc.name ?? doc.title ?? "مستند"}</p>
                <p className="text-gray-500 text-xs">{doc.date ?? doc.createdAt ?? ""}</p>
              </div>
            </div>
            {doc.url && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:bg-blue-400/20"
                onClick={() => window.open(doc.url, "_blank")}
              >
                دانلود
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
