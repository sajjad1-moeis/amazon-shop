"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  filterInputStyles,
  filterTextareaStyles,
  filterSelectTriggerStyles,
  filterSelectContentStyles,
} from "@/utils/filterStyles";
import { userBankAccountService } from "@/services/userBankAccount/userBankAccountService";
import { userWalletService } from "@/services/userWallet/userWalletService";
import { toast } from "sonner";

export default function WithdrawModal({ isOpen, onClose, userId, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [userBankAccountId, setUserBankAccountId] = useState("");
  const [description, setDescription] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoadingAccounts(true);
      userBankAccountService
        .getList()
        .then((data) => {
          const list = Array.isArray(data) ? data : data?.items ?? [];
          setBankAccounts(list);
          if (list.length && !userBankAccountId) {
            setUserBankAccountId(String(list[0].id ?? list[0].userBankAccountId ?? ""));
          }
        })
        .catch(() => {
          setBankAccounts([]);
          toast.error("خطا در دریافت لیست حساب‌های بانکی");
        })
        .finally(() => setLoadingAccounts(false));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !userBankAccountId) {
      toast.error("مبلغ و شماره شبا را انتخاب کنید");
      return;
    }
    const numAmount = parseInt(String(amount).replace(/\D/g, ""), 10);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("مبلغ معتبر وارد کنید");
      return;
    }
    setSubmitting(true);
    try {
      await userWalletService.requestWithdraw({
        amount: numAmount,
        userBankAccountId: Number(userBankAccountId) || userBankAccountId,
        description: description?.trim() || undefined,
      });
      toast.success("درخواست برداشت با موفقیت ثبت شد");
      onClose();
      onSuccess?.();
      setAmount("");
      setUserBankAccountId("");
      setDescription("");
    } catch (err) {
      toast.error(err?.message ?? "خطا در ثبت درخواست برداشت");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="max-w-md dark:bg-dark-box" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-dark-title">برداشت از کیف پول</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Withdrawal Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              مبلغ برداشت
            </Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مبلغ برداشت را وارد کنید ..."
              className={cn("w-full", filterInputStyles)}
              dir="rtl"
            />
          </div>

          {/* IBAN Selection */}
          <div className="space-y-2">
            <Label htmlFor="shaba" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              شماره شبا
            </Label>
            <Select value={userBankAccountId} onValueChange={setUserBankAccountId} disabled={loadingAccounts}>
              <SelectTrigger id="shaba" className={cn("!w-full", filterSelectTriggerStyles)} dir="rtl">
                <SelectValue placeholder={loadingAccounts ? "در حال بارگذاری..." : "شماره شبا خود را انتخاب کنید"} />
              </SelectTrigger>
              <SelectContent className={filterSelectContentStyles} dir="rtl">
                {bankAccounts.map((acc) => {
                  const id = String(acc.id ?? acc.userBankAccountId ?? "");
                  const display = acc.iban ?? acc.shaba ?? acc.accountNumber ?? id;
                  return (
                    <SelectItem key={id} value={id}>
                      {display}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {!loadingAccounts && bankAccounts.length === 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400">هیچ حساب بانکی تأییدشده‌ای ثبت نشده است.</p>
            )}
          </div>

          {/* Optional Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-dark-text">
              توضیحات (اختیاری)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات خود را وارد کنید ..."
              rows={4}
              className={cn("w-full resize-none", filterTextareaStyles)}
              dir="rtl"
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full dark:border-primary-400 border-2 dark:text-primary-400"
            >
              لغو
            </Button>
            <Button type="submit" disabled={submitting || bankAccounts.length === 0} className="bg-primary-600 w-full hover:bg-primary-700 text-white">
              {submitting ? "در حال ارسال..." : "ثبت درخواست"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
