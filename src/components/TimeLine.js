import { cn } from "@/lib/utils";
import { TickCircle } from "iconsax-reactjs";

export default function Timeline({ currentStep = 1, steps = [], className }) {
  // حداقل عرض بر اساس تعداد استپ‌ها
  const minWidth = Math.max(steps.length * 180, 600);

  // درصد فاصله هر دایره
  const getPosition = (index) => {
    if (steps.length === 1) return "0%";
    return `${(index / (steps.length - 1)) * 100}%`;
  };

  // درصد پیشرفت خط
  const progressWidth = currentStep === 1 ? "10%" : `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

  const isComplete = currentStep === steps.length;

  return (
    <div className={cn("relative mx-auto px-14 select-none flex items-start min-h-[100px]", className)}>
      {/* خط پس‌زمینه */}
      <div className="absolute top-6 right-0 w-full h-2.5 bg-black/10 dark:bg-dark-stroke/55 rounded-full" />
      <div className="absolute top-[21px] right-0 lg:-right-1 size-4 bg-primary-600 dark:bg-dark-title rounded-full" />
      <div
        className={`absolute top-[21px] left-0 lg:-left-1 size-4 rounded-full ${
          isComplete ? "bg-primary-600 dark:bg-dark-title" : "bg-gray-200 dark:bg-dark-stroke"
        }`}
      />

      {/* خط پر شده */}
      <div
        className="absolute top-6 right-0 h-2.5 bg-primary-600 dark:bg-dark-title rounded-full transition-all duration-300"
        style={{ width: progressWidth }}
      />

      {/* دایره‌ها */}
      <div className="relative w-full">
        {steps.map(({ Icon, label, id }, index) => {
          const isActive = currentStep >= index + 1;

          return (
            <div
              key={id}
              className={`absolute flex flex-col items-center w-max ${
                isActive ? "text-primary-600 dark:text-dark-title" : "text-gray-400 dark:text-caption"
              }`}
              style={{
                right: getPosition(index),
                transform: "translateX(50%)",
              }}
            >
              <div
                style={{ boxShadow: "0px 1px 5px -1px #0000001F" }}
                className="size-9 max-lg:mt-3 lg:size-[52px] text-xl flex items-center justify-center bg-white dark:bg-dark-field rounded-full shadow-md transition-all duration-300"
              >
                <Icon variant="Bold" className="w-6 h-6" />
              </div>

              <span className="mt-3  text-xs lg:text-sm whitespace-nowrap">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
