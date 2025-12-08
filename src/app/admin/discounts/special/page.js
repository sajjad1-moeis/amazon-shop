"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

const mockSpecialDiscounts = [
  { id: 1, name: "تخفیف ویژه نوروز", discount: 30, startDate: "1403/01/01", endDate: "1403/01/15", status: "active" },
  { id: 2, name: "تخفیف آخر فصل", discount: 25, startDate: "1403/12/20", endDate: "1403/12/29", status: "active" },
];

export default function SpecialDiscountsPage() {
  const [discounts] = useState(mockSpecialDiscounts);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">تخفیف‌های ویژه</h1>
        <p className="text-gray-400">مدیریت تخفیف‌های ویژه و رویدادها</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/50">
                <TableHead className="text-gray-300">نام</TableHead>
                <TableHead className="text-gray-300">درصد تخفیف</TableHead>
                <TableHead className="text-gray-300">تاریخ شروع</TableHead>
                <TableHead className="text-gray-300">تاریخ پایان</TableHead>
                <TableHead className="text-gray-300">وضعیت</TableHead>
                <TableHead className="text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-white font-medium">{discount.name}</TableCell>
                  <TableCell className="text-gray-300">{discount.discount}%</TableCell>
                  <TableCell className="text-gray-300">{discount.startDate}</TableCell>
                  <TableCell className="text-gray-300">{discount.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={discount.status === "active" ? "default" : "secondary"}>
                      {discount.status === "active" ? "فعال" : "غیرفعال"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-400/20">
                        <Edit size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-400/20">
                        <Trash size={18} />
                      </Button>
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

