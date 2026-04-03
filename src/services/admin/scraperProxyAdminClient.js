/**
 * پروکسی امن به API مدیریت پروکسی Flask — از طریق Route Handler سمت سرور Next.
 * کلید SCRAPER_ADMIN_API_KEY هرگز به مرورگر ارسال نمی‌شود.
 */
const PREFIX = "/api/admin/scraper-proxy";
const STATUS_URL = "/api/admin/scraper-proxy/status";

async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }
  return res.text();
}

/**
 * @param {string} path - مثال: "proxies" یا "proxies/dashboard/full"
 * @param {{ method?: string, body?: unknown, searchParams?: Record<string,string> }} options
 */
export async function scraperAdminFetch(path, options = {}) {
  const { method = "GET", body, searchParams } = options;
  let url = `${PREFIX}/${String(path).replace(/^\//, "")}`;
  if (searchParams && Object.keys(searchParams).length) {
    const q = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v != null && String(v) !== "") q.set(k, String(v));
    });
    const s = q.toString();
    if (s) url += `?${s}`;
  }

  const init = {
    method,
    credentials: "include",
    cache: "no-store",
    headers: {},
  };

  if (body != null && method !== "GET" && method !== "HEAD") {
    init.headers["Content-Type"] = "application/json";
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const data = await parseResponse(res);

  if (!res.ok) {
    const msg =
      (typeof data === "object" && data && (data.message || data.error)) ||
      (typeof data === "string" && data) ||
      `خطای HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    if (typeof data === "object" && data && data.error) err.code = data.error;
    throw err;
  }

  return data;
}

export function scraperAdminDownloadUrl(path, searchParams) {
  let url = `${PREFIX}/${String(path).replace(/^\//, "")}`;
  if (searchParams && Object.keys(searchParams).length) {
    const q = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v != null && String(v) !== "") q.set(k, String(v));
    });
    const s = q.toString();
    if (s) url += `?${s}`;
  }
  return url;
}

/**
 * وضعیت env سرور Next برای پنل پروکسی (بدون کلید). فقط بعد از لاگین ادمین.
 * @returns {Promise<{ ready: boolean, issues: string[], scraperHost: string|null, hasAdminApiKey: boolean, hasDotnetApiUrl: boolean, usesDedicatedScraperUrl: boolean }>}
 */
export async function fetchScraperProxyConfigStatus() {
  const res = await fetch(STATUS_URL, { credentials: "include", cache: "no-store" });
  const data = await parseResponse(res);
  if (!res.ok) {
    const msg =
      (typeof data === "object" && data && (data.message || data.error)) ||
      `خطای HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.code = typeof data === "object" && data?.error;
    throw err;
  }
  if (!data?.success || !data.data) {
    throw new Error("پاسخ نامعتبر وضعیت پیکربندی");
  }
  return data.data;
}
