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
import type { Payment } from "@/types/payment";
type DrawerStep = "details" | "confirmed" | "waiting";

interface TransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: Payment;
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

  // Helper: fallback for undefined/null
  const safe = (val: any, fallback = "-") =>
    val !== undefined && val !== null && val !== "" ? val : fallback;

  const renderContent = () => {
    switch (currentStep) {
      case "details":
        return (
          <>
            <div className="text-center mb-6">
              <div className="text-gray-500 text-sm mb-2">
                {safe(transactionData.payment_date)}
              </div>
              <h1 className="font-bold text-5xl mb-3">
                ${safe(transactionData.amount)}
              </h1>

              {/* Payment Method Dropdown */}
              <Button
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-600 rounded-xl px-6"
              >
                {safe(transactionData.method)}
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
                  {safe(transactionData.notes)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Информация о платеже:</h3>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Плательщик:</strong>{" "}
                    {safe(transactionData.user_full_name) ||
                      safe(transactionData.user_first_name) ||
                      safe(transactionData.user_id)}
                  </p>
                  <p>
                    <strong>Машина:</strong>{" "}
                    {safe(transactionData.car_gost_number)}{" "}
                    {safe(transactionData.car_brand)}{" "}
                    {safe(transactionData.car_model)}
                  </p>
                  <p>
                    <strong>Тип платежа:</strong> {safe(transactionData.type)}
                  </p>
                  <p>
                    <strong>Статус:</strong> {safe(transactionData.status)}
                  </p>
                  <p>
                    <strong>Дата создания:</strong>{" "}
                    {safe(transactionData.created_at)}
                  </p>
                  <p>
                    <strong>Дата оплаты:</strong>{" "}
                    {safe(transactionData.payment_date)}
                  </p>
                  <p>
                    <strong>Срок оплаты:</strong>{" "}
                    {safe(transactionData.due_date)}
                  </p>
                  <p>
                    <strong>Invoice №:</strong>{" "}
                    {safe(transactionData.invoice_number)}
                  </p>
                  {transactionData.month_number && (
                    <p>
                      <strong>Месяц (schedule):</strong>{" "}
                      {transactionData.month_number}
                    </p>
                  )}
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
                      ${safe(transactionData.amount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Что делать:</strong>
                </p>
                <p>1. Приходите в наш офис.</p>
                <p>2. Оплатите заказ наличными или картой.</p>
                <p>
                  3. Сообщите оператору номер вашего заказа: #
                  {safe(transactionData.id)}
                </p>
                <p>4. После подтверждения оплаты вы получите уведомление.</p>
              </div>

              {/* Status */}
              <div className="text-center">
                <span className="text-green-600 font-medium">
                  {safe(transactionData.status)}
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
                {safe(transactionData.payment_date)}
              </div>
              <h1 className="font-bold text-5xl mb-3">
                ${safe(transactionData.amount)}
              </h1>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-600 hover:bg-blue-100"
              >
                {safe(transactionData.method)} ↓
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Информация о платеже:</h3>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Плательщик:</strong>{" "}
                    {safe(transactionData.user_full_name) ||
                      safe(transactionData.user_first_name) ||
                      safe(transactionData.user_id)}
                  </p>
                  <p>
                    <strong>Машина:</strong>{" "}
                    {safe(transactionData.car_gost_number)}{" "}
                    {safe(transactionData.car_brand)}{" "}
                    {safe(transactionData.car_model)}
                  </p>
                  <p>
                    <strong>Тип платежа:</strong> {safe(transactionData.type)}
                  </p>
                  <p>
                    <strong>Статус:</strong> {safe(transactionData.status)}
                  </p>
                  <p>
                    <strong>Дата создания:</strong>{" "}
                    {safe(transactionData.created_at)}
                  </p>
                  <p>
                    <strong>Дата оплаты:</strong>{" "}
                    {safe(transactionData.payment_date)}
                  </p>
                  <p>
                    <strong>Срок оплаты:</strong>{" "}
                    {safe(transactionData.due_date)}
                  </p>
                  <p>
                    <strong>Invoice №:</strong>{" "}
                    {safe(transactionData.invoice_number)}
                  </p>
                  {transactionData.month_number && (
                    <p>
                      <strong>Месяц (schedule):</strong>{" "}
                      {transactionData.month_number}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Выберете день и время
                  </p>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{selectedDate}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Сумма к оплате:</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <span className="font-semibold">
                      ${safe(transactionData.amount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Что делать:</strong>
                </p>
                <p>1. Приходите в наш офис.</p>
                <p>2. Оплатите заказ наличными или картой.</p>
                <p>
                  3. Сообщите оператору номер вашего заказа: #
                  {safe(transactionData.id)}
                </p>
                <p>4. После подтверждения оплаты вы получите уведомление.</p>
              </div>

              <div className="text-center">
                <span className="text-yellow-600 font-medium">
                  Ожидается подтверждение
                </span>
              </div>
            </div>
          </>
        );

      case "confirmed":
        return (
          <>
            <div className="text-center mb-6">
              <div className="text-gray-500 text-sm mb-2">
                {safe(transactionData.payment_date)}
              </div>
              <h1 className="font-bold text-5xl mb-3">
                ${safe(transactionData.amount)}
              </h1>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-600 hover:bg-green-100"
              >
                Подтверждено
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 rounded-2xl p-4 text-center">
                <Check className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-green-700 mb-2">
                  Оплата подтверждена!
                </h3>
                <p className="text-green-600">
                  Спасибо за оплату. Ваш платеж был успешно обработан.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {safe(transactionData.notes)}
                </p>
              </div>

              <div className="text-center">
                <span className="text-green-600 font-medium">Подтверждено</span>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleDrawerClose}>
      <DrawerContent className="flex flex-col custom-drawer-content">
        <div className="mx-auto w-full max-w-sm flex flex-col flex-1 pb-4">
          <DrawerHeader>
            <DrawerTitle className="text-center">Детали транзакции</DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 px-4 overflow-y-auto">{renderContent()}</div>

          <div className="px-4 pt-4">
            {currentStep === "details" && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={handleConfirmArrival}
                  className="rounded-full"
                >
                  Подтвердить прибытие
                </Button>
                <Button
                  onClick={handlePayment}
                  className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  Оплатить
                </Button>
              </div>
            )}

            {currentStep === "waiting" && (
              <Button
                onClick={handlePayment}
                className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Оплатить
              </Button>
            )}

            {currentStep === "confirmed" && (
              <Button
                onClick={handleReturnToMain}
                className="w-full rounded-full bg-green-500 text-white hover:bg-green-600"
              >
                Вернуться к списку
              </Button>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
