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
 * Get product URL
 */
export function getProductUrl(productId) {
  return `${SITE_URL}/product/${productId}`;
}

/**
 * متن alt تصویر محصول — دیتابیس: imageAlt, seoImageAlt؛ اسکرپر: image_alt؛ وگرنه نام محصول
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

/**
 * Get product name (fallback to title) — اسکرپر: title
 */
export function getProductName(product) {
  return product?.name || product?.title || "محصول";
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
 * Get product description (fallback chain) — اسکرپر: description و در صورت نبود، bullet_points.
 * اگر مقدار به‌دست‌آمده عملاً همان عنوان محصول باشد، خالی برمی‌گرداند تا در مشخصات فنی دوباره نمایش داده نشود.
 */
export function getProductDescription(product) {
  const desc = product?.shortDescription || product?.description || "";
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
 * Calculate final price including color and delivery options
 */
export function calculateProductPrice(product, selectedColor, selectedDelivery) {
  const basePrice = getBasePrice(product);
  const colorPrice = COLOR_PRICE_MAP[selectedColor] || 0;
  const deliveryPrice = DELIVERY_PRICE_MAP[selectedDelivery] || 0;
  return basePrice + colorPrice + deliveryPrice;
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
 * Generate Product JSON-LD schema
 */
export function generateProductSchema(product, productId) {
  const productImages = getProductImages(product);
  const mainImage = getMainImage(product);
  const productUrl = getProductUrl(productId);
  const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const priceVal = getBasePrice(product);
  const inStock =
    product?.isInStock ?? product?.is_in_stock ?? product?.inStock ?? true;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getProductName(product),
    description: getProductDescription(product),
    image: getAbsoluteImageUrls(productImages),
    brand: {
      "@type": "Brand",
      name: product?.brandName || product?.brand || "نامشخص",
    },
    category: product?.categoryName || product?.category || "",
    sku: product?.id || product?.asin || productId,
    mpn: product?.id || product?.asin || productId,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "IRR",
      price: String(priceVal),
      priceValidUntil: oneYearLater,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: product?.seller || "میکرولس",
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
 * مپ ProductListDto (خروجی api/Product) به فرمت قابل استفاده در ProductCard.
 */
export function mapProductListDto(item) {
  if (!item) return null;
  return {
    id: item.id,
    productId: item.id,
    title: item.title,
    name: item.title,
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

