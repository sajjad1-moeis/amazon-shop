import { ArrowLeft } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeaderSection() {
  return (
    <div className="px-20 py-5 flex-between bg-white">
      <Image alt="logo img" src="/image/logo-blue.png" width={165} height={30} />

      <Link href={"/cart"}>
        <ArrowLeft className="text-gray-600" size={34} />
      </Link>
    </div>
  );
}

export default HeaderSection;
