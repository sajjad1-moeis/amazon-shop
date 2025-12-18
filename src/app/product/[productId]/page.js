"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, Share2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { productService } from "@/services/product/productService";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailPage({ params }) {
  const productId = params?.productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("express");
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchRelatedProducts();
      trackView();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getById(productId);
      if (response.success && response.data) {
        setProduct(response.data);
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0].id || response.data.colors[0].value);
        }
      } else {
        toast.error(response.message || "خطا در دریافت محصول");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت محصول");
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await productService.getRelated(productId, 4);
      if (response.success && response.data) {
        setRelatedProducts(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const trackView = async () => {
    try {
      await productService.trackView(productId);
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!productId) {
      toast.error("شناسه محصول یافت نشد");
      return;
    }

    try {
      setAddingToCart(true);
      await shoppingCartService.addItem({
        productId,
        quantity: 1,
      });
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">محصول یافت نشد</p>
          <Link href="/products">
            <Button>بازگشت به لیست محصولات</Button>
          </Link>
        </div>
      </div>
    );
  }

  const productImages =
    product.images && product.images.length > 0 ? product.images : [product.mainImage].filter(Boolean);
  const colors = product.colors || [];
  const deliveryOptions = [
    { id: "express", label: "ارسال اکسپرس", days: "۲۰ روز کاری" },
    { id: "standard", label: "ارسال عادی", days: "۳۰ روز کاری" },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              خانه
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
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
          <div className="col-span-12 lg:col-span-3 order-1 lg:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
              <div className="flex justify-start mb-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

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
                          : "border-gray-200 dark:border-gray-700"
                      )}
                    >
                      <Image src={img} alt={`${product.name} - تصویر ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                  {productImages.length > 4 && (
                    <button className="w-full aspect-square rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-600 text-2xl">+{productImages.length - 4}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 order-2 lg:order-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-right">
                {product.name || product.title}
              </h1>
              {product.englishName && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-right">{product.englishName}</p>
              )}

              {product.rating && (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating.toFixed(1)}</span>
                    {product.reviewCount && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      خلاصه نظرات
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      مقایسه کالا
                    </Button>
                  </div>
                </div>
              )}

              {colors.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-bold text-gray-900 dark:text-white mb-3 block text-right">رنگ</label>
                  <div className="flex gap-3 justify-end">
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

              {product.shortDescription && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 text-right">معرفی کوتاه</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed text-right">
                    {product.shortDescription}
                  </p>
                </div>
              )}

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

          <div className="col-span-12 lg:col-span-3 order-3 lg:order-3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-right">نوع ارسال</h3>
              <div className="space-y-2">
                {deliveryOptions.map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={selectedDelivery === option.id}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-500"
                    />
                    <div className="flex-1 flex justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{option.label}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{option.days}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
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
            </div>

            {product.brandName && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 text-right">برند</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-right">{product.brandName}</div>
              </div>
            )}

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

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 text-right">
                <span className="mt-0.5">ℹ️</span>
                <span>شامل هزینه حمل و گمرک</span>
              </div>
            </div>
          </div>
        </div>

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
  );
}
