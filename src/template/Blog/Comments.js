import TitleCard from "@/components/TitleCard";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data";
import { Calendar, Dislike, Like, Like1 } from "iconsax-reactjs";
import React from "react";

function Comments() {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="mr-2 text-[#888A8C] font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <>
      {/* Reviews Section */}
      <section className=" mt-32">
        <TitleCard title={"دیدگاه کاربران"} />
        <p className="text-gray-500 mt-8 ">
          نظر شما میتونه به بقیه کمک کنه تا انتخاب بهتری داشته باشن خوشحال میشیم اگر تجربه تون از این محصول رو با ما به
          اشتراک بذارید
        </p>
        <Button variant="outline" className="border-2 mt-4 border-primary-700 text-primary-700 px-10 rounded-lg mb-6">
          ثبت دیدگاه
        </Button>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 border border-gray-200 p-3 rounded-2xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{review.name}</h4>
                  </div>
                </div>
                <div class="flex-between gap-2 text-gray-400">
                  <Calendar size={16} variant="Bold" />
                  <span className="text-xs  bg-gray-100  rounded">{review.date}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-3 text-right">{review.comment}</p>
              <div class="flex-between w-full">
                {renderStars(review.rating)}

                <div className="flex items-center gap-2 text-[#888A8C]">
                  <div class="">
                    <button className="flex items-center gap-2  hover:text-gray-900 transition-colors">
                      <Dislike size={20} />
                    </button>
                    <p className="text-xs text-center mt-2">4</p>
                  </div>
                  <div class="">
                    <button className="flex items-center gap-2  hover:text-gray-900 transition-colors">
                      <Like1 size={20} />
                    </button>
                    <p className="text-xs text-center mt-2">4</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Comments;
