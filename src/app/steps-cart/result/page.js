"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { paymentGatewayService } from "@/services/payment/paymentGatewayService";
import { CheckCircle, XCircle } from "lucide-react";

// صفحهٔ نتیجه پرداخت — درگاه باید کاربر را مستقیم به همین آدرس (با orderId و authority یا success) برگرداند؛ به /payment/success یا /payment/failed هدایت نکنید.

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const orderId = searchParams.get("orderId");
  const authority = searchParams.get("authority");
  const successParam = searchParams.get("success");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!orderId) {
        setStatus("error");
        setMessage("شناسه سفارش یافت نشد.");
        setLoading(false);
        return;
      }

      if (authority && orderId) {
        try {
          await paymentGatewayService.verifyAndCompleteOrder({
            authority,
            orderId: Number(orderId),
          });
          if (!cancelled) {
            setStatus("success");
            setMessage("پرداخت با موفقیت تأیید شد.");
          }
        } catch (error) {
          if (!cancelled) {
            setStatus("error");
            setMessage(error?.message || "تأیید پرداخت ناموفق بود.");
          }
        }
        if (!cancelled) setLoading(false);
        return;
      }

      if (successParam === "1" || successParam === "true") {
        setStatus("success");
        setMessage("سفارش شما با موفقیت ثبت شد.");
      } else if (successParam === "0" || successParam === "false") {
        setStatus("error");
        setMessage(searchParams.get("message") || "پرداخت انجام نشد یا لغو شد.");
      } else {
        setStatus("error");
        setMessage("پارامترهای بازگشت از درگاه نامعتبر است.");
      }
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [orderId, authority, successParam, searchParams]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">در حال تأیید پرداخت...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "success" ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-dark-titre">پرداخت موفق</h1>
            <p className="text-gray-600 dark:text-dark-text">{message}</p>
            {orderId && (
              <p className="text-sm text-gray-500">
                شماره سفارش: <strong>{orderId}</strong>
              </p>
            )}
            <Link href="/dashboard/orders">
              <Button className="bg-primary-600 text-white">مشاهده سفارش‌های من</Button>
            </Link>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-dark-titre">پرداخت ناموفق</h1>
            <p className="text-gray-600 dark:text-dark-text">{message}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/steps-cart">
                <Button variant="outline">بازگشت به پرداخت</Button>
              </Link>
              <Link href="/cart">
                <Button>سبد خرید</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
