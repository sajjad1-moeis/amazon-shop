"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function UserInfoCard({ icon: Icon, label, value, isLink = false, href, target, status }) {
  const getStatusBadge = () => {
    if (status === "success") {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{value}</Badge>;
    }
    if (status === "warning") {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{value}</Badge>;
    }
    return null;
  };

  const content = (
    <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </div>
      {status ? (
        getStatusBadge()
      ) : (
        <p className={`text-white text-lg font-medium ${isLink ? "hover:text-blue-400 transition-colors" : ""}`}>
          {value || "-"}
        </p>
      )}
    </div>
  );

  if (isLink && href) {
    return (
      <Link href={href} target={target} className="block">
        {content}
      </Link>
    );
  }

  return content;
}


