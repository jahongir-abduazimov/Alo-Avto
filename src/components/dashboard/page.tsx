import React from "react";
import Image from "next/image";
import Link from "next/link";

import HeaderDashboard from "./header";
import { Icon } from "../icon";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  AlertCircle,
  ArrowRight,
  OctagonX,
  PlusCircle,
  RefreshCw,
  Route,
  Triangle,
} from "lucide-react";

// Dummy data
const payments = Array(5).fill({
  number: "01 A 123 AA",
  date: "01.01.2024",
  name: "Utkir",
  car: "Nexia",
});

const StatCard = ({ icon, title, value, percent }: any) => (
  <div className="py-4 bg-white">
    <div className="flex items-center gap-3">
      <div className="bg-black size-10 flex justify-center items-center rounded-full">
        {icon}
      </div>
      <span className="text-base font-medium text-black">{title}</span>
    </div>
    <div className="flex justify-between mt-3">
      <span className="text-3xl font-semibold">{value}</span>
      <div className="rounded-full gap-2 bg-primary-100 px-4 text-[#22C55E] flex items-center">
        <Triangle className="size-2" fill="#22C55E" />
        <span className="text-[12px]">{percent}</span>
      </div>
    </div>
    <div className="mt-3 text-[#A1A1A1]">
      <p>Данные, полученные за последние 30 дней</p>
      <p className="mt-5">Увеличение на {percent} за 30 дней</p>
    </div>
  </div>
);

