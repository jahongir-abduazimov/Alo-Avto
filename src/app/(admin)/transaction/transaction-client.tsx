"use client";

import Container from "@/components/layout/container";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { TransactionDrawer } from "./transaction-drawer";
import TypographyH1 from "@/components/ui/typography-h1";

export default function TransactionClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 5;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

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
        <div className="border rounded-xl px-4 py-3 flex justify-between">
          <span className="text-base text-[#363636]">ID:01</span>
          <span className="text-base text-[#363636]">Utkir Giyosov</span>
          <span className="text-base text-[#363636]">01 A 123 AB</span>
          <span className="text-base text-[#363636]">Наличные</span>
        </div>
        <div className="border rounded-xl px-4 py-3 flex justify-between">
          <span className="text-base text-[#363636]">ID:01</span>
          <span className="text-base text-[#363636]">Utkir Giyosov</span>
          <span className="text-base text-[#363636]">01 A 123 AB</span>
          <span className="text-base text-[#363636]">Наличные</span>
        </div>
        <div className="border rounded-xl px-4 py-3 flex justify-between">
          <span className="text-base text-[#363636]">ID:01</span>
          <span className="text-base text-[#363636]">Utkir Giyosov</span>
          <span className="text-base text-[#363636]">01 A 123 AB</span>
          <span className="text-base text-[#363636]">Наличные</span>
        </div>
        <div className="border rounded-xl px-4 py-3 flex justify-between">
          <span className="text-base text-[#363636]">ID:01</span>
          <span className="text-base text-[#363636]">Utkir Giyosov</span>
          <span className="text-base text-[#363636]">01 A 123 AB</span>
          <span className="text-base text-[#363636]">Наличные</span>
        </div>
      </div>

      <TransactionDrawer />

      <div className="mt-6">
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={4}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </Container>
  );
}
