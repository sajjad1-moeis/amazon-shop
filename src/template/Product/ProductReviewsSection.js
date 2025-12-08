import { Calendar, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RenderStars from "@/components/RenderStars";
import { Calendar2, MessageText, MessageText1 } from "iconsax-reactjs";

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
  return (
    <div
      style={{
        boxShadow: "0px 1px 5px -1px #0000001F",
      }}
      className="w-full mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8"
    >
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white text-right">
        امتیاز و نظرات کاربران دیگر
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Right Column - Overall Rating and Call to Action */}
        <div className="lg:col-span-1 space-y-6">
          {/* Overall Rating Box */}
          <div className="bg-primary-50 dark:bg-indigo-50/30 rounded-2xl p-6">
            <div className="text-center">
              {/* Rating Number */}
              <div className="text-5xl md:text-6xl font-bold text-dark-primary dark:text-blue-500 mb-3">
                {overallRating}
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-3">
                <RenderStars rating={overallRating} />
              </div>

              {/* Review Count */}
              <div className="flex items-center justify-center gap-1.5 text-gray-400 dark:text-gray-500">
                <MessageText1 variant="Bold" size={16} className="  dark:text-gray-500" />
                <span className="text-sm font-medium">{totalReviews}</span>
              </div>
            </div>
          </div>

          {/* Call to Action Text */}
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-right mt-8 mb-6">
            نظر شما میتونه به بقیه کمک کنه تا انتخاب بهتری داشته باشن خوشحال میشیم اگر تجربه تون از این محصول رو با ما
            به اشتراک بذارید!
          </p>

          {/* Submit Comment Button */}
          <Button
            variant="outline"
            className="w-full border-2 border-primary-700 text-primary-700 dark:border-blue-500 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold  rounded-lg bg-white dark:bg-gray-800"
          >
            ثبت دیدگاه
          </Button>
        </div>

        {/* Left Column - Individual Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={cn("pb-6", index < reviews.length - 1 && "border-b border-gray-200 dark:border-gray-700")}
            >
              {/* Review Header */}
              <div className="flex items-center justify-between mb-3">
                {/* Reviewer Name */}
                <h3 className="text-base md:text-lg text-titre  dark:text-white">{review.name}</h3>

                {/* Date with Calendar Icon */}
                <div className="flex items-center gap-1.5 text-[#B8BCC2] dark:text-gray-400">
                  <Calendar2 variant="Bold" className="w-4 h-4" />
                  <span className="text-sm">{review.date}</span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-right">
                {review.comment}
              </p>

              {/* Review Rating and Feedback */}
              <div className="flex-between gap-4">
                {/* Rating and Stars */}
                <div className="flex items-center gap-2">
                  <RenderStars rating={review.rating} />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{review.rating}</span>
                </div>

                {/* Like/Dislike */}
                <div className="flex items-center gap-3 text-caption dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <button>
                    <ThumbsDown className="w-4 h-4" />
                    {<span className="text-sm">{review.dislikes}</span>}
                  </button>
                  <button>
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
