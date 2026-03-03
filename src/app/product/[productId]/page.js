"use client";

import React, { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import IndexLayout from "@/layout/IndexLayout";
import ProductDetailsAccordion from "@/template/Product/ProductDetailsAccordion";
import ProductReviewsSection from "@/template/Product/ProductReviewsSection";
import RelatedSlider from "@/template/Product/RelatedSlider";
import AccessoriesSlider from "@/template/Product/AccessoriesSlider";
import BreadCrump from "@/template/Product/BreadCrump";
import ProductClientWrapper from "@/template/Product/ProductClientWrapper";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product/productService";
import {
  getProductName,
  getMainImage,
  getProductImages,
  getBreadcrumbItems,
  getBasePrice,
  getProductDescription,
  getDisplayBrand,
  parseProductNum,
  generateProductSchema,
} from "@/utils/productHelpers";
import { prefetchScraperDetails, getScraperDetailsCached } from "@/utils/scraperPrefetch";
import { useAuth } from "@/contexts/AuthContext";
import { userRecentViewService } from "@/services/userRecentView/userRecentViewService";

export default function ProductDetailPage({ params }) {
  const resolved = use(
    typeof params?.then === "function" ? params : Promise.resolve(params ?? {})
  );
  const productId = resolved?.productId ?? null;
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsEnriching, setDetailsEnriching] = useState(false);
  const [selectedColor, setSelectedColor] = useState("navy");
  const [selectedDelivery, setSelectedDelivery] = useState("express");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setError("شناسه محصول نامعتبر است");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    const isNumericId = /^\d+$/.test(String(productId));
    const MAX_SAFE_INT32 = 2147483647;
    const numId = Number(productId);
    const isValidNumericId = isNumericId && Number.isFinite(numId) && numId <= MAX_SAFE_INT32 && numId >= -MAX_SAFE_INT32;

    const applyProduct = (dto) => {
      if (cancelled) return;
      setProduct(dto);
    };
    const fail = (msg) => {
      if (cancelled) return;
      setError(msg || "خطا در دریافت اطلاعات محصول");
      setProduct(null);
    };
    const getErrorMessage = (err) => {
      const isNetworkError =
        err?.message === "Failed to fetch" ||
        err?.name === "TypeError" ||
        (typeof err?.message === "string" && err.message.toLowerCase().includes("network"));
      return isNetworkError
        ? "اتصال به سرور برقرار نشد. لطفاً اتصال اینترنت و وضعیت سرور را بررسی کنید."
        : (err?.message || err?.data?.message || "خطا در دریافت اطلاعات محصول");
    };
    const done = () => {
      if (!cancelled) setLoading(false);
    };

    if (isValidNumericId) {
      productService
        .getById(productId)
        .then((response) => {
          if (cancelled) return;
          const dto = response?.data ?? response;
          if (!dto || response?.success === false) throw new Error(response?.message || "محصول یافت نشد");
          applyProduct(dto);
        })
        .catch((err) => {
          if (cancelled) return;
          console.error("Error loading product details:", err);
          fail(getErrorMessage(err));
        })
        .finally(done);
      return () => {
        cancelled = true;
      };
    }

    // پارامتر ASIN است (مثلاً از کلیک روی نتایج اسکرپ) — اول لود کامل (عکس‌ها + جزئیات)، بعد یک‌بار ذخیره
    productService
      .getByASIN(productId)
      .then((response) => {
        if (cancelled) return;
        const dto = response?.data ?? response;
        if (!dto || response?.success === false) throw new Error(response?.message || "محصول یافت نشد");
        applyProduct(dto);
      })
      .catch(() => {
        if (cancelled) return;
        let payload = null;
        try {
          const raw = typeof sessionStorage !== "undefined" ? sessionStorage.getItem(`scraperProduct_${productId}`) : null;
          if (raw) payload = JSON.parse(raw);
        } catch (_) {}
        if (!payload?.asin) {
          fail("محصول یافت نشد");
          done();
          return;
        }
        // صبر برای لود کامل: اول جزئیات را بگیر؛ اگر ناقص بود چند ثانیه صبر کن و دوباره بگیر؛ کامل‌ترین پاسخ را استفاده کن، بعد ذخیره
        const FULL_DETAILS_WAIT_MS = 5000;
        const isDetailsComplete = (d) => {
          if (!d || !d.success) return false;
          const imgCount = Array.isArray(d.images) ? d.images.length : 0;
          const hasDesc = d.description && String(d.description).trim().length > 80;
          return imgCount >= 2 || hasDesc;
        };
        const richness = (d) => {
          if (!d || !d.success) return 0;
          const imgs = Array.isArray(d.images) ? d.images.length : 0;
          const descLen = d.description ? String(d.description).trim().length : 0;
          return imgs * 10 + Math.min(descLen / 50, 20);
        };
        const fetchDetails = () =>
          productService.getScraperProductDetails(productId) || prefetchScraperDetails(productId) || Promise.resolve(null);
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        fetchDetails()
          .then((first) => {
            if (cancelled) return null;
            if (isDetailsComplete(first)) return first;
            return wait(FULL_DETAILS_WAIT_MS)
              .then(() => fetchDetails())
              .then((second) => {
                if (cancelled) return null;
                return richness(second) >= richness(first) ? second : first;
              });
          })
          .then((detailsRes) => {
            if (cancelled) return null;
            const fullPayload = { ...payload };
            const details = detailsRes?.success ? detailsRes : detailsRes;
            if (details) {
              if (Array.isArray(details.images) && details.images.length > 0)
                fullPayload.images = details.images;
              if (details.description) fullPayload.description = details.description;
              if (details.description_html) fullPayload.description_html = details.description_html;
              if (Array.isArray(details.attributes) && details.attributes.length > 0)
                fullPayload.attributes = details.attributes;
              if (Array.isArray(details.reviews) && details.reviews.length > 0)
                fullPayload.reviews = details.reviews;
              if (details.reviews_count != null) fullPayload.reviews_count = details.reviews_count;
              if (details.rating != null) fullPayload.rating = details.rating;
              if (Array.isArray(details.bullet_points) && details.bullet_points.length > 0)
                fullPayload.bullet_points = details.bullet_points;
              if (Array.isArray(details.features) && details.features.length > 0)
                fullPayload.features = details.features;
              if (details.brand) fullPayload.brand = details.brand;
              if (details.category_path_str) fullPayload.category_path_str = details.category_path_str;
              if (details.weight_kg != null) fullPayload.weight_kg = details.weight_kg;
              if (details.weight_category) fullPayload.weight_category = details.weight_category;
              if (details.dimensions) fullPayload.dimensions = details.dimensions;
            }
            return productService.saveIfNotExistsFromScraper(fullPayload).then((res) => ({ res, fullPayload }));
          })
          .then((data) => {
            if (cancelled) return;
            if (!data) return;
            const { res, fullPayload } = data;
            const savedId =
              res?.data?.productId ?? res?.data?.id ?? res?.data?.productID ?? res?.data?.ProductId;
            try {
              if (typeof sessionStorage !== "undefined") sessionStorage.removeItem(`scraperProduct_${productId}`);
            } catch (_) {}
            if (res?.success && savedId != null) {
              return productService.getById(savedId).then((response) => ({ response, payload: fullPayload }));
            }
            throw new Error("ذخیره محصول انجام نشد");
          })
          .then((data) => {
            if (cancelled || !data) return;
            const { response, payload } = data;
            const dto = response?.data ?? response;
            if (!dto || response?.success === false) throw new Error(response?.message || "محصول یافت نشد");
            if (payload && typeof payload === "object") {
              if (Array.isArray(payload.images) && payload.images.length > 0) dto.images = payload.images;
              else if (Array.isArray(payload.image_urls) && payload.image_urls.length > 0) dto.image_urls = payload.image_urls;
              if (Array.isArray(payload.reviews) && payload.reviews.length > 0) dto.reviews = payload.reviews;
              if (payload.description) dto.description = payload.description;
              if (payload.description_html) dto.description_html = payload.description_html;
              if (payload.currency) dto.currency = payload.currency;
              if (payload.seller) dto.seller = payload.seller;
              if (payload.amazonShopName) dto.amazonShopName = payload.amazonShopName;
              if (payload.attributes?.length) dto.attributes = payload.attributes;
              if (payload.bullet_points?.length) dto.bullet_points = payload.bullet_points;
              if (payload.features?.length) dto.features = payload.features;
              if (payload.brand) dto.brand = payload.brand;
              if (payload.category_path_str) dto.category_path_str = payload.category_path_str;
              if (payload.weight_kg != null) dto.weight_kg = payload.weight_kg;
              if (payload.weight_category) dto.weight_category = payload.weight_category;
              if (payload.dimensions) dto.dimensions = payload.dimensions;
              if (payload.product_url) dto.amazonUrl = dto.amazonUrl || payload.product_url;
            }
            applyProduct(dto);
          })
          .catch((err) => {
            if (cancelled) return;
            console.error("Error loading product details:", err);
            fail(getErrorMessage(err));
          })
          .finally(done);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  // ثبت بازدید اخیر (برای کاربر لاگین‌شده) — فقط وقتی id در محدوده int32 باشد
  const MAX_SAFE_INT32_PAGE = 2147483647;
  useEffect(() => {
    if (!userId || !product) return;
    const pid = product.id ?? productId;
    if (!pid) return;
    const numericId = /^\d+$/.test(String(pid)) ? Number(pid) : null;
    if (numericId == null || numericId > MAX_SAFE_INT32_PAGE || numericId < -MAX_SAFE_INT32_PAGE) return;
    userRecentViewService.trackView(userId, { productId: numericId }).catch(() => {});
  }, [userId, product?.id, productId]);

  // ==========================================
  // On-demand enrichment — فقط یک درخواست /details (عکس + توضیحات + برند + مشخصات)
  // مثل استراتژی عکس‌ها؛ همهٔ جزئیات با هم و سریع لود می‌شوند.
  // ==========================================
  const detailsPromiseRef = useRef(null);
  const detailsEnrichedAsinRef = useRef(null);

  const isAsinInUrl = productId && !/^\d+$/.test(String(productId));
  const dataSource = isAsinInUrl ? "scraper" : "db";
  const asinForScraper = isAsinInUrl ? productId : (product?.asin ?? null);

  // فقط details را از اول صدا بزن (یک درخواست؛ عکس‌ها داخل همان پاسخ هستند)
  useEffect(() => {
    if (dataSource !== "scraper") return;
    if (!isAsinInUrl) return;
    detailsPromiseRef.current = prefetchScraperDetails(productId);
  }, [productId, isAsinInUrl, dataSource]);

  useEffect(() => {
    if (dataSource !== "scraper") return;
    if (isAsinInUrl || !product?.asin) return;
    if (!detailsPromiseRef.current) detailsPromiseRef.current = prefetchScraperDetails(product.asin);
  }, [isAsinInUrl, product?.asin, dataSource]);

  const mergeDetailsIntoProduct = (res) => {
    if (!res?.success) return;
    setDetailsEnriching(false);
    setProduct((prev) => {
      if (!prev) return prev;
      const next = { ...prev };
      if (Array.isArray(res.images) && res.images.length > 0)
        next.images = res.images;
      if (res.description != null && res.description) next.description = res.description;
      if (res.description_html) next.description_html = res.description_html;
      if (Array.isArray(res.attributes) && res.attributes.length > 0) next.attributes = res.attributes;
      if (Array.isArray(res.reviews) && res.reviews.length > 0) next.reviews = res.reviews;
      if (res.reviews_count != null) next.reviews_count = res.reviews_count;
      if (res.rating != null) next.rating = res.rating;
      if (Array.isArray(res.bullet_points) && res.bullet_points.length > 0) next.bullet_points = res.bullet_points;
      if (Array.isArray(res.features) && res.features.length > 0) next.features = res.features;
      if (res.brand != null && String(res.brand).trim()) next.brand = String(res.brand).trim();
      if (res.category_path_str) next.category_path_str = res.category_path_str;
      if (res.weight_kg != null) next.weight_kg = res.weight_kg;
      if (res.weight_category) next.weight_category = res.weight_category;
      if (res.dimensions) next.dimensions = res.dimensions;
      return next;
    });
  };

  useEffect(() => {
    if (dataSource !== "scraper") return;
    if (!product || loading) return;
    if (!asinForScraper || detailsEnrichedAsinRef.current === asinForScraper) return;
    detailsEnrichedAsinRef.current = asinForScraper;
    const targetAsin = asinForScraper;
    const cached = getScraperDetailsCached(asinForScraper);
    if (cached) {
      mergeDetailsIntoProduct(cached);
      return;
    }
    setDetailsEnriching(true);
    (isAsinInUrl ? detailsPromiseRef.current : prefetchScraperDetails(asinForScraper))?.then((res) => {
      if (detailsEnrichedAsinRef.current === targetAsin) mergeDetailsIntoProduct(res);
    }).catch(() => setDetailsEnriching(false));
  }, [product, loading, productId, asinForScraper, isAsinInUrl, dataSource]);

  // وقتی محصول با ID بارگذاری شده ولی در DB ناقص است (فقط یک عکس، بدون توضیحات کامل) — جزئیات را از اسکرپر بگیر و در DB ذخیره کن
  const updatedFromScraperRef = useRef(false);
  useEffect(() => {
    if (dataSource !== "db" || !product?.id || loading) return;
    const asin = product?.asin ?? product?.amazonASIN ?? product?.ASIN;
    if (!asin) return;
    if (updatedFromScraperRef.current) return;
    const imgCount = Array.isArray(product?.images) ? product.images.length : 0;
    const hasShortDesc = !product?.description || String(product.description).trim().length < 100;
    const isIncomplete = product?.isFullStored === false || (imgCount <= 1 && hasShortDesc);
    if (!isIncomplete) return;
    updatedFromScraperRef.current = true;
    productService
      .getScraperProductDetails(asin)
      .then((res) => {
        if (!res?.success || !res) return;
        return productService.updateFromScraperDetails(product.id, res).then((updateRes) => {
          if (updateRes?.success && res) {
            setProduct((prev) => {
              if (!prev) return prev;
              const next = { ...prev };
              if (Array.isArray(res.images) && res.images.length > 0) next.images = res.images;
              if (res.description) next.description = res.description;
              if (res.description_html) next.description_html = res.description_html;
              if (Array.isArray(res.attributes) && res.attributes.length > 0) next.attributes = res.attributes;
              if (Array.isArray(res.reviews) && res.reviews.length > 0) next.reviews = res.reviews;
              if (res.reviews_count != null) next.reviews_count = res.reviews_count;
              if (res.rating != null) next.rating = res.rating;
              if (res.brand != null && String(res.brand).trim()) next.brand = String(res.brand).trim();
              next.isFullStored = true;
              return next;
            });
          }
        });
      })
      .catch(() => {
        updatedFromScraperRef.current = false;
      });
  }, [dataSource, product?.id, product?.asin, product?.amazonASIN, product?.ASIN, product?.isFullStored, product?.description, product?.images, loading]);

  // ========== مسیر دیتابیس (سجاد): بدون enrichment اسکرپر ==========

  if (loading) {
    return (
      <IndexLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
          <div className="xl:container px-4 py-6 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl" />
              </div>
              <div className="col-span-12 lg:col-span-5 space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-md" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-white dark:bg-dark-box border border-gray-200 dark:border-dark-stroke rounded-xl p-4 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                  <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                  <div className="h-10 bg-primary-600 rounded w-full mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </IndexLayout>
    );
  }

  if (!product) {
    return (
      <IndexLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">محصول یافت نشد</p>
            {error && <p className="text-xs text-red-500 mb-4">{error}</p>}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/products">
                <Button>بازگشت به لیست محصولات</Button>
              </Link>
              <Link href="/product-unavailable">
                <Button variant="outline">صفحه کالای ناموجود</Button>
              </Link>
            </div>
          </div>
        </div>
      </IndexLayout>
    );
  }

  const productImages = getProductImages(product);
  const mainImage = getMainImage(product);
  const breadcrumbItems = getBreadcrumbItems(product);
  const productSchema = generateProductSchema(product, productId);
  // برای سبد خرید و درگاه پرداخت همیشه id عددی دیتابیس لازم است (در محدوده int32)
  const rawNumId = /^\d+$/.test(String(productId)) ? Number(productId) : null;
  const safeNumId = rawNumId != null && rawNumId <= 2147483647 && rawNumId >= -2147483648 ? rawNumId : null;
  const numericProductId = product?.id ?? safeNumId;
  const colors = product.colors || product.availableColors || [];
  const displayPrice = getBasePrice(product);
  const listPrice = parseProductNum(
    product?.original_price ?? product?.price ?? product?.discountPrice
  ) || displayPrice;
  const ratingVal = parseProductNum(product?.rating);
  const reviewCountVal = Math.floor(
    parseProductNum(product?.reviews_count ?? product?.reviewCount)
  );
  const hasDiscount = listPrice > displayPrice && listPrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((listPrice - displayPrice) / listPrice) * 100)
    : 0;
  const description = getProductDescription(product);

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

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3 xl:col-span-4 order-1 lg:order-1">
              <ProductClientWrapper
                product={product}
                productId={numericProductId ?? productId}
                mainImage={mainImage}
                productImages={productImages}
                imagesLoading={detailsEnriching}
                renderGalleryOnly={true}
              />
            </div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-5 order-2 lg:order-2 space-y-6">
              <div>
                <h1 className="md:text-2xl text-gray-900 dark:text-dark-titre mb-2 text-right">
                  {product?.title || product?.name || "نام محصول"}
                </h1>
                {getDisplayBrand(product) && (
                  <p className="text-sm text-gray-500 dark:text-dark-text mb-1 text-right">
                    برند: {getDisplayBrand(product)}
                  </p>
                )}
                {product?.englishName && (
                  <p className="text-xs md:text-sm text-gray-400 dark:text-caption mb-4 text-right">
                    {product.englishName}
                  </p>
                )}
                <div className="flex items-center gap-1 text-xs md:text-sm mb-4 border-b pb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 flex-none" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {ratingVal > 0 ? ratingVal.toFixed(1) : "0.0"}
                  </span>
                  {(reviewCountVal > 0 || product?.reviewCount || product?.reviews_count) && (
                    <span className="text-graty-500 dark:text-gray-400">
                      (
                      <span className="text-primary-500 dark:text-dark-title">
                        {reviewCountVal > 0
                          ? reviewCountVal.toLocaleString("fa-IR")
                          : product?.reviewCount ?? product?.reviews_count ?? "0"}
                      </span>
                      {" "}
                      نظر)
                    </span>
                  )}
                </div>
                {description && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-gray-800 dark:text-dark-titre md:text-lg text-right">
                      معرفی کوتاه
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed text-right whitespace-pre-line">
                      {description}
                    </p>
                  </div>
                )}
                {product?.attributes && product.attributes.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-right text-gray-800 dark:text-white">
                      مشخصات فنی
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {product.attributes.map((atr, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 border dark:bg-dark-field dark:border-0 border-gray-200 p-2 rounded-lg"
                        >
                          <p className="text-gray-700 dark:text-dark-titre max-md:text-sm">
                            {atr.name}
                          </p>
                          <p className="text-gray-500 text-sm dark:text-dark-text max-md:text-xs mt-2">
                            {atr.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="max-md:hidden">
                <ProductDetailsAccordion product={product} dataSource={dataSource} />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-3 order-3 lg:order-3">
              <div className="space-y-3">
                <div className="space-y-4 bg-white dark:bg-dark-box dark:border-dark-stroke border border-gray-200 rounded-xl overflow-hidden p-2.5">
                  <div>
                    <p className="text-gray-500 text-sm">قیمت :</p>
                    <div className="flex-between gap-2">
                      <div>
                        <span className="text-2xl">
                          {displayPrice.toLocaleString("fa-IR")}
                        </span>
                        <span className="text-sm">
                          {product?.currency_symbol || product?.currency === "AED" ? " درهم" : " تومان"}
                        </span>
                      </div>
                      {hasDiscount && (
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                          {discountPercent}٪
                        </span>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="text-sm text-gray-400 line-through mt-1">
                        {listPrice.toLocaleString("fa-IR")}
                        {product?.currency_symbol || product?.currency === "AED" ? " درهم" : " تومان"}
                      </div>
                    )}
                  </div>
                  <div className="flex-between mt-6">
                    <p className="text-gray-500 text-sm">فروشگاه :</p>
                    <div className="flex-center gap-1">
                      <div className="text-sm text-gray-400">
                        {product?.amazonShopName || product?.seller || "آمازون امارات"}
                      </div>
                      <img
                        src="/image/amazonLogo.png"
                        className="w-10 h-max"
                        alt="Amazon Logo"
                      />
                    </div>
                  </div>
                  {(() => {
                    const asin = product?.amazonASIN || product?.asin || product?.ASIN || (typeof productId === "string" && /^[A-Z0-9]{10}$/i.test(productId) ? productId : null);
                    const amazonLink =
                      product?.amazonUrl ||
                      product?.product_url ||
                      (asin ? `https://www.amazon.ae/dp/${asin}` : null);
                    return amazonLink ? (
                    <div className="mt-4">
                      <a
                        href={amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                        aria-label="مشاهده محصول در سایت آمازون"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                          <path d="M15.4958 14.5323C8.20945 18 3.68745 15.0987 0.792773 13.3365C0.613651 13.2254 0.309207 13.3624 0.573354 13.6658C1.53772 14.8352 4.69813 17.6535 8.82339 17.6535C12.9515 17.6535 15.4073 15.401 15.7145 15.0081C16.0197 14.6185 15.8041 14.4036 15.4957 14.5323H15.4958ZM17.5422 13.4022C17.3465 13.1474 16.3524 13.0999 15.7267 13.1767C15.1001 13.2514 14.1596 13.6343 14.2413 13.8643C14.2833 13.9504 14.369 13.9118 14.7994 13.8731C15.231 13.83 16.4402 13.6774 16.6922 14.0068C16.9453 14.3384 16.3065 15.9183 16.1899 16.1731C16.0771 16.4279 16.2329 16.4936 16.4447 16.3239C16.6535 16.1543 17.0315 15.715 17.2852 15.0933C17.5372 14.4682 17.6909 13.5962 17.5422 13.4022Z" fill="#FF9900" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.5965 7.45649C10.5965 8.36636 10.6195 9.12515 10.1596 9.93317C9.78842 10.5902 9.20044 10.9942 8.5435 10.9942C7.64672 10.9942 7.12445 10.3109 7.12445 9.30254C7.12445 7.31192 8.90805 6.95063 10.5965 6.95063V7.45649ZM12.9517 13.149C12.7973 13.287 12.5739 13.2969 12.3998 13.2049C11.6246 12.5611 11.4866 12.2622 11.0596 11.6479C9.77859 12.9552 8.87197 13.3461 7.20989 13.3461C5.24558 13.3461 3.71484 12.134 3.71484 9.70655C3.71484 7.81127 4.74304 6.52031 6.20468 5.88968C7.47265 5.3312 9.24316 5.23267 10.5965 5.07834V4.77611C10.5965 4.22095 10.6392 3.56401 10.314 3.08446C10.0282 2.65414 9.48294 2.47675 9.00332 2.47675C8.11318 2.47675 7.31825 2.93331 7.12445 3.87932C7.08498 4.0896 6.93065 4.29656 6.72044 4.30639L4.4539 4.06336C4.26342 4.02057 4.05321 3.86624 4.10577 3.57384C4.62804 0.827822 7.10797 0 9.32847 0C10.465 0 11.9497 0.302228 12.8465 1.16287C13.9831 2.22382 13.8746 3.63955 13.8746 5.18012V8.81967C13.8746 9.91351 14.3279 10.3931 14.7549 10.9844C14.906 11.1946 14.9389 11.4476 14.7484 11.6052C14.2721 12.0026 13.4246 12.7417 12.9582 13.1556L12.9516 13.149" fill="black" />
                        </svg>
                        مشاهده در سایت آمازون
                      </a>
                    </div>
                    ) : null;
                  })()}
                  <ProductClientWrapper
                    product={product}
                    productId={numericProductId ?? productId}
                    mainImage={mainImage}
                    productImages={productImages}
                    imagesLoading={detailsEnriching}
                    renderPurchaseOnly={true}
                  />
                </div>
              </div>
              <div className="md:hidden">
                <ProductDetailsAccordion product={product} dataSource={dataSource} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="md:col-span-4">
              <ProductReviewsSection product={product} dataSource={dataSource} />
              <RelatedSlider />
              <AccessoriesSlider />
            </div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
