import React from "react";
import BlogFilter from "./BlogFilter";
import BlogCard from "@/components/BlogCard";

function BlogList({ count }) {
  return (
    <div className="container">
      <BlogFilter />
      <div class="grid grid-cols-3 gap-6">
        {[...Array(count)].map((blog) => (
          <BlogCard />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
