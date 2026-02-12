import React from "react";
import { createMetadata } from "@/utils/metadata";
import { mockProduct } from "@/data";
import BreadCrump from "@/template/Product/BreadCrump";
import ProductClientWrapper from "@/template/Product/ProductClientWrapper";
import ProductDetailsAccordion from "@/template/Product/ProductDetailsAccordion";
import ProductReviewsSection from "@/template/Product/ProductReviewsSection";
import RelatedSlider from "@/template/Product/RelatedSlider";
import AccessoriesSlider from "@/template/Product/AccessoriesSlider";
import IndexLayout from "@/layout/IndexLayout";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  getProductName,
  getProductDescription,
  getMainImage,
  getProductUrl,
  getBreadcrumbItems,
  generateProductSchema,
  getProductImages,
} from "@/utils/productHelpers";
// import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  // در Next.js 15، params یک Promise است
  const resolvedParams = await params;
  const productId = resolvedParams?.productId;
  
  // استفاده از دیتای تستی
  const product = mockProduct;
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

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.productId;
  
  const product = mockProduct;
  
 

  const mainImage = getMainImage(product);
  const productImages = getProductImages(product);
  const breadcrumbItems = getBreadcrumbItems(product);
  const productSchema = generateProductSchema(product, productId);
  const colors = product?.colors || [];

  return (
    <IndexLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-transparent" dir="rtl">
        {/* Breadcrumbs - اطلاعات حیاتی در HTML اولیه */}
        <BreadCrump items={breadcrumbItems} />

        <div className="xl:container px-4 py-6">
          {/* Image برای SEO */}
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

          {/* اطلاعات حیاتی در Server Component - در HTML اولیه رندر می‌شوند */}
          <div className="grid grid-cols-12 gap-6">
            {/* Right Side: Product Images - Client Component */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-4 order-1 lg:order-1">
              <ProductClientWrapper 
                product={product} 
                productId={productId} 
                mainImage={mainImage}
                productImages={productImages}
                renderGalleryOnly={true}
              />
            </div>

            {/* Center: Product Information - اطلاعات حیاتی (h1, توضیحات) در Server Component */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-5 order-2 lg:order-2 space-y-6">
              {/* h1 و توضیحات - اطلاعات حیاتی در HTML اولیه */}
              <div>
                <h1 className="md:text-2xl text-gray-900 dark:text-dark-titre mb-2 text-right">
                  {product?.name || product?.title || "نام محصول"}
                </h1>
                {product?.englishName && (
                  <p className="text-xs md:text-sm text-gray-400 dark:text-caption mb-4 text-right">{product.englishName}</p>
                )}
                <div className="flex items-center gap-1 text-xs md:text-sm mb-4 border-b pb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 flex-none" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {product?.rating ? product.rating.toFixed(1) : "0.0"}
                  </span>
                  {product?.reviewCount && (
                    <span className="text-graty-500 dark:text-gray-400">
                      (<span className="text-primary-500 dark:text-dark-title">{product.reviewCount}</span>)
                    </span>
                  )}
                </div>
                {product?.shortDescription && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-gray-800 dark:text-dark-titre md:text-lg text-right">معرفی کوتاه</h3>
                    <p className="text-sm text-gray-600 leading-relaxed text-right">{product.shortDescription}</p>
                  </div>
                )}
                {product?.attributes && product.attributes.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-right text-gray-800 dark:text-white">ویژگی ها</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {product.attributes.map((atr, index) => (
                        <div key={index} className="bg-gray-100 border dark:bg-dark-field dark:border-0 border-gray-200 p-2 rounded-lg">
                          <p className="text-gray-700 dark:text-dark-titre max-md:text-sm">{atr.name}</p>
                          <p className="text-gray-500 text-sm dark:text-dark-text max-md:text-xs mt-2">{atr.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="max-md:hidden">
                <ProductDetailsAccordion />
              </div>
            </div>

            {/* Left Sidebar: Pricing - اطلاعات حیاتی (قیمت) در Server Component */}
            <div className="col-span-12 lg:col-span-3 order-3 lg:order-3">
              <div className="space-y-3">
                <div className="space-y-4 bg-white dark:bg-dark-box dark:border-dark-stroke border border-gray-200 rounded-xl overflow-hidden p-2.5">
                  {/* قیمت - اطلاعات حیاتی در HTML اولیه */}
                  <div>
                    <p className="text-gray-500 text-sm">قیمت :</p>
                    <div className="flex-between gap-2">
                      <div>
                        <span className="text-2xl">
                          {Number(product?.discountPrice || product?.price || 0).toLocaleString("fa-IR")}
                        </span>
                        <span className="text-sm">تومان</span>
                      </div>
                      {product?.price && product?.discountPrice && product.price > product.discountPrice && (
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                          {Math.round(((product.price - product.discountPrice) / product.price) * 100)}٪
                        </span>
                      )}
                    </div>
                    {product?.price && product?.discountPrice && product.price > product.discountPrice && (
                      <div className="text-sm text-gray-400 line-through mt-1">
                        {Number(product.price).toLocaleString("fa-IR")} تومان
                      </div>
                    )}
                  </div>
                  <div className="flex-between mt-6">
                    <p className="text-gray-500 text-sm">فروشگاه :</p>
                    <div className="flex-center gap-1">
                      <div className="text-sm text-gray-400">آمازون امارات</div>
                      <img src="/image/amazonLogo.png" className="w-10 h-max" alt="Amazon Logo" />
                    </div>
                  </div>
                  <ProductClientWrapper 
                    product={product} 
                    productId={productId} 
                    mainImage={mainImage}
                    productImages={productImages}
                    renderPurchaseOnly={true}
                  />
                </div>
              </div>
              <div className="md:hidden">
                <ProductDetailsAccordion />
              </div>
            </div>
          </div>

          {/* Product Reviews Section - Client Component (می‌تونه loading داشته باشه) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="md:col-span-4">
              <ProductReviewsSection />
              <RelatedSlider />
              <AccessoriesSlider />
            </div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
