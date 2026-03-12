"use client";

import { useEffect } from "react";

const CRISP_WEBSITE_ID =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CRISP_WEBSITE_ID
    ? process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    : "4e13846e-a58b-4f6c-a145-36c3d851cfc0";

/**
 * ویجت چت Crisp — آیکون و چت پیش‌فرض Crisp در سمت چپ صفحه.
 */
export default function CrispChat() {
  useEffect(() => {
    import("crisp-sdk-web").then(({ Crisp, ChatboxPosition }) => {
      Crisp.configure(CRISP_WEBSITE_ID);
      Crisp.setPosition(ChatboxPosition.Left);
    }).catch(() => {});
  }, []);

  return null;
}
