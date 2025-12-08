"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Edit, Trash, Plus } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// داده‌های تستی
const mockDiscounts = [
  {
    id: 1,
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    minPurchase: 100000,
    maxDiscount: 500000,
    usageLimit: 100,
    used: 45,
    status: "active",
    startDate: "1403/09/01",
    endDate: "1403/12/29",
  },
  {
    id: 2,
    code: "SUMMER50",
    type: "fixed",
    value: 50000,
    minPurchase: 200000,
    maxDiscount: null,
    usageLimit: 50,
    used: 12,
    status: "active",
    startDate: "1403/09/15",
    endDate: "1403/10/15",
  },
  {
    id: 3,
    code: "VIP100",
    type: "percentage",
    value: 10,
    minPurchase: 500000,
    maxDiscount: 100000,
    usageLimit: 200,
    used: 200,
    status: "expired",
    startDate: "1403/08/01",
    endDate: "1403/08/31",
  },
];

export default function DiscountsListPage() {
  const router = useRouter();
  const [discounts, setDiscounts] = useState(mockDiscounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (discountId) => {
    router.push(`/admin/discounts/edit/${discountId}`);
  };

  const handleDeleteClick = (discount) => {
    setSelectedDiscount(discount);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDiscount) return;

    setDeleteLoading(true);
    // شبیه‌سازی API call
    setTimeout(() => {
      setDiscounts((prev) => prev.filter((d) => d.id !== selectedDiscount.id));
      toast.success("کوپن با موفقیت حذف شد");
      setDeleteDialogOpen(false);
      setSelectedDiscount(null);
      setDeleteLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">لیست کوپن‌ها</h1>
          <p className="text-gray-400">مدیریت و مشاهده تمام کوپن‌های تخفیف</p>
        </div>
        <Link href="/admin/discounts/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="ml-2" />
            کوپن جدید
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">جستجو</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="جستجو در کوپن‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          {filteredDiscounts.length === 0 ? (
            <div className="p-8 text-center text-gray-400">کوپنی یافت نشد</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/50">
                  <TableHead className="text-gray-300">کد کوپن</TableHead>
                  <TableHead className="text-gray-300">نوع</TableHead>
                  <TableHead className="text-gray-300">مقدار</TableHead>
                  <TableHead className="text-gray-300">حداقل خرید</TableHead>
                  <TableHead className="text-gray-300">استفاده شده</TableHead>
                  <TableHead className="text-gray-300">وضعیت</TableHead>
                  <TableHead className="text-gray-300">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscounts.map((discount) => (
                  <TableRow key={discount.id} className="border-gray-700 hover:bg-gray-700/50">
                    <TableCell className="text-white font-medium">{discount.code}</TableCell>
                    <TableCell className="text-gray-300">
                      {discount.type === "percentage" ? "درصدی" : "مقدار ثابت"}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {discount.type === "percentage" ? `${discount.value}%` : `${discount.value.toLocaleString()} تومان`}
                    </TableCell>
                    <TableCell className="text-gray-300">{discount.minPurchase.toLocaleString()} تومان</TableCell>
                    <TableCell className="text-gray-300">
                      {discount.used} / {discount.usageLimit}
                    </TableCell>
                    <TableCell>
                      <Badge variant={discount.status === "active" ? "default" : "secondary"}>
                        {discount.status === "active" ? "فعال" : "منقضی شده"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                          onClick={() => handleEdit(discount.id)}
                        >
                          <Edit size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                          onClick={() => handleDeleteClick(discount)}
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
            <DialogTitle>حذف کوپن</DialogTitle>
            <DialogDescription className="text-gray-400">
              آیا از حذف کوپن <strong className="text-white">{selectedDiscount?.code}</strong> اطمینان دارید؟
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
