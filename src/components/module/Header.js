import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { DiscountShape, Heart, SearchNormal1, ShoppingCart } from "iconsax-reactjs";
import { HeadphonesIcon, LanguagesIcon, MenuIcon } from "lucide-react";
import TopBar from "./Topbar";
import Link from "next/link";
import BtnShowLoginModal from "../BtnShowLoginModal";

function Header() {
  return (
    <header className="">
      <div className="bg-primary-500 py-1.5">
        <div className="flex-between xl:container max-2xl:px-4">
          <div className="flex-between gap-2">
            <Image alt="logo img" src="/image/Header/paypal.png" width={65} height={48} />
            <p className="text-info-200 font-thin text-sm ">داری، کلیک کن</p>
          </div>
          <div class="flex-between">
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-xl px-3 py-1 text-[#FFCD38] max-md:hidden lg:hidden"
            >
              <DiscountShape variant="Bold" />
              <span className="text-sm">تخفیف های آمازون</span>
            </Button>
            <div class="lg:hidden">
              <Button variant="ghost" className="flex items-center gap-2 rounded-xl px-3 py-1 text-white">
                <LanguagesIcon size={18} variant="Bold" />
                <span className="text-sm">فارسی</span>
              </Button>
            </div>
          </div>
          <p className="text-primary-200 max-lg:hidden">
            تخفیف ویژه خرید اولی‌ها! تا ۵٪ هزینه خدمات کمتر برای اولین سفارش شما 🎁
          </p>
          <div className="flex-between gap-2 max-lg:hidden">
            <HeadphonesIcon className="text-primary-300" />
            <p className="text-primary-300">پشتیبانی 24 ساعته</p>
          </div>
        </div>
      </div>
      <div className="bg-primary-500 pt-2 lg:pt-5 pb-2" style={{ boxShadow: "0px 0px 0px 1px #FFFFFF40" }}>
        <div className="md:flex-between max-2xl:px-4 xl:container gap-10">
          <div class="flex-between max-lg:mb-2">
            <div class="flex-between">
              <button variant="ghost" className="flex items-center gap-2 rounded-xl px-3 py-1 text-white lg:hidden">
                <MenuIcon className="size-6" />
              </button>

              <Link href={"/"}>
                <img
                  alt="logo img"
                  src="/image/logo.png"
                  className=" w-full lg:h-12 h-9 md:min-w-36 lg:min-w-[170px]"
                />
              </Link>
            </div>

            <Button variant="ghost" className="flex items-center gap-2 rounded-xl px-3 py-1 text-[#FFCD38] md:hidden">
              <DiscountShape variant="Bold" />
              <span className="text-sm">تخفیف های آمازون</span>
            </Button>
          </div>
          <div className="flex w-full">
            <select className="bg-gray-100 p-2 rounded-r-lg text-gray-500" name="" id="">
              <option value="asd" className="text-gray-500">
                آمازون
              </option>
            </select>
            <div className="bg-white w-full rounded-l-lg p-1 flex-between">
              <input
                type="text"
                className="px-2 outline-none placeholder:max-md:text-xs"
                placeholder="جستجو در امارت و آمریکا"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 flex-between rounded-xl px-3 py-2">
                <SearchNormal1 className="max-lg:size-6" /> <span className="max-lg:hidden">جستجو</span>
              </button>
            </div>
          </div>
          <div className="flex-between text-white gap-3 max-md:hidden">
            <div className="p-3 rounded-lg border-2 border-white max-lg:hidden">
              <Heart />
            </div>
            <Link href={"/cart"}>
              <div className="p-3 rounded-lg border-2 border-white relative">
                <div class="absolute size-5 bg-primary-400 text-white flex-center rounded -top-2 -right-2">0</div>
                <ShoppingCart />
              </div>
            </Link>

            <BtnShowLoginModal />
          </div>
        </div>
      </div>
      <TopBar />
    </header>
  );
}

export default Header;
