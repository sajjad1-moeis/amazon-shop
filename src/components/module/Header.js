"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Category2, Heart, ShoppingCart } from "iconsax-reactjs";
import { HeadphonesIcon } from "lucide-react";
import TopBar from "./Topbar";
import Link from "next/link";
import BtnShowLoginModal from "../BtnShowLoginModal";
import SwitchButton from "../SwitchButton";
import DiscountAmazonButton from "../DiscountAmazonButton";
import DrawerMobile from "./DrawerMobile";
import MobileCategoriesMegaDrawer from "./MobileCategoriesMegaDrawer";
import SearchDropdown from "./SearchDropdown";
import { Button } from "../ui/button";
import { useCartCount } from "@/contexts/CartCountContext";
function Header() {
  const { cartCount } = useCartCount();
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [crispLoading, setCrispLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let done = false;
    const warm = () => {
      if (done) return;
      done = true;
      window.removeEventListener("mousemove", warm);
      window.removeEventListener("scroll", warm);
      import("@/lib/openCrispSupport").then((m) => m.prefetchCrispAssets());
    };
    window.addEventListener("mousemove", warm, { passive: true });
    window.addEventListener("scroll", warm, { passive: true });
    return () => {
      window.removeEventListener("mousemove", warm);
      window.removeEventListener("scroll", warm);
    };
  }, []);

  const warmCrispAssets = useCallback(() => {
    import("@/lib/openCrispSupport").then((m) => m.prefetchCrispAssets());
  }, []);

  const openCrisp = useCallback(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-crisp-from-header", "");
    }
    setCrispLoading(true);
    import("@/lib/openCrispSupport")
      .then((m) => m.openCrispSupport())
      .catch((err) => {
        console.error("[Crisp]", err);
        if (typeof document !== "undefined") {
          document.documentElement.removeAttribute("data-crisp-from-header");
        }
      })
      .finally(() => setCrispLoading(false));
  }, []);

  return (
    <header className="w-full ">
      <div className="dark:bg-dark-header bg-primary-500 py-1.5 ">
        <div className="flex-between xl:container max-2xl:px-4 ">
          <Link
            href="/paypal-cashout"
            rel="noopener noreferrer"
            className="flex items-center gap-2 flex-shrink-0 animate-pulse"
            aria-label="PayPal"
          >
            <Image alt="PayPal" src="/image/Header/paypal.png" width={65} height={48} />
            <p className="dark:text-[#D4F4FF] text-info-200 font-thin text-sm max-sm:hidden">داری، کلیک کن</p>
          </Link>
          <div className="flex-between gap-2 max-lg:hidden">
            <p className="dark:text-[#D4F4FF] text-info-200 font-thin text-sm">
              تخفیف ویژه خرید اولی‌ها! تا ۵٪ هزینه خدمات کمتر برای اولین سفارش شما 🎁
            </p>
          </div>
          <button
            type="button"
            data-crisp-support-trigger
            onClick={openCrisp}
            onMouseEnter={warmCrispAssets}
            onFocus={warmCrispAssets}
            disabled={crispLoading}
            className="flex-between gap-2 max-lg:hidden hover:opacity-90 transition-opacity disabled:opacity-70"
            aria-label="پشتیبانی 24 ساعته"
          >
            <HeadphonesIcon className="dark:text-[#E9F0FF] text-primary-300" />
            <p className="dark:text-[#E9F0FF] text-primary-300">
              {crispLoading ? "در حال بارگذاری..." : "پشتیبانی 24 ساعته"}
            </p>
          </button>

          <div className="flex-between lg:hidden">
            <DiscountAmazonButton className={"max-md:hidden lg:hidden"} />
            <div className="lg:hidden">
              <SwitchButton />
            </div>
          </div>
        </div>
      </div>
      <div
        className="dark:bg-dark-header bg-primary-500 pt-2 lg:pt-5 pb-2"
        style={{ boxShadow: "0px 0px 0px 1px #FFFFFF40" }}
      >
        <div className="max-md:flex-col flex-between  max-2xl:px-3 xl:container gap-2 md:gap-10  w-full">
          <div className="flex-between max-lg:mb-2 min-w-0 max-md:w-full">
            <div className="flex items-center min-w-0 sm:gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setMobileCategoriesOpen(true)}
                className="shrink-0 rounded-xl p-1 text-white hover:bg-white/10 lg:hidden"
                aria-label="دسته‌بندی محصولات"
              >
                <Category2 size={22} variant="Outline" className="sm:mr-1" />
                <span className="hidden text-xs font-medium sm:inline">دسته‌بندی</span>
              </Button>
              <DrawerMobile onOpenCategoriesMega={() => setMobileCategoriesOpen(true)} />
              <Link
                href="/"
                className="flex-shrink-0 flex items-center min-w-[120px] md:min-w-[140px] lg:min-w-[170px]"
                style={{ minHeight: 36 }}
              >
                <Image
                  alt="لوگو میکرولس"
                  src="/image/logo.png"
                  width={170}
                  height={48}
                  className="h-9 w-auto max-w-[170px] object-contain object-center md:h-10 lg:h-12"
                  priority
                />
              </Link>
            </div>

            <DiscountAmazonButton className={"md:hidden flex-shrink-0"} />
          </div>
          <SearchDropdown />
          <div className="flex-between gap-3 text-white max-md:hidden">
            <Link href={"/dashboard/favorites"}>
              <div className="p-3 rounded-lg border-2 dark:border-[#898989] dark:text-[#898989] border-white max-lg:hidden">
                <Heart />
              </div>
            </Link>
            <Link href={"/cart"}>
              <div className="p-3 rounded-lg border-2 dark:border-[#898989] dark:text-[#898989] border-white relative">
                <div className="absolute size-5 bg-primary-400 text-white flex-center rounded -top-2 -right-2 text-xs font-medium min-w-[20px]">
                  {cartCount}
                </div>
                <ShoppingCart />
              </div>
            </Link>
            <BtnShowLoginModal />
          </div>
        </div>
      </div>
      <TopBar />
      <MobileCategoriesMegaDrawer open={mobileCategoriesOpen} onOpenChange={setMobileCategoriesOpen} />
    </header>
  );
}

export default Header;
