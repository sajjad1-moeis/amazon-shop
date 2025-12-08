"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, Add } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

const mockMethods = [
  { id: 1, name: "پست پیشتاز", price: 50000, estimatedDays: 3, isActive: true },
  { id: 2, name: "پست معمولی", price: 30000, estimatedDays: 7, isActive: true },
  { id: 3, name: "پیک موتوری", price: 20000, estimatedDays: 1, isActive: false },
];

export default function ShippingMethodsPage() {
  const [methods] = useState(mockMethods);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">روش‌های ارسال</h1>
          <p className="text-gray-400">مدیریت روش‌های ارسال</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Add size={20} className="ml-2" />
          روش جدید
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/50">
                <TableHead className="text-gray-300">نام</TableHead>
                <TableHead className="text-gray-300">هزینه (تومان)</TableHead>
                <TableHead className="text-gray-300">زمان تقریبی (روز)</TableHead>
                <TableHead className="text-gray-300">وضعیت</TableHead>
                <TableHead className="text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {methods.map((method) => (
                <TableRow key={method.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-white font-medium">{method.name}</TableCell>
                  <TableCell className="text-gray-300">{method.price.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-300">{method.estimatedDays}</TableCell>
                  <TableCell>
                    <Badge variant={method.isActive ? "default" : "secondary"}>
                      {method.isActive ? "فعال" : "غیرفعال"}
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
