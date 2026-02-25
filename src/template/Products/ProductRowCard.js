import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseProductNum } from "@/utils/productHelpers";
import { ShieldTick, Star1, TickSquare, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductRowCard({ product }) {
  const image =
    product?.mainImageUrl ||
    product?.mainImage ||
    product?.image_url_hq ||
    product?.image_url ||
    product?.image ||
    "/image/Home/product.png";

  const title = product?.title || product?.name || "ساعت مچی مردانه Invicta مدل 0361 سری Reserve کرونوگراف";

  const shortDesc =
    product?.shortDescription ||
    (product?.description ? String(product.description).slice(0, 100) + "…" : null) ||
    "ساعت مچی مردانه Invicta مدل 3641 از سری Reserve. ترکیبی از قدرت، دقت، و طراحی خاص.";

  const listPrice = parseProductNum(product?.price ?? product?.original_price) || 12450000;

  const salePrice =
    parseProductNum(product?.finalPrice ?? product?.discountPrice ?? product?.current_price) || listPrice;

  const discountPercent =
    product?.discountPercentage ??
    (listPrice > 0 && salePrice < listPrice
      ? Math.min(99, Math.round(((listPrice - salePrice) / listPrice) * 100))
      : 19);

  const rating = parseProductNum(product?.rating);
  const ratingShow = Number.isFinite(rating) && rating >= 0 ? Math.min(5, rating) : 4.7;

  const reviewCount = Math.max(0, Math.floor(parseProductNum(product?.reviewCount ?? product?.reviews_count) || 0));

  const formatPrice = (n) => (Number.isFinite(n) && n >= 0 ? `${n.toLocaleString("fa-IR")} تومان` : "—");
  const productSlug = product?.id ?? product?.asin ?? product?.amazonASIN ?? "";
  return (
    <Card className="rounded-xl border overflow-hidden border-gray-200 dark:border-dark-field  dark:bg-dark-box shadow-sm hover:shadow-md transition p-0">
      <div className="p-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative aspect-square max-h-48 md:max-h-64 w-full max-w-[200px] md:max-w-none mx-auto md:mx-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 50vw, 240px"
          />
        </div>

        {/* LEFT SECTION (INFO) */}
        <div className="md:col-span-3">
          <div className="flex flex-col gap-3 border-b pb-4 mb-4 border-gray-200 ">
            {/* TITLE */}
            <h2 className="font-bold text-lg  text-neutral-800 dark:text-dark-titre">
              {title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm dark:text-[#7B7F86]">
              {shortDesc}
            </p>

            <div className="flex-between mt-3 flex-wrap gap-x-4 gap-y-2 max-md:hidden">
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
          </div>
          <div>
            {/* PRICE + DISCOUNT */}
            <div className="flex-between">
              <div className="flex-between gap-2">
                🟩
                <Image src="/image/amazonLogo.png" alt={`عکس آمازون`} width={60} height={30} />
              </div>
              <div className="flex-between gap-2">
                <Star1 size={18} variant="Bold" className="text-warning-500" />
                <p className="text-gray-500">{ratingShow} </p>
                <p className="text-sm text-gray-400">({reviewCount.toLocaleString("fa-IR")})</p>
              </div>
            </div>
            <div className="flex-between mt-4 gap-4 md:gap-6 flex-col sm:flex-row">
              <div className="w-full min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm md:text-base">{formatPrice(salePrice)}</p>
                  {discountPercent > 0 && (
                    <div className="bg-primary-400 p-1.5 px-2 rounded-lg text-xs text-white">{discountPercent}%</div>
                  )}
                </div>
                <div className="flex-between gap-2 mt-2">
                  <p className="text-gray-400 text-sm">{formatPrice(listPrice)}</p>
                  <p className="text-gray-400 text-xs">شامل هزینه حمل و گمرک</p>
                </div>
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
  );
}

export default ProductRowCard;
