import { productService } from "@/services/product/productService";

/**
 * Prefetch & cache for scraper product images.
 *
 * Flow:
 *  1. ProductCard hover → prefetchScraperImages(asin)  (request starts ~2s before click)
 *  2. Product page mount → prefetchScraperImages(asin)  (reuses in-flight promise)
 *  3. When product state is ready → getScraperImagesCached(asin) returns data instantly
 *
 * Cache is in-memory, TTL = 5 min. Each ASIN stored only once (deduped).
 */

const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Start fetching images for an ASIN. Returns existing promise if already in-flight or cached.
 * Safe to call multiple times with the same ASIN — only one request will be made.
 */
export function prefetchScraperImages(asin) {
  if (!asin) return null;
  const key = String(asin).toUpperCase();

  const existing = _cache.get(key);
  if (existing && Date.now() - existing.ts < CACHE_TTL) {
    return existing.promise;
  }

  const promise = productService
    .getScraperProductImages(key)
    .then((res) => {
      const entry = _cache.get(key);
      if (entry) entry.data = res;
      return res;
    })
    .catch(() => null);

  _cache.set(key, { promise, data: null, ts: Date.now() });
  return promise;
}

/**
 * Get already-resolved cache entry (or null if not ready yet).
 * Use this for synchronous checks before falling back to the promise.
 */
export function getScraperImagesCached(asin) {
  if (!asin) return null;
  const key = String(asin).toUpperCase();
  const entry = _cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL && entry.data?.success) {
    return entry.data;
  }
  return null;
}
