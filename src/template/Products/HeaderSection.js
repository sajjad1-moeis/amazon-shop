import SwitchButton from "@/components/SwitchButton";
import { Button } from "@/components/ui/button";
import { ArrowDown2, Candle, Element3, RowVertical, Sort } from "iconsax-reactjs";
import React from "react";

const VIEW_MODES = [
  { id: "grid", icon: Element3 },
  { id: "list", icon: RowVertical },
];

function HeaderSection({ viewMode, setViewMode }) {
  return (
    <div className="max-lg:px-4 lg:container mt-4">
      <div className="flex-between">
        {/* LEFT */}
        <div className="flex-between gap-1">
          <p className="text-gray-600 dark:text-[#7B7F86]">نتیجه جستجو موبایل :</p>
          <p className="text-yellow-700 dark:text-yellow-600">24 محصول</p>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <div className="flex-between gap-2 max-md:hidden">
            {/* SORT BUTTON */}
            <Button
              variant="ghost"
              className="max-lg:hidden bg-gray-100 border dark:border-[#7B7F86] dark:text-dark-text dark:bg-dark-field border-gray-300 rounded-lg flex-between text-gray-500"
            >
              <Sort size={20} />
              مرتب سازی
              <ArrowDown2 size={18} />
            </Button>

            {/* DYNAMIC VIEW MODE BUTTONS */}
            {VIEW_MODES.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className={`border rounded-lg p-2 transition 
                ${
                  viewMode === id
                    ? "bg-primary-500 dark:bg-primary-400 dark:border-primary-400 text-white border-primary-500"
                    : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white"
                }
              `}
              >
                <Icon size={22} />
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="bg-gray-100 rounded-lg flex-between text-gray-600 lg:hidden dark:bg-dark-field dark:text-dark-titre"
          >
            <Candle size={16} />
            فیلترها
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
