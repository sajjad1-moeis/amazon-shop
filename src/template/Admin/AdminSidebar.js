"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ADMIN_SIDEBAR_ITEMS } from "@/data/adminSidebarData";
import { cn } from "@/lib/utils";
import Image from "next/image";

const pathMatches = (pathname, href) => {
  if (!pathname || !href) return false;
  if (pathname === href) return true;
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href + "/");
};

export const SideBarContent = ({ onLinkClick }) => {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState("");

  useEffect(() => {
    let keyToOpen = "";
    ADMIN_SIDEBAR_ITEMS.forEach((item) => {
      if (item.children) {
        const childMatch = item.children.some(
          (child) => pathname === child.href || pathMatches(pathname, child.href)
        );
        if (childMatch) keyToOpen = item.key;
      }
    });
    setOpenKey(keyToOpen);
  }, [pathname]);

  const isActive = (item) => {
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.href || pathMatches(pathname, child.href)
      );
    }
    if (pathname === item.href) return true;
    if (item.href !== "/admin" && pathMatches(pathname, item.href)) return true;
    if (item.key === "report" && pathname?.startsWith("/admin/reports")) return true;
    return false;
  };

  const isChildActive = (child, siblings = []) => {
    if (!(pathname === child.href || pathMatches(pathname, child.href))) return false;
    const noStricterSibling = !siblings.some(
      (s) => s !== child && (pathname === s.href || pathMatches(pathname, s.href)) && s.href.length > child.href.length
    );
    return noStricterSibling;
  };

  return (
    <div className="h-full lg:bg-gray-800 lg:bg-opacity-50 border-0 lg:!border-l lg:border-gray-700 backdrop-blur-md lg:p-4 flex flex-col lg:shadow-lg">
      <Link href="/" className="flex flex-col items-center max-md:my-3">
        <Image
          src="/image/logo.png"
          alt="لوگو"
          width={120}
          height={50}
          className="max-w-[120px] my-3 filter invert brightness-0"
        />
      </Link>

      <nav className="mt-5 flex-grow max-lg:flex-grow-0 max-lg:mt-0 w-full">
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
                      "flex items-center gap-2 p-2 px-3 text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors [&[data-state=open]>svg]:rotate-180",
                      active && "bg-gray-700/80 text-white ring-1 ring-gray-600/50"
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
                    <ul className="p-3 space-y-2 border-b border-b-white/15">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onLinkClick}
                            className={cn(
                              "block p-2 text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors text-white",
                              isChildActive(child, item.children) && "bg-gray-700/80 ring-1 ring-gray-600/50"
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
              <Link key={item.href} href={item.href} onClick={onLinkClick} className="block mb-2">
                <div
                  className={cn(
                    "flex items-center gap-2 p-2 px-3 font-medium rounded-lg hover:bg-gray-700 transition-colors text-white",
                    active && "bg-gray-700/80 ring-1 ring-gray-600/50"
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
      <SideBarContent />
    </div>
  );
}
