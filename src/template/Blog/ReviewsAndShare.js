"use client";

import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heart, Link, Send2, Share, Whatsapp } from "iconsax-reactjs";
import Comments from "./Comments";
import { SocialCircle } from "@/components/module/Footer";

export default function ReviewsAndShare() {
  const tags = ["آمازون آمریکا", "خرید بین المللی", "میکرولس", "واردات کالا"];

  return (
    <div className="container bg-white p-8" dir="rtl">
      {/* Top Section - Icons and Tags */}
      <div className="bg-gray-100 p-4 rounded-2xl w-full">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-right">برچسب ها</h3>
        <div class="flex-between">
          <div className="flex flex-wrap gap-2 justify-end">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 border border-gray-300 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
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
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">اشتراک گذاری این مقاله</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex justify-center  gap-3 mb-6 p-3 ">
            <SocialCircle icon={<Whatsapp />} bg="bg-green-500" />
            <SocialCircle icon={<Linkedin />} bg="bg-[#0A66C2]" />
            <SocialCircle icon={<Send2 />} bg="bg-sky-500" />
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-gray-200"
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
