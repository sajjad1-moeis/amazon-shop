"use client";

import React, { useState, useEffect } from "react";
import { contactService } from "@/services/contact/contactService";
import { Badge } from "@/components/ui/badge";

export default function ContactStats({ totalCount, currentPage, totalPages, unreadCount }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
      <div className="text-gray-400">
        تعداد کل: <span className="text-white font-medium">{totalCount}</span>
      </div>
      {unreadCount !== undefined && unreadCount !== null && (
        <div className="flex items-center gap-2">
          <span className="text-gray-400">خوانده نشده:</span>
          <Badge
            variant="outline"
            className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 font-medium"
          >
            {unreadCount}
          </Badge>
        </div>
      )}
      <div className="text-gray-400">
        صفحه <span className="text-white font-medium">{currentPage}</span> از{" "}
        <span className="text-white font-medium">{totalPages}</span>
      </div>
    </div>
  );
}

