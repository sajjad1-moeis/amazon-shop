"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RenderStars from "@/components/RenderStars";
import { Calendar2, MessageText1, Star } from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { productReviewService } from "@/services/review/productReviewService";
import { unwrapApiData } from "@/services/api/client";

export default function ProductReviewsSection({ product }) {
  const productId = product?.id ?? product?.productId ?? product?.asin;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [productReviews, setProductReviews] = useState(Array.isArray(product?.reviews) ? product.reviews : []);
  const [totalReviews, setTotalReviews] = useState(
    Math.max(0, Math.floor(Number(product?.reviews_count ?? product?.reviewCount ?? 0) || 0))
  );
  const [overallRating, setOverallRating] = useState(
    Math.min(5, Math.max(0, Number(product?.rating ?? 0) || 0))
  );

  useEffect(() => {
    if (!productId) return;
    productReviewService.getApprovedByProductId(productId).then((res) => {
      const data = unwrapApiData(res);
      if (Array.isArray(data) && data.length > 0) setProductReviews(data);
    }).catch(() => {});
    productReviewService.getReviewCountByProductId(productId).then((res) => {
      const data = unwrapApiData(res);
      if (typeof data === "number" && data > 0) setTotalReviews(data);
    }).catch(() => {});
  }, [productId]);

  // Sync with scraper data arriving asynchronously via product prop
  const scraperReviews = product?.reviews;
  const scraperReviewsCount = product?.reviews_count ?? product?.reviewCount;
  const scraperRating = product?.rating;

  useEffect(() => {
    if (Array.isArray(scraperReviews) && scraperReviews.length > 0) {
      setProductReviews((prev) => (prev.length === 0 ? scraperReviews : prev));
    }
  }, [scraperReviews]);

  useEffect(() => {
    const count = Math.max(0, Math.floor(Number(scraperReviewsCount) || 0));
    if (count > 0) {
      setTotalReviews((prev) => (prev === 0 ? count : Math.max(prev, count)));
    }
  }, [scraperReviewsCount]);

  useEffect(() => {
    const r = Math.min(5, Math.max(0, Number(scraperRating) || 0));
    if (r > 0) {
      setOverallRating((prev) => (prev === 0 ? r : prev));
    }
  }, [scraperRating]);

  const hasRealCount = totalReviews > 0;

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      toast.error("لطفا متن نظر را وارد کنید");
      return;
    }
    if (!productId) return;
    try {
      setSubmitting(true);
      await productReviewService.create({
        productId: Number(productId) || productId,
        authorName: "کاربر",
        content: reviewText.trim(),
        rating: reviewRating,
      });
      toast.success("نظر شما با موفقیت ثبت شد و پس از تأیید نمایش داده می‌شود");
      setReviewText("");
      setReviewRating(5);
      setShowReviewForm(false);
      const countRes = await productReviewService.getReviewCountByProductId(productId);
      const count = unwrapApiData(countRes);
      setTotalReviews(typeof count === "number" ? count : totalReviews + 1);
    } catch (e) {
      toast.error(e?.message ?? "خطا در ثبت نظر");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="product-reviews"
      className="w-full mt-20 bg-transparent md:bg-white dark:bg-transparent rounded-2xl md:shadow-box md:border border-gray-200 dark:border-dark-stroke md:p-6 lg:p-8"
    >
      {/* Header */}
      <h2 className="text-xl md:text-2xl text-gray-800 dark:text-dark-titre text-right">امتیاز و نظرات کاربران دیگر</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Right Column - Overall Rating and Call to Action */}
        <div className="lg:col-span-1 space-y-6">
          {/* Overall Rating Box */}
          <div className="bg-primary-50 dark:bg-dark-box rounded-2xl p-6">
            <div className="text-center">
              {/* Rating Number */}
              <div className="text-5xl md:text-6xl font-bold text-primary-700 dark:text-dark-titre mb-3">
                {overallRating > 0 ? overallRating.toFixed(1) : "۰"}
              </div>
              <div className="flex justify-center mb-3">
                <RenderStars rating={overallRating} />
              </div>

              {/* Review Count */}
              <div className="flex items-center justify-center gap-1.5 text-gray-400 dark:text-dark-text">
                <MessageText1 variant="Bold" size={16} className="dark:text-dark-text" />
                <span className="text-sm font-medium dark:text-dark-text">
                  {totalReviews > 0 ? totalReviews.toLocaleString("fa-IR") : "۰"}
                </span>
                <span className="text-xs dark:text-dark-text">نظر</span>
              </div>
            </div>
          </div>

          {/* Call to Action Text */}
          <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text leading-relaxed text-right mt-8 mb-6">
            نظر شما میتونه به بقیه کمک کنه تا انتخاب بهتری داشته باشن خوشحال میشیم اگر تجربه تون از این محصول رو با ما
            به اشتراک بذارید!
          </p>

          {/* Submit Comment Button */}
          <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-2 border-primary-700 text-primary-700 dark:border-dark-stroke dark:text-dark-titre hover:bg-primary-50 dark:hover:bg-dark-field font-semibold rounded-lg bg-white dark:bg-dark-box"
              >
                ثبت دیدگاه
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-dark-box dark:border-dark-stroke">
              <DialogHeader>
                <DialogTitle className="dark:text-dark-titre">ثبت دیدگاه</DialogTitle>
                <DialogDescription className="dark:text-dark-text">
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="dark:text-dark-titre">امتیاز</Label>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => setReviewRating(star)} className="text-2xl" type="button">
                            <Star
                              className={cn(
                                "w-6 h-6",
                                star <= reviewRating
                                  ? "fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500"
                                  : "text-gray-300 dark:text-dark-stroke"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review-text" className="dark:text-dark-titre">
                        نظر شما
                      </Label>
                      <Textarea
                        id="review-text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="نظر خود را بنویسید..."
                        className="mt-2 dark:bg-dark-field dark:border-dark-stroke dark:text-dark-titre dark:placeholder:text-dark-text"
                        rows={5}
                      />
                    </div>
                    <Button
                      onClick={handleSubmitReview}
                      disabled={submitting}
                      className="w-full dark:bg-primary-700 dark:text-white dark:hover:bg-primary-600"
                    >
                      {submitting ? "در حال ثبت..." : "ثبت نظر"}
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {/* Left Column - Individual Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {productReviews.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-dark-text text-right mb-2">
              نمونه نظرات از آمازون
            </p>
          )}
          {productReviews.length === 0 && !hasRealCount && (
            <p className="text-sm text-gray-500 dark:text-dark-text text-right mb-4">
              هنوز نظری برای این محصول ثبت نشده. اولین نفری باشید که نظر می‌دهد.
            </p>
          )}
          {productReviews.length === 0 && hasRealCount && totalReviews > 0 && (
            <p className="text-xs text-gray-500 dark:text-dark-text text-right">
              امتیاز و تعداد نظر از آمازون است. نظرات به‌زودی بارگذاری می‌شوند.
            </p>
          )}
          {productReviews.map((review, index) => {
            const name = review.name ?? review.author ?? review.authorName ?? review.reviewerName ?? "کاربر";
            const title = review.title ?? "";
            const text = review.comment ?? review.text ?? review.body ?? review.content ?? "";
            const ratingVal = Number(review.rating ?? review.stars ?? 0) || 0;
            const date = review.date ?? review.createdAt ?? "";
            const likes = review.likes ?? 0;
            const dislikes = review.dislikes ?? 0;
            return (
              <article
                key={review.id ?? index}
                className={cn(
                  "rounded-xl border border-gray-200 dark:border-dark-stroke bg-white dark:bg-dark-box p-4 md:p-5 text-right",
                  index < productReviews.length - 1 && "mb-4"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-dark-titre">{name}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-dark-text">
                    <Calendar2 variant="Bold" className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{date}</span>
                  </div>
                </div>
                {title ? (
                  <p className="text-sm font-medium text-gray-800 dark:text-dark-titre mb-2">
                    {title}
                  </p>
                ) : null}
                <p className="text-sm md:text-base text-gray-600 dark:text-dark-text leading-relaxed mb-4 whitespace-pre-line">
                  {text}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-100 dark:border-dark-stroke">
                  <div className="flex items-center gap-2">
                    <RenderStars rating={ratingVal} />
                    <span className="text-sm text-gray-500 dark:text-dark-text">{ratingVal ? ratingVal.toFixed(1) : ""}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-dark-text">
                    <span className="flex items-center gap-1">
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm">{dislikes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{likes}</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
