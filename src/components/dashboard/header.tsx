import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderDashboard() {
  return (
    <div className="flex justify-between items-center h-20">
      <Link href={"/customer"} className=" relative h-[21.29px] w-[157.17px]">
        <Image
          src="/images/logo.png"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="logo"
          fill
        />
      </Link>
      <button className="flex items-center gap-2 font-bold cursor-pointer">
        <div className="p-1 rounded-md text-white bg-black">
          <Plus className="size-4" />
        </div>{" "}
        Add App
      </button>
    </div>
  );
}
