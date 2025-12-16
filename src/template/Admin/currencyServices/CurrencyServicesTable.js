"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../TableActions";

export default function CurrencyServicesTable({ services, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    const statusMap = {
      1: { label: "فعال", className: "bg-green-500/20 text-green-400 border-green-500/30" },
      2: { label: "غیرفعال", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    };
    const statusInfo = statusMap[status] || statusMap[2];
    return (
      <Badge variant="outline" className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  if (services.length === 0) {
    return <div className="p-8 text-center text-gray-400">خدمت ارزی‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام خدمت</TableHead>
          <TableHead className="text-gray-300">نوع ارز</TableHead>
          <TableHead className="text-gray-300">نرخ</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{service.name || service.title || "-"}</TableCell>
            <TableCell className="text-gray-300">{service.currencyType || service.currency || "-"}</TableCell>
            <TableCell className="text-gray-300">
              {service.rate ? `${service.rate.toLocaleString()}` : "-"}
            </TableCell>
            <TableCell>{getStatusBadge(service.status || service.isActive ? 1 : 2)}</TableCell>
            <TableCell className="text-gray-300">
              {service.createdAt ? new Date(service.createdAt).toLocaleDateString("fa-IR") : "-"}
            </TableCell>
            <TableCell>
              <TableActions
                onEdit={() => onEdit(service.id)}
                onDelete={() => onDelete(service.id)}
                showView={false}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

