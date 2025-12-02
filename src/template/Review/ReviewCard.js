"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Heart, Like, Like1 } from "iconsax-reactjs";

export default function ReviewCard({ experience, onClick }) {
  return (
    <article
      onClick={onClick}
      className="rounded-lg border relative border-gray-200 bg-white shadow-sm transition hover:shadow-lg cursor-pointer"
    >
      <div class="absolute top-2 z-50 right-2 text-gray-600 md:hidden">
        <Heart size={26} />
      </div>
      {/* Image */}
      <div className="relative w-full aspect-square rounded-md overflow-hidden">
        <Image src="/image/Home/product.png" alt={experience.title} fill className="object-cover" />
      </div>

      {/* Text */}
      <div className="space-y-3 px-2 md:px-5 py-4">
        <div>
          <h3 className="text-sm md:text-base font-semibold text-neutral-800">{experience.title}</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-1">{experience.description}</p>
        </div>

        {/* Rating + Likes */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Star className="size-5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{experience.rating}</span>
            <span className="text-gray-400">({experience.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1">
            <Like1 className="size-5 text-gray-400" variant="Bold" />
            <span className="text-gray-500 text-xs">{experience.likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
