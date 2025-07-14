// components/forms/CarReturnForm.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getBrands, getModels, getComplectations } from "@/lib/api";
import { TabNavigation } from "@/components/tab-navigation";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function CarEvaluationForm() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    engineVolume: "",
    mileage: "",
    fuelType: "",
    releaseYear: "",
    transmission: "",
    condition: "",
    color: "",
    owners: "",
    complectation: "",
    dry_sale_price: "",
    actual_sold_price: "",
    sale_type: "",
    status: "",
    seats: "",
    gost_number: "",
    equipment_price: "",
    purchase_amount: "",
    repair_price: "",
    repair_ready_date: "",
    ready_date: "",
    comment: "",
    repair_ready_days: "",
    repair_start_date: "",
    repair_end_date: "",
    price: "",
    redemption_price: "",
    redemption_percentage: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);

  const [brandOptions, setBrandOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [complectationOptions, setComplectationOptions] = useState<string[]>(
    []
  );

  const [equipments, setEquipments] = useState([{ name: "", price: "" }]);
  const [repairs, setRepairs] = useState([{ name: "", price: "" }]);

  // const [finalPrice, setFinalPrice] = useState(""); // Removed unused variable

  const saleTypeTabs = [
    { value: "dry_sale", label: "Сухой продажи" },
    { value: "redemption", label: "Выкуп" },
    { value: "purchase", label: "Закуп" },
  ];

  // Status options based on sale type
  const getStatusOptions = (saleType: string) => {
    switch (saleType) {
      case "dry_sale":
        return [
          { label: "Актив", value: "active" },
          { label: "Продоно", value: "sold" },
        ];
      case "purchase":
        return [
          { label: "Новый", value: "new" },
          { label: "Не требуется", value: "not_required" },
          { label: "Ремонт", value: "repair" },
          { label: "В ремонте", value: "in_repair" },
          { label: "В подготовке", value: "in_preparation" },
          { label: "Готово", value: "ready" },
        ];
      case "redemption":
        return [
          { label: "Сдан", value: "handed_over" },
          { label: "Возврат", value: "returned" },
          { label: "На продажу", value: "for_sale" },
          { label: "Свободно", value: "available" },
          { label: "Пересдача", value: "reassignment" },
        ];
      default:
        return [
          { label: "Актив", value: "active" },
          { label: "Продоно", value: "sold" },
        ];
    }
  };

  useEffect(() => {
    getBrands().then(setBrandOptions).catch(console.error);
  }, []);

  useEffect(() => {
    if (form.brand) {
      getModels(form.brand).then(setModelOptions).catch(console.error);
    } else {
      setModelOptions([]);
    }
  }, [form.brand]);

  useEffect(() => {
    if (form.brand && form.model) {
      getComplectations(form.brand, form.model)
        .then(setComplectationOptions)
        .catch(console.error);
    } else {
      setComplectationOptions([]);
    }
  }, [form.brand, form.model]);

  const handleChange = (key: string, value: string) => {
    // Reset status when sale_type changes to avoid invalid status
    if (key === "sale_type") {
      setForm({ ...form, [key]: value, status: "" });
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  const handleClear = () => {
    setForm({
      brand: "",
      model: "",
      engineVolume: "",
      mileage: "",
      fuelType: "",
      releaseYear: "",
      transmission: "",
      condition: "",
      color: "",
      owners: "",
      complectation: "",
      dry_sale_price: "",
      actual_sold_price: "",
      sale_type: "",
      status: "",
      seats: "",
      gost_number: "",
      equipment_price: "",
      purchase_amount: "",
      repair_price: "",
      repair_ready_date: "",
      ready_date: "",
      comment: "",
      repair_ready_days: "",
      repair_start_date: "",
      repair_end_date: "",
      price: "",
      redemption_price: "",
      redemption_percentage: "",
    });
    setImages([]);
    setBeforeImage(null);
    setAfterImage(null);
  };

  const handleSubmit = async () => {
    try {
      // APIga kerakli maydonlarni yuboramiz
      await import("@/lib/api").then(({ createCar }) =>
        createCar(
          {
            brand: form.brand || null,
            model: form.model || null,
            engine_volume: form.engineVolume || null,
            mileage: form.mileage ? parseInt(form.mileage) : null,
            fuel_type: form.fuelType || null,
            year: form.releaseYear ? parseInt(form.releaseYear) : null,
            transmission: form.transmission || null,
            condition: form.condition || null,
            color: form.color || null,
            owners: form.owners ? parseInt(form.owners) : null,
            complectation: form.complectation || null,
            dry_sale_price:
              (form.sale_type === "dry_sale" ||
                form.sale_type === "redemption") &&
              form.dry_sale_price
                ? parseFloat(form.dry_sale_price)
                : null,
            actual_sold_price:
              (form.sale_type === "dry_sale" ||
                form.sale_type === "redemption") &&
              form.actual_sold_price
                ? parseFloat(form.actual_sold_price)
                : null,
            sale_type: form.sale_type || null,
            status: form.status || null,
            seats: form.seats ? parseInt(form.seats) : null,
            gost_number: form.gost_number || null,
            equipment_price:
              form.sale_type === "purchase" ? getEquipmentTotal() : null,
            purchase_amount:
              form.sale_type === "purchase" && form.price
                ? parseFloat(form.price)
                : null,
            final_price: form.sale_type === "purchase" ? getGrandTotal() : null,
            repair_price:
              form.sale_type === "purchase" ? getRepairTotal() : null,
            repair_ready_date:
              form.sale_type === "purchase" ? form.repair_ready_date : null,
            ready_date: form.ready_date || null,
            repair_ready_days:
              form.sale_type === "purchase" && form.repair_ready_days
                ? parseInt(form.repair_ready_days)
                : null,
            repair_start_date:
              form.sale_type === "purchase" ? form.repair_start_date : null,
            repair_end_date:
              form.sale_type === "purchase" ? form.repair_end_date : null,
            comment: form.sale_type === "purchase" ? form.comment : null,
            redemption_price:
              form.sale_type === "redemption" && form.redemption_price
                ? parseFloat(form.redemption_price)
                : null,
            redemption_percentage:
              form.sale_type === "redemption" && form.redemption_percentage
                ? parseFloat(form.redemption_percentage)
                : null,
            before_image: beforeImage,
            after_image: afterImage,
          },
          images.length > 0 ? images[0] : undefined
        )
      );
      console.log("Mashina muvaffaqiyatli qo'shildi!");
      handleClear();
      window.open("/admin/all-cars", "_self");
    } catch (e) {
      const error = e as Error;
      console.error("Xatolik: " + error.message);
    }
  };

  const handleEquipmentChange = (
    idx: number,
    key: "name" | "price",
    value: string
  ) => {
    setEquipments((equipments) =>
      equipments.map((item, i) =>
        i === idx ? { ...item, [key]: value } : item
      )
    );
  };

  const handleRepairChange = (
    idx: number,
    key: "name" | "price",
    value: string
  ) => {
    setRepairs((repairs) =>
      repairs.map((item, i) => (i === idx ? { ...item, [key]: value } : item))
    );
  };

  // const handleSumPrices = () => { ... } // Removed unused function

  const handleAddEquipment = () => {
    const last = equipments[equipments.length - 1];
    // Only add if last row is filled and name is unique
    if (
      last.name &&
      last.price &&
      !equipments.slice(0, -1).some((eq) => eq.name === last.name)
    ) {
      setEquipments([...equipments, { name: "", price: "" }]);
    }
  };

  const handleAddRepair = () => {
    const last = repairs[repairs.length - 1];
    if (
      last.name &&
      last.price &&
      !repairs.slice(0, -1).some((r) => r.name === last.name)
    ) {
      setRepairs([...repairs, { name: "", price: "" }]);
    }
  };

  const getEquipmentTotal = () =>
    equipments.reduce((acc, cur) => acc + (parseFloat(cur.price) || 0), 0);

  const getRepairTotal = () =>
    repairs.reduce((acc, cur) => acc + (parseFloat(cur.price) || 0), 0);

  const getGrandTotal = () => getEquipmentTotal() + getRepairTotal();

  const labelStyle = "text-[#A1A1A1] mb-1 block text-sm";
  const selectStyle = "w-full text-[#04070D] py-3";

  return (
    <div className="space-y-5 py-5">
      <p className=" text-2xl font-bold">Добавление новой машины</p>
      <TabNavigation
        tabs={saleTypeTabs.map((t) => t.label)}
        activeTab={
          saleTypeTabs.find((t) => t.value === form.sale_type)?.label ||
          saleTypeTabs[0].label
        }
        onTabChange={(label) => {
          const found = saleTypeTabs.find((t) => t.label === label);
          if (found) handleChange("sale_type", found.value);
        }}
      />

      <div>
        <Label className={labelStyle}>Марка</Label>
        <Select
          value={form.brand}
          onValueChange={(val) => handleChange("brand", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите марку" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {brandOptions.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelStyle}>Модель автомобиля</Label>
        <Select
          value={form.model}
          onValueChange={(val) => handleChange("model", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите модель" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {modelOptions.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelStyle}>Комплектация</Label>
        <Select
          value={form.complectation}
          onValueChange={(val) => handleChange("complectation", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите комплектацию" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {complectationOptions.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className={labelStyle}>Год выпуска</Label>
        <Input
          value={form.releaseYear}
          onChange={(e) => handleChange("releaseYear", e.target.value)}
        />
      </div>
      <div>
        <Label className={labelStyle}>Номер ГОСТ</Label>
        <Input
          value={form.gost_number}
          onChange={(e) => handleChange("gost_number", e.target.value)}
        />
      </div>

      <div>
        <Label className={labelStyle}>Цвет</Label>
        <Input
          value={form.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />
      </div>
      <div>
        <Label className={labelStyle}>Пробег</Label>
        <Input
          value={form.mileage}
          onChange={(e) => handleChange("mileage", e.target.value)}
        />
      </div>

      <div>
        <Label className={labelStyle}>Состояние машины</Label>
        <Select
          value={form.condition}
          onValueChange={(val) => handleChange("condition", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите cостояние машины" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value={"new"}>Совсем новый</SelectItem>
            <SelectItem value={"excellent"}>Отличное</SelectItem>
            <SelectItem value={"good"}>Хорошее</SelectItem>
            <SelectItem value={"fair"}>Удовлетворительное</SelectItem>
            <SelectItem value={"poor"}>Плохое</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelStyle}>Количество мест</Label>
        <Input
          value={form.seats}
          onChange={(e) => handleChange("seats", e.target.value)}
        />
      </div>

      {form.sale_type === "purchase" && (
        <div>
          <Label className={labelStyle}>Сумма</Label>
          <Input
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="$1 400 000"
          />
          <div className="text-xs text-gray-400 mt-1">
            {getEquipmentTotal() + getRepairTotal() > 0
              ? `Итого: ${(
                  (parseFloat(form.price) || 0) +
                  getEquipmentTotal() +
                  getRepairTotal()
                ).toLocaleString()}`
              : "This is hint text here."}
          </div>
        </div>
      )}

      {/* Conditional fields for dry_sale */}
      {form.sale_type === "dry_sale" && (
        <>
          <div>
            <Label className={labelStyle}>Цена сухой продаже</Label>
            <Input
              value={form.dry_sale_price}
              onChange={(e) => handleChange("dry_sale_price", e.target.value)}
              placeholder="$14 000"
            />
          </div>
          <div>
            <Label className={labelStyle}>Фактически продано</Label>
            <Input
              value={form.actual_sold_price}
              onChange={(e) =>
                handleChange("actual_sold_price", e.target.value)
              }
              placeholder="$14 000"
            />
          </div>
        </>
      )}

      {/* Conditional fields for redemption */}
      {form.sale_type === "redemption" && (
        <>
          <div>
            <Label className={labelStyle}>Цена сухой продаже</Label>
            <Input
              value={form.dry_sale_price}
              onChange={(e) => handleChange("dry_sale_price", e.target.value)}
              placeholder="$14 000"
            />
          </div>
          <div>
            <Label className={labelStyle}>Фактически продано</Label>
            <Input
              value={form.actual_sold_price}
              onChange={(e) =>
                handleChange("actual_sold_price", e.target.value)
              }
              placeholder="$17 200"
            />
          </div>
          <div>
            <Label className={labelStyle}>Продажа с выкупом</Label>
            <Input
              value={form.redemption_price}
              onChange={(e) => handleChange("redemption_price", e.target.value)}
              placeholder="$17 200"
            />
          </div>
          <div>
            <Label className={labelStyle}>Ставка</Label>
            <Select
              value={form.redemption_percentage}
              onValueChange={(val) =>
                handleChange("redemption_percentage", val)
              }
            >
              <SelectTrigger className={selectStyle}>
                <SelectValue placeholder="Выберите ставку" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
                <SelectItem value="40">40%</SelectItem>
                <SelectItem value="50">50%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {form.sale_type === "purchase" && (
        <>
          <div className="bg-[#F7F8FA] rounded-2xl p-4 mb-4">
            <Label className={labelStyle}>Укомплектующий</Label>
            {equipments.map((eq, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-3">
                <Input
                  placeholder="Название"
                  value={eq.name}
                  onChange={(e) =>
                    handleEquipmentChange(idx, "name", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  placeholder="Цена"
                  value={eq.price}
                  onChange={(e) =>
                    handleEquipmentChange(idx, "price", e.target.value)
                  }
                  className="flex-1"
                  type="number"
                />
                <Button
                  type="button"
                  className="rounded-full w-10 h-10 p-0"
                  onClick={handleAddEquipment}
                  disabled={
                    !eq.name ||
                    !eq.price ||
                    equipments
                      .slice(0, -1)
                      .some((item, i) => i !== idx && item.name === eq.name)
                  }
                  title="Добавить"
                >
                  +
                </Button>
              </div>
            ))}
            <Label className={labelStyle}>Итоговая цена</Label>
            <Input
              value={getEquipmentTotal().toLocaleString()}
              readOnly
              className="flex-1"
            />
          </div>

          <div className="bg-[#F7F8FA] rounded-2xl p-4 mb-4">
            <Label className={labelStyle}>Ремонт</Label>
            {repairs.map((rep, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-3">
                <Input
                  placeholder="Название"
                  value={rep.name}
                  onChange={(e) =>
                    handleRepairChange(idx, "name", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  placeholder="Цена"
                  value={rep.price}
                  onChange={(e) =>
                    handleRepairChange(idx, "price", e.target.value)
                  }
                  className="flex-1"
                  type="number"
                />
                <Button
                  type="button"
                  className="rounded-full w-10 h-10 p-0"
                  onClick={handleAddRepair}
                  disabled={
                    !rep.name ||
                    !rep.price ||
                    repairs
                      .slice(0, -1)
                      .some((item, i) => i !== idx && item.name === rep.name)
                  }
                  title="Добавить"
                >
                  +
                </Button>
              </div>
            ))}
            <Label className={labelStyle}>Для даты готовности (дней)</Label>
            <Input
              type="number"
              placeholder="Количество дней"
              value={form.repair_ready_days}
              onChange={(e) =>
                handleChange("repair_ready_days", e.target.value)
              }
              className="mb-3"
            />
            <Label className={labelStyle}>Календарь для выбора даты</Label>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={form.repair_start_date}
                onChange={(e) =>
                  handleChange("repair_start_date", e.target.value)
                }
                className="flex-1"
                placeholder="Дата начала"
              />
              <Input
                type="date"
                value={form.repair_end_date}
                onChange={(e) =>
                  handleChange("repair_end_date", e.target.value)
                }
                className="flex-1"
                placeholder="Дата окончания"
              />
            </div>
          </div>

          <div>
            <Label className={labelStyle}>Комментарий</Label>
            <Textarea
              value={form.comment}
              onChange={(e) => handleChange("comment", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label className={labelStyle}>До/После</Label>
            <div className="flex gap-4">
              {/* Before */}
              <div className="flex-1">
                <div className="mb-1 text-xs text-gray-500">До</div>
                <div
                  className="border-2 border-dashed border-blue-300 rounded-lg p-4 flex flex-col items-center justify-center relative"
                  style={{ minHeight: 120 }}
                >
                  <label className="flex flex-col items-center cursor-pointer w-full">
                    <div className="relative">
                      <Image
                        src={
                          beforeImage
                            ? URL.createObjectURL(beforeImage)
                            : "/images/before-placeholder.png"
                        }
                        alt="before"
                        width={128}
                        height={80}
                        className="w-32 h-20 object-cover rounded-lg border"
                        style={{ background: "#f3f3f3" }}
                      />
                      {beforeImage && (
                        <button
                          type="button"
                          onClick={() => setBeforeImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          aria-label="Удалить"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer mt-2">
                      +
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/mp4"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0])
                          setBeforeImage(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
              {/* After */}
              <div className="flex-1">
                <div className="mb-1 text-xs text-gray-500">После</div>
                <div
                  className="border-2 border-dashed border-blue-300 rounded-lg p-4 flex flex-col items-center justify-center relative"
                  style={{ minHeight: 120 }}
                >
                  <label className="flex flex-col items-center cursor-pointer w-full">
                    <div className="relative">
                      <Image
                        src={
                          afterImage
                            ? URL.createObjectURL(afterImage)
                            : "/images/after-placeholder.png"
                        }
                        alt="after"
                        width={128}
                        height={80}
                        className="w-32 h-20 object-cover rounded-lg border"
                        style={{ background: "#f3f3f3" }}
                      />
                      {afterImage && (
                        <button
                          type="button"
                          onClick={() => setAfterImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          aria-label="Удалить"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer mt-2">
                      +
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/mp4"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0])
                          setAfterImage(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        <Label className={labelStyle}>Главные изображения</Label>
        <div
          className="border-2 border-dashed border-blue-300 rounded-lg p-4 flex flex-col items-center"
          style={{ maxWidth: 400 }}
        >
          <div className="flex items-center gap-4 mb-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`main-${index}`}
                  width={64}
                  height={64}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  aria-label="Удалить"
                >
                  ×
                </button>
              </div>
            ))}
            <label
              className="flex items-center justify-center cursor-pointer"
              style={{ width: 64, height: 64 }}
            >
              <div
                className="bg-blue-500 flex items-center justify-center text-white text-2xl"
                style={{ width: 64, height: 64, borderRadius: "50%" }}
              >
                +
              </div>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/gif,image/mp4"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const newFiles = Array.from(e.target.files);
                    setImages([...images, ...newFiles]);
                  }
                }}
              />
            </label>
          </div>
          <div className="text-lg font-semibold text-black mb-1">
            Загрузите изображение
          </div>
          <div className="text-sm text-gray-400">
            Поддерживаемые форматы: JPEG, PNG, MP4, GIF
          </div>
        </div>
      </div>
      <div>
        <Label className={labelStyle}>Статус</Label>
        <div className="flex flex-wrap gap-4">
          {getStatusOptions(form.sale_type).map(
            (opt: { label: string; value: string }) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value={opt.value}
                  checked={form.status === opt.value}
                  onChange={() => handleChange("status", opt.value)}
                />
                {opt.label}
              </label>
            )
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button
          variant="outline"
          className="rounded-full bg-gray-100 border-0"
          onClick={handleClear}
        >
          Удалить
        </Button>
        <Button className="bg-primary-500 rounded-full" onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
    </div>
  );
}
