import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

function ProductCard({ className, product, badges }) {
  const productId = product?.id || product?.productId || 1;
  const image = product?.image || product?.mainImage || "/image/Home/product.png";
  const title = product?.name || product?.title || "ساعت مچی مردانه Invicta مدل ۳۶۱ سری Reserve کرونوگراف";
  const price = product?.price || 15370000;
  const discountPrice = product?.discountPrice || 12450000;
  const rating = product?.rating || 4.7;
  const reviewCount = product?.reviewCount || product?.reviewsCount || 235;
  // اول badges prop را چک می‌کنیم، بعد product.badges، و در نهایت مقدار پیش‌فرض
  const productBadges = badges !== undefined ? badges : product?.badges || ["ارسال بین المللی"];
  const seller = product?.seller || "amazon";
  const sellerCountry = product?.sellerCountry || "🇦🇪";

  const calculateDiscount = () => {
    if (discountPrice && price && discountPrice < price) {
      const discount = ((price - discountPrice) / price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const discount = calculateDiscount();

  const formatPrice = (price) => {
    if (!price && price !== 0) return "قیمت نامشخص";
    return `${Number(price).toLocaleString("fa-IR")} تومان`;
  };

  return (
    <Link href={`/product/${productId}`}>
      <div
        className={cn(
          "shadow-box rounded-xl flex flex-col cursor-pointer hover:shadow-lg transition-shadow bg-white  dark:bg-dark-box ",
          className || "border-gray-200 dark:border-dark-stroke border"
        )}
        style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
      >
        {/* Product Image */}
        <div className="relative aspect-square">
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
        <div className="p-3 lg:p-4 dark:text-dark-titre flex flex-col gap-2.5">
          {/* Product Name */}
          <p className="font-medium text-right leading-6 max-lg:text-sm text-gray-900 dark:text-dark-titre line-clamp-2 ">
            {title}
          </p>

          {/* Rating and Seller */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 dark:text-dark-text">({reviewCount})</span>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-1">
              <span className="text-orange-500 font-bold text-base leading-none">a</span>
              <span className="text-base leading-none">{sellerCountry}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex flex-col gap-1.5">
            <div className="flex-between">
              <div className="flex items-center gap-2">
                <span className="dark:text-dark-titre text-gray-900 max-lg:text-sm max-md:text-xs text-base">
                  {formatPrice(discountPrice || price)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="bg-orange-600 text-white text-xs px-1 md:px-2 py-0.5 rounded">{discount}%</span>
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
