import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  padding?: boolean;
  bg?: string;
  minHeight?: boolean;
  className?: string;
}
export default function Container({
  children,
  padding = true,
  bg,
  minHeight = true,
  className,
}: Props) {
  return (
    <div
      className={cn(
        `max-w-md mx-auto ${bg ? bg : "bg-white"} ${
          minHeight ? "min-h-screen" : ""
        }    ${padding ? "px-4" : ""}`,
        className
      )}
    >
      {children}
    </div>
  );
}
