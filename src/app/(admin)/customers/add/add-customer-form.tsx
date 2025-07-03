"use client";

import type React from "react";

import { useState, useRef, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ClientData {
  name: string;
  phone: string;
  email: string;
  telegram: string;
  address: string;
  passportImage: string | null;
  licenseImage: string | null;
  contractImage: string | null;
}

export default function AddClientForm() {
  const router = useRouter();
  const passportInputRef = useRef<HTMLInputElement | null>(null);
  const licenseInputRef = useRef<HTMLInputElement | null>(null);
  const contractInputRef = useRef<HTMLInputElement | null>(null);

  const [clientData, setClientData] = useState<ClientData>({
    name: "Kathryn Murphy",
    phone: "(270) 555-0117",
    email: "kathryn.murphy@example.com",
    telegram: "@gulomjon",
    address: "ул. Ранчвью, 3891, Ричардсон, Калифорния, 62639",
    passportImage: null,
    licenseImage: null,
    contractImage: null,
  });

  const handleInputChange = (field: keyof ClientData, value: string) => {
    setClientData({ ...clientData, [field]: value });
  };

  const handleImageUpload = (
    field: "passportImage" | "licenseImage" | "contractImage",
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientData({ ...clientData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    inputRef.current?.click();
  };

  const handleSave = () => {
    // Здесь будет логика сохранения
    console.log("Saving client data:", clientData);
    router.back();
  };

  const inputBaseClasses =
    "bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400";
  const inputHeightClass = "h-11";
  const labelBaseClasses = "text-xs text-gray-500 font-medium";

  return (
    <div>
      <div className="py-4 border-b border-gray-200">
        <div className="flex items-center mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mr-3 h-9 w-9 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">
            Добавить нового клиента
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-3.5 text-sm">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Введите имя</Label>
          <Input
            value={clientData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={cn(inputBaseClasses, inputHeightClass)}
            placeholder="Введите имя"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Мобильный номер</Label>
          <Input
            value={clientData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={cn(inputBaseClasses, inputHeightClass)}
            placeholder="Мобильный номер"
            type="tel"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Электронная почта</Label>
          <Input
            value={clientData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={cn(inputBaseClasses, inputHeightClass)}
            placeholder="Электронная почта"
            type="email"
          />
        </div>

        {/* Telegram Field */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Telegram-ник</Label>
          <Input
            value={clientData.telegram}
            onChange={(e) => handleInputChange("telegram", e.target.value)}
            className={cn(inputBaseClasses, inputHeightClass)}
            placeholder="Telegram-ник"
          />
        </div>

        {/* Address Field */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Адрес</Label>
          <textarea
            value={clientData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={cn(
              inputBaseClasses,
              "w-full p-2.5 h-auto min-h-[80px] resize-none"
            )}
            placeholder="Адрес"
            rows={3}
          />
        </div>

        {/* Passport Image Upload */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Данные паспорта</Label>
          <div
            className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => triggerFileInput(passportInputRef)}
          >
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <input
                type="file"
                ref={passportInputRef}
                onChange={(e) => handleImageUpload("passportImage", e)}
                accept="image/*"
                className="hidden"
              />
              {clientData.passportImage ? (
                <Image
                  width={56}
                  height={56}
                  src={clientData.passportImage || "/placeholder.svg"}
                  alt="Passport"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md mb-2"
                />
              ) : (
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-7 h-7 text-white" />
                </div>
              )}
              <p className="text-sm font-medium text-gray-800 mb-0.5">
                Загрузите изображение
              </p>
              <p className="text-xs text-gray-500">
                Поддерживаемые форматы: JPEG, PNG
              </p>
            </div>
          </div>
        </div>

        {/* License Image Upload */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Водительские права</Label>
          <div
            className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => triggerFileInput(licenseInputRef)}
          >
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <input
                type="file"
                ref={licenseInputRef}
                onChange={(e) => handleImageUpload("licenseImage", e)}
                accept="image/*"
                className="hidden"
              />
              {clientData.licenseImage ? (
                <Image
                  width={56}
                  height={56}
                  src={clientData.licenseImage || "/placeholder.svg"}
                  alt="License"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md mb-2"
                />
              ) : (
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-7 h-7 text-white" />
                </div>
              )}
              <p className="text-sm font-medium text-gray-800 mb-0.5">
                Загрузите изображение
              </p>
              <p className="text-xs text-gray-500">
                Поддерживаемые форматы: JPEG, PNG
              </p>
            </div>
          </div>
        </div>

        {/* Contract Image Upload */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Документ договора</Label>
          <div
            className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => triggerFileInput(contractInputRef)}
          >
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <input
                type="file"
                ref={contractInputRef}
                onChange={(e) => handleImageUpload("contractImage", e)}
                accept="image/*"
                className="hidden"
              />
              {clientData.contractImage ? (
                <Image
                  width={56}
                  height={56}
                  src={clientData.contractImage || "/placeholder.svg"}
                  alt="Contract"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md mb-2"
                />
              ) : (
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-7 h-7 text-white" />
                </div>
              )}
              <p className="text-sm font-medium text-gray-800 mb-0.5">
                Загрузите изображение
              </p>
              <p className="text-xs text-gray-500">
                Поддерживаемые форматы: JPEG, PNG
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-4 border-t border-gray-200 bg-white">
        <Button
          onClick={handleSave}
          className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm font-medium"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}
