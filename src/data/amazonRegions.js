/**
 * لیست داینامیک آمازون کشورها برای بخش «محصول خود را پیدا نکردید؟»
 * ترتیب: امارات اول، سپس آلمان، انگلستان، آمریکا
 */
export const AMAZON_REGIONS = [
  {
    id: "ae",
    name: "آمازون امارات",
    flag: "🇦🇪",
    baseUrl: "https://www.amazon.ae",
    searchParam: "k",
    src: "/emarat.png",
  },
  {
    id: "de",
    name: "آمازون آلمان",
    flag: "🇩🇪",
    baseUrl: "https://www.amazon.de",
    searchParam: "k",
    src: "/german.png",
  },
  {
    id: "uk",
    name: "آمازون انگلستان",
    flag: "🇬🇧",
    baseUrl: "https://www.amazon.co.uk",
    searchParam: "k",
    src: "/englis.png",
  },
  {
    id: "us",
    name: "آمازون آمریکا",
    flag: "🇺🇸",
    baseUrl: "https://www.amazon.com",
    searchParam: "k",
    src: "/usa.png",
  },
];

/** ساخت لینک جستجو برای یک منطقه (با عبارت صورت وجود) */
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
