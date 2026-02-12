import React from "react";
import { createMetadata } from "@/utils/metadata";
import IndexLayout from "@/layout/IndexLayout";
import BlogDetailClient from "@/template/Blog/BlogDetailClient";
import DescriptionBlog from "@/template/Blog/DescriptionBlog";
// import { blogService } from "@/services/blog/blogService";
// import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateMetadata({ params }) {
  // در Next.js 15، params یک Promise است
  const resolvedParams = await params;
  const blogId = resolvedParams?.blogId;
  
  // استفاده از دیتای تستی
  const mockBlog = {
    title: "راهنمای خرید از آمازون - نکات مهم برای خرید موفق",
    shortDescription: "در این مقاله به بررسی نکات مهم و راهنمای کامل خرید از آمازون می‌پردازیم",
    description: "راهنمای خرید از آمازون",
    tags: [{ name: "خرید" }, { name: "آمازون" }, { name: "راهنما" }],
    image: "/image/Blogs/blog.png",
    thumbnailImage: "/image/Blogs/blog.png",
  };

  return createMetadata({
    title: `${mockBlog.title} | میکرولس`,
    description: mockBlog.shortDescription || "مقاله و راهنمای خرید از آمازون",
    keywords: mockBlog.tags?.map((tag) => tag.name) || [mockBlog.title, "مقاله", "راهنمای خرید"],
    image: mockBlog.image || mockBlog.thumbnailImage,
    url: `/blog/${blogId}`,
  });

  // TODO: بعداً API را فعال کنید
  // try {
  //   const response = await blogService.getBySlug(blogId);
  //   if (response.success && response.data) {
  //     const blog = response.data;
  //     ...
  //   }
  // } catch (error) {
  //   console.error("Error fetching blog for metadata:", error);
  // }
}

export default async function BlogDetailPage({ params }) {
  // در Next.js 15، params یک Promise است
  const resolvedParams = await params;
  const blogId = resolvedParams?.blogId;
  
  // استفاده از دیتای تستی - اطلاعات حیاتی
  const blog = {
    id: blogId,
    title: "راهنمای خرید از آمازون - نکات مهم برای خرید موفق",
    shortDescription: "در این مقاله به بررسی نکات مهم و راهنمای کامل خرید از آمازون می‌پردازیم. با ما همراه باشید تا بهترین تجربه خرید را داشته باشید.",
    content: `
      <h2>مقدمه</h2>
      <p>خرید از آمازون یکی از بهترین راه‌های خرید آنلاین است که می‌تواند تجربه‌ای عالی برای شما به ارمغان بیاورد. در این مقاله به بررسی نکات مهم و راهنمای کامل خرید از آمازون می‌پردازیم.</p>
      
      <h2>نکات مهم خرید از آمازون</h2>
      <ul>
        <li>بررسی نظرات کاربران</li>
        <li>مقایسه قیمت‌ها</li>
        <li>بررسی شرایط ارسال</li>
        <li>اطمینان از اصالت کالا</li>
      </ul>
      
      <h2>نتیجه‌گیری</h2>
      <p>با رعایت این نکات می‌توانید بهترین تجربه خرید را از آمازون داشته باشید.</p>
    `,
    featuredImageUrl: "/image/Blogs/blog.png",
    viewCount: 1250,
    authorFullName: "تیم میکرولس",
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    likeCount: 45,
    tags: [
      { id: "1", name: "خرید" },
      { id: "2", name: "آمازون" },
      { id: "3", name: "راهنما" },
    ],
  };
  
  // TODO: بعداً API را فعال کنید
  // let blog;
  // try {
  //   const response = await blogService.getBySlug(blogId);
  //   if (response.success && response.data) {
  //     blog = response.data;
  //   } else {
  //     notFound();
  //   }
  // } catch (error) {
  //   console.error("Error fetching blog:", error);
  //   notFound();
  // }

  const imageUrl = blog.featuredImageUrl
    ? blog.featuredImageUrl.startsWith("http")
      ? blog.featuredImageUrl
      : `https://micrls.com${blog.featuredImageUrl}`
    : "/image/Blogs/blog.png";

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("fa-IR")
    : new Date(blog.createdAt).toLocaleDateString("fa-IR");

  return (
    <IndexLayout>
      {/* محتوای حیاتی (h1, توضیحات) در Server Component */}
      <div className="container bg-white dark:bg-dark-bg p-4 py-8 lg:p-8" dir="rtl">
        <div className="mb-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="relative aspect-square max-h-[304px] w-full">
                <Image src={imageUrl} alt={blog.title} fill className="object-cover rounded-2xl" />
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3 w-full">
              {/* h1 برای SEO - اطلاعات حیاتی */}
              <h1 className="text-lg md:text-2xl lg:text-4xl font-bold dark:text-dark-title text-primary-700 lg:leading-[50px] text-right">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex-between md:gap-6 max-md:text-xs text-sm text-gray-400 mb-4 mt-5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span>{blog.viewCount || 0} بازدید</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{blog.authorFullName || "نویسنده"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{publishedDate}</span>
                </div>
              </div>

              {/* Short Description - اطلاعات حیاتی */}
              {blog.shortDescription && (
                <div className="border-t border-gray-200 pt-4 mt-4 text-gray-500 max-md:text-sm dark:text-dark-text">
                  <p>{blog.shortDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content - اطلاعات حیاتی */}
        <DescriptionBlog content={blog.content} />
      </div>
      
      {/* بخش تعاملی (نظرات، لایک) در Client Component */}
      <BlogDetailClient blog={blog} />
    </IndexLayout>
  );
}
