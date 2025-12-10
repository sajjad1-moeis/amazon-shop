"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteProductDialog({ open, onOpenChange, product, onConfirm, loading }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>حذف محصول</DialogTitle>
          <DialogDescription className="text-gray-400">
            آیا از حذف محصول <strong className="text-white">{product?.name}</strong> اطمینان دارید؟ این عمل غیرقابل بازگشت است.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-white">
            انصراف
          </Button>
          <Button onClick={onConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700">
            {loading ? "در حال حذف..." : "حذف"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


