import { TickCircle } from "iconsax-reactjs";

export default function Timeline({ currentStep = 1, steps }) {
  // درصد فاصله هر دایره
  const getPosition = (index) => {
    if (steps.length === 1) return "0%";
    return `${(index / (steps.length - 1)) * 100}%`;
  };

  // درصد پیشرفت خط
  const progressWidth = currentStep === 1 ? "10%" : `${((currentStep - 1) / (steps.length - 1)) * 100}%`;
  const isComplete = currentStep === steps?.length;

  return (
    <div className="relative w-full mx-auto px-5 md:px-14 select-none flex items-start min-h-[100px]">
      {/* خط پس‌زمینه */}
      <div className="absolute top-6 right-0 w-full h-2.5 bg-black/10 dark:bg-dark-field rounded-full" />
      <div className="absolute top-[21px] -right-1 size-4 bg-primary-600 dark:bg-primary-400 rounded-full" />
      <div
        className={`absolute top-[21px] -left-1 size-4 rounded-full ${
          isComplete ? "bg-primary-600 dark:bg-primary-400" : "bg-gray-200 dark:bg-dark-field"
        }`}
      />

      {/* خط پر شده */}
      <div
        className="absolute top-6 right-0 h-2.5 bg-primary-600 dark:bg-primary-400 rounded-full transition-all duration-300"
        style={{ width: progressWidth }}
      />

      {/* دایره ها */}
      <div className="relative w-full">
        {steps.map(({ Icon, label, id }, index) => {
          const isActive = currentStep >= index + 1;

          return (
            <div
              key={id}
              className="absolute flex flex-col items-center w-max"
              style={{
                right: getPosition(index), // تعیین داینامیک موقعیت
                transform: "translateX(50%)",
              }}
            >
              <div
                style={{ boxShadow: "0px 1px 5px -1px #0000001F" }}
                className={`size-[52px] text-xl flex items-center bg-white dark:bg-dark-field justify-center rounded-full shadow-md transition-all duration-300  ${
                  isActive ? " text-primary-600 dark:text-primary-400" : " text-gray-400"
                }`}
              >
                <Icon
                  variant="Bold"
                  className={`${isActive ? "text-primary-600 dark:text-primary-300" : "text-gray-400"} w-6 h-6 `}
                />
              </div>

              <span
                className={`mt-3 text-sm  ${
                  isActive ? "text-primary-600  dark:text-primary-400" : "text-gray-400 dark:text-[#4B5563]"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
