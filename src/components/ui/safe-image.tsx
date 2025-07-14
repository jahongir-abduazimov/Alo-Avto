"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallback?: React.ReactNode;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallback,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gray-200 border rounded-md flex items-center justify-center text-gray-500 text-xs ${className}`}
        style={{ width, height }}
      >
        {fallback || "🚗"}
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <div
          className={`bg-gray-100 border rounded-md flex items-center justify-center text-gray-400 text-xs ${className}`}
          style={{ width, height }}
        >
          Loading...
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"}`}
        onError={(e) => {
          console.warn(`Failed to load image: ${src}`, e);
          setHasError(true);
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
