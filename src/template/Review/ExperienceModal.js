import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Like1, Messages3, Star, Star1 } from "iconsax-reactjs";

export default function ExperienceModal({ open, onClose, experience, selectedImageIndex, setSelectedImageIndex }) {
  if (!experience) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-5xl w-full p-0 gap-0 overflow-hidden rounded-2xl dark:bg-dark-box" dir="rtl">
        <div className="flex flex-col lg:flex-row-reverse">
          {/* LEFT – IMAGE GALLERY */}
          <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-dark-box p-6">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white mb-4 max-lg:max-h-60">
              <Image src="/image/Home/product.png" alt={experience.title} fill className="object-cover" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    "relative aspect-square w-full rounded-lg overflow-hidden border-2 transition max-md:max-h-20",
                    selectedImageIndex === idx ? "border-orange-500" : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Image fill src="/image/Home/product.png" alt="" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="w-full lg:w-1/2 p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-semibold text-yellow-600">{experience.title}</h2>
            <div className="flex-between mt-2 pb-4  border-b text-xs text-gray-400">
              <div className="flex items-center gap-4 text-sm ">
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" variant="Bold" />
                  <span>{experience.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star1 className="size-4 fill-amber-400 text-amber-400" />
                <span>{experience.rating}</span>
                <span>({experience.reviewsCount})</span>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1  hover:text-gray-900">
                  <Like1 size={18} variant="Bold" />
                  <span>{experience.dislikes}</span>
                </button>

                <button className="flex items-center gap-1  hover:text-gray-900">
                  <Messages3 size={18} variant="Bold" />
                  <span>{experience.likes}</span>
                </button>
              </div>
            </div>
            <div className="pb-4 mb-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-dark-titre">تجربه کامل:</h3>
              <p className="text-gray-700 leading-relaxed dark:text-dark-text">{experience.description}</p>
            </div>
            <div className="max-lg:max-h-24  overflow-auto">
              <div className="flex-between">
                <h3 className=" text-gray-900 mb-3 dark:text-dark-titre">لیست کامنت‌ها:</h3>
                <Button
                  size="sm"
                  className=" bg-gray-200 dark:text-dark-titre  rounded-xl dark:bg-[#E5E7EB52] text-gray-700 hover:bg-gray-300"
                >
                  ثبت نظر جدید
                </Button>
              </div>
              <div className="space-y-3 mt-3">
                {experience.comments.map((c) => (
                  <div key={c.id} className="bg-gray-50 dark:bg-dark-field rounded-lg p-3">
                    <div className="flex-between">
                      <p className="font-semibold text-gray-900 mb-1 dark:text-dark-titre">{c.name}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-dark-text">
                          <Calendar className="size-4" variant="Bold" />
                          <span>امروز</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm dark:text-dark-text">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
