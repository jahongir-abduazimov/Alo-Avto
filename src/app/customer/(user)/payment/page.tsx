"use client";
import Container from "@/components/layout/container";
import { Pagination } from "@/components/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChartColumnBig, CircleAlert, WalletMinimal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function PaymentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const payments = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    amount: 1266,
    status: "paid",
    date: "27.05.2025",
  }));

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="pb-24">
      <div className=" rounded-2xl p-4 bg-light-50 mt-5">
        <div className="flex items-center w-full gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Kathryn Murphy"
            />
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
          <div className="flex justify-between w-full">
            <h3 className="font-medium text-base">Kathryn Murphy</h3>
            <Badge variant={"success"} className="text-sm">
              От 26.04.2025
            </Badge>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex ">
            <p className="flex-2">Срок выплаты — 12 месяцев</p>
            <span className="flex-1">Ставка 30%</span>
          </div>
          <p className="text-error-500">Текущая задолженность: 0$</p>
          <p>Цена выкупа: $17 200</p>
          <p>
            Первоначальный взнос:
            <span className="text-success-500"> $2000</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid h-[90px]  grid-cols-3 gap-3">
        <Link
          href={"/customer/payment-1"}
          className=" relative text-white  rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#074446_17.49%,_#48CD44_100%)]"
        >
          <span className="text-[9px] font-semibold">Оплатить</span>
          <WalletMinimal className="absolute bottom-4 right-4" />
        </Link>
        <div className=" relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#224462_17.49%,_#2CB391_100%)]">
          <span className="text-[9px] font-semibold">Инфо</span>
          <CircleAlert className="absolute bottom-4 right-4" />
        </div>
        <div className="  w-full relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#F4BB34_17.49%,_#EC6B1D_100%)]">
          <span className="text-[9px] font-semibold">График</span>
          <ChartColumnBig className="absolute bottom-4 right-4" />
        </div>
      </div>

      <div className="space-y-3">
        {currentPayments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="text-sm text-gray-500 mb-2">{payment.date}</div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 text-lg">
                ${payment.amount}
              </span>
              <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                Оплачено
              </Badge>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={payments.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </Container>
  );
}
