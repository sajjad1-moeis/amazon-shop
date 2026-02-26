import Image from "next/image";
import React from "react";

function ImagesSection() {
  return (
    <div className="container mt-14 md:mt-22">
      {/* گرید ۴تایی بنرهای ۱ تا ۴ */}
      <div dir="ltr" className="grid grid-cols-2 md:grid-cols-4   gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden">
            <Image
              src={`/image/Home/banner${i}.png`}
              alt={`بنر ${i}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesSection;
