import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cookies } from "next/headers";
import { isAdminUser } from "@/utils/authHelpers";

/** آدرس اسکرپر برای فوروارد سمت سرور (ترجیح: SCRAPER_SERVICE_URL تا در production از نام داخلی داکر بشود استفاده کرد) */
export function getScraperServiceBaseUrl() {
  const u =
    process.env.SCRAPER_SERVICE_URL ||
    process.env.NEXT_PUBLIC_SCRAPER_URL ||
    "http://127.0.0.1:5000";
  return String(u).replace(/\/$/, "");
}

export function dotnetApiBase() {
  const u = process.env.NEXT_PUBLIC_API_URL || "";
  return String(u).replace(/\/$/, "");
}

/** پارس سبک .env — fallback (بدون وابستگی خارجی)؛ پشتیبانی از `export KEY=` */
function _parseDotEnvSimple(raw) {
  const out = {};
  for (const line of String(raw).split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    let k = t.slice(0, eq).trim();
    if (k.toLowerCase().startsWith("export ")) k = k.slice(7).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[k] = v;
  }
  return out;
}

/** مسیرهای محتمل myenv/.env نسبت به ریشهٔ پکیج amazon-shop (src/lib → ../../) */
function _scraperEnvPathsFromModuleFile() {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const pkgRoot = path.join(here, "..", "..");
    return [
      path.join(pkgRoot, "..", "scraping_product_amazon", "myenv", ".env"),
      path.join(pkgRoot, "scraping_product_amazon", "myenv", ".env"),
    ];
  } catch {
    return [];
  }
}

/** با بالا رفتن از process.cwd() تا چند سطح — برای لوکال وقتی cwd ریشهٔ monorepo یا amazon-shop است */
function _scraperEnvPathsWalkingUpFromCwd() {
  const out = [];
  let dir = process.cwd();
  const seen = new Set();
  for (let i = 0; i < 12; i++) {
    if (!dir || seen.has(dir)) break;
    seen.add(dir);
    out.push(path.join(dir, "scraping_product_amazon", "myenv", ".env"));
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return out;
}

let _scraperAdminKeyFromFileMemo;

/**
 * اگر SCRAPER_ADMIN_API_KEY روی Next ست نشده، از `ADMIN_API_KEY` (یا SCRAPER_ADMIN_API_KEY)
 * در `scraping_product_amazon/myenv/.env` بخوان — مناسب monorepo لوکال (`next dev` و `next start`).
 * غیرفعال: SCRAPER_ADMIN_DISABLE_SCRAPER_ENV_FILE=1 (یا SCRAPER_ADMIN_NO_DEV_FALLBACK=1).
 */
function _readAdminKeyFromScraperEnvFile() {
  if (_scraperAdminKeyFromFileMemo !== undefined) return _scraperAdminKeyFromFileMemo;
  if (
    process.env.SCRAPER_ADMIN_DISABLE_SCRAPER_ENV_FILE === "1" ||
    process.env.SCRAPER_ADMIN_NO_DEV_FALLBACK === "1"
  ) {
    _scraperAdminKeyFromFileMemo = "";
    return "";
  }

  const candidates = [..._scraperEnvPathsFromModuleFile(), ..._scraperEnvPathsWalkingUpFromCwd()];
  const unique = [...new Set(candidates)];

  for (const p of unique) {
    try {
      if (!existsSync(p)) continue;
      let raw = readFileSync(p, "utf8");
      if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
      const parsed = _parseDotEnvSimple(raw);
      const v = (parsed.SCRAPER_ADMIN_API_KEY || parsed.ADMIN_API_KEY || "").trim();
      if (v) {
        _scraperAdminKeyFromFileMemo = v;
        return v;
      }
    } catch {
      continue;
    }
  }
  _scraperAdminKeyFromFileMemo = "";
  return "";
}

/**
 * کلید API برای فراخوانی /api/v1/admin اسکرپر (هدر X-API-Key).
 * ترجیح: env روی Next؛ سپس فایل monorepo اسکرپر در صورت وجود.
 */
export function getScraperAdminApiKey() {
  const fromEnv = (process.env.SCRAPER_ADMIN_API_KEY || "").trim();
  if (fromEnv) return fromEnv;
  return _readAdminKeyFromScraperEnvFile();
}

const _rawVerifyMs = Number(process.env.SCRAPER_ADMIN_DOTNET_VERIFY_TIMEOUT_MS);
const DOTNET_VERIFY_TIMEOUT_MS = Number.isFinite(_rawVerifyMs)
  ? Math.min(Math.max(_rawVerifyMs, 3000), 30000)
  : 12000;

export async function verifyScraperProxyAdminCookie() {
  const jar = await cookies();
  const token = jar.get("accessToken")?.value;
  if (!token) return { ok: false, reason: "no_token" };

  const base = dotnetApiBase();
  if (!base) return { ok: false, reason: "no_api_url" };

  let res;
  try {
    res = await fetch(`${base}/Auth/GetUserByToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ token }),
      cache: "no-store",
      signal: AbortSignal.timeout(DOTNET_VERIFY_TIMEOUT_MS),
    });
  } catch {
    return { ok: false, reason: "dotnet_unreachable" };
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  if (!res.ok || !json?.success || !json?.data) return { ok: false, reason: "invalid_token" };

  const user = json.data.user || json.data;
  if (!isAdminUser(user)) return { ok: false, reason: "not_admin" };

  return { ok: true };
}

/** فقط boolean / host — هرگز کلید یا URL کامل حساس برنگردان */
export function getScraperAdminEnvSnapshot() {
  const key = getScraperAdminApiKey();
  const explicit = Boolean((process.env.SCRAPER_ADMIN_API_KEY || "").trim());
  const base = getScraperServiceBaseUrl();
  let host = "";
  try {
    host = new URL(base.startsWith("http") ? base : `http://${base}`).host;
  } catch {
    host = "";
  }
  return {
    hasAdminApiKey: key.length > 0,
    /** true یعنی از SCRAPER_ADMIN_API_KEY خود Next استفاده می‌شود (نه fallback dev) */
    hasExplicitAdminApiKey: explicit,
    /** وقتی کلید از فایل myenv/.env اسکرپر خوانده شده (نه env Next) */
    usesScraperEnvFileFallback: !explicit && key.length > 0,
    hasDotnetApiUrl: dotnetApiBase().length > 0,
    scraperHost: host || null,
    usesDedicatedScraperUrl: Boolean((process.env.SCRAPER_SERVICE_URL || "").trim()),
  };
}

/** مهلت درخواست به اسکرپر (میلی‌ثانیه) — از env: SCRAPER_ADMIN_UPSTREAM_TIMEOUT_MS */
const _rawUpstreamMs = Number(process.env.SCRAPER_ADMIN_UPSTREAM_TIMEOUT_MS);
const _upstreamDefault = Number.isFinite(_rawUpstreamMs) ? _rawUpstreamMs : 120000;
export const SCRAPER_ADMIN_UPSTREAM_TIMEOUT_MS = Math.min(Math.max(_upstreamDefault, 15000), 300000);

/**
 * جلوگیری از path traversal و مسیرهای غیرمجاز در فوروارد به Flask.
 * @param {string[]} segments
 */
export function assertSafeAdminPathSegments(segments) {
  if (!Array.isArray(segments) || segments.length === 0) return false;
  const joined = segments.join("/");
  if (joined.length > 2048) return false;
  for (const s of segments) {
    if (typeof s !== "string" || s.length === 0 || s.length > 512) return false;
    if (s === "." || s === "..") return false;
    if (s.includes("..") || s.includes("\\")) return false;
  }
  return true;
}
