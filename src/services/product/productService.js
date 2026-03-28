import { getPublicClient, getAuthenticatedClient, getScraperClient, isScraperConfigured } from "../api/client";

export const productService = {
  getAllActive: async () => {
    const client = getPublicClient();
    return client.get("Product/GetAllActive").json();
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetAll").json();
  },

  getById: async (id) => {
    const client = getPublicClient();
    return client.get(`Product/GetById?id=${id}`).json();
  },

  getBySlug: async (slug) => {
    const client = getPublicClient();
    return client.get(`Product/GetBySlug?slug=${encodeURIComponent(slug)}`).json();
  },

  getByASIN: async (asin) => {
    const client = getPublicClient();
    return client.get(`Product/GetByASIN?amazonASIN=${encodeURIComponent(asin)}`).json();
  },

  /**
   * شکست قیمت محصول برای نمایش «این مبلغ بابت چیست؟»
   * GET api/Product/{id}/price-breakdown
   */
  getPriceBreakdown: async (id) => {
    const client = getPublicClient();
    return client.get(`Product/${id}/price-breakdown`).json();
  },

  /**
   * جستجوی ساده روی جدول محصولات دیتابیس.
   * GET api/Product/Search?searchTerm={text}
   */
  search: async (searchTerm) => {
    const client = getPublicClient();
    const qs = new URLSearchParams();
    if (searchTerm) qs.set("searchTerm", searchTerm);
    return client.get(`Product/Search?${qs.toString()}`).json();
  },

  /**
   * جستجوی آمازون (طبق IMPLEMENTATION_GUIDE: فرانت مستقیم به پایتون).
   * اگر NEXT_PUBLIC_SCRAPER_URL تنظیم شده باشد → درخواست مستقیم به Python FastAPI.
   * وگرنه fallback به بک‌اند .NET (api/amazon/search).
   * @param {string} q - عبارت جستجو (حداقل ۲ کاراکتر)
   * @param {string} [weight] - فیلتر وزن: 'above_2kg' | 'below_2kg'
   * @returns {Promise<{ success: boolean, data?: { data: Array, fromCache?: boolean, count?: number }, message?: string }>}
   */
  searchAmazon: async (q, weight = null) => {
    const MAX_QUERY_LENGTH = 200;
    const trimmed = typeof q === "string" ? q.trim() : "";
    if (trimmed.length < 2) {
      return { success: false, message: "عبارت جستجو باید حداقل ۲ کاراکتر باشد" };
    }
    if (trimmed.length > MAX_QUERY_LENGTH) {
      return { success: false, message: "عبارت جستجو طولانی است" };
    }

    const params = new URLSearchParams();
    params.set("q", trimmed);
    if (weight === "above_2kg" || weight === "below_2kg") {
      params.set("weight_filter", weight);
    }

    if (isScraperConfigured()) {
      try {
        const scraper = getScraperClient();
        const res = await scraper.get(`api/search?${params.toString()}`).json();
        // نرمال‌سازی پاسخ پایتون به فرمت یکسان برای ProductsClient
        const list = Array.isArray(res?.data) ? res.data : [];
        return {
          success: Boolean(res?.success),
          data: {
            data: list,
            fromCache: res?.from_cache ?? false,
            count: res?.count ?? list.length,
            search_term: res?.search_term ?? trimmed,
            search_term_original: res?.search_term_original ?? null,
          },
          message: res?.message ?? res?.error ?? null,
        };
      } catch (e) {
        let msg = e?.message ?? "خطا در اتصال به اسکرپر.";
        try {
          if (e?.response?.json) {
            const body = await e.response.json();
            msg = body?.message ?? body?.message_en ?? body?.error ?? msg;
          }
        } catch (_) {}
        return { success: false, data: { data: [], search_term: trimmed }, message: msg };
      }
    }

    const client = getPublicClient();
    params.delete("weight_filter");
    if (weight === "above_2kg" || weight === "below_2kg") {
      params.set("weight", weight);
    }
    return client.get(`amazon/search?${params.toString()}`).json();
  },

  /**
   * لیست محصولات با فیلتر و صفحه‌بندی — طبق داک Phase2.
   * GET api/Product/GetPaginated
   * پاسخ: { data: { products, totalCount, pageNumber, pageSize, totalPages } }
   * پارامترها: category, brand, minPrice, maxPrice, inStock, featured, amazonShop (1=UAE, 2=America, 3=Both), sortBy (price_asc|price_desc|rating|popularity|newest)
   */
  getList: async (params = {}) => {
    const q = new URLSearchParams();
    const {
      pageNumber = 1,
      pageSize = 20,
      category,
      brand,
      minPrice,
      maxPrice,
      inStock,
      featured,
      amazonShop,
      sortBy,
    } = params;
    q.set("pageNumber", String(Math.max(1, pageNumber)));
    q.set("pageSize", String(Math.min(100, Math.max(1, pageSize))));
    if (category) q.set("category", category);
    if (brand) q.set("brand", brand);
    if (minPrice != null && minPrice !== "") q.set("minPrice", String(minPrice));
    if (maxPrice != null && maxPrice !== "") q.set("maxPrice", String(maxPrice));
    if (inStock === true) q.set("inStock", "true");
    if (featured === true) q.set("featured", "true");
    if (amazonShop != null && amazonShop !== "") {
      const v = Number(amazonShop);
      if ([1, 2, 3].includes(v)) q.set("amazonShop", String(v));
    }
    if (sortBy) q.set("sortBy", sortBy);
    const client = getPublicClient();
    return client.get(`Product/GetPaginated?${q.toString()}`).json();
  },

  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      categoryId,
      brandId,
      status,
      searchTerm,
      minPrice,
      maxPrice,
      sortBy,
      sortDescending,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (brandId) searchParams.append("brandId", brandId.toString());
    if (status !== undefined && status !== null) searchParams.append("status", status.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (minPrice) searchParams.append("minPrice", minPrice.toString());
    if (maxPrice) searchParams.append("maxPrice", maxPrice.toString());
    if (sortBy) searchParams.append("sortBy", sortBy);
    if (sortDescending !== undefined) searchParams.append("sortDescending", sortDescending.toString());

    const client = getAuthenticatedClient();
    return client.get(`Product/GetPaginated?${searchParams.toString()}`).json();
  },

  getByCategory: async (categoryId) => {
    const client = getPublicClient();
    return client.get(`Product/GetByCategory?categoryId=${categoryId}`).json();
  },

  getByBrand: async (brandId, params = {}) => {
    const { pageNumber = 1, pageSize = 20 } = params;
    const searchParams = new URLSearchParams({
      brandId: brandId.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    const client = getPublicClient();
    return client.get(`Product/GetByBrand?${searchParams.toString()}`).json();
  },

  getFeatured: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString() ? `Product/GetFeatured?${searchParams.toString()}` : "Product/GetFeatured";
    return client.get(url).json();
  },

  getBestSellers: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString()
      ? `Product/GetBestSellers?${searchParams.toString()}`
      : "Product/GetBestSellers";
    return client.get(url).json();
  },

  getNewArrivals: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString()
      ? `Product/GetNewArrivals?${searchParams.toString()}`
      : "Product/GetNewArrivals";
    return client.get(url).json();
  },

  getOnSale: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString() ? `Product/GetOnSale?${searchParams.toString()}` : "Product/GetOnSale";
    return client.get(url).json();
  },

  getRelated: async (productId, limit = 4) => {
    const client = getPublicClient();
    return client.get(`Product/GetRelated?productId=${productId}&limit=${limit}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Product/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Product/Update?id=${id}`, { json: data }).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/SoftDelete?id=${id}`).json();
  },

  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/HardDelete?id=${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Product/Restore?id=${id}`).json();
  },

  changeStatus: async (id, status) => {
    const client = getAuthenticatedClient();
    return client.put(`Product/ChangeStatus?id=${id}&status=${status}`).json();
  },

  updateStock: async (id, stock) => {
    const client = getAuthenticatedClient();
    return client.put(`Product/UpdateStock?id=${id}&stock=${stock}`).json();
  },

  updatePrice: async (id, price, discountPrice) => {
    const client = getAuthenticatedClient();
    const searchParams = new URLSearchParams({ id: id.toString(), price: price.toString() });
    if (discountPrice) searchParams.append("discountPrice", discountPrice.toString());
    return client.put(`Product/UpdatePrice?${searchParams.toString()}`).json();
  },

  trackView: async (productId) => {
    const client = getAuthenticatedClient();
    return client.post(`Product/TrackView?productId=${productId}`).json();
  },

  uploadMainImage: async (productId, file) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    formData.append("file", file);
    return client.post(`Product/UploadMainImage?id=${productId}`, { body: formData }).json();
  },

  uploadProductImages: async (productId, files) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", files);
    }
    return client.post(`Product/UploadProductImages?id=${productId}`, { body: formData }).json();
  },

  deleteProductImage: async (productId, imageIndex) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/DeleteProductImage?id=${productId}&imageIndex=${imageIndex}`).json();
  },

  getStatistics: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetStatistics").json();
  },

  getCountByCategory: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetCountByCategory").json();
  },

  getCountByBrand: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetCountByBrand").json();
  },

  getCountByStatus: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetCountByStatus").json();
  },

  /**
   * دریافت عکس‌ها و جزئیات محصول از اسکرپر بر اساس ASIN (on-demand enrichment).
   * timeout کوتاه تا UI معطل نماند؛ مرورگر با Accept-Encoding: gzip پاسخ فشرده می‌گیرد.
   */
  getScraperProductImages: async (asin) => {
    if (!isScraperConfigured()) return null;
    try {
      const scraper = getScraperClient();
      return await scraper
        .get(`api/product/${encodeURIComponent(asin)}/images`, { timeout: 12000 })
        .json();
    } catch (err) {
      console.error("Error fetching scraper product images:", err);
      return null;
    }
  },

  /**
   * دریافت جزئیات کامل از اسکرپر: توضیحات، مشخصات فنی (attributes)، نظرات.
   * برای نمایش در صفحه محصول (بخش توضیحات، مشخصات فنی، نظرات).
   */
  getScraperProductDetails: async (asin) => {
    if (!isScraperConfigured()) return null;
    try {
      const scraper = getScraperClient();
      return await scraper
        .get(`api/product/${encodeURIComponent(asin)}/details`, { timeout: 28000 })
        .json();
    } catch (err) {
      console.error("Error fetching scraper product details:", err);
      return null;
    }
  },

  /**
   * نرمال کردن payload برای API بک‌اند: ScraperProductDto فیلدهای rating، reviews_count،
   * current_price، original_price، weight_kg را به صورت string انتظار دارد.
   */
  _normalizeScraperPayloadForApi(payload) {
    if (!payload || typeof payload !== "object") return payload;
    const out = { ...payload };
    if (out.rating != null && typeof out.rating !== "string")
      out.rating = String(out.rating);
    if (out.reviews_count != null && typeof out.reviews_count !== "string")
      out.reviews_count = String(out.reviews_count);
    if (out.current_price != null && typeof out.current_price !== "string")
      out.current_price = String(out.current_price);
    if (out.original_price != null && typeof out.original_price !== "string")
      out.original_price = String(out.original_price);
    if (out.weight_kg != null && typeof out.weight_kg !== "string")
      out.weight_kg = String(out.weight_kg);
    if (out.savings_amount != null && typeof out.savings_amount !== "string")
      out.savings_amount = String(out.savings_amount);
    if (out.discount_percentage != null && typeof out.discount_percentage !== "string")
      out.discount_percentage = String(out.discount_percentage);
    // backend انتظار دارد estimated_delivery_days به‌صورت string بیاید (ScraperProductDto.EstimatedDeliveryDays = string?)
    // اگر عدد باشد (مثل 14)، مبدل JSON خطا می‌دهد و کل مدل بایندینگ Fail می‌شود.
    if (out.estimated_delivery_days != null && typeof out.estimated_delivery_days !== "string") {
      out.estimated_delivery_days = String(out.estimated_delivery_days);
    }
    // بک‌اند برای ScraperProductDto.ShippingSummary یک آبجکت انتظار دارد؛
    // اگر از اسکرپر به‌صورت string آمده (مثل "🌍 International shipping ...")، برای جلوگیری از 400 ModelState آن را حذف می‌کنیم.
    if (out.shipping_summary != null && typeof out.shipping_summary !== "object") {
      delete out.shipping_summary;
    }
    return out;
  },

  /**
   * ذخیره محصول اسکرپ شده در صورت عدم وجود (برای محصولات باز شده از Amazon).
   * @param {object} scraperProduct - آبجکت محصول از اسکرپر
   * @param {string} [asinFallback] - ASIN از URL (مثلاً productId) تا حتماً در بادی ارسال شود و بک‌اند 400 ندهد
   */
  saveIfNotExistsFromScraper: async (scraperProduct, asinFallback) => {
    const client = getPublicClient();
    const body = productService._normalizeScraperPayloadForApi(scraperProduct) || {};
    const asin =
      (body.asin && String(body.asin).trim()) ||
      (body.amazonASIN && String(body.amazonASIN).trim()) ||
      (body.ASIN && String(body.ASIN).trim()) ||
      (asinFallback != null && String(asinFallback).trim()) ||
      "";
    if (asin) body.asin = asin;
    return client.post("Product/SaveIfNotExists", { json: body }).json();
  },

  /**
   * ذخیرهٔ قیمت تومان (OurPrice) در DB برای محصول موجود.
   * بعد از دریافت قیمت از preview در صفحهٔ جزئیات صدا زده می‌شود تا رفرش و لیست از DB قیمت درست را بخوانند.
   */
  updateProductPrice: async (productId, ourPrice) => {
    if (!productId || ourPrice == null || Number(ourPrice) <= 0) return null;
    const client = getPublicClient();
    return client
      .post("Product/UpdatePrice", { json: { productId: Number(productId), ourPrice: Number(ourPrice) } })
      .json();
  },

  /**
   * به‌روزرسانی محصول موجود در DB با جزئیات کامل اسکرپر (عکس‌ها، توضیحات، نظرات، مشخصات).
   * وقتی محصول با ID باز شده ولی در DB ناقص است استفاده می‌شود.
   */
  updateFromScraperDetails: async (productId, details) => {
    if (!productId || !details) return null;
    const client = getPublicClient();
    const body = {
      productId: Number(productId),
      description: details.description ?? null,
      title_fa: details.title_fa ?? null,
      images: Array.isArray(details.images) ? details.images : null,
      attributes: Array.isArray(details.attributes)
        ? details.attributes.map((a) => ({ name: a?.name ?? a?.Name ?? "", value: a?.value ?? a?.Value ?? "" }))
        : null,
      reviews: Array.isArray(details.reviews)
        ? details.reviews.map((r) => ({ title: r?.title ?? r?.Title ?? "", body: r?.body ?? r?.Body ?? "" }))
        : null,
      rating: details.rating != null ? Number(details.rating) : null,
      reviewsCount: details.reviews_count != null ? Number(details.reviews_count) : null,
    };
    return client.post("Product/UpdateFromScraperDetails", { json: body }).json();
  },
};
