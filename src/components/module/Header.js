import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Heart, SearchNormal, SearchNormal1, ShoppingCart, User } from "iconsax-reactjs";
import { HeadphonesIcon } from "lucide-react";
import TopBar from "./Topbar";
import Link from "next/link";

function Header() {
  return (
    <header className="">
      <div className="bg-primary-500 py-1.5">
        <div className="flex-between container">
          <div className="flex-between gap-2">
            <Image alt="logo img" src="/image/Header/paypal.png" width={65} height={48} />
            <p className="text-info-200 font-thin text-sm">داری، کلیک کن</p>
          </div>
          <p className="text-primary-200">تخفیف ویژه خرید اولی‌ها! تا ۵٪ هزینه خدمات کمتر برای اولین سفارش شما 🎁</p>
          <div className="flex-between gap-2">
            <HeadphonesIcon className="text-primary-300" />
            <p className="text-primary-300">پشتیبانی 24 ساعته</p>
          </div>
        </div>
      </div>
      <div className="bg-primary-500 pt-5 pb-2" style={{ boxShadow: "0px 0px 0px 1px #FFFFFF40" }}>
        <div className="flex-between container gap-10">
          <Link href={"/"}>
            <Image alt="logo img" src="/image/logo.png" width={170} height={48} />
          </Link>
          <div className="flex w-full">
            <select className="bg-gray-100 p-2 rounded-r-lg text-gray-500" name="" id="">
              <option value="asd" className="text-gray-500">
                آمازون
              </option>
            </select>
            <div className="bg-white w-full rounded-l-lg p-1 flex-between">
              <input type="text" className="px-2 outline-none " placeholder="جستجو در امارت و آمریکا" />
              <Button className="bg-yellow-500 text-primary-800 flex-flex-between rounded-xl">
                <SearchNormal1 /> جستجو
              </Button>
            </div>
          </div>
          <div className="flex-between text-white gap-3">
            <div className="p-3 rounded-lg border-2 border-white">
              <Heart />
            </div>
            <Link href={"/cart"}>
              <div className="p-3 rounded-lg border-2 border-white">
                <ShoppingCart />
              </div>
            </Link>
            <div className="p-3 rounded-lg border-2 border-white">
              <User />
            </div>
          </div>
        </div>
      </div>
      <TopBar />
    </header>
  );
}

export default Header;
