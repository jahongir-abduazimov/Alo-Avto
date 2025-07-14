"use client";

import Container from "@/components/layout/container";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { TransactionDrawer } from "./transaction-drawer";
import TypographyH1 from "@/components/ui/typography-h1";
import { fetchPayments } from "@/lib/api";
import type { Payment } from "@/types/payment";
export default function TransactionClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Payment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchPayments()
      .then((data) => {
        setPayments(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Xatolik yuz berdi");
        setLoading(false);
      });
  }, []);

  // Filter payments based on search term
  const filteredPayments = payments.filter(
    (payment) =>
      payment.user_full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.car_gost_number
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.id.toString().includes(searchTerm)
  );

  const totalItems = filteredPayments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

  const handleTransactionClick = (transaction: Payment) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTransaction(null);
  };

  // Get current page transactions
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = filteredPayments.slice(
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-6 text-lg bg-gray-50 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {loading ? (
        <div className="text-center py-8">Загрузка...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="space-y-4">
          {currentPayments.map((payment) => (
            <div
              key={payment.id}
              className="border rounded-xl px-4 py-3 flex justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleTransactionClick(payment)}
            >
              <span className="text-base text-[#363636]">ID:{payment.id}</span>
              <span className="text-base text-[#363636]">
                {payment.user_full_name || payment.user_first_name || "-"}
              </span>
              <span className="text-base text-[#363636]">
                {payment.car_gost_number || payment.rental_car_name || "-"}
              </span>
              <span className="text-base text-[#363636]">{payment.method}</span>
            </div>
          ))}
        </div>
      )}

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
