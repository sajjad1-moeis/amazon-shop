import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ShieldTick, Trash, TruckFast } from "iconsax-reactjs";
import { Link2Icon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function CartItem() {
  return (
    <Card className="rounded-xl border overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition p-0">
      <CardContent className="p-0 grid grid-cols-3 sm:grid-cols-4 md:gap-4 ">
        <div class="">
          <div className="relative aspect-square max-h-32 h-full md:max-h-56 w-full">
            <Image
              src="/image/Home/product.png"
              alt={`محصول بازدید شده شماره `}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* LEFT SECTION (INFO) */}
        <div className="col-span-2 sm:col-span-3 p-3">
          <div className="flex flex-col gap-3 border-b pb-4 mb-4 border-gray-200">
            {/* TITLE */}
            <div className="flex justify-between items-start">
              <div className="">
                <h2 className="font-bold text-sm md:text-lg  text-neutral-800">
                  ساعت مچی مردانه Invicta مدل 0361 سری Reserve کرونوگراف
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  🟩
                  <Image src="/image/amazonLogo.png" alt={`عکس آمازون`} width={60} height={30} />
                </div>
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm cursor-pointer max-md:hidden">
                <Trash size={24} />
                <p>حذف </p>
              </div>
            </div>
          </div>
          <div>
            <div className="md:flex-between mt-3 w-full text-xs">
              <div className="flex-between max-md:justify-start text-gray-400 text-sm gap-2">
                <div className="size-4.5 bg-[#E2BB30] rounded-full" />
                <p>رنگ طلایی</p>
              </div>
              <div class="flex gap-1 md:gap-2 max-md:mt-3">
                <div className="flex-between bg-gray-100 border p-1 rounded-lg border-gray-200 max-md:text-xs text-sm gap-2 text-[#0554DB]">
                  <ShieldTick size={22} variant="Bold" />
                  <p>دارای سپر کیفیت</p>
                </div>
                <div className="flex-between bg-gray-100 border p-1 rounded-lg border-gray-200 max-md:text-xs text-sm gap-2 ">
                  <div className="bg-green-600 p-0.5 rounded-lg">
                    <TruckFast size={18} className="text-white" />
                  </div>
                  <p className="text-gray-400">20 روز کاری</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end mt-4 gap-6  max-md:hidden">
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <p>۱۲,۴۵۰,۰۰۰ تومان</p>
                  <div className="bg-primary-400 p-1.5 px-2 rounded-lg text-xs text-white">19%</div>
                </div>
                <div className="flex-between gap-2 mt-2">
                  <p className="text-gray-400 text-sm">۱۲,۴۵۰,۰۰۰ تومان</p>
                </div>
              </div>
              <div className="grid  gap-6">
                <ButtonGroup aria-label="Media controls" className="h-fit">
                  <Button variant="ghost" className="bg-primary-700 size-8 text-white !rounded-lg">
                    <MinusIcon />
                  </Button>
                  <Button size="icon" variant="link" className="size-8">
                    5
                  </Button>
                  <Button variant="ghost" className="bg-primary-700 size-8 text-white !rounded-lg">
                    <PlusIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="flex justify-between items-end  gap-6 md:hidden p-4">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <p>۱۲,۴۵۰,۰۰۰ تومان</p>
            <div className="bg-primary-400 p-1.5 px-2 rounded-lg text-xs text-white">19%</div>
          </div>
          <div className="flex-between gap-2 mt-2">
            <p className="text-gray-400 text-sm">۱۲,۴۵۰,۰۰۰ تومان</p>
          </div>
        </div>
        <div className="grid  gap-6">
          <ButtonGroup aria-label="Media controls" className="h-fit">
            <Button variant="ghost" className="bg-primary-700 size-8 text-white !rounded-lg">
              <MinusIcon />
            </Button>
            <Button size="icon" variant="link" className="size-8">
              5
            </Button>
            <Button variant="ghost" className="bg-primary-700 size-8 text-white !rounded-lg">
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
