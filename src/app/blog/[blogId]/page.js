import IndexLayout from "@/layout/IndexLayout";
import GuideArticle from "@/template/Blog/GuideArticle";
import ReviewsAndShare from "@/template/Blog/ReviewsAndShare";
import React from "react";

function Blog() {
  return (
    <IndexLayout>
      <GuideArticle />
      <ReviewsAndShare />
    </IndexLayout>
  );
}

export default Blog;
