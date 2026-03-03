import React from "react";
import IndexLayout from "@/layout/IndexLayout";
import NotFoundView from "@/components/NotFoundView";
import { getNotFoundPreset } from "@/data/notFoundPresets";

export const metadata = {
  title: "کالای ناموجود | میکرولس",
  description: "این کالا در حال حاضر موجود نیست. می‌توانید محصولات مشابه را ببینید.",
};

export default function ProductUnavailablePage() {
  const preset = getNotFoundPreset("product");
  return (
    <IndexLayout>
      <div className="container">
        <NotFoundView
          title={preset.title}
          description={preset.description}
          primaryButton={preset.primaryButton}
          secondaryButton={preset.secondaryButton}
          imageSrc={preset.imageSrc}
          imageAlt={preset.imageAlt}
        />
      </div>
    </IndexLayout>
  );
}
