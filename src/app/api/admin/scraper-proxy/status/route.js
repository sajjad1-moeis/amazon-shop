import { NextResponse } from "next/server";
import {
  verifyScraperProxyAdminCookie,
  getScraperAdminEnvSnapshot,
} from "@/lib/scraperAdminProxyServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * وضعیت پیکربندی پنل پروکسی (بدون افشای کلید). فقط ادمین.
 */
export async function GET() {
  const v = await verifyScraperProxyAdminCookie();
  if (!v.ok) {
    if (v.reason === "dotnet_unreachable") {
      return NextResponse.json(
        {
          success: false,
          error: "dotnet_unreachable",
          message: "اتصال به API دات‌نت برای احراز ادمین برقرار نشد یا تایم‌اوت شد.",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: "unauthorized", message: "فقط ادمین مجاز است." },
      { status: 401 }
    );
  }

  const snap = getScraperAdminEnvSnapshot();
  const issues = [];
  if (!snap.hasDotnetApiUrl) issues.push("NEXT_PUBLIC_API_URL خالی است — احراز ادمین کار نمی‌کند.");
  if (!snap.hasAdminApiKey)
    issues.push(
      "کلید ادمین اسکرپر در دسترس نیست: در production مقدار SCRAPER_ADMIN_API_KEY را روی Next بگذارید (همان ADMIN_API_KEY اسکرپر). در development یا .env.local همین کلید را بگذارید، یا در فایل scraping_product_amazon/myenv/.env مقدار ADMIN_API_KEY را داشته باشید."
    );
  if (!snap.scraperHost) issues.push("آدرس اسکرپر نامعتبر است — SCRAPER_SERVICE_URL یا NEXT_PUBLIC_SCRAPER_URL را چک کن.");

  const res = NextResponse.json({
    success: true,
    data: {
      ...snap,
      ready: issues.length === 0,
      issues,
    },
  });
  res.headers.set("Cache-Control", "private, no-store, max-age=0");
  return res;
}
