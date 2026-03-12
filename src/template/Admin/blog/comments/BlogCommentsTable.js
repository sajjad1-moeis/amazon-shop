"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TickCircle, CloseCircle, Trash, MessageQuestion } from "iconsax-reactjs";
import { formatDateFa } from "@/utils/adminDateUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const STATUS_MAP = {
  1: { label: "در انتظار تأیید", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  2: { label: "تأیید شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  3: { label: "رد شده", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  4: { label: "اسپم", className: "bg-red-600/20 text-red-500 border-red-600/30" },
};

function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || STATUS_MAP[1];
  return (
    <Badge variant="outline" className={info.className}>
      {info.label}
    </Badge>
  );
}

export default function BlogCommentsTable({ comments, onApprove, onReject, onDelete }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-gray-600/50 mb-4">
          <MessageQuestion size={40} className="text-gray-400" />
        </div>
        <p className="text-gray-400 font-medium">نظری یافت نشد</p>
        <p className="text-gray-500 text-sm mt-1">با تغییر وضعیت یا عبارت جستجو دوباره امتحان کنید.</p>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-transparent">
              <TableHead className="text-gray-400 font-medium">نویسنده</TableHead>
              <TableHead className="text-gray-400 font-medium">پست</TableHead>
              <TableHead className="text-gray-400 font-medium">متن نظر</TableHead>
              <TableHead className="text-gray-400 font-medium">وضعیت</TableHead>
              <TableHead className="text-gray-400 font-medium">تاریخ</TableHead>
              <TableHead className="text-gray-400 font-medium text-left w-[120px]">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id} className="border-gray-700 hover:bg-gray-700/30 transition-colors">
                <TableCell className="text-white font-medium align-top">
                  {comment.authorName || comment.userFullName || "—"}
                </TableCell>
                <TableCell className="text-gray-300 align-top max-w-[180px] truncate" title={comment.blogTitle}>
                  {comment.blogTitle || "—"}
                </TableCell>
                <TableCell className="text-gray-300 align-top max-w-[240px]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="line-clamp-2 cursor-default">{comment.content || "—"}</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-sm p-3 text-sm">
                      {comment.content || "—"}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="align-top">
                  <StatusBadge status={comment.status} />
                </TableCell>
                <TableCell className="text-gray-400 text-sm align-top whitespace-nowrap">
                  {formatDateFa(comment.createdAt)}
                </TableCell>
                <TableCell className="align-top">
                  <div className="flex items-center gap-1">
                    {comment.status === 1 && (
                      <>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                              onClick={() => onApprove(comment.id)}
                            >
                              <TickCircle size={18} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>تأیید</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-amber-400 hover:bg-amber-400/20"
                              onClick={() => onReject(comment.id)}
                            >
                              <CloseCircle size={18} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>رد</TooltipContent>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                          onClick={() => onDelete(comment.id)}
                        >
                          <Trash size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>حذف</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
