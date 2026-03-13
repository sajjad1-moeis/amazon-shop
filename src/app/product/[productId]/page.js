"use client";

import React, { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import IndexLayout from "@/layout/IndexLayout";
import ProductDetailsAccordion, { buildSpecsFromProduct } from "@/template/Product/ProductDetailsAccordion";
import ProductReviewsSection from "@/template/Product/ProductReviewsSection";
import RelatedSlider from "@/template/Product/RelatedSlider";
import AccessoriesSlider from "@/template/Product/AccessoriesSlider";
import BreadCrump from "@/template/Product/BreadCrump";
import ProductClientWrapper from "@/template/Product/ProductClientWrapper";
import ProductVariationDimensions from "@/template/Product/ProductVariationDimensions";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product/productService";
import { pricingService } from "@/services/pricing/pricingService";
import {
  getProductName,
  getMainImage,
  getProductImages,
  getProductImageAlt,
  getBreadcrumbItems,
  getDisplayPriceToman,
  getDisplayBrand,
  parseProductNum,
  formatPriceToman,
} from "@/utils/productHelpers";
import { prefetchScraperDetails, getScraperDetailsCached } from "@/utils/scraperPrefetch";
import { useAuth } from "@/contexts/AuthContext";
import { userRecentViewService } from "@/services/userRecentView/userRecentViewService";
import { applyProductSeoHead } from "@/utils/metadata";
import NotFoundView from "@/components/NotFoundView";
import { getNotFoundPreset } from "@/data/notFoundPresets";
import { cn } from "@/lib/utils";

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
  const [imagesEnriching, setImagesEnriching] = useState(false);
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
    setProduct(null); // با سوییچ واریانت (ASIN جدید) محصول قبلی پاک شود تا قیمت/دادهٔ قدیمی نمایش داده نشود
    // ASIN آمازون دقیقاً ۱۰ کاراکتر حرف/عدد است — اگر این فرمت باشد حتی اگر همه رقم باشد (مثل 0743273966) باید مسیر ASIN برویم
    const isAsinFormat = (id) => /^[A-Z0-9]{10}$/i.test(String(id || ""));
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

    // شناسه عددی فقط وقتی getById بزنیم که فرمت ASIN نباشد (ASIN = ۱۰ کاراکتر)
    if (isValidNumericId && !isAsinFormat(productId)) {
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
    const readSessionPayload = () => {
      try {
        const raw = typeof sessionStorage !== "undefined" ? sessionStorage.getItem(`scraperProduct_${productId}`) : null;
        return raw ? JSON.parse(raw) : null;
      } catch (_) {
        return null;
      }
    };
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    productService
      .getByASIN(productId)
      .then((response) => {
        if (cancelled) return;
        const dto = response?.data ?? response;
        if (!dto || response?.success === false) throw new Error(response?.message || "محصول یافت نشد");
        // اگر محصول از DB آمد ولی عکس/توضیح ناقص است، جزئیات اسکرپر را بگیر و DB را پر کن
        const needsEnrichment = (p) => {
          if (!p?.id) return false;
          const images = Array.isArray(p?.images) ? p.images : (Array.isArray(p?.imageUrls) ? p.imageUrls : []);
          const hasEnoughImages = images.length >= 2;
          const hasDesc = p?.description && String(p.description).trim().length > 80;
          const hasTitleFa = p?.title_fa && String(p.title_fa).trim().length > 0;
          return !hasEnoughImages || !hasDesc || (!hasTitleFa && (p?.title || p?.name));
        };
        if (needsEnrichment(dto)) {
          return (productService.getScraperProductDetails(productId) || Promise.resolve(null))
            .then((detailsRes) => {
              if (cancelled || !detailsRes?.success) return { fromDb: true, dto };
              return productService
                .updateFromScraperDetails(dto.id, detailsRes)
                .then(() => productService.getById(dto.id))
                .then((res) => {
                  const updated = res?.data ?? res;
                  const merged = updated || dto;
                  if (detailsRes?.title_fa && merged) merged.title_fa = detailsRes.title_fa;
                  return { fromDb: true, dto: merged };
                })
                .catch(() => ({ fromDb: true, dto }));
            });
        }
        return { fromDb: true, dto };
      })
      .then((maybeFromDb) => {
        if (cancelled) return;
        if (maybeFromDb?.fromDb && maybeFromDb?.dto) {
          applyProduct(maybeFromDb.dto);
          done();
          return;
        }
        return maybeFromDb;
      })
      .catch(() => {
        if (cancelled) return;
        let payload = readSessionPayload();
        // رفع ریس: گاهی بعد از کلیک از نتایج جستجو، sessionStorage یک لحظه دیر ست می‌شود
        if (!payload?.asin) {
          return wait(280).then(() => {
            if (cancelled) return null;
            payload = readSessionPayload();
            return payload;
          });
        }
        return Promise.resolve(payload);
      })
      .then((payload) => {
        if (cancelled) return;
        if (!payload?.asin) {
          // هنوز نداشتیم — اگر آدرس شبیه ASIN است مستقیم از اسکرپر لود کن
          if (isAsinFormat(productId)) {
            return (productService.getScraperProductDetails(productId) || Promise.resolve(null)).then((detailsRes) => {
              if (cancelled) return null;
              if (!detailsRes?.success) {
                fail("محصول یافت نشد");
                done();
                return null;
              }
              const d = detailsRes;
              const payload = {
                asin: productId,
                title: d.title ?? d.name,
                title_fa: d.title_fa ?? null,
                brand: d.brand,
                current_price: d.current_price ?? d.price ?? d.discountPrice,
                original_price: d.original_price ?? d.price,
                image_url: d.image_url ?? d.mainImage ?? (Array.isArray(d.images) ? d.images[0] : null),
                image_url_hq: d.image_url_hq ?? d.image_url,
                images: Array.isArray(d.images) ? d.images : undefined,
                image_urls: Array.isArray(d.image_urls) ? d.image_urls : d.images,
                product_url: d.product_url ?? d.amazonUrl,
                rating: d.rating,
                reviews_count: d.reviews_count ?? d.reviewCount,
                category: d.category ?? d.category_path_str,
                currency: d.currency ?? d.currency_symbol,
                seller: d.seller,
                amazonShopName: d.amazonShopName,
                description: d.description ?? d.shortDescription,
                attributes: d.attributes,
                reviews: d.reviews,
              };
              if (d.variation_dimensions && Object.keys(d.variation_dimensions).length > 0)
                payload.variation_dimensions = d.variation_dimensions;
              if (d.weight_kg != null) payload.weight_kg = d.weight_kg;
              if (d.weight_category) payload.weight_category = d.weight_category;
              return payload;
            });
          }
          fail("محصول یافت نشد");
          done();
          return null;
        }
        return payload;
      })
      .then((payload) => {
        if (cancelled || !payload?.asin) return;
        // صبر برای لود کامل: حداقل یک عکس یا توضیح کافی؛ بعد ذخیره تا همهٔ داده (مثلاً ۴ عکس) در DB ذخیره شود
        const FULL_DETAILS_WAIT_MS = 5000;
        const FULL_DETAILS_WAIT_MS_EXTRA = 8000;
        const isDetailsComplete = (d) => {
          if (!d || !d.success) return false;
          const imgCount = Array.isArray(d.images) ? d.images.length : 0;
          const hasDesc = d.description && String(d.description).trim().length > 80;
          return imgCount >= 1 || hasDesc;
        };
        const richness = (d) => {
          if (!d || !d.success) return 0;
          const imgs = Array.isArray(d.images) ? d.images.length : 0;
          const descLen = d.description ? String(d.description).trim().length : 0;
          return imgs * 10 + Math.min(descLen / 50, 20);
        };
        const fetchDetails = () =>
          productService.getScraperProductDetails(productId) || prefetchScraperDetails(productId) || Promise.resolve(null);
        return fetchDetails()
          .then((first) => {
            if (cancelled) return null;
            if (isDetailsComplete(first)) return first;
            return wait(FULL_DETAILS_WAIT_MS)
              .then(() => fetchDetails())
              .then((second) => {
                if (cancelled) return null;
                const best = richness(second) >= richness(first) ? second : first;
                const hasAnyImage = Array.isArray(best?.images) && best.images.length > 0;
                if (hasAnyImage || isDetailsComplete(best)) return best;
                return wait(FULL_DETAILS_WAIT_MS_EXTRA).then(() => fetchDetails()).then((third) => {
                  if (cancelled) return best;
                  return richness(third) >= richness(best) ? third : best;
                });
              });
          })
          .then((detailsRes) => {
            if (cancelled) return null;
            const fullPayload = { ...payload };
            // برای API بک‌اند (SaveIfNotExists) حتماً ASIN را روی payload ست کن (همیشه از productId به‌عنوان fallback)
            fullPayload.asin = fullPayload.asin || fullPayload.amazonASIN || fullPayload.ASIN || productId;
            const details = detailsRes?.success ? detailsRes : detailsRes;
            if (details) {
              if (Array.isArray(details.images) && details.images.length > 0)
                fullPayload.images = details.images;
              else if (Array.isArray(payload.images) && payload.images.length > 0)
                fullPayload.images = payload.images;
              else if (Array.isArray(payload.image_urls) && payload.image_urls.length > 0)
                fullPayload.images = payload.image_urls;
              if (details.description) fullPayload.description = details.description;
              if (details.description_fa) fullPayload.description_fa = details.description_fa;
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
              if (details.variation_dimensions && Object.keys(details.variation_dimensions).length > 0)
                fullPayload.variation_dimensions = details.variation_dimensions;
              if (details.title) fullPayload.title = details.title;
              if (details.title_fa) fullPayload.title_fa = details.title_fa;
              // قیمت از پاسخ جزئیات اسکرپر (برای واریانت‌ها اندپوینت /details حالا current_price برمی‌گرداند)
              if (details.current_price != null) fullPayload.current_price = details.current_price;
              if (details.original_price != null) fullPayload.original_price = details.original_price;
              if (details.price != null && fullPayload.current_price == null) fullPayload.current_price = details.price;
              if (Array.isArray(details.product_badges) && details.product_badges.length > 0)
                fullPayload.product_badges = details.product_badges;
              if (details.is_limited_time_deal != null) fullPayload.is_limited_time_deal = details.is_limited_time_deal;
              if (details.limited_time_deal_text) fullPayload.limited_time_deal_text = details.limited_time_deal_text;
              if (details.free_returns != null) fullPayload.free_returns = details.free_returns;
              if (Array.isArray(details.promo_messages) && details.promo_messages.length > 0)
                fullPayload.promo_messages = details.promo_messages;
              if (details.is_best_seller != null) fullPayload.is_best_seller = details.is_best_seller;
              if (details.best_seller_text) fullPayload.best_seller_text = details.best_seller_text;
              if (details.is_amazons_choice != null) fullPayload.is_amazons_choice = details.is_amazons_choice;
              if (details.is_international != null) fullPayload.is_international = details.is_international;
              if (details.ships_from != null) fullPayload.ships_from = details.ships_from;
              if (details.shipping_summary != null) fullPayload.shipping_summary = details.shipping_summary;
              if (details.estimated_delivery_days != null) fullPayload.estimated_delivery_days = details.estimated_delivery_days;
            }
            // قبل از ذخیره حتماً قیمت تومان را از موتور قیمت بگیر و در payload بگذار تا هم نمایش پایدار باشد هم در DB درست ذخیره شود
            const hasToman = fullPayload.ourPrice != null && Number(fullPayload.ourPrice) > 0;
            const baseAed = parseProductNum(fullPayload.current_price ?? fullPayload.price);
            const ensurePriceThenSave = () =>
              productService
                .saveIfNotExistsFromScraper(fullPayload, productId)
                .then((res) => ({ res, fullPayload }))
                .catch((err) => {
                  if (err?.response?.status === 400 && fullPayload) {
                    return { res: { success: false, data: null }, fullPayload };
                  }
                  throw err;
                });
            if (hasToman) {
              return ensurePriceThenSave();
            }
            if (baseAed <= 0) {
              return ensurePriceThenSave();
            }
            return pricingService
              .preview({
                asin: fullPayload.asin ?? fullPayload.amazonASIN ?? productId,
                basePriceAed: baseAed,
                weightKg: fullPayload.weight_kg ?? fullPayload.weightKg ?? undefined,
              })
              .then((data) => {
                if (data?.finalPriceIrr != null && Number(data.finalPriceIrr) > 0) {
                  fullPayload.ourPrice = data.finalPriceIrr;
                  fullPayload.finalPrice = data.finalPriceIrr;
                }
                return ensurePriceThenSave();
              })
              .catch(() => ensurePriceThenSave());
          })
          .then((data) => {
            if (cancelled) return;
            if (!data) return;
            const { res, fullPayload } = data;
            const savedId =
              res?.data?.productId ?? res?.data?.id ?? res?.data?.productID ?? res?.data?.ProductId;
            // sessionStorage را پاک نمی‌کنیم تا بعد از رفرش اگر getByASIN خطا داد، همان payload (با ourPrice) برای نمایش قیمت در دسترس باشد
            if (res?.success && savedId != null) {
              return productService.getById(savedId).then((response) => ({ response, payload: fullPayload }));
            }
            // اگر سرور savedId برنگرداند (مثلاً 400 یا محصول از قبل وجود داشته)، باز هم جزئیات را از fullPayload روی state بگذار تا صفحه خالی نماند
            if (fullPayload && typeof fullPayload === "object") {
              setProduct((prev) => (prev ? { ...prev, ...fullPayload } : fullPayload));
            }
            return null;
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
              if (payload.description_fa) dto.description_fa = payload.description_fa;
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
              if (payload.variation_dimensions && Object.keys(payload.variation_dimensions).length > 0)
                dto.variation_dimensions = payload.variation_dimensions;
              if (payload.product_url) dto.amazonUrl = dto.amazonUrl || payload.product_url;
              if (payload.title) dto.title = payload.title;
              if (payload.title_fa) dto.title_fa = payload.title_fa;
              if (payload.ourPrice != null) dto.ourPrice = payload.ourPrice;
              if (payload.finalPrice != null) dto.finalPrice = payload.finalPrice;
              if (Array.isArray(payload.product_badges) && payload.product_badges.length > 0)
                dto.product_badges = payload.product_badges;
              if (payload.is_limited_time_deal != null) dto.is_limited_time_deal = payload.is_limited_time_deal;
              if (payload.limited_time_deal_text) dto.limited_time_deal_text = payload.limited_time_deal_text;
              if (payload.free_returns != null) dto.free_returns = payload.free_returns;
              if (Array.isArray(payload.promo_messages) && payload.promo_messages.length > 0)
                dto.promo_messages = payload.promo_messages;
              if (payload.is_best_seller != null) dto.is_best_seller = payload.is_best_seller;
              if (payload.best_seller_text) dto.best_seller_text = payload.best_seller_text;
              if (payload.is_amazons_choice != null) dto.is_amazons_choice = payload.is_amazons_choice;
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

  // سئو: به‌روزرسانی title، meta description، canonical و robots طبق فیلدهای API (سند فنی)
  useEffect(() => {
    if (!product) return;
    applyProductSeoHead(product);
  }, [product]);

  // وقتی محصول ourPrice/finalPrice ندارد (مثلاً لود با ASIN یا getById بدون OurPrice)، یک بار preview بزن و قیمت تومان را ست کن
  const pricePreviewFetchedRef = useRef(false);
  useEffect(() => {
    pricePreviewFetchedRef.current = false;
  }, [productId]);
  useEffect(() => {
    if (!product) return;
    const hasToman = (product.ourPrice ?? product.finalPrice ?? product.OurPrice ?? product.FinalPrice) != null && Number(product.ourPrice ?? product.finalPrice ?? product.OurPrice ?? product.FinalPrice) > 0;
    if (hasToman) return;
    // قیمت پایه درهم: از API وقتی OurPrice خالی است basePriceAed برمی‌گردد؛ وگرنه current_price/price/Price
    const baseAed = parseProductNum(product.basePriceAed ?? product.BasePriceAed ?? product.current_price ?? product.price ?? product.Price);
    if (baseAed <= 0) return;
    if (pricePreviewFetchedRef.current) return;
    pricePreviewFetchedRef.current = true;
    pricingService
      .preview({
        asin: product.asin ?? product.amazonASIN ?? product.ASIN ?? productId,
        basePriceAed: baseAed,
        weightKg: product.weight_kg ?? product.weightKg ?? undefined,
      })
      .then((data) => {
        if (!data?.finalPriceIrr || Number(data.finalPriceIrr) <= 0) return;
        setProduct((prev) =>
          prev ? { ...prev, ourPrice: data.finalPriceIrr, finalPrice: data.finalPriceIrr } : prev
        );
        // ذخیرهٔ قیمت در DB تا رفرش و لیست محصولات از همان منبع بخوانند
        if (product?.id && data?.finalPriceIrr)
          productService.updateProductPrice(product.id, data.finalPriceIrr).catch(() => {});
      })
      .catch(() => {
        pricePreviewFetchedRef.current = false;
      });
  }, [product?.id, product?.asin, product?.basePriceAed, product?.current_price, product?.price, product?.ourPrice, product?.finalPrice, productId]);

  // ==========================================
  // On-demand enrichment — فقط یک درخواست /details (عکس + توضیحات + برند + مشخصات)
  // مثل استراتژی عکس‌ها؛ همهٔ جزئیات با هم و سریع لود می‌شوند.
  // ==========================================
  const detailsPromiseRef = useRef(null);
  const detailsEnrichedAsinRef = useRef(null);

  // با سوییچ واریانت (ASIN جدید) enrichment برای همان ASIN دوباره اجرا شود
  useEffect(() => {
    detailsEnrichedAsinRef.current = null;
  }, [productId]);

  const isAsinInUrl = productId && !/^\d+$/.test(String(productId));
  const dataSource = isAsinInUrl ? "scraper" : "db";
  const asinFromProduct =
    product?.asin ??
    product?.amazonASIN ??
    product?.ASIN ??
    (Array.isArray(product?.attributes) && product.attributes.find((a) => (a?.name || "").toUpperCase() === "ASIN")?.value) ??
    null;
  const asinForScraper = isAsinInUrl ? productId : asinFromProduct;

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
    setImagesEnriching(false);
    setProduct((prev) => {
      if (!prev) return prev;
      const next = { ...prev };
      if (Array.isArray(res.images) && res.images.length > 0)
        next.images = res.images;
      if (res.description != null && res.description) next.description = res.description;
      if (res.description_fa != null && res.description_fa) next.description_fa = res.description_fa;
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
      if (res.variation_dimensions && Object.keys(res.variation_dimensions).length > 0)
        next.variation_dimensions = res.variation_dimensions;
      if (Array.isArray(res.product_badges) && res.product_badges.length > 0)
        next.product_badges = res.product_badges;
      if (res.is_limited_time_deal != null) next.is_limited_time_deal = res.is_limited_time_deal;
      if (res.limited_time_deal_text) next.limited_time_deal_text = res.limited_time_deal_text;
      if (res.free_returns != null) next.free_returns = res.free_returns;
      if (Array.isArray(res.promo_messages) && res.promo_messages.length > 0)
        next.promo_messages = res.promo_messages;
      if (res.is_best_seller != null) next.is_best_seller = res.is_best_seller;
      if (res.best_seller_text) next.best_seller_text = res.best_seller_text;
      if (res.is_amazons_choice != null) next.is_amazons_choice = res.is_amazons_choice;
      if (res.is_international != null) next.is_international = res.is_international;
      if (res.ships_from != null) next.ships_from = res.ships_from;
      if (res.ships_from_code != null) next.ships_from_code = res.ships_from_code;
      if (res.shipping_type != null) next.shipping_type = res.shipping_type;
      if (res.estimated_delivery_days != null) next.estimated_delivery_days = res.estimated_delivery_days;
      if (res.shipping_summary != null) next.shipping_summary = res.shipping_summary;
      return next;
    });
  };

  // انریچ با جزئیات اسکرپر (عکس، توضیحات، variation_dimensions) — هم برای لود با ASIN هم برای لود با ID عددی وقتی asin داریم
  useEffect(() => {
    if (!product || loading) return;
    if (!asinForScraper || detailsEnrichedAsinRef.current === asinForScraper) return;
    detailsEnrichedAsinRef.current = asinForScraper;
    const targetAsin = asinForScraper;
    const cached = getScraperDetailsCached(asinForScraper);
    if (cached) {
      mergeDetailsIntoProduct(cached);
      return;
    }
    setImagesEnriching(true);
    (isAsinInUrl ? detailsPromiseRef.current : prefetchScraperDetails(asinForScraper))?.then((res) => {
      if (detailsEnrichedAsinRef.current === targetAsin) mergeDetailsIntoProduct(res);
    }).catch(() => setImagesEnriching(false));
  }, [product, loading, productId, asinForScraper, isAsinInUrl, dataSource]);

  // وقتی محصول با ID بارگذاری شده ولی در DB ناقص است (فقط یک عکس، بدون توضیحات کامل) — جزئیات را از اسکرپر بگیر و در DB ذخیره کن
  const updatedFromScraperRef = useRef(false);
  useEffect(() => {
    updatedFromScraperRef.current = false;
  }, [productId]);
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
              if (res.description_fa) next.description_fa = res.description_fa;
              if (res.description_html) next.description_html = res.description_html;
              if (Array.isArray(res.attributes) && res.attributes.length > 0) next.attributes = res.attributes;
              if (Array.isArray(res.reviews) && res.reviews.length > 0) next.reviews = res.reviews;
              if (res.reviews_count != null) next.reviews_count = res.reviews_count;
              if (res.rating != null) next.rating = res.rating;
              if (res.brand != null && String(res.brand).trim()) next.brand = String(res.brand).trim();
              if (res.variation_dimensions && Object.keys(res.variation_dimensions).length > 0)
                next.variation_dimensions = res.variation_dimensions;
              if (Array.isArray(res.product_badges) && res.product_badges.length > 0)
                next.product_badges = res.product_badges;
              if (res.is_limited_time_deal != null) next.is_limited_time_deal = res.is_limited_time_deal;
              if (res.limited_time_deal_text) next.limited_time_deal_text = res.limited_time_deal_text;
              if (res.free_returns != null) next.free_returns = res.free_returns;
              if (Array.isArray(res.promo_messages) && res.promo_messages.length > 0)
                next.promo_messages = res.promo_messages;
              if (res.is_best_seller != null) next.is_best_seller = res.is_best_seller;
              if (res.best_seller_text) next.best_seller_text = res.best_seller_text;
              if (res.is_amazons_choice != null) next.is_amazons_choice = res.is_amazons_choice;
              if (res.is_international != null) next.is_international = res.is_international;
              if (res.ships_from != null) next.ships_from = res.ships_from;
              if (res.shipping_summary != null) next.shipping_summary = res.shipping_summary;
              if (res.estimated_delivery_days != null) next.estimated_delivery_days = res.estimated_delivery_days;
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
    const preset = getNotFoundPreset("product");
    return (
      <IndexLayout>
        <div className="container">
          <NotFoundView
            title={preset.title}
            description={preset.description}
            primaryButton={preset.primaryButton}
            secondaryButton={preset.secondaryButton}
            imageSrc={preset.imageSrc}
            imageAlt={preset.imageAlt}
          />
        </div>
      </IndexLayout>
    );
  }

  const productImages = getProductImages(product);
  const mainImage = getMainImage(product);
  const breadcrumbItems = getBreadcrumbItems(product);
  const variationDimensions =
    product?.variation_dimensions ?? product?.variations ?? product?.variationDimensions ?? null;
  const hasVariations = variationDimensions && typeof variationDimensions === "object" && Object.keys(variationDimensions).length > 0;
  // برای سبد خرید و درگاه پرداخت همیشه id عددی دیتابیس لازم است (در محدوده int32)
  const rawNumId = /^\d+$/.test(String(productId)) ? Number(productId) : null;
  const safeNumId = rawNumId != null && rawNumId <= 2147483647 && rawNumId >= -2147483648 ? rawNumId : null;
  const numericProductId = product?.id ?? safeNumId;
  const colors = product.colors || product.availableColors || [];
  const displayPrice = getDisplayPriceToman(product);
  const listPrice = parseProductNum(
    product?.original_price ?? product?.price ?? product?.discountPrice
  ) || displayPrice;
  const ratingVal = parseProductNum(product?.rating);
  const reviewCountVal = Math.floor(
    parseProductNum(product?.reviews_count ?? product?.reviewCount)
  );
  const hasDiscount =
    displayPrice > 0 && listPrice > displayPrice && listPrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((listPrice - displayPrice) / listPrice) * 100)
    : 0;
  return (
    <IndexLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-transparent" dir="rtl">
        <BreadCrump items={breadcrumbItems} />

        <div className="xl:container px-4 py-6">
          <div className="sr-only">
            <Image
              src={mainImage}
              alt={getProductImageAlt(product)}
              width={800}
              height={800}
              priority
              fetchPriority="high"
            />
          </div>

          {/* سند ۱: وقتی کالا در آمازون لاک است — ۲۰۰ با پیام ناموجود (Soft 404 Prevention) */}
          {(product?.isUnavailable === true ||
            product?.IsUnavailable === true ||
            product?.available === false ||
            product?.status === "unavailable") && (
            <div className="mb-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-amber-800 dark:text-amber-200 text-sm text-right">
              این کالا در حال حاضر ناموجود است.
            </div>
          )}

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3 xl:col-span-4 order-1 lg:order-1">
              <ProductClientWrapper
                product={product}
                productId={numericProductId ?? productId}
                mainImage={mainImage}
                productImages={productImages}
                imageAlt={getProductImageAlt(product)}
                imagesLoading={imagesEnriching}
                renderGalleryOnly={true}
              />
            </div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-5 order-2 lg:order-2 space-y-6">
              <div>
                <h1 className="md:text-2xl text-gray-900 dark:text-dark-titre mb-2 text-right">
                  {getProductName(product)}
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
                {((product?.product_badges ?? product?.productBadges ?? product?.badges)?.length > 0 || product?.best_seller_text || product?.bestSellerText || product?.is_best_seller || product?.isBestSeller || product?.is_amazons_choice || product?.isAmazonsChoice || product?.is_limited_time_deal || product?.isLimitedTimeDeal || product?.is_international) && (
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {product?.is_international && (
                      <span
                        className="text-xs px-2.5 py-1 rounded-md text-white whitespace-nowrap bg-blue-600 dark:bg-blue-700"
                        title={product?.shipping_summary ?? undefined}
                      >
                        ارسال بین‌المللی
                        {product?.ships_from ? ` از ${product.ships_from}` : ""}
                      </span>
                    )}
                    {(product?.product_badges ?? product?.productBadges ?? product?.badges ?? [])
                      // حذف تگ‌های مرجوعی رایگان و صرفه‌جویی
                      .filter(
                        (badge) =>
                          !(
                            badge === "FREE Returns" ||
                            badge === "Savings" ||
                            badge === "صرفه‌جویی"
                          )
                      )
                      .map((badge, index) => (
                        <span
                          key={index}
                          className={cn(
                            "text-xs px-2.5 py-1 rounded-md text-white whitespace-nowrap",
                            badge === "Limited time deal" || badge === "تخفیف محدود زمان" || (typeof badge === "string" && badge.toLowerCase().includes("limited time deal"))
                              ? "bg-red-600 dark:bg-red-700"
                              : badge === "Best Seller" || (typeof badge === "string" && badge.toLowerCase().includes("best seller"))
                                ? "bg-orange-500 dark:bg-orange-600"
                                : badge === "Amazon's Choice" || (typeof badge === "string" && badge.toLowerCase().includes("amazon") && badge.toLowerCase().includes("choice"))
                                  ? "bg-green-600 dark:bg-green-700"
                                  : "bg-primary-600 dark:bg-primary-700"
                          )}
                        >
                          {badge === "Limited time deal" || badge === "تخفیف محدود زمان"
                            ? "تخفیف محدود زمان"
                            : badge === "Best Seller" || (typeof badge === "string" && badge.toLowerCase().includes("best seller"))
                              ? "بیشترین فروش"
                              : badge === "Amazon's Choice" || (typeof badge === "string" && badge.toLowerCase().includes("amazon") && badge.toLowerCase().includes("choice"))
                                ? "انتخاب آمازون"
                                : badge}
                        </span>
                      ))}
                    {(product?.is_limited_time_deal || product?.isLimitedTimeDeal) && !(product?.product_badges ?? product?.productBadges ?? product?.badges ?? []).some((b) => typeof b === "string" && (b.toLowerCase().includes("limited time deal") || b === "تخفیف محدود زمان")) && (
                      <span className="text-xs px-2.5 py-1 rounded-md bg-red-600 dark:bg-red-700 text-white whitespace-nowrap">
                        تخفیف محدود زمان
                      </span>
                    )}
                    {(product?.is_best_seller || product?.isBestSeller || product?.best_seller_text || product?.bestSellerText) && !(product?.product_badges ?? product?.productBadges ?? product?.badges ?? []).some((b) => typeof b === "string" && b.toLowerCase().includes("best seller")) && (
                      <span className="text-xs px-2.5 py-1 rounded-md bg-orange-500 dark:bg-orange-600 text-white whitespace-nowrap">
                        بیشترین فروش
                      </span>
                    )}
                    {(product?.is_amazons_choice || product?.isAmazonsChoice) && !(product?.product_badges ?? product?.productBadges ?? product?.badges ?? []).some((b) => typeof b === "string" && b.toLowerCase().includes("amazon") && b.toLowerCase().includes("choice")) && (
                      <span className="text-xs px-2.5 py-1 rounded-md bg-green-600 dark:bg-green-700 text-white whitespace-nowrap">
                        انتخاب آمازون
                      </span>
                    )}
                    {(product?.best_seller_text || product?.bestSellerText) && (product.best_seller_text ?? product.bestSellerText ?? "").includes(" in ") && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {product.best_seller_text ?? product.bestSellerText}
                      </span>
                    )}
                  </div>
                )}
                {/* باکس پرومو و تخفیف را نمایش نده */}
                {hasVariations && (
                  <ProductVariationDimensions
                    variationDimensions={variationDimensions}
                    currentAsin={
                      typeof productId === "string" && /^[A-Z0-9]{10}$/i.test(productId)
                        ? productId
                        : product?.asin ?? product?.amazonASIN ?? product?.ASIN
                    }
                  />
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
                        <span className="text-2xl">{formatPriceToman(displayPrice)}</span>
                      </div>
                      {hasDiscount && (
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                          {discountPercent}٪
                        </span>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="text-sm text-gray-400 line-through mt-1">
                        {formatPriceToman(listPrice)}
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
                    imageAlt={getProductImageAlt(product)}
                    imagesLoading={imagesEnriching}
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
