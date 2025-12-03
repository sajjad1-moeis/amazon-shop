import SwitchButton from "@/components/SwitchButton";
import { ArrowLeft } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeaderSection() {
  return (
    <div className="px-4 md:px-20 py-5 flex-between bg-white dark:bg-dark-field">
      <div class="hidden">
        <SwitchButton />
      </div>
      <Image alt="logo img" src="/image/logo-blue.png" className="dark:hidden" width={120} height={30} />
      <Image alt="logo img" src="/image/logo.png" className="hidden dark:block" width={120} height={30} />

      <Link href={"/cart"}>
        <ArrowLeft className="text-gray-600 dark:text-white" size={34} />
      </Link>
    </div>
  );
}

export default HeaderSection;
