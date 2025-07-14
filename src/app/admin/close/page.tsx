"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { SlidersHorizontal, Search } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { useState, useEffect } from "react";
import { fetchCompletedPayments } from "@/lib/api";
import { CompletedPayment } from "@/types/payment";

export default function ClosePage() {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [completedPayments, setCompletedPayments] = useState<
    CompletedPayment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] =
    useState<CompletedPayment | null>(null);

  useEffect(() => {
    const loadCompletedPayments = async () => {
      try {
        setLoading(true);
        const response = await fetchCompletedPayments();
        setCompletedPayments(response.results);
      } catch (error) {
        console.error("Error loading completed payments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCompletedPayments();
  }, []);

  const totalRecords = completedPayments.length;
  const totalPages = Math.ceil(totalRecords / Number.parseInt(itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePaymentClick = (payment: CompletedPayment) => {
    setSelectedPayment(payment);
  };

  const filteredPayments = completedPayments.filter((payment) => {
    const searchLower = searchTerm.toLowerCase();
    const userName = `${payment.user_first_name || ""} ${
      payment.user_last_name || ""
    }`.toLowerCase();
    const carInfo = payment.rental?.car
      ? `${payment.rental.car.brand} ${payment.rental.car.model}`.toLowerCase()
      : "";
    const gostNumber = payment.rental?.car?.gost_number?.toLowerCase() || "";

    return (
      userName.includes(searchLower) ||
      carInfo.includes(searchLower) ||
      gostNumber.includes(searchLower)
    );
  });

  const getMethodDisplay = (method: string) => {
    return method === "card" ? "Картой" : "Наличные";
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "confirmed":
        return { text: "Успешна", className: "bg-[#DFF7EC] text-[#2DB67C]" };
      case "pending":
        return { text: "Ожидает", className: "bg-[#FFF7E6] text-[#F59E0B]" };
      case "cancelled":
        return { text: "Отменена", className: "bg-[#FEE2E2] text-[#EF4444]" };
      default:
        return { text: status, className: "bg-gray-100 text-gray-600" };
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6 space-y-6 text-[#1A1A1A] bg-white h-[120vh]">
        <h1 className="text-2xl font-bold">Закрите</h1>
        <div className="space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 text-[#1A1A1A] bg-white h-[120vh] ">
      <h1 className="text-2xl font-bold">Закрите</h1>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Поиск"
            className="pl-10 pr-4 py-2 h-10 text-sm rounded-md bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="flex gap-1 items-center px-4 text-sm h-10"
        >
          <SlidersHorizontal size={16} />
          Фильтр
        </Button>
      </div>

      {/* Completed Payments List */}
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm
              ? "Поиск не дал результатов"
              : "Завершенные платежи не найдены"}
          </div>
        ) : (
          filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-[#F5F5F5] rounded-xl p-4 space-y-2 cursor-pointer hover:bg-[#EEEEEE] transition-colors"
              onClick={() => handlePaymentClick(payment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://randomuser.me/api/portraits/women/79.jpg"
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium text-[15px]">
                    {payment.user_first_name} {payment.user_last_name}
                  </span>
                </div>
                <Badge
                  className={`text-xs ${
                    getStatusDisplay(payment.status).className
                  }`}
                >
                  {getStatusDisplay(payment.status).text}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[13px] leading-snug">
                {payment.rental && (
                  <>
                    <div>
                      <span className="text-muted-foreground">
                        Срок выплаты —{" "}
                      </span>
                      <span className="font-medium">
                        {payment.rental.buyout_period_months} месяцев
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ставка </span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div>
                      <span className="text-[#F04438]">
                        Текущая задолженность: 0$
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Первоначальный взнос:
                      </span>{" "}
                      <span className="text-[#2DB67C] font-medium">
                        ${payment.rental.initial_payment}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Цена выкупа:{" "}
                      </span>
                      <span className="font-medium">
                        ${payment.rental.buyout_sale_price}
                      </span>
                      <div>
                        <span className="text-muted-foreground">
                          Сухая цена:{" "}
                        </span>
                        <span className="font-medium">
                          ${payment.rental.dry_sale_price}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Автомобиль:{" "}
                      </span>
                      <span className="font-medium">
                        {payment.rental.car.brand} {payment.rental.car.model}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ГОСТ: </span>
                      <span className="font-medium">
                        {payment.rental.car.gost_number}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Способ оплаты:{" "}
                      </span>
                      <span className="font-medium">
                        {getMethodDisplay(payment.method)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Сумма: </span>
                      <span className="font-medium">${payment.amount}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment Schedule Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">График выплат</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPayment(null)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-3">
              {selectedPayment.payment_schedule?.map((schedule, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-2 border rounded-lg"
                >
                  <div>
                    <span className="font-medium">${schedule.amount}</span>
                    <div className="text-xs text-gray-500">
                      {new Date(schedule.date).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                  <Badge
                    className={`text-xs ${
                      schedule.status === "paid"
                        ? "bg-[#DFF7EC] text-[#2DB67C]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {schedule.status === "paid" ? "Оплачено" : "Ожидает"}
                  </Badge>
                </div>
              )) || (
                <div className="text-center py-4 text-gray-500">
                  График выплат недоступен
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={Number.parseInt(itemsPerPage)}
          totalItems={totalRecords}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(items) => setItemsPerPage(items.toString())}
        />
      </div>
    </div>
  );
}
