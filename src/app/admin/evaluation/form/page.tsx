// components/forms/CarReturnForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import {
  getBrands,
  getModels,
  getComplectations,
  evaluateCar,
} from "@/lib/api";

export default function CarEvaluationForm() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    complectation: "",
    engineVolume: "",
    mileage: "",
    releaseYear: "",
    color: "",
    fuel: "",
    transmission: "",
    condition: "",
  });

  const [brandOptions, setBrandOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [complectationOptions, setComplectationOptions] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Load brands on component mount
  useEffect(() => {
    getBrands().then(setBrandOptions).catch(console.error);
  }, []);

  // Load models when brand changes
  useEffect(() => {
    if (form.brand) {
      getModels(form.brand)
        .then((models) => {
          // Filter out "Gentra" if brand is "Chevrolet" and model is "Lacetti"
          if (form.brand === "Chevrolet" && models.includes("Lacetti")) {
            setModelOptions(models.filter((model) => model !== "Gentra"));
          } else {
            setModelOptions(models);
          }
        })
        .catch(console.error);
    } else {
      setModelOptions([]);
    }
  }, [form.brand]);

  // Load complectations when model changes
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
    setForm({ ...form, [key]: value });
  };

  const handleClear = () => {
    setForm({
      brand: "",
      model: "",
      complectation: "",
      engineVolume: "",
      mileage: "",
      releaseYear: "",
      color: "",
      fuel: "",
      transmission: "",
      condition: "",
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Prepare data for API, only include filled fields
      const evaluationData: any = {};
      if (form.brand) evaluationData.brand = form.brand;
      if (form.model) evaluationData.model = form.model;
      if (form.engineVolume) evaluationData.engine_volume = form.engineVolume;
      if (form.mileage) evaluationData.mileage = parseInt(form.mileage);
      if (form.releaseYear) evaluationData.year = parseInt(form.releaseYear);
      if (form.color) evaluationData.color = form.color;
      if (form.fuel) evaluationData.fuel = form.fuel;
      if (form.transmission) evaluationData.transmission = form.transmission;
      if (form.condition) evaluationData.condition = form.condition;
      if (form.complectation) evaluationData.complectation = form.complectation;
      if (Object.keys(evaluationData).length === 0) {
        console.error("Пожалуйста, заполните хотя бы одно поле для оценки.");
        setLoading(false);
        return;
      }

      // Call the evaluation API
      const result = await evaluateCar(evaluationData);

      // Store results in localStorage and navigate to results page
      localStorage.setItem("evaluationResults", JSON.stringify(result));
      localStorage.setItem(
        "evaluationCarInfo",
        JSON.stringify({
          brand: form.brand,
          model: form.model,
        })
      );

      window.location.href = "/admin/evaluation";
    } catch (error) {
      console.error("Evaluation error:", error);
      console.error(
        "Mashina nomi topilmadi. Iltimos, to'g'ri ma'lumotlarni kiriting va qaytadan urinib ko'ring."
      );
    } finally {
      setLoading(false);
    }
  };
  const labelStyle = "text-[#A1A1A1] mb-1 block text-sm";
  const selectStyle = "w-full text-[#04070D] py-3";
  const inputStyle = "w-full text-[#04070D] py-3";

  const fuelOptions = ["Бензин", "Газ", "Электро", "Газ/Бензин", "Гибрид"];
  const transmissionOptions = ["Автомат", "Механическая"];
  const conditionOptions = ["Хорошее", "Среднее", "Плохое"];
  const colorOptions = [
    "Белый",
    "Черный",
    "Серый",
    "Синий",
    "Красный",
    "Зеленый",
    "Желтый",
    "Оранжевый",
    "Фиолетовый",
    "Коричневый",
    "Бежевый",
    "Голубой",
    "Золотой",
    "Бордовый",
    "Розовый",
  ];

  return (
    <div className="space-y-5 p-4">
      <p className="text-center text-gray-600 text-xl mt-2 ">
        Bu sahifa test rejimida ishlayapti
      </p>
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
        <Label className={labelStyle}>Модель</Label>
        <Input
          type="text"
          className={inputStyle}
          placeholder="Введите модель"
          onChange={(e) => handleChange("model", e.target.value)}
          value={form.model}
        />
      </div>

      <div>
        <Label className={labelStyle}>Комплектация</Label>
        <Input
          placeholder="Введите комплектацию"
          type="text"
          className={inputStyle}
          value={form.complectation}
          onChange={(e) => handleChange("complectation", e.target.value)}
        />
      </div>

      <div>
        <Label className={labelStyle}>Объем двигателя</Label>
        <Input
          placeholder="Введите объем двигателя: 1.1 - 3.0"
          type="text"
          className={inputStyle}
          value={form.engineVolume}
          onChange={(e) => handleChange("engineVolume", e.target.value)}
          list="engine-volume-options"
        />
      </div>

      <div>
        <Label className={labelStyle}>Тип топлива</Label>
        <Select
          value={form.fuel}
          onValueChange={(val) => handleChange("fuel", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите топливо" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {fuelOptions.map((fuel) => (
              <SelectItem key={fuel} value={fuel}>
                {fuel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelStyle}>Трансмиссия</Label>
        <Select
          value={form.transmission}
          onValueChange={(val) => handleChange("transmission", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите трансмиссию" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {transmissionOptions.map((tr) => (
              <SelectItem key={tr} value={tr}>
                {tr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelStyle}>Состояние</Label>
        <Select
          value={form.condition}
          onValueChange={(val) => handleChange("condition", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите состояние" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {conditionOptions.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelStyle}>Пробег (км)</Label>
        <Input
          type="number"
          className={inputStyle}
          placeholder="Введите пробег"
          value={form.mileage}
          onChange={(e) => handleChange("mileage", e.target.value)}
        />
      </div>

      <div>
        <Label className={labelStyle}>Год выпуска</Label>
        <Input
          type="number"
          className={inputStyle}
          placeholder="Введите год выпуска"
          value={form.releaseYear}
          onChange={(e) => handleChange("releaseYear", e.target.value)}
        />
      </div>

      <div>
        <Label className={labelStyle}>Цвет</Label>
        <Select
          value={form.color}
          onValueChange={(val) => handleChange("color", val)}
        >
          <SelectTrigger className={selectStyle}>
            <SelectValue placeholder="Выберите цвет" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {colorOptions.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-4 pt-4">
        <Button
          type="button"
          className="flex-1 bg-gray-100 text-black hover:bg-gray-200"
          onClick={handleClear}
        >
          Очистить
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Оценка..." : "Оценить"}
        </Button>
      </div>
    </div>
  );
}
