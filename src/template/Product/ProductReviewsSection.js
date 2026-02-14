"use client"

import { Calendar, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RenderStars from "@/components/RenderStars";
import { Calendar2, MessageText, MessageText1, Star } from "iconsax-reactjs";
import { useState } from "react";
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

const reviews = [
  {
    id: 1,
    name: "محمد",
    date: "۲۴ اسفند",
    comment:
      "من این محصولو چند وقت پیش گرفتم و تا الان استفاده کردم از خیلی جهات خوب بود، مثلا کیفیتش بدک نبود و کارمو راه انداخت بسته بندی هم مرتب بود و به موقع به دستم رسید.",
    rating: 4.5,
    likes: 12,
    dislikes: 0,
  },
  {
    id: 2,
    name: "سمیرا",
    date: "۲۴ اسفند",
    comment:
      "من این محصولو چند وقت پیش گرفتم و تا الان استفاده کردم از خیلی جهات خوب بود، مثلا کیفیتش بدک نبود و کارمو راه انداخت بسته بندی هم مرتب بود و به موقع به دستم رسید.",
    rating: 4.5,
    likes: 8,
    dislikes: 1,
  },
  {
    id: 3,
    name: "مریم کشمیری",
    date: "۲۳ اسفند",
    comment:
      "من این محصولو چند وقت پیش گرفتم و تا الان استفاده کردم از خیلی جهات خوب بود، مثلا کیفیتش بدک نبود و کارمو راه انداخت بسته بندی هم مرتب بود و به موقع به دستم رسید.",
    rating: 4.5,
    likes: 15,
    dislikes: 2,
  },
];

const overallRating = 4.5;
const totalReviews = 24;

export default function ProductReviewsSection() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      toast.error("لطفا متن نظر را وارد کنید");
      return;
    }

    try {
      setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("نظر شما با موفقیت ثبت شد");
      setReviewText("");
      setReviewRating(5);
      setShowReviewForm(false);
    } catch {
      toast.error("خطا در ثبت نظر");
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
                {overallRating}
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-3">
                <RenderStars rating={overallRating} />
              </div>

              {/* Review Count */}
              <div className="flex items-center justify-center gap-1.5 text-gray-400 dark:text-dark-text">
                <MessageText1 variant="Bold" size={16} className="dark:text-dark-text" />
                <span className="text-sm font-medium dark:text-dark-text">{totalReviews}</span>
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
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={cn("pb-6", index < reviews.length - 1 && "border-b border-gray-200 dark:border-dark-stroke")}
            >
              {/* Review Header */}
              <div className="flex items-center justify-between mb-3">
                {/* Reviewer Name */}
                <h3 className="text-base md:text-lg text-gray-900 dark:text-dark-titre">{review.name}</h3>

                {/* Date with Calendar Icon */}
                <div className="flex items-center gap-1.5 text-gray-400 dark:text-dark-text">
                  <Calendar2 variant="Bold" className="w-4 h-4" />
                  <span className="text-sm">{review.date}</span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-gray-500 dark:text-dark-text leading-relaxed mb-4 text-right">
                {review.comment}
              </p>

              {/* Review Rating and Feedback */}
              <div className="flex-between gap-4">
                {/* Rating and Stars */}
                <div className="flex items-center gap-2">
                  <RenderStars rating={review.rating} />
                  <span className="text-sm text-gray-500 dark:text-dark-text">{review.rating}</span>
                </div>

                {/* Like/Dislike */}
                <div className="flex items-center gap-3 text-gray-500 dark:text-dark-text hover:text-gray-700 dark:hover:text-dark-titre transition-colors">
                  <button onClick={() => toast.info("نپسندیدم")} type="button">
                    <ThumbsDown className="w-4 h-4" />
                    {<span className="text-sm">{review.dislikes}</span>}
                  </button>
                  <button onClick={() => toast.success("پسندیدم")} type="button">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{review.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
