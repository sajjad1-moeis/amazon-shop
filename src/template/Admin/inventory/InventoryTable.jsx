"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Add, Minus, Edit2, Box } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const formatNum = (n) => (n == null || Number.isNaN(n) ? "—" : Number(n).toLocaleString("fa-IR"));

const StatusPill = ({ currentStock, minStock }) => {
  if (currentStock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/25">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        ناموجود
      </span>
    );
  }
  if (currentStock < minStock) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/25">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        کم
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      کافی
    </span>
  );
};

export default function InventoryTable({ inventory, onStockIn, onStockOut, onUpdateStock }) {
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const productId = selectedItem?.productId ?? selectedItem?.id;

  const openModal = (type, item) => {
    setModalType(type);
    setSelectedItem(item);
    setQuantity("");
    setReason("");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
    setQuantity("");
    setReason("");
  };

  const handleStockIn = async () => {
    if (!productId || !onStockIn || !quantity || Number(quantity) <= 0) return;
    setLoading(true);
    try {
      await onStockIn({ productId, quantity: Number(quantity), reason: reason.trim() || undefined });
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const handleStockOut = async () => {
    if (!productId || !onStockOut || !quantity || Number(quantity) <= 0) return;
    setLoading(true);
    try {
      await onStockOut({ productId, quantity: Number(quantity), reason: reason.trim() || undefined });
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async () => {
    if (!productId || !onUpdateStock || quantity === "" || Number(quantity) < 0) return;
    setLoading(true);
    try {
      await onUpdateStock(productId, Number(quantity));
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const currentStock = selectedItem ? (selectedItem.currentStock ?? selectedItem.quantity ?? selectedItem.stock ?? 0) : 0;
  const productName = selectedItem?.productName ?? selectedItem?.productTitle ?? selectedItem?.name ?? "-";

  if (inventory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Box size={48} className="mb-3 opacity-40" />
        <p className="text-sm">موجودی‌ای یافت نشد</p>
      </div>
    );
  }

  const hasActions = onStockIn || onStockOut || onUpdateStock;

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-600/80">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600/80 bg-gray-800/50 hover:bg-gray-800/50">
              <TableHead className="text-gray-300 font-semibold py-4 px-4 w-[80px]">شناسه</TableHead>
              <TableHead className="text-gray-300 font-semibold py-4 px-4 w-[200px] max-w-[200px]">محصول</TableHead>
              <TableHead className="text-gray-300 font-semibold py-4 px-4 w-[100px] text-center">موجودی</TableHead>
              <TableHead className="text-gray-300 font-semibold py-4 px-4 w-[100px] text-center">حداقل</TableHead>
              <TableHead className="text-gray-300 font-semibold py-4 px-4 w-[90px] text-center">کسری</TableHead>
              <TableHead className="text-gray-300 font-semibold py-4 px-4 w-[100px]">وضعیت</TableHead>
              {hasActions && (
                <TableHead className="text-gray-300 font-semibold py-4 px-4 w-[120px] text-center">عملیات</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item, idx) => {
              const currentStockVal = item.currentStock || item.quantity || item.stock || 0;
              const minStockVal = item.minStock || item.minimumStock || item.minStockLevel || 0;
              const shortage = Math.max(0, Number(minStockVal) - Number(currentStockVal));
              const pid = item.productId || item.id;
              const productLabel = item.productName || item.productTitle || item.name || "—";
              const isLow = currentStockVal < minStockVal;
              const isOut = currentStockVal === 0;

              return (
                <TableRow
                  key={item.id || item.productId || idx}
                  className={cn(
                    "border-gray-600/60 transition-colors",
                    isOut && "bg-red-500/5",
                    isLow && !isOut && "bg-amber-500/5",
                    "hover:bg-gray-700/30"
                  )}
                >
                  <TableCell className="py-3.5 px-4 font-mono text-sm text-gray-400">{formatNum(pid) || "—"}</TableCell>
                  <TableCell className="py-3.5 px-4 max-w-[200px] overflow-hidden">
                    <span
                      className="font-medium text-white line-clamp-1 block min-w-0"
                      title={productLabel}
                    >
                      {productLabel}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-center">
                    <span
                      className={cn(
                        "font-bold tabular-nums",
                        isOut ? "text-red-400" : isLow ? "text-amber-400" : "text-white"
                      )}
                    >
                      {formatNum(currentStockVal)}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-center text-gray-400 tabular-nums">
                    {formatNum(minStockVal)}
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-center">
                    {shortage > 0 ? (
                      <span className="font-medium text-amber-400 tabular-nums">{formatNum(shortage)}</span>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    <StatusPill currentStock={currentStockVal} minStock={minStockVal} />
                  </TableCell>
                  {hasActions && (
                    <TableCell className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {onStockIn && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                            onClick={() => openModal("stockIn", item)}
                            title="ورود به انبار"
                          >
                            <Add size={18} />
                          </Button>
                        )}
                        {onStockOut && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                            onClick={() => openModal("stockOut", item)}
                            title="خروج از انبار"
                          >
                            <Minus size={18} />
                          </Button>
                        )}
                        {onUpdateStock && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                            onClick={() => openModal("updateStock", item)}
                            title="تنظیم موجودی"
                          >
                            <Edit2 size={18} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* StockIn Modal */}
      <Dialog open={modalType === "stockIn"} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>ورود به انبار</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-gray-700/50 p-3 text-sm">
              <p className="text-gray-400 mb-1">محصول</p>
              <p className="text-white font-medium">{productName}</p>
              <p className="text-gray-400 mt-2">موجودی فعلی: <span className="text-white font-semibold">{formatNum(currentStock)}</span></p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">تعداد ورود *</Label>
              <Input
                type="number"
                min="1"
                placeholder="عدد مثبت"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">دلیل (اختیاری)</Label>
              <Input
                placeholder="دلیل ورود"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={500}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal} className="border-gray-600">
              انصراف
            </Button>
            <Button
              onClick={handleStockIn}
              disabled={loading || !quantity || Number(quantity) <= 0}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? "در حال ثبت..." : "ثبت ورود"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* StockOut Modal */}
      <Dialog open={modalType === "stockOut"} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>خروج از انبار</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-gray-700/50 p-3 text-sm">
              <p className="text-gray-400 mb-1">محصول</p>
              <p className="text-white font-medium">{productName}</p>
              <p className="text-gray-400 mt-2">موجودی فعلی: <span className="text-white font-semibold">{formatNum(currentStock)}</span></p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">تعداد خروج *</Label>
              <Input
                type="number"
                min="1"
                max={currentStock}
                placeholder={`حداکثر ${currentStock}`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">دلیل (اختیاری)</Label>
              <Input
                placeholder="دلیل خروج"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={500}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal} className="border-gray-600">
              انصراف
            </Button>
            <Button
              onClick={handleStockOut}
              disabled={loading || !quantity || Number(quantity) <= 0 || Number(quantity) > currentStock}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? "در حال ثبت..." : "ثبت خروج"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UpdateStock Modal */}
      <Dialog open={modalType === "updateStock"} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>تنظیم موجودی</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-gray-700/50 p-3 text-sm">
              <p className="text-gray-400 mb-1">محصول</p>
              <p className="text-white font-medium">{productName}</p>
              <p className="text-gray-400 mt-2">موجودی فعلی: <span className="text-white font-semibold">{formatNum(currentStock)}</span></p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">موجودی جدید (عدد نامنفی) *</Label>
              <Input
                type="number"
                min="0"
                placeholder="۰"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal} className="border-gray-600">
              انصراف
            </Button>
            <Button
              onClick={handleUpdateStock}
              disabled={loading || quantity === "" || Number(quantity) < 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
