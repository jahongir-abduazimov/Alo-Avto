"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/pagination";
import TypographyH1 from "@/components/ui/typography-h1";

export default function LoanTrackingApp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const payments = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    amount: 1266,
    status: "paid",
    date: new Date(2024, 0, i * 30).toLocaleDateString("ru-RU"),
  }));

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <TypographyH1>Закрытие</TypographyH1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск"
            className="pl-10 bg-white border-gray-200 rounded-xl h-11 text-base placeholder:text-gray-400"
          />
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="/placeholder.svg?height=48&width=48"
                  alt="Kathryn Murphy"
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                  KM
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-900 text-lg">
                Kathryn Murphy
              </span>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
              Успешна
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Срок выплаты — 12 месяцев</p>
              <p className="text-red-500 font-medium">
                Текущая задолженность: 0$
              </p>
              <p className="text-gray-700">
                Цена выкупа <span className="font-medium">$17,200</span>
              </p>
              <p className="text-gray-700">
                Сухая цена <span className="font-medium">$14,000</span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Ставка 30%</p>
              <p className="text-gray-700">Персональный</p>
              <p className="text-gray-700">взнос</p>
              <p className="text-green-600 font-semibold text-lg">$2000</p>
            </div>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 px-1">
            График выплат
          </h2>

          <div className="space-y-2">
            {currentPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
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
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  );
}
