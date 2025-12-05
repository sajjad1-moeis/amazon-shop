import { benefits } from "@/data";

export default function Benefits() {
  return (
    <div className="mb-16">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-dark-titre text-center mb-8">
        چرا از خدمات ارزی ما استفاده کنید؟
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.id}
              className="bg-white dark:bg-dark-field rounded-xl border-2 border-primary-400 dark:border-dark-stroke p-4 lg:p-6 hover:shadow-lg transition-all"
            >
              <div className="flex  mb-4">
                <div className="size-12 bg-primary-700 dark:bg-dark-text rounded-xl flex items-center justify-center">
                  <Icon variant="Bold" className="md:size-8 text-primary-50 dark:text-dark-field" />
                </div>
              </div>

              <h3 className="md:text-xl font-bold text-primary-700 dark:text-dark-titre mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-500 dark:text-dark-text">{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
