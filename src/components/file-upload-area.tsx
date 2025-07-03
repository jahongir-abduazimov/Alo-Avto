"use client";

import type React from "react";

import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadAreaProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export function FileUploadArea({
  onFileSelect,
  className,
}: FileUploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center transition-colors",
        isDragOver
          ? "border-blue-500 bg-blue-50"
          : "border-blue-300 bg-transparent",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center space-y-2"
      >
        <Upload className="h-8 w-8 text-gray-400" />
        <span className="text-gray-600 font-medium">Загрузить чек</span>
      </label>
    </div>
  );
}
