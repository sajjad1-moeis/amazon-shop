"use client";

import { useCallback, useState } from "react";

const CRISP_WEBSITE_ID =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CRISP_WEBSITE_ID
    ? process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    : "4e13846e-a58b-4f6c-a145-36c3d851cfc0";

let crispModulePromise = null;

function getCrispModule() {
  if (!crispModulePromise) {
    crispModulePromise = import("crisp-sdk-web");
  }
  return crispModulePromise;
}

/**
 * Crisp فقط با کلیک «پشتیبانی ۲۴ ساعته» در هدر لود می‌شود (بدون درخواست به crisp.chat در لود اولیهٔ صفحه).
 */
export function useCrispOnClick() {
  const [loading, setLoading] = useState(false);

  const loadAndOpen = useCallback(() => {
    setLoading(true);
    getCrispModule()
      .then(({ Crisp, ChatboxPosition }) => {
        Crisp.configure(CRISP_WEBSITE_ID, { autoload: false });
        Crisp.setPosition(ChatboxPosition.Left);
        Crisp.chat.open();
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { loadAndOpen, loading };
}

/** عمداً خالی: ویجت پیش‌فرض Crisp در layout رندر نمی‌شود تا اسکریپت خارجی در لود اول نیاید. */
export default function CrispChat() {
  return null;
}
