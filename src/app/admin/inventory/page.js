"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockInventory = [
  { id: 1, productName: "لپ تاپ Dell XPS 15", currentStock: 15, minStock: 10, status: "ok" },
  { id: 2, productName: "گوشی سامسونگ Galaxy S24", currentStock: 8, minStock: 10, status: "low" },
  { id: 3, productName: "هدفون Sony WH-1000XM5", currentStock: 0, minStock: 5, status: "out" },
  { id: 4, productName: "ساعت هوشمند Apple Watch", currentStock: 25, minStock: 10, status: "ok" },
];

export default function InventoryPage() {
  const [inventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventory.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    if (status === "ok") return <Badge variant="default">کافی</Badge>;
    if (status === "low") return <Badge variant="outline">کم</Badge>;
    return <Badge variant="destructive">ناموجود</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">موجودی محصولات</h1>
        <p className="text-gray-400">مدیریت موجودی و انبار</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <Input
            placeholder="جستجو در موجودی..."
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
                <TableHead className="text-gray-300">محصول</TableHead>
                <TableHead className="text-gray-300">موجودی فعلی</TableHead>
                <TableHead className="text-gray-300">حداقل موجودی</TableHead>
                <TableHead className="text-gray-300">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-white font-medium">{item.productName}</TableCell>
                  <TableCell className="text-gray-300">{item.currentStock}</TableCell>
                  <TableCell className="text-gray-300">{item.minStock}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

