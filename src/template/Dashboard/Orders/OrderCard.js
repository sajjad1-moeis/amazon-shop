"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Paintbucket } from "iconsax-reactjs";
import Timeline from "@/components/TimeLine";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getStatusBadge = (status) => {
  const statusConfig = {
    "to-iran": {
      label: "در مسیر ایران",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    processing: {
      label: "در حال پردازش",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    "to-dubai": {
      label: "در مسیر دبی",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    clearance: {
      label: "ترخیص",
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    delivered: {
      label: "تحویل شده",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    returned: {
      label: "مرجوعی",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  const config = statusConfig[status] || statusConfig.processing;

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-md text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
};

export default function OrderCard({ order, onDownloadInvoice, onSecondPayment }) {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-box p-4">
      {/* Order Summary - بالا با border */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">شماره سفارش: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{order.orderNumber}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">تعداد محصول: </span>
          <span className="text-sm font-medium px-1 rounded text-primary-500 bg-primary-100 dark:text-white">
            {order.itemsCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">وضعیت:</span>
          {getStatusBadge(order.status)}
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ کل: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{order.totalAmount} تومان</span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ سفارش: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{order.orderDate}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">درصد پرداختی: </span>
          <span className="text-sm font-medium text-green-600 dark:text-white">{order.paymentStatus}</span>
        </div>
      </div>

      {/* Products Slider */}
      <div className="mb-6">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
          }}
          className="products-swiper"
        >
          {order.products.map((product) => (
            <SwiperSlide key={product.id} className="flex flex-col">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700/30">
                {/* Product Image */}
                <div class="flex gap-3 flex-grow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Paintbucket size={24} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className=" font-medium text-neutral-800 dark:text-white mb-2 line-clamp-2">{product.name}</h4>
                  </div>
                </div>

                <div className="flex  gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <div className="bg-gray-200 flex-1  rounded-lg p-2">
                    قیمت کالا (تومان):{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.price.toLocaleString("fa-IR")}
                    </span>
                  </div>
                  <div className="bg-gray-200 flex gap-5 rounded-lg p-2">
                    تعداد: <span className="font-medium text-gray-900 dark:text-white">{product.quantity} عدد</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Timeline Accordion - Default Open */}
      <Accordion type="single" collapsible defaultValue="timeline" className="mb-6">
        <AccordionItem value="timeline" className="border-0">
          <AccordionTrigger className="font-semibold text-primary-500 dark:text-gray-400 hover:no-underline py-2">
            وضعیت سفارش:
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="text-gray-600 mb-2 text-sm">{order.timeline.productName || "محصول اول"}</div>
            <div className="px-2 pb-20  relative">
              {order.timeline && order.timeline.steps && order.timeline.steps.length > 0 ? (
                <Timeline currentStep={order.timeline.currentStepIndex} steps={order.timeline.steps} />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">در حال بارگذاری وضعیت سفارش...</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        {order?.status === "delivered" && (
          <Button
            onClick={() => onDownloadInvoice(order.id)}
            className="text-primary-700 bg-transparent flex-1 border-2 border-primary-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2"
          >
            دانلود فاکتور
          </Button>
        )}
        <Button
          onClick={() => router.push("/dashboard/orders/" + order.id)}
          className="bg-primary-700 flex-1 hover:bg-primary-600 text-white gap-2"
        >
          مشاهده جزئیات
        </Button>

        {order.needsSecondPayment && (
          <Button
            onClick={() => onSecondPayment(order.id)}
            className="bg-yellow-400 flex-1 text-primary-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2"
          >
            پرداخت مرحله دوم
          </Button>
        )}
      </div>
    </div>
  );
}
