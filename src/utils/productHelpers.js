/**
 * Helper functions for product-related operations
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://micrls.com";

/**
 * Get normalized product images array
 */
export function getProductImages(product) {
  if (product?.images && product.images.length > 0) {
    return product.images;
  }
  return product?.mainImage ? [product.mainImage] : [];
}

/**
 * Get main product image URL
 */
export function getMainImage(product) {
  const images = getProductImages(product);
  return images[0] || product?.mainImage || "/image/Home/product.png";
}

/**
 * Convert relative image URL to absolute URL
 */
export function getAbsoluteImageUrl(imageUrl) {
  if (!imageUrl) return "";
  return imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`;
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
 * Get product name (fallback to title)
 */
export function getProductName(product) {
  return product?.name || product?.title || "محصول";
}

/**
 * Get product description (fallback chain)
 */
export function getProductDescription(product) {
  return product?.shortDescription || product?.description || "";
}

/**
 * Get breadcrumb items for product
 */
export function getBreadcrumbItems(product) {
  return [
    { label: product?.parentCategoryName || "کالای دیجیتال", href: "/categories" },
    { label: product?.categoryName || "ساعت هوشمند", href: "/categories" },
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
  const basePrice = product?.discountPrice || product?.price || 0;
  const colorPrice = COLOR_PRICE_MAP[selectedColor] || 0;
  const deliveryPrice = DELIVERY_PRICE_MAP[selectedDelivery] || 0;
  return basePrice + colorPrice + deliveryPrice;
}

/**
 * Get base price of product
 */
export function getBasePrice(product) {
  return product?.discountPrice || product?.price || 0;
}

/**
 * Generate Product JSON-LD schema
 */
export function generateProductSchema(product, productId) {
  const productImages = getProductImages(product);
  const mainImage = getMainImage(product);
  const productUrl = getProductUrl(productId);
  const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getProductName(product),
    description: getProductDescription(product),
    image: getAbsoluteImageUrls(productImages),
    brand: {
      "@type": "Brand",
      name: product?.brandName || "نامشخص",
    },
    category: product?.categoryName || "",
    sku: product?.id || productId,
    mpn: product?.id || productId,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "IRR",
      price: String(product?.discountPrice || product?.price || 0),
      priceValidUntil: oneYearLater,
      availability: product?.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: product?.seller || "میکرولس",
      },
    },
  };

  // Add aggregateRating if available
  if (product?.rating && product?.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviewCount),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

