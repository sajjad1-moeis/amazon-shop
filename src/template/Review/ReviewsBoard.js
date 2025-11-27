"use client";

import { useState } from "react";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VIEW_MODES = [
  { id: "reviews", label: "فقط دیدگاه‌ها" },
  { id: "photos", label: "فقط تصاویر" },
];

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1588422333075-3c537f7e07c7?auto=format&fit=crop&w=1600&q=80";

const EXPERIENCES = Array.from({ length: 9 }).map((_, idx) => ({
  id: idx + 1,
  title: "Apple AirPods Pro ۲",
  description: "خیلی سریع رسید، بسته‌بندی سالم، کیفیت عالی",
  rating: 4.7,
  reviewsCount: 395,
  likes: 24,
  comments: 36,
  helpful: 314,
  image: PLACEHOLDER_IMAGE,
}));

export default function ReviewsBoard() {
  const [viewMode, setViewMode] = useState("reviews");

  return (
    <div className="min-h-screen bg-slate-100/80 px-4 py-10 text-gray-900" dir="rtl">
      <div className="mx-auto max-w-6xl space-y-6">
        <TopBar viewMode={viewMode} setViewMode={setViewMode} />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {EXPERIENCES.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopBar({ viewMode, setViewMode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Button className="rounded-xl bg-indigo-600 px-6 py-2 text-white shadow-[0_12px_30px_rgba(79,70,229,0.25)] hover:bg-indigo-700">
          ثبت تجربه جدید
        </Button>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
          {VIEW_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setViewMode(mode.id)}
              className={cn(
                "rounded-full px-4 py-1 text-sm font-medium transition",
                viewMode === mode.id ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <button className="rounded-full border border-gray-200 px-4 py-1 text-sm text-gray-600 shadow-sm">
        فقط دیده شده‌ها
      </button>
    </div>
  );
}

function ExperienceCard({ experience }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden rounded-t-3xl bg-slate-100">
        <img src={experience.image} alt={experience.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="space-y-3 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{experience.title}</h3>
          <p className="text-sm text-gray-500">{experience.description}</p>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Star className="size-4 text-amber-400" />
          <span className="font-semibold text-gray-900">{experience.rating}</span>
          <span>({experience.reviewsCount})</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <ThumbsUp className="size-4 text-gray-400" />
            <span>{experience.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="size-4 text-gray-400" />
            <span>{experience.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⭐️</span>
            <span>{experience.rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
