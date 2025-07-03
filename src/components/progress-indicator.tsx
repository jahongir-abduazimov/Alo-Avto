"use client";

import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  percentage: number;
  className?: string;
}

export function ProgressIndicator({
  percentage,
  className = "",
}: ProgressIndicatorProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full bg-primary-100 w-full border ${className}`}
    >
      <div
        style={{ width: `${percentage}%` }}
        className={cn(
          `bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold`,
          percentage <= 10 ? "flex justify-center items-center" : ""
        )}
      >
        {percentage}%
      </div>
    </div>
  );
}
