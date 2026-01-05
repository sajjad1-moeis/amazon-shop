import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProductPreviewCard({ product }) {
  if (!product) return null;

  return (
    <div className="w-full bg-gray-50 dark:bg-dark-field border border-gray-200 dark:border-dark-stroke rounded-xl sm:rounded-2xl p-2 sm:p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 shadow-sm">
      {/* Product Image */}
      <div className="flex gap-2">
        <div className=" size-16 md:w-36  sm:h-48 md:h-28 relative flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-box">
          <Image src={product.image} alt={product.title} fill className="object-cover" />
        </div>
        <div className="md:hidden">
          <h3 className="text-sm mb-3 text-gray-900 dark:text-dark-titre leading-5 sm:leading-6">{product.title}</h3>

          {/* Brand + Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 w-full">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-dark-text text-xs sm:text-sm">برند:</span>
              <span className="font-medium text-gray-900 dark:text-dark-title text-sm">{product.brand}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Content */}
      <div className="flex-1 flex flex-col gap-2 sm:gap-3">
        {/* Title */}
        <h3 className="text-sm max-md:hidden sm:text-[15px] font-bold text-gray-900 dark:text-dark-titre leading-5 sm:leading-6">
          {product.title}
        </h3>

        {/* Brand + Status */}
        <div className="flex max-md:hidden flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-dark-text text-xs sm:text-sm">برند:</span>
            <span className="font-medium text-gray-900 dark:text-dark-title text-xs sm:text-sm">{product.brand}</span>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
          <InfoBox label="قیمت فعلی" value={product.price} />
          <InfoBox label="وزن" value={product.weight} />
          <InfoBox label="امکان قفل" value={"دارد"} />
        </div>
      </div>
    </div>
  );
}

/* Small helper component */
function InfoBox({ label, value }) {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-dark-stroke px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex justify-between items-center">
      <span className="text-gray-600 dark:text-dark-text text-xs sm:text-sm">{label}</span>
      <span className="text-gray-900 dark:text-dark-titre text-xs sm:text-sm">{value}</span>
    </div>
  );
}
