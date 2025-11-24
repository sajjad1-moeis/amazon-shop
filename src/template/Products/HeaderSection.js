import { Button } from "@/components/ui/button";
import { ArrowDown2, Element3, RowVertical, Sort } from "iconsax-reactjs";
import React from "react";

const VIEW_MODES = [
  { id: "grid", icon: Element3 },
  { id: "list", icon: RowVertical },
];

function HeaderSection({ viewMode, setViewMode }) {
  return (
    <div className="container mt-4">
      <div className="flex-between">
        {/* LEFT */}
        <div className="flex-between gap-1">
          <p className="text-gray-600">نتیجه جستجو موبایل :</p>
          <p className="text-yellow-700">24 محصول</p>
        </div>

        {/* RIGHT */}
        <div className="flex-between gap-2">
          {/* SORT BUTTON */}
          <Button variant="ghost" className="bg-gray-100 border border-gray-300 rounded-lg flex-between text-gray-500">
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
                    ? "bg-primary-500 text-white border-primary-500"
                    : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-primary-500 hover:text-white"
                }
              `}
            >
              <Icon size={22} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
