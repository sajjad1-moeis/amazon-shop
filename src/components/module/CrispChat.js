"use client";

import { useCallback, useEffect, useState } from "react";

const CRISP_WEBSITE_ID =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CRISP_WEBSITE_ID
    ? process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    : "4e13846e-a58b-4f6c-a145-36c3d851cfc0";

let crispInitPromise = null;

function ensureCrisp() {
  if (!crispInitPromise) {
    crispInitPromise = import("crisp-sdk-web")
      .then(({ Crisp, ChatboxPosition }) => {
        Crisp.configure(CRISP_WEBSITE_ID);
        Crisp.setPosition(ChatboxPosition.Left);
        return Crisp;
      })
      .catch((err) => {
        crispInitPromise = null;
        throw err;
      });
  }
  return crispInitPromise;
}

/**
 * برای دکمهٔ «پشتیبانی» در هدر: بعد از لود SDK، چت را باز می‌کند.
 */
export function useCrispOnClick() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    ensureCrisp()
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loadAndOpen = useCallback(() => {
    ensureCrisp()
      .then((Crisp) => {
        Crisp.chat.open();
      })
      .catch(() => {});
  }, []);

  return { loadAndOpen, loading };
}

/**
 * ویجت چت Crisp — آیکون و چت پیش‌فرض Crisp در سمت چپ صفحه.
 */
export default function CrispChat() {
  useEffect(() => {
    ensureCrisp().catch(() => {});
  }, []);

  return null;
}
