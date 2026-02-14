import React from "react";
import { createMetadata } from "@/utils/metadata";
import { mockProduct } from "@/data";
import BreadCrump from "@/template/Product/BreadCrump";
import ProductClientWrapper from "@/template/Product/ProductClientWrapper";
import IndexLayout from "@/layout/IndexLayout";
import Image from "next/image";
import {
  getProductName,
  getProductDescription,
  getMainImage,
  getProductUrl,
  getBreadcrumbItems,
  generateProductSchema,
} from "@/utils/productHelpers";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const product = mockProduct;
  const productId = params?.productId;
  const productName = getProductName(product);
  const description = getProductDescription(product) || `خرید ${productName} از آمازون با ارسال سریع به ایران`;
  const image = getMainImage(product);
  const productUrl = getProductUrl(productId);

  return createMetadata({
    title: `${productName} | میکرولس`,
    description,
    keywords: [productName, "خرید", "آمازون", "محصولات"],
    image,
    url: productUrl,
  });
}

export default function ProductDetailPage({ params }) {
  const product = mockProduct;
  const productId = params?.productId;
  const mainImage = getMainImage(product);
  const breadcrumbItems = getBreadcrumbItems(product);
  const productSchema = generateProductSchema(product, productId);

  return (
    <IndexLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-transparent" dir="rtl">
        <BreadCrump items={breadcrumbItems} />

        <div className="xl:container px-4 py-6">
          <div className="sr-only">
            <Image
              src={mainImage}
              alt={getProductName(product)}
              width={800}
              height={800}
              priority
              fetchPriority="high"
            />
          </div>
          <ProductClientWrapper product={product} productId={productId} mainImage={mainImage} />
        </div>
      </div>
    </IndexLayout>
  );
}
