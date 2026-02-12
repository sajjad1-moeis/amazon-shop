import Image from "next/image";
import React from "react";
import { Heart, ShoppingCart } from "iconsax-reactjs";
import { HeadphonesIcon } from "lucide-react";
import TopBar from "./Topbar";
import Link from "next/link";
import BtnShowLoginModal from "../BtnShowLoginModal";
import SwitchButton from "../SwitchButton";
import DiscountAmazonButton from "../DiscountAmazonButton";
import DrawerMobile from "./DrawerMobile";
import SearchDropdown from "./SearchDropdown";

function Header() {
  return (
    <header className="w-full ">
      <div className="dark:bg-dark-header bg-primary-500 py-1.5 ">
        <div className="flex-between xl:container max-2xl:px-4 ">
          <div className="flex-between gap-2">
            <Image alt="logo img" src="/image/Header/paypal.png" width={65} height={48} />
            <p className="dark:text-[#D4F4FF] text-info-200 font-thin text-sm ">داری، کلیک کن</p>
          </div>
          <div className="flex-between ">
            <DiscountAmazonButton className={"max-md:hidden lg:hidden"} />
            <div className="lg:hidden">
              <SwitchButton />
            </div>
          </div>
          <p className="dark:text-[#DCE1FF] text-primary-200 max-lg:hidden">
            تخفیف ویژه خرید اولی‌ها! تا ۵٪ هزینه خدمات کمتر برای اولین سفارش شما 🎁
          </p>
          <div className="flex-between gap-2 max-lg:hidden">
            <HeadphonesIcon className="dark:text-[#E9F0FF] text-primary-300" />
            <p className="dark:text-[#E9F0FF] text-primary-300">پشتیبانی 24 ساعته</p>
          </div>
        </div>
      </div>
      <div
        className="dark:bg-dark-header bg-primary-500 pt-2 lg:pt-5 pb-2"
        style={{ boxShadow: "0px 0px 0px 1px #FFFFFF40" }}
      >
        <div className="max-md:flex-col flex-between  max-2xl:px-3 xl:container gap-2 md:gap-10  w-full">
          <div className="flex-between max-lg:mb-2 min-w-0 max-md:w-full">
            <div className="flex-between min-w-0">
              <DrawerMobile />
              <Link href={"/"} className="flex-shrink-0">
                <Image
                  alt="لوگو میکرولس"
                  src="/image/logo.png"
                  width={170}
                  height={48}
                  className="w-full lg:h-12 h-9 md:min-w-36 lg:min-w-[170px]"
                  priority
                />
              </Link>
            </div>

            <DiscountAmazonButton className={"md:hidden flex-shrink-0"} />
          </div>
          <SearchDropdown />
          <div className="flex-between text-white gap-3 max-md:hidden">
            <Link href={"/dashboard/favorites"}>
              <div className="p-3 rounded-lg border-2 dark:border-[#898989] dark:text-[#898989] border-white max-lg:hidden">
                <Heart />
              </div>
            </Link>
            <Link href={"/cart"}>
              <div className="p-3 rounded-lg border-2 dark:border-[#898989] dark:text-[#898989] border-white relative">
                <div className="absolute size-5 bg-primary-400 text-white flex-center rounded -top-2 -right-2">0</div>
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
