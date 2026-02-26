/**
 * سند ۳: اسکیمای Product و BreadcrumbList در سرور (SSR) تا در View Source برای گوگل موجود باشد.
 */

import { fetchProductForMeta } from "./fetchProductForMeta";
import {
  generateProductSchema,
  generateBreadcrumbListSchema,
  getBreadcrumbItems,
  getProductUrl,
} from "@/utils/productHelpers";

export default async function ProductSchemaScript({ params }) {
  const resolved = typeof params?.then === "function" ? await params : params;
  const productId = resolved?.productId ?? null;
  if (!productId) return null;

  const data = await fetchProductForMeta(productId);
  if (!data) return null;

  let productSchema = generateProductSchema(data, productId);
  const rawSchema = data.schemaJson ?? data.SchemaJson;
  if (rawSchema != null && rawSchema !== "") {
    try {
      const parsed = typeof rawSchema === "string" ? JSON.parse(rawSchema) : rawSchema;
      if (parsed && (typeof parsed === "object" || Array.isArray(parsed))) productSchema = parsed;
    } catch (_) {}
  }
  const breadcrumbItems = getBreadcrumbItems(data);
  const currentPageUrl = getProductUrl(productId);
  const breadcrumbSchema = generateBreadcrumbListSchema(breadcrumbItems, currentPageUrl);
  const schemaArray = [productSchema, breadcrumbSchema].filter(Boolean);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          schemaArray.length === 1 ? schemaArray[0] : schemaArray
        ),
      }}
    />
  );
}
