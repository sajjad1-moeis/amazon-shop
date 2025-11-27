import React, { useState } from "react";
import { Trash } from "iconsax-reactjs";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const shops = [
  { name: "همه", id: "a1" },
  { name: "آمازون عمارات", id: "a2" },
  { name: "آمازون آمریکا", id: "a3" },
];

function FiltersSection({ dynamicFilters, isInventory }) {
  const [checkedOptions, setCheckedOptions] = useState({});

  const handleCheckboxChange = (filterId, optionId) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [filterId]: {
        ...prev[filterId],
        [optionId]: !prev[filterId]?.[optionId],
      },
    }));
  };

  const isAnyChecked = (filterId) => checkedOptions[filterId] && Object.values(checkedOptions[filterId]).some(Boolean);

  return (
    <div
      className="p-4 bg-white rounded-xl"
      style={{
        boxShadow: "0px 1px 6px 0px #0000000F",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-800">فیلتر ها</p>
        <div className="flex items-center gap-1 text-red-600 text-xs cursor-pointer">
          <Trash size={16} />
          <p>حذف همه</p>
        </div>
      </div>

      {/* Shops */}
      <div className="mt-7 border-b border-gray-200 pb-4 mb-4">
        <p>فروشگاه</p>
        <div className="flex flex-col gap-5 mt-4">
          {shops.map((shop) => (
            <div key={shop.id} className="flex items-center gap-3">
              <Checkbox
                className="data-[state=checked]:bg-primary-500 border rounded"
                checkClassName="text-white"
                id={shop.id}
              />
              <Label className="cursor-pointer" htmlFor={shop.id}>
                {shop.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Switch */}
      {isInventory && (
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="airplane-mode">فقط کالاهای موجود</Label>
            <Switch className="data-[state=checked]:bg-primary-500" dir="ltr" id="airplane-mode" />
          </div>
        </div>
      )}

      {/* Dynamic Filters Accordion */}
      <Accordion type="multiple">
        {dynamicFilters?.map((filter) => (
          <AccordionItem key={filter.id} value={filter.id}>
            <AccordionTrigger className="flex items-center justify-between py-5">
              <span className="flex items-center gap-2">
                {filter.label}
                {isAnyChecked(filter.id) && <span className="w-2 h-2 bg-primary-400 rounded-full"></span>}
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-2">
              {filter.options.map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                  <Checkbox
                    id={option.id}
                    checked={!!checkedOptions[filter.id]?.[option.id]}
                    onCheckedChange={() => handleCheckboxChange(filter.id, option.id)}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FiltersSection;
