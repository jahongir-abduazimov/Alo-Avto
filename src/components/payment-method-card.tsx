"use client";

import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import Image from "next/image";

interface PaymentMethodCardProps {
  id: string;
  name: string;
  logo: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled: boolean;
  numer: number;
  date: string;
}

export function PaymentMethodCard({
  id,
  name,
  logo,
  isSelected,
  onSelect,
  disabled,
  numer,
  date,
}: PaymentMethodCardProps) {
  return (
    <button
      onClick={() => !disabled && onSelect(id)}
      className={cn(
        "rounded-xl border-2 flex items-center py-2 relative justify-center bg-white transition-colors",
        isSelected
          ? "border-green-500 bg-green-50"
          : "border-gray-200 hover:border-gray-300",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
    >
      <Icon name={name} size={40} />
      <Image className="object-contain aspect-1/1" src={logo} alt={name} fill />
      {/* <div className="text-xs font-semibold text-gray-700">{name}</div> */}
    </button>
  );
}
