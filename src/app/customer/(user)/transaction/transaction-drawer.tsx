"use client";
import { useState } from "react";
import { ChevronDown, Calendar, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { FileUploadArea } from "@/components/file-upload-area";
type DrawerStep = "details" | "confirmed" | "waiting";

interface TransactionData {
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

interface TransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: TransactionData;
}

export function TransactionDrawer({
  isOpen,
  onClose,
  transactionData,
}: TransactionDrawerProps) {
  const [currentStep, setCurrentStep] = useState<DrawerStep>("details");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log("Selected file:", file.name);
  };

  const handleConfirmArrival = () => {
    setSelectedDate("01.01.2025");
    setCurrentStep("waiting");
  };

  const handlePayment = () => {
    setCurrentStep("confirmed");
    console.log("Processing payment for transaction");
  };

  const handleReturnToMain = () => {
    setCurrentStep("details");
    setSelectedDate("");
    setSelectedFile(null);
    onClose();
  };

  const handleDrawerClose = (open: boolean) => {
    if (!open) {
      setCurrentStep("details");
      setSelectedDate("");
      setSelectedFile(null);
      onClose();
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case "details":
        return (
          <>
            <div className="text-center mb-6">
              <div className="text-gray-500 text-sm mb-2">
                {transactionData.date}
              </div>
              <h1 className="font-bold text-5xl mb-3">
                ${transactionData.amount}
              </h1>

              {/* Payment Method Dropdown */}
              <Button
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-600 rounded-xl px-6"
              >
                {transactionData.paymentMethod}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* File Upload Area */}
              <div>
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

              <div>
                <h3 className="font-semibold mb-2">
                  Инструкция при выборе Оплата в офисе:
                </h3>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Адрес для оплаты:</strong>
                  </p>
                  <p>{transactionData.address}</p>
                  <p>{transactionData.workingHours}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Выберете день и время
                  </p>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {selectedDate || "Выбрать дату"}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Сумма к оплате:</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <span className="font-semibold">
                      ${transactionData.amount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Что делать:</strong>
                </p>
                <p>1. Приходите в наш офис.</p>
                <p>2. Оплатите заказ наличными.</p>
                <p>
                  3. Сообщите оператору номер вашего заказа: #
                  {transactionData.id}
                </p>
                <p>4. После подтверждения оплаты вы получите уведомление.</p>
              </div>

              {/* Status */}
              <div className="text-center">
                <span className="text-green-600 font-medium">
                  {transactionData.status}
                </span>
              </div>
            </div>
          </>
        );

      case "waiting":
        return (
          <>
            <div className="text-center mb-6">
              <div className="text-gray-500 text-sm mb-2">
                {transactionData.date}
              </div>
              <h1 className="font-bold text-5xl mb-3">
                ${transactionData.amount}
              </h1>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-600 hover:bg-blue-100"
              >
                {transactionData.paymentMethod} ↓
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">
                  Инструкция при выборе Оплата в офисе:
                </h3>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Адрес для оплаты:</strong>
                  </p>
                  <p>{transactionData.address}</p>
                  <p>{transactionData.workingHours}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Выберете день и время
                  </p>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">01.01.2025</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Сумма к оплате:</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <span className="font-semibold">
                      ${transactionData.amount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {transactionData.description}
                </p>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Что делать:</strong>
                </p>
                <p>1. Приходите в наш офис.</p>
                <p>2. Оплатите заказ наличными.</p>
                <p>
                  3. Сообщите оператору номер вашего заказа: #
                  {transactionData.id}
                </p>
                <p>4. После подтверждения оплаты вы получите уведомление.</p>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium">Статус оплаты Ожидается</p>
              </div>
            </div>
          </>
        );

      case "confirmed":
        return (
          <div className="text-center py-8">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Спасибо за
                <br />
                подтверждение
              </h2>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleDrawerClose}>
      <DrawerContent className="h-[85vh]">
        <div className="mx-auto w-full max-w-sm h-full flex flex-col">
          {/* Header - Fixed */}
          <DrawerHeader className="text-center pb-4 flex-shrink-0">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <DrawerTitle className="text-xl font-semibold">
              Детали транзакции - ID:{transactionData.id}
            </DrawerTitle>
          </DrawerHeader>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {renderContent()}
          </div>

          {/* Footer - Fixed */}
          <div className="flex-shrink-0 border-t  bg-white px-4 py-8">
            {currentStep === "details" && (
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-12 text-base font-medium"
                  onClick={handleConfirmArrival}
                >
                  Подтвердите приезд
                </Button>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl h-12 text-base font-medium"
                  onClick={handlePayment}
                >
                  Оплатить
                </Button>
              </div>
            )}

            {currentStep === "waiting" && (
              <Button
                variant="outline"
                className="w-full rounded-2xl h-12"
                onClick={handleReturnToMain}
              >
                Возвращаем Главный
              </Button>
            )}

            {currentStep === "confirmed" && (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-12"
                onClick={handleReturnToMain}
              >
                Возвращаем Главный
              </Button>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
