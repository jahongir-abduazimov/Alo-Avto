"use client";
import React, { useEffect, useState } from "react";
import HeaderDashboard from "./header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertCircle,
  ArrowRight,
  AudioLines,
  CircleAlert,
  CornerLeftUp,
  Files,
  OctagonMinus,
  PlusCircle,
  RefreshCw,
  Route,
  Triangle,
} from "lucide-react";
import { Icon } from "../icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import Link from "next/link";
import {
  fetchUpcomingPayments,
  fetchAvailableCars,
  fetchCarStats,
  CarStats,
  getUserProfile,
} from "@/lib/api";
import { UpcomingPayment } from "@/types/payment";
import { Car } from "@/types/car";
import { isTMA, init, viewport } from "@telegram-apps/sdk";
import TelegramBackButton from "../telegram/BackButton";

interface PaymentDisplay {
  number: string;
  date: string;
  name: string;
  car: string;
}

export default function DashboardPage() {
  useEffect(() => {
    async function initTg() {
      if (await isTMA()) {
        init();
        const width = window.innerWidth;
        if (width <= 1024) {
          // Telefon va planshet
          if (viewport.mount.isAvailable()) {
            await viewport.mount();
            viewport.expand();
          }
          if (viewport.requestFullscreen.isAvailable()) {
            await viewport.requestFullscreen();
          }
        }
        // Desktop uchun hech narsa qilinmaydi
      }
    }
    initTg();
  }, []);
  const [upcomingPayments, setUpcomingPayments] = useState<PaymentDisplay[]>(
    []
  );
  const [availableCars, setAvailableCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [carStats, setCarStats] = useState<CarStats | null>(null);
  const [userRegistered, setUserRegistered] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function checkUser() {
      try {
        const profile = await getUserProfile();
        if (
          profile &&
          profile.user &&
          profile.user.id &&
          profile.user.username &&
          profile.user.first_name
        ) {
          setUserRegistered(true);
          setUserName(profile.user.first_name + " " + profile.user.last_name);
        } else {
          setUserRegistered(false);
        }
      } catch (e) {
        setUserRegistered(false);
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch car stats
        const stats = await fetchCarStats();
        setCarStats(stats);

        // Fetch upcoming payments
        const upcomingData = await fetchUpcomingPayments();
        const paymentsDisplay: PaymentDisplay[] = upcomingData.map(
          (payment: UpcomingPayment) => {
            // Extract car info from rental_info (format: "Chevrolet Malibu - 01 A 100 BB")
            const parts = payment.rental_info.split(" - ");
            const carName = parts[0] || "N/A";
            const carNumber = parts[1] || "N/A";

            return {
              number: carNumber,
              date: new Date(payment.due_date).toLocaleDateString("ru-RU"),
              name: "Клиент", // Placeholder since name is not in API response
              car: carName,
            };
          }
        );
        setUpcomingPayments(paymentsDisplay);

        // Fetch available cars
        const carsData = await fetchAvailableCars();
        setAvailableCars(carsData.results || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Fallback to empty arrays if API fails
        setUpcomingPayments([]);
        setAvailableCars([]);
        setCarStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (userRegistered === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  function getChangeColor(change: string | number) {
    if (change === "no previous data") return "text-gray-400";
    if (typeof change === "string" && change.startsWith("-"))
      return "text-red-500";
    if (typeof change === "number" && change < 0) return "text-red-500";
    return "text-blue-500";
  }
  function getTriangleFill(change: string | number) {
    if (change === "no previous data") return "#A1A1A1";
    if (typeof change === "string" && change.startsWith("-")) return "#EF4444";
    if (typeof change === "number" && change < 0) return "#EF4444";
    return "#2563EB";
  }

  return (
    <div className="pt-18 ">
      <HeaderDashboard />
      <h1 className="font-bold text-4xl text-center">
        Hushkelibsiz, {userName || "BOSS"} 👋🏻
      </h1>
      <div className="flex justify-between items-center mt-5">
        {/* Select */}
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Выкуп" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Выкуп">Выкуп</SelectItem>
              <SelectItem value="Продажа">Продажа</SelectItem>
              <SelectItem value="Закуп">Закуп</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="bg-primary-50 h-full rounded-md text-primary-500">
          <Link
            href={"/admin/documents"}
            className="w-full h-full flex py-1.5 items-center gap-2 px-3 "
          >
            <Files size={16} />
            <span>Док</span>
          </Link>
        </div>
        <div className="bg-primary-50 h-full rounded-md text-primary-500">
          <Link
            href={"/admin/fine"}
            className="w-full h-full flex items-center gap-2 px-3 py-1.5 "
          >
            <CircleAlert className="text-primary-500" size={16} />
            <span>Штраф</span>
          </Link>
        </div>
      </div>
      {/* section */}
      {/* section2 */}
      <div className="mt-5 flex gap-3">
        <div className="size-[90px] relative text-white  rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#074446_17.49%,_#48CD44_100%)]">
          <Link href={"/admin/debt"} className="w-full h-full">
            <span className="text-[9px] font-semibold">Просрочка</span>
            <AlertCircle className="absolute bottom-4 right-4" />
          </Link>
        </div>
        <div className="size-[90px] relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#224462_17.49%,_#2CB391_100%)]">
          <Link href={"/admin/clients"} className="w-full h-full">
            <span className="text-[9px] font-semibold">возврат</span>
            <RefreshCw className="absolute bottom-4 right-4" />
          </Link>
        </div>
        <div className="size-[90px] relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#F4BB34_17.49%,_#EC6B1D_100%)]">
          <Link href={"/admin/close"} className="w-full h-full">
            <span className="text-[9px] font-semibold">Закрите</span>
            <OctagonMinus className="absolute bottom-4 right-4" />
          </Link>
        </div>
        <div className="size-[90px] relative text-white  rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#42219A_17.49%,_#DB94DB_100%)]">
          <Link href={"/admin/geolocation"} className="w-full h-full">
            <span className="text-[9px] font-semibold">Геолакации</span>
            <Route className="absolute bottom-4 right-4" />
          </Link>
        </div>
      </div>
      {/* section2 */}
      {/* section3 */}
      <div className="grid grid-cols-2 grid-rows-2 mt-5 gap-2">
        <Link
          href={"/admin/add-cars"}
          className="w-full h-[105px] bg-[#CAD8FF]/40 relative rounded-xl border-dashed border-primary-500 border-2 py-2 px-3"
        >
          <span className="text-[12px] font-medium">Добавить авто</span>
          <PlusCircle className="absolute text-primary-500 bottom-4 right-4" />
        </Link>
        <div className="w-full bg-primary-500 relative row-span-2 px-4 py-5 rounded-xl ">
          <span className="text-[19px] text-white font-medium">
            Мой <br /> помощник
          </span>
          <div className="bg-white flex absolute rounded-2xl bottom-5 right-5 justify-center items-center size-[90px]">
            <AudioLines className="size-16 text-primary-500" />
          </div>
        </div>
        <div className="w-full relative h-[105px] text-white  bg-[#FF8E31] rounded-xl py-2 px-3">
          <Link href={"/admin/carreturn"} className="h-full w-full">
            <span className="text-[12px] font-medium ">Сдать</span>
            <CornerLeftUp className="absolute size-12 bottom-4 right-4" />
          </Link>
        </div>
      </div>
      {/* section3 */}
      {/* section4 */}
      <div className="mt-5 rounded-2xl bg-primary-100 ">
        <Link
          href={"/admin/evaluation/form"}
          className="w-full p-3 h-full flex justify-between items-center"
        >
          <Icon name="favorite" size={34} />
          <span className="font-medium text-base">Оценка автомобиля</span>
          <div className="bg-black text-white size-8 rounded-full flex justify-center items-center">
            <ArrowRight />
          </div>
        </Link>
      </div>
      {/* section4 */}
      {/* section5 */}
      <div className="mt-5">
        <div>
          <div className=" flex items-center gap-3">
            <div className="bg-black size-10 flex justify-center items-center rounded-full">
              <Icon name="coin-dollar" size={20} className="size-40" />
            </div>
            <span className="text-base font-medium text-black">
              Общее Поступления
            </span>
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-3xl font-semibold">
              {carStats ? carStats.total_income.value : "$0.00"}
            </span>
            <div
              className={`rounded-full gap-2 bg-primary-100 px-4 flex items-center ${getChangeColor(
                carStats?.total_income.percent_change ?? "0"
              )}`}
            >
              <Triangle
                className="size-2"
                fill={getTriangleFill(
                  carStats?.total_income.percent_change ?? "0"
                )}
              />
              <span
                className={`text-[12px] ${
                  carStats
                    ? getChangeColor(carStats.total_income.percent_change)
                    : ""
                }`}
              >
                {carStats?.total_income.percent_change === "no previous data"
                  ? "нет данных"
                  : carStats?.total_income.percent_change ?? "0"}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[#A1A1A1]">
              {carStats ? carStats.total_income.period : "Последние 30 дней"}
            </p>
            <p className="mt-12">
              {carStats
                ? `Изменение: ${
                    carStats.total_income.percent_change === "no previous data"
                      ? "0"
                      : carStats.total_income.percent_change
                  }`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* section5 */}
      {/* section5 */}
      <div className="mt-5">
        <div>
          <div className=" flex items-center gap-3">
            <div className="bg-black size-10 flex justify-center items-center rounded-full">
              <Icon name="notepad" size={20} className="size-40" />
            </div>
            <span className="text-base font-medium text-black">
              Ближайшие поступления
            </span>
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-3xl font-semibold">
              {carStats ? carStats.upcoming_income.value : "$0.00"}
            </span>
            <div
              className={`rounded-full gap-2 bg-primary-100 px-4 flex items-center ${getChangeColor(
                carStats?.upcoming_income.percent_change ?? "0"
              )}`}
            >
              <Triangle
                className="size-2"
                fill={getTriangleFill(
                  carStats?.upcoming_income.percent_change ?? "0"
                )}
              />
              <span
                className={`text-[12px] ${getChangeColor(
                  carStats?.upcoming_income.percent_change ?? "0"
                )}`}
              >
                {carStats?.upcoming_income.percent_change === "no previous data"
                  ? "нет данных"
                  : carStats?.upcoming_income.percent_change ?? "0"}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[#A1A1A1]">
              {carStats ? carStats.upcoming_income.period : "Последние 7 дней"}
            </p>
            <p className="mt-12">
              {carStats
                ? `Изменение: ${
                    carStats.upcoming_income.percent_change ===
                    "no previous data"
                      ? "0"
                      : carStats.upcoming_income.percent_change
                  }`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* section5 */}
      {/* section5 */}
      <div className="mt-5">
        <div>
          <div className=" flex items-center gap-3">
            <div className="bg-black size-10 flex justify-center items-center rounded-full">
              <Icon name="car" size={20} className="size-40" />
            </div>
            <span className="text-base font-medium text-black">
              Задолженность
            </span>
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-3xl font-semibold">
              {carStats ? carStats.debt.value : "0"}
            </span>
            <div
              className={`rounded-full gap-2 bg-primary-100 px-4 flex items-center ${getChangeColor(
                carStats?.debt.percent_change ?? "0"
              )}`}
            >
              <Triangle
                className="size-2"
                fill={getTriangleFill(carStats?.debt.percent_change ?? "0")}
              />
              <span
                className={`text-[12px] ${getChangeColor(
                  carStats?.debt.percent_change ?? "0"
                )}`}
              >
                {carStats?.debt.percent_change === "no previous data"
                  ? "нет данных"
                  : carStats?.debt.percent_change ?? "0"}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[#A1A1A1]">
              {carStats ? carStats.debt.period : "Последние 30 дней"}
            </p>
            <p className="mt-12">
              {carStats
                ? `Изменение: ${
                    carStats.debt.percent_change === "no previous data"
                      ? "0"
                      : carStats.debt.percent_change
                  }`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* section5 */}
      {/* section5 */}
      <div className="mt-5">
        <div>
          <div className=" flex items-center gap-3">
            <div className="bg-black size-10 flex justify-center items-center rounded-full">
              <Icon name="users" size={20} className="size-40" />
            </div>
            <span className="text-base font-medium text-black">
              Прямой доход
            </span>
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-3xl font-semibold">
              {carStats ? carStats.direct_income.value : "$0.00"}
            </span>
            <div
              className={`rounded-full gap-2 bg-primary-100 px-4 flex items-center ${getChangeColor(
                carStats?.direct_income.percent_change ?? "0"
              )}`}
            >
              <Triangle
                className="size-2"
                fill={getTriangleFill(
                  carStats?.direct_income.percent_change ?? "0"
                )}
              />
              <span
                className={`text-[12px] ${getChangeColor(
                  carStats?.direct_income.percent_change ?? "0"
                )}`}
              >
                {carStats?.direct_income.percent_change === "no previous data"
                  ? "нет данных"
                  : carStats?.direct_income.percent_change ?? "0"}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[#A1A1A1]">
              {carStats ? carStats.direct_income.period : "Последние 30 дней"}
            </p>
            <p className="mt-12">
              {carStats
                ? `Изменение: ${
                    carStats.direct_income.percent_change === "no previous data"
                      ? "0"
                      : carStats.direct_income.percent_change
                  }`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* section5 */}
      {/* section6 */}
      <div className="mt-12">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Ближайшие оплаты
            </h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 hover:bg-transparent">
                <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                  Номер
                </TableHead>
                <TableHead className="text-gray-500 font-normal text-sm px-2 py-3">
                  Дата оплаты
                </TableHead>
                <TableHead className="text-gray-500 font-normal text-sm px-2 py-3">
                  Фио
                </TableHead>
                <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                  Авто
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && upcomingPayments.length > 0 ? (
                upcomingPayments.map((payment, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
                  >
                    <TableCell className="font-medium text-gray-900 px-4 py-4 text-sm">
                      {payment.number}
                    </TableCell>
                    <TableCell className="text-gray-700 px-2 py-4 text-sm">
                      {payment.date}
                    </TableCell>
                    <TableCell className="text-gray-700 px-2 py-4 text-sm">
                      {payment.name}
                    </TableCell>
                    <TableCell className="text-gray-700 px-4 py-4 text-sm">
                      {payment.car}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-8"
                  >
                    Нет предстоящих платежей
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* section6 */}
      {/* section7 */}
      <div className="border rounded-2xl px-4 mt-12 py-6">
        <div className="flex mb-6 justify-between items-center">
          <h3 className="font-bold text-2xl">Свободное Авто</h3>
          <div className="border rounded-full text-sm flex justify-center items-center py-2.5 px-3">
            <Link href={"/admin/all-cars"}>Все</Link>
          </div>
        </div>
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Загрузка...</div>
            </div>
          ) : availableCars.length > 0 ? (
            availableCars.map((car, index) => (
              <div key={index} className="flex  gap-4">
                <div className="relative size-28 rounded-2xl overflow-hidden">
                  <Image
                    alt=""
                    src={car.image || "/images/lamborghini.png"}
                    fill
                    className="object-cover "
                  />
                </div>
                <div className="flex flex-col justify-around items-left space-y-1">
                  <div>
                    <span className="bg-primary-100  px-3 py-1 rounded-full text-[#22C55E]">
                      Актив
                    </span>
                  </div>
                  <p className="text-[#A1A1A1]">{car.brand}</p>
                  <p className="font-bold text-[#04070D]">{car.full_name}</p>
                  {/* sale_type */}
                  <p className="font-bold text-[#04070D]">
                    {car.sale_type === "redemption"
                      ? "Выкуп"
                      : car.sale_type === "purchase"
                      ? "Закуп"
                      : car.sale_type === "dry_sale"
                      ? "Продажа"
                      : "-"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              Нет доступных автомобилей
            </div>
          )}
        </div>
      </div>
      {/* section7 */}
    </div>
  );
}
