import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Notfound() {
  return (
    <div className="bg-[#F4F6F5] relative">
      <div className="absolute top-40 m-auto inset-x-0 size-max">
        <h1 className="text-[#0448A9] text-6xl font-bold"> این صفحه تحویل داده نشد !</h1>
        <h2 className="text-center mt-5 text-xl text-gray-600">
          مثل یک بسته اشتباهی، این صفحه به مقصد نرسیده. مسیر جدید انتخاب کنید
        </h2>
        <div className="flex justify-center">
          <Link href={"/"}>
            <Button className="bg-primary-700 text-white rounded-lg mt-6" size="lg">
              رفتن به صفحه اصلی
            </Button>
          </Link>
        </div>
      </div>
      <img src="/image/404.png" alt={`محصول بازدید شده شماره `} className="max-h-screen w-full" />
    </div>
  );
}

export default Notfound;
