import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProductPreviewCard({ product }) {
  if (!product) return null;

  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
      {/* Product Image */}
      <div className="w-full md:w-36 h-48 md:h-28 relative flex-shrink-0 rounded-xl overflow-hidden">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>

      {/* Middle Content */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-[15px] font-bold text-gray-900 dark:text-dark-title leading-6">{product.title}</h3>

        {/* Brand + Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-dark-text text-sm">برند:</span>
            <span className="font-medium text-gray-900 dark:text-dark-title">{product.brand}</span>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
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
    <div className="flex-1 bg-gray-100 dark:bg-dark-field px-3 py-2 rounded-xl flex justify-between items-center">
      <span className="text-gray-600 dark:text-dark-text text-sm">{label}</span>
      <span className="text-gray-900 dark:text-dark-title text-sm">{value}</span>
    </div>
  );
}
