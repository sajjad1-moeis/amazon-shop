"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TickCircle, CloseCircle, Trash } from "iconsax-reactjs";

export default function BlogCommentsTable({ comments, onApprove, onReject, onDelete }) {
  if (comments.length === 0) {
    return <div className="p-8 text-center text-gray-400">نظری یافت نشد</div>;
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      1: {
        label: "در انتظار تایید",
        className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      },
      2: {
        label: "تایید شده",
        className: "bg-green-500/20 text-green-400 border-green-500/30",
      },
      3: {
        label: "رد شده",
        className: "bg-red-500/20 text-red-400 border-red-500/30",
      },
      4: {
        label: "اسپم",
        className: "bg-red-600/20 text-red-500 border-red-600/30",
      },
    };
    const statusInfo = statusMap[status] || statusMap[1];
    return (
      <Badge variant="outline" className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نویسنده</TableHead>
          <TableHead className="text-gray-300">بلاگ</TableHead>
          <TableHead className="text-gray-300">محتوا</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comments.map((comment) => (
          <TableRow key={comment.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {comment.authorName || comment.userFullName || "-"}
            </TableCell>
            <TableCell className="text-gray-300">{comment.blogTitle || "-"}</TableCell>
            <TableCell className="text-gray-300 max-w-xs truncate">{comment.content || "-"}</TableCell>
            <TableCell>{getStatusBadge(comment.status)}</TableCell>
            <TableCell className="text-gray-300">{formatDate(comment.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {comment.status === 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                      onClick={() => onApprove(comment.id)}
                    >
                      <TickCircle size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                      onClick={() => onReject(comment.id)}
                    >
                      <CloseCircle size={18} />
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                  onClick={() => onDelete(comment.id)}
                >
                  <Trash size={18} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
