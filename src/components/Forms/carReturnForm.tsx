// components/forms/CarReturnForm.tsx
"use client";

import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SafeImage from "@/components/ui/safe-image";
import dayjs from "dayjs";
import {
  getBrands,
  getModels,
  getComplectations,
  fetchCars,
  getUsers,
  createRental,
  updateRental,
} from "@/lib/api";
import type { Car } from "@/types/car";
import type { User } from "@/types/user";
import Container from "../layout/container";

interface CarReturnFormData {
  brand: string;
  model: string;
  complectation: string;
  gost_number: string;
  dry_sale_price: string;
  actual_sold_price: string;
  buyout_sale_price: string;
  initial_payment: string;
  remainder: string;
  monthly_payment: string;
  buyout_period_months: string;
  handover_to_user_id: string;
  payment_date: string;
  handover_description: string;
  stavka: string;
  status: string;
  car_photo: File | null | unknown;
  is_paid: boolean;
  car_id: string;
  id?: string | number;
  handover_to_user_first_name?: string;
  handover_to_user_last_name?: string;
}

interface CarReturnFormProps {
  rentalId?: string;
}

export default function CarReturnForm({ rentalId }: CarReturnFormProps) {
  const router = useRouter();
  // State
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [complectations, setComplectations] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [initialData, setInitialData] = useState<CarReturnFormData | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState(() => ({
    brand: "",
    model: "",
    complectation: "",
    gost_number: "",
    dry_sale_price: "",
    actual_sold_price: "",
    buyout_sale_price: "",
    initial_payment: "",
    remainder: "",
    monthly_payment: "",
    buyout_period_months: "3",
    handover_to_user_id: "",
    payment_date: "",
    handover_description: "",
    stavka: "10",
    status: "handed_over",
    car_photo: null as File | null,
    is_paid: true,
    car_id: "",
  }));

  const isEdit = !!rentalId && rentalId !== "create";

  // Fetch rental data if editing
  useEffect(() => {
    if (isEdit && rentalId) {
      setLoading(true);
      import("@/lib/api").then(({ fetchRentalById }) => {
        fetchRentalById(rentalId)
          .then((data) => {
            setInitialData(data);
            setForm({
              brand: data?.brand ?? "",
              model: data?.model ?? "",
              complectation: data?.complectation ?? "",
              gost_number: data?.gost_number ?? "",
              dry_sale_price: data?.dry_sale_price ?? "",
              actual_sold_price: data?.actual_sold_price ?? "",
              buyout_sale_price: data?.buyout_sale_price ?? "",
              initial_payment: data?.initial_payment ?? "",
              remainder: data?.remainder ?? "",
              monthly_payment: data?.monthly_payment ?? "",
              buyout_period_months: data?.buyout_period_months ?? "3",
              handover_to_user_id: data?.handover_to_user_id ?? "",
              payment_date: data?.payment_date ?? "",
              handover_description: data?.handover_description ?? "",
              stavka: data?.stavka ?? "10",
              status: data?.status ?? "handed_over",
              car_photo: data?.car_photo ?? null,
              is_paid: data?.is_paid ?? true,
              car_id: data?.car_id ?? "",
            });
          })
          .catch((error) => {
            console.error("Error fetching rental:", error);
            toast.error("Ma&apos;lumotlarni yuklashda xatolik");
          })
          .finally(() => setLoading(false));
      });
    }
  }, [rentalId, isEdit]);

  // 1. Brandlarni olish
  useEffect(() => {
    if (!isEdit) {
      getBrands().then(setBrands);
      getUsers().then(setUsers);
    } else {
      if (initialData) {
        setBrands(initialData?.brand ? [initialData.brand] : []);
        setModels(initialData?.model ? [initialData.model] : []);
        setComplectations(
          initialData?.complectation ? [initialData.complectation] : []
        );
        setUsers(
          initialData?.handover_to_user_id
            ? [
                {
                  id: Number(initialData.handover_to_user_id),
                  first_name: initialData.handover_to_user_first_name || "",
                  last_name: initialData.handover_to_user_last_name || "",
                  username: "",
                  phone_number: "",
                  role: "",
                  date_joined: "",
                },
              ]
            : []
        );
      }
    }
  }, [initialData, isEdit]);

  // 2. Model select
  useEffect(() => {
    if (!isEdit && form.brand) {
      getModels(form.brand).then(setModels);
    } else if (!isEdit) {
      setModels([]);
    }
    if (!isEdit) {
      setForm((f) => ({
        ...f,
        model: "",
        complectation: "",
        gost_number: "",
        car_id: "",
      }));
      setComplectations([]);
      setCars([]);
      setSelectedCar(null);
    }
  }, [form.brand, isEdit]);

  // 3. Complectation select
  useEffect(() => {
    if (!isEdit && form.brand && form.model) {
      getComplectations(form.brand, form.model).then(setComplectations);
    } else if (!isEdit) {
      setComplectations([]);
    }
    if (!isEdit) {
      setForm((f) => ({
        ...f,
        complectation: "",
        gost_number: "",
        car_id: "",
      }));
      setCars([]);
      setSelectedCar(null);
    }
  }, [form.model, form.brand, isEdit]);

  // 4. Mashinalarni olish
  useEffect(() => {
    if (!isEdit && form.brand && form.model) {
      fetchCars(undefined, {
        brand: form.brand,
        model: form.model,
      }).then((data) => setCars(data.results || []));
    } else if (!isEdit) {
      setCars([]);
    }
    if (!isEdit) {
      setForm((f) => ({ ...f, gost_number: "", car_id: "" }));
      setSelectedCar(null);
    }
  }, [form.model, form.brand, isEdit]);

  // 5. Gost_number orqali car tanlash
  const handleCarSelect = (gost_number: string) => {
    const car = cars.find((c) => c.gost_number === gost_number);
    setSelectedCar(car || null);

    if (car) {
      setForm((f) => ({
        ...f,
        gost_number: car.gost_number || "",
        car_id: car.id ? String(car.id) : "",
        brand: car.brand || "",
        model: car.model || "",
        complectation: car.complectation || "",
        dry_sale_price: car.dry_sale_price || "",
        actual_sold_price: car.actual_sold_price || "",
        buyout_sale_price: car.redemption_price || car.dry_sale_price || "",
        // Boshqa maydonlar ham to'ldirilishi mumkin
      }));
    }
  };

  // 6. Hisob-kitoblar
  useEffect(() => {
    // Остаток
    const buyout = parseFloat(form.buyout_sale_price) || 0;
    const initial = parseFloat(form.initial_payment) || 0;
    const remainder = buyout - initial;
    // Ежемесячный платеж
    const months = parseInt(form.buyout_period_months) || 1;
    const monthly = remainder > 0 ? (remainder / months).toFixed(2) : "";
    setForm((f) => ({
      ...f,
      remainder: remainder > 0 ? remainder.toString() : "",
      monthly_payment: monthly,
    }));
  }, [form.buyout_sale_price, form.initial_payment, form.buyout_period_months]);

  // 7. Dato platyoji (bugungi kundan + 30 kun)
  useEffect(() => {
    setForm((f) => ({
      ...f,
      payment_date: dayjs().add(30, "day").format("YYYY-MM-DD"),
    }));
  }, []);

  // 8. Form change
  const handleChange = (
    key: keyof typeof form,
    value: string | boolean | null | File
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // 9. Grafik
  const getPaymentSchedule = () => {
    const months = parseInt(form.buyout_period_months) || 1;
    const start = dayjs(form.payment_date);
    return Array.from({ length: months }).map((_, i) => ({
      date: start.add(i * 30, "day").format("YYYY-MM-DD"),
      amount: form.monthly_payment,
      status: i === 0 ? "Оплачено" : "Не оплачено",
    }));
  };

  // 10. Submit
  const handleSubmit = async () => {
    try {
      const payload = {
        handover_description: form.handover_description ?? "",
        is_paid: form.is_paid,
        dry_sale_price: Number(form.dry_sale_price) || 0,
        car_id: Number(form.car_id) || 0,
        handover_to_user_id: Number(form.handover_to_user_id) || 0,
        payment_date: form.payment_date ?? "",
        buyout_sale_price: Number(form.buyout_sale_price) || 0,
        initial_payment: Number(form.initial_payment) || 0,
        stavka: Number(form.stavka) || 0,
        actual_sold_price: Number(form.actual_sold_price) || 0,
        status: form.status ?? "",
        monthly_payment: Number(form.monthly_payment) || 0,
        buyout_period_months: Number(form.buyout_period_months) || 0,
        complectation: form.complectation ?? "",
        gost_number: form.gost_number ?? "",
      };
      if (
        form.car_photo &&
        typeof form.car_photo === "object" &&
        "name" in form.car_photo
      ) {
        (payload as typeof payload & { car_photo: File }).car_photo =
          form.car_photo as File;
      }

      if (isEdit) {
        await updateRental(rentalId!, payload);
        toast.success("Ma&apos;lumot yangilandi!");
      } else {
        await createRental(payload);
        toast.success("Mashina vikupga chiqarildi!");
      }
      router.push("/admin/carreturn");
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "message" in e &&
        typeof (e as { message?: string }).message === "string"
      ) {
        toast.error("Xatolik: " + (e as { message: string }).message);
      } else {
        toast.error("Xatolik yuz berdi");
      }
    }
  };

  useEffect(() => {
    if (isEdit && initialData) {
      setForm({
        brand: initialData?.brand ?? "",
        model: initialData?.model ?? "",
        complectation: initialData?.complectation ?? "",
        gost_number: initialData?.gost_number ?? "",
        dry_sale_price: initialData?.dry_sale_price ?? "",
        actual_sold_price: initialData?.actual_sold_price ?? "",
        buyout_sale_price: initialData?.buyout_sale_price ?? "",
        initial_payment: initialData?.initial_payment ?? "",
        remainder: initialData?.remainder ?? "",
        monthly_payment: initialData?.monthly_payment ?? "",
        buyout_period_months: initialData?.buyout_period_months ?? "3",
        handover_to_user_id: initialData?.handover_to_user_id ?? "",
        payment_date: initialData?.payment_date ?? "",
        handover_description: initialData?.handover_description ?? "",
        stavka: initialData?.stavka ?? "10",
        status: initialData?.status ?? "handed_over",
        car_photo: (initialData?.car_photo as File | null) || null,
        is_paid: initialData?.is_paid ?? true,
        car_id: initialData?.car_id ?? "",
      });
    }
  }, [initialData, isEdit]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <p>Ma&apos;lumotlar yuklanmoqda...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6">
        <Label>Бренд</Label>
        <Select
          value={form.brand}
          onValueChange={(val) => handleChange("brand", val)}
          disabled={isEdit}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите бренд" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Модель</Label>
        <Select
          value={form.model}
          onValueChange={(val) => handleChange("model", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите модель" />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Комплектация</Label>
        <Select
          value={form.complectation}
          onValueChange={(val) => handleChange("complectation", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите комплектацию" />
          </SelectTrigger>
          <SelectContent>
            {complectations.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!isEdit && (
          <>
            <Label>ГОСТ номер</Label>
            <Select value={form.gost_number} onValueChange={handleCarSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите ГОСТ номер" />
              </SelectTrigger>
              <SelectContent>
                {cars.map((car) => (
                  <SelectItem
                    key={car.gost_number ?? ""}
                    value={car.gost_number ?? ""}
                  >
                    {car.gost_number ?? ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
        {isEdit && <Input value={form.gost_number} readOnly />}

        <Label>Цена сухой продажи</Label>
        <Input
          value={form.dry_sale_price}
          onChange={(e) => handleChange("dry_sale_price", e.target.value)}
          type="number"
          placeholder="Введите цену сухой продажи"
        />

        <Label>Фактически продано</Label>
        <Input
          value={form.actual_sold_price}
          onChange={(e) => handleChange("actual_sold_price", e.target.value)}
          type="number"
          placeholder="Введите фактическую цену продажи"
        />

        <Label>Продажа с выкупом</Label>
        <Input
          value={form.buyout_sale_price}
          onChange={(e) => handleChange("buyout_sale_price", e.target.value)}
          type="number"
          placeholder="Введите цену выкупа"
        />

        <Label>Первоначальный взнос</Label>
        <Input
          value={form.initial_payment}
          onChange={(e) => handleChange("initial_payment", e.target.value)}
          type="number"
          placeholder="Введите первоначальный взнос"
        />

        <Label>Остаток</Label>
        <Input value={form.remainder} readOnly className="bg-gray-50" />

        <Label>Ежемесячный платеж</Label>
        <Input value={form.monthly_payment} readOnly className="bg-gray-50" />

        <Label>Ставка (%)</Label>
        <Input
          value={form.stavka}
          onChange={(e) => handleChange("stavka", e.target.value)}
          type="number"
          placeholder="Введите процентную ставку"
        />

        <Label>Кому сдать</Label>
        <Select
          value={form.handover_to_user_id}
          onValueChange={(val) => handleChange("handover_to_user_id", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите пользователя" />
          </SelectTrigger>
          <SelectContent>
            {users.map((u) => (
              <SelectItem key={u.id} value={u.id.toString()}>
                {u.first_name} {u.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Период выкупа (месяцев)</Label>
        <Select
          value={form.buyout_period_months}
          onValueChange={(val) => handleChange("buyout_period_months", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
          </SelectContent>
        </Select>

        <Label>Дата выплаты</Label>
        <Input
          value={form.payment_date}
          onChange={(e) => handleChange("payment_date", e.target.value)}
          type="date"
          placeholder="Выберите дату выплаты"
        />

        <Label>График выплат</Label>
        <div className="border rounded p-3 text-sm space-y-1">
          {getPaymentSchedule().map((item, idx) => (
            <div className="flex justify-between" key={idx}>
              <span>
                {item.date} - ${item.amount}
              </span>
              <span
                className={
                  item.status === "Оплачено"
                    ? "text-green-500"
                    : "text-gray-400"
                }
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <Label>Статус</Label>
        <Select
          value={form.status}
          onValueChange={(val) => handleChange("status", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="handed_over">Сдан</SelectItem>
            <SelectItem value="returned">Возврат</SelectItem>
            <SelectItem value="for_sale">На продажу</SelectItem>
            <SelectItem value="rehandover">Переезд</SelectItem>
            <SelectItem value="successful">Успешна</SelectItem>
          </SelectContent>
        </Select>

        <Label>Описание</Label>
        <Textarea
          value={form.handover_description}
          onChange={(e) => handleChange("handover_description", e.target.value)}
          placeholder="Комментарий"
        />

        <Label>Фото автомобиля</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleChange("car_photo", file);
          }}
          placeholder="Выберите фото автомобиля"
        />

        {/* Car photo and gost_number preview */}
        {selectedCar && (
          <div className="flex items-center gap-4 mt-4">
            <SafeImage
              src={selectedCar.image || ""}
              alt="car"
              width={64}
              height={64}
              className="rounded-md border"
              fallback="🚗"
            />
            <div>
              <Label className="text-sm">ГОСТ номер</Label>
              <div className="px-4 py-2 border border-dashed border-[#3563E9] rounded-md inline-block mt-1">
                {selectedCar.gost_number}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            className="rounded-full bg-gray-100 border-0"
            type="reset"
          >
            Очистить
          </Button>
          <Button
            className="bg-primary-500 rounded-full"
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Container>
  );
}
