"use client";

import Image from "next/image";
import { Calendar2, Edit2, Heart, Share, Timer1 } from "iconsax-reactjs";
import DescriptionBlog from "./DescriptionBlog";

export default function GuideArticle({ blog, onLike }) {
  if (!blog) {
    return null;
  }

  const imageUrl = blog.featuredImageUrl
    ? blog.featuredImageUrl.startsWith("http")
      ? blog.featuredImageUrl
      : `https://micrls.com${blog.featuredImageUrl}`
    : "/image/Blogs/blog.png";

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("fa-IR")
    : new Date(blog.createdAt).toLocaleDateString("fa-IR");

  return (
    <div className="container bg-white dark:bg-dark-bg p-4 py-8 lg:p-8" dir="rtl">
      <div className="mb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="relative aspect-square max-h-[304px] w-full">
              <Image src={imageUrl} alt={blog.title} fill className="object-cover rounded-2xl" />
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-3 w-full">
            <h1 className="text-lg md:text-2xl lg:text-4xl font-bold dark:text-dark-title text-primary-700 lg:leading-[50px] text-right">
              {blog.title}
            </h1>

            <div className="flex-between md:gap-6 max-md:text-xs text-sm text-gray-400 mb-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2">
                <Timer1 size={22} />
                <span>{blog.viewCount || 0} بازدید</span>
              </div>
              <div className="flex items-center gap-2">
                <Edit2 size={22} />
                <span>{blog.authorFullName || "نویسنده"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar2 size={22} />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2 max-md:absolute top-4 left-4">
                <button
                  onClick={onLike}
                  className="text-gray-500 max-md:text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Heart size={28} />
                </button>
                <span className="text-xs">{blog.likeCount || 0}</span>
                <button className="text-primary-500 dark:text-dark-primary">
                  <Share size={28} />
                </button>
              </div>
            </div>

            {blog.shortDescription && (
              <div className="border-t border-gray-200 pt-4 mt-4 text-gray-500 max-md:text-sm dark:text-dark-text">
                <p>{blog.shortDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DescriptionBlog content={blog.content} />
    </div>
  );
}
