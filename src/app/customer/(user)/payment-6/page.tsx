"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploadArea } from "@/components/file-upload-area";
import Container from "@/components/layout/container";
import { useRouter } from "next/navigation";

export default function TransactionDetailsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const route = useRouter();

  const transactionData = {
    date: "27.05.2025",
    amount: 100,
    description:
      "Оплата аренды авто. Клиент: Азизов А.А., Период: 01.06.2025 — 30.06.2025. Метод: Карта.",
    status: "Ожидается подтверждение",
    paymentMethod: "Карты",
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log("Selected file:", file.name);
  };

  const handlePayment = () => {
    route.push("/customer/transaction"); // Redirect to payment confirmation page
    console.log("Processing payment for transaction");
  };

  return (
    <Container minHeight={false}>
      <div className="min-h-screen bg-gray-100">
        {/* Modal Container */}
        <div className="bg-white rounded-t-3xl min-h-screen pt-6">
          {/* Modal Handle */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <div className="px-4 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-xl font-semibold text-gray-900">
                Детали транзакции
              </h1>
              <p className="text-gray-500">{transactionData.date}</p>
            </div>

            {/* Amount */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">
                ${transactionData.amount}
              </div>
            </div>

            {/* Payment Method Dropdown */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-600 rounded-xl px-6"
              >
                {transactionData.paymentMethod}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* File Upload Area */}
            <div className="py-4">
              <FileUploadArea onFileSelect={handleFileSelect} />
              {selectedFile && (
                <div className="mt-2 text-sm text-green-600 text-center">
                  Файл выбран: {selectedFile.name}
                </div>
              )}
            </div>

            {/* Transaction Description */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {transactionData.description}
              </p>
            </div>

            {/* Status */}
            <div className="text-center">
              <span className="text-green-600 font-medium">
                {transactionData.status}
              </span>
            </div>

            {/* Spacer */}
            <div className="h-2"></div>
          </div>

          {/* Fixed Pay Button */}
          <div>
            <Button
              onClick={handlePayment}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-medium"
            >
              Оплатить
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
