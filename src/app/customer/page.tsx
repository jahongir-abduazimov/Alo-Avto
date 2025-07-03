"use client";
import HeaderDashboard from "@/components/dashboard/header";
import { Icon } from "@/components/icon";
import Container from "@/components/layout/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import TypographyH1 from "@/components/ui/typography-h1";
import {
  AlertCircle,
  ArrowRight,
  CircleAlert,
  Files,
  RefreshCw,
  Route,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CustomerDashboard() {
  const payments = [
    {
      number: "01 A 123 AA",
      date: "01.01.2024",
      name: "Utkir",
      car: "Nexia",
    },
    {
      number: "01 A 123 AA",
      date: "01.01.2024",
      name: "Utkir",
      car: "Nexia",
    },
    {
      number: "01 A 123 AA",
      date: "01.01.2024",
      name: "Utkir",
      car: "Nexia",
    },
    {
      number: "01 A 123 AA",
      date: "01.01.2024",
      name: "Utkir",
      car: "Nexia",
    },
    {
      number: "01 A 123 AA",
      date: "01.01.2024",
      name: "Utkir",
      car: "Nexia",
    },
    {
      number: "01 A 123 AA",
      date: "01.01.2024",
      name: "Utkir",
      car: "Nexia",
    },
    {
      number: "01 A 123 AA",
      date: "01.01.2024",
      name: "Utkir",
      car: "Nexia",
    },
  ];
  return (
    <Container padding={false}>
      <Container className="pb-12">
        <HeaderDashboard />
        <div className="flex  items-center justify-between">
          <h1 className="font-bold text-3xl">Hush kelibsiz</h1>
          <div className="bg-primary-50 h-full py-1.5 items-center gap-2 px-3  flex rounded-md text-primary-500">
            <Files size={16} />
            <span>Док</span>
          </div>
          <div className="bg-primary-50 h-full items-center gap-2 px-3 py-1.5  flex rounded-md text-primary-500">
            <CircleAlert className="text-primary-500" size={16} />
            <span>Штраф</span>
          </div>
        </div>
        <div className="mt-5 grid h-[90px]  grid-cols-4 gap-3">
          <div className=" relative text-white  rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#074446_17.49%,_#48CD44_100%)]">
            <span className="text-[9px] font-semibold">Просрочка</span>
            <AlertCircle className="absolute bottom-4 right-4" />
          </div>
          <div className=" relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#224462_17.49%,_#2CB391_100%)]">
            <span className="text-[9px] font-semibold">возврат</span>
            <RefreshCw className="absolute bottom-4 right-4" />
          </div>
          <Link
            href={"/customer/close"}
            className=" col-span-2 w-full relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#F4BB34_17.49%,_#EC6B1D_100%)]"
          >
            <span className="text-[9px] font-semibold">Закрите</span>
            <Route className="absolute bottom-4 right-4" />
          </Link>
        </div>
        <div className="aspect-4/3 relative">
          <Image
            src={"/images/car-tesla.png"}
            className="object-contain"
            alt=""
            fill
          />
        </div>
        <Link
          href={"/customer/payment"}
          className="mt-5 p-3 rounded-2xl bg-primary-100 flex justify-between items-center"
        >
          <Icon name="favorite" size={34} />
          <span className="font-medium text-base">Оплата</span>
          <div className="bg-black text-white size-8 rounded-full flex justify-center items-center">
            <ArrowRight />
          </div>
        </Link>
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
                {payments.map((payment, index) => (
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Мои Штрафы{" "}
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
                {payments.map((payment, index) => (
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Container>
    </Container>
  );
}
