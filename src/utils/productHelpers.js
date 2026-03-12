/**
 * Helper functions for product-related operations
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://micrls.com";

/**
 * Get normalized product images array (پشتیبانی از خروجی اسکرپر و بک‌اند).
 * هر آرایه‌ای که اسکرپر/بک‌اند بفرستد (images, imageUrls, image_urls) استفاده می‌شود؛
 * وگرنه از image_url و image_url_hq ساخته می‌شود.
 */
export function getProductImages(product) {
  const fromArray = (arr) =>
    Array.isArray(arr) && arr.length > 0
      ? arr.filter((u) => typeof u === "string" && u.trim().length > 0)
      : [];
  const list =
    fromArray(product?.images) ||
    fromArray(product?.imageUrls) ||
    fromArray(product?.image_urls) ||
    fromArray(product?.gallery);
  if (list.length > 0) return list;

  const hq = product?.image_url_hq || product?.mainImage || product?.mainImageUrl;
  const normal =
    product?.image_url || product?.image || product?.imageUrl || product?.mainImage;
  const out = [];
  if (hq && hq !== normal) out.push(hq);
  if (normal && !out.includes(normal)) out.push(normal);
  if (out.length > 0) return out;
  return hq ? [hq] : normal ? [normal] : [];
}

/**
 * Get main product image URL
 */
export function getMainImage(product) {
  const images = getProductImages(product);
  return images[0] || product?.image_url || product?.mainImage || "/image/Home/product.png";
}

/**
 * Convert relative image URL to absolute URL
 */
