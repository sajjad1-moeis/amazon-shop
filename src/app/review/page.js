"use client";

import IndexLayout from "@/layout/IndexLayout";
import FiltersSection from "@/components/module/FiltersSection";
import React, { useState } from "react";
import ReviewsBoard from "@/template/Review/ReviewsBoard";
import TopBar from "@/template/Review/TopBar";
import IntroductionCard from "@/components/IntroductionCard";
const dynamicFilters = [
  {
    id: "color",
    label: "رنگ",
    options: [
      { id: "red", label: "قرمز" },
      { id: "blue", label: "آبی" },
      { id: "green", label: "سبز" },
    ],
  },
  {
    id: "size",
    label: "سایز",
    options: [
      { id: "s", label: "کوچک" },
      { id: "m", label: "متوسط" },
      { id: "l", label: "بزرگ" },
    ],
  },
];

function Page() {
  const [viewMode, setViewMode] = useState("reviews");

  return (
    <IndexLayout>
      <IntroductionCard
        items={[{ label: "تجربه خریداران ما" }]}
        desc=" قبل از خرید، تجربه کاربران واقعی را ببینید و مطمئن‌تر تصمیم بگیرید."
        title={" تجربه واقعی خریداران از میکرولس"}
      />
      <div className="grid  lg:grid-cols-4 container mt-10 gap-8">
        <div class="max-lg:hidden">
          <FiltersSection isInventory={false} dynamicFilters={dynamicFilters} />
        </div>
        <div className=" lg:col-span-3">
          <div className="space-y-6">
            <TopBar viewMode={viewMode} setViewMode={setViewMode} />

            <ReviewsBoard />
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}

export default Page;
