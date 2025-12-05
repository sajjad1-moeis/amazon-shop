import { paymentSteps } from "@/data";

export default function PaymentSteps() {
  return (
    <div className=" bg-primary-600 dark:bg-primary-600">
      <div className=" container  py-4 lg:py-6">
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-primary-100 text-center mb-10">
          مراحل انجام پرداخت ارزی
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-14">
          {paymentSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col  md:py-6 max-md:pe-6 pe-4 ${
                index !== paymentSteps.length - 1 ? "border-l-2 border-white/10" : ""
              } `}
            >
              <div className="size-10 md:size-12 rounded-full bg-primary-300 flex items-center justify-center mb-3">
                <span className="text-primary-600 text-3xl font-bold">{step.number}</span>
              </div>

              <h3 className="text-base lg:text-xl text-primary-50 mb-2">{step.title}</h3>
              <p className="text-xs lg:text-sm text-primary-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
