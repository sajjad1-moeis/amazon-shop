"use client";

import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heart, Link, Send2, Share, Whatsapp } from "iconsax-reactjs";
import Comments from "./Comments";
import { SocialCircle } from "@/components/module/Footer";

export default function ReviewsAndShare() {
  const tags = ["آمازون آمریکا", "خرید بین المللی", "میکرولس", "واردات کالا"];

  return (
    <div className="container bg-white dark:bg-transparent px-4 md:p-8" dir="rtl">
      {/* Top Section - Icons and Tags */}
      <div className="bg-gray-100 dark:bg-dark-box p-4 rounded-2xl w-full">
        <div className="flex-between mb-4">
          <h3 className="md:text-2xl text-gray-800  text-right dark:text-dark-titre">برچسب ها</h3>
          <div className="flex items-center gap-2 md:hidden">
            <button className="text-gray-500">
              <Heart size={28} />
            </button>
            <button className="text-primary-500 dark:text-primary-400">
              <Share size={28} />
            </button>
          </div>
        </div>
        <div className="flex-between">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 border dark:bg-dark-field dark:text-dark-text dark:border-dark-stroke border-gray-300 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 max-md:hidden">
            <button className="text-gray-500">
              <Heart size={28} />
            </button>
            <button className="text-primary-500">
              <Share size={28} />
            </button>
          </div>
        </div>
      </div>

      <Comments />

      {/* Share Section */}
      <section className=" mt-32">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 dark:text-dark-titre">
          اشتراک گذاری این مقاله
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex justify-center  gap-3 mb-6 p-3 ">
            <SocialCircle icon={<Whatsapp />} bg="bg-green-500" />
            <SocialCircle icon={<Linkedin />} bg="bg-[#0A66C2]" />
            <SocialCircle icon={<Send2 />} bg="bg-sky-500" />
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-transparent bg-gray-200 dark:bg-dark-field "
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <Link />
              <span>کپی کردن لینک</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
