/**
 * لیست داینامیک آمازون کشورها برای بخش «محصول خود را پیدا نکردید؟»
 * با اضافه/حذف آیتم می‌توان بخش را بدون تغییر کامپوننت به‌روز کرد.
 */
export const AMAZON_REGIONS = [
  {
    id: "us",
    name: "جستجوی مستقیم در آمازون آمریکا",
    flag: "🇺🇸",
    baseUrl: "https://www.amazon.com",
    searchParam: "k",
  },
  {
    id: "tr",
    name: "جستجوی مستقیم در آمازون ترکیه",
    flag: "🇹🇷",
    baseUrl: "https://www.amazon.com.tr",
    searchParam: "k",
  },
  {
    id: "ae",
    name: "جستجوی مستقیم در آمازون امارات",
    flag: "🇦🇪",
    baseUrl: "https://www.amazon.ae",
    searchParam: "k",
  },
];

/** ساخت لینک جستجو برای یک منطقه (با عبارت جستجو در صورت وجود) */
export function getRegionSearchUrl(region, searchQuery = "") {
  const q = typeof searchQuery === "string" ? searchQuery.trim() : "";
  const param = region.searchParam || "k";
  if (!q) return region.baseUrl;
  try {
    const url = new URL("/s", region.baseUrl);
    url.searchParams.set(param, q);
    return url.toString();
  } catch {
    return `${region.baseUrl}/s?${param}=${encodeURIComponent(q)}`;
  }
}
