"use client";

import { Truck, TruckFast } from "iconsax-reactjs";

export default function DeliveryTypeSection({ selectedDelivery, setSelectedDelivery }) {
  return (
    <div>
      <div className="grid grid-cols-2">
        {/* Standard */}
        <label
          className={`cursor-pointer p-3 transition flex items-center justify-between
      ${selectedDelivery === "standard" ? "bg-gray-100 dark:bg-dark-box " : "bg-white dark:bg-dark-field"}`}
        >
          <div className="flex items-start gap-2">
            <input
              type="radio"
              name="delivery"
              value="standard"
              checked={selectedDelivery === "standard"}
              onChange={() => setSelectedDelivery("standard")}
              className="mt-1 accent-primary-600"
            />
            <div className="text-right">
              <div className="flex-center gap-2">
                <div className="bg-gray-600 p-1 rounded-lg">
                  <Truck size={16} className=" text-white" />
                </div>
                <div className="text-xs">ارسال عادی</div>
              </div>
              <div className="text-[10px] text-gray-500 mt-2">۳۰ روز کاری</div>
            </div>
          </div>
        </label>

        {/* Express */}
        <label
          className={`cursor-pointer p-3 transition flex items-center justify-between
      ${selectedDelivery === "express" ? "bg-gray-100 dark:bg-dark-box " : "bg-white dark:bg-dark-field"}`}
        >
          <div className="flex items-start gap-2">
            <input
              type="radio"
              name="delivery"
              value="express"
              checked={selectedDelivery === "express"}
              onChange={() => setSelectedDelivery("express")}
              className="mt-1 accent-green-600"
            />
            <div className="text-right">
              <div className="flex-center gap-2">
                <div className="bg-green-500 p-1 rounded-lg">
                  <TruckFast size={16} className="text-white " />
                </div>
                <div className="text-xs">ارسال اکسپرس</div>
              </div>
              <div className="text-[10px] text-gray-500 mt-2">۲۰ روز کاری</div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}





