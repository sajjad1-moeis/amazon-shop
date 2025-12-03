"use client";
import { useState } from "react";
import ExperienceModal from "./ExperienceModal";
import ReviewCard from "./ReviewCard";
import PaginationBlogs from "../Blogs/PaginationBlogs";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1588422333075-3c537f7e07c7?auto=format&fit=crop&w=1600&q=80";

const EXPERIENCES = Array.from({ length: 9 }).map((_, idx) => ({
  id: idx + 1,
  title: "Apple AirPods Pro ۲",
  description: "خیلی سریع رسید، بسته‌بندی سالم، کیفیت عالی",
  rating: 4.7,
  reviewsCount: 235,
  likes: 24,
  dislikes: 1,
  comments: [{ id: 1, name: "محمد", text: "کاملا موافقم" }],
  date: "۲۴ اسفند ۱۴۰۳",
  image: PLACEHOLDER_IMAGE,
  thumbnails: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
}));

export default function ReviewsBoard() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (exp) => {
    setSelectedExperience(exp);
    setSelectedImageIndex(0);
  };

  const closeModal = () => setSelectedExperience(null);

  return (
    <>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {EXPERIENCES.map((exp) => (
          <ReviewCard key={exp.id} experience={exp} onClick={() => openModal(exp)} />
        ))}
      </div>

      <PaginationBlogs count={6} />

      <ExperienceModal
        open={!!selectedExperience}
        onClose={closeModal}
        experience={selectedExperience}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
    </>
  );
}
