"use client";

import { useState, useRef, type ChangeEvent } from "react"; // Added useRef and ChangeEvent
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Plus,
  Info,
  CalendarIcon as LucideCalendarIcon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";
import Image from "next/image";

export default function CarForm() {
  const [activeTab, setActiveTab] = useState("purchase");
  const [dateStart, setDateStart] = useState<Date | undefined>();
  const [dateEnd, setDateEnd] = useState<Date | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  const [carData, setCarData] = useState({
    brand: "Porsche",
    model: "911 GT3",
    configuration: "Базовая комплектация",
    year: "2002",
    gostNumber: "01 A 125 AB",
    color: "Белый",
    mileage: "300",
    condition: "Совсем новый",
    seats: "2",
    dryPrice: "1 400 000",
    actualPrice: "1 400 000",
    drySaleStatus: "active",
    buyoutPrice: "17 200",
    rate: "30%",
    buyoutStatus: "Сдан",
    purchaseSum: "1 400 000",
    complectName: "",
    complectPrice: "1 400 000",
    complectTotalPrice: "1 400 000",
    repairName: "",
    repairPriceFor: "",
    purchaseComment: "",
    purchaseStatus: "Новый",
    uploadedCarImage: null as string | null, // This will store the Data URL of the image
    beforeImage: "/images/before.png",
    afterImage: "/images/after.png",
  });

  const handlePlusButtonClick = () => {
    fileInputRef.current?.click(); // Trigger click on hidden file input
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCarData({ ...carData, uploadedCarImage: reader.result as string });
        };
        reader.readAsDataURL(file);
      } else {
        // Handle non-image file type if needed, e.g., show an error
        alert("Пожалуйста, выберите файл изображения.");
      }
    }
  };

  const handleImageRemove = () => {
    setCarData({ ...carData, uploadedCarImage: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input value
    }
  };

  const inputBaseClasses =
    "bg-white border border-gray-300 w-full rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400";
  const inputHeightClass = "h-11";
  const smallInputHeightClass = "h-10";
  const labelBaseClasses = "text-xs text-gray-500 font-medium";
  const sectionClasses = "p-3.5 bg-slate-50 rounded-lg space-y-3";
  const plusButtonClasses =
    "bg-white border-gray-300 w-10 h-10 hover:bg-gray-100 text-gray-600 rounded-md";

  return (
    // <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
    <div className="w-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 mb-3.5">
          {activeTab === "purchase" ? "Закуп" : "Добавление новой машины"}
        </h1>
        <div className="flex gap-2">
          {[
            { id: "dry-sale", label: "Сухой продажи" },
            { id: "buyout", label: "Для Выкупа" },
            { id: "purchase", label: "Закуп" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 rounded-full text-xs h-8 font-medium",
                activeTab === tab.id
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-3.5 text-sm">
        {/* Common Fields */}
        {[
          {
            label: "Марка автомобиля",
            field: "brand",
            type: "select",
            options: ["Porsche"],
          },
          {
            label: "Модель автомобиля",
            field: "model",
            type: "select",
            options: ["911 GT3"],
          },
          {
            label: "Комплектация",
            field: "configuration",
            type: "select",
            options: ["Базовая комплектация"],
          },
          { label: "Год выпуска", field: "year", type: "input" },
          { label: "Номер ГОСТ", field: "gostNumber", type: "input" },
          { label: "Цвет автомобиля", field: "color", type: "input" },
          { label: "Пробег", field: "mileage", type: "input" },
          {
            label: "Состояние",
            field: "condition",
            type: "select",
            options: ["Совсем новый"],
          },
          {
            label: "Количество мест",
            field: "seats",
            type: "select",
            options: ["2"],
          },
        ].map((item) => (
          <div className="space-y-1.5" key={item.field}>
            <Label className={labelBaseClasses}>{item.label}</Label>
            {item.type === "select" ? (
              <Select
                value={carData[item.field as keyof typeof carData] as string}
                onValueChange={(value) =>
                  setCarData({ ...carData, [item.field]: value })
                }
              >
                <SelectTrigger
                  className={cn(inputBaseClasses, inputHeightClass)}
                >
                  <SelectValue
                    placeholder={`Выберите ${item.label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {item.options?.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={carData[item.field as keyof typeof carData] as string}
                onChange={(e) =>
                  setCarData({ ...carData, [item.field]: e.target.value })
                }
                className={cn(inputBaseClasses, inputHeightClass)}
              />
            )}
          </div>
        ))}

        {/* Price Fields (Conditional) */}
        {(activeTab === "dry-sale" || activeTab === "buyout") && (
          <>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <Label className={labelBaseClasses}>Цена сухой продаже</Label>
                <Info size={14} className="text-gray-400" />
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  value={carData.dryPrice}
                  onChange={(e) =>
                    setCarData({ ...carData, dryPrice: e.target.value })
                  }
                  className={cn(inputBaseClasses, inputHeightClass, "pl-7")}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <Label className={labelBaseClasses}>Фактически продано</Label>
                <Info size={14} className="text-gray-400" />
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  value={carData.actualPrice}
                  onChange={(e) =>
                    setCarData({ ...carData, actualPrice: e.target.value })
                  }
                  className={cn(inputBaseClasses, inputHeightClass, "pl-7")}
                />
              </div>
            </div>
          </>
        )}
        {activeTab === "buyout" && (
          <>
            <div className="space-y-1.5">
              <Label className={labelBaseClasses}>Продажа с выкупом</Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  value={carData.buyoutPrice}
                  onChange={(e) =>
                    setCarData({ ...carData, buyoutPrice: e.target.value })
                  }
                  className={cn(inputBaseClasses, inputHeightClass, "pl-7")}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className={labelBaseClasses}>Ставка</Label>
              <Select
                value={carData.rate}
                onValueChange={(value) =>
                  setCarData({ ...carData, rate: value })
                }
              >
                <SelectTrigger
                  className={cn(inputBaseClasses, inputHeightClass)}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30%">30%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className={labelBaseClasses}>Статус</Label>
              <RadioGroup
                value={carData.buyoutStatus}
                onValueChange={(value) =>
                  setCarData({ ...carData, buyoutStatus: value })
                }
                className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1"
              >
                {["Сдан", "Возврат", "На продажу", "Свободно", "Пересдача"].map(
                  (s) => (
                    <div className="flex items-center space-x-2" key={s}>
                      <RadioGroupItem value={s} id={`buyout-${s}`} />
                      <Label
                        htmlFor={`buyout-${s}`}
                        className="text-xs font-normal text-gray-700"
                      >
                        {s}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>
          </>
        )}
        {activeTab === "dry-sale" && (
          <div className="space-y-1.5">
            <Label className={labelBaseClasses}>Статус</Label>
            <RadioGroup
              value={carData.drySaleStatus}
              onValueChange={(value) =>
                setCarData({ ...carData, drySaleStatus: value })
              }
              className="flex gap-4 pt-1"
            >
              {[
                { v: "active", l: "Актив" },
                { v: "sold", l: "Продано" },
              ].map((s) => (
                <div className="flex items-center space-x-2" key={s.v}>
                  <RadioGroupItem value={s.v} id={`dry-${s.v}`} />
                  <Label
                    htmlFor={`dry-${s.v}`}
                    className="text-xs font-normal text-gray-700"
                  >
                    {s.l}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* "Закуп" Tab Specific Fields */}
        {activeTab === "purchase" && (
          <>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <Label className={labelBaseClasses}>Сумма</Label>{" "}
                <Info size={14} className="text-gray-400" />
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  value={carData.purchaseSum}
                  onChange={(e) =>
                    setCarData({ ...carData, purchaseSum: e.target.value })
                  }
                  className={cn(inputBaseClasses, inputHeightClass, "pl-7")}
                />
              </div>
            </div>
            <div className={sectionClasses}>
              <Label className="text-sm text-gray-700 font-medium block mb-1.5">
                Укомплектующий
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  value={carData.complectName}
                  onChange={(e) =>
                    setCarData({ ...carData, complectName: e.target.value })
                  }
                  className={cn(
                    inputBaseClasses,
                    smallInputHeightClass,
                    "flex-1"
                  )}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className={plusButtonClasses}
                >
                  <Plus size={18} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Label
                    className={cn(
                      labelBaseClasses,
                      "absolute -top-1.5 left-2 bg-slate-50 px-1 text-gray-400"
                    )}
                  >
                    Цена
                  </Label>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    $
                  </span>
                  <Input
                    value={carData.complectPrice}
                    onChange={(e) =>
                      setCarData({
                        ...carData,
                        complectPrice: e.target.value,
                      })
                    }
                    className={cn(
                      inputBaseClasses,
                      smallInputHeightClass,
                      "pl-7 w-full"
                    )}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className={plusButtonClasses}
                >
                  <Plus size={18} />
                </Button>
              </div>
              <div className="relative">
                <Label
                  className={cn(
                    labelBaseClasses,
                    "absolute -top-1.5 left-2 bg-slate-50 px-1 text-gray-400"
                  )}
                >
                  Итоговая цена
                </Label>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  value={carData.complectTotalPrice}
                  readOnly
                  className={cn(
                    inputBaseClasses,
                    smallInputHeightClass,
                    "pl-7"
                  )}
                />
              </div>
            </div>
            <div className={sectionClasses}>
              <Label className="text-sm text-gray-700 font-medium block mb-1.5">
                Ремонт
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  value={carData.repairName}
                  onChange={(e) =>
                    setCarData({ ...carData, repairName: e.target.value })
                  }
                  className={cn(
                    inputBaseClasses,
                    smallInputHeightClass,
                    "flex-1"
                  )}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className={plusButtonClasses}
                >
                  <Plus size={18} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Для цены ремонта"
                  value={carData.repairPriceFor}
                  onChange={(e) =>
                    setCarData({ ...carData, repairPriceFor: e.target.value })
                  }
                  className={cn(
                    inputBaseClasses,
                    smallInputHeightClass,
                    "flex-1"
                  )}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className={plusButtonClasses}
                >
                  <Plus size={18} />
                </Button>
              </div>

              <div>
                <Label className={labelBaseClasses}>
                  Календарь для выбора даты
                </Label>
                <div
                  className={cn(
                    "flex mt-1 border border-gray-300 rounded-lg overflow-hidden",
                    inputBaseClasses, // Apply base input styles for border, bg, text color
                    smallInputHeightClass, // Apply height
                    "p-0 items-stretch focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500" // Ring on container
                  )}
                >
                  {[
                    {
                      date: dateStart,
                      setDate: setDateStart,
                      placeholder: "Начало",
                    },
                    {
                      date: dateEnd,
                      setDate: setDateEnd,
                      placeholder: "Конец",
                    },
                  ].map((picker, index) => (
                    <Popover key={index}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"} // Changed to ghost for seamless look
                          className={cn(
                            "w-1/2 justify-start text-left font-normal h-full border-0 rounded-none focus:ring-0 focus:outline-none", // Removed individual focus rings
                            index === 0 && "border-r border-gray-300",
                            !picker.date && "text-gray-500"
                          )}
                        >
                          <LucideCalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                          {picker.date && isValid(picker.date) ? (
                            format(picker.date, "dd.MM")
                          ) : (
                            <span className="text-xs">
                              {picker.placeholder}
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={picker.date}
                          onSelect={picker.setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className={labelBaseClasses}>Комментарий</Label>
              <textarea
                value={carData.purchaseComment}
                onChange={(e) =>
                  setCarData({ ...carData, purchaseComment: e.target.value })
                }
                rows={3}
                className={cn(inputBaseClasses, "w-full p-2.5 h-auto")}
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelBaseClasses}>Статус</Label>
              <RadioGroup
                value={carData.purchaseStatus}
                onValueChange={(value) =>
                  setCarData({ ...carData, purchaseStatus: value })
                }
                className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 pt-1"
              >
                {[
                  "Новый",
                  "Не требуется",
                  "Ремонт",
                  "В ремонте",
                  "В подготовке",
                  "Готово",
                ].map((s) => (
                  <div className="flex items-center space-x-2" key={s}>
                    <RadioGroupItem value={s} id={`purchase-${s}`} />
                    <Label
                      htmlFor={`purchase-${s}`}
                      className="text-xs font-normal text-gray-700"
                    >
                      {s}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-1.5">
              <Label className={labelBaseClasses}>До/После</Label>
              <div className="grid grid-cols-2 gap-2">
                <Image
                  width={300}
                  height={200}
                  src={carData.beforeImage || "/before.png"}
                  alt="Before"
                  className="rounded-lg object-cover w-full aspect-[3/2]"
                />
                <Image
                  width={300}
                  height={200}
                  src={carData.afterImage || "/placeholder.svg"}
                  alt="After"
                  className="rounded-lg object-cover w-full aspect-[3/2]"
                />
              </div>
            </div>
          </>
        )}

        {/* Photo Upload */}
        <div className="space-y-1.5">
          <Label className={labelBaseClasses}>Фотография автомобиля</Label>
          <Card className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl">
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center justify-center gap-3 mb-2">
                {carData.uploadedCarImage ? (
                  <div className="relative">
                    <Image
                      width={56}
                      height={56}
                      src={carData.uploadedCarImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 p-0 hover:bg-red-600 shadow-md"
                      onClick={handleImageRemove}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ) : (
                  // This div is a placeholder to maintain layout when no image is uploaded.
                  // It ensures the "+" button doesn't shift.
                  // You can style it or leave it empty if the "+" button's position is fine without it.
                  <div className="w-14 h-14" />
                )}
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  onClick={handlePlusButtonClick} // Changed to trigger file input
                >
                  <Plus size={28} />
                </Button>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-0.5">
                Загрузите изображение
              </p>
              <p className="text-xs text-gray-500">
                Поддерживаемые форматы: JPEG, PNG, MP4, GIF
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex gap-3 p-4 border-t border-gray-200 bg-white">
        <Button
          variant="outline"
          className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 h-10 text-sm font-medium"
        >
          Удалить
        </Button>
        <Button className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm font-medium">
          Сохранить
        </Button>
      </div>
    </div>
    // </div>
  );
}