const FreeCarCard = () => (
  <div className="flex gap-4">
    <div className="relative size-28 rounded-2xl overflow-hidden">
      <Image
        alt="lamborghini"
        src="/images/lamborghini.png"
        fill
        className="object-cover"
      />
    </div>
    <div className="flex flex-col items-start justify-around space-y-1">
      <span className="bg-primary-100 px-3 py-1 rounded-full text-[#22C55E]">Актив</span>
      <p className="text-[#A1A1A1]">Lamborghini</p>
      <p className="font-medium text-base w-40 line-clamp-1">Huracan 1.5 Sports</p>
      <p className="font-bold text-[#04070D]">Продажа</p>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="pb-5">
      <HeaderDashboard />

      {/* Welcome Title */}
      <h1 className="font-medium text-4xl">Hush kelbiz, BOSS👋🏻</h1>

      {/* Filter & Actions */}
      <div className="w-full flex gap-4 mt-5">
        <Select>
          <SelectTrigger className="w-full min-h-[46px] rounded-[15px] text-base font-[Lexend]">
            <SelectValue placeholder="Выкуп" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="buy">Выкуп</SelectItem>
              <SelectItem value="rent">Аренда</SelectItem>
              <SelectItem value="sale">Продажа</SelectItem>
              <SelectItem value="service">Сервис</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <button className="w-[70%] min-h-[46px] flex items-center justify-center gap-1 px-3 bg-primary-50 text-primary-500 rounded-[15px]">
          <Image src="/icons/dock.svg" width={24} height={24} alt="dock" />
          <span>Док</span>
        </button>

        <button className="w-full min-h-[46px] flex items-center justify-center gap-1 px-3 bg-primary-50 text-primary-500 rounded-[15px]">
          <Image src="/icons/warning.svg" width={24} height={24} alt="warning" />
          <span>Штраф</span>
        </button>
      </div>

      {/* Status Boxes (unchanged) */}
      <div className="mt-5 flex justify-between gap-2.5">
        <div className="size-[90px] cursor-pointer relative text-white rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#074446_17.49%,_#48CD44_100%)]">
          <span className="text-[9px] font-semibold">Просрочка</span>
          <AlertCircle className="absolute bottom-4 right-4" />
        </div>
        <div className="size-[90px] cursor-pointer relative text-white rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#224462_17.49%,_#2CB391_100%)]">
          <span className="text-[9px] font-semibold">Возврат</span>
          <RefreshCw className="absolute bottom-4 right-4" />
        </div>
        <div className="size-[90px] cursor-pointer relative text-white rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#F4BB34_17.49%,_#EC6B1D_100%)]">
          <span className="text-[9px] font-semibold">Закрите</span>
          <OctagonX className="absolute bottom-4 right-4" />
        </div>
        <div className="size-[90px] cursor-pointer relative text-white rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#42219A_17.49%,_#DB94DB_100%)]">
          <span className="text-[9px] font-semibold">Геолакации</span>
          <Route className="absolute bottom-4 right-4" />
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-2 grid-rows-2 mt-5 gap-2">
        <Link
          href="/all-cars"
          className="h-[105px] bg-[#CAD8FF]/40 relative rounded-[20px] border-dashed border-primary-500 border-2 py-2 px-3"
        >
          <span className="text-[12px] font-medium">Добавить авто</span>
          <PlusCircle className="absolute text-primary-500 bottom-4 right-4" />
        </Link>

        <div className="bg-primary-500 row-span-2 px-4 py-5 rounded-[20px] relative">
          <span className="text-[19px] text-white font-medium leading-[17px]">
            Мой <br /> помощник
          </span>
          <Image
            src="/icons/voice-square.svg"
            width={75}
            height={75}
            className="absolute bottom-5 right-5"
            alt="voice"
          />
        </div>

        <div className="h-[105px] text-white bg-[#FF8E31] relative rounded-[20px] py-2 px-3 overflow-hidden">
          <Image
            src="/icons/return-up.svg"
            width={52}
            height={70}
            className="absolute -bottom-7 left-4 opacity-30"
            alt="return up"
          />
          <span className="text-[12px] font-medium">Сдать</span>
          <Image
            src="/icons/return-up.svg"
            width={37}
            height={50}
            className="absolute bottom-5 right-6"
            alt="return up"
          />
        </div>
      </div>

      {/* Car Appraisal */}
      <div className="mt-5 p-3 rounded-2xl bg-[#F3F3F3] flex justify-between items-center">
        <Icon name="favorite" size={34} />
        <span className="font-semibold text-base">Оценка автомобиля</span>
        <div className="bg-black text-white size-8 rounded-full flex justify-center items-center">
          <ArrowRight />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col gap-4 mt-5 pb-[10px] bg-[#F7F7F7]">
        <StatCard icon={<Icon name="coin-dollar" size={20} />} title="Общее Поступления" value="$36,655,70" percent="25%" />
        <StatCard icon={<Icon name="notepad" size={20} />} title="Ближайшие поступления" value="8,640" percent="18%" />
        <StatCard icon={<Icon name="car" size={20} />} title="Задолженность" value="170" percent="10%" />
        <StatCard icon={<Icon name="users" size={20} />} title="Прямой доход" value="70" percent="15%" />
      </div>

      {/* Upcoming Payments Table */}
      <div className="mt-12">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Ближайшие оплаты</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="px-4 text-sm text-gray-500 font-normal">Номер</TableHead>
                <TableHead className="px-2 text-sm text-gray-500 font-normal">Дата оплаты</TableHead>
                <TableHead className="px-2 text-sm text-gray-500 font-normal">Ф.И.О</TableHead>
                <TableHead className="px-4 text-sm text-gray-500 font-normal">Авто</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((item, index) => (
                <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <TableCell className="px-4 py-4 text-sm font-medium text-gray-900">{item.number}</TableCell>
                  <TableCell className="px-2 py-4 text-sm text-gray-700">{item.date}</TableCell>
                  <TableCell className="px-2 py-4 text-sm text-gray-700">{item.name}</TableCell>
                  <TableCell className="px-4 py-4 text-sm text-gray-700">{item.car}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Free Cars Section */}
      <div className="border rounded-2xl px-4 mt-12 py-6">
        <div className="flex mb-6 justify-between items-center">
          <h3 className="font-bold text-2xl">Свободное Авто</h3>
          <button className="border rounded-full cursor-pointer text-sm flex justify-center items-center py-2.5 px-3">
            See All
          </button>
        </div>
        <div className="space-y-6">
          <FreeCarCard />
          <FreeCarCard />
          <FreeCarCard />
        </div>
      </div>
    </div>
  );
}