export function getAbsoluteImageUrl(imageUrl) {
  if (!imageUrl) return "";
  return imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`;
}

/**
 * نام کوتاه برند برای نمایش کنار «برند:» (همان چیزی که در آمازون جلوی Brand: است).
 * اگر مقدار ذخیره‌شده طولانی یا شبیه عنوان باشد، فقط قسمت اول (احتمالاً نام برند) برگردانده می‌شود.
 * @param {object} product - شیء محصول با فیلدهای brand یا brandName
 * @returns {string}
 */
export function getDisplayBrand(product) {
  const raw = product?.brand || product?.brandName || "";
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim();
  if (!s) return "";
  if (/^unknown$/i.test(s)) return "";
  // حذف پیشوند "Brand:" در صورت وجود
  if (/^Brand:\s*/i.test(s)) s = s.replace(/^Brand:\s*/i, "").trim();
  // اگر شامل جداکننده عنوان است (مثلاً "GameTime – 400 Games...") فقط قسمت اول = نام برند
  const sep = s.includes(" – ") ? " – " : s.includes(" | ") ? " | " : null;
  if (sep) return s.split(sep)[0].trim();
  // متن خیلی طولانی بدون جداکننده → برش با حداکثر طول
  const maxLen = 50;
  if (s.length > maxLen) return s.slice(0, maxLen).trim() + "…";
  return s;
}

/**
 * Convert array of image URLs to absolute URLs
 */
export function getAbsoluteImageUrls(imageUrls) {
  return imageUrls.map(getAbsoluteImageUrl);
}

/**
 * Get product URL (با trailing slash طبق سند ۲)
 */
export function getProductUrl(productId) {
  const base = SITE_URL.replace(/\/$/, "");
  return `${base}/product/${productId}/`;
}

/**
 * متن alt تصویر محصول — سند ۱: از فیلد سئو/داده (imageAlt, seoImageAlt) یا نام محصول
 */
export function getProductImageAlt(product) {
  return (
    product?.imageAlt ??
    product?.seoImageAlt ??
    product?.image_alt ??
    product?.ImageAlt ??
    getProductName(product)
  );
}

const NO_TITLE_FA = "بدون عنوان";

/**
 * عنوان نمایشی از واریانت‌ها (سایز/رنگ/استایل) وقتی API عنوان خالی برمی‌گرداند.
 */
function getTitleFromVariationDimensions(product) {
  const dims = product?.variation_dimensions ?? product?.variations ?? product?.variationDimensions;
  if (!dims || typeof dims !== "object") return "";
  const currentAsin = (product?.asin ?? product?.amazonASIN ?? product?.ASIN ?? "").toString().trim();
  if (!currentAsin) return "";
  const labels = [];
  for (const dim of Object.values(dims)) {
    if (!dim?.options || !Array.isArray(dim.options)) continue;
    const opt = dim.options.find((o) => (o.asin || "").toString().trim() === currentAsin);
    if (opt?.label) labels.push(opt.label);
  }
  return labels.length ? labels.join(" — ") : "";
}

/**
 * Get product name for display — ترجیح title_fa (فارسی) از اسکرپر، سپس title/name.
 * اگر عنوان خالی یا «بدون عنوان» باشد، از برچسب واریانت (سایز/رنگ) استفاده می‌کند.
 */
export function getProductName(product) {
  const raw = product?.title_fa ?? product?.titleFa ?? product?.name ?? product?.title ?? "";
  const t = typeof raw === "string" ? raw.trim() : "";
  if (t && t !== NO_TITLE_FA) return raw;
  const fromVariations = getTitleFromVariationDimensions(product);
  if (fromVariations) return fromVariations;
  return t === NO_TITLE_FA ? fromVariations || "محصول" : "محصول";
}

/**
 * بررسی می‌کند که متن عملاً همان عنوان محصول نباشد (تا در مشخصات فنی عنوان به‌جای توضیح نمایش داده نشود).
 */
function isEffectivelyTitle(product, text) {
  if (!text || !product) return false;
  const t = String(text).trim();
  const title = String(product?.title || product?.name || "").trim();
  if (!title) return false;
  if (t === title) return true;
  // اگر متن فقط عنوان + چند کاراکتر اضافه باشد (مثلاً همان جملهٔ تایتل در یک فیلد دیگر)
  if (t.length <= title.length + 100 && (t.includes(title) || title.includes(t))) return true;
  return false;
}

/**
 * Get product description (fallback chain) — ترجیح نسخهٔ فارسی (description_fa / shortDescription_fa)، سپس انگلیسی.
 * اسکرپر: description و در صورت نبود، bullet_points.
 * اگر مقدار به‌دست‌آمده عملاً همان عنوان محصول باشد، خالی برمی‌گرداند تا در مشخصات فنی دوباره نمایش داده نشود.
 */
export function getProductDescription(product) {
  const descFa = product?.description_fa ?? product?.shortDescription_fa ?? product?.descriptionFa ?? product?.shortDescriptionFa;
  const descEn = product?.shortDescription || product?.description || "";
  const desc = (descFa && String(descFa).trim()) ? descFa : descEn;
  if (desc.trim()) {
    if (isEffectivelyTitle(product, desc)) return "";
    return desc;
  }
  const bullets = product?.bullet_points;
  if (Array.isArray(bullets) && bullets.length > 0) {
    const joined = bullets.join("\n\n");
    if (isEffectivelyTitle(product, joined)) return "";
    // اگر فقط یک آیتم داریم و همان تایتل است، خالی برگردان
    if (bullets.length === 1 && isEffectivelyTitle(product, bullets[0])) return "";
    return joined;
  }
  return "";
}

/**
 * نرمال کردن برچسب برای کلید یکتا (اولین خط، فشرده‌سازی فاصله‌ها)
 */
function normalizeSpecLabelForKey(label) {
  if (label == null || typeof label !== "string") return "";
  const firstLine = label.split(/\n/)[0] || "";
  return firstLine.replace(/\s+/g, " ").trim();
}

/**
 * بررسی می‌کند مقدار مشخصات معنی‌دار است (نه خالی، نه فقط «:»، نه تکرار برچسب)
 */
function isMeaningfulSpecValue(value, label) {
  if (value == null || typeof value !== "string") return false;
  const v = value.replace(/\s+/g, " ").trim();
  if (!v || v === ":" || v === ":\u200f" || v.length < 2) return false;
  const labelNorm = normalizeSpecLabelForKey(label);
  if (labelNorm && v === labelNorm) return false;
  if (labelNorm && v.startsWith(labelNorm) && /^[\s:\u200f]*$/.test(v.slice(labelNorm.length))) return false;
  return true;
}

/**
 * آرایهٔ مشخصات فنی بدون تکرار و بدون سطرهای نامعتبر.
 * اسکرپر/آمازون گاهی همان فیلد را در چند جدول تکرار می‌کند یا مقدار را در label می‌گذارد و value فقط «:» می‌شود.
 * خروجی همان ساختار attributeها (name, name_fa, value, value_fa و ...) برای استفاده در گرید و آکاردئون.
 */
export function getDeduplicatedAttributes(product) {
  const attrs = product?.attributes;
  if (!Array.isArray(attrs) || attrs.length === 0) return [];
  const seenKeys = new Set();
  const result = [];
  for (const a of attrs) {
    const label = a.name_fa ?? a.nameFa ?? a.name ?? a.label ?? "";
    const value = String(a.value_fa ?? a.valueFa ?? a.value ?? "").trim();
    const key = normalizeSpecLabelForKey(label);
    if (!key) continue;
    if (!isMeaningfulSpecValue(value, label)) continue;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    result.push(a);
  }
  return result;
}

/**
 * Get breadcrumb items for product
 * دیتابیس: primaryCategoryName, categoryName, parentCategoryName
 * اسکرپر: category_path_str (مثلاً "الکترونیک > موبایل > گوشی") یا category
 */
export function getBreadcrumbItems(product) {
  const pathStr = product?.category_path_str;
  const fromPath = pathStr ? pathStr.split(" > ").pop()?.trim() || pathStr : null;
  const category =
    product?.primaryCategoryName ??
    product?.categoryName ??
    product?.category ??
    fromPath ??
    "کالای دیجیتال";
  const parentLabel = product?.parentCategoryName ?? "کالای دیجیتال";
  return [
    { label: parentLabel, href: "/categories" },
    { label: category, href: "/categories" },
    { label: getProductName(product) },
  ];
}

/**
 * Price calculation constants
 */
const COLOR_PRICE_MAP = {
  white: 0,
  gold: 500000,
  navy: 0,
  سفید: 0,
  طلایی: 500000,
  "سرمه ای": 0,
};

const DELIVERY_PRICE_MAP = {
  standard: 0,
  express: 1000000,
};

/**
 * Calculate final price including color and delivery options.
 * پایه = قیمت تومان (ourPrice/finalPrice از موتور قیمت) تا با باکس «قیمت» و سایدبار یکسان باشد.
 * وقتی پایه ۰ است (قیمت نامشخص)، خروجی ۰ باشد تا فقط هزینهٔ اکسپرس به‌عنوان «قیمت محصول» نمایش داده نشود.
 */
export function calculateProductPrice(product, selectedColor, selectedDelivery) {
  const baseToman = getDisplayPriceToman(product);
  if (!Number.isFinite(baseToman) || baseToman <= 0) return 0;
  const colorPrice = COLOR_PRICE_MAP[selectedColor] || 0;
  const deliveryPrice = DELIVERY_PRICE_MAP[selectedDelivery] || 0;
  const total = baseToman + colorPrice + deliveryPrice;
  return Number.isFinite(total) && total >= 0 ? total : 0;
}

/**
 * Parse numeric value from string (قیمت/امتیاز از اسکرپر ممکن است رشته باشد)
 */
export function parseProductNum(value) {
  if (value == null) return 0;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const s = String(value).replace(/,/g, "").replace(/[^\d.-]/g, "").trim();
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

/**
 * فرمت نمایش قیمت به تومان: فقط عدد صحیح، با جداکننده هزارگان فارسی، بدون اعشار یا اسلش.
 * برای نمایش در کارت و لیست محصولات (قیمت همیشه تومان).
 * مقدار ۰ = «قیمت نامشخص» (جلوگیری از نمایش اشتباه قیمت درهم به‌جای تومان).
 */
export function formatPriceToman(value) {
  const n = parseProductNum(value);
  if (!Number.isFinite(n) || n < 0 || n === 0) return "قیمت نامشخص";
  const integer = Math.round(n);
  return `${integer.toLocaleString("fa-IR", { maximumFractionDigits: 0 })} تومان`;
}

function parseNum(value) {
  return parseProductNum(value);
}

/**
 * Get base price of product — اسکرپر: current_price
 */
export function getBasePrice(product) {
  const raw =
    product?.discountPrice ??
    product?.current_price ??
    product?.price ??
    product?.ourPrice;
  return parseNum(raw);
}

/**
 * قیمت نمایشی به تومان برای کارت و بخش خرید.
 * فقط ourPrice/finalPrice (از موتور قیمت یا API) استفاده می‌شود؛ هرگز getBasePrice به‌عنوان تومان استفاده نمی‌شود
 * چون برای محصولات اسکرپر current_price در درهم (AED) است و نمایش آن به‌عنوان تومان اشتباه است (مثلاً «۶۵ تومان»).
 * از OurPrice/FinalPrice (PascalCase از API) هم پشتیبانی می‌شود.
 * مقادیر خیلی کوچک (< 1000) به‌عنوان تومان معتبر در نظر گرفته نمی‌شوند (احتمالاً AED ذخیره‌شده به‌عنوان تومان، مثلاً ۳۷).
 */
export function getDisplayPriceToman(product) {
  const toman = parseProductNum(
    product?.ourPrice ?? product?.finalPrice ?? product?.OurPrice ?? product?.FinalPrice
  );
  if (!Number.isFinite(toman) || toman <= 0) return 0;
  if (toman < 1000) return 0; // جلوگیری از نمایش «۳۷ تومان» وقتی مقدار درهم به‌اشتباه به‌عنوان تومان برگشته
  return toman;
}

/**
 * سند ۳: شناسه sku = ASIN؛ availability از وضعیت ناموجود
 */
function getProductAvailability(product) {
  const unavailable =
    product?.isUnavailable === true ||
    product?.IsUnavailable === true ||
    product?.available === false ||
    product?.status === "unavailable";
  const inStock =
    product?.isInStock ?? product?.is_in_stock ?? product?.inStock ?? true;
  return unavailable || !inStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";
}

/**
 * Generate Product JSON-LD schema — سند ۳: name, image, sku=ASIN, brand, offers با IRR و availability
 */
export function generateProductSchema(product, productId) {
  const productImages = getProductImages(product);
  const mainImage = getMainImage(product);
  const productUrl = getProductUrl(productId);
  const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const priceVal = getBasePrice(product);
  const availability = getProductAvailability(product);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getProductName(product),
    description: getProductDescription(product),
    image: getAbsoluteImageUrls(productImages),
    brand: {
      "@type": "Brand",
      name: product?.brandName ?? product?.brand ?? "نامشخص",
    },
    category: product?.categoryName ?? product?.category ?? "",
    sku: product?.asin ?? product?.amazonASIN ?? product?.id ?? productId,
    mpn: product?.id ?? product?.asin ?? productId,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "IRR",
      price: String(priceVal),
      priceValidUntil: oneYearLater,
      availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: product?.seller ?? "میکرولس",
      },
    },
  };

  const ratingVal = parseNum(product?.rating);
  const reviewCountVal = Math.floor(parseNum(product?.reviews_count ?? product?.reviewCount));
  if (ratingVal > 0 || reviewCountVal > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(ratingVal),
      reviewCount: String(reviewCountVal),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

/**
 * سند ۳: BreadcrumbList JSON-LD — Home > Cat > SubCat > Product برای گوگل
 * @param {Array<{ label: string, href?: string }>} items
 * @param {string} currentPageUrl - آدرس کامل صفحه فعلی (برای آیتم آخر بدون href)
 */
export function generateBreadcrumbListSchema(items, currentPageUrl) {
  const base = SITE_URL.replace(/\/$/, "");
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${base}${item.href.startsWith("/") ? "" : "/"}${item.href}` : currentPageUrl,
    })),
  };
}

/**
 * سند ۳: لینک به صفحه برند برای Auto-Interlinking — /products?brand=
 */
export function getBrandUrl(brand) {
  if (!brand || typeof brand !== "string") return "/products/";
  return `/products/?brand=${encodeURIComponent(brand.trim())}`;
}

/**
 * مپ ProductListDto (خروجی api/Product) به فرمت قابل استفاده در ProductCard.
 */
export function mapProductListDto(item) {
  if (!item) return null;
  return {
    id: item.id,
    productId: item.id,
    title: item.title_fa ?? item.title,
    name: item.title_fa ?? item.title,
    mainImageUrl: item.mainImageUrl,
    image: item.mainImageUrl,
    price: item.price ?? item.finalPrice,
    discountPrice: item.discountPrice ?? item.finalPrice,
    original_price: item.price,
    current_price: item.discountPrice ?? item.finalPrice,
    rating: item.rating,
    reviewCount: item.reviewCount,
    reviews_count: item.reviewCount,
    brand: item.brand,
    categoryName: item.categoryName,
    discountPercentage: item.discountPercentage,
    discount_percentage: item.discountPercentage ?? item.discount_percentage,
    isBestSeller: item.isBestSeller,
    amazonASIN: item.amazonASIN,
  };
}

