"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash, Plus } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// داده‌های تستی
const mockUsers = [
  {
    id: 1,
    firstName: "علی",
    lastName: "محمدی",
    email: "ali@example.com",
    phone: "09123456789",
    ordersCount: 12,
    totalSpent: 125000000,
    isActive: true,
    registrationDate: "1403/08/01",
    isVip: true,
  },
  {
    id: 2,
    firstName: "مریم",
    lastName: "احمدی",
    email: "maryam@example.com",
    phone: "09123456790",
    ordersCount: 8,
    totalSpent: 85000000,
    isActive: true,
    registrationDate: "1403/08/05",
    isVip: false,
  },
  {
    id: 3,
    firstName: "حسین",
    lastName: "رضایی",
    email: "hossein@example.com",
    phone: "09123456791",
    ordersCount: 5,
    totalSpent: 45000000,
    isActive: false,
    registrationDate: "1403/08/10",
    isVip: false,
  },
  {
    id: 4,
    firstName: "فاطمه",
    lastName: "کریمی",
    email: "fateme@example.com",
    phone: "09123456792",
    ordersCount: 15,
    totalSpent: 180000000,
    isActive: true,
    registrationDate: "1403/07/20",
    isVip: true,
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId) => {
    router.push(`/admin/users/edit/${userId}`);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    setDeleteLoading(true);
    // شبیه‌سازی API call
    setTimeout(() => {
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      toast.success("کاربر با موفقیت حذف شد");
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      setDeleteLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">کاربران</h1>
          <p className="text-gray-400">مدیریت و مشاهده تمام کاربران</p>
        </div>
        <Link href="/admin/users/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="ml-2" />
            کاربر جدید
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <Input
            placeholder="جستجو در کاربران..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-400">کاربری یافت نشد</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/50">
                  <TableHead className="text-gray-300">نام و نام خانوادگی</TableHead>
                  <TableHead className="text-gray-300">ایمیل</TableHead>
                  <TableHead className="text-gray-300">شماره تماس</TableHead>
                  <TableHead className="text-gray-300">تعداد سفارشات</TableHead>
                  <TableHead className="text-gray-300">مجموع خرید</TableHead>
                  <TableHead className="text-gray-300">وضعیت</TableHead>
                  <TableHead className="text-gray-300">نوع</TableHead>
                  <TableHead className="text-gray-300">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700/50">
                    <TableCell className="text-white font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell className="text-gray-300">{user.phone}</TableCell>
                    <TableCell className="text-gray-300">{user.ordersCount}</TableCell>
                    <TableCell className="text-gray-300">{user.totalSpent.toLocaleString()} تومان</TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "فعال" : "غیرفعال"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.isVip ? (
                        <Badge variant="default" className="bg-yellow-500">VIP</Badge>
                      ) : (
                        <Badge variant="secondary">عادی</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20">
                          <Eye size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                          onClick={() => handleEdit(user.id)}
                        >
                          <Edit size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <Trash size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog حذف */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>حذف کاربر</DialogTitle>
            <DialogDescription className="text-gray-400">
              آیا از حذف کاربر <strong className="text-white">{selectedUser?.firstName} {selectedUser?.lastName}</strong> اطمینان دارید؟
              این عمل غیرقابل بازگشت است.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleteDialogOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              انصراف
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? "در حال حذف..." : "حذف"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
