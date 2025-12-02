import React from "react";
import Image from "next/image";
import ByAmazonSlider from "./ByAmazonSlider";

export default function AmazonSection() {
  return (
    <div className="w-full bg-white ">
      {/* Hero Section */}

      <Image src="/image/Home/amazonBg.png" alt="banner" width={0} height={0} sizes="100vw" className="w-full h-auto" />

      {/* Product Slider Box */}
      <div className="w-full container -mt-[10%] relative">
        <div className="w-full border-2 border-primary-300 rounded-2xl p-4 flex gap-4 overflow-x-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          {/* Explosion Offer Box */}
          <div className="min-w-[150px] lg:min-w-[200px]  rounded-xl p-4  flex justify-center items-center text-center max-md:hidden">
            <div>
              <div className="flex items-center justify-center">
                <svg width="135" height="105" viewBox="0 0 135 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M67.0459 0.00152588C79.1852 -0.0800847 91.1219 3.11408 101.599 9.24664C112.075 15.3792 120.705 24.2235 126.577 34.8482C132.449 45.4729 135.348 57.4852 134.967 69.6187C134.586 81.7523 130.939 93.5591 124.412 103.794L115.985 98.4205C121.691 89.4917 125 78.8826 125 67.5005C125 35.7444 99.2562 10.0007 67.5 10.0005C35.7437 10.0005 10.0001 35.7443 10 67.5005C10.0001 79.1596 13.4699 90.0083 19.4336 99.0699L11.0811 104.556C4.4167 94.4095 0.611537 82.6533 0.0673828 70.5259C-0.476721 58.3986 2.26038 46.3488 7.98926 35.6461C13.7181 24.9434 22.227 15.9834 32.6201 9.71051C43.0135 3.43762 54.9065 0.0831397 67.0459 0.00152588Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M62.1357 0.214233C77.7256 -1.02848 93.264 3.18029 106.095 12.1224L100.379 20.3226C91.0612 13.8169 79.7262 10.0004 67.5 10.0004C35.7438 10.0004 10.0002 35.7442 10 67.5004C10 78.9998 13.3759 89.711 19.1904 98.6967L10.7959 104.119C2.31173 90.9806 -1.34721 75.3043 0.444336 59.7679C2.23599 44.2315 9.36718 29.799 20.6191 18.9369C31.8711 8.07493 46.5459 1.45711 62.1357 0.214233Z"
                    fill="url(#paint0_linear_1_6)"
                  />
                  <path
                    d="M79.1668 47.3338C78.0735 47.3338 77.1668 46.4271 77.1668 45.3338V36.0005C77.1668 33.1205 75.3802 31.3338 72.5002 31.3338H64.5002C61.6202 31.3338 59.8335 33.1205 59.8335 36.0005V45.3338C59.8335 46.4271 58.9268 47.3338 57.8335 47.3338C56.7402 47.3338 55.8335 46.4271 55.8335 45.3338V36.0005C55.8335 30.9071 59.4068 27.3338 64.5002 27.3338H72.5002C77.5935 27.3338 81.1668 30.9071 81.1668 36.0005V45.3338C81.1668 46.4271 80.2602 47.3338 79.1668 47.3338Z"
                    fill="url(#paint1_linear_1_6)"
                  />
                  <path
                    d="M57.8336 71.4138C56.7402 71.4138 55.8336 70.5071 55.8336 69.4138C55.8336 68.2938 56.7402 67.4138 57.8336 67.4138H89.1936C89.9936 67.4138 90.6069 66.7205 90.5269 65.9205L88.7136 50.7471C88.0736 45.5738 87.1669 41.3338 78.1002 41.3338H58.9002C49.8336 41.3338 48.9269 45.5738 48.3136 50.7471L45.9136 70.7471C45.1402 77.3071 47.1669 82.6671 56.5269 82.6671H80.4736C88.9002 82.6671 91.3802 78.3205 91.2469 72.6671C91.2202 71.9471 90.6336 71.4138 89.9136 71.4138H57.8336Z"
                    fill="url(#paint2_linear_1_6)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_6"
                      x1="158"
                      y1="8.50049"
                      x2="-11"
                      y2="106"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF9900" />
                      <stop offset="1" stopColor="#F05252" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1_6"
                      x1="88.6881"
                      y1="29.3582"
                      x2="51.3287"
                      y2="48.1767"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF9900" />
                      <stop offset="1" stopColor="#F05252" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1_6"
                      x1="104.757"
                      y1="45.5176"
                      x2="34.1733"
                      y2="76.4082"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF9900" />
                      <stop offset="1" stopColor="#F05252" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="text-[#333] font-semibold text-lg -mt-2">تخفیف های</p>
              <p className="my-7 font-bold text-3xl">انفجاری</p>

              <div className=" py-2 flex items-center justify-center gap-1 text-gray-700 border-red-400 border text-xl rounded-xl font-bold">
                <span>44</span>
                <span className="text-xl">15:12</span>
              </div>
            </div>
          </div>

          {/* Product Card */}

          <ByAmazonSlider />
        </div>
      </div>
    </div>
  );
}
