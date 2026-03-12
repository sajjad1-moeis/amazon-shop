import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseProductNum, getProductName } from "@/utils/productHelpers";
import { ShieldTick, Star1, TickSquare, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCartCount } from "@/contexts/CartCountContext";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { compareService } from "@/services/compare/compareService";
import { userWishlistService } from "@/services/userWishlist/userWishlistService";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Heart, ShoppingCart, Layer } from "iconsax-reactjs";

/** پرچم (عکس) و پسوند ارز بر اساس منطقه/ارز محصول — بدون متن US/AE */
function getCurrencyFlagAndSuffix(product) {
  const currency = (product?.currency ?? product?.currency_symbol ?? "").toUpperCase();
  const region = product?.region ?? product?.amazonRegion ?? product?.sellerCountry;
  if (currency === "AED" || region === "uae" || region === "ae") {
    return { flagSrc: "/image/Products/emarat.png", suffix: " درهم" };
  }
  if (currency === "USD" || region === "us" || region === "america") {
    return { flagSrc: "/image/Products/usa.png", suffix: " دلار" };
  }
  return { flagSrc: null, suffix: " تومان" };
}

function ProductRowCard({ product }) {
  const image =
    product?.mainImageUrl ||
    product?.mainImage ||
    product?.image_url_hq ||
    product?.image_url ||
    (Array.isArray(product?.images) && product.images[0]) ||
    (Array.isArray(product?.imageUrls) && product.imageUrls[0]) ||
    product?.image ||
    "/image/Home/product.png";

  const title = getProductName(product);

  const shortDesc =
    product?.shortDescription ||
    (product?.description ? String(product.description).slice(0, 120).trim() + (String(product.description).length > 120 ? "…" : "") : null);

  const listPriceRaw = product?.original_price ?? product?.price ?? product?.originalPrice;
  const salePriceRaw = product?.current_price ?? product?.discountPrice ?? product?.finalPrice ?? product?.price;
  const listPrice = Math.max(0, parseProductNum(listPriceRaw) ?? 0);
  const salePrice = Math.max(0, parseProductNum(salePriceRaw) ?? listPrice ?? 0);
  const effectiveList = listPrice > 0 ? listPrice : salePrice;
  const effectiveSale = salePrice > 0 ? salePrice : effectiveList;

  const discountPercent =
    product?.discount_percentage != null || product?.discountPercentage != null
      ? parseProductNum(product?.discount_percentage ?? product?.discountPercentage)
      : effectiveList > 0 && effectiveSale < effectiveList
        ? Math.min(99, Math.round(((effectiveList - effectiveSale) / effectiveList) * 100))
        : null;

  const ratingNum = parseProductNum(product?.rating);
  const ratingShow = Number.isFinite(ratingNum) && ratingNum >= 0 ? Math.min(5, ratingNum) : null;
  const reviewCountRaw = parseProductNum(product?.reviewCount ?? product?.reviews_count);
  const reviewCount = Number.isFinite(reviewCountRaw) ? Math.max(0, Math.floor(reviewCountRaw)) : null;

  const { flagSrc: currencyFlagSrc, suffix: currencySuffix } = getCurrencyFlagAndSuffix(product);
  const formatPrice = (n) => {
    const num = parseProductNum(n);
    if (!Number.isFinite(num) || num < 0) return "—";
    return `${num.toLocaleString("fa-IR")}${currencySuffix}`;
  };
  const productSlug = product?.id ?? product?.productId ?? product?.asin ?? product?.amazonASIN ?? "";

  const router = useRouter();
  const { user } = useAuth();
  const { refreshCartCount } = useCartCount();
  const productId = product?.id ?? product?.productId ?? null;
  const hasNumericId = productId != null && String(Number(productId)) === String(productId);
  const hrefId = productSlug;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.id) {
      toast.error("برای افزودن به سبد باید وارد شوید");
      router.push("/");
      return;
    }
    if (!hasNumericId || !productId) {
      router.push(`/product/${hrefId}`);
      return;
    }
    try {
      await shoppingCartService.addToCart(user.id, {
        productId: Number(productId),
        quantity: 1,
        hasQualityShield: false,
      });
      refreshCartCount();
      toast.success("به سبد خرید اضافه شد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در افزودن به سبد");
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.id) {
      toast.error("برای علاقه‌مندی‌ها باید وارد شوید");
      router.push("/");
      return;
    }
    if (!hasNumericId || !productId) {
      router.push(`/product/${hrefId}`);
      return;
    }
    try {
      await userWishlistService.addToWishlist(user.id, { productId: Number(productId) });
      toast.success("به علاقه‌مندی‌ها اضافه شد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در افزودن به علاقه‌مندی‌ها");
    }
  };

  const handleCompare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.id) {
      toast.error("برای مقایسه باید وارد شوید");
      router.push("/");
      return;
    }
    const id = hasNumericId ? Number(productId) : null;
    if (id == null) {
      router.push(`/product/${hrefId}`);
      return;
    }
    try {
      await compareService.add({ productId: id, userId: user.id });
      toast.success("به لیست مقایسه اضافه شد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در افزودن به مقایسه");
    }
  };

  return (
    <div className="group relative">
      <Card className="rounded-xl border overflow-hidden border-gray-200 dark:border-dark-field  dark:bg-dark-box shadow-sm hover:shadow-md transition p-0">
        <div className="p-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative aspect-square max-h-48 md:max-h-64 w-full max-w-[200px] md:max-w-none mx-auto md:mx-0 bg-gray-50 dark:bg-dark-field overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain rounded-md"
              sizes="(max-width: 768px) 50vw, 240px"
            />
          </div>

          {/* LEFT SECTION (INFO) — عنوان و توضیح بالا، قابلیت‌ها وسط، قیمت و امتیاز پایین */}
          <div className="md:col-span-3 flex flex-col">
            {/* بالا: عنوان و توضیح */}
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-lg text-neutral-800 dark:text-dark-titre">
                {title}
              </h2>
              {shortDesc && (
                <p className="text-gray-600 text-sm dark:text-[#7B7F86]">
                  {shortDesc}
                </p>
              )}
            </div>

            {/* وسط: سه قابلیت — پر کردن فضای خالی */}
            <div className="flex-between mt-3 flex-wrap gap-x-4 gap-y-2 max-md:mt-4 flex-1 min-h-[60px]">
              <div className="flex-between text-gray-400 text-sm gap-2">
                <Timer1 size={16} variant="Bold" />
                <p>دارای قابلیت زمان‌سنج دقیق</p>
              </div>
              <div className="flex-between text-gray-400 text-sm gap-2">
                <ShieldTick size={16} variant="Bold" />
                <p>دوام و مقاومت بالا</p>
              </div>
              <div className="flex-between text-gray-400 text-sm gap-2">
                <TickSquare size={16} variant="Bold" />
                <p>شیشه ضد خش</p>
              </div>
            </div>

            {/* پایین: لوگو، امتیاز، قیمت، دکمه */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-stroke">
              <div className="flex-between">
                <div className="flex-between gap-2">
                  <Image src="/image/amazonLogo.png" alt="آمازون" width={60} height={30} className="object-contain" />
                  {currencyFlagSrc && (
                    <span className="shrink-0 w-6 h-6 relative rounded overflow-hidden border border-gray-200 dark:border-gray-600">
                      <Image src={currencyFlagSrc} alt="" fill className="object-cover" sizes="24px" />
                    </span>
                  )}
                </div>
                {(ratingShow != null || reviewCount != null) && (
                  <div className="flex-between gap-2">
                    <Star1 size={18} variant="Bold" className="text-warning-500" />
                    {ratingShow != null && <p className="text-gray-500">{ratingShow.toFixed(1)}</p>}
                    {reviewCount != null && <p className="text-sm text-gray-400">({reviewCount.toLocaleString("fa-IR")})</p>}
                  </div>
                )}
              </div>
              <div className="flex-between mt-4 gap-4 md:gap-6 flex-col sm:flex-row">
                <div className="w-full min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm md:text-base flex items-center gap-1">
                      {formatPrice(effectiveSale)}
                      {currencyFlagSrc && (
                        <span className="shrink-0 w-5 h-5 relative rounded overflow-hidden inline-block">
                          <Image src={currencyFlagSrc} alt="" fill className="object-cover" sizes="20px" />
                        </span>
                      )}
                    </p>
                    {discountPercent != null && Number(discountPercent) > 0 && (
                      <div className="bg-primary-400 p-1.5 px-2 rounded-lg text-xs text-white">{Math.round(Number(discountPercent))}%</div>
                    )}
                  </div>
                  {(effectiveList > 0 && effectiveList !== effectiveSale) && (
                    <p className="text-gray-400 text-sm line-through mt-2">{formatPrice(effectiveList)}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">شامل هزینه حمل و گمرک</p>
                </div>
                <Button
                  variant="outline"
                  className="bg-primary-700 dark:bg-dark-primary text-white rounded-lg py-4 md:py-6 w-full sm:w-auto"
                  size="lg"
                  asChild
                >
                  <Link href={productSlug ? `/product/${productSlug}` : "#"}>مشاهده جزئیات</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* دکمه‌های هاور مثل ProductCard */}
      <div
        className="absolute top-3 left-3  flex w-max flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-10"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        role="presentation"
      >
        <TooltipProvider delayDuration={300}>
          <div className="flex flex-col gap-3 p-1 rounded-xl bg-white/95 dark:bg-dark-box/95 backdrop-blur-sm border border-gray-200 dark:border-dark-stroke shadow-lg">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="p-2.5 rounded-lg bg-white dark:bg-dark-field border border-gray-200 dark:border-dark-stroke shadow-sm hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-colors"
                  aria-label="افزودن به سبد"
                >
                  <ShoppingCart size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="border-0 bg-gray-800 dark:bg-gray-700 text-white">
                افزودن به سبد
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="p-2.5 rounded-lg bg-white dark:bg-dark-field border border-gray-200 dark:border-dark-stroke shadow-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                  aria-label="علاقه‌مندی"
                >
                  <Heart size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="border-0 bg-gray-800 dark:bg-gray-700 text-white">
                علاقه‌مندی
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleCompare}
                  className="p-2.5 rounded-lg bg-white dark:bg-dark-field border border-gray-200 dark:border-dark-stroke shadow-sm hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-colors"
                  aria-label="مقایسه"
                >
                  <Layer size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="border-0 bg-gray-800 dark:bg-gray-700 text-white">
                مقایسه
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProductRowCard;
