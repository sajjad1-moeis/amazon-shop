import { NextResponse } from "next/server";
import {
  verifyScraperProxyAdminCookie,
  getScraperServiceBaseUrl,
  getScraperAdminApiKey,
  SCRAPER_ADMIN_UPSTREAM_TIMEOUT_MS,
  assertSafeAdminPathSegments,
} from "@/lib/scraperAdminProxyServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** روی Vercel و محیطهای serverless برای export/health طولانی */
export const maxDuration = 300;

async function forward(method, pathSegments, request) {
  const key = getScraperAdminApiKey();
  if (!key) {
    return NextResponse.json(
      {
        success: false,
        error: "server_misconfigured",
        message: "SCRAPER_ADMIN_API_KEY روی سرور Next تنظیم نشده است.",
      },
      { status: 503 }
    );
  }

  const base = getScraperServiceBaseUrl();
  try {
    new URL(base.startsWith("http") ? base : `http://${base}`);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "server_misconfigured",
        message: "آدرس اسکرپر نامعتبر است. SCRAPER_SERVICE_URL یا NEXT_PUBLIC_SCRAPER_URL را تنظیم کنید.",
      },
      { status: 503 }
    );
  }

  const sub = pathSegments.join("/");
  const url = new URL(request.url);
  const target = `${base}/api/v1/admin/${sub}${url.search}`;

  const headers = { "X-API-Key": key };
  const init = {
    method,
    headers,
    redirect: "manual",
    signal: AbortSignal.timeout(SCRAPER_ADMIN_UPSTREAM_TIMEOUT_MS),
  };

  if (method !== "GET" && method !== "HEAD") {
    const ct = request.headers.get("content-type");
    if (ct) headers["Content-Type"] = ct;
    init.body = await request.arrayBuffer();
  }

  let upstream;
  try {
    upstream = await fetch(target, init);
  } catch (e) {
    const isTimeout = e?.name === "TimeoutError" || e?.name === "AbortError";
    return NextResponse.json(
      {
        success: false,
        error: isTimeout ? "upstream_timeout" : "upstream_unreachable",
        message: isTimeout
          ? `اسکرپر در ${Math.round(SCRAPER_ADMIN_UPSTREAM_TIMEOUT_MS / 1000)} ثانیه پاسخ نداد.`
          : "اتصال به اسکرپر برقرار نشد (آدرس، فایروال یا سرویس خاموش).",
      },
      { status: 502 }
    );
  }

  const outHeaders = new Headers();
  const pass = ["content-type", "content-disposition"];
  for (const h of pass) {
    const v = upstream.headers.get(h);
    if (v) outHeaders.set(h, v);
  }

  const body = await upstream.arrayBuffer();
  const res = new NextResponse(body, { status: upstream.status, headers: outHeaders });
  res.headers.set("Cache-Control", "private, no-store, max-age=0");
  return res;
}

async function handle(method, request, context) {
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

  const params = await context.params;
  const segments = params?.path || [];
  if (!assertSafeAdminPathSegments(segments)) {
    return NextResponse.json(
      { success: false, error: "bad_path", message: "مسیر API نامعتبر است." },
      { status: 400 }
    );
  }

  return forward(method, segments, request);
}

export async function GET(request, context) {
  return handle("GET", request, context);
}

export async function POST(request, context) {
  return handle("POST", request, context);
}

export async function PATCH(request, context) {
  return handle("PATCH", request, context);
}

export async function DELETE(request, context) {
  return handle("DELETE", request, context);
}
