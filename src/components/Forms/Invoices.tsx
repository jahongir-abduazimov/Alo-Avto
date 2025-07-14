"use client";

import { useState, ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createContract } from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";
import { X } from "lucide-react";

type InvoicesProps = {
  docType: string;
};

export default function Invoices({ docType }: InvoicesProps) {
  const [docName, setDocName] = useState(docType);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!docType || !docName || !file) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      await createContract(docType, docName, file);
      toast.success("Hujjat muvaffaqiyatli yuklandi!");
      window.open("/admin/documents", "_self");
    } catch (err: unknown) {
      let message = "Xatolik yuz berdi";
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message?: string }).message === "string"
      ) {
        message = (err as { message: string }).message;
      }
      toast.error("Xatolik: " + message);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="h-[100vh]">
      <div>
        <Label className="text-sm">Название</Label>
        <Input
          className="mt-1"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          placeholder="Введите название"
        />
      </div>

      <div>
        <Label className="text-sm">Файл</Label>
        <div className="flex items-start gap-4 mt-1">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            className="grow"
          />
          {previewUrl && (
            <div className="relative w-32 h-32">
              <Image
                src={previewUrl}
                alt="file preview"
                fill
                className="object-contain rounded border"
              />
              <button
                onClick={removeFile}
                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button variant="outline">Отменить</Button>
        <Button onClick={handleSubmit}>Сохранить</Button>
      </div>
    </div>
  );
}
