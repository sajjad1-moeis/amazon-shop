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

const STATUS_OPTIONS = [
  { value: 1, label: "در انتظار" },
  { value: 2, label: "در حال بررسی" },
  { value: 3, label: "تأیید شده" },
  { value: 4, label: "در حال پردازش" },
  { value: 5, label: "تکمیل شده" },
  { value: 6, label: "رد شده" },
  { value: 7, label: "لغو شده" },
];

export default function UpdateRequestStatusModal({
  open,
  onOpenChange,
  request,
  onSubmit,
  loading,
}) {
  const [status, setStatus] = useState(5);
  const [processNotes, setProcessNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [completionNotes, setCompletionNotes] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  useEffect(() => {
    if (open && request) {
      setStatus(request.status ?? 5);
      setProcessNotes(request.processNotes ?? "");
      setRejectionReason(request.rejectionReason ?? "");
      setCompletionNotes(request.completionNotes ?? "");
      setReferenceNumber(request.referenceNumber ?? "");
    }
  }, [open, request]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(request.id, {
      status: Number(status),
      processNotes: processNotes.trim() || undefined,
      rejectionReason: rejectionReason.trim() || undefined,
      completionNotes: completionNotes.trim() || undefined,
      referenceNumber: referenceNumber.trim() || undefined,
    });
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">تغییر وضعیت درخواست</DialogTitle>
        </DialogHeader>
        <p className="text-gray-400 text-sm">
          #{request.referenceNumber || request.id} · {request.serviceTypeName || "—"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-gray-300">وضعیت *</Label>
            <Select value={String(status)} onValueChange={(v) => setStatus(Number(v))}>
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={String(o.value)}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-300">یادداشت بررسی (حداکثر ۲۰۰۰)</Label>
            <Textarea
              value={processNotes}
              onChange={(e) => setProcessNotes(e.target.value)}
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              rows={2}
              maxLength={2000}
            />
          </div>
          <div>
            <Label className="text-gray-300">دلیل رد (حداکثر ۱۰۰۰)</Label>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              rows={2}
              maxLength={1000}
            />
          </div>
          <div>
            <Label className="text-gray-300">یادداشت تکمیل (حداکثر ۲۰۰۰)</Label>
            <Textarea
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              rows={2}
              maxLength={2000}
            />
          </div>
          <div>
            <Label className="text-gray-300">شماره مرجع (حداکثر ۱۰۰)</Label>
            <Input
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              maxLength={100}
            />
          </div>
          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "ثبت"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
