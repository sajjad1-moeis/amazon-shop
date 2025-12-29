"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentText } from "iconsax-reactjs";
import RequestDocumentModal from "./RequestDocumentModal";

export default function OrderDocumentsCard({ documents = [] }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-title">مستندات سفارش</h3>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-primary-700 hover:bg-primary-800 text-white rounded-lg gap-2 text-sm"
          >
            <DocumentText size={18} />
            درخواست مستند خرید
          </Button>
        </div>

        {documents.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400 dark:text-dark-text text-sm">
              برای این سفارش درخواست مستند ثبت نشده
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-field rounded-lg border border-gray-200 dark:border-dark-stroke"
              >
                <div className="flex items-center gap-3">
                  <DocumentText size={20} className="text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-title">{doc.name}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text">{doc.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
                  دانلود
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <RequestDocumentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

