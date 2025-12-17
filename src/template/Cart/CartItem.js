"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldTick, Trash, TruckFast } from "iconsax-reactjs";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { toast } from "sonner";

function CartItem({ item, onUpdate }) {
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setLoading(true);
      await shoppingCartService.updateItemQuantity(item.id, newQuantity);
      setQuantity(newQuantity);
      onUpdate?.();
      toast.success("تعداد به‌روزرسانی شد");
    } catch (error) {
      toast.error("خطا در به‌روزرسانی تعداد");
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      await shoppingCartService.removeItem(item.id);
      toast.success("محصول از سبد خرید حذف شد");
      onUpdate?.();
    } catch (error) {
      toast.error("خطا در حذف محصول");
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const product = item?.product || {};
  const price = item?.price || 0;
  const discount = item?.discount || 0;
  const originalPrice = discount > 0 ? price / (1 - discount / 100) : price;

  return (
    <Card className="rounded-xl border overflow-hidden border-gray-200 dark:bg-dark-box  dark:border-dark-field shadow-sm hover:shadow-md transition p-0">
      <CardContent className="p-0 grid grid-cols-3 sm:grid-cols-4 md:gap-4 ">
        <div className="">
          <div className="relative aspect-square max-h-32 h-full md:max-h-56 w-full">
            <Image
              src={product.image || "/image/Home/product.png"}
              alt={product.name || "محصول"}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-3 p-3">
          <div className="flex flex-col gap-3 border-b pb-4 mb-4 border-gray-200 dark:border-dark-stroke">
            <div className="flex justify-between items-start">
              <div className="">
                <h2 className="font-bold text-sm md:text-lg  text-neutral-800 dark:text-dark-titre">
                  {product.name || "محصول"}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  🟩
                  <Image src="/image/amazonLogo.png" alt={`عکس آمازون`} width={60} height={30} />
                </div>
              </div>
              <div
                className="flex items-center gap-1 text-red-600 text-sm cursor-pointer max-md:hidden"
                onClick={handleRemove}
              >
                <Trash size={24} />
                <p>حذف </p>
              </div>
            </div>
          </div>
          <div>
            <div className="md:flex-between mt-3 w-full text-xs">
              <div className="flex-between max-md:justify-start text-gray-400 text-sm gap-2">
                {item?.variant && (
                  <>
                    <div className="size-4.5 bg-[#E2BB30] rounded-full" />
                    <p>{item.variant}</p>
                  </>
                )}
              </div>
              <div className="flex gap-1 md:gap-2 max-md:mt-3">
                <div className="flex-between bg-gray-100 dark:bg-dark-field dark:border-0 border p-1 rounded-lg border-gray-200 max-md:text-xs text-sm gap-0.5 md:gap-2 text-[#0554DB]">
                  <ShieldTick size={22} variant="Bold" />
                  <p>دارای سپر کیفیت</p>
                </div>
                <div className="flex-between bg-gray-100 dark:bg-dark-field dark:border-0 border p-1 rounded-lg border-gray-200 max-md:text-xs text-sm gap-0.5 md:gap-2 ">
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
                  <p>{formatPrice(price * quantity)} تومان</p>
                  {discount > 0 && (
                    <div className="bg-primary-400 p-1.5 px-2 rounded-lg text-xs text-white">
                      {discount}%
                    </div>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex-between gap-2 mt-2">
                    <p className="text-gray-400 text-sm line-through">
                      {formatPrice(originalPrice * quantity)} تومان
                    </p>
                  </div>
                )}
              </div>
              <div className="grid  gap-6">
                <ButtonGroup aria-label="Media controls" className="h-fit">
                  <Button
                    variant="ghost"
                    className="bg-primary-700 dark:bg-dark-primary size-8 text-white !rounded-lg"
                    onClick={handleDecrease}
                    disabled={loading || quantity <= 1}
                  >
                    <MinusIcon />
                  </Button>
                  <Button size="icon" variant="link" className="size-8" disabled>
                    {quantity}
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-primary-700 dark:bg-dark-primary size-8 text-white !rounded-lg"
                    onClick={handleIncrease}
                    disabled={loading}
                  >
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
            <p>{formatPrice(price * quantity)} تومان</p>
            {discount > 0 && (
              <div className="bg-primary-400 p-1.5 px-2 rounded-lg text-xs text-white">{discount}%</div>
            )}
          </div>
          {discount > 0 && (
            <div className="flex-between gap-2 mt-2">
              <p className="text-gray-400 text-sm line-through">
                {formatPrice(originalPrice * quantity)} تومان
              </p>
            </div>
          )}
        </div>
        <div className="grid  gap-6">
          <ButtonGroup aria-label="Media controls" className="h-fit">
            <Button
              variant="ghost"
              className="bg-primary-700 size-8 text-white !rounded-lg"
              onClick={handleDecrease}
              disabled={loading || quantity <= 1}
            >
              <MinusIcon />
            </Button>
            <Button size="icon" variant="link" className="size-8" disabled>
              {quantity}
            </Button>
            <Button
              variant="ghost"
              className="bg-primary-700 size-8 text-white !rounded-lg"
              onClick={handleIncrease}
              disabled={loading}
            >
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </div>
        <div
          className="flex items-center gap-1 text-red-600 text-sm cursor-pointer md:hidden"
          onClick={handleRemove}
        >
          <Trash size={20} />
          <p>حذف</p>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
