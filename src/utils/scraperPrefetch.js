import { productService } from "@/services/product/productService";

/**
 * Prefetch & cache for scraper product images.
 *
 * Flow:
 *  1. Search results arrive → prefetch for top 6 ASINs (backend also prefetches in parallel)
 *  2. ProductCard hover → prefetchScraperImages(asin) (reuses in-flight or cached)
 *  3. Product page mount → prefetchScraperImages(asin) (instant if cached)
 *
 * Backend simultaneously prefetches images in a background thread after search,
 * so most requests hit the server cache and return in <100ms.
 */

const _cache = new Map();
const _detailsCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 min

export function prefetchScraperImages(asin) {
  if (!asin) return null;
  const key = String(asin).toUpperCase();

  const entry = _cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) {
    if (entry.data?.success) return Promise.resolve(entry.data);
    if (entry.promise) return entry.promise;
  }

  const fresh = { promise: null, data: null, ts: Date.now() };
  _cache.set(key, fresh);
  fresh.promise = productService
    .getScraperProductImages(key)
    .then((res) => {
      fresh.data = res;
      fresh.ts = Date.now();
      return res;
    })
    .catch(() => {
      _cache.delete(key);
      return null;
    });

  return fresh.promise;
}

export function getScraperImagesCached(asin) {
  if (!asin) return null;
  const key = String(asin).toUpperCase();
  const entry = _cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL && entry.data?.success) {
    return entry.data;
  }
  return null;
}

/**
 * Prefetch & cache for scraper product details (توضیحات، مشخصات فنی، نظرات).
 * همان منطق عکس‌ها: درخواست از همان اول (mount) شروع می‌شود تا با لود محصول هم‌زمان یا زودتر بیاید.
 */
export function prefetchScraperDetails(asin) {
  if (!asin) return null;
  const key = String(asin).toUpperCase();

  const entry = _detailsCache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) {
    if (entry.data?.success) return Promise.resolve(entry.data);
    if (entry.promise) return entry.promise;
  }

  const fresh = { promise: null, data: null, ts: Date.now() };
  _detailsCache.set(key, fresh);
  fresh.promise = productService
    .getScraperProductDetails(key)
    .then((res) => {
      fresh.data = res;
      fresh.ts = Date.now();
      return res;
    })
    .catch(() => {
      _detailsCache.delete(key);
      return null;
    });

  return fresh.promise;
}

export function getScraperDetailsCached(asin) {
  if (!asin) return null;
  const key = String(asin).toUpperCase();
  const entry = _detailsCache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL && entry.data?.success) {
    return entry.data;
  }
  return null;
}
