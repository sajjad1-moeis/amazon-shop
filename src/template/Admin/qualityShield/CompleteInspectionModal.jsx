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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const RESULT_OPTIONS = [
  { value: 1, label: "قبول (سالم)" },
  { value: 2, label: "رد (مشکل دارد)" },
  { value: 3, label: "مشروط" },
];

export default function CompleteInspectionModal({ open, onOpenChange, service, onSubmit, loading }) {
  const [result, setResult] = useState(1);
  const [inspectionNotes, setInspectionNotes] = useState("");
  const [photoPath, setPhotoPath] = useState("");
  const [videoPath, setVideoPath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      result: Number(result),
      inspectionNotes: inspectionNotes.trim() || undefined,
      photoPath: photoPath.trim() || undefined,
      videoPath: videoPath.trim() || undefined,
    };
    onSubmit(service.id, body);
  };

  useEffect(() => {
    if (open) {
      setResult(1);
      setInspectionNotes("");
      setPhotoPath("");
      setVideoPath("");
    }
  }, [open]);

  const handleOpenChange = (next) => {
    if (!next) {
      setResult(1);
      setInspectionNotes("");
      setPhotoPath("");
      setVideoPath("");
    }
    onOpenChange(next);
  };

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">تکمیل بررسی سپر کیفیت</DialogTitle>
        </DialogHeader>
        <p className="text-gray-400 text-sm">سرویس #{service.id} · سفارش {service.orderNumber || service.orderId}</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-gray-300">نتیجه بررسی *</Label>
            <Select value={String(result)} onValueChange={(v) => setResult(Number(v))}>
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESULT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={String(o.value)}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-300">یادداشت بررسی</Label>
            <Textarea
              value={inspectionNotes}
              onChange={(e) => setInspectionNotes(e.target.value)}
              placeholder="inspectionNotes"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              rows={3}
              maxLength={2000}
            />
          </div>
          <div>
            <Label className="text-gray-300">مسیر عکس (پس از آپلود)</Label>
            <Input
              value={photoPath}
              onChange={(e) => setPhotoPath(e.target.value)}
              placeholder="photoPath"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              maxLength={500}
            />
          </div>
          <div>
            <Label className="text-gray-300">مسیر ویدیو (پس از آپلود)</Label>
            <Input
              value={videoPath}
              onChange={(e) => setVideoPath(e.target.value)}
              placeholder="videoPath"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              maxLength={500}
            />
          </div>
          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "ثبت و تکمیل"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
