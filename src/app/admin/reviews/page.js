"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, TickCircle, CloseCircle } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    customerName: "علی محمدی",
    productName: "لپ تاپ Dell XPS 15",
    rating: 5,
    comment: "محصول عالی و با کیفیت",
    status: "approved",
    date: "1403/09/20",
  },
  {
    id: 2,
    customerName: "مریم احمدی",
    productName: "گوشی سامسونگ",
    rating: 4,
    comment: "خوب بود ولی قیمت بالایی داشت",
    status: "pending",
    date: "1403/09/19",
  },
  {
    id: 3,
    customerName: "حسین رضایی",
    productName: "هدفون Sony",
    rating: 3,
    comment: "کیفیت صدا متوسط بود",
    status: "approved",
    date: "1403/09/18",
  },
];

export default function ReviewsPage() {
  const [reviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviews.filter(
    (review) =>
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">نظرات و امتیازات</h1>
        <p className="text-gray-400">مدیریت نظرات و امتیازات کاربران</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <Input
            placeholder="جستجو در نظرات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
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
              {filteredReviews.map((review) => (
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
        </CardContent>
      </Card>
    </div>
  );
}

