"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, Plus } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

const mockBrands = [
  { id: 1, name: "Apple", productsCount: 89, isActive: true },
  { id: 2, name: "Samsung", productsCount: 156, isActive: true },
  { id: 3, name: "Dell", productsCount: 67, isActive: true },
  { id: 4, name: "Sony", productsCount: 45, isActive: true },
  { id: 5, name: "HP", productsCount: 78, isActive: false },
];

export default function BrandsPage() {
  const [brands] = useState(mockBrands);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">برندها</h1>
          <p className="text-gray-400">مدیریت برندهای محصولات</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={20} className="ml-2" />
          برند جدید
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">جستجو</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="جستجو در برندها..."
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
                <TableHead className="text-gray-300">نام برند</TableHead>
                <TableHead className="text-gray-300">تعداد محصولات</TableHead>
                <TableHead className="text-gray-300">وضعیت</TableHead>
                <TableHead className="text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.map((brand) => (
                <TableRow key={brand.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-white font-medium">{brand.name}</TableCell>
                  <TableCell className="text-gray-300">{brand.productsCount}</TableCell>
                  <TableCell>
                    <Badge variant={brand.isActive ? "default" : "secondary"}>
                      {brand.isActive ? "فعال" : "غیرفعال"}
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

