/**
 * ساخت لیست ویژگی‌های مقایسه از محصولات (از product.features).
 * کلیدهای شناخته‌شده با برچسب فارسی، بقیه با خود key نمایش داده می‌شوند.
 */
const FEATURE_LABELS = {
  brand: "برند",
  model: "مدل",
  diskDrive: "درایو دیسک",
  outputResolution: "وضوح خروجی",
  frameRate: "نرخ فریم",
  weight: "وزن",
  color: "رنگ",
  storage: "حافظه",
  ram: "رم",
  screenSize: "اندازه صفحه‌نمایش",
  battery: "باتری",
  camera: "دوربین",
  cpu: "پردازنده",
  gpu: "کارت گرافیک",
  os: "سیستم عامل",
};

/**
 * @param {Array<{ features?: Record<string, unknown> }>} products
 * @returns {{ key: string, label: string }[]}
 */
function getFeatureLikeObject(product) {
  const o = product?.features ?? product?.attributes ?? product?.specs;
  return o && typeof o === "object" ? o : {};
}

export function buildComparisonFeatures(products) {
  const keySet = new Set();
  for (const p of products || []) {
    Object.keys(getFeatureLikeObject(p)).forEach((k) => keySet.add(k));
  }
  return Array.from(keySet).map((key) => ({
    key,
    label: FEATURE_LABELS[key] || key,
  }));
}

/**
 * پارس عددی قیمت برای مقایسه (رشته فارسی یا انگلیسی با کاما)
 * @param {string|number|undefined} value
 * @returns {number}
 */
function parsePriceValue(value) {
  if (value == null) return 0;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const str = String(value).replace(/[٬،,\s]/g, "").replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const num = parseInt(str, 10);
  return Number.isNaN(num) ? 0 : num;
}

/**
 * ساخت کارت‌های «تفاوت‌های کلیدی» از داده واقعی محصولات (ارزان‌ترین، بالاترین امتیاز).
 * @param {Array<{ id?: string; productId?: string; title?: string; price?: string|number; rating?: number }>} products
 * @returns {{ icon: string; title: string; description: string }[]}
 */
export function buildHighlightCards(products) {
  if (!Array.isArray(products) || products.length < 2) return [];

  const withPrice = products.map((p) => ({
    ...p,
    _priceNum: parsePriceValue(p?.price ?? p?.priceAfterDiscount),
  }));
  const withRating = products.filter((p) => p?.rating != null && Number(p.rating) > 0);

  const cheapest = withPrice.slice().sort((a, b) => a._priceNum - b._priceNum)[0];
  const highestRated = withRating.length
    ? withRating.slice().sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))[0]
    : null;

  const cards = [];
  if (cheapest && (cheapest.title || cheapest.name)) {
    const name = cheapest.title || cheapest.name || "این محصول";
    cards.push({
      iconKey: "Tag",
      title: "قیمت اقتصادی‌تر",
      description: `${name} با کمترین قیمت در این مقایسه است.`,
    });
  }
  if (highestRated && (highestRated.title || highestRated.name) && highestRated !== cheapest) {
    const name = highestRated.title || highestRated.name || "این محصول";
    cards.push({
      iconKey: "Save2",
      title: "بالاترین امتیاز",
      description: `${name} با امتیاز ${highestRated.rating} بهترین بازخورد را دارد.`,
    });
  }
  return cards.slice(0, 2);
}
