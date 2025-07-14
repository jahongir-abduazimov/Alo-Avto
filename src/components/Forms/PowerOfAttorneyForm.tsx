"use client";

import { useRef, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
export default function PowerOfAttorneyForm() {
  const fileRef1 = useRef<HTMLInputElement>(null);
  const fileRef2 = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    ownerPassport: "",
    carPassport: "",
    diagnosticCard: "",
    trusteePassport: "",
    foreignPassport: "",
    absentCopy: "",
    notaryFee: "",
    spouseConsentText: "",
    documentMention: "",
    spouseAgree: true,
  });

  // Removed unused file1 and file2
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);

  const handleInput = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (index === 1) {
      // setFile1(file); // removed
      setPreview1(preview);
    } else {
      // setFile2(file); // removed
      setPreview2(preview);
    }
  };

  const removeFile = (index: number) => {
    if (index === 1) {
      // setFile1(null); // removed
      setPreview1(null);
      if (fileRef1.current) {
        fileRef1.current.value = "";
      }
    } else {
      // setFile2(null); // removed
      setPreview2(null);
      if (fileRef2.current) {
        fileRef2.current.value = "";
      }
    }
  };

  const renderInput = (
    label: string,
    key: keyof typeof form,
    placeholder = "Введите текст"
  ) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={form[key] as string}
        onChange={(e) => handleInput(key, e.target.value)}
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      <h3 className="text-lg font-semibold">От собственника авто доверителя</h3>
      <Separator />
      {renderInput("Паспорт гражданина республики узбекистан", "ownerPassport")}
      {renderInput("Техпаспорт на автомобиль", "carPassport")}
      {renderInput("Диагностическая карта если имеется", "diagnosticCard")}

      <h3 className="text-lg font-semibold pt-2">От доверенного лица</h3>
      {renderInput("Паспорт гражданина республики", "trusteePassport")}
      {renderInput("Удостоверение или загранпаспорт", "foreignPassport")}

      <div>
        <Label>Загрузить фото паспорта</Label>
        <div className="flex items-start gap-4 mt-1">
          <Input
            ref={fileRef1}
            type="file"
            onChange={(e) => handleFileChange(e, 1)}
          />
          {preview1 && (
            <div className="relative w-24 h-24">
              <Image
                src={preview1}
                alt="file1"
                fill
                className="object-contain rounded"
              />
              <button
                onClick={() => removeFile(1)}
                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {renderInput(
        "Копия паспорта если он не присутствует при оформлении",
        "absentCopy"
      )}

      <div>
        <Label>Загрузить фото паспорта (второй)</Label>
        <div className="flex items-start gap-4 mt-1">
          <Input
            ref={fileRef2}
            type="file"
            onChange={(e) => handleFileChange(e, 2)}
          />
          {preview2 && (
            <div className="relative w-24 h-24">
              <Image
                src={preview2}
                alt="file2"
                fill
                className="object-contain rounded"
              />
              <button
                onClick={() => removeFile(2)}
                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold pt-2">Дополнительно</h3>
      {renderInput("Оплата услуг нотариуса", "notaryFee")}
      <div className="flex items-center gap-2">
        <Label>Согласие супруга</Label>
        <Switch
          checked={form.spouseAgree}
          onCheckedChange={(val) => handleInput("spouseAgree", val)}
        />
      </div>
      {renderInput("ФИО супруга", "spouseConsentText")}
      {renderInput("В тексте доверенности указываются", "documentMention")}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Отм.</Button>
        <Button disabled>Генерирует и сохранит</Button>
      </div>
    </div>
  );
}
