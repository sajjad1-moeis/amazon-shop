"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Edit, Trash, CloudPlus } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AdminLayout from "@/layout/AdminLayout";

// داده‌های تستی
const mockProducts = [
  {
    id: 1,
    name: "لپ تاپ Dell XPS 15",
    category: "لپ تاپ",
    brand: "Dell",
    price: 45000000,
    stock: 15,
    sold: 45,
    status: "active",
    image: "/image/products/laptop.jpg",
  },
  {
    id: 2,
    name: "گوشی سامسونگ Galaxy S24",
    category: "موبایل",
    brand: "Samsung",
    price: 32000000,
    stock: 8,
    sold: 120,
    status: "active",
    image: "/image/products/phone.jpg",
  },
  {
    id: 3,
    name: "هدفون Sony WH-1000XM5",
    category: "هدفون",
    brand: "Sony",
    price: 8500000,
    stock: 0,
    sold: 89,
    status: "out_of_stock",
    image: "/image/products/headphone.jpg",
  },
  {
    id: 4,
    name: "ساعت هوشمند Apple Watch",
    category: "ساعت",
    brand: "Apple",
    price: 12000000,
    stock: 25,
    sold: 67,
    status: "active",
    image: "/image/products/watch.jpg",
  },
  {
    id: 5,
    name: "تبلت iPad Pro",
    category: "تبلت",
    brand: "Apple",
    price: 55000000,
    stock: 12,
    sold: 34,
    status: "active",
    image: "/image/products/tablet.jpg",
  },
];

export default function ProductsListPage() {
  const router = useRouter();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && product.status === "active") ||
      (filterStatus === "out_of_stock" && product.status === "out_of_stock");
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === "active") {
      return <Badge variant="default">فعال</Badge>;
    }
    return <Badge variant="secondary">ناموجود</Badge>;
  };

  const handleEdit = (productId) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    setDeleteLoading(true);
    // شبیه‌سازی API call
    setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      toast.success("محصول با موفقیت حذف شد");
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
      setDeleteLoading(false);
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">لیست محصولات</h1>
            <p className="text-gray-400">مدیریت و مشاهده تمام محصولات</p>
          </div>
          <Link href="/admin/products/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CloudPlus size={20} className="ml-2" />
              محصول جدید
            </Button>
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">فیلتر و جستجو</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="جستجو در محصولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="دسته‌بندی" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="لپ تاپ">لپ تاپ</SelectItem>
                  <SelectItem value="موبایل">موبایل</SelectItem>
                  <SelectItem value="هدفون">هدفون</SelectItem>
                  <SelectItem value="ساعت">ساعت</SelectItem>
                  <SelectItem value="تبلت">تبلت</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="وضعیت" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="out_of_stock">ناموجود</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-0">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-gray-400">محصولی یافت نشد</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-700/50">
                    <TableHead className="text-gray-300">نام محصول</TableHead>
                    <TableHead className="text-gray-300">دسته‌بندی</TableHead>
                    <TableHead className="text-gray-300">برند</TableHead>
                    <TableHead className="text-gray-300">قیمت</TableHead>
                    <TableHead className="text-gray-300">موجودی</TableHead>
                    <TableHead className="text-gray-300">فروخته شده</TableHead>
                    <TableHead className="text-gray-300">وضعیت</TableHead>
                    <TableHead className="text-gray-300">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{product.name}</TableCell>
                      <TableCell className="text-gray-300">{product.category}</TableCell>
                      <TableCell className="text-gray-300">{product.brand}</TableCell>
                      <TableCell className="text-gray-300">{product.price.toLocaleString()} تومان</TableCell>
                      <TableCell className="text-gray-300">{product.stock}</TableCell>
                      <TableCell className="text-gray-300">{product.sold}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20">
                            <Eye size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                            onClick={() => handleEdit(product.id)}
                          >
                            <Edit size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:bg-red-400/20"
                            onClick={() => handleDeleteClick(product)}
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
              <DialogTitle>حذف محصول</DialogTitle>
              <DialogDescription className="text-gray-400">
                آیا از حذف محصول <strong className="text-white">{selectedProduct?.name}</strong> اطمینان دارید؟ این عمل
                غیرقابل بازگشت است.
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
              <Button onClick={handleDeleteConfirm} disabled={deleteLoading} className="bg-red-600 hover:bg-red-700">
                {deleteLoading ? "در حال حذف..." : "حذف"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
