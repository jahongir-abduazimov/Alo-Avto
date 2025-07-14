"use client";

import Container from "@/components/layout/container";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { TransactionDrawer } from "./transaction-drawer";
import TypographyH1 from "@/components/ui/typography-h1";
import { fetchPayments } from "@/lib/api";
import { Payment } from "@/types/payment";

export default function TransactionClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const totalItems = payments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const response = await fetchPayments();
        setPayments(response.results);
      } catch (error) {
        console.error("Error loading payments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

  const handleTransactionClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDrawerOpen(true);
  };

  const getMethodDisplay = (method: string) => {
    return method === "card" ? "Картой" : "Наличные";
  };

  if (loading) {
    return (
      <Container>
        <TypographyH1>Транзакции</TypographyH1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Загрузка...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <TypographyH1>Транзакции</TypographyH1>
      <div className="relative my-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-12 py-6 text-lg bg-gray-50 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="border rounded-xl px-4 py-3 flex justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleTransactionClick(payment)}
          >
            <span className="text-base text-[#363636]">ID:{payment.id}</span>
            <span className="text-base text-[#363636]">
              {payment.user_full_name || `${payment.user_first_name}` || `ID: ${payment.user_id}`}
            </span>
            <span className="text-base text-[#363636]">
              {payment.invoice_number}
            </span>
            <span className="text-base text-[#363636]">
              {getMethodDisplay(payment.method)}
            </span>
          </div>
        ))}
      </div>

      <TransactionDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        payment={selectedPayment}
      />

      <div className="mt-6">
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </Container>
  );
}
