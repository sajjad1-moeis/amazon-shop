"use client";

import { useCallback, useRef, useState } from "react";

const CRISP_SCRIPT = "https://client.crisp.chat/l.js";

/**
 * لود اسکریپت Crisp فقط با کلیک کاربر (بدون لود خودکار).
 * بعد از اولین کلیک، اسکریپت یک‌بار لود می‌شود و چت باز می‌شود.
 */
export function useCrispOnClick() {
  const loaded = useRef(false);
  const [loading, setLoading] = useState(false);

  const loadAndOpen = useCallback(() => {
    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (!websiteId) {
      window.open("/contact-us", "_blank");
      return;
    }
    if (loaded.current) {
      if (typeof window !== "undefined" && window.$crisp) {
        try {
          window.$crisp.push(["do", "chat:open"]);
        } catch (_) {}
      }
      return;
    }
    setLoading(true);
    if (typeof window !== "undefined") {
      window.CRISP_WEBSITE_ID = websiteId;
      window.$crisp = [];
    }
    const script = document.createElement("script");
    script.src = CRISP_SCRIPT;
    script.async = true;
    script.onload = () => {
      loaded.current = true;
      setLoading(false);
      if (window.$crisp) {
        try {
          window.$crisp.push(["config", "color:primary", ["#6366f1"]]);
          window.$crisp.push(["do", "chat:open"]);
        } catch (_) {}
      }
    };
    script.onerror = () => setLoading(false);
    document.head.appendChild(script);
  }, []);

  return { loadAndOpen, loading };
}
