"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export default function StartInspectionModal({ open, onOpenChange, service, onSubmit, loading }) {
  const [inspectorName, setInspectorName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inspectorName?.trim()) return;
    onSubmit(service.id, { inspectorName: inspectorName.trim() });
  };

  useEffect(() => {
    if (open) setInspectorName("");
  }, [open]);

  const handleOpenChange = (next) => {
    if (!next) setInspectorName("");
    onOpenChange(next);
  };

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">شروع بررسی سپر کیفیت</DialogTitle>
        </DialogHeader>
        <p className="text-gray-400 text-sm">سرویس #{service.id} · سفارش {service.orderNumber || service.orderId}</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-gray-300">نام بازرس *</Label>
            <Input
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              placeholder="نام بازرس"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              maxLength={100}
              required
            />
          </div>
          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "شروع بررسی"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
