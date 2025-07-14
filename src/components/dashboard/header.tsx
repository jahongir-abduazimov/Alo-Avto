import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToHomePrompt from "@/components/AddHomePrompt";

export default function HeaderDashboard() {
  const [showAddHome, setShowAddHome] = React.useState(false);
  return (
    <div className="flex justify-between items-center h-24 py-12">
      <Link href={"/"} className=" relative h-[21.29px] w-[157.17px]">
        <Image
          src="/images/logo.png"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="logo"
          fill
        />
      </Link>
      <button
        className="flex items-center gap-2 font-bold cursor-pointer"
        onClick={() => setShowAddHome(true)}
      >
        <div className="p-1 rounded-md text-white bg-black">
          <Plus className="size-4" />
        </div>
        Add App
      </button>
      <AddToHomePrompt
        open={showAddHome}
        onClose={() => setShowAddHome(false)}
      />
    </div>
  );
}
