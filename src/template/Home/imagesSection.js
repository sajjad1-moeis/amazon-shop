import Image from "next/image";
import React from "react";

function ImagesSection() {
  return (
    <div className="grid grid-cols-2 gap-8 mt-22 container">
      <Image
        src="/image/Home/image1.png"
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        className=" rounded-2xl w-full h-auto"
      />
      <Image
        src="/image/Home/image1.png"
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        className=" rounded-2xl w-full h-auto"
      />
    </div>
  );
}

export default ImagesSection;
