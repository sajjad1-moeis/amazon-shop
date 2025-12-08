"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Eye, TickCircle, CloseCircle } from "iconsax-reactjs";

export default function ReviewsTable({ reviews }) {
  if (reviews.length === 0) {
    return <div className="p-8 text-center text-gray-400">نظری یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">مشتری</TableHead>
          <TableHead className="text-gray-300">محصول</TableHead>
          <TableHead className="text-gray-300">امتیاز</TableHead>
          <TableHead className="text-gray-300">نظر</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{review.customerName}</TableCell>
            <TableCell className="text-gray-300">{review.productName}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                  />
                ))}
              </div>
            </TableCell>
            <TableCell className="text-gray-300 max-w-xs truncate">{review.comment}</TableCell>
            <TableCell>
              <Badge variant={review.status === "approved" ? "default" : "secondary"}>
                {review.status === "approved" ? "تایید شده" : "در انتظار"}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-300">{review.date}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20">
                  <Eye size={18} />
                </Button>
                {review.status === "pending" && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-400/20">
                      <TickCircle size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-400/20">
                      <CloseCircle size={18} />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

