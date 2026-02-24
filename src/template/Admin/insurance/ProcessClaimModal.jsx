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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const CLAIM_STATUS_OPTIONS = [
  { value: 1, label: "در انتظار بررسی" },
  { value: 2, label: "در حال بررسی" },
  { value: 3, label: "تأیید شده" },
  { value: 4, label: "رد شده" },
  { value: 5, label: "پرداخت شده" },
];

export default function ProcessClaimModal({ open, onOpenChange, onSubmit, loading }) {
  const [claimId, setClaimId] = useState("");
  const [status, setStatus] = useState(3);
  const [approvedAmount, setApprovedAmount] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = claimId.trim() ? parseInt(claimId, 10) : null;
    if (id == null || isNaN(id)) {
      return;
    }
    const body = {
      status: Number(status),
      approvedAmount: approvedAmount.trim() ? parseFloat(approvedAmount) : undefined,
      adminNote: adminNote.trim() || undefined,
      rejectionReason: rejectionReason.trim() || undefined,
    };
    onSubmit(id, body);
  };

  useEffect(() => {
    if (open) {
      setClaimId("");
      setApprovedAmount("");
      setAdminNote("");
      setRejectionReason("");
      setStatus(3);
    }
  }, [open]);

  const handleOpenChange = (next) => {
    if (!next) {
      setClaimId("");
      setApprovedAmount("");
      setAdminNote("");
      setRejectionReason("");
      setStatus(3);
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">پردازش درخواست جبران بیمه</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300">شناسه درخواست جبران (Claim ID) *</Label>
            <Input
              type="number"
              value={claimId}
              onChange={(e) => setClaimId(e.target.value)}
              placeholder="claimId"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label className="text-gray-300">وضعیت *</Label>
            <Select value={String(status)} onValueChange={(v) => setStatus(Number(v))}>
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CLAIM_STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={String(o.value)}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(status === 3 || status === 5) && (
            <div>
              <Label className="text-gray-300">مبلغ تأیید شده (تومان)</Label>
              <Input
                type="number"
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
                placeholder="approvedAmount"
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          )}
          {status === 4 && (
            <div>
              <Label className="text-gray-300">دلیل رد</Label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="rejectionReason"
                className="mt-1 bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
          )}
          <div>
            <Label className="text-gray-300">یادداشت ادمین</Label>
            <Textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="adminNote"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>
          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
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
