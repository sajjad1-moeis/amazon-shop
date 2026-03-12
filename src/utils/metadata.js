/**
 * Helper functions for generating metadata
 */

/** آدرس پایه سایت برای canonical و تصاویر */
export function getSiteBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://micrls.com";
}

/**
 * استخراج فیلدهای سئو از آبجکت محصول (پشتیبانی از PascalCase و camelCase طبق سند فنی).
 * برای استفاده در کلاینت؛ هد را با document و meta/link به‌روز می‌کند.
 */
export function applyProductSeoHead(product) {
  if (!product || typeof document === "undefined") return;

  const title =
    product.seoTitle ??
    product.SeoTitle ??
    product.title_fa ??
    product.title ??
    product.name ??
    "محصول";
  const desc =
    product.metaDescription ??
    product.MetaDescription ??
    product.metaDesc ??
    product.MetaDesc ??
    product.description ??
    "";
  const canonicalRaw =
    product.canonicalUrl ??
    product.CanonicalUrl ??
    product.canonical ??
    product.Canonical;
  const isNoIndex =
    product.isNoIndex === true ||
    product.IsNoIndex === true;

  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute("content", typeof desc === "string" ? desc.slice(0, 320) : "");

  const baseUrl = getSiteBaseUrl();
  const base = baseUrl.replace(/\/$/, "");
  const id = product.id ?? product.productId ?? product.asin ?? "";
  const canonicalHref =
    canonicalRaw && typeof canonicalRaw === "string"
      ? canonicalRaw.startsWith("http")
        ? canonicalRaw
        : `${base}${canonicalRaw.startsWith("/") ? "" : "/"}${canonicalRaw}`
      : `${base}/product/${id}/`;

  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement("link");
    linkCanonical.setAttribute("rel", "canonical");
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute("href", canonicalHref);

  let metaRobots = document.querySelector('meta[name="robots"]');
  if (isNoIndex) {
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");
  } else if (metaRobots) {
    metaRobots.remove();
  }
}

export function createMetadata({ title, description, keywords, image, url }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://micrls.com";
  const defaultImage = `${siteUrl}/image/logo-blue.png`;

  return {
    title,
    description,
    keywords: keywords?.join(", ") || "",
    openGraph: {
      title,
      description,
      url: url || siteUrl,
      siteName: "میکرولس",
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || defaultImage],
    },
    alternates: {
      canonical: url || siteUrl,
    },
  };
}

