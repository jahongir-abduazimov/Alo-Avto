import { AlignLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="bg-primary-500 max-w-md mx-auto z-[1000] left-0 px-4">
      <div className="flex justify-between items-center h-20">
        <Link href={"/customer"} className=" relative h-[21.29px] w-[157.17px]">
          <Image
            src="/images/logo-white.png"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="logo"
            fill
          />
        </Link>
        <button className="flex items-center gap-2 font-bold cursor-pointer">
          <div className="text-white">
            <AlignLeft className="size-5" />
          </div>{" "}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
