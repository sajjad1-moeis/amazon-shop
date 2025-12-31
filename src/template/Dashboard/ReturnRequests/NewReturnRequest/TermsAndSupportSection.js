"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MessageText } from "iconsax-reactjs";
import Link from "next/link";

export default function TermsAndSupportSection({ termsAccepted, onTermsChange }) {
  return (
    <div className="mt-4 pt-4 md:flex-between">
      <div className="flex items-start gap-3">
        <Checkbox id="terms" checked={termsAccepted} onCheckedChange={onTermsChange} />
        <Label htmlFor="terms" className="text-sm text-gray-700 dark:text-dark-text cursor-pointer leading-relaxed">
          اطلاعات وارد شده صحیح است و <span className="text-yellow-500">شرایط مرجوعی</span> را مطالعه کرده‌ام.
        </Label>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-gray-600 dark:text-dark-text">نیاز به بررسی فوری دارید ؟</span>
        <Link href="/dashboard/support">
          <Button
            type="button"
            variant="outline"
            className="rounded-lg flex items-center gap-2 text-primary-700 border-primary-700 bg-transparent border-2 hover:bg-primary-50 dark:border-primary-300 dark:text-primary-300 dark:bg-transparent dark:hover:bg-primary-900/20"
          >
            <MessageText size={16} />
            گفت‌وگو با پشتیبان
          </Button>
        </Link>
      </div>
    </div>
  );
}


