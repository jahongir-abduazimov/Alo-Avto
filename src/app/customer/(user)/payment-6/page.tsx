"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploadArea } from "@/components/file-upload-area";
import Container from "@/components/layout/container";
import { useRouter } from "next/navigation";
import { useLoanData } from "@/components/payments";
import { createPayment } from "@/lib/api";
import { AlertCircle } from "lucide-react";

// Define type for monthly payments
type MonthlyPayment = {
  payment_status: string;
  date?: string;
  // add other properties as needed
};

export default function TransactionDetailsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();
  const { rental, loanData } = useLoanData();

  // Get payment data from localStorage
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "",
    type: "",
    transactionId: "",
    cardNumber: "",
    cardHolder: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const amount = localStorage.getItem("paymentAmount") || "0";
      const method = localStorage.getItem("paymentMethod") || "card"; // This will be 'card' or 'office'
      const type = localStorage.getItem("paymentType") || "schedule";
      const transactionId = localStorage.getItem("transactionId") || "1";
      const cardNumber = localStorage.getItem("paymentCardNumber") || "";
      const cardHolder = localStorage.getItem("paymentCardHolder") || "";

      setPaymentData({
        amount,
        method,
        type,
        transactionId,
        cardNumber,
        cardHolder,
      });
    }
  }, []);

  const transactionData = {
    date: new Date().toLocaleDateString("ru-RU"),
    amount: paymentData.amount,
    cardNumber: paymentData.cardNumber
      ? `${paymentData.cardNumber.substring(
          0,
          4
        )}...${paymentData.cardNumber.substring(
          paymentData.cardNumber.length - 4
        )}`
      : "",
    cardHolder: paymentData.cardHolder,
    description: `Оплата аренды авто. Клиент: ${
      loanData?.fio || paymentData.cardHolder || "Пользователь"
    }, Период: ${loanData?.startDate} — ${loanData?.endDate}. Метод: ${
      paymentData.method === "card" ? "Карта" : "Офис"
    }.`,
    status: "Ожидается подтверждение",
    paymentMethod: paymentData.method === "card" ? "Карты" : "Офис",
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    console.log("Selected file:", file.name);
  };

  const handlePayment = async () => {
    if (!selectedFile) {
      setError("Пожалуйста, загрузите файл подтверждения");
      return;
    }

    if (!rental?.id) {
      setError("Информация об аренде не найдена");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Get current user ID from localStorage
      const userStr =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const user = userStr ? JSON.parse(userStr) : null;
      const userId = user?.id;

      if (!userId) {
        setError(
          "Пользователь не найден. Пожалуйста, войдите в систему снова."
        );
        setIsSubmitting(false);
        return;
      }

      const monthlyPayments = rental?.monthly_payments || [];
      const nextUnpaid = monthlyPayments.find(
        (item: MonthlyPayment) => item.payment_status !== "confirmed"
      );
      const paidForDate =
        nextUnpaid?.date || new Date().toISOString().split("T")[0];

      console.log("DEBUG nextUnpaid:", nextUnpaid);

      const formData = new FormData();
      formData.append("method", paymentData.method);
      formData.append("notes", transactionData.description);
      formData.append("proof", selectedFile);
      formData.append("payment_date", new Date().toISOString());
      formData.append("user_id", userId.toString());
      formData.append("office_appointment_date", new Date().toISOString());
      formData.append("rental_id", rental?.id?.toString());
      formData.append("paid_for_date", paidForDate);
      formData.append("amount", paymentData.amount);
      formData.append("due_date", paidForDate);
      formData.append("type", paymentData.type);
      formData.append("invoice_number", `INV-${Date.now()}`);
      formData.append("transaction_id", paymentData.transactionId);
      formData.append("status", "pending");

      // Add month_number_input for schedule payments
      if (paymentData.type === "schedule" && nextUnpaid?.month_number) {
        formData.append(
          "month_number_input",
          nextUnpaid.month_number.toString()
        );
      }

      // Add card info if available
      if (paymentData.cardNumber) {
        formData.append("card_number", paymentData.cardNumber);
      }

      if (paymentData.cardHolder) {
        formData.append("card_holder", paymentData.cardHolder);
      }

      const logFormData: Record<string, FormDataEntryValue> = {};
      formData.forEach((value, key) => {
        logFormData[key] = value;
      });
      console.log("Payment POST payload:", logFormData);

      await createPayment(formData);

      if (typeof window !== "undefined") {
        localStorage.removeItem("paymentAmount");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("paymentType");
        localStorage.removeItem("transactionId");
        localStorage.removeItem("paymentCardNumber");
        localStorage.removeItem("paymentCardHolder");
      }

      route.push("/customer/transaction");
    } catch (error) {
      console.error("Payment error:", error);
      setError("Ошибка при отправке платежа. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {/* Amount */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">
                ${transactionData.amount}
              </div>
            </div>

            {/* Card Details (if available) */}
            {paymentData.method === "card" && paymentData.cardNumber && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm font-medium text-gray-700">
                  Информация о карте:
                </p>
                <p className="text-gray-600">{transactionData.cardNumber}</p>
                {paymentData.cardHolder && (
                  <p className="text-gray-600">{paymentData.cardHolder}</p>
                )}
              </div>
            )}

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
              disabled={isSubmitting || !selectedFile}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-medium disabled:bg-blue-300"
            >
              {isSubmitting ? "Отправка..." : "Оплатить"}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
