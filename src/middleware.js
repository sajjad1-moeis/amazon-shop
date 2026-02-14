import { NextResponse } from "next/server";

// مسیرهای خصوصی (بدون کش عمومی)
const PRIVATE_ROUTES = ["/dashboard", "/admin", "/cart", "/steps-cart", "/payment"];

// فایل‌های استاتیک که Next.js خودش مدیریت می‌کنه
const STATIC_EXTENSIONS = /\.(js|css|ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|eot)$/;

function isPrivateRoute(pathname) {
  return PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
}

function isStaticFile(pathname) {
  return pathname.startsWith("/_next") || STATIC_EXTENSIONS.test(pathname);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // فایل‌های استاتیک Next.js → خود Next.js مدیریت می‌کنه
  if (isStaticFile(pathname)) {
    return response;
  }

  // مسیرهای خصوصی → بدون کش (اطلاعات حساس کاربر)
  if (isPrivateRoute(pathname)) {
    response.headers.set(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );
    return response;
  }

  // مسیرهای عمومی → کش ۱ ساعته + آپدیت پس‌زمینه
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );

  return response;
}

export const config = {
  matcher: [
    // همه مسیرها به جز فایل‌های استاتیک Next.js و API داخلی
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

