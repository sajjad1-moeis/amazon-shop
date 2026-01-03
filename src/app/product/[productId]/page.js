"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, Share2, ChevronLeft, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { productService } from "@/services/product/productService";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import Image from "next/image";
import IndexLayout from "@/layout/IndexLayout";

export default function ProductDetailPage({ params }) {
  const productId = params?.productId;
  
  // داده‌های تستی
  const mockProduct = {
    id: productId || "1",
    name: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری REC کرونوگراف حرفه ای و لوکس",
    title: "ساعت مچی مردانه Invicta مدل ۰۳۶۱ سری REC کرونوگراف حرفه ای و لوکس",
    englishName: "Invicta Men's Watch, Model 0361, Reserve Series - Professional and Luxury Chronograph",
    price: 15370000,
    discountPrice: 12450000,
    mainImage: "/image/Home/product.png",
    images: [
      "/image/Home/product.png",
      "/image/Home/product.png",
      "/image/Home/product.png",
      "/image/Home/product.png",
      "/image/Home/product.png",
    ],
    rating: 4.7,
    reviewCount: 235,
    inStock: true,
    categoryName: "ساعت هوشمند",
    categoryId: "1",
    parentCategoryName: "کالای دیجیتال",
    brandName: "Invicta",
    shortDescription: "طراحی چشم گیر با موتور سوئیسی و بدنه استیل مقاوم مناسب برای استایل رسمی و اسپرت با دقت بالا و عملکرد کرونوگراف چند حالته.",
    description: "<p>ساعت مچی مردانه Invicta با طراحی لوکس و حرفه‌ای. این ساعت دارای موتور سوئیسی با دقت بالا و بدنه استیل مقاوم است که مناسب برای استایل رسمی و اسپرت می‌باشد.</p>",
    colors: [
      { id: "1", value: "white", label: "سفید", name: "سفید" },
      { id: "2", value: "gold", label: "طلایی", name: "طلایی" },
      { id: "3", value: "navy", label: "سرمه ای", name: "سرمه ای" },
    ],
    attributes: [
      { name: "رنگ", key: "color", value: "سرمه ای", label: "سرمه ای" },
      { name: "نوع موتور", key: "movement", value: "سوئیسی", label: "سوئیسی" },
      { name: "جنس بدنه", key: "material", value: "استیل", label: "استیل" },
    ],
    badges: ["پرفروش ترین", "ارسال بین المللی"],
    seller: "امازون امارات",
    sellerLogo: "/image/Header/paypal.png",
    amazonLink: "https://amazon.ae",
  };

  const mockRelatedProducts = [
    {
      id: "2",
      name: "ساعت هوشمند سامسونگ",
      title: "ساعت هوشمند سامسونگ",
      price: 8000000,
      discountPrice: 7500000,
      mainImage: "/image/Home/product.png",
    },
    {
      id: "3",
      name: "ساعت اپل واچ",
      title: "ساعت اپل واچ",
      price: 12000000,
      discountPrice: 11000000,
      mainImage: "/image/Home/product.png",
    },
    {
      id: "4",
      name: "ساعت هوشمند شیائومی",
      title: "ساعت هوشمند شیائومی",
      price: 5000000,
      discountPrice: 4500000,
      mainImage: "/image/Home/product.png",
    },
    {
      id: "5",
      name: "ساعت هوشمند هواوی",
      title: "ساعت هوشمند هواوی",
      price: 6000000,
      discountPrice: 5500000,
      mainImage: "/image/Home/product.png",
    },
  ];

  const [product] = useState(mockProduct);
  const [loading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("3"); // سرمه ای
  const [selectedDelivery, setSelectedDelivery] = useState("express");
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [relatedProducts] = useState(mockRelatedProducts);

  const handleAddToCart = async () => {
    if (!productId) {
      toast.error("شناسه محصول یافت نشد");
      return;
    }

    try {
      setAddingToCart(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("محصول به سبد خرید اضافه شد");
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد خرید");
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <IndexLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </IndexLayout>
    );
  }

  if (!product) {
    return (
      <IndexLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">محصول یافت نشد</p>
            <Link href="/products">
              <Button>بازگشت به لیست محصولات</Button>
            </Link>
          </div>
        </div>
      </IndexLayout>
    );
  }

  const productImages =
    product.images && product.images.length > 0 ? product.images : [product.mainImage].filter(Boolean);
  const colors = product.colors || [];
  const deliveryOptions = [
    { id: "express", label: "ارسال اکسپرس", days: "۲۰ روز کاری", icon: "🚀" },
    { id: "standard", label: "ارسال عادی", days: "۳۰ روز کاری", icon: "📦" },
  ];

  const formatPrice = (price) => {
    if (!price && price !== 0) return "قیمت نامشخص";
    return `${Number(price).toLocaleString("fa-IR")} تومان`;
  };

  const calculateDiscount = () => {
    if (product.discountPrice && product.price) {
      const discount = ((product.price - product.discountPrice) / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <IndexLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                خانه
              </Link>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
              {product.parentCategoryName && (
                <>
                  <Link
                    href={`/categories?category=${product.categoryId}`}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {product.parentCategoryName}
                  </Link>
                  <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </>
              )}
              {product.categoryName && (
                <>
                  <Link
                    href={`/categories?category=${product.categoryId}`}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {product.categoryName}
                  </Link>
                  <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </>
              )}
              <span className="text-gray-900 dark:text-white font-medium">{product.name || product.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Right Side: Product Images */}
            <div className="col-span-12 lg:col-span-4 order-1 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
                {/* Share Button */}
                <div className="flex justify-start mb-4">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Main Image */}
                <div className="mb-4">
                  <div className="aspect-square bg-white dark:bg-black rounded-lg flex items-center justify-center overflow-hidden shadow-sm relative">
                    {productImages[selectedImage] ? (
                      <Image
                        src={productImages[selectedImage]}
                        alt={product.name || product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-6xl font-bold text-orange-500 mb-2">a</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{product.name || product.title}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {productImages.length > 1 && (
                  <div className="space-y-2">
                    {productImages.slice(0, 4).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "w-full aspect-square rounded-lg overflow-hidden border-2 transition-colors bg-white dark:bg-gray-900 relative",
                          selectedImage === index
                            ? "border-blue-500 dark:border-blue-400"
                            : "border-gray-200 dark:border-gray-700 opacity-50 hover:opacity-100"
                        )}
                      >
                        <Image src={img} alt={`${product.name} - تصویر ${index + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                    {productImages.length > 4 && (
                      <button className="w-full aspect-square rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center opacity-50">
                        <span className="text-gray-400 dark:text-gray-600 text-2xl">+{productImages.length - 4}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Center: Product Information */}
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-2 space-y-6">
              {/* Product Title Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white text-right flex-1">
                        {product.name || product.title}
                      </h1>
                    </div>
                    {product.englishName && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-right">{product.englishName}</p>
                    )}
                    <Link href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline text-right block">
                      ویرایش عنوان
                    </Link>
                  </div>
                </div>

                {/* Badges */}
                {product.badges && product.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={cn(
                          "text-xs font-bold px-3 py-1 rounded-full",
                          index === 0
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        )}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Rating and Actions */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating.toFixed(1)}</span>
                      {product.reviewCount && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
                      )}
                    </div>
                    <Link href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      خلاصه نظرات
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      مقایسه کالا
                    </Button>
                    {product.amazonLink && (
                      <Link
                        href={product.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>مشاهده در آمازون</span>
                        <div className="text-orange-500 font-bold text-lg">a</div>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Color Selection */}
                {colors.length > 0 && (
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-900 dark:text-white mb-3 block text-right">
                      رنگ
                    </label>
                    <div className="flex gap-4 justify-end">
                      {colors.map((color) => (
                        <label key={color.id || color.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value={color.id || color.value}
                            checked={selectedColor === (color.id || color.value)}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-4 h-4 text-blue-600 dark:text-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{color.label || color.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Short Description */}
                {product.shortDescription && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 text-right">معرفی کوتاه</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed text-right">
                      {product.shortDescription}
                    </p>
                  </div>
                )}

                {/* Attributes */}
                {product.attributes && product.attributes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-right">ویژگی ها</h3>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          {product.attributes.map((attr, index) => (
                            <tr
                              key={index}
                              className={
                                index < product.attributes.length - 1
                                  ? "border-b border-gray-200 dark:border-gray-700"
                                  : ""
                              }
                            >
                              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 w-1/3 text-right">
                                {attr.name || attr.key}
                              </td>
                              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-right">
                                {attr.value || attr.label}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Description */}
              {product.description && (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-right">توضیحات کامل</h3>
                  <div
                    className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-right"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}
            </div>

            {/* Left Sidebar: Pricing and Purchase */}
            <div className="col-span-12 lg:col-span-3 order-3 lg:order-3 space-y-4">
              {/* Shipping Options */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-right">نوع ارسال</h3>
                <div className="space-y-3">
                  {deliveryOptions.map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        "flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 transition-colors",
                        selectedDelivery === option.id
                          ? "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      )}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedDelivery === option.id}
                        onChange={(e) => setSelectedDelivery(e.target.value)}
                        className="w-4 h-4 text-blue-600 dark:text-blue-500"
                      />
                      <div className="flex-1 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{option.icon}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{option.label}</span>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{option.days}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">قیمت :</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.discountPrice || product.price)}
                  </span>
                </div>
                {product.discountPrice && product.price && product.discountPrice < product.price && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded">
                      {calculateDiscount()}٪
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                )}
                <Link href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline block text-right">
                  جزئیات محاسبه قیمت
                </Link>
              </div>

              {/* Seller Information */}
              {product.seller && (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">فروشگاه :</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sellerLogo && (
                      <Image
                        src={product.sellerLogo}
                        alt={product.seller}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{product.seller}</span>
                    <span className="text-lg">🇦🇪</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold rounded-lg"
                  onClick={handleAddToCart}
                  disabled={addingToCart || !product.inStock}
                >
                  {addingToCart ? "در حال افزودن..." : product.inStock ? "افزودن به سبد خرید" : "ناموجود"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg"
                >
                  افزودن به علاقه مندی ها
                </Button>
              </div>

              {/* Additional Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 text-right mb-3">
                  <span className="mt-0.5">ℹ️</span>
                  <span>شامل هزینه حمل و گمرک</span>
                </div>
                <Link href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline block text-right">
                  فرایند قیمت گذاری محصولات
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-right">محصولات مرتبط</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/product/${related.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
                      {related.mainImage && (
                        <div className="aspect-square relative mb-3">
                          <Image src={related.mainImage} alt={related.name} fill className="object-cover rounded-lg" />
                        </div>
                      )}
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {related.name || related.title}
                      </h3>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatPrice(related.discountPrice || related.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </IndexLayout>
  );
}
