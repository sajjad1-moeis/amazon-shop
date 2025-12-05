"use client";

const giftCardSteps = [
  {
    id: 1,
    number: 1,
    title: "انتخاب برند",
    description: "انتخاب سرویس مورد نیاز",
  },
  {
    id: 2,
    number: 2,
    title: "انتخاب مبلغ",
    description: "مشاهده قیمت و موجودی",
  },
  {
    id: 3,
    number: 3,
    title: "پرداخت ریالی",
    description: "پرداخت امن و سریع",
  },
  {
    id: 4,
    number: 4,
    title: "تحویل لحظه ای",
    description: "نمایش و ارسال فوری کد گیفت کارت",
  },
];

export default function GiftCardStepsSection() {
  return (
    <div class="my-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        مراحل خرید گیفت کارت
      </h2>
      <div
        className="w-full mb-20"
        style={{
          background: "linear-gradient(90deg, #26316D -15.24%, #354497 49.1%, #26316D 113.44%)",
        }}
      >
        <div className="py-4 container">
          <div className="grid grid-cols-2  md:grid-cols-4 gap-4 md:gap-0 relative">
            {giftCardSteps.map((step, index) => (
              <div
                key={step.id}
                className={`text-white px-4 py-5 md:px-5 md:py-6 border-l-2  ${
                  index !== giftCardSteps.length - 1 ? " border-white/10" : "border-transparent"
                }
                  ${(index + 1) % 2 == 0 && "max-md:border-transparent"} relative flex-1`}
              >
                {/* Arrow separator - بزرگ و به سمت چپ */}
                {index < giftCardSteps.length - 1 && (
                  <div className="hidden xl:flex absolute top-1/2 left-20 -translate-y-1/2 z-10 items-center justify-center">
                    <svg width="24" height="107" viewBox="0 0 24 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18.0699 1.77978C18.4476 0.713029 19.4565 0 20.5881 0C22.4324 0 23.7218 1.82447 23.1063 3.56298L5.89825 52.165C5.59243 53.0287 5.59243 53.9713 5.89825 54.835L23.1063 103.437C23.7218 105.176 22.4324 107 20.5881 107C19.4565 107 18.4476 106.287 18.0699 105.22L0.230494 54.835C-0.0753262 53.9713 -0.0753252 53.0287 0.230495 52.165L18.0699 1.77978Z"
                        fill="#D9D9D9"
                        fill-opacity="0.16"
                      />
                    </svg>
                  </div>
                )}

                <div className="flex flex-col  relative z-20 px-2">
                  {/* Number circle - light grey با عدد dark grey */}
                  <div className="size-10 md:size-12 rounded-full bg-primary-300 flex items-center justify-center mb-3">
                    <span className="text-primary-600 text-3xl font-bold">{step.number}</span>
                  </div>

                  <h3 className="text-base md:text-xl text-primary-50 mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-primary-200">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
