"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FORM_STYLES } from "../../formStyles";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ChangePasswordDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    newPassword: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setFormData({ newPassword: "", reason: "" });
      setLoading(false);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.newPassword || formData.newPassword.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        newPassword: formData.newPassword,
        reason: formData.reason?.trim() || undefined,
      });
      setFormData({ newPassword: "", reason: "" });
      onOpenChange(false);
    } catch {
      /* toast در والد */
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpenChange = (nextOpen) => {
    if (!nextOpen) {
      if (loading) return;
      setFormData({ newPassword: "", reason: "" });
      onOpenChange(false);
    } else {
      onOpenChange(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className={cn("text-white", FORM_STYLES.card)}>
        <DialogHeader>
          <DialogTitle className="mb-2 font-thin">تغییر رمز عبور کاربر</DialogTitle>
          <DialogDescription className="text-gray-400">
            پس از تغییر رمز، تمام توکن‌های کاربر لغو می‌شوند و باید دوباره وارد شود.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-300">
                رمز عبور جدید <span className="text-red-400">*</span>
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className={FORM_STYLES.input}
                required
                minLength={6}
                maxLength={100}
                placeholder="حداقل 6 کاراکتر"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-gray-300">
                دلیل تغییر رمز (اختیاری)
              </Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={FORM_STYLES.input}
                maxLength={500}
                rows={3}
                placeholder="مثال: فراموشی رمز عبور"
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter className={"gap-2 p-0"}>
            <Button type="button" className={FORM_STYLES.button} onClick={() => handleDialogOpenChange(false)} disabled={loading}>
              انصراف
            </Button>
            <Button
              type="submit"
              className="bg-blue-600  border border-primary-700 shadow-lg rounded-lg p-3"
              disabled={loading || !formData.newPassword || formData.newPassword.length < 6}
            >
              {loading ? "در حال تغییر..." : "تغییر رمز"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
