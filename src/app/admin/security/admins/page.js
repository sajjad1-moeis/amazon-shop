"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, Add } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

const mockAdmins = [
  { id: 1, name: "مدیر اصلی", email: "admin@example.com", role: "Super Admin", isActive: true },
  { id: 2, name: "مدیر محصولات", email: "product@example.com", role: "Product Admin", isActive: true },
  { id: 3, name: "مدیر سفارشات", email: "order@example.com", role: "Order Admin", isActive: false },
];

export default function AdminsPage() {
  const [admins] = useState(mockAdmins);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">کاربران ادمین</h1>
          <p className="text-gray-400">مدیریت کاربران ادمین</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Add size={20} className="ml-2" />
          ادمین جدید
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/50">
                <TableHead className="text-gray-300">نام</TableHead>
                <TableHead className="text-gray-300">ایمیل</TableHead>
                <TableHead className="text-gray-300">نقش</TableHead>
                <TableHead className="text-gray-300">وضعیت</TableHead>
                <TableHead className="text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-white font-medium">{admin.name}</TableCell>
                  <TableCell className="text-gray-300">{admin.email}</TableCell>
                  <TableCell className="text-gray-300">{admin.role}</TableCell>
                  <TableCell>
                    <Badge variant={admin.isActive ? "default" : "secondary"}>
                      {admin.isActive ? "فعال" : "غیرفعال"}
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
