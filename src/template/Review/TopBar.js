import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Candle, TickCircle } from "iconsax-reactjs";

const VIEW_MODES = [
  { id: "reviews", label: "فقط ویدیوها" },
  { id: "photos", label: "فقط تصاویر" },
];

export default function TopBar({ viewMode, setViewMode }) {
  return (
    <div className="flex-between max-md:flex-row-reverse">
      <div className="flex flex-wrap items-center gap-3 max-md:hidden">
        <div className="flex items-center gap-2 ">
          {VIEW_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setViewMode(mode.id)}
              className={cn(
                "rounded-lg flex-between gap-2 border px-3 h-10 text-sm font-medium transition",
                viewMode === mode.id ? " bg-primary-50 border-primary-300 shadow-sm text-primary-600" : "text-gray-500"
              )}
            >
              {viewMode === mode.id && <TickCircle variant="Bold" />}
              {mode.label}
            </button>
          ))}
        </div>
      </div>
      <div class="flex gap-2 max-md:justify-between max-md:w-full">
        <Button className="rounded-lg bg-primary-700 px-6 py-2 text-white shadow-[0_12px_30px_rgba(79,70,229,0.25)] hover:bg-indigo-700">
          ثبت تجربه جدید
        </Button>
        <Button variant="ghost" className="bg-gray-100 rounded-lg flex-between text-gray-600 lg:hidden">
          <Candle size={16} />
          فیلترها
        </Button>
      </div>
    </div>
  );
}
