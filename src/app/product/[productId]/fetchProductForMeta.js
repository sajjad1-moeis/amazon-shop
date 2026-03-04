/**
 * سند ۲/۳: واکشی محصول برای متا و اسکیما در سرور — با cache برای یک بار fetch در هر درخواست
 */

import { cache } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://micrls.com/api";

export const fetchProductForMeta = cache(async (productId) => {
  if (!productId) return null;
  const isNumeric = /^\d+$/.test(String(productId));
  const url = isNumeric
    ? `${API_BASE}/Product/GetById?id=${encodeURIComponent(productId)}`
    : `${API_BASE}/Product/GetBySlug?slug=${encodeURIComponent(productId)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    const json = await res.json();
    const data = json?.data ?? json;
    if (!data || (json?.success === false && !data)) return null;
    return data;
  } catch {
    return null;
  }
});
