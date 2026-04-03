/**
 * لایه سئو سند فنی ۲/۳: متا و اسکیما در سرور — View Source برای گوگل
 */

import { fetchProductForMeta } from "./fetchProductForMeta";
import ProductSchemaScript from "./ProductSchemaScript";
import { getProductName } from "@/utils/productHelpers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://micrls.com";

export async function generateMetadata({ params }) {
  const resolved = typeof params?.then === "function" ? await params : params;
  const productId = resolved?.productId ?? null;
  if (!productId) {
    return { title: "محصول | میکرولس" };
  }

  const data = await fetchProductForMeta(productId);
  if (!data) {
    return {
      title: "محصول یافت نشد | میکرولس",
      robots: { index: false, follow: true },
    };
  }

  const title =
    data.seoTitle ??
    data.SeoTitle ??
    data.metaTitle ??
    data.MetaTitle ??
    getProductName(data ?? {});
  const description =
    data.metaDescription ??
    data.MetaDescription ??
    data.metaDesc ??
    data.MetaDesc ??
    data.description ??
    "";
  const canonicalRaw =
    data.canonicalUrl ?? data.CanonicalUrl ?? data.canonical ?? data.Canonical;
  const noindex =
    data.isNoIndex === true || data.IsNoIndex === true;

  const base = SITE_URL.replace(/\/$/, "");
  const canonicalUrl =
    canonicalRaw && typeof canonicalRaw === "string"
      ? canonicalRaw.startsWith("http")
        ? canonicalRaw
        : `${base}${canonicalRaw.startsWith("/") ? "" : "/"}${canonicalRaw}`
      : `${base}/product/${productId}/`;

  const metaTitle = typeof title === "string" ? title : "محصول";
  const metaDesc = typeof description === "string" ? description.slice(0, 320) : "";
  const mainImage =
    data.image_url_hq ?? data.image_url ?? data.mainImage ?? data.mainImageUrl ?? data.image ?? null;
  const ogImage = mainImage && typeof mainImage === "string"
    ? (mainImage.startsWith("http") ? mainImage : `${base}${mainImage.startsWith("/") ? "" : "/"}${mainImage}`)
    : `${base}/image/Home/product.png`;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical: canonicalUrl },
    ...(noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: "میکرولس",
      images: [{ url: ogImage, width: 800, height: 800, alt: metaTitle }],
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
    },
  };
}

export default async function ProductSegmentLayout({ children, params }) {
  return (
    <>
      <ProductSchemaScript params={params} />
      {children}
    </>
  );
}
