"use client";

import { Button } from "@/components/ui/button";
import { Magicpen } from "iconsax-reactjs";
import { Star } from "lucide-react";
import SelectColor from "./SelectColor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProductInfoSection({ product, colors, selectedColor, setSelectedColor }) {
  const router = useRouter();

  const handleViewOnAmazon = () => {
    window.open("https://www.amazon.ae", "_blank");
  };

  const handleReviewSummary = () => {
    const reviewsSection = document.getElementById("product-reviews");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCompare = () => {
    router.push("/compare");
  };

  return (
    <div>
      {/* Title */}
      <h1 className="md:text-2xl text-gray-900 dark:text-dark-titre mb-2 text-right">
        {product?.name || product?.title || "نام محصول"}
      </h1>

      {product?.englishName && (
        <p className="text-xs md:text-sm text-gray-400 dark:text-caption mb-4 text-right">{product.englishName}</p>
      )}

      {/* Rating */}
      <div className="flex-between border-b pb-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 flex-none" />
            <span className=" font-bold text-gray-900 dark:text-white">
              {product?.rating ? product.rating.toFixed(1) : "0.0"}
            </span>
            {product?.reviewCount && (
              <span className=" text-graty-500 dark:text-gray-400">
                (<span className="text-primary-500 dark:text-dark-title">{product.reviewCount}</span>)
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleReviewSummary}
              variant="ghost"
              size="sm"
              className="h-8 text-xs px-2 md:text-sm bg-primary-50 text-primary-400 dark:text-dark-titre dark:bg-[#4C537D]"
            >
              <Magicpen />
              <span className=" max-md:hidden">خلاصه نظرات</span>
            </Button>
            <Button
              onClick={handleCompare}
              variant="ghost"
              size="sm"
              className="h-8 text-sm px-2 text-[#FF9900] bg-[#FF99000A] border border-[#FF9900]"
            >
              <svg
                className="fill-[#FF9900]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.7109 3.69231C12.7109 3.30996 12.3926 3 12 3C11.6074 3 11.2891 3.30996 11.2891 3.69231V4.23031C10.6439 4.26914 10.0011 4.36089 9.36781 4.50556C6.85551 5.07947 4.89389 6.98986 4.30458 9.43653C3.89847 11.1226 3.89847 12.8773 4.30458 14.5634C4.89389 17.0101 6.85551 18.9205 9.36781 19.4944C10.0011 19.6391 10.6439 19.7308 11.2891 19.7697V20.3077C11.2891 20.69 11.6074 21 12 21C12.3926 21 12.7109 20.69 12.7109 20.3077V3.69231Z" />
                <path d="M14.6321 4.50557C14.2499 4.41825 13.8673 4.64924 13.7777 5.02148C13.688 5.39373 13.9252 5.76628 14.3074 5.8536C16.294 6.30742 17.8451 7.81805 18.3111 9.75275C18.6672 11.2308 18.6672 12.7691 18.3111 14.2472C17.8451 16.1819 16.294 17.6925 14.3074 18.1464C13.9252 18.2337 13.688 18.6062 13.7777 18.9785C13.8673 19.3507 14.2499 19.5817 14.6321 19.4944C17.1444 18.9205 19.106 17.0101 19.6953 14.5634C20.1014 12.8773 20.1014 11.1226 19.6953 9.43655C19.106 6.98987 17.1444 5.07948 14.6321 4.50557Z" />
              </svg>
              <span className=" max-md:hidden">مقایسه کالا</span>
            </Button>
          </div>
        </div>
        <button
          onClick={handleViewOnAmazon}
          type="button"
          className="flex-center gap-2"
        >
          <p className="text-yellow-700 dark:text-yellow-600 text-xs">مشاهده در آمازون</p>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_170_5987)">
              <path
                d="M15.4958 14.5323C8.20945 18 3.68745 15.0987 0.792773 13.3365C0.613651 13.2254 0.309207 13.3624 0.573354 13.6658C1.53772 14.8352 4.69813 17.6535 8.82339 17.6535C12.9515 17.6535 15.4073 15.401 15.7145 15.0081C16.0197 14.6185 15.8041 14.4036 15.4957 14.5323H15.4958ZM17.5422 13.4022C17.3465 13.1474 16.3524 13.0999 15.7267 13.1767C15.1001 13.2514 14.1596 13.6343 14.2413 13.8643C14.2833 13.9504 14.369 13.9118 14.7994 13.8731C15.231 13.83 16.4402 13.6774 16.6922 14.0068C16.9453 14.3384 16.3065 15.9183 16.1899 16.1731C16.0771 16.4279 16.2329 16.4936 16.4447 16.3239C16.6535 16.1543 17.0315 15.715 17.2852 15.0933C17.5372 14.4682 17.6909 13.5962 17.5422 13.4022Z"
                fill="#FF9900"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5965 7.45649C10.5965 8.36636 10.6195 9.12515 10.1596 9.93317C9.78842 10.5902 9.20044 10.9942 8.5435 10.9942C7.64672 10.9942 7.12445 10.3109 7.12445 9.30254C7.12445 7.31192 8.90805 6.95063 10.5965 6.95063V7.45649ZM12.9517 13.149C12.7973 13.287 12.5739 13.2969 12.3998 13.2049C11.6246 12.5611 11.4866 12.2622 11.0596 11.6479C9.77859 12.9552 8.87197 13.3461 7.20989 13.3461C5.24558 13.3461 3.71484 12.134 3.71484 9.70655C3.71484 7.81127 4.74304 6.52031 6.20468 5.88968C7.47265 5.3312 9.24316 5.23267 10.5965 5.07834V4.77611C10.5965 4.22095 10.6392 3.56401 10.314 3.08446C10.0282 2.65414 9.48294 2.47675 9.00332 2.47675C8.11318 2.47675 7.31825 2.93331 7.12445 3.87932C7.08498 4.0896 6.93065 4.29656 6.72044 4.30639L4.4539 4.06336C4.26342 4.02057 4.05321 3.86624 4.10577 3.57384C4.62804 0.827822 7.10797 0 9.32847 0C10.465 0 11.9497 0.302228 12.8465 1.16287C13.9831 2.22382 13.8746 3.63955 13.8746 5.18012V8.81967C13.8746 9.91351 14.3279 10.3931 14.7549 10.9844C14.906 11.1946 14.9389 11.4476 14.7484 11.6052C14.2721 12.0026 13.4246 12.7417 12.9582 13.1556L12.9516 13.149"
                fill="black"
              />
              <path
                d="M15.4958 14.5323C8.20945 18 3.68745 15.0987 0.792773 13.3365C0.613651 13.2254 0.309207 13.3624 0.573354 13.6658C1.53772 14.8352 4.69813 17.6535 8.82339 17.6535C12.9515 17.6535 15.4073 15.401 15.7145 15.0081C16.0197 14.6185 15.8041 14.4036 15.4957 14.5323H15.4958ZM17.5422 13.4022C17.3465 13.1474 16.3524 13.0999 15.7267 13.1767C15.1001 13.2514 14.1596 13.6343 14.2413 13.8643C14.2833 13.9504 14.369 13.9118 14.7994 13.8731C15.231 13.83 16.4402 13.6774 16.6922 14.0068C16.9453 14.3384 16.3065 15.9183 16.1899 16.1731C16.0771 16.4279 16.2329 16.4936 16.4447 16.3239C16.6535 16.1543 17.0315 15.715 17.2852 15.0933C17.5372 14.4682 17.6909 13.5962 17.5422 13.4022Z"
                fill="#FF9900"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5965 7.45649C10.5965 8.36636 10.6195 9.12515 10.1596 9.93317C9.78842 10.5902 9.20044 10.9942 8.5435 10.9942C7.64672 10.9942 7.12445 10.3109 7.12445 9.30254C7.12445 7.31192 8.90805 6.95063 10.5965 6.95063V7.45649ZM12.9517 13.149C12.7973 13.287 12.5739 13.2969 12.3998 13.2049C11.6246 12.5611 11.4866 12.2622 11.0596 11.6479C9.77859 12.9552 8.87197 13.3461 7.20989 13.3461C5.24558 13.3461 3.71484 12.134 3.71484 9.70655C3.71484 7.81127 4.74304 6.52031 6.20468 5.88968C7.47265 5.3312 9.24316 5.23267 10.5965 5.07834V4.77611C10.5965 4.22095 10.6392 3.56401 10.314 3.08446C10.0282 2.65414 9.48294 2.47675 9.00332 2.47675C8.11318 2.47675 7.31825 2.93331 7.12445 3.87932C7.08498 4.0896 6.93065 4.29656 6.72044 4.30639L4.4539 4.06336C4.26342 4.02057 4.05321 3.86624 4.10577 3.57384C4.62804 0.827822 7.10797 0 9.32847 0C10.465 0 11.9497 0.302228 12.8465 1.16287C13.9831 2.22382 13.8746 3.63955 13.8746 5.18012V8.81967C13.8746 9.91351 14.3279 10.3931 14.7549 10.9844C14.906 11.1946 14.9389 11.4476 14.7484 11.6052C14.2721 12.0026 13.4246 12.7417 12.9582 13.1556L12.9516 13.149"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_170_5987">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      {/* Colors */}
      {colors && colors.length > 0 && (
        <SelectColor colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      )}

      {/* Short Description */}
      {product?.shortDescription && (
        <div className="mb-6">
          <h3 className=" mb-2 text-gray-800 dark:text-dark-titre md:text-lg text-right">معرفی کوتاه</h3>
          <p className="text-sm text-gray-600 leading-relaxed text-right">{product.shortDescription}</p>
        </div>
      )}

      {/* Features Table */}
      {product?.attributes && product.attributes.length > 0 && (
        <div>
          <h3 className="mb-3 text-right text-gray-800 dark:text-white">ویژگی ها</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.attributes.map((atr) => {
              const selectedColorObj = colors?.find((c) => c.value === selectedColor);
              let displayValue = atr.value;

              // اگر رنگ انتخاب شده باشد و این ویژگی رنگ است، از رنگ انتخاب شده استفاده کن
              if (atr.key === "color" && selectedColorObj) {
                displayValue = selectedColorObj.label;
              }

              return (
                <div
                  key={atr.key || atr.name}
                  className="bg-gray-100 border dark:bg-dark-field dark:border-0 border-gray-200 p-2 rounded-lg"
                >
                  <p className="text-gray-700 dark:text-dark-titre max-md:text-sm text-sm font-medium">
                    {atr.name}
                  </p>
                  <p className="text-gray-500 text-sm dark:text-dark-text max-md:text-xs mt-2">{displayValue}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
