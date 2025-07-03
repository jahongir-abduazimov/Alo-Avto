"use client";

import Container from "@/components/layout/container";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { TransactionDrawer } from "./transaction-drawer";
import TypographyH1 from "@/components/ui/typography-h1";

interface Transaction {
  id: string;
  customerName: string;
  carNumber: string;
  paymentMethod: string;
  date: string;
  amount: number;
  description: string;
  status: string;
  address: string;
  workingHours: string;
}

export default function TransactionClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: "01",
      customerName: "Utkir Giyosov",
      carNumber: "01 A 123 AB",
      paymentMethod: "Наличные",
      date: "27.05.2025",
      amount: 100,
      description:
        "Оплата аренды авто. Клиент: Utkir Giyosov, Период: 01.06.2025 — 30.06.2025. Метод: Наличные.",
      status: "Ожидается подтверждение",
      address: 'ИП "AloAvto", г. Ташкент , ул. Примерная, д. 10, офис 5',
      workingHours: "Пн-Пт: 10:00-18:00",
    },
    {
      id: "02",
      customerName: "Aziz Azizov",
      carNumber: "01 B 456 CD",
      paymentMethod: "Карта",
      date: "26.05.2025",
      amount: 150,
      description:
        "Оплата аренды авто. Клиент: Aziz Azizov, Период: 02.06.2025 — 30.06.2025. Метод: Карта.",
      status: "Ожидается подтверждение",
      address: 'ИП "AloAvto", г. Ташкент , ул. Примерная, д. 10, офис 5',
      workingHours: "Пн-Пт: 10:00-18:00",
    },
    {
      id: "03",
      customerName: "Sardor Karimov",
      carNumber: "01 C 789 EF",
      paymentMethod: "Наличные",
      date: "25.05.2025",
      amount: 200,
      description:
        "Оплата аренды авто. Клиент: Sardor Karimov, Период: 03.06.2025 — 30.06.2025. Метод: Наличные.",
      status: "Ожидается подтверждение",
      address: 'ИП "AloAvto", г. Ташкент , ул. Примерная, д. 10, офис 5',
      workingHours: "Пн-Пт: 10:00-18:00",
    },
    {
      id: "04",
      customerName: "Bobur Toshev",
      carNumber: "01 D 012 GH",
      paymentMethod: "Карта",
      date: "24.05.2025",
      amount: 120,
      description:
        "Оплата аренды авто. Клиент: Bobur Toshev, Период: 04.06.2025 — 30.06.2025. Метод: Карта.",
      status: "Ожидается подтверждение",
      address: 'ИП "AloAvto", г. Ташкент , ул. Примерная, д. 10, офис 5',
      workingHours: "Пн-Пт: 10:00-18:00",
    },
  ];

  const totalItems = transactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTransaction(null);
  };

  // Get current page transactions
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = transactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        {currentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border rounded-xl px-4 py-3 flex justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleTransactionClick(transaction)}
          >
            <span className="text-base text-[#363636]">
              ID:{transaction.id}
            </span>
            <span className="text-base text-[#363636]">
              {transaction.customerName}
            </span>
            <span className="text-base text-[#363636]">
              {transaction.carNumber}
            </span>
            <span className="text-base text-[#363636]">
              {transaction.paymentMethod}
            </span>
          </div>
        ))}
      </div>

      {/* Transaction Drawer */}
      {selectedTransaction && (
        <TransactionDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          transactionData={selectedTransaction}
        />
      )}

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
