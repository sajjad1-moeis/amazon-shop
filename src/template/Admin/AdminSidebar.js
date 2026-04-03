"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ADMIN_SIDEBAR_ITEMS } from "@/data/adminSidebarData";
import { cn } from "@/lib/utils";
import Image from "next/image";

const pathMatches = (pathname, href) => {
  if (!pathname || !href) return false;
  const pathOnly = href.split("?")[0];
  if (pathname === pathOnly) return true;
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(pathOnly + "/");
};

/**
 * تطبیق لینک سایدبار با pathname و query فعلی (برای /admin/orders?status=).
 */
function hrefMatchesLocation(pathname, searchParams, href) {
  if (!pathname || !href) return false;
  const [pathOnly, queryPart] = href.split("?");
  if (pathname !== pathOnly) {
    return pathMatches(pathname, href);
  }
  if (!queryPart) {
    if (pathOnly === "/admin/orders") {
      const st = searchParams.get("status");
      return !st || st === "all";
    }
    /* بدون query در href: تطبیق فقط بر اساس مسیر؛ پارامترهای دیگر (مثلاً page) مانع highlight نیست */
    return true;
  }
  const expected = new URLSearchParams(queryPart);
  for (const [key, value] of expected.entries()) {
    if (searchParams.get(key) !== value) return false;
  }
  return true;
}

function childIsMoreSpecificThan(aHref, bHref) {
  if (!aHref || !bHref) return false;
  const aQ = aHref.split("?")[1]?.length ?? 0;
  const bQ = bHref.split("?")[1]?.length ?? 0;
  return aQ > bQ;
}

function SidebarNavFallback({ variant }) {
  const isDrawer = variant === "drawer";
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-2",
        isDrawer && "px-0.5",
        !isDrawer && "mt-5 w-full max-lg:mt-0"
      )}
      aria-hidden
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-10 animate-pulse rounded-xl bg-gray-700/35" />
      ))}
    </div>
  );
}

/** useSearchParams — باید داخل Suspense باشد (App Router) */
export function SideBarContentWithSuspense(props) {
  return (
    <Suspense fallback={<SidebarNavFallback variant={props.variant} />}>
      <SideBarContent {...props} />
    </Suspense>
  );
}

export const SideBarContent = ({ onLinkClick, variant = "sidebar" }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openKey, setOpenKey] = useState("");
  const isDrawer = variant === "drawer";

  /** رشتهٔ پایدار برای وابستگی effect — بدون اتکا به هویت آبجکت searchParams */
  const searchKey = searchParams.toString();

  useEffect(() => {
    const sp = new URLSearchParams(searchKey);
    let keyToOpen = "";
    ADMIN_SIDEBAR_ITEMS.forEach((item) => {
      if (item.children) {
        const childMatch = item.children.some((child) =>
          hrefMatchesLocation(pathname, sp, child.href)
        );
        if (childMatch) keyToOpen = item.key;
      }
    });
    setOpenKey((prev) => (prev === keyToOpen ? prev : keyToOpen));
  }, [pathname, searchKey]);

  const isActive = (item) => {
    if (item.children) {
      return item.children.some((child) => hrefMatchesLocation(pathname, searchParams, child.href));
    }
    const pathOnly = item.href.split("?")[0];
    if (pathname === pathOnly && !item.href.includes("?")) return true;
    if (item.href !== "/admin" && pathMatches(pathname, item.href)) return true;
    if (item.key === "report" && pathname?.startsWith("/admin/reports")) return true;
    if (item.key === "search-management" && pathname?.startsWith("/admin/search")) return true;
    return false;
  };

  const isChildActive = (child, siblings = []) => {
    if (!hrefMatchesLocation(pathname, searchParams, child.href)) return false;
    const noStricterSibling = !siblings.some((s) => {
      if (s === child) return false;
      if (!hrefMatchesLocation(pathname, searchParams, s.href)) return false;
      return s.href.length > child.href.length || childIsMoreSpecificThan(s.href, child.href);
    });
    return noStricterSibling;
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col border-0 backdrop-blur-md lg:border-l lg:border-gray-700 lg:bg-gray-800/50 lg:p-4 lg:shadow-lg",
        isDrawer && "bg-gradient-to-b from-gray-900 via-gray-900/98 to-gray-950"
      )}
    >
      <Link
        href="/"
        onClick={onLinkClick}
        className={cn("flex flex-col items-center", isDrawer ? "my-2" : "max-md:my-3")}
      >
        <Image
          src="/image/logo.png"
          alt="لوگو"
          width={120}
          height={50}
          className={cn("max-w-[120px] filter invert brightness-0", isDrawer ? "my-2 max-w-[100px]" : "my-3")}
        />
      </Link>

      <nav className={cn("mt-5 w-full flex-grow max-lg:mt-0 max-lg:flex-grow-0", isDrawer && "mt-2 px-0.5")}>
        <Accordion
          type="single"
          collapsible
          value={openKey}
          onValueChange={setOpenKey}
          className="w-full"
        >
          {ADMIN_SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            if (item.children) {
              return (
                <AccordionItem key={item.key} value={item.key} className="border-none mb-2">
                  <AccordionTrigger
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-xl p-2 px-3 text-sm font-medium transition-colors hover:bg-gray-700/90 active:scale-[0.99] [&[data-state=open]>svg]:rotate-180",
                      isDrawer && "min-h-12 py-2.5 text-[15px]",
                      active && "bg-gray-700/80 text-white ring-1 ring-gray-600/60"
                    )}
                  >
                    <Icon
                      variant="Bold"
                      className="!rotate-0"
                      size={20}
                      style={{ color: item.color, minWidth: "20px" }}
                    />
                    <p className="ml-4 whitespace-nowrap max-md:text-sm text-base flex-grow text-right text-white">
                      {item.name}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="space-y-1 border-b border-b-white/10 p-2 pb-3">
                      {item.children.map((child) => (
                        <li key={`${item.key}-${child.href}`}>
                          <Link
                            href={child.href}
                            onClick={onLinkClick}
                            className={cn(
                              "block cursor-pointer rounded-lg p-2 text-sm font-medium text-white transition-colors hover:bg-gray-700/90 active:bg-gray-700",
                              isDrawer && "min-h-11 py-2.5 pr-3 text-[14px] leading-snug",
                              isChildActive(child, item.children) && "bg-gray-700/90 ring-1 ring-gray-600/60"
                            )}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            }

            return (
              <Link key={item.href} href={item.href} onClick={onLinkClick} className="mb-2 block">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-xl p-2 px-3 font-medium text-white transition-colors hover:bg-gray-700/90 active:scale-[0.99]",
                    isDrawer && "min-h-12 py-2.5 text-[15px]",
                    active && "bg-gray-700/80 ring-1 ring-gray-600/60"
                  )}
                >
                  <Icon variant="Bold" size={20} style={{ color: item.color, minWidth: "20px" }} />
                  <p className="max-md:text-sm ml-4 whitespace-nowrap text-right">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </Accordion>
      </nav>
    </div>
  );
};

export default function AdminSidebar() {
  return (
    <div className="relative max-lg:hidden">
      <SideBarContentWithSuspense />
    </div>
  );
}
