"use client";

import React, { useState } from "react";
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

/**
 * مودال ارسال اعلان به کاربران — بر اساس شماره موبایل
 * API: POST api/Notification/CreateNotification
 * body: { phoneNumber? | phoneNumbers?, title, message, type?, actionUrl?, actionText? }
 * یا: { userId? | userIds? } در صورت پشتیبانی بک‌اند
 */
export default function CreateNotificationModal({ open, onOpenChange, onSubmit }) {
  const [mode, setMode] = useState("single");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [actionText, setActionText] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setMode("single");
    setPhoneNumber("");
    setPhoneNumbers("");
    setTitle("");
    setMessage("");
    setType("");
    setActionUrl("");
    setActionText("");
  };

  const handleClose = (o) => {
    if (!o) reset();
    onOpenChange?.(o);
  };

  const normalizePhone = (s) => s.replace(/\D/g, "").trim();

  const handleSubmit = async () => {
    const body = { title: title.trim(), message: message.trim() };
    if (!body.title || !body.message) return;

    if (mode === "single") {
      const phone = normalizePhone(phoneNumber);
      if (!phone || phone.length < 10) return;
      body.phoneNumber = phone;
    } else {
      const phones = phoneNumbers
        .split(/[,،\s]+/)
        .map((s) => normalizePhone(s))
        .filter((p) => p.length >= 10);
      if (phones.length === 0) return;
      body.phoneNumbers = phones;
    }
    if (type.trim()) body.type = type.trim();
    if (actionUrl.trim()) body.actionUrl = actionUrl.trim();
    if (actionText.trim()) body.actionText = actionText.trim();

    setLoading(true);
    try {
      await onSubmit(body);
      handleClose(false);
    } catch (e) {
      // خطا در parent هندل می‌شود
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    title.trim() &&
    message.trim() &&
    (mode === "single"
      ? normalizePhone(phoneNumber).length >= 10
      : phoneNumbers.split(/[,،\s]+/).some((s) => normalizePhone(s).length >= 10));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>ارسال اعلان به کاربران</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-gray-400">گیرنده</Label>
            <div className="flex gap-2">
              <Button
                variant={mode === "single" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("single")}
                className={mode === "single" ? "bg-blue-600" : "border-gray-600"}
              >
                یک کاربر
              </Button>
              <Button
                variant={mode === "multiple" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("multiple")}
                className={mode === "multiple" ? "bg-blue-600" : "border-gray-600"}
              >
                چند کاربر
              </Button>
            </div>
            {mode === "single" ? (
              <Input
                type="tel"
                dir="ltr"
                placeholder="شماره موبایل (مثال: 09123456789)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            ) : (
              <Input
                type="tel"
                dir="ltr"
                placeholder="شماره‌ها با کاما (مثال: 09123456789, 09121111111)"
                value={phoneNumbers}
                onChange={(e) => setPhoneNumbers(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">عنوان *</Label>
            <Input
              placeholder="عنوان اعلان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">متن اعلان *</Label>
            <textarea
              placeholder="متن اعلان"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">نوع (اختیاری)</Label>
            <Input
              placeholder="مثلاً info, alert"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">لینک اقدام (اختیاری)</Label>
            <Input
              placeholder="/dashboard/..."
              value={actionUrl}
              onChange={(e) => setActionUrl(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">متن دکمه (اختیاری)</Label>
            <Input
              placeholder="متن دکمه"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)} className="border-gray-600">
            انصراف
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !canSubmit} className="bg-blue-600 hover:bg-blue-700">
            {loading ? "در حال ارسال..." : "ارسال اعلان"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
