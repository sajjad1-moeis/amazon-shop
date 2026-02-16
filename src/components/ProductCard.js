 "use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { productService } from "@/services/product/productService";

function ProductCard({ className, product, badges }) {
  const router = useRouter();

  const productId = product?.id ?? product?.productId ?? null;
  const image = product?.image_url || product?.image || product?.mainImage || "/image/Home/product.png";
  const title =
    product?.title || product?.name || "نام محصول";
  // قیمت نمایشی (مبلغ پرداختی) و قیمت اصلی (برای خط خورده)
  const salePriceRaw = product?.current_price ?? product?.discountPrice ?? product?.price;
  const listPriceRaw = product?.original_price ?? product?.price ?? product?.discountPrice;
  const salePrice = Math.max(0, Number(salePriceRaw) || 0);
  const listPrice = Math.max(0, Number(listPriceRaw) || salePrice || 0);
  const price = listPrice;
  const discountPrice = salePrice;

  const ratingNum = Number(product?.rating);
  const rating = Number.isFinite(ratingNum) && ratingNum >= 0 ? Math.min(5, ratingNum) : 0;
  const reviewCountNum = Number(product?.reviews_count ?? product?.reviewCount);
  const reviewCount = Number.isInteger(reviewCountNum) && reviewCountNum >= 0 ? reviewCountNum : 0;
  const rawBadges = badges !== undefined ? badges : product?.badges;
  const productBadges = Array.isArray(rawBadges)
    ? rawBadges.filter((b) => typeof b === "string").slice(0, 5)
    : ["ارسال بین المللی"];
  const seller = product?.seller || "amazon";
  const sellerCountry = product?.sellerCountry || "🇦🇪";

  const calculateDiscount = () => {
    if (!Number.isFinite(listPrice) || !Number.isFinite(salePrice) || listPrice <= 0) return 0;
    if (salePrice >= listPrice) return 0;
    return Math.min(99, Math.round(((listPrice - salePrice) / listPrice) * 100));
  };

  const discount = calculateDiscount();

  const formatPrice = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0) return "قیمت نامشخص";
    return `${n.toLocaleString("fa-IR")} تومان`;
  };

  const handleProductClick = async (e) => {
    e.preventDefault();

    try {
      // ساخت payload سازگار با ScraperProductDto (snake_case)
      const rawCurrentPrice =
        product?.current_price ?? product?.price ?? product?.discountPrice ?? discountPrice ?? price;
      const rawOriginalPrice =
        product?.original_price ?? product?.originalPrice ?? product?.price ?? price ?? null;

      const scraperPayload = {
        asin: product?.asin || product?.ASIN || product?.amazonASIN || product?.amazonAsin,
        title: product?.title || product?.name,
        brand: product?.brand,
        current_price: rawCurrentPrice != null ? String(rawCurrentPrice) : null,
        original_price: rawOriginalPrice != null ? String(rawOriginalPrice) : null,
        image_url:
          product?.image_url ||
          product?.image ||
          product?.mainImage ||
          product?.imageUrl ||
          "/image/Home/product.png",
        image_url_hq: product?.image_url_hq || product?.image_url || product?.image || product?.mainImage,
        product_url: product?.product_url || product?.amazonUrl,
        rating: product?.rating,
        reviews_count: product?.reviews_count ?? product?.reviewCount,
        category: product?.category,
        search_term: product?.search_term,
      };

      if (!scraperPayload.asin) {
        const fallbackId = productId ?? product?.asin ?? "0";
        router.push(`/product/${fallbackId}`);
        return;
      }

      const response = await productService.saveIfNotExistsFromScraper(scraperPayload);

      const savedProductId =
        response?.data?.productId ??
        response?.data?.id ??
        response?.data?.productID ??
        response?.data?.ProductId;

      if (response?.success && savedProductId != null) {
        router.push(`/product/${savedProductId}`);
      } else {
        const fallbackId = productId ?? product?.asin ?? "0";
        router.push(`/product/${fallbackId}`);
      }
    } catch (error) {
      console.error("Error saving product before navigation:", error);
      const fallbackId = productId ?? product?.asin ?? "0";
      router.push(`/product/${fallbackId}`);
    }
  };

  const hrefId = productId ?? product?.asin ?? "0";

  return (
    <Link href={`/product/${hrefId}`} onClick={handleProductClick}>
      <div
        className={cn(
          "shadow-box rounded-xl flex flex-col cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-dark-box h-full",
          className || "border-gray-200 dark:border-dark-stroke border"
        )}
        style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
      >
        {/* Product Image */}
        <div className="relative aspect-square flex-shrink-0">
          <Image src={image} alt={title} fill className="object-cover rounded-t-xl" />

          {/* Badges - Top of Image */}
          {productBadges && productBadges.length > 0 && (
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start gap-2 z-10">
              <div className="flex flex-wrap gap-1.5">
                {productBadges.map((badge, index) => (
                  <span
                    key={index}
                    className={cn(
                      "text-xs  px-2 py-1 rounded text-white whitespace-nowrap",
                      badge === "انتخاب آمازون"
                        ? "bg-green-600 dark:bg-green-700"
                        : badge === "پرفروش ترین"
                        ? "bg-orange-500 dark:bg-orange-600"
                        : "bg-primary-600 dark:bg-primary-700"
                    )}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 lg:p-4 dark:text-dark-titre flex flex-col gap-2.5 flex-grow">
          {/* Product Name */}
          <p className="font-medium text-right leading-6 max-lg:text-sm text-gray-900 dark:text-dark-titre line-clamp-2 ">
            {title}
          </p>

          {/* Rating and Seller */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">
                {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
              </span>
              <span className="text-xs text-gray-500 dark:text-dark-text">({reviewCount})</span>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-1">
              <span className="text-orange-500 font-bold text-base leading-none">a</span>
              <span className="text-base leading-none">{sellerCountry}</span>
            </div>
          </div>

          {/* Price Section - این قسمت با flex-grow به پایین می‌رود */}
          <div className="flex flex-col gap-1.5 mt-auto">
            <div className="flex-between">
              <div className="flex items-center gap-2">
                <span className="font-bold dark:text-dark-titre text-gray-900 max-lg:text-sm text-base">
                  {formatPrice(discountPrice || price)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded">{discount}%</span>
                </div>
              )}
            </div>

            <div className="flex-between">
              {discount > 0 && price > discountPrice && (
                <span className="text-xs md:text-sm text-gray-400 dark:text-[#B3B9C466] line-through max-md:hidden">
                  {formatPrice(price)}
                </span>
              )}
              <p className="text-xs text-gray-400 dark:text-[#B3B9C466] text-right mt-1">شامل هزینه حمل و گمرک</p>
            </div>
          </div>

          {/* Shipping Info */}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
