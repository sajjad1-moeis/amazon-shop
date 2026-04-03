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
import { FORM_STYLES } from "@/template/Admin/formStyles";

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
    if (id == null || isNaN(id)) return;
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
      <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-lg rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">پردازش درخواست جبران بیمه</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className={FORM_STYLES.label}>شناسه درخواست جبران (Claim ID) <span className="text-red-400">*</span></Label>
            <Input
              type="number"
              value={claimId}
              onChange={(e) => setClaimId(e.target.value)}
              placeholder="مثال: ۱۲۳"
              className={FORM_STYLES.input}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className={FORM_STYLES.label}>وضعیت <span className="text-red-400">*</span></Label>
            <Select value={String(status)} onValueChange={(v) => setStatus(Number(v))}>
              <SelectTrigger className={FORM_STYLES.selectTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={FORM_STYLES.selectContent}>
                {CLAIM_STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={String(o.value)} className={FORM_STYLES.selectItem}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(status === 3 || status === 5) && (
            <div className="space-y-2">
              <Label className={FORM_STYLES.label}>مبلغ تأیید شده (تومان)</Label>
              <Input
                type="number"
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
                placeholder="مثال: ۵۰۰۰۰۰"
                className={FORM_STYLES.input}
              />
            </div>
          )}
          {status === 4 && (
            <div className="space-y-2">
              <Label className={FORM_STYLES.label}>دلیل رد</Label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="دلیل رد درخواست جبران را بنویسید"
                className={FORM_STYLES.input}
                rows={3}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label className={FORM_STYLES.label}>یادداشت ادمین</Label>
            <Textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="اختیاری"
              className={FORM_STYLES.input}
              rows={2}
            />
          </div>
          <DialogFooter className="gap-2 pt-4 border-t border-gray-600">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className={FORM_STYLES.button}>
              انصراف
            </Button>
            <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
              {loading ? <Spinner size="sm" /> : "ثبت"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
